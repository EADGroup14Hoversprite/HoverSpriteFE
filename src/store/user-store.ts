import { create } from "zustand";
import { IUser } from "@/types/user";

type UserState = {
  currentUser: IUser | undefined;
};

type UserAction = {
  setCurrentUser: (user: IUser | undefined) => void;
  logout: () => void;
  login: (user: IUser | undefined) => void;
};

type UserStore = UserState & UserAction;

export const useUserStore = create<UserStore>(
  (set): UserStore => ({
    currentUser: undefined,
    setCurrentUser: (user: IUser | undefined) => set({ currentUser: user }),
    logout: () => set({ currentUser: undefined }),
    login: (user: IUser | undefined) =>
      set((state) => {
        return { ...state, currentUser: user };
      }),
  }),
);
