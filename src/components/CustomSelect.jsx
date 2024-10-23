import { useState, useRef, useEffect, React } from "react";
import PropTypes from "prop-types";
import Dropdown from "../assets/down.svg?react";
import style from "./css/CustomSelect.module.css";
function CustomSelect({
  Icon = null,
  label,
  options,
  type,
  selected,
  handleSelect,
}) {
  const [active, setActive] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (!button.current.contains(e.target)) setActive(() => false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const current = selected[label];
  return (
    <div
      className={`${style.select} ${active ? style.active : null}`}
      ref={button}
    >
      <div
        className={style.button}
        onClick={() => {
          setActive(() => !active);
        }}
      >
        <div className={style.button_label}>
          {Icon ? (
            <div className={style.icon}>
              <Icon className={style.svg} />
            </div>
          ) : null}
          <div>
            <span>{type === "text" ? options[current]["value"] : label}</span>
          </div>
        </div>
        <div>
          <Dropdown className={style.svg} />
        </div>
      </div>
      <div className={`${style.options} ${active ? style.active : null}`}>
        <ul>
          {options.map((item, idx) => {
            return (
              <li
                className={`${style.option} ${
                  type === "text" && idx === current ? style.active : null
                }`}
                key={idx}
                onClick={() => {
                  setActive(() => {
                    return type == "text" ? false : true;
                  });
                  handleSelect(label, idx);
                }}
              >
                {type === "select" ? (
                  <>
                    <div className={style.option_label}>
                      <span>{item.label}</span>
                    </div>
                    <div>{item.select}</div>{" "}
                  </>
                ) : type === "text" ? (
                  <div className={style.option_label}>
                    <span>{item.label}</span>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
CustomSelect.propTypes = {
  Icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
export default CustomSelect;
