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
        node = new TechnologyNode();
        var fields = [];
        for (var i = 0; i< KNOWLEDGEFIELDSCOUNT; i++){
            fields.push(Math.round(Math.random()*10));
        }
        node.createTechnologyNode(fields);
        this.existingNodes.push(node);
    };
    this.addNode = function(){
        node = new TechnologyNode();
        var fields = [];
        for (var i = 0; i< KNOWLEDGEFIELDSCOUNT; i++){
            fields.push(Math.round(Math.random()*10));
        }
        node.createTechnologyNode(fields);
        productNodeIndex = Math.floor(Math.random()*this.existingNodes.length);
        this.existingNodes[productNodeIndex].ingredients.push(node);
        this.existingNodes.push(node);
    }
}