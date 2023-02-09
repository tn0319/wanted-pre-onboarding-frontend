import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Todolist {
  id: number,
  todo: string,
  isCompleted: boolean,
  userId: number
}

const Todo = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [todoList, setTodoList] = useState<Todolist[]>([]);
  const [createTodo, setCreateTodo] = useState("");
  const [edit, setEdit] = useState(false);
  const [modifyTodo, setModifyTodo] = useState<number | null>(null);
  const [modifyTxt, setModifyTxt] = useState("")

  useEffect(() => {
    const getToken = localStorage.getItem("access_token");
    if (!getToken) {
      navigate("/signin")
    } else {
      setToken(getToken)
    }
  }, [])

  useEffect(() => {
    token && getTodos();
  }, [token])

  // get todo
  const getTodos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      setTodoList(res.data)
    } catch (err) {
      console.log("Error, Couldn't get todos...");
    }
  }

  // create todo
  const handleCreateTodoClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
        todo: createTodo
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
      getTodos();
      setCreateTodo("");
    } catch (err) {
      console.log("Error, Failed to create todos...");
    }
  }

  // delete todo
  const handleDelTodoClick = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      getTodos();
    } catch (err) {
      console.log("Error, Failed to delete todos...");
    }
  }

  // modify todo
  const handleModifTodoClick = (id: number, txt: string) => {
    setEdit(true);
    setModifyTodo(id);
    setModifyTxt(txt);
  }

  // modify submit
  const handleUpdateList = async (id: number, chk: boolean, txt?: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        todo: (txt ? txt : modifyTxt),
        isCompleted: chk
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      if (edit && !txt) {
        setEdit(false);
      }
      getTodos();
    } catch (err) {
      console.log("Error, Failed to edit todos...");
    }
  }

  return (
    <div className="todo-wrap">
      <h1>TODO LIST</h1>
      <div className="write-wrap">
        <input type="text" data-testid="new-todo-input" value={createTodo} onChange={(e) => setCreateTodo(e.target.value)} />
        <button data-testid="new-todo-add-button" onClick={handleCreateTodoClick}>추가</button>
      </div>
      <ul className="list-wrap">
        {todoList.map((list) => {
          return (
            <li key={list.id}>
              <label>
                <input type="checkbox" checked={list.isCompleted} onChange={e => handleUpdateList(list.id, e.target.checked, list.todo)} />
                {edit && list.id === modifyTodo ? (
                  <input type="text" data-testid="modify-input" value={modifyTxt} onChange={(e) => { setModifyTxt(e.target.value) }} />
                ) : (
                  <span>{list.todo}</span>
                )}
              </label>
              {
                edit && list.id === modifyTodo ? (
                  <>
                    <button className="btn-c-red" data-testid="submit-button" onClick={() => handleUpdateList(list.id, list.isCompleted)}>제출</button>
                    <button data-testid="cancel-button" onClick={() => setEdit(false)}>취소</button>
                  </>) : (<>
                    <button data-testid="modify-button" onClick={() => handleModifTodoClick(list.id, list.todo)}>수정</button>
                    <button className="btn-c-black" data-testid="delete-button" onClick={() => handleDelTodoClick(list.id)}>삭제</button>
                  </>)
              }
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Todo;
