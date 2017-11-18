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
            [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)]);
        this.existingNodes.push(node);
    };
    this.addNode = function(){
        node = new TechnologyNode();
        node.createTechnologyNode(
            [Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)]);
        productNodeIndex = Math.floor(Math.random()*this.existingNodes.length);
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
    document.write("Node<br>");
    document.write(tree.existingNodes[i].knowledgeFields);
    document.write("<br>");
    document.write("Products: <br>");
    for (var k =0; k<tree.existingNodes[i].products.length; k++) {
        document.write(tree.existingNodes[i].products[k].knowledgeFields);
        document.write("<br>");
    }
    document.write("<br>");
    document.write("Ingredients:<br>");
    for (var k =0; k<tree.existingNodes[i].ingredients.length; k++) {
        document.write(tree.existingNodes[i].ingredients[k].knowledgeFields);
        document.write("<br>");
    }
    document.write("<br>");
    document.write("<br>");
    document.write("<br>");
    document.write("<br>");
}