import { useState, useEffect } from "react";
import { formatDateFromTimestamp } from "../utilities/utilities";
import styles from "../style/chat.module.css";

const Chat = ({ socket1, socket2, username, room, sock, setSock }) => {
  const [messageRecieved, setMessageReceived] = useState([]);
  const [message, setMessage] = useState("");
  const header =
    sock === "two" ? "**** POINT_OH v.128 ****" : "**** PIETHO v.64 ****";
  // Called on socket event from server
  useEffect(() => {
    socket1.on("from_server", (data) => {
      console.log("+++++++++received data", data);
      const aMessage = data.message
        .replaceAll("[32;1m", "")
        .replaceAll("3m", "") // regex instead any 0-3 followed by m or ; or 2
        .replaceAll("[1m", "")
        .replaceAll("[0m", "")
        .replaceAll("[1;", "");
      const bMessage = aMessage.split(/(?=\n)/g);
      setMessageReceived(bMessage);
    });
  }, [socket1]);

  useEffect(() => {
    socket2.on("from_server", (data) => {
      console.log("+++++++++received data", data);
      const aMessage = data.message
        .replaceAll("[32;1m", "")
        .replaceAll("3m", "")
        .replaceAll("[1m", "")
        .replaceAll("[0m", "")
        .replaceAll("[1;", "");
      const bMessage = aMessage.split(/(?=\n)/g);
      setMessageReceived(bMessage);
    });
  }, [socket2]);

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (sock === "one") {
        sendMessageOne();
      } else if (sock === "two") {
        sendMessageTwo();
      }
    }
  };

  const sendMessageOne = () => {
    console.log("send message one fired");
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket1.emit("from_client", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  const sendMessageTwo = () => {
    console.log("send message two fired");
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket2.emit("from_client", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <div className={styles.chatMainContainer}>
      <div className={styles.chatgridColumn}>
        <div className={styles.termPaneTop}>
          <div className={styles.chatHeaderWrappeer}>
            <h2 className={styles.chatTermText}>{`${header}`}</h2>
          </div>
          {messageRecieved.map((item, index) => (
            <div className={styles.chatReturnText} key={index}>
              <p>{item.substring(0, 600) + ""}</p>
            </div>
          ))}
        </div>
        <div className={styles.termPaneBottom}>
          <textarea
            rows="1"
            columns="26"
            placeholder="Message..."
            onKeyDown={onEnterPress}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageInput}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Chat;
