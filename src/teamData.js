function TeamData(teamID) {
    this.teamID = teamID;
    this.members = [];
    this.meetingProbability = Math.floor(Math.random() * MEETINGPROBABILITY*100)/100;
}

function ScientistData(skills, knowledgePassingSpeed, paperWritingSpeed) {
    this.skills = skills;
    this.knowledgePassingSpeed = knowledgePassingSpeed;
    this.paperWritingSpeed = paperWritingSpeed;
    this.teamDataID = null;
}

function generateScientistData() {
    var skills = [];
    for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
        skills.push(Math.round(Math.random() * KNOWLEDGESPEED * 100) / 100);
    }
    return new ScientistData(skills, Math.round(Math.random() * COMMUNICATIONSPEED * 100) / 100, Math.round(Math.random() * PAPERSPEED * 100) / 100)
}

function generateTeamsData() {
    var teams = [];
    for (var i = 0; i < TEAMCOUNT; i++) {
        var team = new TeamData(i);
        var k = Math.floor(Math.random() * SCIENTISTSPERTEAM) + 1;
        for (var j = 0; j < k; j++) {
            team.members.push(generateScientistData());
            team.members[j].teamDataID = i;
        }
        teams.push(team);
    }
    return teams;
}