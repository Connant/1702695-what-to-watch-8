import { Router, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';
import FilmPage from '../film-page/film-page';
import PrivateRoute from '../private-route/private-route';
import { getCurrentGenre } from '../../store/selectors';
import { browserHistory } from '../../store/history';

export default  function App(): JSX.Element {
  const currentGenre = useSelector(getCurrentGenre);

  return (
    <Router history={browserHistory}>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            currentGenre={currentGenre}
          />
        </Route>

        <Route path={AppRoute.Film} exact component={FilmPage} />

        <PrivateRoute path={AppRoute.AddReview} exact>
          <AddReview />
        </PrivateRoute>

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
    </Router>
  );
}

