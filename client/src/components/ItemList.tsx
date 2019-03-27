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
import { RefreshData } from './RefreshData';
import { getDate } from "../utils/Date";

export const ItemList = () => {
  const [user, setUser] = useContext(UserContext);
  const [itemsRes, needsUpdate, update] = useSubscribe("items", user && user.live);
  const [addedItem] = useSubscribe("addedItem", true);
  const [editedItem] = useSubscribe("editedItem", true);
  const [deletedItem] = useSubscribe("deletedItem", true);
  const [localItems, setLocalItems] = useState([] as ItemProps[]);
  const [hiddenGroups, setHiddenGroups] = useState([]);

  useEffect(() => {
    emit("getItems");
  }, []);

  useEffect(() => {
    setHiddenGroups([]);
  }, [user.groupBy]);

  useEffect(() => {
    if (itemsRes && !itemsRes.error && itemsRes.data) {
      setLocalItems(itemsRes.data);
    }
  }, [itemsRes]);

  const handleLocalUpdate = (id: string, update: ItemProps) => {
    if (user.live) {
      // This update will be picked up by live updater -> no action needed
      return;
    }

    let items = [...localItems];
    const affectedItems = items.filter(i => i._id == id);

    if (affectedItems.length == 0) {
      // No items, add a new one
      const item = {...update, new: false};
      items.push(item);
    }
    else if (affectedItems.length == 1) {
      // Modify an existing item
      const item = {...affectedItems[0], ...update};
      items.splice(items.indexOf(affectedItems[0]), 1);
      items.push(item);
    }
    
    setLocalItems(items);
  }

  const handleLocalDelete = (id: string) => {
      if (user.live) {
        // This update will be picked up by live updater -> no action needed
        return;
      }

    let items = [...localItems];
    const affectedItems = items.filter(i => i._id == id);

    if (affectedItems.length == 1) {
      // Delete an existing item
      items.splice(items.indexOf(affectedItems[0]), 1);
    }
    
    setLocalItems(items);
  }

  useEffect(() => {
    if (addedItem != null) {
      handleLocalUpdate(addedItem._id, addedItem);
    }
  }, [addedItem]);

  useEffect(() => {
    if (editedItem != null) {
      handleLocalUpdate(editedItem._id, editedItem);
    }
  }, [editedItem]);

  useEffect(() => {
    if (deletedItem != null) {
      handleLocalDelete(deletedItem);
    }
  }, [deletedItem]);

  if (!itemsRes) {
    return <Loading />;
  }
  if (itemsRes.error) {
    return (
      <Error text={itemsRes.error} />
    )
  }
  if (localItems) {
    let items = [...localItems] as ItemProps[];
    
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
          { needsUpdate 
            ? <RefreshData onClick={update} /> 
            : null }
          
          <Item new={true} date={getDate()} />
          
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