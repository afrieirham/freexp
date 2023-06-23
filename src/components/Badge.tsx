import React, { ReactNode } from "react";

function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="badge badge-secondary badge-sm rounded">{children}</div>
  );
}

export default Badge;
