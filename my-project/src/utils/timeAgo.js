import React from "react";
import { formatDistanceToNow } from "date-fns";

function TimeAgo({ timestamp }) {
  const date = new Date(timestamp);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  return (
    
      <span className="font-normal"> {relativeTime}</span>
    
  );
}
export default TimeAgo;
