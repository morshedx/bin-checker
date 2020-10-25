import { Fragment, useState, useEffect } from 'react';
import emojiFlags from 'emoji-flags';
import logoChecker from './utils/logo-checker';
import Loader from './components/loader';
import Close from './components/icons/close';
import './App.css';

const initialState = {
  cardNumber: '',
  data: [],
  error: null,
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState([]);
  const [data, setData] = useState(initialState);

  const cardInfo = data?.data;

  useEffect(() => {
    data?.cardNumber?.length === 6 && fetchData();
  }, [data.cardNumber]);

  const fetchData = async () => {
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

  const handleClearInput = () => {
    setData(initialState);
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Bin Checker</h1>

        <div className="description">
          <input
            type="number"
            className={`input ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            value={data?.cardNumber}
            onChange={handleChange}
            placeholder="Type first 6 digit of your card. Eg: 371599"
          />
          <button onClick={handleClearInput} className="clear-input">
            <Close />
          </button>
          {/* <button type="submit" className="submit">
            Check
          </button> */}
        </div>

        <div className="grid">
          <div className="card">
            {isLoading ? (
              <Loader />
            ) : (
              // <Loader />
              <Fragment>
                <h3>Issuer</h3>
                <p>
                  <span>Bank Name</span>: {cardInfo?.bank?.name}
                </p>
                <p>
                  <span>Bank Phone</span>: {cardInfo?.bank?.phone}
                </p>
                <p>
                  <span>Bank Website</span>:{' '}
                  <a href={cardInfo?.bank?.website}>
                    {cardInfo?.bank?.website}
                  </a>
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
                  <span>Name</span>:
                  {(cardInfo?.scheme !== '' ||
                    cardInfo?.scheme !== undefined) && (
                    <img
                      style={{ margin: '0 4px' }}
                      src={logoChecker(cardInfo?.scheme)}
                      alt={cardInfo.scheme}
                      width="32"
                    />
                  )}
                  {cardInfo?.scheme}
                </p>
                <p>
                  <span>Type</span>: {cardInfo?.type}
                </p>
                <p>
                  <span>Level</span>: {cardInfo?.level}
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

      <footer className="footer"></footer>
    </div>
  );
}

export default App;
