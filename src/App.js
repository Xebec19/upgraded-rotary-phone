import "./App.css";
import React, { useEffect, useState, useRef } from "react";

function App() {
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  useEffect(() => {
    setRows([
      ...rows,
      {
        name: "Rohan",
        bucketName: "Xebec",
        action: "edit",
      },
    ]);
  }, []);
  const onEdit = (index) => {
    nameRef.current.value = rows[index].name;
    bucketNameRef.current.value = rows[index].bucketName;
    setEditIndex(index);
  };
  const onDelete = (index) => {
    setRows(rows.filter((x, i) => i != index));
  };
  const table =
    rows &&
    rows.map((x, index) => {
      return (
        <tr key={index}>
          <td>{x.name}</td>
          <td>{x.bucketName}</td>
          <td>
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </td>
        </tr>
      );
    });
  const nameRef = useRef(null),
    bucketNameRef = useRef(null);
  const onSave = () => {
    if (!!!nameRef.current.value || !!!bucketNameRef.current.value) {
      return;
    }
    if (editIndex > -1) {
      setRows(
        rows.map((x, index) => {
          if (index === editIndex) {
            return {
              name: nameRef.current.value,
              bucketName: bucketNameRef.current.value,
            };
          } else {
            return x;
          }
        })
      );
    } else {
      setRows([
        ...rows,
        {
          name: nameRef.current.value,
          bucketName: bucketNameRef.current.value,
        },
      ]);
    }
    nameRef.current.value = "";
    bucketNameRef.current.value = "";
    setEditIndex(-1);
  };
  return (
    <React.Fragment>
      <div className="header">
        <h1>Work flow automation</h1>
      </div>
      <div className="inputGroup">
        <input type="text" ref={nameRef}></input>
        <input type="text" ref={bucketNameRef}></input>
        <button className="fullBtn" onClick={onSave}>Save</button>
      </div>
      <table colspan="10px">
        <thead className="b-down">
          <tr>
            <th>Name</th>
            <th>Bucket Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </React.Fragment>
  );
}

export default App;
