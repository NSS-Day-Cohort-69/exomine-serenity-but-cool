import { getPlanetMinerals } from "./planetMineralsData.js"
import { postObject, putObject } from "./utils.js"

let currentFacilityMinerals = []
let currentPlanetMinerals = []

let planet = null

export const updatePlanet = async (newPlanet) =>
{
    planet = newPlanet

    await updatePlanetMinerals()
}

export const addFacilityMineral = async (newFacilityMineral) =>
{
    currentFacilityMinerals.push(newFacilityMineral)
    await updatePlanetMinerals()
}

export const removeFacilityMineral = async (removeFacilityMineralId) =>
{
    const facilityMineral = currentFacilityMinerals.find(facilityMineral => facilityMineral.id === removeFacilityMineralId)
    if(facilityMineral !== undefined)
    {
        const index = currentFacilityMinerals.indexOf(facilityMineral)

        if(index >= 0)
        {
            currentFacilityMinerals.splice(index, 1)
        }
    }
    await updatePlanetMinerals()
}

export const updatePlanetMinerals = async () =>
{
    if(planet === null)
    {
        currentPlanetMinerals = []
        return
    }

    const planetMinerals = await getPlanetMinerals()

    const newPlanetMinerals = []
    for (const facilityMineral of currentFacilityMinerals) 
    {
        const thisPlanetMineral = planetMinerals.find(planetMineral => planetMineral.mineralId === facilityMineral.mineralId && planetMineral.planetId === planet.id)
    
        //if there was not a planetMineral that meets condition, find will return undefined.
        if (thisPlanetMineral != undefined)
        {
            newPlanetMinerals.push(thisPlanetMineral)
        }
    }
    currentPlanetMinerals = newPlanetMinerals
}

export const getPlanetMineral = () => {
    return transaction.planetMineral
}

export const getCurrentFacilityMinerals = () => {
    return currentFacilityMinerals
}

export const getPlanet = () =>{
    return planet
}

export const transactionIsValid = () =>
{
    //this returns true if neither of facility mineral and planet mineral are null (null evaluates to false in boolean operations, objects evaluate to true). the transaction also isnt valid if the facility is out of the mineral.
    return currentFacilityMinerals.length > 0 && planet != null && currentFacilityMinerals.find(facilityMineral => facilityMineral.mineralTons <= 0) === undefined
}

const removeExtendsFromFacilityMineral = (facilityMineral) =>
{
    return {
        id: facilityMineral.id,
        facilityId: facilityMineral.facilityId,
        mineralId: facilityMineral.mineralId,
        mineralTons: facilityMineral.mineralTons
    }
}

const removeExtendsFromPlanetMineral = (planetMineral) =>
{
    return {
        id: planetMineral.id,
        planetId: planetMineral.planetId,
        mineralId: planetMineral.mineralId,
        mineralTons: planetMineral.mineralTons
    }
}

export const doTransaction = async () => 
{

    for (const facilityMineral of currentFacilityMinerals) 
    {
        facilityMineral.mineralTons--
        const cleanFacilityMineral = removeExtendsFromFacilityMineral(facilityMineral)
        
        putObject(cleanFacilityMineral, "facilityMinerals")

        const associatedPlanetMineral = currentPlanetMinerals.find(planetMineral => planetMineral.mineralId === facilityMineral.mineralId)

        debugger

        if(associatedPlanetMineral !== undefined)
        {
            associatedPlanetMineral.mineralTons++

            const cleanPlanetMineral = removeExtendsFromPlanetMineral(associatedPlanetMineral)
    
            putObject(cleanPlanetMineral, "planetMinerals")
        } else 
        {//planetMineral doesn't exist, so create a new one
            
            const newPlanetMineralObject = 
            {
                planetId: planet.id,
                mineralId: facilityMineral.mineralId,
                mineralTons: 1
            }
            
            await postObject(newPlanetMineralObject, "planetMinerals")

            await updatePlanetMinerals()
        }
    }

    /*
    //this is to remove any expands, since the contents of this is going into the database and we dont want the expands in the database.
    const cleanFacilityMineral = 
    {
        id: transaction.facilityMineral.id,
        facilityId: transaction.facilityMineral.facilityId,
        mineralId: transaction.facilityMineral.mineralId,
        mineralTons: transaction.facilityMineral.mineralTons
    }

    const facilityMineralOptions =
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFacilityMineral)
    }
    const facilityMineralResponse = await fetch(`http://localhost:8088/facilityMinerals/${cleanFacilityMineral.id}`, facilityMineralOptions)

    //if planetMineral is an object, it will put it to the database. If it is null, it means that there is not yet a planet mineral for that mineral on that planet, so it creates a new one instead
    
    if(transaction.planetMineral != null)
    {
        transaction.planetMineral.mineralTons++

        //this is to remove any expands, since the contents of this is going into the database and we dont want the expands in the database.
        const planetMineralObject = 
        {
            id: transaction.planetMineral.id,
            planetId: transaction.planetMineral.planetId,
            mineralId: transaction.planetMineral.mineralId,
            mineralTons: transaction.planetMineral.mineralTons
        }

        const planetMineralOptions =
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planetMineralObject)
        }

        const planetMineralResponse = await fetch(`http://localhost:8088/planetMinerals/${planetMineralObject.id}`, planetMineralOptions)
    } else 
    {
        
        //planetMineral doesn't exist, so create a new one
        const planetMineralObject = 
        {
            planetId: planet.id,
            mineralId: transaction.facilityMineral.mineralId,
            mineralTons: 1
        }
        
        transaction.planetMineral

        const planetMineralOptions =
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planetMineralObject)
        }

        const planetMineralResponse = await fetch(`http://localhost:8088/planetMinerals`, planetMineralOptions)

        updatePlanetMineral()
    }
    */
}
