import { createElement, useState, useRef } from "react";
import { EditListProps } from "../types/types";
import { EditLabel } from "../components/EditLabel";
import "./../styles/EditList.css";

export const EditList = (props: EditListProps) => {
  const [updateValues, setUpdateValues] = useState(props.values || []);
  const addRef = useRef(null);
  let addValue = "";

  if (props.values || props.edit) {

    const handleUpdate = (i: number) => {
      return (v: string) => {
        const u = updateValues.slice();
        if (v && v.trim()) {
            u[i] = v;
        }
        else {
          u.splice(i, 1);
        }
        setUpdateValues(u);
        handleFlush(u);
      };
    }

    const handleAddUpdate = (v: string) => {
      addValue = v;
    }

    const handleAddBlur = () => {
      if (addValue && addValue.trim()) {
        const u = updateValues.slice();
        u.push(addValue.trim());
        setUpdateValues(u);
        handleFlush(u);
        
        addRef.current && (addRef.current.value = "");
        addValue = "";
      }
    }

    const handleFlush = (u: string[]) => {
      console.log(u);
      props.onUpdate && props.onUpdate(u);
    }

    const values = props.edit ? updateValues : props.values;
    return (
      <div className={"editlist " + (props.className || "")}>
        { props.title && !props.edit ? <span className="title">{props.title}:</span> : null }
        { values ? values.map((v,i) => {
            return (
              <div className="edititem" key={i}>
                <EditLabel value={v} edit={props.edit} className={props.itemClassName} customView={props.itemCustomView} placeholder={props.itemPlaceholder} onUpdate={handleUpdate(i)} />
              </div>
            );
          }) : null
        }

        { props.edit ? <EditLabel value="" edit={props.edit} className={"edititem " + (props.itemClassName || "")} customView={props.itemCustomView} placeholder={props.itemPlaceholder} onUpdate={handleAddUpdate} onBlur={handleAddBlur} inputRef={addRef} /> : null }
      </div>
    )
  }

  return null;
}