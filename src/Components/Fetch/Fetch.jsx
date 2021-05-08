import React, { useEffect, useState } from "react";
import Axios from "axios";
import reactHtmlParser from "react-html-parser";
const Fetch = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = "people/1/";
  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      setIsLoading(true);
         await Axios(`http://localhost:5000/posts`).then(res => {
            
      console.log(res.data);
      if (isSubscribed) {
        setUserData(res.data.posts);
        setIsLoading(false);
      }
    })
    }
    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [query]);
  return (
    <div>
      {!isLoading ? (
        userData.map((data, index) => {
          return (
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <div className="card-text">{reactHtmlParser(data.content)}</div>

              </div>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default Fetch;
