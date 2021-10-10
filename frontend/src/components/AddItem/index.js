import React, { useState } from "react";
import "./style.css";
import PropTypes from "prop-types";

function AddItem({ onAddItem }) {
  const [todoItem, setTodoItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = () => {
    if (todoItem.length === 0) {
      setErrorMessage("Cannot add todo item without text.");
      return;
    }

    if (onAddItem) {
      onAddItem(todoItem);
    }

    setTodoItem("");
    setErrorMessage("");
  };

  return (
    <div className="add-todo">
      <div className="add-todo-row">
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={todoItem}
            onChange={e => setTodoItem(e.target.value.toString())}
          />
        </div>
        <div>
          <button type="button" onClick={handleButtonClick}>
            Add Todo
          </button>
        </div>
      </div>

      {errorMessage.length > 0 ? (
        <p className="error-message"> {errorMessage} </p>
      ) : (
        ""
      )}
    </div>
  );
}

AddItem.propTypes = {
  onAddItem: PropTypes.func.isRequired
};

export default AddItem;
