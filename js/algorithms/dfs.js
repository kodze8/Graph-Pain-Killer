import {  
    edgesToAdj, 
    convertToVisualizationFormat, 
    generateValidGraph, 
    errorPage,
} from '../graph/graphUtils.js';

import { 
    visualizeGraph, 
    markNode
} from '../graph/vizualizer.js';

import { 
    generateSrcInput, 
    generateDstInput
} from '../input_output/src_dst.js';

import{
    addRow, 
    clearStack, 
    removeRow
} from "../input_output/stack.js"

import { DIMENSIONS, COLORS, SETTINGS, indexToLetterMap } from '../constants.js'



const svg = d3.select("svg")
var n, edges, nodes; 
var graph;

var src_selector = document.getElementById('src');
var tempInput = document.getElementById('temp');
var table = document.getElementById('stack')


// marks the visited nodes


// dfs algorithm 
function waitForTimeout() {
    return new Promise(resolve => {
        setTimeout(resolve, -(tempInput.value-tempInput.max)); 
    });
}

function dfs(edges, src, n, callback){
    var adj = edgesToAdj(n, edges)

    async function rec(start, seen, path){
        path.push(start)
 
        await waitForTimeout()
        addRow(indexToLetterMap.get(start), table)
        markNode(svg, start);

        seen.add(start)
        for(var neigbour of adj.get(start)){
            if(!seen.has(neigbour)){
                await rec(neigbour, seen, path)
            }
        }
        return path
    }
    (async () => {
        await rec(src, new Set(), []);
        callback(); 
    })();
 }


// function for start dfs. 
var process_goes = false;
function startDFS(){
   if(!process_goes){
       process_goes = true;
       svg.selectAll("circle")
            .data(graph.nodes)
            .attr("fill", COLORS.NATURAL)
            .attr('stroke', 'none')

        clearStack(table);

       var src = parseInt(src_selector.value, 10);  
       dfs(edges, src, n, ()=>{
           process_goes = false; 
       });
   }
}

function changeGraph() {
    if (!process_goes) {
        svg.selectAll("*").remove(); 
        src_selector.innerHTML = "";
        clearStack(table);
        vizualize();
    }
}



function vizualize(){
    try {
        graph = generateValidGraph();
        [n, edges, nodes] = graph
        graph = convertToVisualizationFormat(edges, nodes);
        visualizeGraph(graph, svg);
        generateSrcInput(src_selector, n);
    } catch (error) {
        errorPage()
    }
}

vizualize()
document.getElementById("start").addEventListener("click", startDFS);
document.getElementById("refresh").addEventListener("click", changeGraph);