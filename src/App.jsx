import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const handleGameStart = () => {
    if (!gameStarted) {
      timerReset(); 
      timerStart();
      setGameStarted(true);
    }
  };

  const handleGameEnd = () => {
    timerStop();
    setGameStarted(false);
    const finalTime = time;
    setPreviousTime(finalTime);
    if (bestTime === null || finalTime < bestTime) {
      setBestTime(finalTime);
    }
    timerReset();
  };

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        openModal={() => setShowModal(true)}
        time={time}
        bestTime={bestTime}
        previousTime={previousTime}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        cardTexts={cardTexts}
        onGameStart={handleGameStart}
        onGameEnd={handleGameEnd}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

