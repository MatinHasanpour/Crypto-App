import { ImCross } from "react-icons/im";

import style from "./chart.module.css";

function Chart({chart,setChart}) {
    console.log(chart)
  return (
    <div className={style.container}>
      <ImCross onClick={()=>setChart(null)} className={style.cross}/>
        <div className={style.chart}></div>
    </div>
  );
}

export default Chart;
