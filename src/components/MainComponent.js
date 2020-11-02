import React, {Component} from 'react';
import Header from './HeaderComponent';
import {withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import {connect} from 'react-redux';
import {addFlyerOnFavorites, fetchFavoritesFlyers, fetchFlyers} from '../redux/actions/ActionsCreators';

const mapStateToProps = state => {
    return {
        flyers: state.flyers,
        favoritesFlyers: state.favoritesFlyers
    }
}

//LAST ASSIGNMENT
const mapDispatchToProps = dispatch => ({
    fetchFlayers: (page: number) => {
        dispatch(fetchFlyers(page));
    },
    fetchFavoritesFlyers: () => {
        dispatch(fetchFavoritesFlyers())
    },
    addFlyerOnFavorites: (flyer) => {
        dispatch(addFlyerOnFavorites(flyer))
    }
});


class Main extends Component {

    homeRef = React.createRef();

    constructor(props) {
        super(props);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            flyersPage: 1,
        };
    }

    componentDidMount() {
        this.props.fetchFlayers(this.state.flyersPage);
        this.props.fetchFavoritesFlyers();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    loadNextPage() {
        this.setState({
            flyersPage: this.state.flyersPage + 1
        });
        this.props.fetchFlayers(this.state.flyersPage);
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            this.loadNextPage();
        }
    };


    //LAST ASSIGNMENT TASK3
    render() {

        //LAST ASSIGNMENT TASK3
        return (
            <div>
                <div>
                    <Header favoritesFlayers={this.props.favoritesFlyers.favoritesFlyers}
                            isLoading={this.props.favoritesFlyers.isLoading}
                            removeFlyerOnFavorites={this.props.addFlyerOnFavorites}/>
                </div>
                <div className="container-fluid" id="content">
                    <Home ref={this.homeRef}
                          flyers={this.props.flyers.flyers}
                          flyersLoading={this.props.flyers.isLoading}
                          flyersLoadingMore={this.props.flyers.isLoadingMore}
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
