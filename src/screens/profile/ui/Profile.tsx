import React from "react";
import {Button} from "@/shared/ui";
import {redirect} from "next/navigation";
import {auth, quit} from "@/shared/lib";

export const Profile = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  console.log("FROM PROFILE", session);

  return (
    <div className={"w-full text-wrap"}>
      {session.user.email}

      <Button onClick={quit}>
        SIGN OUT
      </Button>
    </div>
  )
}
