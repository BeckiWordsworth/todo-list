import React from "react";
import "./style.css";
import PropTypes from "prop-types";

const TodoItem = ({ item, onToggleDone, onDelete }) => {
  const handleCheckbox = () => {
    if (onToggleDone) {
      onToggleDone(item._id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item._id);
    }
  };

  console.log(item);
  const textClass = item.isDone ? "done" : "";

  return (
    <div className="todo-item">
      <div>
        <input
          type="checkbox"
          id={item._id}
          checked={item.isDone}
          onChange={handleCheckbox}
        />
      </div>
      <div className={textClass}>
        <label htmlFor={item._id}>{item.description}</label>
      </div>
      <div>
        <button className="plain-button" onClick={handleDelete}>
          &#x1F5D1;
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;
