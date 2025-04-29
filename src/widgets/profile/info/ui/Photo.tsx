import React, {useEffect, useRef} from "react";
import {useUserStore} from "@/entities/user";
import {useOrganizationStore} from "@/entities/organization";
import {Icon, ImageLoader} from "@/shared/ui";
import {useWhoAmIStore} from "@/features/who-am-i";

export const Photo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPhoto, setCurrentPhoto] = React.useState<string>();
  const { user, uploadUserPhoto } = useUserStore();
  const { organization, uploadOrganizationPhoto } = useOrganizationStore();
  const { whoAmI } = useWhoAmIStore();

  useEffect(() => {
    if (whoAmI && !whoAmI.organization && user) setCurrentPhoto(user.image)
    else if (whoAmI && whoAmI.organization && organization) setCurrentPhoto(organization.image)
    else setCurrentPhoto(undefined)
  }, [user, organization, whoAmI]);

  const handleFileUpload = (file: File) => {
    if (whoAmI && whoAmI.organization) uploadOrganizationPhoto(file)
    else if (whoAmI && !whoAmI.organization) uploadUserPhoto(file)
  }

  return (
    <div
      className={"relative h-[100px] w-[100px] bg-base-5 rounded-full lg-md:h-[250px] lg-md:w-[250px] overflow-hidden group"}
      onClick={() => {inputRef.current!.click()}}
    >
      <div className={"absolute flex w-full h-full items-center justify-center z-20 opacity-0 bg-base-5 transition-opacity group-hover:opacity-50"}>
        <Icon name={"photo"} size={24} color={"#868686"}/>
      </div>

      {currentPhoto && (
        <div className={"w-full h-full object-cover z-10"}>
          <ImageLoader imagePath={currentPhoto}/>
        </div>
      )}

      <input ref={inputRef} type={"file"} accept={"image/png"} hidden onChange={(e) => {
        if (e.target.files) handleFileUpload(e.target.files[0]);
      }}/>
    </div>
  )
}
