import { useEffect, useState } from "react";
import {genderDropDown, swimStylesDropdown, TimeInput, useRecordsTableStore} from "@/features/admin-panel/records";
import {Button, Dropdown, TextInput} from "@/shared/ui";

const emptyTime: TimeInput = { hour: 0, minute: 0, second: 0, nano: 0 };

export const RecordModal = ({ onClose }: { onClose: () => void }) => {
  const { selectedRecord, updateRecord, createRecord, isLoading } = useRecordsTableStore();

  const isEdit = !!selectedRecord;

  const [distance, setDistance] = useState<number>(selectedRecord?.distance ?? 50);
  const [style, setStyle] = useState<{ id: string, name: string } | undefined>();
  const [gender, setGender] = useState<{ id: string, name: string } | undefined>();
  const [time, setTime] = useState<TimeInput>(emptyTime);

  useEffect(() => {
    if (selectedRecord) {
      const [hh, mm, ssNano] = selectedRecord.time.split(":");
      const [ss, nanoStr] = ssNano.split(".");
      const nano = parseInt(nanoStr.padEnd(9, "0"), 10);
      setTime({
        hour: parseInt(hh, 10),
        minute: parseInt(mm, 10),
        second: parseInt(ss, 10),
        nano: nano,
      });
    }
  }, [selectedRecord]);

  const handleSubmit = async () => {
    if (isEdit) {
      updateRecord(selectedRecord!.id, time)
    } else {
      createRecord(distance, style!.name, gender!.id as "MALE" | "FEMALE", time);
    }

    onClose();
  };

  return (
    <div className="fixed -inset-4 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">
          {isEdit ? "Редактировать запись" : "Добавить новую запись"}
        </h2>

        {!isEdit && (
          <>
            <TextInput
              title={"Дистанция (м)"} type={"number"}
              value={distance ?? ""}
              onChange={(e) => setDistance(Number(e.target.value))}
            />

            <Dropdown
              items={swimStylesDropdown}
              onItemSelected={(e) => setStyle( e.id === "RESET" ? undefined : e)}
              placeholder={"Стиль плаванья"}
              selectedItems={style ? [style] : []}
            />

            <Dropdown
              items={genderDropDown}
              onItemSelected={(e) => setGender(e.id === "RESET" ? undefined : e)}
              placeholder={"Пол"}
              selectedItems={gender ? [gender] : []}
            />
          </>
        )}

        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="block text-xs font-medium">Часы</label>
            <input
              type="number"
              value={time.hour}
              onChange={(e) => setTime({ ...time, hour: +e.target.value })}
              className="border p-2 rounded w-full"
              min={0}
            />
          </div>
          <div>
            <label className="block text-xs font-medium">Минуты</label>
            <input
              type="number"
              value={time.minute}
              onChange={(e) => setTime({ ...time, minute: +e.target.value })}
              className="border p-2 rounded w-full"
              min={0}
            />
          </div>
          <div>
            <label className="block text-xs font-medium">Секунды</label>
            <input
              type="number"
              value={time.second}
              onChange={(e) => setTime({ ...time, second: +e.target.value })}
              className="border p-2 rounded w-full"
              min={0}
            />
          </div>
          <div>
            <label className="block text-xs font-medium">Наносек.</label>
            <input
              type="number"
              value={time.nano}
              onChange={(e) => setTime({ ...time, nano: +e.target.value })}
              className="border p-2 rounded w-full"
              min={0}
              step={1000}
            />
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-2">
          <Button
            variant={"tertiary"} size={"S"}
            onClick={onClose}
            disabled={isLoading}
          >
            Отмена
          </Button>

          <Button
            variant={"primary"} size={"S"}
            onClick={handleSubmit}
            disabled={isLoading || ((!style || !gender) && !isEdit)}
          >
            {isEdit ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </div>
    </div>
  );
};
