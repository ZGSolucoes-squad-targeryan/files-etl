export function csvToJson(csv, fileProperties){
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");
    for(let i=1;i<lines.length;i++){
        const obj = {};
        const currentline=lines[i].split(",");
        for(let j=0;j<headers.length;j++){
            if(!currentline[j]){
                console.log(result)
                return result;
            }
            obj[headers[j]] = currentline[j] ? currentline[j].replace('"','') : currentline[j];
        }
        const completeInfos = {...obj, ...fileProperties};
        result.push(completeInfos);
    }
    return result; //JSON
}