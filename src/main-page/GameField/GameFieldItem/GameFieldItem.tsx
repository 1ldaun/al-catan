import React, { useEffect, useState } from "react";
import { GameStep } from "../../../interfaces/game-step.interface";
import styles from "./gameFieldItem.module.scss";

const GameFieldItem: React.FC<GameStep> = ({
  Dice,
  EventCube,
  RedCube,
  NumberToCount,
  InfoAboutWarriors,
}) => {
  let [numberArray, setNumberArray] = useState<number[]>([]);

  const colorPalette = {
    yellow: "#f9ff78",
    blue: "#44BCF3",
    green: "#73fa5f",
    warrior: "#e8e5e5",
    warriorsCame: "#e85555"
  }

  useEffect(() => {
    let buffer: any[] = [];
    for (const [value] of Object.entries(NumberToCount)) {
      buffer.push(value);
    }
    buffer.splice(5, 0, [0]);
    setNumberArray(buffer);
  }, []);

  return (
    <div className={styles.card} style={
      { background: InfoAboutWarriors === "Варвары пришли!" ? colorPalette.warriorsCame : colorPalette[EventCube as keyof typeof colorPalette] }}>
      <div className={styles.dice}>
        <img className={styles.img} src="/img/cubes.png" alt="?"/>
        <span className={styles.explanation}> Сумма на кубиках: </span>
        {Dice}
      </div>
      <div className={styles.eventCube}>
        <img className={styles.img} src="/img/event.png" alt="?"/>
        <span className={styles.explanation}> Событие: </span>
        {EventCube}
      </div>
      <div className={styles.redCube}>
        <img className={styles.img} src="/img/red-cube.png" alt="?"/>
        <span className={styles.explanation}> Красный кубик: </span>
        {RedCube}
      </div>
      <table className={styles.numberTable}>
        <tr>
          {numberArray.map((number, index) => {
            return <th>{index + 2}</th>;
          })}
        </tr>
        <tr>
          {numberArray.map((number) => {
            return <td>{number}</td>;
          })}
        </tr>
      </table>
      <p className={styles.message}>{InfoAboutWarriors}</p>
    </div>
  );
};

export default GameFieldItem;
