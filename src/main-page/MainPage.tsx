import React, { useEffect, useState } from "react";
import Hex from "./Hex/Hex";
import { HexInterface } from "../interfaces/hex.interface";
import styles from "./mainPage.module.scss";
import axios from "axios";
import mapDefault from "../data/mapDefault";

const MainPage = () => {
  const [map, setMap] = useState(mapDefault);
  const getMap = () => {
    axios
      .get("https://snapiproof.pagekite.me/catan")
      .then((response) => setMap(response.data))
      .catch(() => {
        setMap(mapDefault);
      });
  };

  useEffect(getMap, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.map}>
        {map.map((item: HexInterface): any => {
          return <Hex type={item.type} id={item.id} number={item.number} />;
        })}
      </div>
      <button className={styles.button} onClick={() => getMap()}>
        Сгенерировать
      </button>
    </div>
  );
};

export default MainPage;
