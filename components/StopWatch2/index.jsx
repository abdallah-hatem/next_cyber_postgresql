"use client";

import { useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import CardBottomCont from "./components/cardBottomCont";
import CardTopCont from "./components/cardTopCont";

export default function StopWatch2({
  title,
  id,
  type,
  hourRateSingle,
  hourRateMulti,
}) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isRunningMulti, setIsRunningMulti] = useState(false);
  const [multiTime, setMultiTime] = useState(0);

  const [radioVal, setRadioVal] = useState("single");

  function inClient() {
    return typeof window !== "undefined";
  }

  useEffect(() => {
    const previousTime = localStorage.getItem("stopwatchTime" + id);
    const previousIsRunning = localStorage.getItem("stopwatchIsRunning" + id);

    const previousTimeMulti = localStorage.getItem("stopwatchTimeMulti" + id);
    const previousIsRunningMulti = localStorage.getItem(
      "stopwatchIsRunningMulti" + id
    );

    if (previousTime) {
      setTime(parseInt(previousTime));
    }
    if (previousTimeMulti) {
      setMultiTime(parseInt(previousTimeMulti));
    }

    if (previousIsRunning === "true") {
      setIsRunning(true);
    }
    if (previousIsRunningMulti === "true") {
      setIsRunningMulti(true);
    }
  }, []);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        const startTime = localStorage.getItem("startTime" + id);
        const currentTime = new Date().getTime();
        const elapsed = currentTime - startTime;

        setTime(Math.trunc(elapsed / 1000));
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    let multiTimer;

    if (isRunning && isRunningMulti) {
      multiTimer = setInterval(() => {
        const startTime = localStorage.getItem("startTimeMulti" + id);
        const currentTime = new Date().getTime();
        const elapsed = currentTime - startTime;

        setMultiTime(Math.trunc(elapsed / 1000));

        console.log(time, "timeeeeeeee");
        console.log(multiTime, "multiTimeeeeee");
      }, 1000);
    }

    return () => {
      clearInterval(multiTimer);
    };
  }, [isRunning, isRunningMulti]);

  useEffect(() => {
    localStorage.setItem("stopwatchTime" + id, time.toString());
    localStorage.setItem("stopwatchIsRunning" + id, isRunning.toString());

    localStorage.setItem("stopwatchTimeMulti" + id, multiTime.toString());
    localStorage.setItem(
      "stopwatchIsRunningMulti" + id,
      isRunningMulti.toString()
    );
  }, [time, isRunning, isRunningMulti, multiTime]);

  function getStartTime() {
    const stTime = inClient() && localStorage.getItem("startTime" + id);
    const options = { hour: "numeric", minute: "numeric" };

    if (stTime) {
      const date = new Date(Number(stTime)).toLocaleTimeString([], options);
      return date;
    }
  }

  function charge() {
    let fullTime = inClient() && localStorage.getItem("stopwatchTime" + id);
    let multiTime =
      inClient() && localStorage.getItem("stopwatchTimeMulti" + id);

    let singleTime = fullTime - multiTime;

    const hours = Math.floor(singleTime / 3600);
    const minutes = Math.floor(singleTime / 60);

    const hoursMulti = Math.floor(multiTime / 3600);
    const minutesMulti = Math.floor(multiTime / 60);

    let hourPrice = hourRateSingle;
    let minPrice = hourPrice / 60;

    let hourPriceMulti = hourRateMulti;
    let minPriceMulti = hourPriceMulti / 60;

    let chargeSingle = hours * hourPrice + minutes * minPrice;

    let chargeMulti =
      hoursMulti * hourPriceMulti + minutesMulti * minPriceMulti;

    let charge = (chargeSingle + chargeMulti ?? 0).toFixed(2);
    return charge;
  }

  function timer() {
    const result = new Date(time * 1000).toISOString().slice(11, 19);

    return result;
  }
  return (
    <CardComponent
      title=""
      style={{ width: "300px", margin: 10 }}
      styleContent={cardContent}
    >
      <div className="device-cont">
        <div className="title-cont">
          <span>{title}</span>
          <span>{type}</span>
        </div>

        <CardTopCont
          timer={timer}
          setIsRunningMulti={setIsRunningMulti}
          charge={charge}
          radioVal={radioVal}
          setRadioVal={setRadioVal}
          getStartTime={getStartTime}
        />

        <CardBottomCont
          time={time}
          timer={timer}
          id={id}
          setTime={setTime}
          setMultiTime={setMultiTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          isRunningMulti={isRunningMulti}
          setIsRunningMulti={setIsRunningMulti}
          setRadioVal={setRadioVal}
          getStartTime={getStartTime}
          charge={charge}
        />
      </div>
    </CardComponent>
  );
}

const cardContent = {
  display: "flex",
  flexDirection: "column",
  padding: 10,
};
