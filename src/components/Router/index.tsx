import { Suspense } from "react";

import { RouterProvider } from "react-router-dom";
import routers from "./config";

const Routers = () => {
  return (
    <Suspense>
      <RouterProvider router={routers} />
    </Suspense>
  );
};

export default Routers;
