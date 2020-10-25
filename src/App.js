import { Fragment, useState } from 'react';
import emojiFlags from 'emoji-flags';
import logoChecker from './utils/logo-checker';
import Loader from './components/loader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState([]);
  const [data, setData] = useState({
    cardNumber: null,
    data: [],
    error: null,
  });

  const cardInfo = data?.data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const api_url = `https://cors-anywhere.herokuapp.com/https://bin-checker.net/api/${data?.cardNumber}/`;
    const res = await fetch(api_url);
    const json = await res.json();
    json.country.code !== '' &&
      setEmoji(emojiFlags.countryCode(json.country.code));
    setData({
      ...data,
      data: json,
      error: null,
    });
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      cardNumber: e.target.value,
    });
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Bin Checker</h1>

        <form onSubmit={handleSubmit} className="description">
          <input
            type="number"
            className="input"
            onChange={handleChange}
            placeholder="Type first 6 digit of your card. Eg: 371599"
          />
          <button type="submit" className="submit">
            Check
          </button>
        </form>

        <div className="grid">
          <div className="card">
            {isLoading ? (
              <Loader />
            ) : (
              <Fragment>
                <h3>Issuer</h3>
                <p>
                  <span>Bank Name</span>: {cardInfo?.bank?.name}
                </p>
                <p>
                  <span>Bank Phone</span>: {cardInfo?.bank?.phone}
                </p>
                <p>
                  <span>Bank Website</span>: {cardInfo?.bank?.website}
                </p>
              </Fragment>
            )}
          </div>

          <div className="card">
            {isLoading ? (
              <Loader />
            ) : (
              <Fragment>
                <h3>Network</h3>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Name</span>:{' '}
                  {cardInfo?.scheme !== '' && (
                    <img
                      style={{ margin: '0 4px' }}
                      src={logoChecker(cardInfo?.scheme)}
                      alt="amex"
                      width="32"
                    />
                  )}
                  {cardInfo?.scheme}
                </p>
                <p>
                  <span>Type</span>: {cardInfo?.type} / {cardInfo?.level}
                </p>
              </Fragment>
            )}
          </div>

          <div className="card">
            {isLoading ? (
              <Loader />
            ) : (
              <Fragment>
                <h3>Country</h3>
                <p>
                  <span>Name</span>: {emoji.emoji} {cardInfo?.country?.name}
                </p>
                <p>
                  <span>Currency</span>: {cardInfo?.country?.currency}
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
