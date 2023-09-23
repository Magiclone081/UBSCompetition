

exports.GreedyMonkey = (InputMap) => {
    const noOfWeightMonkeyCarry = InputMap['w'];
    const basketVolume = InputMap['v'];
    const allFruits = InputMap['f'];

    // let currentWeight = 0;
    // let volumeUsed = 0;
    // let currentScore = 0;
    
    


    return recursiveGreedyMonkey(allFruits, noOfWeightMonkeyCarry, basketVolume);
}

const recursiveGreedyMonkey = (allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume) =>{
    if(allFruits.length <= 1){
        if(allFruits[0][0] <=noOfRemainingWeightMonkeyCarry && allFruits[0][1] <=noOfRemainingBasketVolume){
            return allFruits[0][2];
        }
        return 0;
    }

    const lastFruit = allFruits.pop();
    
    if(lastFruit[0] > noOfRemainingWeightMonkeyCarry || lastFruit[1] > noOfRemainingBasketVolume){
        return recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume);
    }
    
    const scoreForAddingFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry-lastFruit[0], noOfRemainingBasketVolume-lastFruit[1]) + lastFruit[2];
    const scoreForNotAddingFruitToBasket = recursiveGreedyMonkey(allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume);
    
    return Math.max(scoreForAddingFruitToBasket, scoreForNotAddingFruitToBasket);

}