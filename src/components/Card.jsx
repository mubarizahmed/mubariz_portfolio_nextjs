import React from "react";
import { IconContext } from "react-icons";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import  Link  from 'next/link';
import { motion } from 'framer-motion';
import styles from "@/styles/card.module.css";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={props?.cover} alt={props?.title} />

        <div className={styles.tags}>
          {props?.details?.map((item) => (
            <div key={item} className={styles.tag}>{item}</div>
          ))}
        </div>

      </div>
      <div className={styles.preview}>
        <div className={styles.title}>
          <h3>{props?.title}</h3>
          <IconContext.Provider value={{ className: styles.icon }}>
            <Link
              href={`/projects/${encodeURIComponent(props?.id)}`}>
              <IoArrowForwardCircleOutline className={styles.icon}  size="1.8em" />
            </Link>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Card;
