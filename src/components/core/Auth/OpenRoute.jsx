// jo authenticated user h wo to dashboard pe chla jaega aur jo authenticated nhi h usko iske andar jo routes honge wo dikhane h i.e. login and signup
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
}
