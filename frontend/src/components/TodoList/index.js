import React, { useState, useEffect } from "react";
import AddItem from "../AddItem/index.js";
import TodoItem from "../TodoItem/index.js";

import "./style.css";

let BASE_URL = "http://localhost:5000";

const TodoList = () => {
  const [itemList, setItemList] = useState([]);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("test_user_id");
  const [newUserId, setNewUserId] = useState(userId);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let showDebug = params.has("debug");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setItemList([]);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    calculateRemainingNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemList]);

  const fetchData = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    fetch(`${BASE_URL}/todo/${userId}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setIsLoading(false);
        setItemList(json);
      })
      .catch(error => {
        setIsLoading(false);
        setItemList([]);
        console.log(error);
      });
  };

  const postNewTodo = data => {
    fetch(`${BASE_URL}/todo/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        description: data.description,
        isDone: data.isDone
      })
    })
      .then(response => {
        fetchData();
      })
      .catch(error => {
        fetchData();
        console.log(error);
      });
  };

  const updateTodo = (id, data) => {
    fetch(`${BASE_URL}/todo/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        description: data.description,
        isDone: data.isDone
      })
    })
      .then(response => {
        fetchData();
      })
      .catch(error => {
        fetchData();
        console.log(error);
      });
  };

  const markAllDone = () => {
    fetch(`${BASE_URL}/todo/mark_all_done/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        fetchData();
      })
      .catch(error => {
        fetchData();
        console.log(error);
      });
  };

  const handleAddItem = description => {
    let newData = {
      userId: userId,
      description: description,
      isDone: false
    };
    postNewTodo(newData);
  };

  const handleToggleDone = id => {
    let item = itemList.find(item => {
      return item._id === id;
    });

    if (item !== undefined) {
      item.isDone = !item.isDone;
      updateTodo(item._id, item);
    }
  };

  const handleDelete = id => {
    fetch(`${BASE_URL}/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        fetchData();
      })
      .catch(error => {
        fetchData();
        console.log(error);
      });
  };

  const calculateRemainingNumber = () => {
    let itemsRemaining = itemList.filter(item => item.isDone === false);
    setItemsRemaining(itemsRemaining.length);
  };

  const onChangeNewUserId = event => {
    setNewUserId(event.target.value);
  };

  const changeUser = () => {
    setUserId(newUserId);
  };

  return (
    <div>
      <div className="header">
        <h1>Todos</h1>
        {showDebug ? <i>User: {userId}</i> : null}
      </div>

      <AddItem onAddItem={handleAddItem} />

      <div className="todo-item-list">
        {itemList.map(item => (
          <TodoItem
            key={item._id}
            item={item}
            onToggleDone={handleToggleDone}
            onDelete={handleDelete}
          ></TodoItem>
        ))}
      </div>

      <div className="footer">
        <div className="items-remaining">{itemsRemaining} items remaining</div>
        <div className="completed">
          <button className="link-button" onClick={markAllDone}>
            Mark all as completed
          </button>
        </div>
      </div>

      {showDebug ? (
        <div className="debug-menu">
          <div>
            <b>Debug Menu</b>
          </div>

          <div className="debug-menu-contents">
            <div>New User Id:</div>
            <div>
              <input
                type="text"
                value={newUserId}
                onChange={onChangeNewUserId}
              />
            </div>
            <div>
              <button onClick={changeUser}>Change User</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TodoList;
