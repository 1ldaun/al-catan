import React, {useEffect, useState} from 'react';
import {GameStep} from "../../../interfaces/game-step.interface";
import styles from "./gameFieldItem.module.scss"

const GameFieldItem: React.FC<GameStep> = ({Dice, EventCube, RedCube, NumberToCount, InfoAboutWarriors}) => {
  let [numberArray, setNumberArray] = useState<number[]>([])

  useEffect(() => {
    let buffer: any[] = []
    for (const [key, value] of Object.entries(NumberToCount)) {
      buffer.push(value)
    }
    buffer.splice(5,0,[0])
    setNumberArray(buffer)
  }, [])

  return (
    <div className={styles.card} style={{backgroundColor: EventCube}}>
      <p className={styles.dice}>{Dice}</p>
      <p className={styles.eventCube}>{EventCube}</p>
      <p className={styles.redCube}>{RedCube}</p>
      <table className={styles.numberTable}>
        <tr>
        {
          numberArray.map((number, index) => {
            return <th>{index+2}</th>
          })
        }
        </tr>
        <tr>
      {
        numberArray.map((number, index) => {
          return <td>{number}</td>
        })
      }
        </tr>
      </table>
      <p className={styles.message}>{InfoAboutWarriors}</p>
    </div>
  );
};

export default GameFieldItem;