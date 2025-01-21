import {IconButton} from "@/shared/ui";

export default function Home() {
  return (
    <section className={"flex h-full w-full justify-center pt-[2.625rem]"}>
      <div className={"flex flex-col h-full w-full max-w-[62.5rem] gap-[0.75rem]"}>
        <IconButton icon={"account"}/>
        <IconButton icon={"account"} variant={"secondary"}/>
        <IconButton icon={"account"} variant={"tertiary"}/>
        <IconButton icon={"account"} size={"S"}/>
        <IconButton icon={"account"} size={"S"} variant={"secondary"}/>
        <IconButton icon={"account"} size={"S"} variant={"tertiary"}/>

        <IconButton icon={"account"} palette={"orange"}/>
        <IconButton icon={"account"} palette={"orange"} variant={"secondary"}/>
        <IconButton icon={"account"} palette={"orange"} variant={"tertiary"}/>
        <IconButton icon={"account"} palette={"orange"} size={"S"}/>
        <IconButton icon={"account"} palette={"orange"} size={"S"} variant={"secondary"}/>
        <IconButton icon={"account"} palette={"orange"} size={"S"} variant={"tertiary"}/>

        <IconButton icon={"account"} palette={"gray"}/>
        <IconButton icon={"account"} palette={"gray"} variant={"secondary"}/>
        <IconButton icon={"account"} palette={"gray"} variant={"tertiary"}/>
        <IconButton icon={"account"} palette={"gray"} size={"S"}/>
        <IconButton icon={"account"} palette={"gray"} size={"S"} variant={"secondary"}/>
        <IconButton icon={"account"} palette={"gray"} size={"S"} variant={"tertiary"}/>


      </div>
    </section>
  );
}
