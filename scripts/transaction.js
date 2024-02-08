import { getPlanetMineralData } from "./planetMineralData.js"

let transaction = {
    facilityMineral: null,
    planetMineral: null
}

export const updatePlanetMineral = (newPlanetMineral) => {
    transaction.planetMineral = newPlanetMineral
    delete transaction.planetMineral.mineral
}

export const updateFacilityMineral = (newFacilityMineral) => {
    transaction.facilityMineral = newFacilityMineral
    delete transaction.facilityMineral.mineral
    
}

export const getPlanetMineral = () => {
    return transaction.planetMineral
}

export const getFacilityMineral = () => {
    return transaction.facilityMineral
}

export const doTransaction = async () => {
    transaction.facilityMineral.mineralTons--
    transaction.planetMineral.mineralTons++

    //facility mineral
    const facilityMineralOptions =
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction.facilityMineral)
    }
    const facilityMineralResponse = await fetch(`http://localhost:8088/facilityMinerals/${transaction.facilityMineral.id}`, facilityMineralOptions)

    //planet
    const planetMineralOptions =
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction.planetMineral)
    }
    const planetMineralResponse = await fetch(`http://localhost:8088/planetMinerals/${transaction.planetMineral.id}`, planetMineralOptions)

    transaction = {
        facilityMineral: null,
        planetMineral: null
    }
}