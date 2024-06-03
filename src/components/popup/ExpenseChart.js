import React, { useEffect, useState } from 'react';
import InputField from '../../commonElements/InputField';
import { crossIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'
import { currentMonthName, getCurrentMonthId, monthIds, setValueFromId } from '../../commonElements/commonData';
import { getMonthlyExpense } from '../../apis';

const ExpenseChart = ({onValueChange, errorList, onButtonClick, chartType, chartDetails, 
                        constantList, allExpanseDetails, setAllExpanseDetails}) => {
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectEdDateId, setSelectEdDateId] = useState(null);

    let monthsList = constantList.filter(each=>each.constType === "month");
    let ExpenseList = constantList.filter(each=>each.constType === "Expense");

    let defaultDate = monthIds[currentMonthName];

    useEffect(() => {
        let selDate;
        if(selectEdDateId === null){
            setSelectEdDateId(defaultDate);
            selDate = setValueFromId(monthsList, defaultDate);
        }else{
            selDate = setValueFromId(monthsList, selectEdDateId);
        }

        if(allExpanseDetails.length !== 0){
            let isExist = allExpanseDetails.some(each=>new Date(each.expenseDate).toLocaleString('default', { month: 'long' }) == selDate)

            if(!isExist){
                getMonthlyExpense(setAllExpanseDetails, selectEdDateId);
            };
        }
    },[selectEdDateId]);

    useEffect(()=>{
        let selDate;
        if(selectEdDateId === null){
            setSelectEdDateId(defaultDate);
            selDate = setValueFromId(monthsList, defaultDate);
        }else{
            selDate = setValueFromId(monthsList, selectEdDateId);
        }

        let price = 0;
        allExpanseDetails.map(each=>{
            let eveMontName = new Date(each.expenseDate).toLocaleString('default', { month: 'long' });

            if(eveMontName == selDate){
                price = price + each.price
            }
        });
        setTotalPrice(price);

    },[allExpanseDetails, selectEdDateId]);


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
                    <p className="chartTotalPrice">Total Spent : <span>₹{totalPrice}</span></p>

                    <select name="months" onChange={(e)=>setSelectEdDateId(e.target.value)} value={selectEdDateId != null ? selectEdDateId : getCurrentMonthId(monthsList)} className="monthsDropdown" id="months">
                        {monthsList && monthsList.map((each, ind)=>{
                            return(
                                <option key={ind} value={each.constId}>{each.constName}</option>
                            )
                        })}
                    </select>

                    <Button
                        key="addExpenseBtn_chart"
                        buttonId ="addExpenseBtn_chart"
                        buttonConClassName=""
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
                            <p className="priceDetailsCradPriceText">₹ {totalPrice}/-</p>
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
                        {allExpanseDetails.map((eachRow, ind)=>{
                            let n = String(ind);
                            var number = n.length === 1 ? `0${ind + 1}` : (ind + 1);

                            const d = new Date(eachRow.expenseDate);
                            let dateText = d.toLocaleDateString();

                            let everyMontName = new Date(eachRow.expenseDate).toLocaleString('default', { month: 'long' });

                            if(monthIds[everyMontName] == selectEdDateId){
                            return (
                                <div key={ind} className="chartTableRow">
                                    <p className="chartColumn snoBox">{number}</p>
                                    <p className="chartColumn dateBox">{dateText}</p>
                                    <p className="chartColumn spentBox">{setValueFromId(ExpenseList, eachRow.categoryId)}</p>
                                    <p className="chartColumn amountBox">₹ {eachRow.price}</p>
                                </div>
                            )}
                        })}
                      

                    </div>


                </div>

            </div>
        </div>
    )
};

export default ExpenseChart;