import React,{useState,useRef} from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const itemId = "amount_" + props.id;
  const[amountIsValid,setAmountIsValid]=useState(true);

  let amountInputRef=useRef();

  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredAmount=amountInputRef.current.value;
    const enteredAmountNumber=+enteredAmount;

    if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);


  };

 

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        id={itemId}
        type="number"
        min="1"
        max="5"
        step="1"
        defaultValue="1"
       
      ></Input>
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
}

export default MealItemForm;
