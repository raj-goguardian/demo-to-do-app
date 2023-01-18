import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import AddItem from "./components/addItem";
import Item from "./components/item";
import useLocalStorage from "./hooks/useLocalStorage";

const FILTER_MAP = {
  all: () => true,
  active: (i) => !i.completed,
  completed: (i) => i.completed,
};

const localStorageKey = "cache_todo_data";

export default function App() {
  const [items, setItems] = useLocalStorage(localStorageKey, []);
  const [view, setView] = useState("active");
  const allRef = useRef();
  const activeRef = useRef();
  const completedRef = useRef();

  function add(value) {
    setItems([
      ...items,
      {
        id: `todo-${nanoid()}`,
        value: value,
        completed: false,
      },
    ]);
  }

  function edit(id, value) {
    const newItems = items.map((x) => {
      if (x.id === id) return { ...x, value: value };

      return x;
    });
    setItems(newItems);
  }

  function remove(id) {
    setItems(items.filter((x) => x.id !== id));
  }

  function toggleCompleted(id) {
    const newItems = items.map((x) => {
      if (x.id === id) return { ...x, completed: !x.completed };

      return x;
    });
    setItems(newItems);
  }

  const taskList = items.filter(FILTER_MAP[view]).map((i) => {
    return (
      <Item
        key={i.id}
        id={i.id}
        value={i.value}
        edit={edit}
        remove={remove}
        completed={i.completed}
        toggleCompleted={toggleCompleted}
      />
    );
  });

  useEffect(() => {
    const def = "btn m-2 ";

    switch (view) {
      case "all":
        allRef.current.className = def + "btn-success";
        activeRef.current.className = def + "btn-secondary";
        completedRef.current.className = def + "btn-secondary";
        break;
      case "active":
        allRef.current.className = def + "btn-secondary";
        activeRef.current.className = def + "btn-success";
        completedRef.current.className = def + "btn-secondary";
        break;
      case "completed":
        allRef.current.className = def + "btn-secondary";
        activeRef.current.className = def + "btn-secondary";
        completedRef.current.className = def + "btn-success";
        break;
    }
  }, [view]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <AddItem add={add} />
      <div>
        <button
          className="btn m-2 btn-warning"
          type="button"
          onClick={() => setItems([])}
        >
          Reset Local Storage
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setView("all")} ref={allRef}>
          All
        </button>
        <button type="button" onClick={() => setView("active")} ref={activeRef}>
          Active
        </button>
        <button
          type="button"
          onClick={() => setView("completed")}
          ref={completedRef}
        >
          Completed
        </button>
      </div>
      <div>
        <ul className="list-group m-2">{taskList}</ul>
      </div>
    </div>
  );
}
