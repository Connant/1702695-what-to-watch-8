import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';
import FilmPage from '../film/film';
import PrivateRoute from '../private-route/private-route';
import Loading from '../loading/loading';

import type { State } from '../../store/reducer';
import { fakeReviews } from '../mocks/reviews';

import { connect, ConnectedProps } from 'react-redux';

// type AppProps = {
//   films: Array<Film>,
//   reviews: FilmReviewProps[];
// }

const mapStateToProps = ({currentFilm, isDataLoaded}: State) => ({
  films: currentFilm,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function App({films, isDataLoaded}: PropsFromRedux): JSX.Element {

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            films={films}
          />
        </Route>

        <Route path={AppRoute.Film} exact>
          <FilmPage
            films={films}
            reviews={fakeReviews}
          />
        </Route>

        <Route path={AppRoute.AddReview} exact component={AddReview} />

        <Route path={AppRoute.Player} exact component={Player} />

        {/* <Route path={AppRoute.MyList} exact>
          <MyList />
        </Route> */}

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList films={films} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>

        <Route>
          <Error />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
