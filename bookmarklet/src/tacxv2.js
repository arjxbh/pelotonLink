class pelotonLink {
    constructor() {
        this.rideId = window.location.pathname.split('/').pop();
        this.lastTrainerUpdate = 0;
        this.rideDetails = {};
        this.uiTimecode = 0;
        this.trainerTimecode = 0;
        this.classDuration = 0;
        this.pedalingStartOffset = 0;
        this.trainerBuffer = 10; // minimum seconds between pushes to trainer
        this.lastTrainerPush = 0;
        this.bluetoothAddress = '';
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

    async getBluetoothAddress() {
        const response = await fetch("http://127.0.0.1:8000/discover");
        const devices = await response.json();
        this.bluetoothAddress = devices.find(dev => dev.name.toLowerCase().includes('tacx')).address;
        return this.bluetoothAddress;
    }

    async setTrainerResistance(bluetoothAddress, resistance, timecode) {
        if (this.lastTrainerPush + this.trainerBuffer >= timecode) return;
        this.lastTrainerPush = timecode;

        console.log(`Setting resistance of ${resistance} for trainer at ${bluetoothAddress}`);

        try {
            const response = await fetch(`http://127.0.0.1:8000/trainer/${bluetoothAddress}/resistance/${newResistance}`, { method: 'POST' });
            const stats = await response.json();
            // TODO: use stats to update UI
            console.log(`success setting trainer resistance to ${resistance}`);
        } catch (e) {
            console.err(`failed to set trainer resistance to ${resistance}`);
        }
    }

    convertResistance(min, max) {

    }

    updateUiOutput(cue) {
        console.log('update UI!')
        console.log(`cadence: ${cue.cadence_range.lower} - ${cue.cadence_range.upper}`);
        console.log(`reistance: ${cue.resistance_range.lower} - ${cue.resistance_range.upper}`);
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

        // do we really need pedaling start offset???
        this.uiTimecode = (this.classDuration - (Number(timestamp[0]) * 60 + Number(timestamp[1])))
            + Number(this.pedalingStartOffset);

        this.updateUiOutput(this.findMatchingMetricOffset(this.uiTimecode));

        this.trainerTimecode = this.uiTimecode + Number(this.pedalingStartOffset);

        console.log('Trainer::::');
        console.log(this.findMatchingMetricOffset(this.trainerTimecode));
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

start();
