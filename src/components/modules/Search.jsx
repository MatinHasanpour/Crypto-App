import React, { useEffect, useState } from "react";
import { searchCoin } from "../../services/CryptoApi";
import { RotatingLines } from "react-loader-spinner";

import style from "./search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error.message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();

    return () => controller.abort();
  }, [text]);
  return (
    <div className={style.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
      </select>

      {(!!coins.length || isLoading) && (
        <div className={style.searchResult}>
          {isLoading && (
            <RotatingLines
              width="50px"
              height="50px"
              strokeWidth="3"
              strokeColor="#3874ff"
            />
          )}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <span>{coin.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
