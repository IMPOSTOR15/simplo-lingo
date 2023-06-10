import { $host } from ".";


export const getAllAchivements = async () => {
    const {data} = await $host.get('api/achivements/all')
    return data
}

export const getUserAchivements = async (userId) => {
    const {data} = await $host.get(`api/achivements/user/${userId}`)
    return data
}

export const claimAchivement = async (user_id, achivement_id) => {
    console.log(user_id, achivement_id);
    const {data} = await $host.post('api/achivements/claim', {achivement_id, user_id})
    return data
}
