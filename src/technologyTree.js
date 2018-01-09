var nodeID = 0;

function TechnologyNode(){
    this.ingredients =[];
    this.createTechnologyNode = function(knowledgeField){
        this.knowledgeFields = knowledgeField;
        this.nodeID = nodeID++;
    };
}
function TechnologyTree(){
    this.existingNodes = [];
    this.createMainNode = function () {
        var node = new TechnologyNode();
        var fields = [];
        for (var i = 0; i< KNOWLEDGEFIELDSCOUNT; i++){
            fields.push(Math.round(Math.random()*10));
        }
        node.createTechnologyNode(fields);
        this.existingNodes.push(node);
    };
    this.addNode = function(){
        var node = new TechnologyNode();
        var fields = [];
        for (var i = 0; i< KNOWLEDGEFIELDSCOUNT; i++){
            fields.push(Math.round(Math.random()*10));
        }
        node.createTechnologyNode(fields);
        var productNodeIndex = Math.floor(Math.random()*this.existingNodes.length);
        this.existingNodes[productNodeIndex].ingredients.push(node.nodeID);
        this.existingNodes.push(node);
    }
}