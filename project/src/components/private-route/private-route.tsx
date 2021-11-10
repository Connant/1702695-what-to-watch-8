import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store/reducer';


const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateRouteProps = PropsFromRedux & RouteProps;

function PrivateRoute(props: ConnectedPrivateRouteProps): JSX.Element {
  const {exact, path, children, authorizationStatus} = props;

  return (
    <Route exact={exact} path={path}>
      {
        authorizationStatus === AuthorizationStatus.Auth
          ? children
          : <Redirect to={AppRoute.SignIn} />
      }
    </Route>
  );
}

export default connector(PrivateRoute);
