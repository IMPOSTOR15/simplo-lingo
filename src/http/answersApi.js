import { $host } from ".";


export const getQestionAnswers = async (qustionId) => {
    const {data} = await $host.get('api/answer/' + qustionId)
    console.log(data);
    return data
}
