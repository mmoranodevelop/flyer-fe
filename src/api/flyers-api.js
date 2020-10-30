import {apiUrl} from '../config'
import Axios from 'axios'

export async function getFlyers() {
    console.log('Fetching flyers')
    const response = await Axios.get(`${apiUrl}/flyers`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    console.log(response.data.items);
    return response.data.items;
}
