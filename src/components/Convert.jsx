import React, { useEffect, useState } from "react";
import axios from "axios";

function Convert({ language, text }) {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  // text is sent to debouncedText after 500ms
  // after stop typing
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  //this useEFFECT is activated when debouncedText || language has changed
  useEffect(() => {
    //console.log("New language");
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };
    doTranslation();
  }, [language, debouncedText]);
  return (
    <div className="ui header">
      <h1>{translated}</h1>
    </div>
  );
}

export default Convert;
