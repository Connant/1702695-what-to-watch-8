import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


function MyList():JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header film-card__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.MyList} className="user-block__link">Sign out</Link>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Fantastic Beasts: The Crimes of Grindelwald</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Bohemian Rhapsody</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Macbeth</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Aviator</Link>
            </h3>
          </article>


          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/we-need-to-talk-about-kevin.jpg" alt="We need to talk about Kevin" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>We need to talk about Kevin</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/what-we-do-in-the-shadows.jpg" alt="What We Do in the Shadows" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>What We Do in the Shadows</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/revenant.jpg" alt="Revenant" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Revenant</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/johnny-english.jpg" alt="Johnny English" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Johnny English</Link>
            </h3>
          </article>

          <article className="small-film-card catalog__films-card">
            <div className="small-film-card__image">
              <img src="img/shutter-island.jpg" alt="Shutter Island" width="280" height="175" />
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={AppRoute.Film}>Shutter Island</Link>
            </h3>
          </article>
        </div>
      </section>

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

export default MyList;
