import React from "react";
import Person from "./Person";

const Persons = (props) => {
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
            <Person key={person.id} person={person}></Person>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Persons;
