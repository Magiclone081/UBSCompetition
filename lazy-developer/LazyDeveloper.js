
exports.LazyDeveloper = (jsonMap) => {
    const classesMap = jsonMap["classes"];
    const statements = jsonMap["statements"];

    normalizedClasses = new Map(classesMap.flatMap(m => Object.entries(m)));

    let resultMap = new Map();

    for (let statement of statements) {
        
        const tokens = statement.split(".");

        // Check if each token is navigable in classes
        let canNavigate = true;
        let currentLocation = null;

        for (let i = 0; i < tokens.length - 1; i++) {
            if (currentLocation instanceof Map || currentLocation instanceof Object || currentLocation == null) {
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
            let wordsStartWithToken = wordCandidates.filter(str => str.startsWith(lastToken));
            wordsStartWithToken.sort();
            const top5wordList = wordsStartWithToken.slice(0,5);
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
    }
    // If current location is null, no traversal has been done previously, so keys
    // of normalized class should be returned
    if (currentLocation === null) {
      return Array.from(normalizedClasses.keys());
    }
    if (currentLocation instanceof Array) {
        // Assumption 2 made as per header
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
    if (currentLocation instanceof Object || currentLocation == null) {
      // Assumption 3 made as per header
      const tokenLookup = currentLocation === null ? token : Object.getOwnPropertyDescriptors(currentLocation).token;
      if (tokenLookup === null) {
        return null;
      }
      const getResult = normalizedClasses.get(tokenLookup);
      return (getResult === undefined) ? null : getResult;
    }
    return null;
  }
