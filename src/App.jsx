import { useState } from 'react';
import './App.css';
import enemyGif from '../src/assets/enemy.gif';
import friendGif from '../src/assets/friends.gif';
import loverGif from '../src/assets/lover.gif';
import affectionGif from '../src/assets/affection.gif';
import marriageGif from '../src/assets/marriage.gif';
import sisterGif from '../src/assets/sister.gif';

function App() {
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [result, setResult] = useState('');
  const [gif, setGif] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    const count = calculateCount(name, partnerName);

    if (count === 0) {
      setResult("FRIENDS");
      setGif(friendGif);
      return;
    }

    const lastElement = determineLastElement(count);
    setResult(lastElement);

    // Set the corresponding GIF based on the result
    switch (lastElement) {
      case "FRIENDS":
        setGif(friendGif);
        break;
      case "LOVER":
        setGif(loverGif);
        break;
      case "AFFECTION":
        setGif(affectionGif);
        break;
      case "MARRIAGE":
        setGif(marriageGif);
        break;
      case "ENEMY":
        setGif(enemyGif);
        break;
      case "SISTER":
        setGif(sisterGif);
        break;
      default:
        setGif(friendGif);
    }
  };

  const clearFields = () => {
    setName('');
    setPartnerName('');
    setResult('');
    setGif('');
  };

  const calculateCount = (first, second) => {
    const mp = {};
    let count = 0;

    for (const c of first) {
      mp[c] = (mp[c] || 0) + 1;
    }

    for (const c of second) {
      if (mp[c]) {
        mp[c]--;
      } else {
        count++;
      }
    }

    for (const key in mp) {
      count += mp[key];
    }

    return count;
  };

  const determineLastElement = (count) => {
    const arr = [1, 2, 3, 4, 5, 6];
    let index = 0;

    while (arr.length > 1) {
      index = (index + count - 1) % arr.length;
      arr.splice(index, 1);
    }

    switch (arr[0]) {
      case 1: return "FRIENDS";
      case 2: return "LOVER";
      case 3: return "AFFECTION";
      case 4: return "MARRIAGE";
      case 5: return "ENEMY";
      case 6: return "SISTER";
      default: return "FRIENDS";
    }
  };

  return (
    <>
      <div className='mainBox'>
        <div className="flames-container">
          <h1 className="flames-heading">ＦＬＡＭＥＳ ＪＵＳＴ ＦＵＮ !!</h1>
        </div>
        <div className='mainBar'>
          <h1>GAME</h1>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br />
            <input
              type='text'
              placeholder='Enter Your Partner Name'
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
            /><br />
            <div className="button-container">
              <button type='submit'>CALCULATE AND FUN!!</button>
              <button type='button' onClick={clearFields}>CLEAR</button>
            </div>
          </form>


          {gif && <img src={gif} alt={result} className="result-gif" />}
        </div>
      </div>
    
    </>
  );
}

export default App;
