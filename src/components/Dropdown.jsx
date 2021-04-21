import React, { useState, useEffect, useRef } from "react";

function Dropdown({ options, selected, setSelected, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(); //direct reference to the element (with form)

  //when click outside the dropdown close the dropdown
  useEffect(() => {
    const onBodyClick = (event) => {
      // console.log(event.target); //show wich element is clicked
      if (ref.current.contains(event.target)) {
        return; //return before setOpen
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.body.removeEventListener("click", onBodyClick);
      //remove the eventListener when the DropDown menu is not on the desktop
    };
  }, []);

  const renderedOptions = options.map((option) => {
    //dont render the color that is selected into the list
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        onClick={() => {
          setSelected(option);
        }}
        className="item"
      >
        {option.label}
      </div>
    );
  });

  console.log(ref.current);

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
