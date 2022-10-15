import React from "react";
import styles from "./number.module.scss";

const Number: React.FC<{ number: number }> = ({ number }) => {
  return <div className={styles.number}>{number}</div>;
};

export default Number;
