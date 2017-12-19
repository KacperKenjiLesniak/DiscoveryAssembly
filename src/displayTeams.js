function logSetElements(value1, value2, set) {
    document.getElementById('teams').innerHTML += value2.nodeID + ", ";
}

function displayTeams(teams) {
    document.getElementById('teams').innerHTML = "";
    for (var i = 0; i < teams.length; i++) {
        document.getElementById('teams').innerHTML += "Team ID: " + teams[i].teamID + "<br>";
        document.getElementById('teams').innerHTML += "Meeting Probability: " + teams[i].meetingProbability + "<br>";
        document.getElementById('teams').innerHTML += "Meetings occured: "+ teams[i].meetingCount + "<br>";
        for (var j = 0; j < teams[i].members.length; j++) {
            document.getElementById('teams').innerHTML += "Skills: " + teams[i].members[j].skills + "; "
                + "Knowledge passing speed: " + teams[i].members[j].knowledgePassingSpeed + "; "
                + "Paper writing speed: " + teams[i].members[j].paperWritingSpeed + "<br>";
        }
        document.getElementById('teams').innerHTML += "Current discovery: ";
        if (teams[i].currentDiscovery !== null )document.getElementById('teams').innerHTML += teams[i].currentDiscovery.nodeID;
        document.getElementById('teams').innerHTML += "<br>Current paper: ";
        if (!teams[i].discoveriesToWrite.isEmpty()) document.getElementById('teams').innerHTML += teams[i].discoveriesToWrite.peek().nodeID;

        document.getElementById('teams').innerHTML += "<br>Known discoveries: ";
        teams[i].discoveries.forEach(function (value1, value2, set) {
            document.getElementById('teams').innerHTML += value2.nodeID + ", ";
        });
        document.getElementById('teams').innerHTML += "<br>Team discoveries: ";
        for (var j = 0; j<teams[i].teamDiscoveries.length; j++){
            document.getElementById('teams').innerHTML += teams[i].teamDiscoveries[j].nodeID + ", ";
        }
        document.getElementById('teams').innerHTML += "<br>Team publications: ";
        for (var j = 0; j<teams[i].writtenPapers.length; j++){
            document.getElementById('teams').innerHTML += teams[i].writtenPapers[j].nodeID + ", ";
        }
        document.getElementById('teams').innerHTML += "<br><br>";
    }
}

function displayTeam(team, id) {
    var teamContainer = document.getElementById('team');
    var i;
    teamContainer.getElementsByClassName("TeamID").innerHTML = "Team ID: " + team.teamID;

    teamContainer.getElementsByClassName("CurrentDiscovery").innerHTML = "Current Discovery: ";
    if (team.currentDiscovery !== null)
        teamContainer.getElementsByClassName("CurrentDiscovery").innerHTML += team.currentDiscovery;

    teamContainer.getElementsByClassName("TeamKnowledge").innerHTML = "";
    for (i=0; i<team.knowledge.length; i++)
        teamContainer.getElementsByClassName("TeamKnowledge").innerHTML += team.knowledge[i] + " / ";

    teamContainer.getElementsByClassName("TeamDiscoveries").innerHTML = "Team discoveries: ";
    for (i = 0; j<team.teamDiscoveries.length; j++){
        teamContainer.getElementsByClassName("TeamDiscoveries").innerHTML += team.teamDiscoveries[j].nodeID + ", ";
    }

    teamContainer.getElementsByClassName("KnownDiscoveries").innerHTML = "Known discoveries: ";
    team.discoveries.forEach(function (value1, value2, set) {
        teamContainer.getElementsByClassName("KnownDiscoveries").innerHTML += value2.nodeID + ", ";
    });

    teamContainer.getElementsByClassName("PublicationInProgress").innerHTML = "Publication in progress: ";
    if (team.discoveriesToWrite.peek() !== null)
        teamContainer.getElementsByClassName("PublicationInProgress").innerHTML += team.discoveriesToWrite.peek().nodeID;

    teamContainer.getElementsByClassName("TeamPublications").innerHTML = "Team publications: ";
    for (i = 0; j<team.writtenPapers.length; j++){
        teamContainer.getElementsByClassName("TeamPublications").innerHTML += team.writtenPapers[j].nodeID + ", ";
    }
}