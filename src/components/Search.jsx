import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [stateSearch, setStateSearch] = useState("architecture");
  const [debouncedSearch, setDebouncedSearch] = useState(stateSearch);
  const [apiResults, setResultsByApi] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (stateSearch) {
        setDebouncedSearch(stateSearch);
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [stateSearch]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedSearch,
        },
      });
      setResultsByApi(data.query.search);
    };
    search();
  }, [debouncedSearch]);

  //RENDERING THE API RESULTS
  const renderApiResults = apiResults.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}>
            {/* converting the spans into the text with yhis property,
            but dont use this if you are not taking the result.snippet
            from the trusted api, it is dangerous (someone can get into your server)
            */}
            {/* {result.snippet} >> dont use this alone if you have spans into text*/}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Text :</label>
          <input
            onChange={(e) => setStateSearch(e.target.value)}
            value={stateSearch}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderApiResults}</div>
    </div>
  );
};

export default Search;
