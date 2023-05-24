import './Frame.less'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Frame() {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if (location.pathname === '/') {
            navigate("/reader/column/list")
        }

    },[])

    return (
        <div className={"frame"}>
            <Outlet/>
        </div>
    )
}

export default Frame
