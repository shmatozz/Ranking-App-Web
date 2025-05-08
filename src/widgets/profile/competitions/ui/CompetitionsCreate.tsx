import React, {useState} from "react";
import {Button, Checkbox, Dropdown, FileInput, Icon, IconButton, TextInput} from "@/shared/ui";
import {participantsType, useCompetitionsCreateStore} from "@/widgets/profile";
import {SwimCard} from "@/entities/swim/ui/SwimCard";
import {SwimCreateForm} from "@/features/competition/create";

interface CompetitionsCreateProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const CompetitionsCreate: React.FC<CompetitionsCreateProps> = ({
  onCancel,
  onSuccess,
}) => {
  const state = useCompetitionsCreateStore();

  const [swimFormVisible, setSwimFormVisible] = React.useState(false);
  const [showAdditionalContacts, setShowAdditionalContacts] = useState(false);

  return (
    <div className={"flex flex-col w-full h-full gap-4 items-center"}>
      <label className={"text-h5_bold text-base-95 text-center"}>Создание соревнования</label>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* COMMON INFO */}
      <div className={"flex flex-col w-full gap-2"}>
        <label className={"w-full text-bodyM_medium text-base-95"}>Общая информация</label>

        <TextInput
          value={state.name} onChange={(e) => state.setName(e.target.value)}
          inputSize={"M"} title={"Название старта"} icon={"trophy"}
        />

        <TextInput
          value={state.location} onChange={(e) => state.setLocation(e.target.value)}
          inputSize={"M"} title={"Место проведения"} icon={"location"}
        />

        <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
          <TextInput
            value={state.date} onChange={(e) => state.setDate(e.target.value)}
            inputSize={"M"} title={"Дата"} type={"date"} min={new Date().toISOString().split("T")[0]}
          />

          <div className={"flex flex-col w-full"}>
            <p className={"text-bodyS_regular text-base-40 text-nowrap"}>Тип участников</p>

            <Dropdown
              items={participantsType}
              selectedItems={[state.participants]}
              onItemSelected={(item) => state.setParticipants(item)}
              placeholder={"Тип участников"}
            />
          </div>
        </div>

        <TextInput
          value={state.description} onChange={(e) => state.setDescription(e.target.value)}
          inputSize={"M"} title={"Описание"} type={"area"} className={"min-h-[120px]"}
        />

        <TextInput
          value={state.videoLink} onChange={(e) => state.setVideoLink(e.target.value)}
          inputSize={"M"} title={"Ссылка на трансляцию"} type={"text"}
        />

        <div className={"flex flex-col gap-2"}>
          <p className={"text-bodyM_regular"}>Контакты</p>

          <TextInput
            value={state.contacts[0]} onChange={(e) => state.setContact(0, e.target.value)}
            inputSize={"M"} title={"Основной контакт"} type={"text"} icon={"forum"} animatedLabel={false}
          />

          <Checkbox
            checked={state.contactFromProfile}
            text={"Использовать контакт из профиля"}
            onClick={() => {
              state.setContactFromProfile(!state.contactFromProfile)
            }}
          />

          <div className={`flex w-full justify-center cursor-pointer transition-all ${showAdditionalContacts ? "rotate-180" : "rotate-0"}`} onClick={() => setShowAdditionalContacts(!showAdditionalContacts)}>
            <Icon name="chevronDown" color="gray" />
          </div>

          <div
            className={`flex flex-col gap-2 transition-all overflow-hidden ${
              showAdditionalContacts ? "h-24 opacity-100" : "h-0 opacity-0"
            }`}
          >
            <TextInput
              value={state.contacts[1]} onChange={(e) => state.setContact(1, e.target.value)}
              inputSize="M" title="Дополнительный контакт" type="text" icon="forum" animatedLabel={false}
            />

            <TextInput
              value={state.contacts[2]} onChange={(e) => state.setContact(2, e.target.value)}
              inputSize="M" title="Дополнительный контакт" type="text" icon="forum" animatedLabel={false}
            />
          </div>
        </div>

        <FileInput
          title={"Положение"} accept={".pdf"}
        />
      </div>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* EVENTS */}
      <div className={"flex flex-col w-full gap-4 items-center"}>
        <label className={"w-full text-bodyM_medium text-base-95"}>Заплывы</label>

        {state.swims.length > 0 && (
          state.swims.map((item, index) => (
            <SwimCard key={index} swim={item}>
              <IconButton
                onClick={() => state.deleteSwim(item)}
                icon={"close"} variant={"tertiary"} size={"S"} palette={"gray"}
              />
            </SwimCard>
          ))
        )}

        {state.swims.length == 0 && !swimFormVisible && (
          <p className={"text-bodyM_regular text-base-90"}>Заплывы не добавлены</p>
        )}

        {swimFormVisible && (
          <SwimCreateForm
            onCancel={() => setSwimFormVisible(false)}
            onSubmit={() => { state.addSwim(); setSwimFormVisible(false) }}
          />
        )}

        {!swimFormVisible && (
          <Button
            onClick={() => setSwimFormVisible(true)}
            variant={"secondary"} size={"M"} rightIcon={"plus"} className={"w-full max-w-[350px]"}
          >
            Добавить заплыв
          </Button>
        )}
      </div>

      <div className={"flex h-1 w-full bg-base-5"}/>

      {/* BUTTONS */}
      <div className={"flex flex-col w-full gap-2 xs:flex-row xs:gap-8"}>
        <Button
          variant={"tertiary"} size={"M"} className={"w-full"} onClick={onCancel}
        >
          Отменить создание
        </Button>

        <Button
          onClick={() => state.createCompetition(onSuccess)}
          variant={"primary"} size={"M"} className={"w-full"} disabled={!state.isFormValid}
        >
          Создать
        </Button>
      </div>
    </div>
  )
}
