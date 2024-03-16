import React,{useContext,useState,useEffect} from 'react';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props){
    const ctx = useContext(CartContext);
    const [btnHighlight,setBtnHighlight]=useState(false);

    const numItems=ctx.items.reduce((currNumber,item)=>{
        return currNumber+item.amount;
    },0);

    const btnClass=`${styles['header-button']} ${btnHighlight ? styles.bump : ''}`;

    useEffect(()=>{
        if(ctx.items.length===0){
            return;
        }
        setBtnHighlight(true);

        const timer=setTimeout(()=>{
            setBtnHighlight(false);

        },300);

        return ()=>{
            clearTimeout(timer);

        };

    },[ctx.items]);


    return(
        <>
        <button className={btnClass} onClick={props.onClick}>
         <span>🛒 </span> 
         <span>Your Cart</span>
         <span className={styles.badge}>{numItems}</span>
         </button>
        </>

    );
}

export default HeaderCartButton;