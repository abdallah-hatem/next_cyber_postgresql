"use client";

import { useState } from "react";
import ButtonComponent from "../../../ButtonComponent";
import PopConfirm from "../../../PopConfirm";
import ModalComponent from "../../../ModalComponent";
import Receipt from "./Receipt";

export default function CardBottomCont({
  time,
  timer,
  id,
  isRunning,
  setIsRunning,
  setIsRunningMulti,
  isRunningMulti,
  setTime,
  setMultiTime,
  setRadioVal,
  getStartTime,
  charge,
}) {
  const [openReceipt, setOpenReceipt] = useState(false);
  const [prevTime, setPrevTime] = useState(0);

  function startTimer() {
    setIsRunning(true);

    if (isRunningMulti) {
      const newDate = new Date();
      localStorage.setItem("startTimeMulti" + id, newDate.getTime());
    }

    if (!localStorage.getItem("startTime" + id)) {
      const newDate = new Date();
      localStorage.setItem("startTime" + id, newDate.getTime());
    }

    // ///////

    if (localStorage.getItem("pausedAt" + id)) {
      const now = new Date().getTime();
      const pausedAt = localStorage.getItem("pausedAt" + id);
      const pausedTime = now - pausedAt;
      const prevPausedTime = localStorage.getItem("prevPausedTime" + id) ?? 0;

      const startTime = localStorage.getItem("startTime" + id);

      localStorage.setItem("pausedTime" + id, pausedTime + Number(prevPausedTime));

      localStorage.setItem("prevPausedTime" + id, Number(prevPausedTime)+pausedTime);

      localStorage.removeItem("pausedAt" + id);
    }
  }

  function pauseTimer() {
    setIsRunning(false);

    const now = new Date().getTime();
    localStorage.setItem("pausedAt" + id, now);
  }

  function resetTimer() {
    setIsRunning(false);
    setIsRunningMulti(false);
    setTime(0);
    setMultiTime(0);
    setRadioVal("single");

    localStorage.removeItem("stopwatchTime" + id);
    localStorage.removeItem("stopwatchIsRunning" + id);
    localStorage.removeItem("stopwatchTimeMulti" + id);
    localStorage.removeItem("stopwatchIsRunningMulti" + id);
    localStorage.removeItem("startTime" + id);
    localStorage.removeItem("pausedAt" + id);
    localStorage.removeItem("pausedTime" + id);
    localStorage.removeItem("prevPausedTime" + id);
  }

  const buttons = [
    {
      title: time && !isRunning ? "Resume" : "Start",
      disabled: isRunning,
      onClick: startTimer,
    },
    { title: "Pause", onClick: pauseTimer, disabled: !isRunning },
    {
      title: "Reset",
      disabled: !isRunning && time === 0,
      style: { backgroundColor: !(!isRunning && time === 0) && "red" },
    },
  ];

  function handleConfirm() {
    resetTimer();
    setOpenReceipt(false);
  }

  return (
    <div className="bot-cont">
      <div className="bot-1">
        {/* Buttons */}
        {buttons.map((el, index) =>
          el.title !== "Reset" ? (
            <ButtonComponent
              style={{ width: 70, ...el.style }}
              title={el.title}
              onClick={el.onClick}
              disabled={el.disabled}
              key={index}
            />
          ) : (
            <PopConfirm
              key={index}
              disabled={!isRunning && time === 0}
              title="Are you sure to reset ?"
              onConfirm={() => resetTimer()}
              placement="rightBottom"
            >
              <ButtonComponent
                style={{ width: 70, ...el.style }}
                title={el.title}
                disabled={el.disabled}
                key={index}
              />
            </PopConfirm>
          )
        )}
      </div>

      {/* Pop Confirm Done Button */}
      <PopConfirm
        disabled={!isRunning && time === 0}
        title="Are you sure to end ?"
        onConfirm={() => {
          setOpenReceipt(true);
          pauseTimer();
        }}
        onCancel={() => setOpenReceipt(false)}
      >
        <ButtonComponent
          title="Done"
          disabled={!isRunning && time === 0}
          style={{
            marginTop: 10,
            backgroundColor: !(!isRunning && time === 0) && "green",
          }}
        />
      </PopConfirm>

      {/* Modal Receipt */}
      <ModalComponent
        title="Receipt"
        open={openReceipt}
        onOk={handleConfirm}
        onCancel={() => {
          setOpenReceipt(false);
          startTimer();
        }}
      >
        <Receipt timer={timer} getStartTime={getStartTime} charge={charge} />
      </ModalComponent>
    </div>
  );
}
