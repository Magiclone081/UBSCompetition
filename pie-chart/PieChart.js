
exports.PieChart = (inputMap) => {
    if (inputMap['part'] === "FIRST") {
        return pieChartCreator(inputMap['data']);
    }
    else if (inputMap['part'] === "SECOND") {
        return splitChordDiagramCreator(inputMap['data']);
    }


    return returnArray;
}


const pieChartCreator = (datum) => {
    const pi = 3.141592655;
    let base = 0;
    let dataValues = [];
    for (let data of datum) {
        const totalPrice = data['quantity'] * data['price'];
        dataValues.push(parseFloat(totalPrice));
        base += totalPrice;
    }
    dataValues = dataValues.sort(function(a, b){return a-b});
    let noOfAdjustedSmall = 0;
    let sumOfAllAdjusted = 0;
    let returnArray = [0];
    let allRad = [];
    for (let val of dataValues) {
        console.log(val);
        let rad = val / base * pi * 2.0 * (2.0 * pi - pi / 1000.0 * noOfAdjustedSmall) / (2 * pi - sumOfAllAdjusted);
        if (val / base * 10000.0 < 5) {
            rad = pi / 1000.0;
            sumOfAllAdjusted += val / base * pi * 2;
            noOfAdjustedSmall++;
        }
        allRad.push(rad);
    }

    for (let i = allRad.length - 1; i >= 0; i--) {
        console.log(allRad[i]);
        returnArray.push(Math.round((returnArray[returnArray.length - 1] + allRad[i]) * 100000000) / 100000000);
    }
    return returnArray;
}

const splitChordDiagramCreator = (datum) => {
    const pi = 3.141592655;
    let dataValues = [];
    let instrumentReturn = [7 * pi / 6];
    let instrumentPieChartBase = pi * 2 / 3;
    let base = 0;
    for (let data of datum) {
        const totalPrice = data['quantity'] * data['price'];
        data['totalPrice'] = totalPrice;
        dataValues.push(totalPrice);
        base += totalPrice;
    }
    dataValues.sort(function(a, b){return a-b});
    let noOfAdjustedSmall = 0;
    let sumOfAllAdjusted = 0;

    for (let val of dataValues) {
        let rad = val / base * instrumentPieChartBase * (instrumentPieChartBase - pi / 1000.0 * noOfAdjustedSmall) / (instrumentPieChartBase - sumOfAllAdjusted);
        if (val / base * instrumentPieChartBase * 1000 < pi) {
            rad = pi / 1000.0;
            sumOfAllAdjusted += val / base * instrumentPieChartBase;
            noOfAdjustedSmall++;
        }
        instrumentReturn.push(Math.round((instrumentReturn[instrumentReturn.length - 1] + rad) * 100000000) / 100000000);
    }

    const otherBase = (instrumentPieChartBase - 3 * pi / 1000) / 4;
    noOfAdjustedSmall = 0;
    sumOfAllAdjusted = 0;
    let currencyReturn = [0.52359878];
    let aggregateCurrency = [];
    let allRad = [];
    datum.reduce(function (res, value) {
        if (!res[value['currency']]) {
            res[value['currency']] = { currency: value['currency'], totalPrice: 0 };
            aggregateCurrency.push(res[value['currency']])
        }
        res[value['currency']].totalPrice += value.totalPrice;
        return res;
    }, {});
    console.log(aggregateCurrency);
    aggregateCurrency.sort(function(a, b){return a.totalPrice-b.totalPrice});
    console.log(aggregateCurrency);
    for (let val of aggregateCurrency) {
        let rad = val['totalPrice'] / base * otherBase * (otherBase - pi / 1000.0 * noOfAdjustedSmall) / (otherBase - sumOfAllAdjusted);
        if (val['totalPrice'] / base * otherBase * 1000 < pi) {
            rad = pi / 1000.0;
            sumOfAllAdjusted += val['totalPrice'] / base * otherBase;
            noOfAdjustedSmall++;
        }
        allRad.push(rad);
        
    }

    for (let i = allRad.length - 1; i >= 0; i--) {
        console.log(allRad[i]);
        currencyReturn.push(Math.round((currencyReturn[currencyReturn.length - 1] + allRad[i]) * 100000000) / 100000000);
    }

    noOfAdjustedSmall = 0;
    sumOfAllAdjusted = 0;
    allRad = [];
    let sectorReturn = [1.04798295];
    let aggregateSector = [];
    datum.reduce(function (res, value) {
        if (!res[value['sector']]) {
            res[value['sector']] = { currency: value['sector'], totalPrice: 0 };
            aggregateSector.push(res[value['sector']])
        }
        res[value['sector']].totalPrice += value.totalPrice;
        return res;
    }, {});

    aggregateSector.sort(function(a, b){return a.totalPrice-b.totalPrice});
    for (let val of aggregateSector) {
        let rad = val['totalPrice'] / base * otherBase * (otherBase - pi / 1000.0 * noOfAdjustedSmall) / (otherBase - sumOfAllAdjusted);
        if (val['totalPrice'] / base * otherBase * 1000 < pi) {
            rad = pi / 1000.0;
            sumOfAllAdjusted += val['totalPrice'] / base * otherBase;
            noOfAdjustedSmall++;
        }
        
        allRad.push(rad);
        
    }

    for (let i = allRad.length - 1; i >= 0; i--) {
        console.log(allRad[i]);
        sectorReturn.push(Math.round((sectorReturn[sectorReturn.length - 1] + allRad[i]) * 100000000) / 100000000);
    }

    noOfAdjustedSmall = 0;
    sumOfAllAdjusted = 0;
    allRad = [];
    let assetClassReturn = [1.57236712];
    let aggregateAssetClass = [];
    datum.reduce(function (res, value) {
        if (!res[value['assetClass']]) {
            res[value['assetClass']] = { currency: value['assetClass'], totalPrice: 0 };
            aggregateAssetClass.push(res[value['assetClass']])
        }
        res[value['assetClass']].totalPrice += value.totalPrice;
        return res;
    }, {});

    aggregateAssetClass.sort(function(a, b){return a.totalPrice-b.totalPrice});
    for (let val of aggregateAssetClass) {
        let rad = val['totalPrice'] / base * otherBase * (otherBase - pi / 1000.0 * noOfAdjustedSmall) / (otherBase - sumOfAllAdjusted);
        if (val['totalPrice'] / base * otherBase * 1000 < pi) {
            rad = pi / 1000.0;
            sumOfAllAdjusted += val['totalPrice'] / base * otherBase;
            noOfAdjustedSmall++;
        }
        
        allRad.push(rad);
        
    }

    for (let i = allRad.length - 1; i >= 0; i--) {
        console.log(allRad[i]);
        assetClassReturn.push(Math.round((assetClassReturn[assetClassReturn.length - 1] + allRad[i]) * 100000000) / 100000000);
    }

    noOfAdjustedSmall = 0;
    sumOfAllAdjusted = 0;
    allRad = [];
    let regionReturn = [2.09675130];
    let aggregateRegion = [];
    datum.reduce(function (res, value) {
        if (!res[value['region']]) {
            res[value['region']] = { currency: value['region'], totalPrice: 0 };
            aggregateRegion.push(res[value['region']])
        }
        res[value['region']].totalPrice += value.totalPrice;
        return res;
    }, {});

    aggregateRegion.sort(function(a, b){return a.totalPrice-b.totalPrice});
    for (let val of aggregateRegion) {
        let rad = val['totalPrice'] / base * otherBase * (otherBase - pi / 1000.0 * noOfAdjustedSmall) / (otherBase - sumOfAllAdjusted);
        if (val['totalPrice'] / base * otherBase * 1000 < pi) {
            rad = pi / 1000.0;
            sumOfAllAdjusted += val['totalPrice'] / base * otherBase;
            noOfAdjustedSmall++;
        }
        
        allRad.push(rad);
        
    }

    for (let i = allRad.length - 1; i >= 0; i--) {
        console.log(allRad[i]);
        regionReturn.push(Math.round((regionReturn[regionReturn.length - 1] + allRad[i]) * 100000000) / 100000000);
    }

    return {
        "instruments": instrumentReturn,
        "currency": currencyReturn,
        "sector": sectorReturn,
        "assetClass": assetClassReturn,
        "region": regionReturn
    };
}

