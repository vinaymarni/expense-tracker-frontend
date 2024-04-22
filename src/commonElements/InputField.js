import React from 'react';

const InputField = ({inputId, inputType, placeholder, labelName, labelClassName, 
                    inputClassName, required, containerClass, value, onChange, name}) => {
    return (
        <div className={containerClass}>
            {labelName != undefined && labelName != "" &&
            <label htmlFor={inputId} className={labelClassName}>{labelName}</label>
            }
            <input 
                name={name}
                id={inputId}
                type={inputType}
                className={inputClassName}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            
        </div>
    )
};

export default InputField;