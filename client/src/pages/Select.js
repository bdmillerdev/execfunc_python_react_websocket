import React from "react";
import styles from "../style/select.module.css";
import { useNavigate } from "react-router-dom";

const Select = ({ socket1, socket2, sock, setSock, header, setHeader }) => {
  const navigate = useNavigate();

  const one = () => {
    setSock("one");
    //setHeader("**** PIETHO v.64 ****");
    socket1.emit("join_room", { username: "testUser", room: "roomOne" });
    navigate("/chat");
  };

  const two = () => {
    setSock("two");
    //setHeader("**** POINT_OH v.128 ****");
    socket2.emit("join_room", { username: "testUser", room: "roomTwo" });
    navigate("/chat");
  };

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectGridColumn}>
        <div className={styles.selectHeaderContainer}>
          <p className={styles.selectHeaderGraph}>
            Executive Functions: Large Language Model (LLM) agent superpositions
            with purpose.
          </p>
        </div>
        <div>
          {/* START SELECTORS */}
          <div className={styles.selectGridRow}>
            <button className={styles.chatSelectButton} onClick={one}>
              Peitho
            </button>
            <p className={styles.selectTopGraph}>
              Web-search enabled AI assistant tuned to aid composition
              <sup>1</sup> and help refine search objectives through casual
              discourse.
              <sup>2</sup>
            </p>
          </div>
          <div className={styles.selectGridRow}>
            <div>
              <button className={styles.chatSelectButton} onClick={two}>
                Pointoh
              </button>
            </div>
            <p className={styles.selectMidGraph}>
              The second iteration of the Peitho AI agent type, with chain of
              thought prompting (explicit in demo) for goal-oriented
              hill-climbing.
            </p>
          </div>
          <div className={styles.selectGridRow}>
            <button className={styles.chatSelectButton}>memSyn</button>
            <p className={styles.selectLowGraph}>
              This agent implements a multi-tiered memory architecture to
              broaden the scope of referential context while engaged in
              goal-oriented discourse.
            </p>
          </div>
        </div>
        {/* END SELECTORS */}
        <div className={styles.selectMainText}>
          <p>
            These agents were developed for research and eductional purposes
            from December 2022 through February 2023 on a{" "}
            <a
              className={styles.selectLink}
              href="https://github.com/hwchase17/langchain "
            >
              Langhain
            </a>{" "}
            fork, using OpenAI LLMs as their engine under
            <a href="https://openai.com/policies/terms-of-use">
              limited license
            </a>
            .
          </p>
          <p>
            Current focus: training models for specialization via training
            dataset selection and hyperparameter tuning. In concert with
            superpositioned Executive Functions, the learned models will be well
            suited for particular use cases.
          </p>
          <p>
            Base LLMs utiilized for this purpose include{" "}
            <a href="https://huggingface.co/docs/transformers/model_doc/bloom">
              Bloom
            </a>{" "}
            and Flan.
          </p>
          <p>
            If you have an agent or mod you would like hosted, or if you would
            like information about these agents,{" "}
            <a href="mailto:yd@findandexec.com">make contact</a>.
          </p>
        </div>
        <div className={styles.selectNoteBox}>
          <p className={styles.selectFootnote}>
            1. See, e.g., ROSS, S., MARTINEZ, F., HOUDE, S., MULLER, M., WEISZ,
            J., 2023, The Programmer’s Assistant: Conversational Interaction
            with a Large Language Model for Software Development, I.U.I. ’23,
            Sydney, AUS, ACM, New York, NY, USA, p. 24.
          </p>
          <p className={styles.selectFootnote}>
            2. See PARK, J.S., O’BRIEN, C.J., CAI, C., MORRIS, M. , LIANG, P.S.
            BERNSTEIN, M.S., 2023 Generative Agents: Interactive Simulacra of
            Human Behavior, ACM, New York, NY, USA, 22, at p. 4.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Select;
