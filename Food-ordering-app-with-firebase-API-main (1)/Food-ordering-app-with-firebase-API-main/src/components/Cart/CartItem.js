import React from 'react';
import styles from './CartItem.module.css';

function CartItem(props){
    const price=`Rs${props.price.toFixed(2)}`;
    
    return(
        <li className={styles.items}>
        <div className={styles.head}>
        <h3>{props.name}</h3>
        <div className={styles.quantity}>
        <span className={styles.price}>{price}</span>
        <span className={styles.amount}>x {props.amount}</span>
        </div>
        </div>
        <div className={styles.actions}>
        <button className={styles.remove} onClick={props.onRemove}>-</button>
        <button className={styles.add} onClick={props.onAdd}>+</button>
        </div>
        </li>

    );
}

export default CartItem;