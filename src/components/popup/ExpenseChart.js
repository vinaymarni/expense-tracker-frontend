import React from 'react';
import InputField from '../../commonElements/InputField';
import { crossIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'


const ExpenseChart = ({onValueChange, errorList, onButtonClick, setIsPopup, expanseDetails }) => {

    return (
        <div className="popupStaticCon">
            <div className="popupinnerPopupCon">
                <div className='popupHeadercon'>
                    <p>Expense Chart</p>
                    <span onClick={()=>setIsPopup(false)}>
                        {crossIcon}
                    </span>
                </div>
                Expense Chart
            </div>
        </div>
    )
};

export default ExpenseChart;