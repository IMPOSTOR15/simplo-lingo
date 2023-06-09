import { $host } from ".";


export const getAllAchivements = async () => {
    const {data} = await $host.get('api/achivements/all')
    console.log(data);
    return data
}

export const getUserAchivements = async () => {
    const {data} = await $host.get('api/achivements/')
    console.log(data);
    return data
}
