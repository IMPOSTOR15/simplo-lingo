import { $host } from ".";


export const getAllQestions = async () => {
    const {data} = await $host.get('api/question/',)
    return data
}

export const getQestionsById = async (id) => {
    const {data} = await $host.get('api/question/id/' + id)
    return data
}