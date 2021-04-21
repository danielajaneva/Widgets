import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [stateSearch, setStateSearch] = useState("architecture");
  const [apiResults, setResultsByApi] = useState([]);

  console.log("I RUN AT EVERY RERENDER");
  //useEffect is a hook method that is similar but not same
  //with lifeCycle method and his second parameter can be:
  // (function,[] ) >> run at initial render
  // (function, nothing) >> -||- and run after every rerender
  // (function, [stateSearch]) >> -||- , run after every rerender if
  // data has changed since last render
  //exmple :
  //   useEffect(() => {
  //     console.log("I ONLY RUN ONCE");
  //   }, []);
  useEffect(() => {
    //RECOMENDED TYPE
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: stateSearch,
        },
      });
      setResultsByApi(data.query.search);
    };

    //if() = dont use the timeout on the startup of the page
    if (stateSearch && !apiResults) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (stateSearch) {
          search(); //do a search only if there is a stateSearch
        }
      }, 500);

      //useEffect method has a return function that is going to do a clenup
      //1. useEffect() - runs 1st time and holds the return()=>{} for the 2nd run
      //2. return()=>{} - runs 1st and after that useEffect ...etc
      return () => {
        clearTimeout(timeoutId);
      };
    }

    // //DONT RECOMEND TYPE like this (call the f)(invoke the f)
    // (async () => {
    //   //{data}is an object with response from the api
    //   const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
    //     params: {
    //       action: "query",
    //       list: "search",
    //       origin: "*",
    //       format: "json",
    //       srsearch: stateSearch,
    //     },
    //   });
    //   setResultsByApi(data.query.search);
    //   //setResultsByApi(extracting the data);
    // })();
  }, [stateSearch, apiResults]);
  //anytime stateSearch changes , we will make api request

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
