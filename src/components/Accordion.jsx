import React, { useState } from "react";

function Accordion({ items }) {
  const [state, setstate] = useState(null);
  //
  //helper function
  const onTitleClick = (index) => {
    console.log("Title was clicked", index, state);
    setstate(index); //change the state with clicked index
  };

  const renderAccordion = items.map((item, index) => {
    const active = index === state ? "active" : " ";
    //if index===state set a class of "active"

    return (
      <React.Fragment key={item.title}>
        <div onClick={() => onTitleClick(index)} className={`title ${active}`}>
          {/* pass in the index(place) of the accordion */}
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderAccordion}</div>;
}

export default Accordion;
