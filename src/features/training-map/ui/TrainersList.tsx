import React, {useEffect} from "react";
import {Trainer, getTrainers, TrainerCard} from "@/features/training-map";
import {Icon} from "@/shared/ui";
import {TrainerCreateForm, useTrainerCreateStore} from "@/features/training-map";

interface TrainersListProps {
  coordinateId: number;
  selected?: boolean;
  admin?: boolean;
}

export const TrainersList: React.FC<TrainersListProps> = (
  props
) => {
  const [trainers, setTrainers] = React.useState<Trainer[]>();
  const [formVisible, setFormVisible] = React.useState<boolean>();

  const { createTrainer } = useTrainerCreateStore()

  useEffect(() => {
    if (!trainers) {
      getTrainers({ coordinateId: props.coordinateId })
        .then((response) => {
          if (response.data) setTrainers(response.data.content);
        })
    }
  }, [trainers, setTrainers, props.coordinateId]);

  return (
    <>
      {trainers && trainers.length > 0 && (
        <div
          className={`flex w-full justify-center cursor-pointer transition-all ${props.selected ? "rotate-180" : "rotate-0"}`}
        >
          <Icon name="chevronDown" color="gray"/>
        </div>
      )}

      <div
        className={`flex flex-col gap-2 transition-all overflow-hidden ${
          props.selected ? "h-fit opacity-100" : "h-0 opacity-0"
        }`}
      >
        {trainers && trainers.length > 0 && (
          <p className={"text-bodyM_medium text-base-95"}>Тренеры</p>
        )}

        <div
          className="flex flex-col xs:flex-row gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full items-center">
          {trainers?.map((item) => <TrainerCard key={item.id} trainer={item} admin={props.admin}/>)}

          {props.admin && (
            <div
              className="flex flex-col justify-center items-center bg-base-5 border-2 border-base-10 rounded-2xl h-[100px] w-[200px] flex-shrink-0 snap-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setFormVisible(true);
              }}
            >
              <p className={"text-bodyS_regular text-base-70"}>Добавить тренера</p>
              <Icon name="plus" size={20} color="#B0B0B0"/>
            </div>
          )}

          {formVisible && (
            <TrainerCreateForm
              onSubmit={(data) => createTrainer(data, props.coordinateId, () => setFormVisible(false))}
              onCancel={() => setFormVisible(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}
