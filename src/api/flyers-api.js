import {apiUrl} from '../config'
import Axios from 'axios'

export async function getFlyers(page: number) {
    console.log('Fetching flyers')
    const response = await Axios.get(`${apiUrl}/flyers?page=${JSON.stringify(page)}&limit=50`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    console.log(response.data.items);
    return response.data.items;
}
