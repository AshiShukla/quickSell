import style from "./css/Board.module.css";
import Group from "./Group";
import { useEffect, useState, React } from "react";
import { useParams, useSearchParams } from "react-router-dom";
const API = "https://api.quicksell.co/v1/internal/frontend-assignment";
const groupingOptions = ["status", "userId", "priority"];
const orderingOptions = ["userId", "priority"];
function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  let groupBy = params.group;
  let sortBy = searchParams.get("sort");
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (
          !groupingOptions.includes(groupBy) ||
          !orderingOptions.includes(sortBy)
        )
          throw new Error("Invalid group or sort");
        const data = await fetch(API);
        const res = await data.json();

        const groups = res.tickets.reduce((group, item) => {
          if (!group["" + item[groupBy]]) group["" + item[groupBy]] = [];
          group["" + item[groupBy]].push(item);
          return group;
        }, {});

        Object.entries(groups).forEach(([key, item]) => {
          if (sortBy === "priority")
            item.sort((a, b) => {
              return b.priority - a.priority;
            });
          else if (sortBy === "title")
            item.sort((a, b) => a.title.localeCompare(b.title));
          groups[key] = item;
        });
        const users = res.users.reduce((user, item) => {
          user[item.id] = item;
          return user;
        }, {});
        setTickets(() => {
          return { groups: groups, users: users };
        });
        setLoading(() => false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTickets();
  }, [groupBy, sortBy]);
  return (
    <section className={style.board}>
      {!loading ? (
        Object.entries(tickets.groups).map(([key, val], idx) => (
          <Group
            data={val}
            title={key}
            groupBy={groupBy}
            users={tickets.users}
            key={idx}
          />
        ))
      ) : (
        <div className={style.loading}>
          <span className={style.loader}></span>
        </div>
      )}
    </section>
  );
}

export default Board;
