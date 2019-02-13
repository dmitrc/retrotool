import { createElement, useState, useRef, useEffect } from "react";
import { EditListProps } from "../types/types";
import { EditLabel } from "./EditLabel";
import { hash } from "../utils/Hash";
import "./../styles/EditList.css";

export const EditList = (props: EditListProps) => {
  const [updateValues, setUpdateValues] = useState(props.values || []);
  const addRef = useRef(null);

  let uv = [...updateValues];

  useEffect(() => {
    if (!props.edit) {
      setUpdateValues([]);
    }
    else {
      setUpdateValues(props.values || []);
    }
  }, [props.edit]);

  if (props.values || props.edit) {

    const handleUpdate = (i: number) => {
      return (v: string) => {
        if (v && v.trim()) {
            uv[i] = v;
        }
        else {
          uv.splice(i, 1);
        }
      };
    }

    const handleBlur = () => {
      setUpdateValues(uv);
      handleFlush(uv);
      uv = [];
    }

    const handleAddBlur = (v: string) => {
      if (v && v.trim()) {
        const u = [...updateValues];
        u.push(v.trim());
        setUpdateValues(u);
        handleFlush(u);
        
        addRef.current && (addRef.current.value = "");
      }
    }

    const handleFlush = (u: string[]) => {
      props.onUpdate && props.onUpdate(u);
    }

    const values = props.edit ? updateValues : props.values;
    // WARN: Has hash collisions (and subseq input element reuse) when adjacent items are the same and top one is removed
    return (
      <div className={"editlist " + (props.className || "")}>
        { props.title && props.values && props.values.length > 0 && !props.edit ? <span className="title">{props.title}:</span> : null }
        { values ? values.map((v,i) => {
            return (
              <div className="edititem" key={hash(i+v)}>
                <EditLabel value={v} edit={props.edit} className={props.itemClassName} customView={props.itemCustomView} placeholder={props.itemPlaceholder} onUpdate={handleUpdate(i)} onBlur={handleBlur} />
              </div>
            );
          }) : null
        }

        { props.edit ? <EditLabel value="" edit={props.edit} className={"edititem " + (props.itemClassName || "")} customView={props.itemCustomView} placeholder={props.itemPlaceholder} onBlur={handleAddBlur} inputRef={addRef} /> : null }
      </div>
    )
  }

  return null;
}