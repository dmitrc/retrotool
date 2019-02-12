import { createElement, useEffect, useContext, MouseEvent, useState } from 'react';
import { ItemProps } from '../types/types';
import { Item } from './Item';
import { Loading } from './Loading';
import { Error } from './Error';
import { useSubscribe } from '../hooks/useSubscribe';
import { emit } from '../utils/Socket';
import { filterItems } from '../utils/ItemFilter';
import { sortItems } from '../utils/ItemSort';
import { groupItems } from '../utils/ItemGroup';
import { UserContext } from '../contexts/UserContext';
import "./../styles/ItemList.css";

export const ItemList = () => {
  const itemsRes = useSubscribe("items");
  const [user, setUser] = useContext(UserContext);
  const [hiddenGroups, setHiddenGroups] = useState([]);

  useEffect(() => {
    emit("getItems");
  }, []);

  useEffect(() => {
    setHiddenGroups([]);
  }, [user && user.groupBy])

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
    
    const filterBy = (user && user.filterBy) || null;
    items = filterItems(items, filterBy, user && user.alias);

    const sortBy = (user && user.sortBy) || null;
    items = sortItems(items, sortBy);
    
    const groupBy = (user && user.groupBy) || null;
    let itemsGroups = groupItems(items, groupBy);

    const handleTitle = (id: string) => {
      return () => {
        const hg = [...hiddenGroups];
        const gi = hg.indexOf(id);

        if (gi > -1) {
          hg.splice(gi, 1);
        }
        else {
          hg.push(id);
        }

        setHiddenGroups(hg);
      }
    }

    if (items.length > 0) {
      return (
        <div className="itemroot">
          { itemsGroups.map(g => {
            const { id, title } = g;
            const isVisible = hiddenGroups.indexOf(id) == -1;
            return (
              <div className="itemlist" key={id}>
                { g.title ? <span className="title" onClick={handleTitle(id)}>{title}</span> : null}
                { isVisible ? <div className="itemcont">
                  { g.items.map(item => 
                    <Item {...item} key={item._id} />
                  )}
                </div> : null }
              </div>
            )
          }) }
        </div>
      )
    }
  }

  return null;
}