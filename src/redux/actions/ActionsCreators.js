import * as Api from '../../api/flyers-api';
import * as ActionTypes from '../actions/ActionsTypes';

export const fetchFlyers = (page: number) => (dispatch) => {

    dispatch(flyersLoading(true));

    return Api.getFlyers(page)
        .then(response => {
                if (response) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            })
        .then(flyers => dispatch(getFlyers(flyers)))
        .catch(error => dispatch(flyersFailed(error.message)));
}

export const flyersLoading = () => ({
    type: ActionTypes.FLYERS_LOADING
});

export const flyersFailed = (errmess) => ({
    type: ActionTypes.FLYERS_FAILED,
    payload: errmess
});

export const getFlyers = (flyers) => ({
    type: ActionTypes.GET_FLYERS,
    payload: flyers
});

export const favoritesFlyersLoading = () => ({
    type: ActionTypes.FLYERS_FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FLYERS_FAVORITES_FAILED,
    payload: errmess
});

export const favoritesFlyers = (favoriteFlyers) => ({
    type: ActionTypes.GET_FAVORITES_FLYERS,
    payload: favoriteFlyers
});

export const fetchFavoritesFlyers = () => (dispatch) => {


    dispatch(favoritesFlyersLoading(true));
    let result = localStorage.getItem("favoritesFlyers");
    if (!result || result === "undefined") {
        result = [];
        dispatch(favoritesFlyers(result));
    } else {
        dispatch(favoritesFlyers(JSON.parse(result)));
    }
}

export const addFlyerOnFavorites = (flyer) => (dispatch) => {
    let existingFlyers = localStorage.getItem("favoritesFlyers");
    let indexElemToRemove = null;
    if (!existingFlyers || existingFlyers === "undefined") {
        existingFlyers = [];
    } else {
        existingFlyers = JSON.parse(existingFlyers);
    }
    existingFlyers.some((elem, index) => {
        if (elem.id === flyer.id) {
            indexElemToRemove = index;
            return true;
        } else {
            return false;
        }}) ? existingFlyers.splice(indexElemToRemove, 1) : existingFlyers.push(flyer);

    localStorage.setItem("favoritesFlyers", JSON.stringify(existingFlyers));
    dispatch(favoritesFlyers(existingFlyers));
}
