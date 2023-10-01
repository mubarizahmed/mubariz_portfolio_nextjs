import React, { useState, useRef } from "react";
import styles from "@/styles/collapsible.module.css";

const Collapsible = (props) => {
  const [open, setOPen] = useState(false);
  const toggleRef = useRef();

  const toggle = () => {
    setOPen(!open);
  };

  return (
    <div className={styles.collapsible} onClick={toggle}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2>{props.label1}</h2>
          <h3>{props.label2}</h3>
          <h3>{props.label3}</h3>
        </div>
        <div className ={styles.headerImage}>
          <img
            src={props.imageUrl}
            alt={props.imageAlt}
          />
        </div>
      </div>
      <div
        className={styles.toggle}
        ref={toggleRef}
        style={
          open
            ? {
                height: toggleRef.current.scrollHeight + "px",
              }
            : {
                height: "0px",
              }
        }
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
