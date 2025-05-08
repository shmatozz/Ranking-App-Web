import React from "react";
import {Profile} from "@/screens/profile";
import {auth} from "@/shared/lib";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <Profile sessionEmail={session.user.email}/>
  )
}
