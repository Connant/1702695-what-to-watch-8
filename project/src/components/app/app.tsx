import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import  { Film } from '../film-card/film-card';
import { FilmReviewProps } from '../tab-reviews/tab-reviews';

import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import Error from '../error/error';
import FilmPage from '../film/film';

import PrivateRoute from '../private-route/private-route';

type AppProps = {
  films: Array<Film>,
  // currentGenre: Film[],
  reviews: FilmReviewProps[];
}

function App({films, reviews }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>

        <Route path={AppRoute.Main} exact>
          <Main
            films={films}
            // currentGenre={currentGenre}
          />
        </Route>

        <Route path={AppRoute.Film} exact>
          <FilmPage
            films={films}
            reviews={reviews}
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

export default App;
