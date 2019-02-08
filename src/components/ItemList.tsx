import { createElement } from 'react';
import { ItemProps } from './../types';
import { Item } from './Item';
import { useFetch } from './../hooks/useFetch';

export const ItemList = () => {
  let { data, loading, error } = useFetch<ItemProps[]>('http://localhost:3000/items');
  if (loading) {
    return <div className="loading">Loading items...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (data) {
    return <div>{ data.map(item => <Item {...item} key={item.id} />) }</div>;
  }
  return null;
}