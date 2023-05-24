import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Frame from "./common/router/Frame";
import NotFound from "./common/NotFound";
import AuthorFrame from "./author/Frame";
import EditorFrame from "./editor/Frame";
import ReaderFrame from "./reader/Frame";
import ReaderColumnList from "./reader/column/List";
import EditorColumnList from "./editor/column/List";
import ReaderLogin from "./reader/login/Login";
import EditorLogin from "./editor/login/Login";
import ReaderColumnDetail from "./reader/column/Detail";
import EditorColumnCreate from "./editor/column/Create";
import ReaderSubscriptionSubscribe from "./reader/subscription/Subscribe";
import ReaderSubscriptionList from "./reader/subscription/List";
import "../assets/css/index.less"
import Sun from "../universal/Sun";
import {useUpdate} from "ahooks";

const App: React.FC = () => {

    let update = useUpdate();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Frame/>,
            errorElement: <NotFound/>,
            children: [
                {
                    index: true,
                    element: <ReaderFrame/>,
                },
                {
                    path: "author",
                    element: <AuthorFrame/>,
                },
                {
                    path: "editor",
                    element: <EditorFrame/>,
                    children: [
                        {
                            index: true,
                            element: <EditorColumnList/>,
                        },
                        {
                            path: "login",
                            element: <EditorLogin/>,
                        },
                        {
                            path: "column/create",
                            element: <EditorColumnCreate/>,
                        },
                        {
                            path: "column/list",
                            element: <EditorColumnList/>,
                        },
                    ]
                },
                {
                    path: "reader",
                    element: <ReaderFrame/>,
                    children: [
                        {
                            index: true,
                            element: <ReaderColumnList/>,
                        },
                        {
                            path: "login",
                            element: <ReaderLogin/>,
                        },
                        {
                            path: "column/detail/:columnId",
                            element: <ReaderColumnDetail/>,
                        },
                        {
                            path: "column/list",
                            element: <ReaderColumnList/>,
                        },
                        {
                            path: "subscription/subscribe",
                            element: <ReaderSubscriptionSubscribe/>,
                        },
                        {
                            path: "subscription/list",
                            element: <ReaderSubscriptionList/>,
                        },
                    ]
                },
            ]
        },
    ]);

    useEffect(() => {
        Sun.register(() => {
            update()
        })
    }, [])


    return (
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    );
};

export default App;