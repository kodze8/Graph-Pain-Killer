import { indexToLetterMap } from '../constants.js';

export function generateSrcInput(src_selector, n){
    // Default value for src is 0
    const defaultOption_src = new Option("Choose SRC", 0, true, true);
    defaultOption_src.hidden = true; 
    src_selector.appendChild(defaultOption_src);

    for (let i = 0; i < n; i++) {
        const option = new Option(indexToLetterMap.get(i), i);
        if(i==0){
            src_selector.appendChild(new Option(indexToLetterMap.get(i) +" (default)", i));
        }else{
            src_selector.appendChild(option.cloneNode(true));
        }
  
    }
}

export function generateDstInput(dst_selector, n){
    // Default value for dst is null
    const defaultOption = new Option("Choose DST", null, true, true);
    defaultOption.hidden = true; 
    dst_selector.appendChild(defaultOption);

    
    for (let i = 0; i < n; i++) {
        const option = new Option(indexToLetterMap.get(i), i);
        if(i==0){ 
            dst_selector.appendChild(new Option("Furtherest (default)", null));
        }
        dst_selector.appendChild(option);
  
    }
}