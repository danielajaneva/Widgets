import React, { useState } from "react";
import Dropdown from "./Dropdown";

const options = [
  {
    label: "The color Red",
    value: "red",
  },
  {
    label: "The color Green",
    value: "green",
  },
  {
    label: "The color Blue",
    value: "blue",
  },
];

function Colors() {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Dropdown
        label="Select a color"
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

export default Colors;
