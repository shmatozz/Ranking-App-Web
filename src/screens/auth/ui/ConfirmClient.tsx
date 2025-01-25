"use client";

import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {Button, CodeInput} from "@/shared/ui";
import {sendCodeRequest} from "@/screens/auth/model/actions";
import {redirect, RedirectType} from "next/navigation";

const ConfirmClient: React.FC<{email: string}> = ({email}) => {
  const [code, setCode] = useState("");
  const [rightCode, setRightCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCode = sessionStorage.getItem(`sentCode:${email}`);
    if (storedCode) {
      setRightCode(storedCode);
    } else {
      sessionStorage.setItem(`sentCode:${email}`, "true");
      console.log(123);
      sendCodeRequest(email)
        .then((code) => {
          setRightCode(code);
        })
        .catch(() => {
          setError("Что-то пошло не так. Попробуйте позже");
        });
    }
  }, [email]);

  const handleConfirm = async () => {
    if (code === rightCode) {
      redirect("/profile", RedirectType.replace);
    }
  };

  return (

    <div
      className={clsx(
        "flex flex-col items-center gap-4",
        "w-full max-w-[40rem] h-fit rounded-3xl px-[3.25rem] py-8",
        "bg-base-0 shadow-md"
      )}
    >
      <p className={"text-h4 text-base-95 text-center"}>Подтверждение</p>

      {error && <p className="text-red-500">{error}</p>}

      {/* Code Input */}
      <CodeInput
        code={code}
        setCode={setCode}
      />

      {/* Submit Button */}
      <Button
        className={"w-full max-w-[300px]"}
        variant={"primary"}
        onClick={handleConfirm}
        disabled={code.length === 0}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
};

export default ConfirmClient;
