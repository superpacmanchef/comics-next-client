import axios from 'axios'

export default async (currentChosenWeek: number) => {
    return axios.get(`/api/weekComics?week=${currentChosenWeek}`)
}
