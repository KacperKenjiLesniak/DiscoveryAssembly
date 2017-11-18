function TechnologyNode(){
    this.ingredients =[];
    this.products = [];
    this.createTechnologyNode = function(knowledgeField){
        this.knowledgeFields = knowledgeField;
    };
    this.connectWithNodes = function(products, ingredients){
        this.products = products;
        this.ingredients = ingredients;
    }
}
function TechnologyTree(){
    this.existingNodes = [];
    this.createMainNode = function () {
        node = new TechnologyNode();
        node.createTechnologyNode(
            [Math.abs(Math.random()*10), Math.abs(Math.random()*10), Math.abs(Math.random()*10)]);
        this.existingNodes.push(node);
    };
    this.addNode = function(){
        node = new TechnologyNode();
        node.createTechnologyNode(
            [Math.abs(Math.random()*10), Math.abs(Math.random()*10), Math.abs(Math.random()*10)]);
        productNodeIndex = Math.abs(Math.random()*this.existingNodes.length);
        node.products = [this.existingNodes[productNodeIndex]];
        this.existingNodes[productNodeIndex].ingredients.push(node);
        this.existingNodes.push(node);
    }
}

var tree = new TechnologyTree();
tree.createMainNode();
tree.addNode();
tree.addNode();
tree.addNode();
tree.addNode();
for (var i =0; i<tree.existingNodes.length; ++i){
    document.write(tree.existingNodes[i].knowledgeFields);
    document.write("<br>");
    document.write(tree.existingNodes[i].products);
    document.write("<br>");
    document.write(tree.existingNodes[i].ingredients);
    document.write("<br>");
    document.write("<br>");
}