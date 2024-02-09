export const putObject = async (object, table) =>
{
    const options =
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
    }

    return await fetch(`http://localhost:8088/${table}/${object.id}`, options)
}

export const postObject = async (object, table) =>
{
    const options =
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
    }

    return await fetch(`http://localhost:8088/${table}`, options)
}