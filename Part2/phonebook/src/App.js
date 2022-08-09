import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterName, setFilterName] = useState(false);

  //Use Effect Hook: Will run after component APP is rendered and it will only run when persons is empty array
  const getPersonsData = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("GET PERSONS DATA: ", response.data);
      setPersons(response.data);
    });
  };
  useEffect(getPersonsData, []);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewNameFilterChange = (event) => {
    const newFilter = event.target.value;

    if (newFilter !== "") {
      setFilterName(true);
      const filteredPersons = persons.filter((person) =>
        person.name.includes(newFilter)
      );
      setFilteredPersons(filteredPersons);
    } else {
      setFilterName(false);
      setFilteredPersons([]);
    }
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    //Check if person name already exists before update state variable persons
    if (checkDuplicatePersonName() === false) {
      //Update State variables
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const checkDuplicatePersonName = () => {
    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson) {
      alert(`${newName} is already added to phonebook`);
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new Person:</h3>
      <div>
        <Filter onChangeEvent={handleNewNameFilterChange}></Filter>
      </div>
      <div>
        <PersonForm
          submitEvent={addNewPerson}
          changeNameEvent={handleNewNameChange}
          changeNumberEvent={handleNewNumberChange}
          name={newName}
          number={newNumber}
        ></PersonForm>
      </div>

      <h3>Numbers:</h3>
      <Persons
        filter={filterName}
        persons={persons}
        filteredPersons={filteredPersons}
      ></Persons>
    </div>
  );
};

export default App;
