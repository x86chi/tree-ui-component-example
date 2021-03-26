import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

type ContextValue = Dispatch<SetStateAction<string>>;

const stateContext = createContext<ContextValue | null>(null);

export const { Provider } = stateContext;

export function useSelectedPath() {
  const state = useContext(stateContext);

  if (state === null) throw Error("Provider 에서 상태를 찾지 못했습니다.");

  return state;
}
