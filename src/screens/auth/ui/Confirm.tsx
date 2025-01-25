import React from "react";
import {auth} from "@/shared/lib";
import {redirect, RedirectType} from "next/navigation";
import ConfirmClient from "@/screens/auth/ui/ConfirmClient";

export const Confirm = async () => {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/sign-up", RedirectType.replace);

  console.log("FROM CONFIRM", session.user);

  return <ConfirmClient email={session.user.email}/>
}
