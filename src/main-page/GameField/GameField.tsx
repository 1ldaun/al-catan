import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from "./gameField.module.scss"
import cx from "classnames"
import axios from "axios";
import mapDefault from "../../data/mapDefault";
import gameField from "./GameField";
import {GameStep} from "../../interfaces/game-step.interface";
import GameFieldItem from "./GameFieldItem/GameFieldItem";

interface IGameField {
  className?: string;
  closeField: (defaultValue: string) => void;
  id: number;
}

const GameField: React.FC<IGameField> = ({className, closeField, id}) => {
  const [gameSteps, setGameSteps] = useState<GameStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const doStep = () => {
    setIsLoading(true);
    axios
      .get("https://snapiproof.pagekite.me/catan/dice?id=" + id)
      .then((response) => {
        setGameSteps([...gameSteps, response.data])
      })
      .catch(() => {
        setGameSteps(gameSteps);
      }).finally(() => {
        setIsLoading(false);
    })};


  const stopGame = () => {
    closeField("none");
  }

  return (
    <div className={cx(className, styles.game)}>
      <div className={styles.game__top}>
        <img className={styles.img}
             src="/img/remove.png"
             alt={"Завершить игру"}
             title={"Завершить игру"}
             onClick={() => stopGame()}
        />
      </div>
      {gameSteps.map(it =>
        <GameFieldItem
          Dice={it.Dice}
          EventCube={it.EventCube}
          RedCube={it.RedCube}
          NumberToCount={it.NumberToCount}
          InfoAboutWarriors={it.InfoAboutWarriors}
        />)}
      <div className={styles.game__button}>
        <button disabled={isLoading} className={styles.button} onClick={() => doStep()}>Сделать ход</button>
      </div>
    </div>
  );
};

export default GameField;