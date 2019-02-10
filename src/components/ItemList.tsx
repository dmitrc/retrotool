import { createElement, useEffect } from 'react';
import { ItemProps, ItemListProps } from '../types/types';
import { Item } from './Item';
import { Loading } from './Loading';
import { Error } from './Error';
import { useSocket } from './../hooks/useSocket';
import { emit } from '../socket';
import "./../styles/ItemList.css";

export const ItemList = (props: ItemListProps) => {
  const itemsRes = useSocket("items");

  useEffect(() => {
    emit("getItems");
  }, []);

  if (!itemsRes) {
    return !props.silentLoad ? <Loading /> : null;
  }
  if (itemsRes.error) {
    return (
      <Error text={itemsRes.error} />
    )
  }
  if (itemsRes.data) {
    let items = itemsRes.data as ItemProps[];

    if (props.filter) {
      items = items.filter(props.filter);
    }

    if (props.sort) {
      items = items.sort(props.sort);
    }

    if (items.length > 0 || props.showIfEmpty) {
      return (
        <div className="itemlist">
          { props.title ? <span className="title">{props.title}</span> : null}
          {items.map(item => 
            <Item {...item} key={item._id} />
          )}
        </div>
      )
    }
  }

  return null;
}