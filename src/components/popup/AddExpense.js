import React from 'react';
import InputField from '../../commonElements/InputField';
import { cashIcon, crossIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'
import Dropdown from '../../commonElements/Dropdown';
import { setValueFromId, todayDate } from '../../commonElements/commonData';
import TextAreaField from '../../commonElements/TextAreaField';


const AddExpense = ({onValueChange, errorList, onButtonClick, expanseDetails, constantList }) => {

    const onDropChange = (e, name, obj) => {
        onValueChange(undefined, name, obj.constId);
    };


    let ExpenseList = constantList.filter(each=>each.constType === "Expense");

    return (
        <div className="popupStaticCon">
            <div className="popupinnerPopupCon">
                <div className='popupHeadercon'>
                    <p>Add Expense</p>
                    <span onClick={()=>onButtonClick(undefined, "close")}>
                        {crossIcon}
                    </span>
                </div>

                <div className='popupDetailsmiddleCon'>
                    <div className='popupDetailsClass '>
                        <div className='popupPriveAndDateCon'>
                            <InputField
                                key="amount"
                                inputId = "name"
                                required={true}
                                inputType="number"
                                name="price"
                                placeholder="Enter Amount"
                                labelName="Amount"
                                labelClassName="popupInputFieldLable"
                                inputClassName={`loginInputField ${errorList.includes("price") ? "errorClass" : ""}`}
                                containerClass="loginInputContainer loginInputPriceCon"
                                value={expanseDetails.price != undefined ? expanseDetails.price : ""}
                                onChange={onValueChange}
                            />

                            <InputField
                                key="expenseDate"
                                inputId = "expenseDate"
                                required={true}
                                inputType="date"
                                name="expenseDate"
                                placeholder=""
                                labelName="Date of Expense"
                                labelClassName="popupInputFieldLable"
                                inputClassName={`loginInputField ${errorList.includes("expenseDate") ? "errorClass" : ""}`}
                                containerClass="loginInputContainer loginInputDateCon"
                                value={expanseDetails.expenseDate != undefined ? expanseDetails.expenseDate : todayDate}
                                onChange={onValueChange}
                            />
                        </div>

                        <label className="popupInputFieldLable">Select the category of your expense</label>

                        <Dropdown 
                            key="category"
                            inputId = "category"
                            required={true}
                            name="categoryId"
                            placeholder="Select Category"
                            error={errorList.includes("categoryId") ? "errorClass" : ""}
                            mainContainerClass="cgDropDownContainer"
                            value={expanseDetails.categoryId != undefined && 
                                setValueFromId(ExpenseList, expanseDetails.categoryId) ? 
                                setValueFromId(ExpenseList, expanseDetails.categoryId) : ""
                            }
                            onChange={onDropChange}
                            array={ExpenseList}
                        />

                        {/* {expanseDetails.categoryId != undefined && expanseDetails.categoryId == 22 && 
                        <InputField
                            key="cgName"
                            inputId = "cgName"
                            required={true}
                            inputType="text"
                            name="cgName"
                            placeholder="Enter Name"
                            labelName="Select Paid by to split equally!"
                            labelClassName="popupInputFieldLable"
                            inputClassName={`loginInputField ${errorList.includes("cgName") ? "errorClass" : ""}`}
                            containerClass="loginInputContainer"
                            value={expanseDetails.cgName != undefined ? expanseDetails.cgName : ""}
                            onChange={onValueChange}
                        />
                        } */}

                        <TextAreaField
                            key="description"
                            inputId = "description"
                            required={true}
                            name="description"
                            placeholder="Enter Description"
                            labelName="Description"
                            labelClassName="popupInputFieldLable"
                            inputClassName={`loginInputField ${errorList.includes("description") ? "errorClass" : ""}`}
                            containerClass="loginInputContainer"
                            value={expanseDetails.description != undefined ? expanseDetails.description : ""}
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
        </div>
    )
};

export default AddExpense;