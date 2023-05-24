import './TitleNavigation.less';
import * as React from "react";

interface IProps {
    children?: React.ReactNode;
    name: React.ReactNode;
}

interface IProps {
    children?: React.ReactNode;
    name: React.ReactNode;
}

function NotFound(props: IProps) {

    return (
        <div className='widget-title-navigation'>
        <span className='item active'>
            {props.name}
        </span>
            <span className='tool'>
          {props.children}
        </span>
        </div>
    )
}

export default NotFound
