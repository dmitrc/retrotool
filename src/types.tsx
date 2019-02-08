import { Component, CSSProperties } from "react";

export interface ItemProps {
  id: number,
  title: string,
  date: string,
  rating?: number,
  owner?: string,
  tags?: TagProps[],
  actionItem?: string,
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

export enum RatingStatus {
  NotSet,
  Dislike,
  Like 
}

export interface RatingProps {
  value?: number,
  onChange?: (status: RatingStatus) => void
}

export interface PersonProps {
  alias?: string,
  fallback?: string
}

export interface TagProps {
  name: string,
  color?: string
}

export interface ErrorProps {
  msg: string
}

export interface ItemListProps {
  filter?: (i: ItemProps) => boolean
}