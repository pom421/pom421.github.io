import React from 'react';

const classNames = (obj) => {
  const res = Object.keys(obj)
    .filter(k => !!obj[k])
    .join(" ")

  console.log("res", res);
  return res
}

function Bullet(props) {

  console.log("render bullet")

  const classes = classNames({
    dot: true,
    selected: props.id === props.selected,
    pause: props.id === props.selected && props.pause
  })

  return (
    <span className={classes} onClick={props.onClick} />
  )
}

export default Bullet;
