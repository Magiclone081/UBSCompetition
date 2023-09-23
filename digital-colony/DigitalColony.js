

exports.DigitalColony = (generationRequest) => {
    

    for(let request of generationRequest){
        const totalGeneration = request['generations'];
        let colony = request['colony'].split('');
        
        for(let currentGeneration = 0; currentGeneration < totalGeneration; currentGeneration++){
            let newColony = [];
            const colonyWeight = colony.reduce((currSum, i) => currSum + i, 0);
            for(let i = 0; i < colony.length-1; i++){
                newColony.push(colony[i]);
            }
        }
        
    }
    
    


    return;
}