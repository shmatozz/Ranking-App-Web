import React from "react";
import {Profile, whoAmI} from "@/screens/profile";
import {auth} from "@/shared/lib";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const res = await whoAmI(session.user.token);

  return (
    <Profile isOrganization={res.organization}/>
  )
}
