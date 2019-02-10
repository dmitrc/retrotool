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
    return <Loading />;
  }
  if (itemsRes.error) {
    return (
      <Error text={itemsRes.error} />
    )
  }
  if (itemsRes.data) {
    let items = itemsRes.data as ItemProps[];
    let itemsGroups = [];

    if (props.filter) {
      items = items.filter(props.filter);
    }

    if (props.sort) {
      items = items.sort(props.sort);
    }

    if (props.split) {
      props.split.forEach(c => {
        const gi = items.filter(c.filter);
        if (gi && gi.length > 0) {
          itemsGroups.push({ id: c.id, title: c.title, items: gi});
        }
      });
    }
    else {
      itemsGroups.push({ id: "main", title: null, items: items });
    }

    if (items.length > 0) {
      return (
        <div className="itemroot">
          { itemsGroups.map(g => 
            <div className="itemlist" key={g.id}>
              { g.title ? <span className="title">{g.title}</span> : null}
              { g.items.map(item => 
                <Item {...item} key={item._id} />
              )}
            </div>
          )}
        </div>
      )
    }
  }

  return null;
}