import { createElement, useState, useRef } from "react";
import { EditListProps } from "../types/types";
import { EditLabel } from "../components/EditLabel";
import "./../styles/EditList.css";

const hash = (s: string) => {
  var hash = 0, i, chr;
  if (s == null) return null;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}

export const EditList = (props: EditListProps) => {
  const [updateValues, setUpdateValues] = useState(props.values || []);
  const addRef = useRef(null);

  let addValue = "";
  let uv = updateValues.slice();

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
    // TODO: Has hash collisions when adjacent items are the same
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

        { props.edit ? <EditLabel value="" edit={props.edit} className={"edititem " + (props.itemClassName || "")} customView={props.itemCustomView} placeholder={props.itemPlaceholder} onUpdate={handleAddUpdate} onBlur={handleAddBlur} inputRef={addRef} /> : null }
      </div>
    )
  }

  return null;
}