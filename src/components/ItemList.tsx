import { createElement, useEffect } from 'react';
import { ItemProps, ItemListProps } from '../types/types';
import { Item } from './Item';
import { Loading } from './Loading';
import { Error } from './Error';
import { useSocket } from './../hooks/useSocket';
import { emit } from '../socket';

export const ItemList = (props: ItemListProps) => {
  const itemsRes = useSocket("items");

  useEffect(() => {
    emit("getItems");
  }, []);

  if (!itemsRes) {
    return (
      <Loading />
    )
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

    return (
      <div>
        {items.map(item => 
          <Item {...item} key={item._id} />
        )}
      </div>
    )
  }
  return null;
}