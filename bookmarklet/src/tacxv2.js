class pelotonLink {
    constructor() {
        // constants
        this.trainerBuffer = 10; // minimum seconds between pushes to trainer

        // state variables
        this.rideId = window.location.pathname.split('/').pop();
        this.lastTrainerUpdate = 0;
        this.rideDetails = {};
        this.uiTimecode = 0;
        this.trainerTimecode = 0;
        this.classDuration = 0;
        this.pedalingStartOffset = 0;
        this.lastTrainerPush = 0;
        this.bluetoothAddress = '';
        this.bluetoothName;

        this.trainerBusy = false;

        this.injectCSS();
        this.injectUI();
        this.getBluetoothTrainer();
    }

    injectCSS() {
        const style = document.createElement('style');
        style.style = 'text/css';
        style.innerHTML = '#overlayContainer { position: absolute; display: flex; flex-wrap: wrap; bottom: 180px; left: 40px; height: 300px; max-width: 100px; } ';
        style.innerHTML += '.statsContainer { font-size: 30px; border-radius: 5px; opacity: 0.3; background-color: #EFEFEF; margin: 10px; color: #444; padding: 10px; } ';
        style.innerHTML += '.descriptor { font-size: 15px; padding-right: 30px; min-width: 110px; } ';
        style.innerHTML += '.lineItem { display: flex; margin-top: 10px; width: 300px; justify-content: right; } ';
        style.innerHTML += '.metricValue { min-width: 150px } ';
        style.innerHTML += '#cadresistprogress { width: 0%; transition: 990ms linear; height: 2px; background-color: #F00; margin-top: 20px; } ';
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    injectUI() {
        const outputDiv = document.createElement('div');
        outputDiv.id = 'overlayContainer';
        outputDiv.innerHTML =
            `<div id="targetMetrics" class="statsContainer">
                <div class="lineItem">
                    <div class="descriptor">resistance (peloton)</div>
                    <div id="pReistanceValue" class="metricValue">0</div>
                </div>
                <div class="lineItem">
                    <div class="descriptor">resistance (adj %)</div>
                    <div id="tReistanceValue" class="metricValue">0</div>
                </div>
                <div class="lineItem">
                    <div class="descriptor">cadence</div>
                    <div id="cadenceValue" class="metricValue">0</div>
                </div>
                <div id="cadresistprogress"></div>
            </div>`;
        outputDiv.innerHTML +=
            `<div id="trainerOutput" class="statsContainer">
                <div class="lineItem">
                    <div class="descriptor">trainer:</div>
                    <div class="descriptor" id="trainerName">${this.bluetoothName || 'connecting...'}</div>
                </div>
                <div class="lineItem">
                    <div class="descriptor">cadence</div>
                    <div id="actualCadenceValue" class="metricValue">0</div>
                </div>
                <div class="lineItem">
                    <div class="descriptor">power</div>
                    <div id="powerValue" class="metricValue">0</div>
                </div>
            </div>`;

        document.querySelector("div[class='jw-wrapper jw-reset']").after(outputDiv);
    }

    async getRideDetails() {
        const response = await fetch(
            `https://api.onepeloton.com/api/ride/${this.rideId}/details?stream_source=multichannel`,
            {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US",
                    "peloton-platform": "web",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "x-requested-with": "XmlHttpRequest"
                },
                "referrer": `https://members.onepeloton.com/classes/player/${this.rideId}`,
                "referrerPolicy": "no-referrer-when-downgrade",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            });

        this.rideDetails = await response.json();
        this.classDuration = Number(this.rideDetails.ride.duration);
        this.pedalingStartOffset = Number(this.rideDetails.ride.pedaling_start_offset);
        return this.rideDetails;
    }

    async getBluetoothTrainer() {
        this.trainerBusy = true;
        const response = await fetch("http://127.0.0.1:8000/discover");
        const devices = await response.json();
        this.trainerBusy = false;
        this.bluetoothAddress = devices.find(dev => dev.name.toLowerCase().includes('tacx')).address;
        this.bluetoothName = devices.find(dev => dev.name.toLowerCase().includes('tacx')).name;
        document.getElementById('trainerName').innerHTML = this.bluetoothName;
        return this.bluetoothAddress;
    }

    async setTrainerResistance(bluetoothAddress, resistance, timecode) {
        if (this.lastTrainerPush + this.trainerBuffer >= timecode) return;
        this.lastTrainerPush = timecode;

        console.log(`Setting resistance of ${resistance} for trainer at ${bluetoothAddress}`);

        try {
            if (this.trainerBusy) return;
            this.trainerBusy = true;
            const response = await fetch(`http://127.0.0.1:8000/trainer/${bluetoothAddress}/resistance/${resistance}`, { method: 'POST' });
            const stats = await response.json();
            this.trainerBusy = false;
            if (typeof stats.instantaneous_cadence !== "undefined") document.getElementById('actualCadenceValue').innerHTML = `${stats.instantaneous_cadence} rpm`;
            if (typeof stats.instantaneous_power !== "undefined") document.getElementById('powerValue').innerHTML = `${stats.instantaneous_power} watts`;
            console.log(`success setting trainer resistance to ${resistance}`);
        } catch (e) {
            console.error(`failed to set trainer resistance to ${resistance}`);
        }
    }

    convertResistance(min, max) {
        return {
            percent: {
                min: Math.floor((min / 200) * 100),
                max: Math.floor((max / 200) * 100),
                avg: Math.floor((((min + max) / 2) / 200) * 100),
            },
        }
    }

    updateUiOutput(cue, timecode) {
        const trainer = this.convertResistance(cue.resistance_range.lower, cue.resistance_range.upper);
        document.getElementById('pReistanceValue').innerHTML = `${cue.resistance_range.lower} - ${cue.resistance_range.upper}`;
        document.getElementById('cadenceValue').innerHTML = `${cue.cadence_range.lower} - ${cue.cadence_range.upper} rpm`;
        document.getElementById('tReistanceValue').innerHTML = `${trainer.percent.min} - ${trainer.percent.max} %`;

        let cadResisProgressDiv = document.getElementById('cadresistprogress');

        if (timecode == Number(cue.offsets.start)) {
            cadResisProgressDiv.style.transition = "none";
            cadResisProgressDiv.style.width = "0%";
        } else {
            cadResisProgressDiv.style.transition = "990ms linear";
            cadResisProgressDiv.style.width = Math.round((((timecode) - cue.offsets.start) / (cue.offsets.end - cue.offsets.start)) * 100) + "%";
        }
    }

    findMatchingMetricOffset(timecode) {
        const cues = this.rideDetails.instructor_cues;
        return cues.find(c => Number(c.offsets.start) <= timecode && Number(c.offsets.end) >= timecode);
    }

    handlePageUpdate(_mutations) {
        let timestamp = document.querySelector("p[data-test-id='time-to-complete']");
        if (!timestamp) return; // maybe throw up an UI update here

        timestamp = timestamp.innerHTML.split(":");
        if (timestamp.length != 2) return;

        this.uiTimecode = (this.classDuration - (Number(timestamp[0]) * 60 + Number(timestamp[1])))
            + Number(this.pedalingStartOffset);

        this.updateUiOutput(this.findMatchingMetricOffset(this.uiTimecode), this.uiTimecode);

        this.trainerTimecode = this.uiTimecode + 20;

        const { resistance_range } = this.findMatchingMetricOffset(this.trainerTimecode);
        this.setTrainerResistance(this.bluetoothAddress, resistance_range.lower, this.uiTimecode);
    }
}

const start = async () => {
    const link = new pelotonLink();
    await link.getRideDetails();
    const mPar = document.querySelector("div[class='player-overlay-wrapper']");
    const options = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
    };
    const notifyDomUpdate = (m) => link.handlePageUpdate(m);

    const observer = new MutationObserver(notifyDomUpdate);
    observer.observe(mPar, options);
}

// TODO: this is super janky, find a better way to 
// detect that the player is loaded
setTimeout(() => start(), 10000);
