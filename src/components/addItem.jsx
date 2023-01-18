import { useState } from "react";

export default function AddItem(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.add(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="m-2"
          type="text"
          onChange={handleChange}
          value={name}
        />
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
