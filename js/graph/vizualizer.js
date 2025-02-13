import { DIMENSIONS, COLORS, SETTINGS, indexToLetterMap } from '../constants.js'

export function markNode(svg, val, color = COLORS.YELLOW) {
    svg.selectAll('circle')
         .filter(d => d.id === val)
         .attr('stroke', color)
         .attr('stroke-width', 8);
}

export function visualizeGraph(graph, svg) {
    const width = +svg.attr("width"),
        height = +svg.attr("height"),
        nodeRadius = 20;
 
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#AE2626")
        .attr("rx", 20)  
        .attr("ry", 20);
 
    svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .attr("x1", d => graph.nodes.find(node => node.id === d.source).x)
        .attr("y1", d => graph.nodes.find(node => node.id === d.source).y)
        .attr("x2", d => graph.nodes.find(node => node.id === d.target).x)
        .attr("y2", d => graph.nodes.find(node => node.id === d.target).y)

        .attr("id", d => {
            const a = graph.nodes.find(node => node.id === d.source).id;
            const b = graph.nodes.find(node => node.id === d.target).id;
            return `${a}${b}`;
        });
 
    
    svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("id", d => d.id) 
        .attr("class", "node")
        .attr("r", nodeRadius)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", "#FDFFE9")
 
 
    svg.append("g")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => d.x )
        .attr("y", d => d.y+1)
        .attr("text-anchor", "middle") 
        .attr("dominant-baseline", "middle") 
        .text(d => indexToLetterMap.get(d.id));
}


export function visualizeWeightedGraph(graph, svg) {
    visualizeGraph(graph, svg)

    svg.append("g")
        .selectAll("text")
        .data(graph.links)
        .enter().append("text")
        .attr("class", "weight")
        .attr("x", d => {
            const sourceNode = graph.nodes.find(node => node.id === d.source);
            const targetNode = graph.nodes.find(node => node.id === d.target);
            return sourceNode.x + (targetNode.x - sourceNode.x) * 0.35;
        })
        .attr("y", d => {
            const sourceNode = graph.nodes.find(node => node.id === d.source);
            const targetNode = graph.nodes.find(node => node.id === d.target);
            return sourceNode.y + (targetNode.y - sourceNode.y) * 0.35;
        })
        .text(d => d.weight); 
}


export function visualizeDirectedGraph(graph, svg) {
    const width = +svg.attr("width"),
          height = +svg.attr("height"),
          nodeRadius = 20;

    // Draw background rectangle with rounded corners
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#AE2626")
        .attr("rx", 20)
        .attr("ry", 20);

    // Define arrow marker
    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", nodeRadius + 5) 
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
         .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999"); 

    // Draw links with arrows
    svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .attr("x1", d => graph.nodes.find(node => node.id === d.source).x)
        .attr("y1", d => graph.nodes.find(node => node.id === d.source).y)
        .attr("x2", d => graph.nodes.find(node => node.id === d.target).x)
        .attr("y2", d => graph.nodes.find(node => node.id === d.target).y)
        .attr("stroke", "#999") // Link color
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)"); // Add arrow marker

    // Draw nodes
    svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("id", d => d.id)
        .attr("class", "node")
        .attr("r", nodeRadius)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", "#FDFFE9");

    // Add labels to nodes
    svg.append("g")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 1)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => indexToLetterMap.get(d.id));
}

export function vizualizeNumericGraph(graph, svg){
    visualizeGraph(graph, svg)
    svg.selectAll(".label")
    .text(d => d.id);
}


export function visualizeDirectedWeightedGraph(graph, svg) {
    visualizeDirectedGraph(graph, svg)
    svg.append("g")
        .selectAll("text")
        .data(graph.links)
        .enter().append("text")
        .attr("class", "weight")
        .attr("x", d => {
            const sourceNode = graph.nodes.find(node => node.id === d.source);
            const targetNode = graph.nodes.find(node => node.id === d.target);
            return sourceNode.x + (targetNode.x - sourceNode.x) * 0.35;
        })
        .attr("y", d => {
            const sourceNode = graph.nodes.find(node => node.id === d.source);
            const targetNode = graph.nodes.find(node => node.id === d.target);
            return sourceNode.y + (targetNode.y - sourceNode.y) * 0.35;
        })
        .text(d => d.weight); 
}

export function vizualizeDirectedNumericGraph(graph, svg){
    visualizeDirectedGraph(graph, svg)
    svg.selectAll(".label")
    .text(d => d.id);
}
