import Person from './person.js';
import Proposition from './proposition.js';

export default class Simulation {
    constructor(numberOfPeople, delegateProportion) {
        this.numberOfPeople = numberOfPeople;         // Number of people in the simulation
        this.delegateProportion = delegateProportion; // Probabilistic proportion of people who enlist themselves as delegates
        this.penaltyMultiplier = 0.9;                 // Multiplier for a delegated vote
        this.people = [];
        this.delegates = [];
        this.connections = {};
        this.results = [];
        this.proposition = new Proposition(Math.random(), Math.random(), Math.random(), Math.random());
    }


    // Generate a random number between -1 and 1
    #randomNumber() {
        return ((Math.random() - 0.5) * 2);
    }

    #updateDelegatesList() {
        this.delegates = [];
        for (let i = 0; i < this.numberOfPeople; i++) {
            if (this.people[i].isDelegate()) {
                this.delegates.push(this.people[i]);
            }
        }
    }

    // Simulate the voting behaviour of a person with respect to a proposition proposition
    #getPropositionVote(person, proposition) {
        let currentDissatisfaction = person.defenceImportance * (person.defenceOpinion) ** 2 + person.educationImportance * (person.educationOpinion) ** 2 + person.healthOpinion * (person.healthOpinion) ** 2;

        let newDissatisfaction = person.defenceImportance * (proposition.defence - person.defenceOpinion) ** 2 + person.educationImportance * (proposition.education - person.educationOpinion) ** 2 + person.healthOpinion * (proposition.health - person.healthOpinion) ** 2;

        if (newDissatisfaction < currentDissatisfaction) {
            return true;
        } 
        
        return false;
    }

    // Evaluate the voting of a proposition based on the average dissatisfaction its passing or not passing causes among the people - lower is better
    #evaluateVote() {
        let totalDissatisfaction = 0;
        let proposition = this.proposition;

        for (let i = 0; i < this.numberOfPeople; i++) {
            let person = this.people[i];
            totalDissatisfaction = person.defenceImportance * (proposition.defence - person.defenceOpinion) ** 2 + person.educationImportance * (proposition.education - person.educationOpinion) ** 2 + person.healthOpinion * (proposition.health - person.healthOpinion) ** 2;
        }

        let averageDissatisfaction = totalDissatisfaction / this.numberOfPeople;

        this.results.push(averageDissatisfaction);
    }


    initialize() {
        // Generate the people in the simulation with random attributes
        for (let i = 1; i <= this.numberOfPeople; i++) {
            this.people.push(new Person(i, this.#randomNumber() < this.delegateProportion ? true : false, this.#randomNumber(), this.#randomNumber(), this.#randomNumber(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()));
        }

        // Update the list of delegates based on the generated people
        this.#updateDelegatesList();

        // Edges / connections
        for (let i = 0; i <= this.numberOfPeople; i++) {
            for (let j = i + 1; j <= this.numberOfPeople; j++) {
                let key = `${i}_${j}`;
                this.connections[key] = 0;
            }
        }

    }


    // Simulate the delegation of votes
    delegateVote(person) {
        let minDivergenceED = Infinity;
        let chosenDelegateED = null;
        let minDivergenceHE = Infinity;
        let chosenDelegateHE = null;
        let minDivergenceDEF = Infinity;
        let chosenDelegateDEF = null;
        let category = this.proposition.category;

        this.delegates.forEach(delegate => {
            let defenceDivergence = person.defenceImportance * (delegate.defenceOpinion - person.defenceOpinion) ** 2;
            let educationDivergence = person.educationImportance * (delegate.educationOpinion - person.educationOpinion) ** 2;
            let healthDivergence = person.healthImportance * (delegate.healthOpinion - person.healthOpinion) ** 2;
            let totalDivergenceED;
            let totalDivergenceDEF;
            let totalDivergenceHE;

                    totalDivergenceED = educationDivergence;
                    totalDivergenceHE = healthDivergence;
                    totalDivergenceDEF = defenceDivergence;
  
            if (totalDivergenceED < minDivergenceED) {
                minDivergenceED = totalDivergenceED;
                chosenDelegateED = delegate;
            }

            if (totalDivergenceHE < minDivergenceHE) {
                minDivergenceHE = totalDivergenceHE;
                chosenDelegateHE = delegate;
            }

            if (totalDivergenceDEF < minDivergenceDEF) {
                minDivergenceDEF = totalDivergenceDEF;
                chosenDelegateDEF = delegate;
            }
        });
        // for (let delegate of this.delegates) {
            
        // }

        // Give penaltyMultiplier * 1 vote to the chosen delegate
        // Add delegate to person.domainDelegate

        // switch (category) {
        //     case 1: // education
                chosenDelegateED.addVoteInfluenceEducation(this.penaltyMultiplier);
                chosenDelegateHE.addVoteInfluenceHealth(this.penaltyMultiplier);
                chosenDelegateDEF.addVoteInfluenceDefence(this.penaltyMultiplier);
                person.setEducationDelegate(chosenDelegateED.id);
                // break;
            
            // case 2: // health
                person.setHealthDelegate(chosenDelegateHE.id);
                // break;

            // default: // defence
                person.setDefenceDelegate(chosenDelegateDEF.id);
                // break;
        // }
    }


    // Set up the round of voting
    setupVoting() {
        // A person will vote directly if the importance of the proposition is high enough and the gain in some domain is larger than the loss in the rest
        // The positions of the opinions are exact so that movement further away is always worse regardless of direction
        // Opinions are dynamic and change to 0 if the proposition pleases them fully, otherwise they are negative or positive depending on whether the proposition overshot or undershot their previous position

        // let category = this.proposition.category;

        for (let i = 0; i < this.numberOfPeople; i++) {
            let person = this.people[i];
            // let willVote = false;

            // if (this.proposition.importance > person.importanceThreshold) {
            //     willVote = true;
            // } else {
            //     switch (category) {
            //         case 1: // education
            //             if (person.educationDelegate == person.id) {
            //                 willVote = true;
            //             }
            //             break;
                    
            //         case 2: // health
            //             if (person.healthDelegate == person.id) {
            //                 willVote = true;
            //             }
            //             break;
        
            //         default: // defence
            //             if (person.defenceDelegate == person.id) {
            //                 willVote = true;
            //             }
            //             break;
            //     }
            // }

            // if (willVote) {
                // switch (category) {
                //     case 1: // education
                //         chosenDelegate.voteInfluenceEducation -= this.penaltyMultiplier;
                //         person.setEducationDelegate(person.id);
                //         break;

                //     case 2: // health
                //         chosenDelegate.voteInfluenceHealth -= this.penaltyMultiplier;
                //         person.setHealthDelegate(person.id);
                //         break;

                //     default: // defence
                //         chosenDelegate.voteInfluenceDefence -= this.penaltyMultiplier;
                //         person.setDefenceDelegate(person.id);
                //         break;
                // }
            // } else {
                
            // }
            if (!(person.isDelegate())) {
                this.delegateVote(person);
            }
        }
    }


    // Simulates a round defined as the reactions to a proposition proposition
    simulateVoting() {
        let proposition = this.proposition;

        for (let i = 0; i < this.numberOfPeople; i++) {
            let person = this.people[i];
            if (person.isDelegate()) {
                if (this.#getPropositionVote(person, proposition)) {
                    proposition.addYesVote(person.votingInfluence);
                } else {
                    proposition.addNoVote(person.votingInfluence);
                }
            }
        }

        var passed = proposition.passed;

        this.#evaluateVote()

        if (passed) {
            for (let i = 0; i < this.numberOfPeople; i++) {
                let person = this.people[i];
                person.defenceOpinion = (person.defenceOpinion - proposition.defence) + (this.#randomNumber() / 10);
                person.educationOpinion = (person.educationOpinion - proposition.education) + (this.#randomNumber() / 10);
                person.healthOpinion = (person.healthOpinion - proposition.health) + (this.#randomNumber() / 10);
            }
        }

        return passed;
    }


    getConnections() {
        for (let i = 0; i <= this.numberOfPeople; i++) {
            for (let j = i + 1; j <= this.numberOfPeople; j++) {
                let key = `${i}_${j}`;
                this.connections[key] = 0;
            }
        }

        this.people.forEach(element => {
            var id = element.id;
            [[element.defenceDelegate, 1], [element.healthDelegate, 2], [element.educationDelegate, 4]].forEach(([secId, num]) => {
                let key;
                if (secId != id) {
                    if (id > secId) {
                        key = `${secId}_${id}`;
                    } else {
                        key = `${id}_${secId}`;
                    }
                    this.connections[key] = this.connections[key] + num;
                } else {
                    key = `0_${id}`;
                    this.connections[key] = this.connections[key] + num;
                }
            });
        });
    }
}
