import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName };

    //Check if person name already exists before update state variable persons
    if (checkDuplicatePersonName() === false) {
      //Update State variables
      setPersons(persons.concat(personObject));
      setNewName("");
    }
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
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNewNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name}></Person>
        ))}
      </ul>
    </div>
  );
};

export default App;
