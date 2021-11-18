
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/actions-api';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ThunkAppDispatch } from '../../store/actions-api';
import { State } from '../../store/reducer';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setLogout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function UserBlock({ authorizationStatus, setLogout }: PropsFromRedux): JSX.Element {
  return (
    <ul className="user-block">
      {authorizationStatus === AuthorizationStatus.Auth ?
        (
          <React.Fragment>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <Link to={AppRoute.MyList}>
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </Link>
              </div>
            </li>
            <li className="user-block__item">
              <Link onClick={setLogout} className="user-block__link" to={AppRoute.Main}>Sign Out</Link>
            </li>
          </React.Fragment>
        ) : (
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.SignIn}>Sign In</Link>
          </li>
        )}
    </ul>
  );
}

export default connector(UserBlock);
