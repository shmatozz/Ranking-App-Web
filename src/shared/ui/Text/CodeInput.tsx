'use client';

import React from "react";
import {NumberHolder} from "@/shared/ui";

export const CodeInput = () => {
  const [code, setCode] = React.useState("");

  return (
    <div className={"flex flex-col w-full bg-base-0 gap-6"}>
      <p className={"text-h5 text-base-95 text-center"}>
        Введите код, отправленный на указанную почту
      </p>

      <div className={"flex flex-row gap-4 py-2 items-center justify-center"}>
        <NumberHolder number={code[0]}/>
        <NumberHolder number={code[1]}/>
        <NumberHolder number={code[2]}/>
        <NumberHolder number={code[3]}/>
        <NumberHolder number={code[4]}/>
        <NumberHolder number={code[5]}/>
      </div>

      <input
        name={"code"}
        type={"hidden"}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        inputMode={"numeric"}
        maxLength={6}
      />
    </div>
  )
}
