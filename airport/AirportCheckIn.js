
exports.AirportCheckIn = (railwayRequest) => {
    let returnArray = [];
    let i = 0;
    let railwayRequirements = [];
    for (let i = 0; i < railwayRequest.length; i++) {
        const currentRequest = railwayRequest[i].split(', ');
        const lengthOfRailWay = currentRequest.shift();
        currentRequest.shift();
        let dp = Array(currentRequest.length+1).fill().map(() => Array(lengthOfRailWay+1));
        returnArray.push(recursiveRailwayBuildingWay(lengthOfRailWay, currentRequest, dp));
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

const recursiveRailwayBuildingWay = (remainingRailwayLength, trackChoice, dp) => {
    if (remainingRailwayLength == 0){
        return dp[trackChoice.length][remainingRailwayLength] = 1;
    }

    if (remainingRailwayLength < 0){
        return 0;
    }

    if (trackChoice.length <= 0){
        return 0;
    }
        
    if(dp[trackChoice.length][remainingRailwayLength] != undefined){
        return dp[trackChoice.length][remainingRailwayLength];
    }

    return dp[trackChoice.length][remainingRailwayLength] = recursiveRailwayBuildingWay(remainingRailwayLength - trackChoice[trackChoice.length - 1], trackChoice, dp)
        + recursiveRailwayBuildingWay(remainingRailwayLength, trackChoice.slice(0, -1), dp);
}