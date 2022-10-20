import React, {useEffect, useState} from "react";
import Hex from "./Hex/Hex";
import {HexInterface} from "../interfaces/hex.interface";
import styles from "./mainPage.module.scss";
import axios from "axios";
import mapDefault from "../data/mapDefault";
import GameField from "./GameField/GameField";
import shuffle from "../assets/shuffle";
import cx from "classnames";

const MainPage = () => {
  const [map, setMap] = useState(mapDefault);
  const [id, setId] = useState(0);
  const [game, setGame] = useState(false);
  const [newGame, setNewGame] = useState(true)
  const getMap = () => {
    axios
      .get("https://snapiproof.pagekite.me/catan")
      .then((response) => setMap(response.data))
      .catch(() => {
        setMap(shuffle(mapDefault));
      });
    setId(Math.round(Math.random() * 100));
  };

  useEffect(getMap, []);

  return (
    <div className={styles.main}>
      <div className={cx(styles.wrapper, game && styles.wrapper__opacity)}>
        <div className={styles.map}>
          {map.map((item: HexInterface): any => {
            return <Hex type={item.type} id={item.id} number={item.number}/>;
          })}
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.button} onClick={() => getMap()}>
            Сгенерировать
          </button>
          {newGame ?
            <button className={styles.button} onClick={() => {
              setGame(true);
              setNewGame(false);
            }}>
              Начать игру
            </button> :
            <div className={styles.newGameButtons}>
              <button className={styles.newGameButtons__button} onClick={() => {
                setGame(true);
              }}>
                Продолжить игру
              </button>
              <button className={styles.newGameButtons__button} onClick={() => {
                setGame(true);
              }
              }>
                Начать новую игру
              </button>
            </div>
          }
        </div>
      </div>
      {game && <GameField closeField={setGame} id={id} newGame={newGame}/>}
    </div>
  );
};

export default MainPage;
