import * as ActionTypes from "../actions/ActionsTypes";

export const FavoritesFlyersReducer = (state = { isLoading: true,
    errMess: null,
    favoritesFlyers:[]}, action) => {
    switch (action.type) {
        case ActionTypes.GET_FAVORITES_FLYERS:
            return {...state, isLoading: false, errMess: null, favoritesFlyers: action.payload};

        case ActionTypes.FLYERS_FAVORITES_LOADING:
            return {...state, isLoading: true, errMess: null}

        case ActionTypes.FLYERS_FAVORITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
