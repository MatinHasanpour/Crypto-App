import { ImCross } from "react-icons/im";

import style from "./chart.module.css";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  return (
    <div className={style.container}>
      <ImCross onClick={() => setChart(null)} className={style.cross} />
      <div className={style.chart}>
        <div className={style.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={style.graph}>
          <Chartcomponents data={convertData(chart, type)} type={type} />
        </div>
        <div className={style.types} onClick={typeHandler}>
          <button className={type==="prices"?style.selected:null}>Prices</button>
          <button className={type==="market_caps"?style.selected:null}>Market Caps</button>
          <button className={type==="total_volumes"?style.selected:null}>Total Volumes</button>
        </div>
        <div className={style.details}>
          <div>
            <p>Prices :</p>
            <span>$ {chart.coin.current_price} </span>
          </div>
          <div>
            <p>ATH :</p>
            <span>$ {chart.coin.ath} </span>
          </div>
          <div>
            <p>Market Cap :</p>
            <span>$ {chart.coin.market_cap} </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const Chartcomponents = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
