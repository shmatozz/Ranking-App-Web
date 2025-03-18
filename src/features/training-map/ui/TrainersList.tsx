import React, {useEffect} from "react";
import {Trainer} from "@/features/training-map/model/types/trainers.types";
import {getTrainers} from "@/features/training-map/api/TrainersService";
import {Icon, ImageLoader} from "@/shared/ui";
import {TrainerCreateForm, useTrainerCreateStore} from "@/features/training-map";

interface TrainersListProps {
  coordinateId: number;
  admin?: boolean;
}

export const TrainersList: React.FC<TrainersListProps> = (
  props
) => {
  const [trainers, setTrainers] = React.useState<Trainer[]>();

  const { formVisible, setFormVisible, createTrainer } = useTrainerCreateStore()

  useEffect(() => {
    if (!trainers) {
      getTrainers({ coordinateId: props.coordinateId })
        .then((response) => {
          console.log(response)
          if (response.data) setTrainers(response.data.content);
        })
    }
  }, [trainers, setTrainers, props.coordinateId]);

  return (
    <>
      {trainers && trainers.length > 0 && (
        <p className={"text-bodyM_medium text-base-95"}>Тренеры</p>
      )}

      <div className="flex flex-col xs:flex-row gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full items-center">
        {trainers?.map((item) => (
          <div
            key={item.id}
            className="flex flex-row w-[300px] gap-2 flex-shrink-0 snap-center rounded-lg"
          >
            {item.image && (
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <ImageLoader imagePath={item.image} className="h-16 w-16 object-cover"/>
              </div>
            )}

            <div className="flex flex-col justify-center">
              <p className="text-bodyM_regular text-base-95">
                {`${item.lastName} ${item.firstName} ${item.middleName}`}
              </p>
              <p className="text-bodyS_regular text-base-95">{item.description}</p>
            </div>
          </div>
        ))}

        {props.admin && (
          <div
            className="flex justify-center items-center bg-base-5 border-2 border-base-10 rounded-2xl h-[50px] w-[200px] flex-shrink-0 snap-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setFormVisible(true);
            }}
          >
            <Icon name="plus" size={20} color="#B0B0B0"/>
          </div>
        )}

        {formVisible && (
          <TrainerCreateForm
            onSubmit={(data) => createTrainer(data, props.coordinateId)}
            onCancel={() => setFormVisible(false)}
          />
        )}
      </div>
    </>
  )
}
