import {generateValidGraph} from "../graph/graphUtils.js"

// import{
//     edgesToAdjDirected, 
//     setDirection,
//     addNegativeValues
// } from '../graph/DirectedGraphUtils.js'



export function edgesToAdjDirected(n, edges) {
    const adj = new Map();
    for (let i = 0; i < n; i++) {
        adj.set(i, []);
    }

    for (let edge of edges) {
        adj.get(edge[0]).push(edge[1])
    }
    return adj;
}

export function setDirection(edges) {
    for (let edge of edges) {
        if (Math.random() > 0.5) {
            [edge[0], edge[1]] = [edge[1], edge[0]];
        }
    }
    return edges
}



export function addNegativeValues(edges){
    for (let edge of edges) {
        if (Math.random() > 0.5) {
            edge[2] = -edge[2];
        }
    }
    return edges
}
    


// vizualizes graph
