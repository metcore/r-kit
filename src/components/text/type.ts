import type React from "react";
import type { AlignMent, ColorVariant } from "../types/ui";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p1"
  | "p2"
  | "p3"
  | "t1"
  | "t2"
  | "t3"
  | "t4";

export interface TextBaseProps {
  as?: React.ElementType;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: ColorVariant;
  align?: AlignMent;
  numberOfLines?: 1 | 2 | 3 | 4;
  className?: string;
}

export interface TextWithChildren extends TextBaseProps {
  children: React.ReactNode;
  value?: never;
}

export interface TextWithValue extends TextBaseProps {
  value: string;
  children?: never;
}

export type TextProps = TextWithChildren | TextWithValue;
