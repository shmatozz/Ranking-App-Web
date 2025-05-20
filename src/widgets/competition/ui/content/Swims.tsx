import React, {useEffect, useState} from "react";
import {useCompetitionStore} from "@/features/competition/get";
import {SwimCard} from "@/entities/swim/ui/SwimCard";
import {Button, Modal} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {SwimCreateForm} from "@/features/competition/create";
import {useWhoAmIStore} from "@/features/who-am-i";
import {useUserStore} from "@/entities/user";
import {useRouter, useSearchParams} from "next/navigation";

export const Swims = () => {
  const session = useSession();
  const router = useRouter();
  const {
    competition, isLoading, isDeleting,
    deleteSwim, addSwim, getSwimResultsTemplate, setSelectedSwim
  } = useCompetitionStore();
  const { whoAmI } = useWhoAmIStore();
  const isWhoAmILoading = useWhoAmIStore(state => state.isLoading);
  const { user, getUserInfo } = useUserStore();

  const [swimFormVisible, setSwimFormVisible] = React.useState(false);

  useEffect(() => {
    if (!user && whoAmI && !(whoAmI.organization) && !isWhoAmILoading) getUserInfo();
  }, [getUserInfo, isWhoAmILoading, user, whoAmI]);

  const params = useSearchParams();
  const goToRegistration = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("tab", "swimsRegistration");
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const isAgeValid = (birthDate: string, ageFrom: number, ageTo: number) => {
    if (!birthDate) return false;

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age >= ageFrom && age <= ageTo;
  };

  if (!competition || isLoading) {
    return (
      <div className={"flex flex-col w-full p-4 gap-6"}>
        {Array.from({ length: 3 }).map((_i, index) => (
          <SwimCard key={index} isLoading={isLoading}/>
        ))}
      </div>
    )
  }

  return (
    <div className={"flex flex-col w-full px-1 py-4 gap-6 items-center xs:px-4"}>
      {competition.events.map((swim, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isModalSwimOpen, setIsModalSwimOpen] = useState(false);

        const ageValid = user?.birthDate
          ? isAgeValid(user.birthDate, swim.ageFrom, swim.ageTo)
          : false

        return (
          <SwimCard key={swim.eventUuid} swim={swim} id={`swimCard-${index}`}>
            {session.data && session.data.user.email == competition.organizationInfo.email && (
              <div className={"flex flex-col gap-1 items-center w-fit xs:flex-row"}>
                <Button
                  size={"S"} variant={"tertiary"} palette={"blue"} className={"w-fit"}
                  onClick={() => getSwimResultsTemplate(swim.eventUuid)}
                >
                  <p className={"text-nowrap"}>Шаблон результатов</p>
                </Button>

                <Button
                  size={"S"} variant={"tertiary"} palette={"gray"}
                  onClick={() => setIsModalSwimOpen(true)}
                >
                  Удалить
                </Button>

                {isModalSwimOpen && (
                  <Modal>
                    <p>Вы уверены, что хотите удалить заплыв?</p>
                    <div className="flex gap-4 mt-4 justify-evenly">
                      <Button variant="primary" size={"S"} onClick={() => deleteSwim(swim.eventUuid)} isLoading={isDeleting}>Удалить</Button>
                      <Button variant="secondary" size={"S"} onClick={() => setIsModalSwimOpen(false)}>Отмена</Button>
                    </div>
                  </Modal>
                )}
              </div>
            )}

            {session.data && !(whoAmI && whoAmI.organization) && user?.userEvents != undefined && (
              <Button
                name={"swim-register-button"}
                size={"S"} variant={"tertiary"}
                rightIcon={user.userEvents.some((item) => item.eventUuid == swim.eventUuid) ? "submit" : "link"}
                disabled={
                  user.userEvents.some((item) => item.eventUuid == swim.eventUuid) ||
                  swim.status != "CREATED"  ||
                  !ageValid
                }
                onClick={() => {
                  setSelectedSwim(swim.eventUuid);
                  goToRegistration();
                }}
              >
                <p className={"text-nowrap"}>
                  {user.userEvents.some((item) => item.eventUuid == swim.eventUuid) ? "Вы зарегистрированы" : "Регистрация"}
                </p>
              </Button>
            )}
          </SwimCard>
        )
      })}

      {swimFormVisible && (
        <SwimCreateForm
          onCancel={() => setSwimFormVisible(false)}
          onSubmit={() => addSwim(competition.competitionUuid)}
        />
      )}

      {!swimFormVisible && session.data?.user?.email === competition.organizationInfo.email && (
        <Button
          onClick={() => setSwimFormVisible(true)}
          variant={"secondary"} size={"M"} rightIcon={"plus"} className={"w-full max-w-[350px]"}
        >
          Добавить заплыв
        </Button>
      )}
    </div>
  )
}
