import React from "react";

export default props => {
  let { temp, tempMin, tempMax } = props;

  temp = Math.round(temp * 2) / 2;
  tempMin = Math.round(tempMin * 2) / 2;
  tempMax = Math.round(tempMax * 2) / 2;

  return (
    <div>
      <div
        style={{
          float: "left",
          border: "1px solid lightgray",
          marginRight: "5px",
          textAlign: "center",
          width: "150px"
        }}
      >
        <p style={{ backgroundColor: "yellow", margin: 0, padding: "5px 0" }}>
          {new Date(props.date).toLocaleDateString("en-en", {
            weekday: "short"
          })}
        </p>
        <p>{temp}</p>
        <img
          title={props.description}
          alt="weather"
          width="50px"
          height="50px"
          src={`https://openweathermap.org/img/w/${props.icon}.png`}
        />
        <p>
          {tempMin} / {tempMax}
        </p>
      </div>
      <div style={{ float: "left" }} />
    </div>
  );
};
