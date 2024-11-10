

export default class Proposition {
    constructor(defence = 0, education = 0, health = 0, importance = 0) {
        this.importance = importance;
        this.yesVotes = 0;
        this.noVotes = 0;

        this.defence = defence;     // Impact on defence
        this.education = education; // Impact on education
        this.health = health;       // Impact on health    
    }
    
    addYesVote(votes) {this.yesVotes + votes;}
    addNoVote(votes) {this.noVotes + votes;}

    get category() {
        return [Math.abs(this.defence), Math.abs(this.education), Math.abs(this.health)].indexOf(
            Math.max(Math.abs(this.defence), Math.abs(this.education), Math.abs(this.health))
        );
    }

    get passed() {
        return this.yesVotes > this.noVotes;
    }

    setDefence(input) {this.defence = input;}
    setEducation(input) {this.education = input;}
    setHealth(input) {this.health = input;}
    setImportance(input) {this.importance = input;}
}

