import {apiUrl} from '../config'
import Axios from 'axios'

export async function getFlyers() {
    console.log('Fetching flyers')
    debugger;
    const response = await Axios.get(`${apiUrl}/flyers`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    console.log(response.data.items);
    return response.data.items;
}

export async function getFavoritesFlyers() {
    console.log('Fetching favorites flyers')
    const result = localStorage.getItem("favoritesFlyers");
    if (result.length === 0) {
        return []
    } else {
        return result;
    }
}

export async function postFavoritesFlyers(flyers) {
    console.log('Fetching favorites flyers')
    localStorage.setItem('favoritesFlyers', flyers);
    return localStorage.getItem("favoritesFlyers");
}
