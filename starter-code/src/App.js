import React, { Component } from "react";
import "bulma/css/bulma.css";
import "./App.css";
import FoodBox from "./components/FoodBox";
import foods from "./foods.json";
import Search from "./components/Search";
import AddFood from "./components/AddFood";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: foods,
      addForm: false,
      searchState: "",
      total: 0,
      qtdArray: [],
    };

    this.showAddForm = this.showAddForm.bind(this);
    this.addNewFood = this.addNewFood.bind(this);
    this.searchForm = this.searchForm.bind(this);
    this.sumTotal = this.sumTotal.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
  }

  showAddForm() {
    this.setState({
      addForm: !this.state.addForm,
    });
  }

  addNewFood(foods) {
    const { food } = this.state;

    const newFood = [...food];
    newFood.unshift(foods);

    this.setState({
      food: newFood,
    });
  }

  searchForm(search) {
    this.setState({
      searchState: search.toLowerCase(),
    });
  }

  sumTotal(foods, quantity) {
    const { name, calories } = foods;
    console.log(calories);

    let foodArr = [...this.state.qtdArray];
    let caloriesTotal = calories * quantity;

    let foodObj = {
      name: name,
      quantity: quantity,
      calories: caloriesTotal,
    };

    if (foodArr.every((item) => item.name !== name)) {
      foodArr.push(foodObj);
      this.setState({
        total: this.state.total + calories * quantity,
        qtdArray: foodArr,
      });
    } else {
      let foodUpdate = foodArr.find((item) => item.name === name);

      foodArr[foodArr.indexOf(foodUpdate)].quantity += quantity;
      foodArr[foodArr.indexOf(foodUpdate)].calories += caloriesTotal;
      this.setState({
        total: this.state.total + calories * quantity,
        qtdArray: foodArr,
      });
    }
  }

  deleteFood(idx) {
    let foodArr = [...this.state.qtdArray];
    let calories = foodArr[idx].calories;

    foodArr.splice(idx, 1);

    this.setState({
      total: this.state.total - calories,
      qtdArray: foodArr,
    });
  }

  render() {
    const { food, searchState, total, qtdArray } = this.state;

    return (
      <div className="App">
        <button onClick={this.showAddForm}>ADD NEW FOOD</button>
        {this.state.addForm ? (
          <div>
            <br />
            <AddFood
              addNewFood={this.addNewFood}
              showAddForm={this.showAddForm}
            />
          </div>
        ) : (
          <br />
        )}
        <hr />
        <p>Today's Foods</p>
        <ul>
          {qtdArray.map((item, idx) => {
            return (
              <li key={idx}>
                {item.quantity} {item.name} = {item.calories} cal{" "}
                <button
                  className="button is-small is-danger"
                  onClick={() => this.deleteFood(idx)}
                >
                  DELETE
                </button>{" "}
              </li>
            );
          })}
        </ul>
        <p>Total Calories: {total}</p>
        <hr />
        <Search searchForm={this.searchForm} />
        {food
          .filter((item) => item.name.toLowerCase().includes(searchState))
          .map((foods, idx) => {
            return (
              <FoodBox
                key={idx}
                name={foods.name}
                calories={foods.calories}
                image={foods.image}
                sumCalories={this.sumTotal}
                foodObj={foods}
              />
            );
          })}
      </div>
    );
  }
}

export default App;
