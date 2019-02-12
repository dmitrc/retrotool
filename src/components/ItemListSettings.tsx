import { createElement, ChangeEvent, useContext } from 'react';
import { sortMap } from '../utils/ItemSort';
import { UserContext } from '../contexts/UserContext';
import { filterMap } from '../utils/ItemFilter';
import { groupMap } from '../utils/ItemGroup';
import "./../styles/ItemListSettings.css";

export const ItemListSettings = () => {
  const [user, setUser] = useContext(UserContext);

  const sortKeys = Object.keys(sortMap);
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target && e.target.value;
    if (v) {
      const u = {...user};
      u.sortBy = v;
      setUser(u);
    }
  }

  const groupKeys = Object.keys(groupMap);
  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target && e.target.value;
    if (v) {
      const u = {...user};
      u.groupBy = v;
      setUser(u);
    }
  }

  const filterKeys = Object.keys(filterMap);
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target && e.target.value;
    if (v) {
      const u = {...user};
      u.filterBy = v;
      setUser(u);
    }
  }

  return (
    <div className="itemlistpref">
      <div className="sortpref">
        <span>Sort by: </span>
        <select onChange={handleSortChange} defaultValue={(user && user.sortBy) || "rating"}>
          { sortKeys.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="grouppref">
        <span>Group by: </span>
        <select onChange={handleGroupChange} defaultValue={(user && user.groupBy) || "active"}>
          { groupKeys.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="filterpref">
        <span>Filter by: </span>
        <select onChange={handleFilterChange} defaultValue={(user && user.filterBy) || "none"}>
          { filterKeys.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
    </div>
  )
}