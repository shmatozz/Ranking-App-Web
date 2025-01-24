'use client';

import React from "react";

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode }) => {
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) { // Разрешаем ввод только одной цифры
      const newCodeArray = code.split("");
      newCodeArray[index] = value || "";
      const newCode = newCodeArray.join("");
      setCode(newCode);

      // Перемещаем фокус на следующее поле
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  return (
    <div className={"flex flex-col w-full bg-base-0 gap-6"}>
      <p className={"text-h5 text-base-95 text-center"}>
        Введите код, отправленный на указанную почту
      </p>

      <div className={"flex flex-row gap-4 py-2 items-center justify-center"}>
        {Array(6)
          .fill("")
          .map((_, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={code[index] || ""}
              maxLength={1}
              placeholder={"_"}
              inputMode="numeric"
              className="flex w-9 h-[3.25rem] rounded-lg bg-base-0 text-h5 border-2 border-base-5 text-center"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete={"off"}
            />
          ))}
      </div>
    </div>
  );
};
