import {generateValidGraph} from "../graph/graphUtils.js"


export function generateValidWeightedGraph(){
    var [n, edges, nodes] = generateValidGraph()
    for (var i =0; i<edges.length; i++ ){
        edges[i].push(Math.floor(Math.random() * 9)+1)
    }
    return [n, edges, nodes]
}


export function convertToVisualizationFormatWeighted(edges, nodes) {
    const links = edges.map(edge => ({ source: edge[0], target: edge[1], weight: edge[2] }));
    return {nodes: nodes,links: links};
}

export function getWeights(edges, n){
    const rows = n;
    const cols = n;
    const arr = new Array(rows);

    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols); 
    }
    for(var edge of edges){
        arr[edge[0]][edge[1]] = edge[2]
        arr[edge[1]][edge[0]] = edge[2]
    }
    return arr
}

