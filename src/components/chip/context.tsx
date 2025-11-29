import { createContext } from "react";
import type { ChipContextValue } from "./type";

export const ChipContext = createContext<ChipContextValue | null>(null);
