

exports.DigitalColony = (generationRequest) => {
    let returnArray =[];

    for(let request of generationRequest){
        const totalGeneration = request['generations'];
        let colony = request['colony'].split('').flatMap(value => parseInt(value));
        //console.log(JSON.stringify(colony));
        let colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
        for(let currentGeneration = 0; currentGeneration < totalGeneration; currentGeneration++){
            console.log(`current iteration: ${currentGeneration}`);
            
            let newColony = [];
            
            for(let i = 0; i < colony.length-1; i++){
                newColony.push(colony[i]);
                const signature = colony[i] - colony[i+1] < 0 ? 10-(colony[i] - colony[i+1]) : colony[i] - colony[i+1];
                newColony.push((colonyWeight + signature)%10);
                
            }
            //console.log(`new colony${colonyWeight}`)
            newColony.push(colony[colony.length-1]);
            //console.log(`entire colony${newColony}`)
            colony = newColony;
            colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
           // console.log(`${colonyWeight}`)
        }
        returnArray.push(colonyWeight.toString());

        
    }
    
    


    return returnArray;
}