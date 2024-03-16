import React, { useEffect,useState } from "react";
import styles from "./AvailableMeal.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeal() {
  const [dummyMeals,setDummyMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

     
        const response = await fetch(
        "https://react-http-13e7c-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setDummyMeals(loadedMeals);
      setIsLoading(false);
      
    }
       fetchMeals().catch((error)=>{
         setIsLoading(false);
         setError(error.message);
       },[]);
      
  }, []);
  const meals = dummyMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles["meal-item"]}>
      <Card>
        {!isLoading && meals.length>0 && <ul>{meals}</ul>}
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.loading}>{error}</p>}
      </Card>
    </section>
  );
}

export default AvailableMeal;
