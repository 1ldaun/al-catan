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

  useEffect(() => {
    let buffer: any[] = [];
    for (const [value] of Object.entries(NumberToCount)) {
      buffer.push(value);
    }
    buffer.splice(5, 0, [0]);
    setNumberArray(buffer);
  }, []);

  return (
    <div className={styles.card} style={{ backgroundColor: EventCube }}>
      <p className={styles.dice}><span className={styles.explanation}>Сумма на кубиках:</span> {Dice}</p>
      <p className={styles.eventCube}><span className={styles.explanation}>Событие:</span> {EventCube}</p>
      <p className={styles.redCube}><span className={styles.explanation}>Красный кубик:</span> {RedCube}</p>
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
