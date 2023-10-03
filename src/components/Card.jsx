import React from "react";
import { IconContext } from "react-icons";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from 'next/link';
import { motion } from 'framer-motion';

import styles from "@/styles/card.module.css";

const Card = (props) => {
  return (
    <motion.div  key={props.title} className={styles.card}
    animate='visible'
    exit={{opacity: 0}}
    initial='hidden'
    variants = {{
      visible: {
        opacity: 1,
        transition: {
          delay: 0.5,
        },
      },
      hidden: {x:0, y:0, opacity: 0 },
    }}
    >
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
              <IoArrowForwardCircleOutline className={styles.icon} size="1.8em" />
            </Link>
          </IconContext.Provider>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
