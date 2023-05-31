import React from "react";
import styles from "../style/home.module.css";
import brainy from "../images/brainy.gif";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Link to="/select">
        <img src={brainy} alt="brain" />
      </Link>
    </div>
  );
};

export default Home;
