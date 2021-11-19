import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';

import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';
import FilmPage from '../film/film';
import PrivateRoute from '../private-route/private-route';

import { getCurrentFilm, getCurrentGenre } from '../../store/selectors';


export default  function App(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const currentGenre = useSelector(getCurrentGenre);
  // const isDataLoaded = useSelector(getIsDataLoaded);
  // const authorizationStatus = useSelector(getAuthorizationStatus);

  // if (authorizationStatus === AuthorizationStatus.Unknown || !isDataLoaded) {
  //   return (
  //     <Loading />
  //   );
  // }

  return (
    <BrowserRouter>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            films={currentFilms}
            currentGenre={currentGenre}
          />
        </Route>

        <Route path={AppRoute.Film} exact component={FilmPage} />

        <Route path={AppRoute.AddReview} exact component={AddReview} />

        <Route path={AppRoute.Player} exact component={Player} />

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute exact path={AppRoute.MyList}>
          <MyList />
        </PrivateRoute>

        <Route>
          <Error />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

