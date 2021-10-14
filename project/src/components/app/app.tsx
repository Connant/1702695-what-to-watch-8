import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import  { FilmCardProps } from '../film-card/film-card';

import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';

import PrivateRoute from '../private-route/private-route';

type AppProps = {
  films: Array<FilmCardProps>,
  currentFilm: FilmCardProps,
}

function App({films, currentFilm}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            films={films}
            currentFilm={currentFilm}
          />
        </Route>

        <Route path={AppRoute.AddReview} exact>
          <AddReview />
        </Route>

        <Route path={AppRoute.Player} exact>
          <Player />
        </Route>

        {/* <Route path={AppRoute.MyList} exact>
          <MyList />
        </Route> */}

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList />}
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

export default App;
