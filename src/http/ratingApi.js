import { $host } from ".";
export const getUserRating = async (user_id) => {
    const {data} = await $host.get('api/rating/user/'+ user_id)
    return data
}

export const giveCorrectAnswer = async (qestion_id, answer_id, user_id) => {
    const {data} = await $host.post('api/rating/get_answer', {qestion_id, answer_id, user_id})
    return data
}

export const getLeaderboard = async () => {
    const {data} = await $host.get('api/rating/leaderbord')
    return data
}