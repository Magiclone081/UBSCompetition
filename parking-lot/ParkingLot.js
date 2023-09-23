



exports.ParkingLot = (parkingLotInfoMap) => {
    const busParkingSlots = parkingLotInfoMap['BusParkingSlots'];
    let busParkingSlotsRemaining = busParkingSlots;
    let busParkingSlotsUser = {
        Bus: 0,
        Car: 0,
        Bike: 0
    };
    const carParkingSlots = parkingLotInfoMap['CarParkingSlots'];
    let carParkingSlotsRemaining = carParkingSlots;
    let carParkingSlotsUser = {
        Bus: 0,
        Car: 0,
        Bike: 0
    };
    const parkingCharges = parkingLotInfoMap['ParkingCharges'];
    let vehiclesRemaining = {
        Bus: parkingLotInfoMap['Buses'],
        Car: parkingLotInfoMap['Cars'],
        Bike: parkingLotInfoMap['Bikes']

    };

    const vehicles = {
        Bus: parkingLotInfoMap['Buses'],
        Car: parkingLotInfoMap['Cars'],
        Bike: parkingLotInfoMap['Bikes']

    };

    if (busParkingSlotsRemaining > vehiclesRemaining['Bus']) {
        busParkingSlotsRemaining -= vehiclesRemaining['Bus'];
        busParkingSlotsUser['Bus'] += vehiclesRemaining['Bus'];
        vehiclesRemaining['Bus'] = 0;
        for (; busParkingSlotsRemaining > 0 && vehiclesRemaining['Bike'] > 0; busParkingSlotsRemaining--) {
            if (vehiclesRemaining['Car'] >= 2 && vehiclesRemaining['Bike'] >= 2) {
                busParkingSlotsUser['Car'] += 2;
                vehiclesRemaining['Car'] -= 2;
                busParkingSlotsUser['Bike'] += 2;
                vehiclesRemaining['Bike'] -= 2;
            }
            else if (vehiclesRemaining['Car'] >= 1 && vehiclesRemaining['Bike'] >= 7) {
                busParkingSlotsUser['Car'] += 1;
                vehiclesRemaining['Car'] -= 1;
                busParkingSlotsUser['Bike'] += 7;
                vehiclesRemaining['Bike'] -= 7;
            }
            else if (vehiclesRemaining['Car'] > 0) {
                do {
                    if (vehiclesRemaining['Car'] >= 2) {
                        busParkingSlotsUser['Car'] += 2;
                        vehiclesRemaining['Car'] -= 2;
                        if (vehiclesRemaining['Bike'] >= 2) {
                            busParkingSlotsUser['Bike'] += 2;
                            vehiclesRemaining['Bike'] -= 2;
                        }
                        else if (vehiclesRemaining['Bike'] > 0) {
                            busParkingSlotsUser['Bike'] += 1;
                            vehiclesRemaining['Bike'] -= 1;
                        }
                    }
                    else {
                        busParkingSlotsUser['Car'] += 1;
                        vehiclesRemaining['Car'] -= 1;
                        if (vehiclesRemaining['Bike'] > 0) {
                            busParkingSlotsUser['Bike'] += vehiclesRemaining['Bike'];
                            vehiclesRemaining['Bike'] = 0;
                        }
                        busParkingSlotsRemaining--;
                        break;
                    }
                    busParkingSlotsRemaining--;
                } while (busParkingSlotsRemaining > 0 && vehiclesRemaining['Car'] > 0);
                busParkingSlotsRemaining++;


            }
            else if (vehiclesRemaining['Bike'] > 0) {
                do {
                    if (vehiclesRemaining['Bike'] >= 12) {
                        busParkingSlotsUser['Bike'] += 12;
                        vehiclesRemaining['Bike'] -= 12;
                    }
                    else {
                        busParkingSlotsUser['Bike'] += vehiclesRemaining['Bike'];
                        vehiclesRemaining['Bike'] = 0;
                        busParkingSlotsRemaining--;
                        break;
                    }
                    busParkingSlotsRemaining--;
                } while (busParkingSlotsRemaining > 0 && vehiclesRemaining['Car'] > 0);
                busParkingSlotsRemaining++;
            }
        }

    }
    else {
        vehiclesRemaining['Bus'] -= busParkingSlotsRemaining;
        busParkingSlotsUser['Bus'] += busParkingSlotsRemaining;
        busParkingSlotsRemaining = 0;
    }

    if (carParkingSlotsRemaining > vehiclesRemaining['Car']) {
        carParkingSlotsRemaining -= vehiclesRemaining['Car'];
        vehiclesRemaining['Car'] = 0;
        for (; carParkingSlotsRemaining > 0 && vehiclesRemaining['Bike'] > 0; carParkingSlotsRemaining--) {
            if (vehiclesRemaining['Bike'] >= 5) {
                busParkingSlotsUser['Bike'] += 5;
                vehiclesRemaining['Bike'] -= 5;
            }
            else if (vehiclesRemaining['Bike'] > 0) {
                busParkingSlotsUser['Bike'] += vehiclesRemaining['Bike'];
                vehiclesRemaining['Bike'] = 0;
            }
        }
    }
    else {
        vehiclesRemaining['Car'] -= carParkingSlotsRemaining;
        carParkingSlotsRemaining = 0;
    }

    if (parkingCharges['Bus'] < parkingCharges['Car'] * 2 + parkingCharges['Bike'] * 2) {
        for (; busParkingSlotsUser['Bus'] > 0 && vehiclesRemaining['Car'] >= 2 && vehiclesRemaining['Bike'] >= 2; busParkingSlotsUser['Bus']--) {
            vehiclesRemaining['Car'] -= 2;
            busParkingSlotsUser['Car'] += 2;
            vehiclesRemaining['Bike'] -= 2;
            busParkingSlotsUser['Bike'] += 2;
            vehiclesRemaining['Bus'] += 1;

        }
    }

    if (parkingCharges['Car'] < parkingCharges['Bike'] * 5) {
        const numberOfCarSlotBikesCanFill = Math.floor(vehiclesRemaining['Bike'] / 5);
        let numberOfCarSlotBikesFilled = 0;

        if (busParkingSlotsUser['Car'] > numberOfCarSlotBikesCanFill) {
            busParkingSlotsUser['Car'] -= numberOfCarSlotBikesCanFill;
            busParkingSlotsUser['Bike'] += numberOfCarSlotBikesCanFill * 5;
            numberOfCarSlotBikesFilled += numberOfCarSlotBikesCanFill;
        }
        else {
            busParkingSlotsUser['Bike'] += busParkingSlotsUser['Car'] * 5;
            busParkingSlotsUser['Car'] = 0;
            numberOfCarSlotBikesFilled += busParkingSlotsUser['Car'];
            if (carParkingSlotsUser['Car'] > numberOfCarSlotBikesCanFill - numberOfCarSlotBikesFilled) {
                carParkingSlotsUser['Car'] -= numberOfCarSlotBikesCanFill - numberOfCarSlotBikesFilled;
                carParkingSlotsUser['Bike'] += (numberOfCarSlotBikesCanFill - numberOfCarSlotBikesFilled) * 5;
                numberOfCarSlotBikesFilled = numberOfCarSlotBikesCanFill;
            }
            else {
                carParkingSlotsUser['Bike'] += carParkingSlotsUser['Car'] * 5;
                numberOfCarSlotBikesFilled += carParkingSlotsUser['Car'];
                carParkingSlotsUser['Car'] = 0;


            }
        }

        vehiclesRemaining['Car'] += numberOfCarSlotBikesFilled;
        vehiclesRemaining['Bike'] -= numberOfCarSlotBikesFilled * 5;
    }

    let lastVehiclesBusRemaining;
    let lastVehiclesCarRemaining;
    let lastVehiclesBikeRemaining;
    let i = 0;
    do {
        lastVehiclesBusRemaining = vehiclesRemaining['Bus'];
        lastVehiclesCarRemaining = vehiclesRemaining['Car'];
        lastVehiclesBikeRemaining = vehiclesRemaining['Bike'];

        if (parkingCharges['Bus'] < parkingCharges['Car'] * 2 + parkingCharges['Bike'] * 2 && vehiclesRemaining['Car'] >= 2 && vehiclesRemaining['Bike'] >= 2) {
            for (; busParkingSlotsUser['Bus'] > 0 && vehiclesRemaining['Car'] >= 2 && vehiclesRemaining['Bike'] >= 2; busParkingSlotsUser['Bus']--) {
                vehiclesRemaining['Bus'] += 1;
                vehiclesRemaining['Car'] -= 2;
                busParkingSlotsUser['Car'] += 2;
                vehiclesRemaining['Bike'] -= 2;
                busParkingSlotsUser['Bike'] += 2;
            }
        }
    
        if (parkingCharges['Bus'] < parkingCharges['Car'] * 2 + parkingCharges['Bike'] && vehiclesRemaining['Car'] >= 2 && vehiclesRemaining['Bike'] >= 1) {
            vehiclesRemaining['Bus'] += 1;
            busParkingSlotsUser['Bus'] -= 1;
            vehiclesRemaining['Car'] -= 2;
            busParkingSlotsUser['Car'] += 2;
            vehiclesRemaining['Bike'] -= 1;
            busParkingSlotsUser['Bike'] += 1;
        }
    
        if (parkingCharges['Bus'] < parkingCharges['Car'] * 2 && vehiclesRemaining['Car'] >= 2) {
            for (; busParkingSlotsUser['Bus'] > 0 && vehiclesRemaining['Car'] >= 2; busParkingSlotsUser['Bus']--) {
                vehiclesRemaining['Bus'] += 1;
                vehiclesRemaining['Car'] -= 2;
                busParkingSlotsUser['Car'] += 2;
            }
        }
    
        if (parkingCharges['Bus'] < parkingCharges['Car'] && vehiclesRemaining['Car'] >= 1) {
            for (; busParkingSlotsUser['Bus'] > 0 && vehiclesRemaining['Car'] >= 1; busParkingSlotsUser['Bus']--) {
                vehiclesRemaining['Bus'] += 1;
                vehiclesRemaining['Car'] -= 1;
                busParkingSlotsUser['Car'] += 1;
            }
        }
        for (let i = 5; i > 0; i--) {
            if (parkingCharges['Car'] < parkingCharges['Bike'] * i) {
                for (; busParkingSlotsUser['Car'] > 0 && vehiclesRemaining['Bike'] >= i; busParkingSlotsUser['Car']--) {
                    vehiclesRemaining['Car'] += 1;
                    vehiclesRemaining['Bike'] -= i;
                    busParkingSlotsUser['Bike'] += i;
                }
    
                for (; carParkingSlotsUser['Car'] > 0 && vehiclesRemaining['Bike'] >= i; carParkingSlotsUser['Car']--) {
                    vehiclesRemaining['Car'] += 1;
                    vehiclesRemaining['Bike'] -= i;
                    carParkingSlotsUser['Bike'] += i;
                }
            }
        }
        i++;
    } while (lastVehiclesBusRemaining == vehiclesRemaining['Bus'] && lastVehiclesCarRemaining == vehiclesRemaining['Car'] && lastVehiclesBikeRemaining == vehiclesRemaining['Bike'] || i >=3);
    




    console.log(`${carParkingSlotsUser['Bus']} ${busParkingSlotsUser['Bus']} ${carParkingSlotsUser['Car']} ${busParkingSlotsUser['Car']} ${carParkingSlotsUser['Bike']} ${busParkingSlotsUser['Bike']}`);
    return {
        "Answer": {
            "Profit": (carParkingSlotsUser['Bus'] + busParkingSlotsUser['Bus']) * parkingCharges['Bus'] + (carParkingSlotsUser['Car'] + busParkingSlotsUser['Car']) * parkingCharges['Car'] + (carParkingSlotsUser['Bike'] + busParkingSlotsUser['Bike']) * parkingCharges['Bike'],
            "BusRejections": vehiclesRemaining['Bus'],
            "CarRejections": vehiclesRemaining['Car'],
            "BikeRejections": vehiclesRemaining['Bike']
        }
    };
}
