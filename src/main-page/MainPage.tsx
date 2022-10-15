import React, {useEffect, useState} from "react";
import Hex from "./Hex/Hex";
import {HexInterface} from "../interfaces/hex.interface";
import styles from "./mainPage.module.scss";
import axios from "axios";
import mapDefault from "../data/mapDefault";
import cx from "classnames"
import GameField from "./GameField/GameField";

const MainPage = () => {
  const [map, setMap] = useState(mapDefault);
  const [game, setGame] = useState("none");
  const [buttonName, setButtonName] = useState("Начать игру")
  const getMap = () => {
    axios
      .get("https://snapiproof.pagekite.me/catan")
      .then((response) => setMap(response.data))
      .catch(() => {
        setMap(mapDefault);
      });
  };

  const startGame = () => {
    if (buttonName === "Начать игру") {
      setGame("block");
      setButtonName("Завершить игру")
    } else {
      setGame("none");
      setButtonName("Начать игру")
    }
  }

  useEffect(getMap, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.map}>
          {map.map((item: HexInterface): any => {
            return <Hex type={item.type} id={item.id} number={item.number}/>;
          })}
        </div>
        <button className={cx(styles.button, styles.button__first)} onClick={() => getMap()}>
          Сгенерировать
        </button>
        <button className={styles.button} onClick={() => startGame()}>
          {buttonName}
        </button>
      </div>
      <div style={{display: game}} className={styles.game}>
        <GameField/>
      </div>
    </div>

  );
};

export default MainPage;
