import { indexToLetterMap } from '../constants.js';

export function addRow(val, stack) {
    var newRow = stack.insertRow(); 
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = val;
}

export function clearStack(stack){
    while (stack.rows.length > 1) {
        stack.deleteRow(stack.rows.length - 1); 
    } 
}

export function removeRow(stack) {
    var rowCount = stack.rows.length; 
    if (rowCount > 1) {
        stack.deleteRow(rowCount - 1); 
    } else {
        alert("No more rows to remove");
    }
}