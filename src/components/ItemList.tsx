import { createElement, useEffect, useContext } from 'react';
import { ItemProps } from '../types/types';
import { Item } from './Item';
import { Loading } from './Loading';
import { Error } from './Error';
import { useSubscribe } from '../hooks/useSubscribe';
import { emit } from '../utils/Socket';
import "./../styles/ItemList.css";
import { filterAll } from '../utils/ItemFilter';
import { sortItem } from '../utils/ItemSort';
import { groupItems } from '../utils/ItemGroup';
import { UserContext } from '../contexts/UserContext';

export const ItemList = () => {
  const itemsRes = useSubscribe("items");
  const [user, setUser] = useContext(UserContext);
  
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
    let items = [...itemsRes.data] as ItemProps[];
    //items = items.filter(filterAll);
    items = items.sort(sortItem);
    
    let itemsGroups = groupItems(items, "active");
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