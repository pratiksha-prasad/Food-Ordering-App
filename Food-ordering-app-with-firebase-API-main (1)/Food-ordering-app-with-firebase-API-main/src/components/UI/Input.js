import React from 'react';
import styles from './Input.module.css';

const Input=React.forwardRef((props,ref)=> {
    return(
        <div className={styles.input}>
        <label htmlFor={props.id}>{props.label}</label>
        <input ref={ref} type={props.type} id={props.id} min={props.min} max={props.max} step={props.step} defaultValue={props.defaultValue}></input>
        </div>

    );
});

export default Input;