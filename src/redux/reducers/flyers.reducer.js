import * as ActionTypes from '../actions/ActionsTypes';

export const FlyersReducer = (state = { isLoading: true,
    isLoadingMore: true,
    errMess: null,
    flyers:[]}, action) => {
    switch (action.type) {
        case ActionTypes.GET_FLYERS:
            return {...state, isLoading: false, errMess: null, flyers: action.payload, isLoadingMore: false};

        case ActionTypes.FLYERS_LOADING:
            return {...state, isLoading: true, errMess: null, flyers: [], isLoadingMore: false}

        case ActionTypes.FLYERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, isLoadingMore: false};

        case ActionTypes.FLYERS_LOADING_MORE:
            return {...state, isLoading: false, errMess: null, isLoadingMore: true};
        default:
            return state;
    }
};
