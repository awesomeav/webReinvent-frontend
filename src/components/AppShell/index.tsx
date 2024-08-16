import React from "react";
import clsx from "clsx";

type AppProps = {
  children: React.ReactNode;
  showNavbar?: boolean;
};

const AppShell: React.FC<AppProps> = ({ children, showNavbar = true }) => {
  const wraperStyle = clsx({
    "flex w-full justify-center h-[calc(100%-64px)]": true,
  });

  return (
    <div className="bg-neutral-100 h-screen overflow-y-auto">
      <div className={wraperStyle}>
        <div className={"w-full"}>{children}</div>
      </div>
    </div>
  );
};

export default AppShell;
