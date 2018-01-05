function GraphToVis(tree) {
    this.nodes = [];
    this.edges = [];
    for(var i = 0; i < tree.existingNodes.length; i++) {
        this.nodes.push(nodeToVisNode(tree.existingNodes[i]));
        var currentNode = tree.existingNodes[i];
        for(var k = 0; k < currentNode.ingredients.length; k++) {
            currentIngredient = currentNode.ingredients[k];
            this.edges.push({from: String(currentIngredient.nodeID), to: String(currentNode.nodeID), arrows: "to"});
        }
    }
}

function nodeToVisNode(node) {
    return {id: String(node.nodeID), label: String(node.nodeID) + "\n" + String(node.knowledgeFields), color:{background: "pink"}};
}
