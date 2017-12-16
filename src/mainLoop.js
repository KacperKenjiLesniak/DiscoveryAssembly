var teams = generateTeams();
var tree = new TechnologyTree();
var awaitingPapers = [];
tree.createMainNode();

for (var i = 0; i < NODECOUNT; i++) {
    tree.addNode();
}

displayTeams(teams);

var dayNumber = 0;

function day(){
    console.clear();
    console.log("Day: " + String(dayNumber++));
    console.log("Awaiting papers: " + String(awaitingPapers));
    for (var i = 0; i<awaitingPapers.length; i++){
        awaitingPapers[i].delay--;
        if (awaitingPapers[i].delay === 0){
            for (var j = 0; j<teams.length; j++){
                teams[j].discoveries.add(awaitingPapers[i].discovery);
            }
        }
    }
    for (var i = 0; i<teams.length; i++) {
        if (teams[i].currentDiscovery === null) {
           nextDiscoveryWith(teams[i], tree);
        }
    }
    for (var i = 0; i<teams.length; i++) {
        teams[i].doWork();
    }
    console.log(publicationsInProgress);
    console.log(publicatoinsFinished);
    displayKnowledge(teams);
    setTimeout(day, DAYLENGTH);
}

day();