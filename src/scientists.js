function Scientist(scientistData) {
    this.skills = scientistData.skills;
    this.knowledgePassingSpeed = scientistData.knowledgePassingSpeed;
    this.paperWritingSpeed = scientistData.paperWritingSpeed;
    this.team = null;
    this.knowledge = [];
    for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
        this.knowledge.push(0.0);
    }
    this.doWork = function () {
        for (var i = 0; i < this.skills.length; i++) {
            this.knowledge[i] += this.skills[i];
        }
    }
}

var publicationsInProgress = [];
var publicationsFinished = [];

function Team(teamData) {
    this.teamID = teamData.teamID;
    this.members = [];
    for (var i = 0; i < teamData.members.length; i++){
        this.members.push(new Scientist(teamData.members[i]));
        this.members[i].teamID = this.teamID;
    }
    this.discoveries = new Set();
    this.teamDiscoveries = [];
    this.writtenPapers = [];
    this.knowledge = [];
    this.currentDiscovery = null;
    this.meetingProbability = teamData.meetingProbability;
    this.publicationInProgress = false;
    this.discoveriesToWrite = new Queue();
    this.meetingCount = 0;
    this.addMember = function (member) {
        member.team = teamID;
        this.members.push(member);
    };
    for (i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
        this.knowledge.push(0.0);
    }

    this.completionStatus = function () {
        for (var j = 0; j < this.members.length; j++) {
            var discoveryRequirementsMet = true;
            for (var i = 0; i < this.currentDiscovery.knowledgeFields.length; i++) {
                if (this.knowledge[i] + this.members[j].knowledge[i] < this.currentDiscovery.knowledgeFields[i]) {
                    discoveryRequirementsMet = false;
                }
            }
            if (discoveryRequirementsMet === true) {
                return true;
            }
        }
        return false;
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
            this.meetingCount += 1;
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
        if (this.currentDiscovery !== null && this.completionStatus()) {
            this.discoveries.add(this.currentDiscovery);
            this.teamDiscoveries.push(this.currentDiscovery);
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
            publicationsFinished.push(this.discoveriesToWrite.peek());
            this.writtenPapers.push(this.discoveriesToWrite.peek());
            awaitingPapers.push({discovery: this.discoveriesToWrite.dequeue(), delay: PUBLICATIONDELAY});
            this.publicationInProgress = false;
        }
    }
}

function generateTeams(teamsData) {
    var teams = [];
    for (var i = 0; i < TEAMCOUNT; i++) {
        teams.push(new Team(teamsData[i]));
    }
    return teams;
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
                for (var j = 0; j < tree.existingNodes[i].ingredients.length; j++) {
                    if (team.discoveries.has(tree.existingNodes[tree.existingNodes[i].ingredients[j]])) {
                        ingredientsDiscovered++;
                    }
                }
                console.log(JSON.stringify(tree.existingNodes[i]) + " Ingredients discovered: " + ingredientsDiscovered);
                if (ingredientsDiscovered / tree.existingNodes[i].ingredients.length >= INGREDIENTSTOPROCEED) {
                    for (var j = 0; j < (tree.existingNodes[i].ingredients.length+1)*(tree.existingNodes[i].ingredients.length+1); j++)
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

