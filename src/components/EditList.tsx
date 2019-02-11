import { createElement, useState, useRef, useEffect } from "react";
import { EditListProps } from "../types/types";
import { EditLabel } from "./EditLabel";
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

  let uv = updateValues.slice();

  useEffect(() => {
    if (!props.edit) {
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
        const u = updateValues.slice();
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
    // TODO: Has hash collisions when adjacent items are the same
    // TODO: Update values persist in edit mode but should not
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