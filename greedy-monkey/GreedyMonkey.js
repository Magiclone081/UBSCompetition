

exports.GreedyMonkey = (InputMap) => {
    const noOfWeightMonkeyCarry = InputMap['w'];
    const basketVolume = InputMap['v'];
    const allFruits = InputMap['f'];
    console.log(allFruits instanceof Array);
    // let currentWeight = 0;
    // let volumeUsed = 0;
    // let currentScore = 0;
    
    


    return recursiveGreedyMonkey(allFruits, noOfWeightMonkeyCarry, basketVolume);
}

const iterativeGreedyMonkey = (allFruits, noOfRemainingWeightMonkeyCarry, noOfRemainingBasketVolume) => {
    const stack = [];
    let result = 0;
    let index = 0;
  
    while (true) {
      if (index >= allFruits.length) {
        if (stack.length === 0) {
          break;
        }
        const { fruits, weight, volume, score } = stack.pop();
        result = Math.max(result, score);
        index = fruits + 1;
        noOfRemainingWeightMonkeyCarry = weight;
        noOfRemainingBasketVolume = volume;
        continue;
      }
  
      const currentFruit = allFruits[index];
  
      if (currentFruit[0] <= noOfRemainingWeightMonkeyCarry && currentFruit[1] <= noOfRemainingBasketVolume) {
        const scoreForAddingFruitToBasket = currentFruit[2];
        stack.push({
          fruits: index,
          weight: noOfRemainingWeightMonkeyCarry - currentFruit[0],
          volume: noOfRemainingBasketVolume - currentFruit[1],
          score: scoreForAddingFruitToBasket + result,
        });
      }
  
      index++;
    }
  
    return result;
  };

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