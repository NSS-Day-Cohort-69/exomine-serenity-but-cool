let transaction = {
    facilityMineral: null,
    planetMineral: null
}

let planet = null

export const updatePlanet = (newPlanet) =>
{
    planet = newPlanet
}

export const updateFacilityMineral = (newFacilityMineral) => {
    transaction.facilityMineral = newFacilityMineral

    //if planet has been set
    if(planet)
    {
        updatePlanetMineral()
    }
    
}

export const updatePlanetMineral = () =>
{
    const planetMinerals = getPlanetMinerals()

    const thisPlanetMineral = planetMinerals.find(planetMineral => planetMineral.mineralId === transaction.facilityMineral.mineralId && planetMineral.planetId === planet.id)

    //if there was not a planetMineral that meets condition, find will return undefined.
    if (thisPlanetMineral != undefined)
    {
        transaction.planetMineral = thisPlanetMineral
    } else
    {
        transaction.planetMineral = null
    }
}

export const getPlanetMineral = () => {
    return transaction.planetMineral
}

export const getFacilityMineral = () => {
    return transaction.facilityMineral
}

export const getPlanet = () =>{
    return planet
}

export const transactionIsValid = () =>
{
    //this returns true if neither of facility mineral and planet mineral are null (null evaluates to false in boolean operations, objects evaluate to true). the transaction also isnt valid if the facility is out of the mineral.
    return transaction.facilityMineral != null && planet != null && transaction.facilityMineral.mineralTons > 0
}

export const doTransaction = async () => {

    //this is to remove any expands, since the contents of this is going into the database and we dont want the expands in the database.
    const cleanFacilityMineral = 
    {
        id: transaction.facilityMineral.id,
        facilityId: transaction.facilityMineral.facilityId,
        mineralId: transaction.facilityMineral.mineralId,
        mineralTons: transaction.facilityMineral.mineralTons
    }

    cleanFacilityMineral.mineralTons--

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
        //this is to remove any expands, since the contents of this is going into the database and we dont want the expands in the database.
        const planetMineralObject = 
        {
            id: transaction.planetMineral.id,
            planetId: transaction.planetMineral.planetId,
            mineralId: transaction.planetMineral.mineralId,
            mineralTons: transaction.planetMineral.mineralTons + 1
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
        
        const planetMineralOptions =
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planetMineralObject)
        }

        const planetMineralResponse = await fetch(`http://localhost:8088/planetMinerals`, planetMineralOptions)
    }

    

    transaction = 
    {
        facilityMineral: null,
        planetMineral: null
    }

    planet = null
}
