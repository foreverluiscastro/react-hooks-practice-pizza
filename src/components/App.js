import React, { useEffect , useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [id , setId] = useState("")
  const [topping, setTopping] = useState("")
  const [size, setSize] = useState("")
  const [vegetarian, setVegetarian] = useState("")

  const API = 'http://localhost:3001/pizzas'

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(pizzas => setPizzas(pizzas))
  }, []);

  function handleEditPizza(pizza) {
    setTopping(pizza.topping)
    setSize(pizza.size)
    setVegetarian(pizza.vegetarian)
    setId(pizza.id)
  }

  function submitEditedPizza(e) {
    e.preventDefault()
    // debugger
    console.log(e.target)

    const updatedPizza = {
      id: id,
      topping: e.target[0].value,
      size: e.target[1].value,
      vegetarian: e.target[2].value
    }
    // debugger
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedPizza)
    }
    fetch(API + `/${id}`, configObj)
    .then((r) => r.json())
    .then((patchedPizza) => {
      const updatedList = pizzas.filter((pizza) => pizza.id != patchedPizza.id)
      updatedList.push(patchedPizza)
      const santizedArray = updatedList.sort((prevObj, currentObj) => {
        return prevObj.id - currentObj.id
      })
      setPizzas(santizedArray)
      setId("")
      setTopping("")
      setSize("")
      setVegetarian("")
    })
    
  }

  return (
    <>
      <Header />
      <PizzaForm onSubmitPizza={submitEditedPizza} topping={topping} setTopping={setTopping} size={size} setSize={setSize} vegetarian={vegetarian}/>
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPizza}/>
    </>
  );
}

export default App;
