var nodeID = 0;

function TechnologyNode() {
    this.ingredients = [];
    this.createTechnologyNode = function (knowledgeField) {
        this.knowledgeFields = knowledgeField;
        this.nodeID = nodeID++;
    };
}
function TechnologyGraph() {
    this.existingNodes = [];
    this.createMainNode = function () {
        var node = new TechnologyNode();
        var fields = [];
        for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
            fields.push(Math.round(Math.random() * 10));
        }
        node.createTechnologyNode(fields);
        this.existingNodes.push(node);
    };
    this.addNode = function(){
        var node = new TechnologyNode();
        var fields = [];
        for (var i = 0; i < KNOWLEDGEFIELDSCOUNT; i++) {
            fields.push(Math.round(Math.random() * 10));
        }
        node.createTechnologyNode(fields);
        // Dodawanie do losowych węzłów tego konkretnego węzła jako potomka
        var productNodeIndex = Math.floor(Math.random()*this.existingNodes.length);
        this.existingNodes[productNodeIndex].ingredients.push(node.nodeID);
        this.existingNodes.push(node);
    }
    this.normalize = function () {
        for (var i = this.existingNodes.length-1; i >= 0; i--) {
            var currentNode = this.existingNodes[i];
            if (currentNode.ingredients.length != 0) {
                var fields = new Array(KNOWLEDGEFIELDSCOUNT);
                for (var j = 0; j < KNOWLEDGEFIELDSCOUNT; j++) {
                    fields[j] = 0;
                }
                for (var j = 0; j < currentNode.ingredients.length; j++) {
                    var currentAncestor = this.existingNodes[currentNode.ingredients[j]];
                    for (var k = 0; k < KNOWLEDGEFIELDSCOUNT; k++) {
                        fields[k] = Math.max(fields[k], currentAncestor.knowledgeFields[k]);
                    }
                }
                for (var j = 0; j < KNOWLEDGEFIELDSCOUNT; j++) {
                    fields[j] += Math.floor(Math.random()*3);
                }
                this.existingNodes[i].knowledgeFields = fields;
            }
        }
    }
}