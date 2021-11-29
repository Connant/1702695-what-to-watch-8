import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction, AuthorizationData } from '../../store/actions-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DEFAULT_STATE: AuthorizationData = {
  login: '',
  password: '',
};

export default function SignIn(): JSX.Element {

  const [userInput, setUserInput] = useState(DEFAULT_STATE);

  const dispatch = useDispatch();

  const onSubmit = (authData: AuthorizationData) => {
    dispatch(loginAction(authData));
  };

  const letterCheck = /[a-zA-Z]/;
  const numberCheck = /[0-9]/;
  const emailValid = new RegExp('^[a-z0-9-_\\.]+@[a-z0-9-\\.]+\\.[a-z]+$');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    toast.configure();

    if (!userInput.login) {
      return(toast.error('Please enter valid email', {
        position: toast.POSITION.TOP_CENTER,
      }));
    }

    if (!emailValid.test(userInput.login)) {
      return(toast.error('Please enter valid email', {
        position: toast.POSITION.TOP_CENTER,
      }));
    }

    if (!letterCheck.test(userInput.password)) {
      return(toast.error('Password must have at least one letter', {
        position: toast.POSITION.TOP_CENTER,
      }));
    }

    if (!numberCheck.test(userInput.password)) {
      return(toast.error('Password must have at least one number', {
        position: toast.POSITION.TOP_CENTER,
      }));
    }

    if (userInput.login !== '' && userInput.password !== '') {
      onSubmit(userInput);
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

