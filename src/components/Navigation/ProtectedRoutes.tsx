import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const ProtectedRoutes = ({
  permissions,
  allowGuest = false,
}: {
  permissions?: string[];
  allowGuest?: boolean;
}) => {
  const { user, hasPermission } = useAuth();

  console.log("User: ", user);

  if (allowGuest && !user) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  if (permissions && !permissions.every((p) => hasPermission(p))) {
    return <Navigate to="/unauthorized" replace/>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;