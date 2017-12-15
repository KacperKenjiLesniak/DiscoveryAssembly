var teams = generateTeams();
var tree = new TechnologyTree();

tree.createMainNode();

for (var i = 0; i < NODECOUNT; i++) {
    tree.addNode();
}

displayTeams(teams);

var dayNumber = 0;

function day(){
    console.log("New day: " + String(dayNumber++));
    for (var i = 0; i<teams.length; i++) {
        if (teams[i].currentDiscovery === null) {
            console.log(nextDiscoveryWith(teams[i], tree));
        }
    }
    for (var i = 0; i<teams.length; i++) {
        teams[i].doWork();
    }
    displayKnowledge(teams);
    setTimeout(day, DAYLENGTH);
}

day();