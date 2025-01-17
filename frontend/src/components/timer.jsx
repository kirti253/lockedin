import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRefresh } from "./refresh";

function getDate() {
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${today.getDate()} ${
    monthNames[today.getMonth()]
  } ${today.getFullYear()}`;
}

export default function StopWatch() {
  const { triggerRefresh } = useRefresh();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [task, setTask] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentDate] = useState(getDate());
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to submit a task.");
      return;
    }

    try {
      const response = await axios.post(
        "https://time-back.vercel.app/tasklist/task",
        { title: task, duration: elapsedTime.toString(), date: currentDate },
        { headers: { Authorization: token } }
      );
      console.log(response.data);
      setTask("");
      setIsRunning(false);
      setIsPaused(false);
      triggerRefresh();
      setElapsedTime(0);
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.error("Response error:", err.response.data);
      }
    }
  };

  const formatTime = () => {
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, "0");
    const minutes = String(
      Math.floor((elapsedTime % 3600000) / 60000)
    ).padStart(2, "0");
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(
      2,
      "0"
    );
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex flex-col items-center py-8">
        <div
          className={`text-[60px] sm:text-[100px] lg:text-[200px] font-mono font-bold mt-20 ${
            isRunning ? "text-gray-300" : "text-slate-400"
          }`}
        >
          {formatTime()}
        </div>
        <p className="text-gray-300 tracking-widest mb-6 text-lg sm:text-xl">
          {currentDate}
        </p>
        <div className="flex flex-col items-center space-y-4">
          {isPaused && (
            <div className="flex flex-col items-center space-y-4">
              <Textarea
                placeholder="Type your message here."
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button onClick={handleSubmit} className="w-40">
                Submit
              </Button>
            </div>
          )}
          {!isRunning && !isPaused && (
            <Button onClick={start} className="w-40">
              Start
            </Button>
          )}
          {isRunning && (
            <Button onClick={stop} className="w-40">
              Stop
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
