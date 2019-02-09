import { createElement, useEffect } from 'react';
import { ItemProps, ItemListProps } from '../types/types';
import { Item } from './Item';
import { Loading } from './Loading';
import { Error } from './Error';
import { useFetch } from './../hooks/useFetch';
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

    items = items.sort((a, b) => {
      return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
    });

    return (
      <div>
        {items.map(item => 
          <Item {...item} key={item.id} />
        )}
      </div>
    )
  }
  return null;
}