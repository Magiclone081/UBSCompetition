
exports.PieChart = (inputMap) => {
    if(inputMap['part'] === "FIRST"){
        return pieChartCreator(inputMap['data']);
    }
    else if(inputMap['part'] === "SECOND"){
        return splitChordDiagramCreator(inputMap['data']);
    }


    return returnArray;
}


const pieChartCreator = (datum) => {
    const pi = 3.141592655;
    let base = 0;
    let dataValues = [];
    for(let data of datum){
        const totalPrice = data['quantity']*data['price'];
        dataValues.push(totalPrice);
        base += totalPrice;
    }
    dataValues.sort();
    let noOfAdjustedSmall = 0;
    let sumOfAllAdjusted = 0;
    let returnArray = [0];
    let allRad = [];
    for(let val of dataValues){
        let rad = val/base*pi*2.0*(2.0*pi-pi/1000.0*noOfAdjustedSmall)/(2*pi-sumOfAllAdjusted);
        if(val/base*10000.0 < 5){
            rad = pi/1000.0;
            sumOfAllAdjusted += val/base*pi*2;
            noOfAdjustedSmall++;
        }
        allRad.push(rad);
    }

    for(let i = allRad.length-1; i >=0;i--){
        returnArray.push(returnArray[returnArray.length-1]+allRad[i]);
    }
    return returnArray;
}

const splitChordDiagramCreator = (datum) => {
    const pi = 3.141592655;
    
    let instrumentReturn = [7*pi/6];
    let instrumentPieChartBase = pi*2/3;
    
    for(let data of datum){
        const totalPrice = data['quantity']*data['price'];
        dataValues.push(totalPrice);
        base += totalPrice;
    }
    dataValues.sort();
    let noOfAdjustedSmall = 0;
    let sumOfAllAdjusted = 0;
    
    for(let val of dataValues){
        let rad = val/base*pi*2.0*(instrumentPieChartBase-pi/1000.0*noOfAdjustedSmall)/(instrumentPieChartBase-sumOfAllAdjusted);
        if(val/base*2*pi*1000 < pi){
            rad = pi/1000.0;
            sumOfAllAdjusted += val/base*pi*2;
            noOfAdjustedSmall++;
        }
        instrumentReturn.push(instrumentReturn[instrumentReturn.length-1]+rad);
    }

    const otherBase = (instrumentPieChartBase-3*pi/1000)/4;
    const abc = "123";
    for(let val of dataValues){

    }
    
    return {
        "instruments": instrumentReturn, 
        "currency": currencyReturn,
        "sector": sectorReturn,
        "assetClass": assetClassReturn,
        "region": regionReturn
};
}

