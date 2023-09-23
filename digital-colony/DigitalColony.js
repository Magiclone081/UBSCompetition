

exports.DigitalColony = (generationRequest) => {
    let returnArray =[];

    for(let request of generationRequest){
        const totalGeneration = request['generations'];
        let colony = request['colony'].split('');
        
        for(let currentGeneration = 0; currentGeneration < totalGeneration; currentGeneration++){
            let newColony = [];
            const colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
            for(let i = 0; i < colony.length-1; i++){
                newColony.push(colony[i]);
                const signature = colony[i] - colony[i+1] < 0 ? 10-(colony[i] - colony[i+1]) : colony[i] - colony[i+1];
                newColony.push((colonyWeight + signature)%10);

            }
            newColony.push(colony[colony.length-1]);
            colony = newColony;
        }
        returnArray.push(colony.reduce((currSum, i) => currSum + i, 0).toString());

        
    }
    
    


    return returnArray;
}