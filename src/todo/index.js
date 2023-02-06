import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [token, setToken] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [createTodo, setCreateTodo] = useState("");
  const [edit, setEdit] = useState(false);
  const [modifyTodo, setModifyTodo] = useState(null);
  const [modifyTxt, setModifyTxt] = useState("")

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    getTodos();
  }, [token])

  // get todo
  const getTodos = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    setTodoList(res.data)
  }

  // create todo
  const handleCreateTodoClick = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
        todo: createTodo
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
      getTodos();
    } catch (err) {
      console.log("Error...");
    }
  }

  // delete todo
  const handleDelTodoClick = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      getTodos();
    } catch (err) {
      console.log("Error...");
    }
  }

  // modify todo
  const handleModifTodoClick = (id, txt) => {
    setEdit(true);
    setModifyTodo(id);
    setModifyTxt(txt);
  }

  // modify submit
  const handleModifySubmitClick = async (id) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        todo: modifyTxt,
        isCompleted: false
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      getTodos();
      setEdit(false)
    } catch (err) {
      console.log("Error...");
    }
  }

  return (
    <>
      <input data-testid="new-todo-input" onChange={(e) => setCreateTodo(e.target.value)} />
      <button data-testid="new-todo-add-button" onClick={handleCreateTodoClick}>추가</button>
      <ul>
        {todoList.map((list) => {
          return (
            <li key={list.id}>
              <label>
                <input type="checkbox" />
                {edit && list.id === modifyTodo ? (
                  <input data-testid="modify-input" value={modifyTxt} onChange={(e) => { setModifyTxt(e.target.value) }} />
                ) : (
                  <span>{list.todo}</span>
                )}
              </label>
              {
                edit && list.id === modifyTodo ? (
                  <>
                    <button data-testid="submit-button" onClick={() => handleModifySubmitClick(list.id)}>제출</button>
                    <button data-testid="cancel-button" onClick={() => setEdit(false)}>취소</button>
                  </>) : (<>
                    <button data-testid="modify-button" onClick={() => handleModifTodoClick(list.id, list.todo)}>수정</button>
                    <button data-testid="delete-button" onClick={() => handleDelTodoClick(list.id)}>삭제</button>
                  </>)
              }
            </li>
          )
        })}
      </ul>
    </>
  );
};

export default Todo;
