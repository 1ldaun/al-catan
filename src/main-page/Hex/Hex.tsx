import React from "react";
import styles from "./hex.module.scss";
import { hexType } from "../../data/hexType";
import Number from "./Number/Number";

const Hex: React.FC<{ type: string; id: number; number: number }> = ({
  type,
  id,
  number,
}) => {
  return (
    <div
      className={styles.hex}
      style={{
        backgroundImage: "url(" + hexType[type as keyof typeof hexType] + ")",
        gridArea: "hex" + id,
        marginTop:
          id >= 0 && id <=2 ? 48 :
          id >= 3 && id <=6 ? 24 :
          id>=12 && id <=15 ? -24 :
          id>=16 && id<=18 ? -48 : 0
      }}
    >
      {type !== "desert" ? <Number number={number} /> : <div></div>}
    </div>
  );
};

export default Hex;
