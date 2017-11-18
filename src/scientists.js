function Scientist(skills,knowledgePassingSpeed,paperWritingSpeed) {
    this.skills = skills;
    this.knowledgePassingSpeed = knowledgePassingSpeed;
    this.paperWritingSpeed = paperWritingSpeed;
    this.team = null;
    this.knowledge = [];
    for (var i=0; i<KNOWLEDGEFIELDSCOUNT; i++) {
        this.knowledge.push(0.0);
    }
}

function Team(teamID){
    this.teamID = teamID;
    this.members = [];
    this.discoveries = [];
    this.knowledge = [];

    this.addMember = function(member){
        member.team = teamID;
        this.members.push(member);
    };
    for (var i=0; i<KNOWLEDGEFIELDSCOUNT; i++) {
        this.knowledge.push(0.0);
    }
}

function generateTeams(){
    var teams = [];
    for (var i=0; i<TEAMCOUNT;i++){
        var team = new Team(i);
        var k = Math.floor(Math.random()*SCIENTISTSPERTEAM)+1;
        for(var j=0;j<k;j++){
            team.addMember(generateScientist());
        }
        teams.push(team);
    }
    return teams;
}

function generateScientist(){
    var skills = [];
    for(var i=0;i<KNOWLEDGEFIELDSCOUNT; i++){
        skills.push(Math.round(Math.random()*KNOWLEDGESPEED*100)/100);
    }
    return new Scientist(skills,Math.round(Math.random()*COMMUNICATIONSPEED*100)/100,Math.round(Math.random()*PAPERSPEED*100)/100)
}

var teams = generateTeams();

function displayTeams(teams){
    for(var i=0;i<teams.length;i++){
        document.write(teams[i].teamID + ":<br>" );
        for(var j=0;j<teams[i].members.length;j++){
            document.write(teams[i].members[j].skills + "; " + teams[i].members[j].knowledgePassingSpeed + "; " +
                teams[i].members[j].paperWritingSpeed + "<br>");
        }
        document.write("<br>");
    }
}

displayTeams(teams);