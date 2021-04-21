import React from "react";

import Accordion from "./Accordion";

const items = [
  {
    title: "What is react?",
    content: "React is a frontend js framework",
  },
  {
    title: "How you use React",
    content: "You use React with components",
  },
  {
    title: "Why to use React",
    content: "React is a favorite developers framework",
  },
];

const Accordions = () => {
  return <Accordion items={items} />;
};

export default Accordions;
