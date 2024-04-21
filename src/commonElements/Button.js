

import React from "react";

const Button = ({ buttonId, buttonConClassName, buttonClassName, onSubmit, title, value, name, icon, toolTip }) => {

    return(
        <div className={buttonConClassName}>
            <button 
                id={buttonId}
                className={buttonClassName}
                onClick={(e)=>onSubmit ? onSubmit(e) : ""}
                value={value}
                name={name}
                title={toolTip ? toolTip : ""}
            >
                {title}
                {icon}
            </button>
            
        </div>
    )
};

export default Button;