import { create } from "zustand/react";
import {User} from "@/entities/user";

type MembersState = {
  members: User[];
}

type MembersActions = {
  getMembers: () => void;
}

export const useMembersStore = create<MembersState & MembersActions>((set) => ({
  members: [],

  getMembers: () => {
    set({
      members: [{
        id: 0,
        firstName: "Иван", lastName: "Иванов", middleName: "Иванович", email: "ivanov@mail.ru", birthDate: "25-01-2003", emergencyPhone: "", phone: "", gender: "MALE", role: "sportsman"
      },{
        id: 1,
        firstName: "Иван", lastName: "Иванов", middleName: "Иванович", email: "ivanov@mail.ru", birthDate: "25-01-2003", emergencyPhone: "", phone: "", gender: "MALE", role: "sportsman"
      },{
        id: 2,
        firstName: "Иван", lastName: "Иванов", middleName: "Иванович", email: "ivanov@mail.ru", birthDate: "25-01-2003", emergencyPhone: "", phone: "", gender: "MALE", role: "sportsman"
      },{
        id: 3,
        firstName: "Иван", lastName: "Иванов", middleName: "Иванович", email: "ivanov@mail.ru", birthDate: "25-01-2003", emergencyPhone: "", phone: "", gender: "MALE", role: "sportsman"
      },{
        id: 4,
        firstName: "Иван", lastName: "Иванов", middleName: "Иванович", email: "ivanov@mail.ru", birthDate: "25-01-2003", emergencyPhone: "", phone: "", gender: "MALE", role: "sportsman"
      }]
    })
  }
}))