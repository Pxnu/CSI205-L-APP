"use client";

import React, { useState, useEffect } from "react";
// เรียกใช้ Button Component จากโฟลเดอร์ตามที่คุณกำหนดไว้
import { Button } from "@/components/tailgrids/core/button";

// 1. สร้าง Type สำหรับเก็บสถานะของเครื่องคิดเลข (TypeScript)
type CalcState = {
  mode: "first" | "operator" | "second";
  display: string;
  first: number;
  second: number;
  operator: string;
};

export default function Home() {
  // 2. สร้าง State จัดการข้อมูล
  const [calc, setCalc] = useState<CalcState>({
    mode: "first",
    display: "0",
    first: 0,
    second: 0,
    operator: "?",
  });

  // ฟังก์ชันจัดรูปแบบตัวเลข (ใส่คอมม่า)
  const insertSeparator = (str: string, separator = ",", groupSize = 3) => {
    let resultStr = "";
    let counter = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      resultStr = str[i] + resultStr;
      if (i !== 0 && counter++ % groupSize === groupSize - 1) {
        resultStr = separator + resultStr;
      }
    }
    return resultStr;
  };

  // ลอจิกการกดปุ่มตัวเลข
  const numberClick = (num: string | number) => {
    const numStr = String(num);
    setCalc((prev) => {
      let newDisplay = prev.display;
      let newMode = prev.mode;

      switch (prev.mode) {
        case "first":
        case "second":
          if (prev.display.length < 9) {
            if (prev.display === "0") {
              newDisplay = numStr;
            } else {
              newDisplay += numStr;
            }
          }
          break;
        case "operator":
          newDisplay = numStr;
          newMode = "second";
          break;
      }
      return { ...prev, display: newDisplay, mode: newMode };
    });
  };

  // ลอจิกการกดปุ่มดำเนินการ (+, -)
  const optClick = (opt: string) => {
    setCalc((prev) => {
      let newFirst = prev.first;
      let newMode = prev.mode;
      let newDisplay = prev.display;

      switch (prev.mode) {
        case "first":
          newFirst = Number(prev.display);
          newMode = "operator";
          break;
        case "operator":
          break;
        case "second":
          if (prev.operator === "+") {
            newFirst = prev.first + Number(prev.display);
          } else if (prev.operator === "-") {
            newFirst = prev.first - Number(prev.display);
          }
          newDisplay = String(newFirst);
          newMode = "operator";
          break;
      }
      return {
        ...prev,
        first: newFirst,
        operator: opt,
        mode: newMode,
        display: newDisplay,
      };
    });
  };

  // ลอจิกการกดปุ่มเท่ากับ (=)
  const equClick = () => {
    setCalc((prev) => {
      let newMode = prev.mode;
      let newFirst = prev.first;
      let newSecond = prev.second;
      let newDisplay = prev.display;

      if (newMode === "operator") {
        newMode = "second";
      } else if (newMode === "first" && prev.operator !== "?") {
        newFirst = Number(prev.display);
        newDisplay = String(prev.second);
        newMode = "second";
      }

      if (newMode === "second") {
        newSecond = Number(newDisplay);
        let result = 0;
        if (prev.operator === "+") {
          result = newFirst + newSecond;
        } else if (prev.operator === "-") {
          result = newFirst - newSecond;
        }
        newDisplay = String(result);
        newMode = "first";
      }

      return {
        ...prev,
        mode: newMode,
        first: newFirst,
        second: newSecond,
        display: newDisplay,
      };
    });
  };

  // ลอจิกการลบ (CE)
  const ceClick = () => {
    setCalc({
      mode: "first",
      display: "0",
      first: 0,
      second: 0,
      operator: "?",
    });
  };

  // ดักจับการ</CalcState>พิมพ์ผ่านคีย์บอร์ด
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        numberClick(e.key);
      } else if (e.key === "Escape") {
        ceClick();
      } else if (e.key === "Enter") {
        equClick();
      } else if (e.key === "-") {
        optClick("-");
      } else if (e.key === "=" || e.key === "+") {
        optClick("+");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="m-0 grid min-h-[100dvh] w-full place-items-center px-4">
      <div className="calculator">
        <div className="border-[2px] rounded-[15px] bg-[#cfcfcf]">
          <div className="border-[5px] rounded-[12px] border-[#717171] p-[10px]">
            {/* หน้าจอแสดงผล */}
            <div
              id="screen"
              className="flex items-center justify-end bg-[rgba(98,135,214)] p-[.5rem] px-3 border-[1px] border-gray-500 rounded-[6px] h-[4rem] text-[2.5rem] font-bold text-black mb-4"
            >
              {insertSeparator(calc.display)}
            </div>

            {/* แถวที่ 1 */}
            <div className="btn-row flex gap-3 my-[12px]">
              <Button
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="success"
                disabled
              >
                mc
              </Button>
              <Button
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="success"
                disabled
              >
                mr
              </Button>
              <Button
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="success"
                disabled
              >
                m+
              </Button>
              <Button
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="success"
                disabled
              >
                m-
              </Button>
              <Button
                className="delnumber uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="danger"
                onClick={ceClick}
              >
                ce
              </Button>
            </div>

            {/* แถวที่ 2 */}
            <div className="btn-row flex gap-3 my-[12px]">
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(7)}
              >
                7
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(8)}
              >
                8
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(9)}
              >
                9
              </Button>
              <Button
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="success"
                disabled
              >
                /
              </Button>
              <Button
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="success"
                disabled
              >
                x2
              </Button>
            </div>

            {/* แถวที่ 3 */}
            <div className="btn-row flex gap-3 my-[12px]">
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(4)}
              >
                4
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(5)}
              >
                5
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(6)}
              >
                6
              </Button>
              <Button
                variant="success"
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                disabled
              >
                X
              </Button>
              <Button
                variant="success"
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                disabled
              >
                %
              </Button>
            </div>

            {/* แถวที่ 4 */}
            <div className="btn-row flex gap-3 my-[12px]">
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(1)}
              >
                1
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(2)}
              >
                2
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(3)}
              >
                3
              </Button>
              <Button
                variant="success"
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-4xl font-bold pb-2"
                onClick={() => optClick("-")}
              >
                -
              </Button>
              <Button
                variant="success"
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                disabled
              >
                1/x
              </Button>
            </div>

            {/* แถวที่ 5 */}
            <div className="btn-row flex gap-3 mt-[12px]">
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-2xl font-bold"
                variant="primary"
                onClick={() => numberClick(0)}
              >
                0
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-3xl font-bold pb-4"
                variant="primary"
                disabled
              >
                .
              </Button>
              <Button
                className="number uppercase rounded-[10px] w-[60px] h-[60px] text-xl font-bold"
                variant="primary"
                disabled
              >
                +/-
              </Button>
              <Button
                variant="success"
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-3xl font-bold pb-2"
                onClick={() => optClick("+")}
              >
                +
              </Button>
              <Button
                variant="success"
                className="uppercase rounded-[10px] w-[60px] h-[60px] text-3xl font-bold pb-2"
                onClick={equClick}
              >
                =
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
