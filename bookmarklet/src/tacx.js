// grab the ride ID from the URL in the browser
var rideID = window.location.pathname.split("/");
rideID = rideID[rideID.length - 1];

// TODO: don't use a global var for this
var lastTrainerUpdate = 0;

function convertResistance(min, max) {
  // assuming max setting of 200 = 200watts, that's probably not entirely correct
  // testing with map 100 "watts" = 100% peloton (not actually watts)

  return {
    percent: {
      min: Math.floor((min / 200) * 100),
      max: Math.floor((max / 200) * 100),
      avg: Math.floor((((min + max) / 2) / 200) * 100),
    },
    watts: {
      min: min,
      max: max,
      avg: Math.floor((min + max) / 2),
    }
  }
}

async function getBluetoothAddress() {
  var response = await fetch("http://127.0.0.1:8000/discover");
  var devices = await response.json();
  var foundDevice = devices.find(dev => dev.name.toLowerCase().includes('tacx'));

  return foundDevice.address;
}

async function setTrainerResistance(bluetoothAddress, newResistance, lastResistance) {
  // TODO: use a better pattern to track 
  var thisUpdate = Math.floor(Date.now() / 1000);
  if (newResistance === lastResistance && ((thisUpdate - lastTrainerUpdate) < 5)) return;
  lastTrainerUpdate = thisUpdate;
  console.log(`Setting resistance of trainer at ${bluetoothAddress} to ${newResistance} (last value: ${lastResistance})`);
  try {
    var res = await fetch(`http://127.0.0.1:8000/trainer/${bluetoothAddress}/resistance/${newResistance}`, { method: 'POST' });
    var stats = await res.json();
    console.log('success setting trainer resistance');
    // console.log(stats);
  } catch (e) {
    console.err('failed to set trainer resistance');
  }
}

// peloton doesn't respond with target metrics if credentials are not included
fetch("https://api.onepeloton.com/api/ride/" + rideID + "/details?stream_source=multichannel", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US",
    "peloton-platform": "web",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-requested-with": "XmlHttpRequest"
  },
  "referrer": "https://members.onepeloton.com/classes/player/" + rideID,
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(function (response) {
  return response.json()
})
  .then(async function (ride) {
    var classDuration = Number(ride.ride.duration);

    var trainerAddress = await getBluetoothAddress();
    console.log(`Bluetooth Trainer found at: ${trainerAddress}`);
    if (trainerAddress) setTrainerResistance(trainerAddress, 0, null);
    var lastValueSet = 0;

    var cadResistStyle = document.createElement('style');
    cadResistStyle.tyle = 'text/css';
    cadResistStyle.innerHTML = '.metricDetail { font-size: 30px; height: 50px; }';
    document.getElementsByTagName('head')[0].appendChild(cadResistStyle);

    var cadResistDiv = document.createElement('div');
    cadResistDiv.id = 'cadresist';
    cadResistDiv.style = 'color:white; position:absolute; bottom: 180px; left: 40px;';
    cadResistDiv.innerHTML = '<div id="cadresisttxt" style="width:100%;color:white;">metrics start during warmup</div><div style="margin-top:10px;width:100%; height:2px; background-color:#555555"><div id="cadresistprogress" style="width:0%;transition:990ms linear;height:2px;background-color:white"></div></div>';
    document.querySelector("div[class='jw-wrapper jw-reset']").after(cadResistDiv);

    var cadResisTextDiv = document.getElementById('cadresisttxt');
    var cadResisProgressDiv = document.getElementById('cadresistprogress');

    //does the class have target metrics?
    if (!ride.instructor_cues.length) {
      cadResistDiv.innerHTML = "Class does not have target metrics.";
      setTimeout(function () {
        cadResistDiv.innerHTML = "";
      }, 5000);
      return;
    }

    // combinue consecutive cues that are the same
    //   some classes have lots of consecutive segments of only a couple seconds, but all with the same cadence/resistance 
    var rideCue = [];
    var cue = ride.instructor_cues[0];
    for (var i = 1; i < ride.instructor_cues.length; i++) {
      var newCue = ride.instructor_cues[i];
      if (cue.resistance_range.upper == newCue.resistance_range.upper &&
        cue.resistance_range.lower == newCue.resistance_range.lower &&
        cue.cadence_range.upper == newCue.cadence_range.upper &&
        cue.cadence_range.lower == newCue.cadence_range.lower) {
        cue.offsets.end = newCue.offsets.end;
      } else {
        rideCue.push(cue);
        cue = newCue;
      }
    }
    rideCue.push(newCue);
    ride.instructor_cues = rideCue; //overwrite original cue data

    // set an observer on the timer, triggers running the code when it changes
    //var mPar = document.querySelector("div[data-test-id='video-timer']"),
    var mPar = document.querySelector("div[class='player-overlay-wrapper']"),
      options = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      },
      observer = new MutationObserver(mCallback);

    function mCallback(mutations) {
      // if the course has not started (1 minute warm-up), exit
      var timestamp = document.querySelector("p[data-test-id='time-to-complete']");
      if (!timestamp) return;

      // split the mm:ss timestamp from the peloton GUI
      timestamp = timestamp.innerHTML.split(":");
      if (timestamp.length != 2) return;

      // convert mm:ss timestamp to cue timecode in the API (seconds elapsed)
      var timecode = (classDuration - (Number(timestamp[0]) * 60 + Number(timestamp[1]))) + Number(ride.ride.pedaling_start_offset);
      // timecode is seconds elapsed
      var futureTimecode = timecode + 10; // fire trainer settings 10 seconds early
      // console.log(`FUTURE ${futureTimecode} vs NOW ${timecode}`);

      for (var i = 0; i < ride.instructor_cues.length; i++) {
        var cue = ride.instructor_cues[i];
        // console.log(cue.offsets);
        adjRes = convertResistance(cue.resistance_range.lower, cue.resistance_range.upper);

        if (futureTimecode >= Number(cue.offsets.start) && futureTimecode <= Number(cue.offsets.end)) {
          if (trainerAddress) setTrainerResistance(trainerAddress, adjRes.watts.min, lastValueSet);
          lastValueSet = adjRes.watts.min;
        }
        if (timecode >= Number(cue.offsets.start) && timecode <= Number(cue.offsets.end)) {
          view = "<div class='metricDetail'>resistance (peloton): " + cue.resistance_range.lower + " - " + cue.resistance_range.upper + "</div>";
          view += "<div class='metricDetail'>resistance (adj - %): " + adjRes.percent.min + " - " + adjRes.percent.max + " %</div>"
          //view += "<div class='metricDetail'>resistance (adj - watts): " + adjRes.watts.min + " - " + adjRes.watts.max + " watts</div>"
          view += "<div class='metricDetail'>cadence: " + cue.cadence_range.lower + " - " + cue.cadence_range.upper + " RPM </div>";
          cadResisTextDiv.innerHTML = view;
          if (timecode == Number(cue.offsets.start)) {
            cadResisProgressDiv.style.transition = "none";
            cadResisProgressDiv.style.width = "0%";
          } else {
            cadResisProgressDiv.style.transition = "990ms linear";
            cadResisProgressDiv.style.width = Math.round((((timecode) - cue.offsets.start) / (cue.offsets.end - cue.offsets.start)) * 100) + "%";
          }
          return;
        }

      }

    }

    observer.observe(mPar, options);

  });
