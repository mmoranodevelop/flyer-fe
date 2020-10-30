import {createStore, combineReducers, applyMiddleware} from "redux";
import {FlyersReducer} from "./reducers/flyers.reducer";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {FavoritesFlyersReducer} from "./reducers/favorite-fleyers.reducer";



export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            flyers: FlyersReducer,
            favoritesFlyers: FavoritesFlyersReducer
        }),
        applyMiddleware(thunk, logger)
    );
}
