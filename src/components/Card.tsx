import { useEffect, useState } from "react";
import "./Card.css";

interface Activity {
  accessibility: number;
  activity: String;
  key: String;
  link: String;
  participants: number;
  price: number;
  type: String;
}

export default function Card() {
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityLink, setActivityLink] = useState("");
  const [activityPart, setActivityPart] = useState(-1);
  const [activityPrice, setActivityPrice] = useState("");
  const [activityAccess, setActivityAccess] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.boredapi.com/api/activity", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json: Activity) => {
        setActivityName(json.activity.toString());
        setActivityType(json.type.toString());
        setActivityLink(json.link.toString());
        console.log(json.link);
        setActivityPart(json.participants);
        setActivityPrice(`${json.price * 100}$`);
        setActivityAccess(`${json.accessibility * 100}%`);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);
  return (
    <div className="card">
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <>
          <h1 className="activity__name">{activityName}</h1>
          <div className="activity__tags">
            <span>{activityType && "Type: " + activityType}</span>
            <span>{activityPart >= 0 && "Participants: " + activityPart}</span>
            <span>{activityPrice && "Price: " + activityPrice}</span>
            <span>{activityAccess && "Accessibility: " + activityAccess}</span>
          </div>
          <div className="activity__link">
            {activityLink ? (
              <a href={activityLink} target="_blank">
                <button className="button">Go</button>
              </a>
            ) : (
              <button className="button" disabled={true}>
                No Link provided
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
