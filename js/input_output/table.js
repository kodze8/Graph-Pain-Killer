// Edge Table/Stack
import { indexToLetterMap, COLORS} from "../constants.js";

export function createTableHeaders(n, doc, include_iter = true) {
    var lst = []
    if(include_iter)
        lst.push("iter")
    for( var i=0; i<n; i++){
        lst.push(indexToLetterMap.get(i))
    }
    const headers = lst;
    const headerRow = doc.querySelector('#data-table thead tr');
    headers.forEach(headerText => {
        const th = doc.createElement('th');
        th.textContent = headerText;
        th.style.color = COLORS.NATURAL;
        headerRow.appendChild(th);
    });
}

export function updateTable(distances, doc){
    const table = doc.getElementById('data-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    for(var i=0; i<distances.length; i++){
        var cell = newRow.insertCell(i);
        
        cell.textContent = distances[i] === Infinity ? '∞' : distances[i]; 


        if (distances[i] === Infinity) {
            cell.style.color = COLORS.NATURAL; 
        } else {
            cell.style.color = COLORS.YELLOW; 
        }
    }
}

export function addRow(distances, iteration, doc, content = false, include_iter = true){
    const table = doc.getElementById('data-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    var step = 0;
    if(include_iter){
        step++;
        var cell = newRow.insertCell(0);
        cell.textContent = iteration;
        cell.style.color = COLORS.LIGHT_BLUE; 
    }
    
    for(var i=0; i<distances.length; i++){
        var cell = newRow.insertCell(i+step);
        cell.style.color = COLORS.NATURAL; 
        if(content){
            if (typeof distances[i] === 'number') {
                cell.textContent = distances[i] === Infinity ? '∞' : indexToLetterMap.get(distances[i]);
            }
            else cell.textContent = distances[i] === Infinity ? '∞' : distances[i]
        }

    }
    return newRow
}

export function clearTable(doc) {
    const tableBody = doc.getElementById('data-table').getElementsByTagName('tbody')[0];
    const headerRow = doc.querySelector('#data-table thead tr');

    while (tableBody.rows.length > 0) {
        tableBody.deleteRow(0);
    }

    while (headerRow.cells.length > 0) {
        headerRow.deleteCell(0);
    }
}


export function clearEdgeTable(doc) {
    const tableBody = doc
        .getElementById('edge-table')
        .getElementsByTagName('tbody')[0];

    while (tableBody.rows.length > 0) {
        tableBody.deleteRow(0);
    }
}
export function createEdgeTable(edges, doc){
    const table = doc.getElementById('edge-table').getElementsByTagName('tbody')[0];
    for(var e = 0; e<edges.length; e++){    
        var newRow = table.insertRow(); 
        var cell = newRow.insertCell(0); 
        cell.textContent = `(${indexToLetterMap.get(edges[e][0])},${indexToLetterMap.get(edges[e][1])})`; 
    }
}

export function colorEdgeCell(doc, e = null){
    const edge_table = doc.getElementById('edge-table').getElementsByTagName('tbody')[0];
    if(e==null){
        for (let i = 0; i < edge_table.rows.length; i++) {
            const edge_cell = edge_table.rows[i].cells[0];
            edge_cell.style.color = COLORS.NATURAL;
        }
    }else{
        var edge_cell = edge_table.rows[e].cells[0]; 
        edge_cell.style.color = COLORS.YELLOW;
    }
}




