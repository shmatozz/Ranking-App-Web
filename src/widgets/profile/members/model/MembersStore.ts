import { create } from "zustand/react";
import {UserShort} from "@/entities/user";
import {getOrganizationInfo, useOrganizationStore} from "@/entities/organization";
import {emailExist} from "@/shared/api/common";
import {addUserWithOutInvite, CreateUserForOrganization, createUserForOrganization} from "@/features/organization-join";

type MembersState = {
  members: UserShort[] | undefined;
  addUserError?: string;
  createUserError?: string;
  isLoading: boolean;
  hasError: boolean;
}

type MembersActions = {
  getMembers: () => void;
  addUserWithOutInvite: (formData: FormData, callback?: () => void) => void;
  createUser: (formData: FormData, callback?: () => void) => void;
  clearErrors: () => void;
}

export const useMembersStore = create<MembersState & MembersActions>((set) => ({
  members: undefined,
  isLoading: false,
  hasError: false,

  getMembers: () => {
    const org = useOrganizationStore.getState().organization;

    if (org && org.users) {
      set({ members: org.users });
    } else {
      set({ isLoading: true, hasError: false })

      getOrganizationInfo()
        .then((organization) => {
          set({ members: organization.users })
        })
        .catch(() => set({ hasError: true }))
        .finally(() => set({ isLoading: false }))
    }
  },

  addUserWithOutInvite: (formData, callback) => {
    const email = formData.get("email") as string
    emailExist(email)
      .then((isExist) => {
        if (isExist) {
          addUserWithOutInvite([email])
            .then((response) => {
              if (!response && callback) callback();
              getOrganizationInfo()
                .then((organization) => {
                  set({ members: organization.users })
                })
            })
        } else {
          set({ addUserError: "Пользователь не найден" })
        }
      })
  },

  createUser: (formData, callback) => {
    const email = formData.get("email") as string
    emailExist(email)
      .then((isExist) => {
        if (!isExist) {
          const user: CreateUserForOrganization = {
            email: formData.get("email") as string,
            emergencyPhone: formData.get("emergencyPhone") as string,
            lastName: formData.get("lastName") as string,
            firstName: formData.get("firstName") as string,
            middleName: formData.get("middleName") as string,
            birthDate: formData.get("birthDate") as string,
            gender: formData.get("gender") as "MALE" | "FEMALE",
            isNeedGeneratePassword: (formData.get("isNeedGeneratePassword") as string) == "on",
          }

          if (formData.get("password")) user.password = formData.get("password") as string
          if (formData.get("confirmPassword")) user.confirmPassword = formData.get("confirmPassword") as string

          console.log((formData.get("isNeedGeneratePassword") as string) == "on")

          createUserForOrganization(user)
            .then((response) => {
              if (response && response.data) {
                alert("Данные для нового пользователя:\n" + "email: " + response.data.email + "\n" + "пароль: " + response.data.password);

                if (callback) callback();
                getOrganizationInfo()
                  .then((organization) => {
                    set({ members: organization.users })
                  })
              } else if (response && response.error) {
                set({ createUserError: response.error })
              }
            })
        } else {
          set({ addUserError: "Пользователь с такой почтой уже существует" })
        }
      })
  },

  clearErrors: () => {
    set({ hasError: false, addUserError: undefined, createUserError: undefined })
  }
}))
