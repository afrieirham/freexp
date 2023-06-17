import React, { ReactNode } from "react";

function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="badge badge-primary badge-sm badge-outline rounded">
      {children}
    </div>
  );
}

export default Badge;
