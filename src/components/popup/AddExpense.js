import React from 'react';
import InputField from '../../commonElements/InputField';
import { cashIcon, crossIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'
import Dropdown from '../../commonElements/Dropdown';
import { allCategory } from '../../commonElements/commonData';


const AddExpense = ({onValueChange, errorList, onButtonClick, setIsPopup, expanseDetails }) => {

    const onDropChange = (e, name, obj) => {
        onValueChange(undefined, name, obj.name);
    }

    return (
        <div className="popupStaticCon">
            <div className="popupinnerPopupCon">
                <div className='popupHeadercon'>
                    <p>Add Expense</p>
                    <span onClick={()=>setIsPopup(false)}>
                        {crossIcon}
                    </span>
                </div>

                <div className='popupDetailsmiddleCon'>
                    <div className='popupDetailsClass '>
                    <InputField
                        key="amount"
                        inputId = "name"
                        required={true}
                        inputType="text"
                        name="name"
                        placeholder="Enter Amount"
                        labelName="Amount"
                        labelClassName="popupInputFieldLable"
                        inputClassName={`loginInputField ${errorList.includes("amount") ? "errorClass" : ""}`}
                        containerClass="loginInputContainer"
                        value={expanseDetails.amount != undefined ? expanseDetails.amount : ""}
                        onChange={onValueChange}
                    />

                    <label className="popupInputFieldLable">Select the category of your expense</label>

                    <Dropdown 
                        key="category"
                        inputId = "category"
                        required={true}
                        name="category"
                        placeholder="Select Category"
                        error={errorList.includes("category") ? "errorClass" : ""}
                        mainContainerClass="cgDropDownContainer"
                        value={expanseDetails.category != undefined ? expanseDetails.category : ""}
                        onChange={onDropChange}
                        array={allCategory}
                    />

                    {expanseDetails.category != undefined && expanseDetails.category == "others" && 
                    <InputField
                        key="cgName"
                        inputId = "cgName"
                        required={true}
                        inputType="text"
                        name="cgName"
                        placeholder="Enter Name"
                        labelName="Add Expense Name"
                        labelClassName="popupInputFieldLable"
                        inputClassName={`loginInputField ${errorList.includes("cgName") ? "errorClass" : ""}`}
                        containerClass="loginInputContainer"
                        value={expanseDetails.cgName != undefined ? expanseDetails.cgName : ""}
                        onChange={onValueChange}
                    />
                    }


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
        </div>
    )
};

export default AddExpense;