import React,{useState, useEffect} from "react";
import Loading from "./Loading";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged} from "firebase/auth";


const PrivateRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        console.log("is logged");
        const auth = getAuth();
        const unSubscribe = onAuthStateChanged(auth, (user) =>{
            setIsAuthenticated(!!user);
            setLoading(false);
        });
        //clean up
        return () => unSubscribe();
    },[]);
    if(loading){
        return <Loading />
    }
    return isAuthenticated ? (
        children
    ):(
        <Navigate to="/login" state={{from: location}} />
    );
};

export default PrivateRoute;