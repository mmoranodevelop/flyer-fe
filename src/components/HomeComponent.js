import React from 'react';
import {AppSpinner, Loading} from '../shared/LoadingComponent';
import {FadeTransform} from 'react-animation-components';
import {CardSubtitle} from 'reactstrap';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);


function RenderFlyerCard({flyer, isLoading, errMess, isFavorite, onLike}) {
    const classes = useStyles();
    if (isLoading) {
        return (
            <Loading/>
        );
    } else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } else
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card className="mb-3">
                    <CardMedia
                        className={classes.media}
                        image="http://placehold.it/130?text=No-image"
                    />
                    <CardHeader className="mt-3"
                        title={flyer.retailer}
                        subheader={flyer.title ?
                            <span className="h5 font-weight-bold overflow-auto truncate mt-5">
                                {flyer.title}
                            </span>
                            : null}
                    />
                    <CardContent>
                        <span className="h5 font-weight-bold truncate">
                            {flyer.category}
                        </span>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => onLike(flyer)}>
                            <FavoriteIcon className={isFavorite ? 'favoriteColor' : ''}/>
                        </IconButton>
                    </CardActions>
                </Card>
            </FadeTransform>
        );

}

class Home extends React.Component {


    constructor(props) {
        super(props)
        this.saveFavorite = this.saveFavorite.bind(this)
    }

    saveFavorite(flyer) {
        this.props.addFlyerOnFavorites(flyer);
    }

    render() {
        let flyers;
        if (this.props.flyers) {
            flyers = this.props.flyers.map((flyer) => {
                let isFavorite;
                if (this.props.favoritesFlayers && this.props.favoritesFlayers.length > 0) {
                    isFavorite = this.props.favoritesFlayers.some(src => src.id === flyer.id);
                }
                return (
                    <div className="col-6 col-sm-3 col-md-3" key={flyer.id}>
                        <RenderFlyerCard flyer={flyer} isFavorite={isFavorite} onLike={this.saveFavorite}/>
                    </div>
                );
            });
        }
        if (this.props.flyersLoading) {
            return (
                <Loading/>
            );
        } else if (this.props.flyerErrMess) {
            return (
                <div className="row">
                    <div className="col-12">
                        <h4>{this.props.flyerErrMess}</h4>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="row mt-10">
                        {flyers}
                    </div>
                    <div className="row mt-2 justify-content-center">
                        <AppSpinner show={this.props.flyersLoadingMore}/>
                    </div>
                </div>

            );
        }
    }
}

export default Home;
