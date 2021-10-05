import Main from '../main/main';

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
    <Main
      promo={promo}
      films={films}
    />
  );
}

export default App;
