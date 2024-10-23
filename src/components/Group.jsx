import style from "./css/Group.module.css";
import PropTypes from "prop-types";
import {
  Add,
  Menu,
  Todo,
  Done,
  Backlog,
  InProgress,
  NoPriority,
  LowPriority,
  MedPriority,
  HighPriority,
  UrgentPriority,
  UrgentPriorityGrey,
  Cancel,
} from "./Images";
import Card from "./Card";
import React from "react";
const colordCodes = {
  A: "#FF5733",
  B: "#33FF57",
  C: "#3357FF",
  D: "#FFFF33",
  E: "#FF33FF",
  F: "#33FFFF",
  G: "#FF8C00",
  H: "#8A2BE2",
  I: "#FF1493",
  J: "#00FF7F",
  K: "#FFD700",
  L: "#7FFF00",
  M: "#FF4500",
  N: "#FF69B4",
  O: "#6A5ACD",
  P: "#32CD32",
  Q: "#FFB6C1",
  R: "#A52A2A",
  S: "#40E0D0",
  T: "#4682B4",
  U: "#D2691E",
  V: "#BA55D3",
  W: "#B22222",
  X: "#FF6347",
  Y: "#FFDAB9",
  Z: "#20B2AA",
};

function Group({ data, title, groupBy, users }) {
  const getUser = (id) => {
    const name = users[id].name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase());
    return (
      <div
        className={`${style.userIcon} ${
          users[id].available ? style.available : null
        }`}
      >
        <div style={{ backgroundColor: colordCodes[name.at(0)] }}>
          <span>{name}</span>
        </div>
      </div>
    );
  };
  const getIcon = (type) => {
    switch (type) {
      case "todo":
        return <Todo />;
      case "in progress":
        return <InProgress />;
      case "backlog":
        return <Backlog />;
      case "done":
        return <Done />;
      case "cancelled":
        return <Cancel />;
      case "0":
        return <NoPriority />;
      case "1":
        return <LowPriority />;
      case "2":
        return <MedPriority />;
      case "3":
        return <HighPriority />;
      case "4":
        return <UrgentPriority />;
      default:
        return getUser(type);
    }
  };
  const getTitle = (type) => {
    switch (type) {
      case "0":
        return "No priority";
      case "1":
        return "Low";
      case "2":
        return "Medium";
      case "3":
        return "High";
      case "4":
        return "Urgent";
      default:
        return type;
    }
  };
  return (
    <div className={style.group}>
      <header className={style.header}>
        <div>
          <div className={style.icon}>{getIcon(title.toLowerCase())}</div>
          <div className={style.title}>
            <span>
              {title.includes("usr") ? users[title]["name"] : getTitle(title)}
            </span>
          </div>
          <div className={style.count}>
            <span>{data.length}</span>
          </div>
        </div>
        <div>
          <div className={style.add}>
            <Add />
          </div>
          <div className={style.menu}>
            <Menu />
          </div>
        </div>
      </header>
      {data.map((card, idx) => {
        return (
          <Card
            key={idx}
            card={card}
            groupBy={groupBy}
            getIcon={getIcon}
            getUser={getUser}
          />
        );
      })}
    </div>
  );
}
Group.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  groupBy: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};
export default Group;
