import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import "./index";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filterName, setFilterName] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);

  //Use Effect Hook: Will run after component APP is rendered and it will only run when persons is empty array
  const getPersonsData = () => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const duplicatePerson = checkDuplicatePersonName();

    //Check if person name already exists before update state variable persons
    if (!duplicatePerson) {
      personsService.create(newPerson).then((newAddedPerson) => {
        setPersons(persons.concat(newAddedPerson));
        setNewName("");
        setNewNumber("");
        //TODO: Add notification
        setNotificationMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 3000);
      });
    } else {
      if (
        window.confirm(
          `${duplicatePerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(duplicatePerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicatePerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            //TODO: Add notification
            setNotificationMessage(`Updated ${newPerson.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 3000);
          });
      }
    }
  };

  const checkDuplicatePersonName = () => {
    const duplicatePerson = persons.find((person) => person.name === newName);

    return duplicatePerson;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new Person:</h3>
      <Notification message={notificationMessage}></Notification>
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
        service={personsService}
        handleDeletePerson={setPersons}
      ></Persons>
    </div>
  );
};

export default App;
