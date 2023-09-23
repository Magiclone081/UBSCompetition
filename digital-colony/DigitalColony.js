

exports.DigitalColony = (generationRequest) => {
    let returnArray =[];

    for(let request of generationRequest){
        const totalGeneration = request['generations'];
        let colony = request['colony'].split('').flatMap(value => parseInt(value));
        //console.log(JSON.stringify(colony));
        let colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
        for(let currentGeneration = 0; currentGeneration < totalGeneration; currentGeneration++){
            console.log(`current iteration: ${currentGeneration}`);
            
            
            
            for(let i = colony.length-1; i > 0; i--){
                
                const signature = colony[i-1] - colony[i] < 0 ? 10-(colony[i-1] - colony[i]) : colony[i-1] - colony[i];
                colony.splice(i, 0, (colonyWeight + signature)%10)
                
            }
            //console.log(`new colony${colonyWeight}`)
            //console.log(`entire colony${newColony}`)
            colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
           // console.log(`${colonyWeight}`)
           
        }
        returnArray.push(colonyWeight.toString());
        break;
        
    }
    
    


    return returnArray;
}