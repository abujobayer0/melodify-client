import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../utils/firebase.init";
const auth = getAuth(app);
const useUserRole = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user?.displayName) {
      fetch(`https://melodify-server.onrender.com/user?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("role", data[0]?.role);
        });
    }
  }, []);
  return [];
};
export default useUserRole;
