
type ShowMoreProps = {
  onClick: () => void,
}

export default function ShowMore({onClick}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onClick}
      >
        Show more
      </button>
    </div>
  );
}
