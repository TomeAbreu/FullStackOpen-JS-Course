import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const deletePersonEvent = (personId) => {
    const personToDelete = props.persons.find(
      (person) => person.id === personId
    );
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      props.service.deletePerson(personId).then((response) => {
        props.handleDeletePerson(
          props.persons.filter((person) => person.id !== personId)
        );
      });
    }
  };
  return (
    <div>
      {" "}
      {props.filter ? (
        <ul>
          {props.filteredPersons.map((person) => (
            <Person key={person.id} person={person}></Person>
          ))}
        </ul>
      ) : (
        <ul>
          {props.persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              deletePerson={() => deletePersonEvent(person.id)}
            ></Person>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Persons;
