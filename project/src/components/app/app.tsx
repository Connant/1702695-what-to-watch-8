import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import type { State } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';

import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';
import FilmPage from '../film/film';
import PrivateRoute from '../private-route/private-route';


const mapStateToProps = ({currentFilms, isDataLoaded, authorizationStatus}: State) => ({
  currentFilms,
  isDataLoaded,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function App({currentFilms, isDataLoaded, authorizationStatus}: PropsFromRedux): JSX.Element {

  return (
    <BrowserRouter>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            films={currentFilms}
          />
        </Route>

        <Route path={AppRoute.Film} exact component={FilmPage} />

        <Route path={AppRoute.AddReview} exact component={AddReview} />

        <Route path={AppRoute.Player} exact component={Player} />

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute exact path={AppRoute.MyList}>
          <MyList films={currentFilms} />
        </PrivateRoute>

        <Route>
          <Error />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
