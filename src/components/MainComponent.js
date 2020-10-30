import React, {Component} from 'react';
import Header from './HeaderComponent';
import {withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import {connect} from 'react-redux';
import {fetchFavoritesFlyers, fetchFlyers, addFlyerOnFavorites} from '../redux/actions/ActionsCreators';

const mapStateToProps = state => {
    return {
        flyers: state.flyers,
        favoritesFlyers: state.favoritesFlyers
    }
}

//LAST ASSIGNMENT
const mapDispatchToProps = dispatch => ({
    fetchFlayers: () => {
        dispatch(fetchFlyers());
    },
    fetchFavoritesFlyers: () => {
        dispatch(fetchFavoritesFlyers())
    },
    addFlyerOnFavorites: (flyer) => {
        dispatch(addFlyerOnFavorites(flyer))
    }
});


class Main extends Component {

    constructor(props) {
        super(props);
    }

    //LAST ASSIGNMENT
    componentDidMount() {
        this.props.fetchFlayers();
        this.props.fetchFavoritesFlyers();
    }


    //LAST ASSIGNMENT TASK3
    render() {

        //LAST ASSIGNMENT TASK3
        return (
            <div>
                <div>
                    <Header favoritesFlayers={this.props.favoritesFlyers.favoritesFlyers} isLoading={this.props.favoritesFlyers.isLoading}
                            removeFlyerOnFavorites={this.props.addFlyerOnFavorites}/>
                </div>
                <div className="container-fluid" id="content">
                    <Home
                        flyers={this.props.flyers.flyers}
                        flyersLoading={this.props.flyers.isLoading}
                        flyerErrMess={this.props.flyers.errMess}
                        favoritesFlayers={this.props.favoritesFlyers.favoritesFlyers}
                        addFlyerOnFavorites={this.props.addFlyerOnFavorites}
                    />
                </div>
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
