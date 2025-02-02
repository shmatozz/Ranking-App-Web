'use client';

import React, { useRef } from "react";

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) { // Allow only one digit input
      const newCodeArray = code.split("");
      newCodeArray[index] = value || "";
      const newCode = newCodeArray.join("");
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").replace(/\D/g, ""); // Remove non-numeric characters
    if (pastedText.length === 6) {
      setCode(pastedText);
    }
  };

  const handleContainerClick = () => {
    const firstEmptyIndex = code.indexOf(" ") !== -1 ? code.indexOf(" ") : code.length;
    inputRefs.current[firstEmptyIndex]?.focus();
  };

  return (
    <div className="flex flex-col w-full bg-base-0 gap-6" onClick={handleContainerClick} onPaste={handlePaste}>
      <p className="text-h5 text-base-95 text-center">
        Введите код, отправленный на указанную почту
      </p>

      <div className="flex flex-row gap-4 py-2 items-center justify-center">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <input
              key={index}
              ref={(el) => {inputRefs.current[index] = el}}
              id={`code-input-${index}`}
              type="text"
              value={code[index] || ""}
              maxLength={1}
              placeholder="_"
              inputMode="numeric"
              className="flex w-9 h-[3.25rem] rounded-lg bg-base-0 text-h5 border-2 border-base-5 text-center"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="off"
            />
          ))}
      </div>
    </div>
  );
};