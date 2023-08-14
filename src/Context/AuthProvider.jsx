import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/layout/Spinner";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, email, photoURL } = user?.multiFactor?.user;
                setUser({ uid, displayName, email, photoURL })
                navigate("/setting", { replace: true });
                setLoading(false)
                return;
            }
            setLoading(false);
            navigate("/", { replace: true })
        })

        return () => unsubscibed();
    }, [navigate])

    return (
        <AuthContext.Provider value={user}>
            {loading ? <Spinner/> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;