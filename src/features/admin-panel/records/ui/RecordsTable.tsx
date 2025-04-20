import {useEffect, useState} from "react";
import {genderDropDown, swimStylesDropdown, useRecordsTableStore} from "@/features/admin-panel/records";
import {RecordModal} from "@/features/admin-panel/records";
import {Button, Dropdown, Paging, TextInput} from "@/shared/ui";
import {DropdownItem} from "@/shared/ui/Input/Dropdown";

export const RecordsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    records, page,
    totalPages, totalResults,
    filters,
    isLoading,
    setPage, setFilters, fetchRecords, setSelectedRecord,
  } = useRecordsTableStore();

  useEffect(() => {
    fetchRecords();
  }, [page, filters, fetchRecords]);

  const handleFilterChange = (field: keyof typeof filters, value: string | number | DropdownItem) => {
    if (value === "RESET") {
      setFilters({ [field]: undefined });
    } else {
      setFilters({ [field]: value });
    }

    setPage(0);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-row w-full gap-4 items-center">
        <TextInput
          title={"Дистанция (м)"} type={"number"} animatedLabel={false}
          value={filters.distance ?? ""}
          onChange={(e) => handleFilterChange("distance", Number(e.target.value))}
        />

        <Dropdown
          items={swimStylesDropdown}
          onItemSelected={(e) => handleFilterChange("style", e.id === "RESET" ? "RESET" : e)}
          placeholder={"Стиль плаванья"}
          selectedItems={filters.style ? [filters.style] : []}
        />

        <Dropdown
          items={genderDropDown}
          onItemSelected={(e) => handleFilterChange("gender", e.id === "RESET" ? "RESET" : e)}
          placeholder={"Пол"}
          selectedItems={filters.gender ? [filters.gender] : []}
        />
      </div>


      <Button
        variant={"primary"} size={"S"} leftIcon={"plus"}
        className={"mx-auto w-full max-w-[250]"}
        onClick={() => {
          setSelectedRecord(null);
          setIsModalOpen(true);
        }}
      >
        Добавить запись
      </Button>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm">
          <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Дистанция</th>
            <th className="border p-2">Стиль</th>
            <th className="border p-2">Пол</th>
            <th className="border p-2">Время</th>
            <th className="border p-2">Действия</th>
          </tr>
          </thead>
          <tbody>
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="border p-2">{record.distance}</td>
              <td className="border p-2">{record.style}</td>
              <td className="border p-2">{record.gender}</td>
              <td className="border p-2">{record.time}</td>
              <td className="border p-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setSelectedRecord(record);
                    setIsModalOpen(true);
                  }}
                >
                  Редактировать
                </button>
              </td>
            </tr>
          ))}
          {records.length === 0 && !isLoading && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Нет записей
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <Paging
        page={page} totalPages={totalPages} totalResults={totalResults}
        onPagePress={(page) => setPage(page)}
        onNextPress={() => setPage(page + 1)}
      />

      {isLoading && <div className="text-center text-gray-500">Загрузка...</div>}

      {isModalOpen && (
        <RecordModal onClose={() => setIsModalOpen(false)}/>
      )}
    </div>
  );
};
