import {  
    edgesToAdj, 
    errorPage,
} from '../graph/graphUtils.js';

import {  
    convertToVisualizationFormatWeighted, 
    generateValidWeightedGraph,
    getWeights, 
} from '../graph/weightedGraphUtils.js';

import { 
    visualizeWeightedGraph,
    markNode
} from '../graph/vizualizer.js';

import { 
    generateSrcInput, 
    generateDstInput
} from '../input_output/src_dst.js';

import{
    createTableHeaders, 
    updateTable, 
    clearTable

} from "../input_output/table.js"

import { DIMENSIONS, COLORS, SETTINGS, indexToLetterMap } from '../constants.js'




const svg = d3.select("svg")
const update = document.getElementById("visited")
const msg = document.getElementById("msg")
let n, edges, nodes; 
var graph;

const src_selector = document.getElementById('src');
const dst_selector = document.getElementById('dst');


var process_goes = false;
var temp =  document.getElementById('temp')



function waitForTimeout(){
    return new Promise(resolve => {
        setTimeout(resolve, -(temp.value-temp.max)); 
    });
}

function dijkstra(edges, n, src, dst, callback){
    var adj = edgesToAdj(n, edges)
    var distances_between  = getWeights(edges, n)

    var distances = new Array(n).fill(Infinity);
    distances[src] = 0;
   
    var seen = new Set();
    var shortestPath = []    

    var previous_neighbours = new Map();
    previous_neighbours.set(src, [])

    async function rec(){
        if(seen.size==n){
            let last = shortestPath[shortestPath.length-1]
            previous_neighbours.get(last).push(last)
            msg.innerHTML = previous_neighbours.get(last)
            .map(element => indexToLetterMap.get(element))
            .join(", "); 
            return
        }

        let minDistance = Infinity;
        let minNode = null;

        for(var key=0; key<distances.length; key++){           
            if (distances[key] <= minDistance && !seen.has(key)) {
                minDistance = distances[key];
                minNode = key; 
            }
        }
        shortestPath.push(minNode)
        seen.add(minNode)

        updateTable(distances, document)
        markNode(svg, minNode,COLORS.YELLOW);  
        update.innerHTML += `${indexToLetterMap.get(minNode)}: ${minDistance} `;

        // idk is it nice idea
        if(minNode===dst){
            previous_neighbours.get(dst).push(dst)
            msg.innerHTML = previous_neighbours.get(dst)
            .map(element => indexToLetterMap.get(element))
            return
        }

        for (const neighbour of adj.get(minNode)) {
            if (!seen.has(neighbour)) {
                markNode(svg, neighbour, COLORS.LIGHT_BLUE);  
                if(distances[neighbour]>minDistance+distances_between[minNode][neighbour]){
                    if (previous_neighbours.has(minNode)) {
                        let updatedArray = previous_neighbours.get(minNode).slice(); 
                        updatedArray.push(minNode);
            
                        previous_neighbours.set(neighbour, updatedArray);
                    }else{
                    
                        previous_neighbours.set(neighbour,[minNode])
                    }

                    distances[neighbour] = minDistance+distances_between[minNode][neighbour]
                }
            }
        }
        await waitForTimeout();
        await rec()
    }
    (async  () => {
        await rec();
        callback();
    })();
    
}


function startDijkstra(){
    if(!process_goes){
        process_goes = true;
        svg.selectAll("circle")
            .data(graph.nodes)
            .attr("fill", COLORS.NATURAL)
            .attr('stroke', 'none')
        update.innerHTML = '';
        msg.innerHTML = '';
        
        clearTable(document)
        createTableHeaders(n, document, false)
        
        var src = parseInt(src_selector.value, 10);  
        var dst = parseInt(dst_selector.value, 10);      

        dijkstra(edges, n,src,dst, ()=>{
            process_goes = false; 
        });
    }
}


function vizualize(){
    try{
        graph = generateValidWeightedGraph();
        [n, edges, nodes] = graph
        graph = convertToVisualizationFormatWeighted(edges, nodes);
        visualizeWeightedGraph(graph, svg);
        createTableHeaders(n, document, false)
        generateSrcInput(src_selector, n)
        generateDstInput(dst_selector, n );

    }catch {
        errorPage();
    }
}


function changeGraph() {
    if (!process_goes) {
        svg.selectAll("*").remove(); 
        update.innerHTML = '';
        msg.innerText='';
        src_selector.innerHTML = "";
        dst_selector.innerHTML = "";
        clearTable(document)
        vizualize();
    }
} 



vizualize()
document.getElementById("refresh").addEventListener("click", changeGraph);
document.getElementById("start").addEventListener("click", startDijkstra);