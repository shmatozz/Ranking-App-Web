import React from "react";
import {Button, TextInput} from "@/shared/ui";
import clsx from "clsx";
import {sendOrganizationJoinRequest} from "@/features/organization-join";

interface SendInviteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  className?: string
}

export const SendInviteForm: React.FC<SendInviteFormProps> = (
  props
) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = () => {
    setIsLoading(true);

    const email = (document.getElementById("user-email") as HTMLInputElement).value;

    setError(null);

    sendOrganizationJoinRequest([email])
      .then(props.onSuccess)
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={clsx("flex flex-col gap-2 w-full max-w-[350px]", props.className)}>
      {error && (
        <div className={"px-6 py-2 rounded-2xl bg-red-5 text-center text-bodyS_medium text-red-70"}>
          {error}
        </div>
      )}

      <TextInput id={"user-email"} title={"Email участника"} type={"email"} animatedLabel={false} inputSize={"S"}
                 className={"w-full max-w-[350px]"}/>

      <div className={"flex flex-row gap-2"}>
        <Button
          size={"S"} variant={"tertiary"} className={"flex-1 w-fit"}
          onClick={props.onCancel}
        >
          Отмена
        </Button>

        <Button
          size={"S"} variant={"primary"} className={"w-full flex-2 max-w-[350px]"}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Отправить приглашение
        </Button>
      </div>
    </div>
  )
}
