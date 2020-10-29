import { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import emojiFlags from 'emoji-flags';
import logoChecker from './utils/logo-checker';
import Loader from './components/loader';
import Close from './components/icons/close';
import './App.css';

const initialState = {
  data: [],
};

function App() {
  const inputRef = useRef();
  const [cardNumber, setCardNumber] = useState('');
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState([]);

  const cardInfo = data.data;

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    cardNumber?.length === 6 && getBinData();
  }, [cardNumber]);

  const getBinData = async () => {
    const api = `https://api.bincodes.com/bin/json/${process.env.REACT_APP_BINCODES_API_KEY}/${cardNumber}/`;
    try {
      setLoading(true);
      const response = await axios.get(api);
      setData({
        ...data,
        data: response.data,
      });
      response.data.error === '' &&
        setEmoji(emojiFlags.countryCode(response.data.countrycode));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleClearInput = () => {
    setCardNumber('');
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          <abbr title="Bank Identification Number">BIN</abbr>/
          <abbr title="Issuer Identification Numbers">IIN</abbr> Checker
        </h1>

        <div className="description">
          <input
            type="number"
            ref={inputRef}
            className={`input ${loading ? 'loading' : ''}`}
            disabled={loading}
            value={cardNumber}
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
        {data.data.message && (
          <Fragment>
            <p className="message error">{data.data.message}.</p>
            <p className="message warning">Please wait until next day.</p>
          </Fragment>
        )}

        <div className="grid">
          <div className="card">
            {loading ? (
              <Loader />
            ) : (
              // <Loader />
              <Fragment>
                <h3>Issuer</h3>
                <p>
                  <span>Bank Name</span>: {cardInfo?.bank}
                </p>
                <p>
                  <span>Bank Phone</span>: {cardInfo?.phone}
                </p>
                <p>
                  <span>Bank Website</span>:{' '}
                  <a href={cardInfo.website}>{cardInfo.website}</a>
                </p>
              </Fragment>
            )}
          </div>

          <div className="card">
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <h3>Network</h3>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Name</span>:
                  {(cardInfo.card !== '' || cardInfo.card !== undefined) && (
                    <img
                      style={{ margin: '0 4px' }}
                      src={logoChecker(cardInfo.card)}
                      alt={cardInfo.card}
                      width="32"
                    />
                  )}
                  {cardInfo.card}
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
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <h3>Country</h3>
                <p>
                  <span>Name</span>: {emoji.emoji} {cardInfo.country}
                </p>
                <p>
                  <span>Country Code</span>: {cardInfo.countrycode}
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
