import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../main/main';
import AddReview from '../add-review/add-review';
import Film from '../film/film';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';

import PrivateRoute from '../private-route/private-route';

type AppProps = {
  promo: {
    name: string,
    genre: string,
    released: number,
    previewImage: string,
    posterImage: string,
  },
  films: {
    id: number,
    name: string,
    previewImage: string,
  }[];
}

function App(props: AppProps): JSX.Element {
  const { promo, films } = props;


  return (
    <BrowserRouter>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            promo={promo}
            films={films}
          />
        </Route>

        <Route path={AppRoute.AddReview} exact>
          <AddReview />
        </Route>

        <Route path={AppRoute.Film} exact>
          <Film />
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
