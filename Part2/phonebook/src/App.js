import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterName, setFilterName] = useState(false);

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
        filter shown with: <input onChange={handleNewNameFilterChange} />
      </div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNewNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNewNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers:</h3>
      {filterName ? (
        <ul>
          {filteredPersons.map((person) => (
            <Person key={person.id} person={person}></Person>
          ))}
        </ul>
      ) : (
        <ul>
          {persons.map((person) => (
            <Person key={person.id} person={person}></Person>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
