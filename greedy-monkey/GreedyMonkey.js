

exports.GreedyMonkey = (InputMap) => {
    const noOfWeightMonkeyCarry = InputMap['w'];
    const basketVolume = InputMap['v'];
    const allFruits = InputMap['f'];
    // let currentWeight = 0;
    // let volumeUsed = 0;
    // let currentScore = 0;
    
    //let dp = new Array(allFruits.length+1).fill().map(() => new Array(noOfWeightMonkeyCarry).fill().map(() => new Array(basketVolume)));
    //let dp = Array.from({ length: allFruits.length+1 }, () =>Array.from({ length: noOfWeightMonkeyCarry+1 }, () =>Array.from({ length: basketVolume+1 }, () => -1)));

    return recursiveGreedyMonkey(allFruits, noOfWeightMonkeyCarry, basketVolume);
}



const recursiveGreedyMonkey = (allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume) =>{
    if(allFruits.length <= 1){
        if(allFruits[0][0] <=noOfRemainingWeightMonkeyCarry && allFruits[0][1] <=noOfRemainingBasketVolume){
            return allFruits[0][2];
        }
        return 0;
    }

    // if(dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume] != undefined && dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume] != -1){
    //     return dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume];
    // }

    const lastFruit = allFruits.pop();
    
    if(lastFruit[0] > noOfRemainingWeightMonkeyCarry || lastFruit[1] > noOfRemainingBasketVolume){
        return recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume, dp);
    }
    
    const scoreForAddingFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry-lastFruit[0], noOfRemainingBasketVolume-lastFruit[1]) + lastFruit[2];
    const scoreForNotAddingFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume);
    
    return dp[allFruits.length][noOfRemainingWeightMonkeyCarry][noOfRemainingBasketVolume] = Math.max(scoreForAddingFruitToBasket, scoreForNotAddingFruitToBasket);

}