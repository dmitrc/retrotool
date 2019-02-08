import { createElement } from 'react';
import { ItemProps, ItemListProps } from './../types';
import { Item } from './Item';
import { Loading } from './Loading';
import { Error } from './Error';
import { useFetch } from './../hooks/useFetch';

export const ItemList = (props: ItemListProps) => {
  let { data, loading, error } = useFetch<ItemProps[]>('http://localhost:3000/items');

  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return (
      <Error msg={error} />
    )
  }
  if (data) {
    const items = props.filter ? data.filter(props.filter) : data;
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