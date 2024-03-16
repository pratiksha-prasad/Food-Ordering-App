import React,{useContext} from 'react';
import styles from './MealItem.module.css';
import MealItemForm from '../MealItem/MealItemForm'
import CartContext from '../../../store/cart-context';


function MealItem(props){
    const ctx=useContext(CartContext);
    const addToCartHandler=(amount)=>{
        ctx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price

        });
        
    };

    const price=`Rs ${props.price.toFixed(2)}`;
    return(
        <li className={styles.meal}>
        <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
        </div>
        <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id}></MealItemForm>
        </div>
        </li>

    );
}

export default MealItem;