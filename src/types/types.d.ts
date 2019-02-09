import { Component, CSSProperties } from "react";

export interface ItemProps {
  _id: string,
  title: string,
  date: string,
  rating?: number,
  owner?: string,
  tags?: string[],
  actionItem?: string,
  notes?: string[],
  complete?: boolean
}

export interface IconProps {
  style?: CSSProperties,
  fontSize?: string,
  color?: string,
  rotate?: boolean,
  shake?: boolean,
  beat?: boolean,
  onClick?: () => void
}

export interface IconButtonProps {
  className?: string,
  icon?: typeof Component,
  options?: IconProps,
  text?: string,
  onClick?: () => void
}

export const enum RatingStatus {
  NotSet,
  Dislike,
  Like 
}

export interface RatingProps {
  value?: number,
  onChange?: (status: RatingStatus, prevStatus?: RatingStatus) => void
}

export interface PersonProps {
  alias?: string,
  fallback?: string
}

export interface ErrorProps {
  text: string
}

export interface ItemListProps {
  filter?: (i: ItemProps) => boolean,
  sort?: (a: ItemProps, b: ItemProps) => number
}

export interface TagProps {
  name: string
}