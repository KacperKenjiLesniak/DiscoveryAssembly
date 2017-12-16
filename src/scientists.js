function Scientist(skills, knowledgePassingSpeed, paperWritingSpeed) {
    this.skills = skills;
    this.knowledgePassingSpeed = knowledgePassingSpeed;
    this.paperWritingSpeed = paperWritingSpeed;
    this.team = null;
    this.knowledge = [];
    for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
        this.knowledge.push(0.0);
    }
    this.doWork = function () {
        for (var i = 0; i < skills.length; i++) {
            this.knowledge[i] += this.skills[i];
        }
    }
}

var publicationsInProgress = [];
var publicatoinsFinished = [];

function Team(teamID) {
    this.teamID = teamID;
    this.members = [];
    this.discoveries = new Set();
    this.knowledge = [];
    this.currentDiscovery = null;
    this.meetingProbability = Math.random() * MEETINGPROBABILITY;
    this.publicationInProgress = false;
    this.discoveriesToWrite = new Queue();
    this.addMember = function (member) {
        member.team = teamID;
        this.members.push(member);
    };
    for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
        this.knowledge.push(0.0);
    }

    this.completionStatus = function () {
        for (var i = 0; i < this.currentDiscovery.knowledgeFields.length; i++) {
            for (var j = 0; j < this.members.length; j++) {
                if (this.knowledge[i] + this.members[j].knowledge[i] < this.currentDiscovery.knowledgeFields[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    this.doWork = function () {
        var choiceList = [];
        var meetingList = [];
        for (var i = 0; i < this.members.length; i++) {
            if (this.currentDiscovery === null) {
                choiceList.push(2);
            }
            else if (Math.random() < PAPERPROBABILITY && this.publicationInProgress) {
                choiceList.push(2);
            }
            else if (Math.random() < this.meetingProbability) {
                choiceList.push(1);
                meetingList.push(i);
            }
            else choiceList.push(0);
        }
        if (meetingList.length > 0 && this.members.length > 1) {
            var speaker = this.members[meetingList[Math.floor(Math.random() * meetingList.length)]];
            if (speaker.knowledge[0] < speaker.skills[0] * speaker.knowledgePassingSpeed) {
                for (var j = 0; j < speaker.knowledge.length; j++) {
                    this.knowledge[j] += speaker.knowledge[j];
                    speaker.knowledge[j] = 0;
                }
            }
            else {
                for (var j = 0; j < speaker.knowledge.length; j++) {
                    this.knowledge[j] += speaker.skills[j] * speaker.knowledgePassingSpeed;
                    speaker.knowledge[j] -= speaker.skills[j] * speaker.knowledgePassingSpeed;
                }
            }
        }
        else {
            for (var i = 0; i < this.members.length; i++) {
                if (choiceList[i] === 2){
                    this.paperProgress -= this.members[i].paperWritingSpeed;
                }
                else {
                    this.members[i].doWork();
                }
            }
        }
        if (this.currentDiscovery != null && this.completionStatus()) {
            this.discoveries.add(this.currentDiscovery);
            console.log(nodeSet.get(this.currentDiscovery.nodeID).color.background);
            if(nodeSet.get(this.currentDiscovery.nodeID).color.background === 'pink') {
                nodeSet.update([{id: this.currentDiscovery.nodeID, color:{background: '#ffcc00'}}]);
            }
            for (var i = 0; i < this.knowledge.length; i++) {
                this.knowledge[i] = 0;
                for (var j = 0; j < this.members.length; j++) {
                    this.members[j].knowledge[i] = 0;
                }
            }
            this.discoveriesToWrite.enqueue(this.currentDiscovery);
            this.currentDiscovery = null;
        }
        if(this.discoveriesToWrite.getLength()>0 && !this.publicationInProgress){
            publicationsInProgress.push(this.discoveriesToWrite.peek());
            this.publicationInProgress = true;
            this.paperProgress = 0;
            for(var i=0; i<this.discoveriesToWrite.peek().knowledgeFields.length; i++){
                this.paperProgress += this.discoveriesToWrite.peek().knowledgeFields[i];
            }
        }
        if(this.paperProgress <= 0 && this.publicationInProgress){
            publicatoinsFinished.push(this.discoveriesToWrite.peek());
            awaitingPapers.push({discovery: this.discoveriesToWrite.dequeue(), delay: PUBLICATIONDELAY});
            this.publicationInProgress = false;
        }
    }
}

function generateTeams() {
    var teams = [];
    for (var i = 0; i < TEAMCOUNT; i++) {
        var team = new Team(i);
        var k = Math.floor(Math.random() * SCIENTISTSPERTEAM) + 1;
        for (var j = 0; j < k; j++) {
            team.addMember(generateScientist());
        }
        teams.push(team);
    }
    return teams;
}

function generateScientist() {
    var skills = [];
    for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
        skills.push(Math.round(Math.random() * KNOWLEDGESPEED * 100) / 100);
    }
    return new Scientist(skills, Math.round(Math.random() * COMMUNICATIONSPEED * 100) / 100, Math.round(Math.random() * PAPERSPEED * 100) / 100)
}


function displayTeams(teams) {
    for (var i = 0; i < teams.length; i++) {
        document.write(teams[i].teamID + "<br>");
        document.write(teams[i].meetingProbability + "<br>");
        for (var j = 0; j < teams[i].members.length; j++) {
            document.write(teams[i].members[j].skills + "; "
                + teams[i].members[j].knowledgePassingSpeed + "; "
                + teams[i].members[j].paperWritingSpeed + "<br>");
        }
        document.write("<br>");
    }
}

function displayKnowledge(teams) {
    for (var i = 0; i < teams.length; i++) {
        console.log("Team ID: " + teams[i].teamID);
        console.log("Team knowledge: " + teams[i].knowledge);
        if(teams[i].currentDiscovery != null)
            console.log("Current discovery: " + teams[i].currentDiscovery.nodeID);
        console.log("Team discoveries:");
        teams[i].discoveries.forEach(function(value) { console.log(value.nodeID) })
        // console.log("Mombers skills and knowledge: ");
        // for (var j = 0; j < teams[i].members.length; j++) {
        //     console.log(teams[i].members[j].skills + "; "
        //         + teams[i].members[j].knowledge);
        // }
    }
}

function nextDiscoveryWith(team, tree) {
    var possibleNextDiscoveries = [];
    for (var i = 0; i < tree.existingNodes.length; i++) {
        if (!team.discoveries.has(tree.existingNodes[i])) {
            if (tree.existingNodes[i].ingredients.length === 0) {
                possibleNextDiscoveries.push(tree.existingNodes[i]);
            }
            else {
                var ingredientsDiscovered = 0;
                console.log(ingredientsDiscovered);
                for (var j = 0; j < tree.existingNodes[i].ingredients.length; j++) {
                    if (team.discoveries.has(tree.existingNodes[i].ingredients[j])) {
                        ingredientsDiscovered++;
                    }
                }
                console.log(ingredientsDiscovered);
                if (ingredientsDiscovered / tree.existingNodes[i].ingredients.length >= INGREDIENTSTOPROCEED) {
                    possibleNextDiscoveries.push(tree.existingNodes[i]);
                }
            }
        }
    }
    if(possibleNextDiscoveries.length === 0)
        return null;
    team.currentDiscovery = possibleNextDiscoveries[Math.floor(Math.random() * possibleNextDiscoveries.length)];
    return team.currentDiscovery.nodeID;
}

