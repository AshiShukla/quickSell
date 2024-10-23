import { Display } from "./Images";
import style from "./css/Header.module.css";
import { useEffect, useState, React } from "react";
import CustomSelect from "./CustomSelect";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const groupingOptions = [
  { label: "Status", value: "status" },
  { label: "User", value: "userId" },
  { label: "Priority", value: "priority" },
];
const orderingOptions = [
  { label: "User", value: "userId" },
  { label: "Priority", value: "priority" },
];
function Header() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [selected, setSelected] = useState(() => {
    const sort = orderingOptions.findIndex(
      (item) => item.value == searchParams.get("sort")
    );
    const group = groupingOptions.findIndex(
      (item) => item.value === params.group
    );
    return {
      Grouping: group >= 0 ? group : 0,
      Ordering: sort >= 0 ? sort : 0,
      Display: 0,
    };
  });
  const handleSelect = (type, idx) => {
    setSelected((prev) => ({ ...prev, [type]: idx }));
  };

  useEffect(() => {
    navigate(
      `/${groupingOptions[selected["Grouping"]]["value"]}?sort=${
        orderingOptions[selected["Ordering"]]["value"]
      }`
    );
  }, [selected]);

  const displayOptions = [
    {
      label: "Grouping",
      select: (
        <CustomSelect
          label="Grouping"
          options={groupingOptions}
          type="text"
          selected={selected}
          handleSelect={handleSelect}
        />
      ),
    },
    {
      label: "Ordering",
      select: (
        <CustomSelect
          label="Ordering"
          options={orderingOptions}
          type="text"
          selected={selected}
          handleSelect={handleSelect}
        />
      ),
    },
  ];
  return (
    <header className={style.header}>
      <div className={style.menu}>
        <ul className={style.items}>
          <li className={style.item}>
            <div>
              <CustomSelect
                Icon={Display}
                label="Display"
                options={displayOptions}
                type="select"
                selected={selected}
                handleSelect={handleSelect}
              />
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;
