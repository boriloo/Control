import { useUser } from "../context/AuthContext";

export type BasicFilter = 'off' | 'low' | 'high'
export type ColorFilter = 'color' | 'gray'

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  filterDark: BasicFilter,
  filterBlur: BasicFilter,
  filterColor: ColorFilter,
}

export interface LoginData {
  email: string;
  password: string;
}



export const returnFilterEffects = () => {
  const { user } = useUser();
  if (!user) return "bosta";
  let classes = "";

  switch (user.filterDark) {
    case "low":
      classes += " bg-black/40";
      break;
    case "high":
      classes += " bg-black/90";
      break;
  }

  switch (user.filterBlur) {
    case "low":
      classes += " backdrop-blur-[4px]";
      break;
    case "high":
      classes += " backdrop-blur-[10px]";
      break;
  }

  switch (user.filterColor) {
    case "gray":
      classes += " backdrop-saturate-0";
      break;
  }

  console.log('classes: ', classes)

  return classes.trim();
};