import React, { useRef,useState} from "react";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const isEmpty = (value) => value.trim().length === 0;
  const isSixChars = (value) => value.trim().length === 6;
  const [formValidityState, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = isSixChars(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        nams:enteredName,
        street:enteredStreet,
        postal:enteredPostal,
        city:enteredCity
    });
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={`${styles.control} ${!formValidityState.name ? styles.invalid : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
      </div>
      {!formValidityState.name && <p className={styles.error}>Name must not be empty</p>}

      <div className={`${styles.control} ${!formValidityState.street ? styles.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
      </div>
      {!formValidityState.street && <p className={styles.error}>Street name must not be empty</p>}
      
      <div className={`${styles.control} ${!formValidityState.postal ? styles.invalid : ''}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
      </div>
      {!formValidityState.postal && <p className={styles.error}>Postal code must be 6 chars long.</p>}
      
      <div className={`${styles.control} ${!formValidityState.city ? styles.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
      </div>
      {!formValidityState.city && <p className={styles.error}>City must not be empty</p>}
      
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm Order</button>
      </div>
    </form>
  );
};

export default Checkout;
