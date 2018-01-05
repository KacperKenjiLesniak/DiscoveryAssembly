var awaitingPapers = [];


var dayNumber = 0;

function day(){
    //console.clear();
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

function download(data,filename) {
    var file = new Blob([data], {type: "text/plain;charset=utf-8"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        return e.target.result;
        //displayContents(contents);
    };
    reader.readAsText(file);
}