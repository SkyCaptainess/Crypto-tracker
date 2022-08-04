import { atom } from "recoil";

// atom(key, 기본값)
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
