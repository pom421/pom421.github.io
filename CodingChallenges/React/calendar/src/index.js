import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "./moment-fr.js";

const getFirstDay = () => {
  // dernier lundi précédent le 1er du mois courant
  const lastMonday = moment()
    .startOf("month")
    .startOf("isoWeek");

  //.format("dddd, MMMM Do YYYY, h:mm:ss a")
  return lastMonday;
};

const getLastDay = () => {
  return moment().endOf("month");
};

const Day = props => {
  return (
    <div style={{ border: "1px solid lightgrey", width: 50 }}>
      {props.children}
    </div>
  );
};

const getWeekComponents = day => {
  return Array(7)
    .fill("")
    .map((_, i) => {
      return <Day key={i}>{day.add(1, "d").format("D")}</Day>;
    });
};

export default class App extends React.Component {
  render() {
    const DAYS = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    let currentDay = getFirstDay();
    const lastDay = getLastDay();

    const rows = [];
    while (currentDay.isBefore(lastDay)) {
      rows.push(getWeekComponents(currentDay));
    }

    return (
      <div>
        <h1>{moment().format("MMMM")}</h1>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", direction: "row" }}>
            {DAYS.map((day, index) => (
              <Day key={index}>{day}</Day>
            ))}
          </div>
          {rows.map((row, index) => (
            <div key={index} style={{ display: "flex", direction: "row" }}>
              {row}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
