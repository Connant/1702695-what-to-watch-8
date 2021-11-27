import { Link } from 'react-router-dom';
import FilmTabOverview from '../tab-overview/tab-overview';
import FilmTabDetails from '../tab-details/tab-details';
import FilmTabReviews from '../tab-reviews/tab-reviews';
import { Film } from '../../film-card/film-card';

export type FilmTabsProps = {
  id: number,
  film: Film,
}

const FilmTab = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

export default function FilmTabs({id, film}: FilmTabsProps) : JSX.Element {
  const urlHash = document.location.hash.replace('#', '');

  const renderActiveTab = (tab: string) => {
    switch (tab) {
      case FilmTab.OVERVIEW:
        return <FilmTabOverview film={film} />;
      case FilmTab.DETAILS:
        return <FilmTabDetails film={film} />;
      case FilmTab.REVIEWS:
        return <FilmTabReviews />;
    }
  };

  const setClassName = (thisTab: string) => (
    `film-nav__item ${urlHash === thisTab ? 'film-nav__item--active' : ''}`
  );

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={setClassName(FilmTab.OVERVIEW)}>
            <Link className="film-nav__link film-nav__item--active" to={`/films/${id}/#${FilmTab.OVERVIEW}`}>
              Overview
            </Link>
          </li>
          <li className={setClassName(FilmTab.DETAILS)}>
            <Link className="film-nav__link" to={`/films/${id}/#${FilmTab.DETAILS}`}>
              Details
            </Link>
          </li>
          <li className={setClassName(FilmTab.REVIEWS)}>
            <Link className="film-nav__link" to={`/films/${id}/#${FilmTab.REVIEWS}`} >
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
      {renderActiveTab(urlHash)}
    </div>
  );
}
