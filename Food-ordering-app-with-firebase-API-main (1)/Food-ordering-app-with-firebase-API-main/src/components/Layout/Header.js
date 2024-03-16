import React from 'react';
import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';


function Header(props){
    return(
        <>
        <header className={styles.header}>
        <h2>React Meals</h2>
        <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={styles['main-img']}>
        <img  src={mealsImage} alt="Food-image"></img>
        </div>
        </>
    );
}

export default Header;