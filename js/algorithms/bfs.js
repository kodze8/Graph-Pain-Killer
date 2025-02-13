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
const tempInput = document.getElementById('temp')
var table = document.getElementById('stack')



function waitForTimeout(){
   return new Promise(resolve =>{
        setTimeout(resolve, -(tempInput.value - tempInput.max));
   });
}


function bfs(edges, src, n, callback){
    var adj = edgesToAdj(n, edges)
    var seen = new Set()

    var queue = [src]
    seen.add(src)
    var path = []

    async function helper(){
        while(queue.length!=0){
            var cur = queue.shift()
            addRow(indexToLetterMap.get(cur), table)
            markNode(svg, cur);  
            path.push(cur)
            for (var k of adj.get(cur)){
                if(!seen.has(k)){
                    queue.push(k)
                    seen.add(k)
                }
            }
            await waitForTimeout()
        }
        callback();
    }

    helper();
}

// function for start bfs. 
var process_goes = false;
function startBFS(){
   if(!process_goes){
       process_goes = true;

       svg.selectAll("circle")
        .data(graph.nodes)
        .attr("fill", COLORS.NATURAL)
        .attr('stroke', 'none')
        clearStack(table);

       var src = parseInt(src_selector.value, 10);  
       bfs(edges, src, n, ()=>{
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



vizualize();
document.getElementById("start").addEventListener("click", startBFS);
document.getElementById("refresh").addEventListener("click", changeGraph);