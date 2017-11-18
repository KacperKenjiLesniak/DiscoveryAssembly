function GraphToVis(tree) {
    this.nodes = [];
    this.edges = [];
    for(var i = 0; i < tree.existingNodes.length; i++) {
        this.nodes.push(nodeToVisNode(tree.existingNodes[i]));
        var currentNode = tree.existingNodes[i];
        for(var k = 0; k < currentNode.products.length; k++) {
            currentProduct = currentNode.products[k];
            this.edges.push({from: String(currentNode.nodeID), to: String(currentProduct.nodeID), arrows: "to"});
        }
    }
}

function nodeToVisNode(node) {
    return {id: String(node.nodeID), label: String(node.knowledgeFields), color:{background: "pink"}};
}
