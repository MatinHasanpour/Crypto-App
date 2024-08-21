import { BsFillHeartPulseFill } from "react-icons/bs";

import style from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={style.header}>
        <h1>Crypto App</h1>
        <p>
          <span>Botostart</span> || React.js Full Course
        </p>
      </header>
      {children}
      <footer className={style.footer}>
        <p>
          Developed by Matin With <BsFillHeartPulseFill color="red" />
        </p>
      </footer>
    </>
  );
}

export default Layout;
