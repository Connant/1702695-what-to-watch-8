import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction, AuthorizationData, ThunkAppDispatch } from '../../store/actions-api';


const DEFAULT_STATE: AuthorizationData = {
  login: '',
  password: '',
};

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthorizationData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function SignIn({onSubmit}: PropsFromRedux): JSX.Element {

  const [userInput, setUserInput] = useState(DEFAULT_STATE);

  const history = useHistory();

  const letterCheck = /[a-zA-Z]/;
  const numberCheck = /[0-9]/;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!letterCheck.test(userInput.password)) {
      return('Password must have at least one letter');
    }

    if (!numberCheck.test(userInput.password)) {
      return('Password must have at least one number');
    }

    if (userInput.login !== '' && userInput.password !== '') {
      onSubmit(userInput);
      history.push(AppRoute.Main);
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form onSubmit={handleSubmit} action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">

              <input
                onChange={(evt) => setUserInput({
                  ...userInput,
                  login: evt.currentTarget.value,
                })}
                className="sign-in__input" type="email"
                placeholder="Email address" name="user-email" id="user-email"
              />

              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">

              <input
                onChange={(evt) => setUserInput({
                  ...userInput,
                  password: evt.currentTarget.value,
                })}
                className="sign-in__input" type="password"
                placeholder="Password" name="user-password" id="user-password"
              />

              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default connector(SignIn);
