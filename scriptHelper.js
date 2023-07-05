// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
        missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}>
                `
}

function validateInput(testInput) {
    // document.addEventListener("submit", function(event) {
    //     event.preventDefault();
    // });
    if (testInput === '' || testInput === null || testInput === 0) {
        return "Empty"
    } else if ((!isNaN(Number(testInput)))) {
        return "Is a Number"
    } else {
        return "Not a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert('All fields are required');
    } else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert(`Please enter numerical values for Fuel Level and Cargo Mass`);
    } else if (validateInput(pilot)===`Is a Number`||validateInput(copilot)===`Is a Number`) {
        alert('Please do not enter numbers for name of pilot or co-pilot');
    } else {
    pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
    list.style.visibility = 'hidden';
    }

    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = `Not enough fuel for the the journey`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = `Cargo Mass is too large for the journey`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    } else {
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = `green`;
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
