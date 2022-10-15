import React from 'react';
import styles from "./gameField.module.scss"
import cx from "classnames"

interface IGameField {
  className?: string;
}

const GameField: React.FC<IGameField> = ({className}) => {
  // const gameProcess = [];
  return (
    <div className={cx(className, styles.game)}>
      {/*{gameProcess.map(it => {*/}
      {/*  return 0*/}
      {/*})}*/}
    </div>
  );
};

export default GameField;