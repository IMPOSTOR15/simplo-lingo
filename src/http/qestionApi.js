import { $host } from ".";


export const getAllQestions = async () => {
    const {data} = await $host.get('api/question/',)
    return data
}

export const getQestionsByDiff = async (diff) => {
    const {data} = await $host.get('api/question/?dificult=' + diff)
    return data
}

export const getQestionsById = async (id) => {
    const {data} = await $host.get('api/question/id/' + id)
    return data
}

export const getSolvedQuestions = async (id) => {
    const {data} = await $host.get('api/solved_question/' + id)
    return data
}

export const getQuestionsFilterBySolved = async (user_id) => {
    const {data} = await $host.post('api/question/solved_filter', {user_id})
    return data
}