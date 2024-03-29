import React from 'react'

export default function Die(props){
    const className = (props.isHeld) ? "held die--box" : "die--box";

    return(
        <div className={className} onClick={props.hold}>
            {props.value}
        </div>
    )
}