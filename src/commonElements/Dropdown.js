import React from 'react';
import { dropdownArrow } from './commonSvgs';
import "./commonEl.css";

const Dropdown = ({inputId, placeholder, error, array,
                 required, mainContainerClass, value, onChange, name}) => {

    

    const onInputClick = () => {
        let conEl = document.getElementById(`dropdown_con_${inputId}`);
        let lineEl = document.getElementById(`dropdown_hrline_${inputId}`);
        let arrowEl = document.getElementById(`dropdown_arrow_${inputId}`);

        if(conEl && lineEl && arrowEl) {
            if(conEl.style.display != 'none') {
                conEl.style.display = 'none';
                lineEl.style.display = 'none';
                arrowEl.style.transform = "";
            }else{
                conEl.style.display = 'flex';
                lineEl.style.display = 'flex';
                arrowEl.style.transform = "rotate(180deg)";
            }
        };
    };

    return (
        <div 
            // onMouseOut={()=>console.log('out')}  
            className={`${mainContainerClass} ${error}`}
        >
            <div className="dropdownInputFieldCon" onClick={(e)=>onInputClick()}>
                <input 
                    name={name}
                    id={inputId}
                    type="text"
                    className="dropdownInputClassName"
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={()=>("")}
                />

                <span className="dropdownArrowClass" id={`dropdown_arrow_${inputId}`} >
                {dropdownArrow}
                </span>
            </div>

            <hr className="dropdowmHrLineClass" id={`dropdown_hrline_${inputId}`} style={{display: 'none'}} />

            <div className="dropdownItemsCon" id={`dropdown_con_${inputId}`} style={{display: 'none'}}>
                {array && array.length && array.length > 0 &&
                    array.map((eachItem, index)=>{
                        return(
                            <div key={index} className="dropdownItem">
                            <input  
                                type='radio'
                                id={`dropdown_${index}_${inputId}`}
                                value={value}
                                className='dropdownRadioClass'
                                name={`dropdown_`}
                                onChange={(e)=>{onChange(e, name, eachItem); onInputClick()}}
                            />
        
                            <label className='dropdownClassLable' htmlFor={`dropdown_${index}_${inputId}`}>{eachItem.constName}</label>
                        </div>
                    )
                })}
              
                
            </div>



            
        </div>
    )
};

export default Dropdown;