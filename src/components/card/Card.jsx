import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./card.css";

const Card = (props) => {


  return (
    <div className="card">
      <div className="card-img-wrap">
        <img className="card-img" src={props.cover} alt={props.title} />

        <div className="card-tags">
          {props.details.map((item) => (
            <div key={item} className="card-tag">{item}</div>
          ))}
        </div>

      </div>
      <div className="card-preview">
        <div className="card-title">
          <h3>{props.title}</h3>
          <IconContext.Provider value={{ className: 'card-icon' }}>
            <Link
              to={`/projectDetails/${props.id}`}>
              <IoArrowForwardCircleOutline className='card-icon'  size="1.8em" />
            </Link>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Card;
