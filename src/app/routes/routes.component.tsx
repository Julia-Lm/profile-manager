import { Route, Routes } from "react-router-dom";
import { ROUTES } from "app/routes/routes.constant.ts";
import { ProfileManager } from "pages/index";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path={`${ROUTES.basePath}*`} element={<ProfileManager />} />
    </Routes>
  );
};
