import React from "react";

function PersonForm(props) {
  return (
    <div>
      {" "}
      <form onSubmit={props.submitEvent}>
        <div>
          name: <input onChange={props.changeNameEvent} value={props.name} />
        </div>
        <div>
          number:{" "}
          <input onChange={props.changeNumberEvent} value={props.number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
