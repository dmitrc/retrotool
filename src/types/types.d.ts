import { Component, CSSProperties, Ref } from "react";


export interface IUserContext {
  alias?: string
}

export interface ItemProps {
  _id?: string,
  title?: string,
  date?: string,
  likes?: string[],
  dislikes?: string[]
  owner?: string,
  tags?: string[],
  actionItem?: string,
  notes?: string[],
  complete?: boolean,
  pinned?: boolean,
  new?: boolean
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

export interface RatingProps {
  likes?: string[],
  dislikes?: string[],
  onLike?: () => void,
  onDislike?: () => void
}

export interface PersonProps {
  alias?: string,
  edit?: boolean,
  onUpdate?: (v: string) => void
}

export interface ErrorProps {
  text: string
}

export interface SplitSettings {
  id: string,
  title: string,
  filter: (i: ItemProps) => boolean
}

export interface ItemListProps {
  filter?: (i: ItemProps) => boolean,
  sort?: (a: ItemProps, b: ItemProps) => number,
  split?: SplitSettings[]
}

export interface EditLabelProps {
  value?: string,
  placeholder?: string,
  edit?: boolean,
  className?: string,
  customView?: typeof Component,
  onUpdate?: (v: string) => void,
  onBlur?: (v: string) => void,
  inputRef?: Ref<any>
}

export interface EditListProps {
  title?: string,
  values?: string[],
  edit?: boolean,
  className?: string,
  itemClassName?: string,
  itemCustomView?: typeof Component,
  itemPlaceholder?: string,
  onUpdate?: (v: string[]) => void
}

export interface TagProps {
  value?: string
}