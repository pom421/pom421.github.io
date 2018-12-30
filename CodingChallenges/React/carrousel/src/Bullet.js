import React from 'react';

// utility to join class name with an object as parameter
const classNames = (obj) => {
  const res = Object.keys(obj)
    .filter(k => !!obj[k])
    .join(" ")

  return res
}

function Bullet(props) {

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
