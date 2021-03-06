function displayTeams(teams){
    document.getElementById('teams').innerHTML = "";
    for (var i = 0; i < teams.length; i++) {
        var div = document.createElement("div");
        div.className = "Container";
        div.innerHTML = "<div class=\"TeamID\"></div>\n" +
            "    <div class=\"TeamIDDetails\">\n" +
            "        <div class=\"FirstColumn\">\n" +
            "            <div class=\"Labels\">\n" +
            "                <div class=\"CurrentDiscovery\"></div>\n" +
            "                <div class=\"PublicationInProgress\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"SubColumn\">\n" +
            "                <div class=\"TeamKnowledge\"></div>\n" +
            "                <div class=\"MeetingCount\" ></div>\n" +
            "                <div class=\"MeetingProbability\" ></div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <div class=\"SecondColumn\">\n" +
            "            <div class=\"KnownDiscoveries\"></div>\n" +
            "            <div class=\"TeamDiscoveries\"></div>\n" +
            "            <div class=\"TeamPublications\"></div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <div class=\"Members\"> \n" +
            "        <div class=\"MembersTitle\"></div>\n" +
            "        <div class=\"Button\"><i class=\"fa fa-caret-down\" aria-hidden=\"true\" ></i></div>\n" +
            "    </div>\n" +
            "    <div class=\"MemberList\"></div>" +
            "    <br>";
        div.id = i;
        // console.log(div.innerHTML);
        document.getElementById("teams").appendChild(div);
        displayTeam(teams[i], i);
    }
}

function displayTeam(team, id){
    var teamContainer = document.getElementById(id);
    var i;
    teamContainer.getElementsByClassName("TeamID")[0].innerHTML = "Team ID: " + team.teamID;

    teamContainer.getElementsByClassName("CurrentDiscovery")[0].innerHTML = "Current Discovery: ";
    if (team.currentDiscovery !== null)
        teamContainer.getElementsByClassName("CurrentDiscovery")[0].innerHTML += team.currentDiscovery.nodeID;

    teamContainer.getElementsByClassName("TeamKnowledge")[0].innerHTML = "Team knowledge: ";
    for (i=0; i<team.knowledge.length; i++)
        teamContainer.getElementsByClassName("TeamKnowledge")[0].innerHTML += Math.floor(team.knowledge[i]*10)/10 + " / ";

    teamContainer.getElementsByClassName("MeetingCount")[0].innerHTML = "Meeting Count: " + team.meetingCount;

    teamContainer.getElementsByClassName("MeetingProbability")[0].innerHTML = "Meeting Probability: " + team.meetingProbability;


    teamContainer.getElementsByClassName("TeamDiscoveries")[0].innerHTML = "Team discoveries: ";
    for (i = 0; i<team.teamDiscoveries.length; i++){
        teamContainer.getElementsByClassName("TeamDiscoveries")[0].innerHTML += team.teamDiscoveries[i].nodeID + ", ";
    }

    teamContainer.getElementsByClassName("KnownDiscoveries")[0].innerHTML = "Known discoveries: ";
    team.discoveries.forEach(function (value1, value2, set) {
        teamContainer.getElementsByClassName("KnownDiscoveries")[0].innerHTML += value2.nodeID + ", ";
    });

    teamContainer.getElementsByClassName("PublicationInProgress")[0].innerHTML = "Publication in progress: ";
    if (!team.discoveriesToWrite.length == 0)
        teamContainer.getElementsByClassName("PublicationInProgress")[0].innerHTML += team.discoveriesToWrite.peek().nodeID;

    teamContainer.getElementsByClassName("TeamPublications")[0].innerHTML = "Team publications: ";
    for (i = 0; i<team.writtenPapers.length; i++){
        teamContainer.getElementsByClassName("TeamPublications")[0].innerHTML += team.writtenPapers[i].nodeID + ", ";
    }
    teamContainer.getElementsByClassName("MembersTitle")[0].innerHTML = "Members - " + team.members.length;
    for (i = 0; i<team.members.length; i++){
        var memberDiv = document.createElement("div");
        memberDiv.className = "MemberDiv";
        memberDiv.innerHTML = "<div class=\"MemberID\">Member ID: " + i + "</div>\n" +
            "        <div class='MemberDetails'>\n" +
            "            <div class=\"Skills\">\n" +
            "                <div class=\"SkillValues\">Skill Values: " + "</div>\n" +
            "            </div>\n" +
            "            <div class='Statistics'>\n" +
            "                <div class=\"KnowledgePassingSpeed\">Knowledge Passing Speed: " + team.members[i].knowledgePassingSpeed + "</div>\n" +
            "                <div class=\"PaperWritingSpeed\">Paper Writing Speed:" + team.members[i].paperWritingSpeed + "</div>\n" +
            "            </div>\n" +
            "            <div class=\"MemberKnowledge\">Member knowledge: </div>\n" +
            "        </div>";
        for(var j = 0; j<team.members[i].skills.length; j++){
            memberDiv.getElementsByClassName("SkillValues")[0].innerHTML += team.members[i].skills[j] + " / ";
        }
        for(var j = 0; j<team.members[i].knowledge.length; j++){
            memberDiv.getElementsByClassName("MemberKnowledge")[0].innerHTML += Math.floor(team.members[i].knowledge[j]*100)/100 + " / ";
        }
        var h1 = teamContainer.getElementsByClassName("fa fa-caret-down")[0];
        var att = document.createAttribute("onClick");
        att.value = "toggle_visibility(" + id +")";
        h1.setAttributeNode(att);
        teamContainer.getElementsByClassName("MemberList")[0].appendChild(memberDiv);
    }

}

function updateTeams(teams) {
    for (var i = 0; i < teams.length; i++) {
        updateTeam(teams[i], i);
    }
}

function toggle_visibility(id) {
    var e = document.getElementById(id).getElementsByClassName("MemberList")[0];
    if(e.style.display === 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function updateTeam(team, id) {
    var teamContainer = document.getElementById(id);
    var i;
    teamContainer.getElementsByClassName("TeamID")[0].innerHTML = "Team ID: " + team.teamID;

    teamContainer.getElementsByClassName("CurrentDiscovery")[0].innerHTML = "Current Discovery: ";
    if (team.currentDiscovery !== null)
        teamContainer.getElementsByClassName("CurrentDiscovery")[0].innerHTML += team.currentDiscovery.nodeID;

    teamContainer.getElementsByClassName("TeamKnowledge")[0].innerHTML = "Team knowledge: ";
    for (i=0; i<team.knowledge.length; i++)
        teamContainer.getElementsByClassName("TeamKnowledge")[0].innerHTML += Math.floor(team.knowledge[i]*10)/10 + " / ";

    teamContainer.getElementsByClassName("MeetingCount")[0].innerHTML = "Meeting Count: " + team.meetingCount;

    teamContainer.getElementsByClassName("TeamDiscoveries")[0].innerHTML = "Team discoveries: ";
    for (i = 0; i<team.teamDiscoveries.length; i++){
        teamContainer.getElementsByClassName("TeamDiscoveries")[0].innerHTML += team.teamDiscoveries[i].nodeID + ", ";
    }

    teamContainer.getElementsByClassName("KnownDiscoveries")[0].innerHTML = "Known discoveries: ";
    team.discoveries.forEach(function (value1, value2, set) {
        teamContainer.getElementsByClassName("KnownDiscoveries")[0].innerHTML += value2.nodeID + ", ";
    });

    teamContainer.getElementsByClassName("PublicationInProgress")[0].innerHTML = "Publication in progress: ";
    if (!team.discoveriesToWrite.length == 0)
        teamContainer.getElementsByClassName("PublicationInProgress")[0].innerHTML += team.discoveriesToWrite.peek().nodeID;

    teamContainer.getElementsByClassName("TeamPublications")[0].innerHTML = "Team publications: ";
    for (i = 0; i<team.writtenPapers.length; i++){
        teamContainer.getElementsByClassName("TeamPublications")[0].innerHTML += team.writtenPapers[i].nodeID + ", ";
    }
    teamContainer.getElementsByClassName("MembersTitle")[0].innerHTML = "Members - " + team.members.length;
    for (i = 0; i<team.members.length; i++){
        var memberDiv = document.getElementById(id).getElementsByClassName("MemberDiv")[0];
        memberDiv.innerHTML = "<div class=\"MemberID\">Member ID: " + i + "</div>\n" +
            "        <div class='MemberDetails'>\n" +
            "            <div class=\"Skills\">\n" +
            "                <div class=\"SkillValues\">Skill Values: " + "</div>\n" +
            "            </div>\n" +
            "            <div class='Statistics'>\n" +
            "                <div class=\"KnowledgePassingSpeed\">Knowledge Passing Speed: " + team.members[i].knowledgePassingSpeed + "</div>\n" +
            "                <div class=\"PaperWritingSpeed\">Paper Writing Speed:" + team.members[i].paperWritingSpeed + "</div>\n" +
            "            </div>\n" +
            "            <div class=\"MemberKnowledge\">Member knowledge: </div>\n" +
            "        </div>";
        for(var j = 0; j<team.members[i].skills.length; j++){
            memberDiv.getElementsByClassName("SkillValues")[0].innerHTML += team.members[i].skills[j] + " / ";
        }
        for(var j = 0; j<team.members[i].knowledge.length; j++){
            memberDiv.getElementsByClassName("MemberKnowledge")[0].innerHTML += Math.floor(team.members[i].knowledge[j]*100)/100 + " / ";
        }
        teamContainer.getElementsByClassName("MemberList")[0].appendChild(memberDiv);
    }

}