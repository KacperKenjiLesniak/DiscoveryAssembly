var awaitingPapers = [];

var dayNumber = 0;

function day(){
    console.clear();
    console.log("Day: " + String(dayNumber++));
    for (var i = 0; i<awaitingPapers.length; i++){
        if(awaitingPapers[i].discovery.nodeID === 0) {
            console.log("EUREKA!");
            window.alert("EUREKA!");
            return;
        }
        awaitingPapers[i].delay--;
        if (awaitingPapers[i].delay === 0){
            nodeSet.update([{id: awaitingPapers[i].discovery.nodeID, color:{background: '#85e085'}}]);
            for (var j = 0; j<teams.length; j++){
                teams[j].discoveries.add(awaitingPapers[i].discovery);
            }
        }
    }

    for (var i = 0; i<teams.length; i++) {
        if (teams[i].currentDiscovery === null) {
            nextDiscoveryWith(teams[i], graph);
        }
        teams[i].doWork();
    }
    console.log(publicationsInProgress);
    console.log(publicationsFinished);
    updateTeams(teams);
    setTimeout(day, DAYLENGTH);
}