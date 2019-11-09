import React, { useState } from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(result => {
        console.log("Color was updated", result);
        setColorToEdit(initialColor);
        setEditing(false);
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    const deletedColor = colors.find(item => item.id === color.id);

    updateColors(colors.filter(item => item.id !== color.id));

    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(result => {
        console.log("Color was deleted", result);
      })
      .catch(error => {
        console.log(error);
        updateColors([...colors, deletedColor]);
      });
  };

  const addColor = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/colors", newColor)
      .then(result => {
        console.log("Color was added", result.data);
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e => setNewColor({ ...newColor, color: e.target.value })}
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
