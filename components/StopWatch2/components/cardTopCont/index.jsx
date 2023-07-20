"use client";
import { Radio } from "antd";

export default function CardTopCont({
  setIsRunningMulti,
  charge,
  timer,
  radioVal,
  setRadioVal,
  getStartTime,
}) {
  function handleRadioButtons(e) {
    const value = e.target.value;

    if (value === "multi") {
      setIsRunningMulti(true);
      setRadioVal("multi");
    } else {
      setIsRunningMulti(false);
      setRadioVal("single");
    }
  }

  return (
    <div className="top-cont">
      <Radio.Group
        onChange={(e) => handleRadioButtons(e)}
        defaultValue="single"
        buttonStyle="solid"
        value={radioVal}
      >
        <Radio.Button value="single">Single</Radio.Button>
        <Radio.Button value="multi">Multi</Radio.Button>
      </Radio.Group>

      <span className="timer">{timer()}</span>

      <div className="info-cont">
        <p>Start : {getStartTime()}</p>
        <p>charge: ${charge()}</p>
      </div>
    </div>
  );
}
