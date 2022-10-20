import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "./gameField.module.scss";
import axios from "axios";
import { GameStep } from "../../interfaces/game-step.interface";
import GameFieldItem from "./GameFieldItem/GameFieldItem";

interface IGameField {
  className?: string;
  closeField: (defaultValue: boolean) => void;
  id: number;
  setId: (id: number) => void;
  newGame: boolean;
}

const GameField: React.FC<IGameField> = ({ closeField, id , newGame, setId}) => {
  const [gameSteps, setGameSteps] = useState<GameStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const myRef = useRef<null | HTMLDivElement>(null);

  const startNewGame = () => {
    setId(id + 1);
    setGameSteps([]);
  }

  const doStep = () => {
    setIsLoading(true);
    setTimeout(() => {}, 1000);
    axios
      .get("https://snapiproof.pagekite.me/catan/dice?id=" + id)
      .then((response) => {
        setGameSteps([...gameSteps, response.data]);
      })
      .catch(() => {
        let randNumber = Math.random();
        setGameSteps([
          ...gameSteps,
          {
            Dice: Math.round(randNumber * 100) % 12 + 1,
            EventCube:
              randNumber < 0.25
                ? "green"
                : randNumber >= 0.25 && randNumber < 0.5
                ? "blue"
                : randNumber < 0.75
                ? "yellow"
                : "warrior",
            RedCube: Math.round(randNumber * 100) % 6 + 1,
            InfoAboutWarriors: "service is currently unavailable",
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

  const keyCLick = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " "){
      doStep();
    }
  }

  useEffect(() => {
    newGame && startNewGame()
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", keyCLick);
    myRef!.current!.scrollIntoView({behavior: "smooth"});

    return function cleanup () {
      window.removeEventListener('keydown', keyCLick);
    }
  })

  return (
    <div className={styles.gameWrapper}>
      <div className={styles.game}>
        <img
          className={styles.img}
          src="/img/remove.png"
          alt={"close pop-up"}
          title={"Закрыть окно"}
          onClick={() => stopGame()}
        />
        {gameSteps.map((it) => (
          <GameFieldItem {...it}/>
        ))}
        <div ref={myRef}></div>
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
