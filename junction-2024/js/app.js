import Proposition from "./proposition.js";
import Person from "./person.js";
import Simulation from "./simulation.js";

const simulation = new Simulation(12, 0.2);

var itemOfInterest = 0;
var currentPerson;
simulation.initialize();

const proposition = simulation.proposition;

document.addEventListener("DOMContentLoaded", function () {
  const setupbtn = document.getElementById("repset");
  
  if (setupbtn) {
    setupbtn.addEventListener('click', function () {

      [11, 9, 8].forEach(i => {
        simulation.people[i - 1].setDefenceDelegate(10);
        simulation.people[i - 1].setEducationDelegate(10);
        simulation.people[i - 1].setHealthDelegate(10);
        simulation.people[9].addVoteInfluenceEducation(0.9);
        simulation.people[9].addVoteInfluenceHealth(0.9);
        simulation.people[9].addVoteInfluenceDefence(0.9);
      });

      [12, 2, 3].forEach(i => {
        simulation.people[i - 1].setDefenceDelegate(1);
        simulation.people[i - 1].setEducationDelegate(1);
        simulation.people[i - 1].setHealthDelegate(1);
        simulation.people[1].addVoteInfluenceEducation(0.9);
        simulation.people[1].addVoteInfluenceHealth(0.9);
        simulation.people[1].addVoteInfluenceDefence(0.9);
      });

      [4, 6, 7].forEach(i => {
        simulation.people[i - 1].setDefenceDelegate(5);
        simulation.people[i - 1].setEducationDelegate(5);
        simulation.people[i - 1].setHealthDelegate(5);
        simulation.people[5].addVoteInfluenceEducation(0.9);
        simulation.people[5].addVoteInfluenceHealth(0.9);
        simulation.people[5].addVoteInfluenceDefence(0.9);
      });

      drawLines(simulation);
    });
  }
  document.getElementById('lawDefence').value = proposition.defence.toFixed(2);
  document.getElementById('lawEducation').value = proposition.education.toFixed(2);
  
  document.getElementById('lawHealth').value = proposition.health.toFixed(2);
  document.getElementById('lawImportance').value = proposition.importance.toFixed(2);

  document.getElementById("runVote").addEventListener('click', function () {
    simulation.setupVoting();
    simulation.simulateVoting();
    simulation.getConnections();
    drawLines(simulation);

    const container = document.getElementById('array-container');
    container.textContent = simulation.results;
  });

  document.getElementById("runRawVote").addEventListener('click', function () {
    simulation.simulateVoting();

    const container = document.getElementById('array-container');
    container.textContent = simulation.results;
  });
});


function drawLines(sim) {
  sim.getConnections();

  const colorMap = {
    0: "transparent",
    1: "#002F6C",
    2: "purple", 
    3: "magenta",
    4: "red",
    5: "orange",
    6: "green",
    7: "#002F6C",
    8: "white"
  };

  for (const [key, value] of Object.entries(simulation.connections)) {
    const path = document.getElementById(key);
    if (path) {
        path.setAttribute("stroke", colorMap[value]);
        path.setAttribute("stroke-width", 4);
    }
  }
}

drawLines(simulation)

document.getElementById('propositionForm').addEventListener('submit', function(event) {
  event.preventDefault();

  proposition.setDefence(parseFloat(document.getElementById('lawDefence').value));
  proposition.setEducation(parseFloat(document.getElementById('lawEducation').value));
  proposition.setHealth(parseFloat(document.getElementById('lawHealth').value));
  proposition.setImportance(parseFloat(document.getElementById('lawImportance').value));

  console.log(proposition);
});


const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


document.getElementById('floatForm').addEventListener('submit', function(event) {
  event.preventDefault();

  currentPerson.setDefence(parseFloat(document.getElementById('defenceOpinion').value));
  currentPerson.setDefenceImportance(parseFloat(document.getElementById('defenceImportance').value));
  
  currentPerson.setHealth(parseFloat(document.getElementById('healthOpinion').value));
  currentPerson.setHealthImportance(parseFloat(document.getElementById('healthImportance').value));
  
  currentPerson.setEducation(parseFloat(document.getElementById('educationOpinion').value));
  currentPerson.setEducationImportance(parseFloat(document.getElementById('educationImportance').value));
  
  currentPerson.setPoliticalEngagement(parseFloat(document.getElementById('politicalEngagement').value));
  currentPerson.setImportanceThreshold(parseFloat(document.getElementById('importanceThreshold').value));

  console.log(currentPerson);
});


const delegateButtons = ['delegateEducation', 'delegateDefence', 'delegateHealth'];

var isDelegating = false;
var delegateAction = '';

elements.forEach(element => {
  let currentElement = document.getElementById(element);

  currentElement.addEventListener('click', function () {

    if (isDelegating) {
      let targetPerson = simulation.people[element - 1];      
      if (element == 0) {
        switch (delegateAction) {
          case 'delegateEducation':
            currentPerson.setEducationDelegate(currentPerson.id);
            drawLines(simulation);
            console.log('Delegated education from', currentPerson, 'to', targetPerson);
            break;
          case 'delegateDefence':
            currentPerson.setDefenceDelegate(currentPerson.id);
            drawLines(simulation);
            console.log('Delegated defence from', currentPerson, 'to', targetPerson);
            break;
          case 'delegateHealth':
            currentPerson.setHealthDelegate(currentPerson.id);
            drawLines(simulation);
            console.log('Delegated health from', currentPerson, 'to', targetPerson);
            break;
        }
      } else {
        switch (delegateAction) {
          case 'delegateEducation':
            if (targetPerson.educationDelegate != currentPerson.id) {
              currentPerson.setEducationDelegate(element);
              drawLines(simulation);
              console.log('Delegated education from', currentPerson, 'to', targetPerson);
            }
            break;
          case 'delegateDefence':
            if (targetPerson.defenceDelegate != currentPerson.id) {
              currentPerson.setDefenceDelegate(element);
              drawLines(simulation);
              console.log('Delegated defence from', currentPerson, 'to', targetPerson);
            }
            break;
          case 'delegateHealth':
            if (targetPerson.healthDelegate != currentPerson.id) {
              currentPerson.setHealthDelegate(element);
              drawLines(simulation);
              console.log('Delegated health from', currentPerson, 'to', targetPerson);
            }
            break;
        }
      }
      isDelegating = false;
    } else if (element != 0) {
      // Normal operation: select current person and update form
      itemOfInterest = element;
      currentPerson = simulation.people[itemOfInterest - 1];
      
      // Update the form fields with currentPerson's data
      document.getElementById('defenceOpinion').value = currentPerson.defenceOpinion.toFixed(2);
      document.getElementById('defenceImportance').value = currentPerson.defenceImportance.toFixed(2);
      
      document.getElementById('educationOpinion').value = currentPerson.educationOpinion.toFixed(2);
      document.getElementById('educationImportance').value = currentPerson.educationImportance.toFixed(2);
      
      document.getElementById('healthOpinion').value = currentPerson.healthOpinion.toFixed(2);
      document.getElementById('healthImportance').value = currentPerson.healthImportance.toFixed(2);
      
      document.getElementById('politicalEngagement').value = currentPerson.politicalEngagement.toFixed(2);
      document.getElementById('importanceThreshold').value = currentPerson.importanceThreshold.toFixed(2);

      // Add event listeners to the delegate buttons
      delegateButtons.forEach(buttonId => {
        let button = document.getElementById(buttonId);
        button.removeEventListener('click', delegateHandler); // Remove previous handlers
        button.addEventListener('click', delegateHandler);
      });
    }
  });
});



function delegateHandler(event) {
  isDelegating = true;
  delegateAction = event.target.id;
  console.log('Select a person to delegate', delegateAction, 'to');
}
