import React from 'react';
import InputField from '../../commonElements/InputField';
import { cashIcon, crossIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'


const AddExpense = ({onValueChange, errorList, onButtonClick, setIsPopup, expanseDetails }) => {

    return (
        <div className="popupStaticCon">
            <div className="popupinnerPopupCon">
                <div className='popupHeadercon'>
                    <p>Add Expense</p>
                    <span onClick={()=>setIsPopup(false)}>
                        {crossIcon}
                    </span>
                </div>

                <div className='popupDetailsClass'>
                <InputField
                    key="amount"
                    inputId = "name"
                    required={true}
                    inputType="text"
                    name="name"
                    placeholder="Enter Amount"
                    labelName="Amount"
                    labelClassName="loginInputFieldLable"
                    inputClassName={`loginInputField ${errorList.includes("amount") ? "errorClass" : ""}`}
                    containerClass="loginInputContainer"
                    value={expanseDetails.amount != undefined ? expanseDetails.amount : ""}
                    onChange={onValueChange}
                />

                <Button
                            key="addExpenseBtn_"
                            buttonId ="addExpense_"
                            buttonConClassName="addExpenseBtnCon"
                            buttonClassName="addExpenseBtnClass"
                            onSubmit={(e)=>onButtonClick(e, "addExpense")}
                            title="Add Expense"
                            name="addExpense"
                            icon={cashIcon}
                />
                </div>
            </div>
        </div>
    )
};

export default AddExpense;