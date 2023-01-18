import { useState } from "react";

export default function Item(props) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }

    props.edit(props.id, value);
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input
        className="m-2"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button
        className="m-2 btn btn-dark"
        type="button"
        onClick={() => setEditing(false)}
      >
        cancel
      </button>
      <button className="m-2 btn btn-dark" type="submit">
        save
      </button>
    </form>
  );

  const viewTemplate = (
    <div>
      <input
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleCompleted(props.id)}
      />
      <label className="m-2">{props.value}</label>
      <button
        className="btn btn-info m-2"
        type="button"
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        type="button"
        onClick={() => props.remove(props.id)}
      >
        Delete
      </button>
    </div>
  );

  return (
    <li className="list-group-item">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
