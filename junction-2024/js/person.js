
export default class Person {
    constructor(id, 
        delegate = false, 
        politicalEngagement = 0.5, 
        importanceThreshold = 0.5, 

        defenceOpinion = 0, 
        educationOpinion = 0, 
        healthOpinion = 0, 

        defenceImportance = 0.5,
        educationImportance = 0.5,
        healthImportance = 0.5,

        elementId = null) {

        // General attributes
        this.id = id;                // Unique ID for each person
        this.elementId = elementId;  // Element ID for each person for UI purposes
        this.delegate = delegate;    // Can they receive votes or not and are their votes public?

        this.votingInfluenceHealth = 1;    // Number of fractional votes controlled by the person
        this.votingInfluenceDefence = 1;    // Number of fractional votes controlled by the person
        this.votingInfluenceEducation = 1;    // Number of fractional votes controlled by the person

        // Voting behaviour traits
        this.politicalEngagement = politicalEngagement;  // How likely they are to vote themselves between 0-1
        this.importanceThreshold = importanceThreshold;  // How important an issue has to be for them to want to vote by themselves between 0-1

        // One-dimensional opinions on each category ranging between 0-1
        // The positions are exact so that movement further away is always worse regardless of direction
        this.defenceOpinion = defenceOpinion;
        this.educationOpinion = educationOpinion;
        this.healthOpinion = healthOpinion;

        // One-dimensional opinions on the importance of each category ranging between 0-1
        this.defenceImportance = defenceImportance;
        this.educationImportance = educationImportance;
        this.healthImportance = healthImportance;

        // IDs of the delegates for each category who use the vote of this person in the given category
        this.defenceDelegate = this.id;
        this.educationDelegate = this.id;
        this.healthDelegate = this.id;
    }

    isDelegate() {return this.delegate;}
    makeDelegate() {this.delegate = true;}
    makeNotDelegate() {this.delegate = false;}

    setDefenceDelegate(input) {this.defenceDelegate = input;}
    setEducationDelegate(input) {this.educationDelegate= input;}
    setHealthDelegate(input) {this.healthDelegate = input;}

    setDefence(input) {this.defenceOpinion = input}
    setHealth(input) {this.healthOpinion = input}
    setEducation(input) {this.educationOpinion = input}

    
    setDefenceImportance(input) {this.defenceImportance = input}
    setHealthImportance(input) {this.healthImportance = input}
    setEducationImportance(input) {this.educationImportance = input}
    
    setPoliticalEngagement(input) {this.politicalEngagement = input}
    setImportanceThreshold(input) {this.importanceThreshold = input}

    addVoteInfluenceHealth(input) {this.votingInfluenceHealth += input;}
    addVoteInfluenceDefence(input) {this.votingInfluenceDefence += input;}
    addVoteInfluenceEducation(input) {this.votingInfluenceEducation += input;}
}