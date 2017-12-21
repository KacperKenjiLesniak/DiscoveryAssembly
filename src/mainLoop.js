var teams = generateTeams();
var tree = new TechnologyTree();
var awaitingPapers = [];
tree.createMainNode();
for (var i = 0; i < NODECOUNT; i++) {
    tree.addNode();
}

var dayNumber = 0;

function day(){
    console.clear();
    console.log("Day: " + String(dayNumber++));
    console.log("Awaiting papers: " + String(awaitingPapers));
    for (var i = 0; i<awaitingPapers.length; i++){
        if(awaitingPapers[i].discovery.nodeID === 0) {
            console.log("EUREKA!");
            return;
        }
        awaitingPapers[i].delay--;
        if (awaitingPapers[i].delay === 0){
            nodeSet.update([{id: awaitingPapers[i].discovery.nodeID, color:{background: '#85e085'}}]);
            // if(awaitingPapers[i].discovery.nodeID === 0) {
            //     console.log("EUREKA!");
            //     return;
            // }
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
    console.log(publicationsFinished);
    displayKnowledge(teams);
    updateTeams(teams);
    setTimeout(day, DAYLENGTH);
}