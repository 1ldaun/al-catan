import React, { useState } from "react";
import styles from "./gameField.module.scss";
import axios from "axios";
import { GameStep } from "../../interfaces/game-step.interface";
import GameFieldItem from "./GameFieldItem/GameFieldItem";

interface IGameField {
  className?: string;
  closeField: (defaultValue: boolean) => void;
  id: number;
}

const GameField: React.FC<IGameField> = ({ closeField, id }) => {
  const [gameSteps, setGameSteps] = useState<GameStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const doStep = () => {
    setIsLoading(true);
    setTimeout(() => {}, 1000);
    axios
      .get("https://snapiproof.pagekite.me/catan/dice?id=" + id)
      .then((response) => {
        setGameSteps([...gameSteps, response.data]);
      })
      .catch(() => {
        setGameSteps([
          ...gameSteps,
          {
            Dice: 0,
            EventCube: "undef",
            RedCube: 0,
            InfoAboutWarriors: "Internal server error aaaaaaaaa aaaa aaaaa",
            NumberToCount: {
              "2": 1,
              "3": 10,
              "4": 1,
              "5": 10,
              "6": 1,
              "7": 10,
              "8": 1,
              "9": 10,
              "10": 1,
              "11": 10,
            },
          },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const stopGame = () => {
    closeField(false);
  };

  return (
    <div className={styles.gameWrapper}>
      <div className={styles.game}>
        <img
          className={styles.img}
          src="/img/remove.png"
          alt={"close pop-up"}
          title={"close pop-up"}
          onClick={() => stopGame()}
        />
        {gameSteps.map((it) => (
          <GameFieldItem {...it} />
        ))}
        <div className={styles.game__button}>
          <button
            disabled={isLoading}
            className={styles.button}
            onClick={() => doStep()}
          >
            Сделать ход
            <div
              className={styles.spinner}
              style={{ display: isLoading ? "inline-block" : "none" }}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameField;
