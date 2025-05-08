import React from "react";
import {Trainer, TrainerCreateForm, useTrainerCreateStore} from "@/features/training-map";
import {Icon, IconButton, ImageLoader} from "@/shared/ui";

interface TrainerCardProps {
  trainer: Trainer;
  admin?: boolean;
}

export const TrainerCard: React.FC<TrainerCardProps> = (
  props
) => {
  const [editFromVisible, setEditFromVisible] = React.useState(false);
  const { updateTrainer } = useTrainerCreateStore();

  return (
    <div
      key={props.trainer.id}
      className="flex flex-col w-full max-w-[350px] gap-2 flex-shrink-0 snap-center rounded-lg xs:flex-row"
    >
      <div className={"flex flex-col items-center gap-4"}>
        {props.trainer.image && (
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <ImageLoader imagePath={props.trainer.image} className="h-20 w-20 object-cover"/>
          </div>
        )}

        {!props.trainer.image && (
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-base-5 overflow-hidden">
            <Icon name={"photo"} size={32} color={"#B0B0B0"}/>
          </div>
        )}

        {props.admin && (
          <IconButton
            icon={"edit"} variant={"tertiary"} size={"S"}
            onClick={() => setEditFromVisible(true)}
          />
        )}
      </div>

      <div className="flex flex-col justify-center gap-1">
        <p className="text-bodyM_regular text-base-95">
          {`${props.trainer.lastName} ${props.trainer.firstName} ${props.trainer.middleName}`}
        </p>
        {props.trainer.education && (
          <p className="text-bodyS_regular text-base-95 whitespace-pre-wrap">
            <b>{"Образование\n"}</b>
            {props.trainer.education}
          </p>
        )}

        {props.trainer.specialization && (
          <p className="text-bodyS_regular text-base-95 whitespace-pre-wrap">
            <b>{"Специализация\n"}</b>
            {props.trainer.specialization}
          </p>
        )}

        {props.trainer.achievements && (
          <p className="text-bodyS_regular text-base-95 whitespace-pre-wrap">
            <b>{"Достижения\n"}</b>
            {props.trainer.achievements}
          </p>
        )}
      </div>

      {editFromVisible && (
        <TrainerCreateForm
          onSubmit={(data) => { updateTrainer(data, props.trainer.id, () => setEditFromVisible(false)) }}
          onCancel={() => setEditFromVisible(false)}
          predefinedData={props.trainer}
        />
      )}
    </div>
  )
}
