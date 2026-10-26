"use client";

import React, { useEffect, useRef, useState } from "react";

// หมายเหตุ: อย่าลืมแก้ Path ตรงนี้ให้ถูกต้อง หรือใช้ string path ถ้าไฟล์อยู่ใน public
import fillImg from "../imgs/fill.jpg";
import basketballImg from "../imgs/basketball.png";
import footballImg from "../imgs/football.png";
import volleyballImg from "../imgs/volleyball.png";
import studenImg from "../imgs/human.gif";
import { Play } from "@tailgrids/icons";

interface AnimationProps {
  fillWidth?: number;
  fillHeight?: number;
  ballRadius?: number;
  ballVelocity?: number;
}

type BallType = "none" | "basketball" | "football" | "volleyball" | "human";

const Animation: React.FC<AnimationProps> = ({
  fillWidth = 640,
  fillHeight = 480,
  ballRadius = 50,
  ballVelocity = 50, //[cite: 3]
}) => {
  // internal calculation[cite: 3]
  const ballDiameter = 2 * ballRadius;
  const maxX = fillWidth - ballDiameter - 8;
  const maxY = fillHeight - ballDiameter - 8;
  const xVelocity = Math.round(ballVelocity * Math.sqrt(2));
  const yVelocity = Math.round(ballVelocity * Math.sqrt(2));
  const frameRate = 25;
  const frameTime = 1 / frameRate;

  // States
  const [running, setRunning] = useState<boolean>(false);
  const [rotate, setRotate] = useState<number>(0); //[cite: 3]
  const [ballType, setBallType] = useState<BallType>("none");
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [moveLeft, setMoveLeft] = useState<boolean>(true);
  const [moveDown, setMoveDown] = useState<boolean>(true);

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setRunning((prev) => !prev);
      } else if (e.key === "0") {
        setBallType("none");
      } else if (e.key === "1") {
        setBallType("basketball");
      } else if (e.key === "2") {
        setBallType("football");
      } else if (e.key === "3") {
        setBallType("volleyball");
      } else if (e.key === "4") {
        setBallType("human");
      }
    };

    // เพิ่ม Event Listener ไปที่ Window
    window.addEventListener("keydown", handleKeyDown);

    // คืนค่าเพื่อลบ Event เมื่อ Component ถูก Unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // ใส่ Dependency ว่างเปล่าเพื่อให้ทำงานแค่ตอน Mount ครั้งแรก

  // Handle Animation Loop
  useEffect(() => {
    if (running) {
      timer.current = setTimeout(calculateNextFrame, frameTime * 1000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  });

  const calculateNextFrame = () => {
    // move x[cite: 3]
    if (moveLeft) {
      setX((prevX) => prevX + xVelocity / frameRate);
      if (x >= maxX) {
        setX((prevX) => prevX - (prevX - maxX));
        setMoveLeft(false);
      }
      setRotate((prevRotate) => prevRotate + 10);
    } else {
      setX((prevX) => prevX - xVelocity / frameRate);
      if (x <= 0) {
        setX((prevX) => -prevX);
        setMoveLeft(true);
      }
      setRotate((prevRotate) => prevRotate - 10);
    }

    // move y[cite: 3]
    if (moveDown) {
      setY((prevY) => prevY + yVelocity / frameRate);
      if (y >= maxY) {
        setY((prevY) => prevY - (prevY - maxY));
        setMoveDown(false);
      }
    } else {
      setY((prevY) => prevY - yVelocity / frameRate);
      if (y <= 0) {
        setY((prevY) => -prevY);
        setMoveDown(true);
      }
    }
  };

  const getBackgroundImage = () => {
    switch (ballType) {
      case "basketball":
        return `url(${basketballImg.src})`;
      case "football":
        return `url(${footballImg.src})`;
      case "volleyball":
        return `url(${volleyballImg.src})`;
      case "human":
        return `url(${studenImg.src})`;
      default:
        return "";
    }
  };

  return (
    <div className="text-center mt-3">
      <div
        className="m-2 border-2 border-black rounded-2xl relative mx-auto overflow-hidden"
        style={{
          width: fillWidth + "px",
          height: fillHeight + "px",
          backgroundImage: `url(${fillImg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="border border-black rounded-full absolute"
          style={{
            width: `${ballDiameter}px`,
            height: `${ballDiameter}px`,
            top: `${y}px`,
            left: `${x}px`,
            backgroundColor: ballType === "none" ? "cyan" : "transparent",
            backgroundImage: getBackgroundImage(),
            backgroundPosition: "center",
            backgroundSize: "cover",
            transform: `rotate(${rotate}deg)`, //[cite: 3]
            transition: "none",
          }}
        ></div>
      </div>

      <div
        className="m-3 mx-auto flex justify-between items-center"
        style={{ width: fillWidth }}
      >
        <button
          onClick={() => setRunning(!running)}
          className={`capitalize px-4 py-2 rounded font-medium flex items-center transition-colors ${
            running
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {running ? (
            <span>⏸&nbsp;pause</span>
          ) : (
            <span className="flex items-center">
              <Play /> &nbsp;run
            </span>
          )}
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setBallType("none")}
            className="capitalize px-3 py-1 rounded border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
          >
            none
          </button>
          <button
            onClick={() => setBallType("basketball")}
            className="capitalize px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            basketball
          </button>
          <button
            onClick={() => setBallType("football")}
            className="capitalize px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            football
          </button>
          <button
            onClick={() => setBallType("volleyball")}
            className="capitalize px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            volleyball
          </button>
          <button
            onClick={() => setBallType("human")}
            className="capitalize px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            Human
          </button>
        </div>
      </div>
    </div>
  );
};

export default Animation;
