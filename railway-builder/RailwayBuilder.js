
exports.RailwayBuilder = (railwayRequest) => {
    let returnArray = [];
    let i = 0;
    let railwayRequirements = [];
    for(let i = 0; i < railwayRequest.length; i++){
        const currentRequest = railwayRequest[i].split(', ');
        const lengthOfRailWay = currentRequest.shift();
        currentRequest.shift();
        returnArray.push(recursiveRailwayBuildingWay(lengthOfRailWay, currentRequest));
    }
    // while(i < railwayRequest.length){
    //     const lengthOfRailWay = railwayRequest[i];
    //     const numberOfTypesOfTrackPiece = railwayRequest[i+1];
    //     i+=2;
    //     let lengthOfTrackPiece = [];
    //     for(let j = 0; j < numberOfTypesOfTrackPiece; j++, i++){
    //         lengthOfTrackPiece.push(railwayRequest[i]);
    //     }
    //     railwayRequirements.push({
    //         lengthOfRailWay: lengthOfRailWay,
    //         numberOfTypesOfTrackPiece: numberOfTypesOfTrackPiece,
    //         lengthOfTrackPiece: lengthOfTrackPiece
    //     });
    // }
    
    // for(let railwayRequirement of railwayRequirements){
    //     returnArray.push(recursiveRailwayBuildingWay(railwayRequirement['lengthOfRailWay'], railwayRequirement['lengthOfTrackPiece']));
    // }

    return returnArray;
}

const recursiveRailwayBuildingWay = (remainingRailwayLength, trackChoice)=>{
    if (remainingRailwayLength == 0)
        return 1;
 
    
    if (remainingRailwayLength < 0)
        return 0;
 
    
    if (trackChoice.length <= 0)
        return 0;
 
    return recursiveRailwayBuildingWay(remainingRailwayLength - trackChoice[trackChoice.length - 1], trackChoice)
           + recursiveRailwayBuildingWay(remainingRailwayLength, trackChoice);
}