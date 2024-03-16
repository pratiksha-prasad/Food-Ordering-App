import React, { useContext ,useState} from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
 
  const ctx = useContext(CartContext);
  const [isOrdering,setIsOrdering]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler=(item)=>{
    ctx.addItem({...item,amount:1});

  };

  const cartItemRemoveHandler=(id)=>{
    ctx.removeItem(id);


  };

  const onOrderHandler=()=>{
    setIsOrdering(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          id={item.id}
          onAdd={cartItemAddHandler.bind(null,item)}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
        />
      ))}
    </ul>
  );
  const totalAmount = `Rs${ctx.totalAmount}`;

  const submitOrderHandler=async (userData)=>{
    setIsSubmitting(true);
    const response=await fetch('https://react-http-13e7c-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:ctx.items
      }),
      headers:{
        'Content-Type':'application/json'
      }
    });
    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const cartModalContent = (
    <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdering && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      <div className={classes.actions}>
      
       {!isOrdering && <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>}
        {hasItems && !isOrdering && (
          <button className={classes.button} onClick={onOrderHandler}>
            Order
          </button>
        )}
      </div>
      
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );


  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && <p>Sending order data...</p>}
     {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
