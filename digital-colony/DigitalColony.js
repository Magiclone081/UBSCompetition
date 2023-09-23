

exports.DigitalColony = (generationRequest) => {
    let returnArray =[];

    for(let request of generationRequest){
        const totalGeneration = request['generations'];
        let colony = request['colony'].split('').flatMap(value => parseInt(value));
        //console.log(JSON.stringify(colony));
        let colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
        
        for(let currentGeneration = 1; currentGeneration < totalGeneration; currentGeneration++){
            console.log(`current iteration: ${currentGeneration}`);
            
            let currentSum = 0;
            
            for(let i = colony.length-1; i > 0; i--){
                
                const signature = colony[i-1] - colony[i];
                const newPpl = (colonyWeight + signature)%10;
                currentSum +=newPpl;
                colony.splice(i, 0, newPpl);
                
            }
            //console.log(`new colony${colonyWeight}`)
            //console.log(`entire colony${newColony}`)
            colonyWeight += currentSum;
           // console.log(`${colonyWeight}`)
           
        }
        returnArray.push(colonyWeight.toString());
        break;
        
    }
    
    


    return returnArray;
}