import { CSSProperties } from "react";

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

export interface TagProps {
  name: string,
  color: string
}

export interface IconButtonProps {

}