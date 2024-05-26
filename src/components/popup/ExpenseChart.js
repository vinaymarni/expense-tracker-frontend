import React from 'react';
import InputField from '../../commonElements/InputField';
import { crossIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'

let dummyArray = [0,1,2,3,4,5,6,7,8,9];

const ExpenseChart = ({onValueChange, errorList, onButtonClick, chartType, chartDetails, constantList }) => {

    let monthsList = constantList.filter(each=>each.constType === "month");
    let ExpenseList = constantList.filter(each=>each.constType === "Expense");

    return (
        <div className="popupStaticCon">
            <div className="popupinnerPopupCon">
                <div className='popupHeadercon'>
                    <p>{chartDetails != undefined && chartDetails.groupName ? chartDetails.groupName : "Expense Chart"}</p>
                    <span onClick={()=>onButtonClick(undefined, "close")}>
                        {crossIcon}
                    </span>
                </div>

                <div className='chartTopFieldsCon'>
                    <p className="chartTotalPrice">Total Spent : <span>₹45 000</span></p>

                    <select name="months" className="monthsDropdown" id="months">
                        {monthsList && monthsList.map((each, ind)=>{
                            return(
                                <option key={ind} value={each.constId}>{each.constName}</option>
                            )
                        })}
                    </select>

                    <Button
                        key="addExpenseBtn_chart"
                        buttonId ="addExpenseBtn_chart"
                        buttonConClassName="addExpenseBtnCon"
                        buttonClassName="addExpenseBtnClass"
                        onSubmit={(e)=>onButtonClick(e)}
                        title="Add Expense"
                        name="addExpense"
                        icon={""}
                    />
                </div>

{/* For group Popup */}
                {chartType == "groupDetails" &&
                <div className="chartTableRow">
                        <div className="priceDetailsCrad priceDetailsLeftCard chartPriceCrad">
                            <p className="priceDetailsCradText">Overall you owe</p>
                            <p className="priceDetailsCradPriceText">₹ 4000/-</p>
                        </div>

                        <div className="priceDetailsCrad chartPriceCrad priceCardLeftCard">
                            <p className="priceDetailsCradText">Overall you owe</p>
                            <p className="priceDetailsCradPriceText">₹ 4000/-</p>
                        </div>

                        <Button
                            key="setteleBtn"
                            buttonId ="setteleBtn"
                            buttonConClassName=""
                            buttonClassName="setteleBtnBtnClass"
                            onSubmit={(e)=>onButtonClick(e, "settleUp")}
                            title="Settle Up"
                            name="settleUp"
                            icon={""}
                        />
                </div>
                }

{/* chart Table */}
                <div className="chartTableMainCon">
                    <div className="chartTableHeaderCon">
                        <p className="chartHearder snoBox">S.no</p>
                        <p className="chartHearder dateBox">Date</p>
                        <p className="chartHearder spentBox">Spent on</p>
                        <p className="chartHearder amountBox">Amount</p>
                    </div>

                    <div className="chartTableRowsMainCon">
                        {dummyArray.map((eachRow, ind)=>{
                            let n = String(ind);
                            var number = n.length === 1 ? `0${ind + 1}` : (ind + 1);
                            return (
                                <div key={ind} className="chartTableRow">
                                    <p className="chartColumn snoBox">{number}</p>
                                    <p className="chartColumn dateBox">12/02/2001</p>
                                    <p className="chartColumn spentBox">Sports</p>
                                    <p className="chartColumn amountBox">₹ 1400</p>
                                </div>
                            )
                        })}
                      

                    </div>


                </div>

            </div>
        </div>
    )
};

export default ExpenseChart;