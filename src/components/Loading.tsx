import { createElement } from 'react';
import './../styles/Loading.css';
import * as MdRefresh from 'react-ionicons/lib/MdRefresh';

export const Loading = () => {
  return (
    <div className="loading">
      <MdRefresh fontSize="32px" rotate={true} />
      <span>Loading items...</span>
    </div>
  )
}