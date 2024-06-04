import React from 'react';

const TextAreaField = ({inputId, placeholder, labelName, labelClassName, 
                    inputClassName, required, containerClass, value, onChange, name}) => {
    return (
        <div className={containerClass}>
            {labelName != undefined && labelName != "" &&
            <label htmlFor={inputId} className={labelClassName}>{labelName}</label>
            }
            <textarea 
                name={name}
                id={inputId}
                className={inputClassName}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            
        </div>
    )
};

export default TextAreaField;