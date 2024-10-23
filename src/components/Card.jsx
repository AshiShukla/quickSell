import style from "./css/Card.module.css";
import PropTypes from "prop-types";
import { HighPriority } from "./Images";
import React from "react";
function Card({ card, groupBy, getIcon, getUser }) {
  return (
    <div className={style.card}>
      <div className={style.details}>
        <div className={style.cardid}>
          <span>{card.id}</span>
        </div>
        <div className={style.title}>
          {groupBy !== "status" ? (
            <div>{getIcon(card.status.toLowerCase())}</div>
          ) : null}

          <div>
            <h2>{card.title}</h2>
          </div>
        </div>
        <div className={style.tags}>
          {groupBy !== "priority" ? (
            <div>
              <HighPriority className={style.svg} />
            </div>
          ) : null}
          {card.tag.map((tag, idx) => {
            return (
              <div className={style.fearure} key={idx}>
                <span>{tag}</span>
              </div>
            );
          })}
        </div>
      </div>
      {groupBy !== "userId" ? getUser(card.userId) : null}
    </div>
  );
}
Card.propTypes = {
  card: PropTypes.object.isRequired,
  groupBy: PropTypes.string.isRequired,
  getIcon: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};
export default Card;
