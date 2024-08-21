import { RotatingLines } from "react-loader-spinner";

import { marketChart } from "../../services/CryptoApi";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import style from "./TaleCoin.module.css";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className={style.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="3" />
      ) : (
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.th1}>Coin</th>
              <th className={style.name}>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th className={style.total_volume}>Total Volume</th>
              <th className={(style.total, style.th2)}></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                currency={currency}
                coin={coin}
                key={coin.id}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({
  currency,

  coin,

  setChart,
}) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr>
      <td>
        <div className={style.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>
            <span className={style.colors}>{symbol.toUpperCase()}</span>/USDT
          </span>
        </div>
      </td>
      <td className={style.name}> {name} </td>
      <td className={price_change > 0 ? style.priceSuccess : style.priceError}>
        {currency === "usd" ? <span> $ </span> : <span> € </span>}
        {current_price.toLocaleString()}{" "}
      </td>
      <td>
        <button className={price_change > 0 ? style.success : style.error}>
          {price_change.toFixed(2)}%
        </button>
      </td>
      <td className={style.total_volume}> {total_volume.toLocaleString()} </td>
      <td>
        <img
          className={style.total}
          src={price_change > 0 ? chartUp : chartDown}
          alt=""
        />
      </td>
    </tr>
  );
};
