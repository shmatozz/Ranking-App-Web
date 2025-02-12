import { create } from "zustand/react";
import {User} from "@/entities/user";
import {useOrganizationStore} from "@/entities/organization";

type MembersState = {
  members: User[] | undefined;
  isLoading: boolean;
  hasError: boolean;
}

type MembersActions = {
  getMembers: () => void;
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

      useOrganizationStore.getState().getOrganizationInfo(() => {
        set({ members: useOrganizationStore.getState().organization?.users, isLoading: false, hasError: false });
      })
    }
  }
}))
