import React from "react";
import {Button} from "@/shared/ui";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const Profile = async () => {
  const cookieStore = await cookies();
  if (!cookieStore.get("token")) redirect("/sign-in");
  console.log("FROM PROFILE");

  return (
    <div className={"w-full text-wrap"}>
      {cookieStore.get("token")?.value}

      <Button>
        SIGN OUT
      </Button>
    </div>
  )
}
