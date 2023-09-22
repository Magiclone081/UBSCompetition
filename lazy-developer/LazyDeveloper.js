// classes = [{"Order": {...}, "Order2": {...}}, {"OrderType": {...}}]
// Assumptions:
// 1. When mapping contains a map, key must be string
// 2. When mapping contains a list, it must be a list of string
// 3. Type definition within each class is assumed to be String, i.e. Can be
// "String", "OrderType", etc but not 123
// 4. String with exact match will still be returned, e.g. Order.orderId will
// have orderId returned as suggested result
exports.LazyDeveloper = (jsonMap) => {
    const classesMap = jsonMap["classes"];
    const statements = jsonMap["statements"];
    

    //const normalizedClasses = classesMap.flatMap(m => Object.entries(m));
    const normalizedClasses = classesMap[0];

    let resultMap = new Map();

    for (let statement of statements) {
        

        const tokens = statement.split(".");

        // Check if each token is navigable in classes
        let canNavigate = true;
        let currentLocation = null;

        for (let i = 0; i < tokens.length - 1; i++) {
            if (!(currentLocation instanceof Array) && !(currentLocation instanceof String) || currentLocation == null) {
                currentLocation = getNextLocation(normalizedClasses, currentLocation, tokens[i]);
            }
            if (currentLocation == null) {
                canNavigate = false;
                break;
            }
        }

        if (canNavigate) {
            // Fetch all words with prefix being last token of the statement
            const lastToken = tokens[tokens.length - 1];
            let wordCandidates = getAllPossibilities(normalizedClasses, currentLocation);
            let wordsStartWithToken = wordCandidates.filter(str => str.startsWith(lastToken) && str != lastToken);
            wordsStartWithToken.sort();
            const top5wordList = wordsStartWithToken.slice(0, 5);
            resultMap.set(statement, top5wordList.length === 0 ? [""] : top5wordList);
        } else {
            // Statement does not correspond to any navigable class, no suggestion should be
            // returned
            
            resultMap.set(statement, [""]);
        }
    }
    return JSON.stringify(Object.fromEntries(resultMap));
}


const getAllPossibilities = (normalizedClasses, currentLocation) => {
    if (shouldResolve(currentLocation)) {
        currentLocation = getNextLocation(normalizedClasses, null, currentLocation.toString());
        currentLocation = currentLocation === null ? [""] : currentLocation;
    }
    // If current location is null, no traversal has been done previously, so keys
    // of normalized class should be returned
    if (currentLocation === null) {
        return Array.from(Object.keys(normalizedClasses));
    }
    console.log(currentLocation[0])
    if (currentLocation instanceof Array) {
        // Assumption 2 made as per header
        if(normalizedClasses[currentLocation[0]] != undefined){
            return [""];
        }
        
        return currentLocation;
    }
    // If current location is a object, return all the keys
    if (currentLocation instanceof Object) {
        // Assumption 1 made as per header
        return Array.from(Object.keys(currentLocation));
    }


    // If current location is not a map (like String), no possibilities should be
    // returned
    return [""];
}

const shouldResolve = (currentLocation) => {
    return currentLocation instanceof String && !currentLocation.equals("");
}

const getNextLocation = (normalizedClasses, currentLocation, token) => {
    if (currentLocation instanceof Array) {
        const getResult = normalizedClasses[tokenLookup];
        return (getResult === undefined) ? null : getResult;
    }
    if (currentLocation instanceof Object || currentLocation == null) {
        // Assumption 3 made as per header
        console.log(`currentLocation ${currentLocation}`);
        console.log(`token ${token}`);
        const tokenLookup = currentLocation === null ? token : currentLocation[token];
        console.log(`tokenLookup ${tokenLookup}`);
        if (tokenLookup === null) {
            return null;
        }
        const getResult = normalizedClasses[tokenLookup];
        console.log(`normalizedClasses ${normalizedClasses}`);
        return (getResult === undefined) ? null : getResult;
    }
    return null;
}
