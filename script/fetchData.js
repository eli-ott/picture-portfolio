let data;

let response = await fetch('json/data.json')    
let dataRaw = await response.json();
data = dataRaw;

export {
    data
}