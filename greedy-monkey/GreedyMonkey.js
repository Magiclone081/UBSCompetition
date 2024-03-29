

exports.GreedyMonkey = (InputMap) => {
    const noOfWeightMonkeyCarry = InputMap['w'];
    const basketVolume = InputMap['v'];
    let allFruits = InputMap['f'];
    // allFruits = allFruits.map(currFruit => [currFruit[0], currFruit[1], currFruit[2], currFruit[2]*noOfWeightMonkeyCarry*basketVolume/(currFruit[0]*currFruit[1])]);
    // allFruits.sort((a,b) => b[4] - a[4]);
    // let currentWeight = 0;
    // let volumeUsed = 0;
    // let currentScore = 0;
    
    //let dp = new Array(allFruits.length+1).fill().map(() => new Array(noOfWeightMonkeyCarry).fill().map(() => new Array(basketVolume)));
    //let dp = Array.from({ length: allFruits.length+1 }, () =>Array.from({ length: noOfWeightMonkeyCarry+1 }, () =>Array.from({ length: basketVolume+1 }, () => -1)));
    
    return recursiveGreedyMonkey(allFruits, noOfWeightMonkeyCarry, basketVolume)[0];
}



const recursiveGreedyMonkey = (allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume) =>{
    if(allFruits.length <= 1){
        if(allFruits[0][0] <=noOfRemainingWeightMonkeyCarry && allFruits[0][1] <=noOfRemainingBasketVolume){
            return [allFruits[0][2], 0];
        }
        return [0];
    }

    // if(dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume] != undefined && dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume] != -1){
    //     return dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume];
    // }

    const fruitDeterminedToPutIn = allFruits.pop();
    
    if(fruitDeterminedToPutIn[0] > noOfRemainingWeightMonkeyCarry || fruitDeterminedToPutIn[1] > noOfRemainingBasketVolume){
        const arrayOfCurrentlyPuttedFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume);
        // if(arrayOfCurrentlyPuttedFruitToBasket.length === 1){
        //     return arrayOfCurrentlyPuttedFruitToBasket;
        // }
        // let currentMaxScoreArray = [0];
        
        // for(let i = 1; i < arrayOfCurrentlyPuttedFruitToBasket.length;i++){
        //     const currentFruitId = allFruits.length - arrayOfCurrentlyPuttedFruitToBasket[i] - 1;
        //     if(allFruits[currentFruitId][2] <= fruitDeterminedToPutIn[2] && allFruits[currentFruitId][1] >= fruitDeterminedToPutIn[1] - noOfRemainingBasketVolume && allFruits[currentFruitId][0] >= fruitDeterminedToPutIn[0] - noOfRemainingWeightMonkeyCarry){
        //         const calculatedScore = arrayOfCurrentlyPuttedFruitToBasket[0] - allFruits[currentFruitId][2] + fruitDeterminedToPutIn[2];
        //         if(currentMaxScoreArray[0] < calculatedScore){
                    
        //             currentMaxScoreArray = arrayOfCurrentlyPuttedFruitToBasket;
        //             currentMaxScoreArray[0] = calculatedScore;
        //             currentMaxScoreArray[]
        //         }
                
        //     }
        // }

        return arrayOfCurrentlyPuttedFruitToBasket;
    }
    
    let arrayOfAddingFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry-fruitDeterminedToPutIn[0], noOfRemainingBasketVolume-fruitDeterminedToPutIn[1]);
    const scoreForAddingFruitToBasket = arrayOfAddingFruitToBasket.shift() + fruitDeterminedToPutIn[2];
    const arrayOfNotAddingFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume)
    const scoreForNotAddingFruitToBasket = arrayOfNotAddingFruitToBasket[0];
    
    if(scoreForAddingFruitToBasket > scoreForNotAddingFruitToBasket){
        arrayOfAddingFruitToBasket.unshift(scoreForAddingFruitToBasket);
        arrayOfAddingFruitToBasket.push(allFruits.length-1);
        return arrayOfAddingFruitToBasket;
    }
    return arrayOfNotAddingFruitToBasket;

}