import React, { Fragment, useState } from 'react';
import './home.css'
import Header from '../header/Header';
import Button from '../../commonElements/Button';
import { cashIcon, chartIcon, groupIcon, handMoneySvg } from '../../commonElements/commonSvgs';
import { allCategory, groupColors, isNull } from '../../commonElements/commonData';
import AddExpense from '../popup/AddExpense';
import CreateGroup from '../popup/CreateGroup';
import ExpenseChart from '../popup/ExpenseChart';

const Home = () => {
    const [isPopup, setIsPopup] = useState(false);
    const [expanseDetails, setExpanseDetails] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [currentPopup, setCurrentPopup] = useState("");

    const removeErrorIds = (name) =>{
        let errorIds=[...errorList];

        if(errorIds.includes(name)){
            let index = errorIds.indexOf(name);
            errorIds.splice(index, 1);
            setErrorList(errorIds);
        }
    };

    const onValueChange = (e, key, value) => {

        if(key != undefined && value != undefined){
            removeErrorIds(key);
            setExpanseDetails({...expanseDetails, [key] : value});
        }else{
            removeErrorIds(e.target.name);
            setExpanseDetails({...expanseDetails, [e.target.name] : e.target.value});
        }
    };

    const onGroupValueChange = (e, index) => {
        let id = e.target.id;

        removeErrorIds(id);

        if(index != undefined){
            let prevList = [...expanseDetails.groupMembers];
            prevList[index] = e.target.value;
            onValueChange(undefined, "groupMembers", prevList);
        }
    };

    
    const onButtonClick = (e, identifier, index) => {
        if(identifier == undefined){
            setCurrentPopup(e.target.name);  
            setIsPopup(true);
        };

        let errorIds=[...errorList];

        if(identifier){
            switch (identifier) {
                case 'addExpense':
                    console.log("Add Expense")
                    break;
                case 'expenseChart':
                    console.log("Expense Chart")
                    break;
                case 'createGroup':
                    if(!isNull(expanseDetails, "groupName")){
                        errorIds.push("groupName");
                    }

            

                    if(isNull(expanseDetails, "groupName") && isNull(expanseDetails, "groupMembers")){
                        console.log("Create Group", expanseDetails);
                    }
                    break;
                case 'addNewMember':
                    let newList = isNull(expanseDetails, "groupMembers") ? [...expanseDetails.groupMembers] : [];
                    let newMemberEl = document.getElementById('newMember');
                    if(newMemberEl && newMemberEl.value){
                        newList.push(newMemberEl.value);
                        onValueChange(undefined, "groupMembers", newList);
                        newMemberEl.value = "";
                    }else{
                        errorIds.push("newMember");
                    }
                   
                    break;
                case 'removeMember':
                    let prevList = [...expanseDetails.groupMembers];
                    prevList.splice(index, 1);
                    onValueChange(undefined, "groupMembers", prevList);

                    break;
                    
            }
        }

        setErrorList(errorIds);

    }

    let dummyGroup = [0,1,2,3,4,5,6,7,8,9,10,11];
    let count = 0;

    return (
        <div className="homeMainContainer">
            <Header />
            {isPopup &&
                <Fragment>

                    {currentPopup === "addExpense" &&
                    <AddExpense
                        errorList={errorList}
                        onValueChange={onValueChange}
                        expanseDetails={expanseDetails} 
                        onButtonClick={onButtonClick}
                        setIsPopup={setIsPopup}
                    />
                    }

                    {currentPopup === "expenseChart" &&
                    <ExpenseChart
                        errorList={errorList}
                        onValueChange={onValueChange}
                        expanseDetails={expanseDetails} 
                        onButtonClick={onButtonClick}
                        setIsPopup={setIsPopup}
                    />
                    }

                    {currentPopup === "createGroup" &&
                    <CreateGroup
                        errorList={errorList}
                        onValueChange={onValueChange}
                        expanseDetails={expanseDetails} 
                        onButtonClick={onButtonClick}
                        setIsPopup={setIsPopup}
                        onGroupValueChange={onGroupValueChange}
                    />
                    }

                </Fragment>
            }
            <div className="homeInnerContainer">
                <div className="homeLeftContainer">
                    <p className="homeNameHeading">Hello Tanuj👋</p>
                    <p className="homeNameHeading">Welcome to  Expense Tracker!</p>
                    <div className="homeAddExpenseCon">
                        <p>Track Your Spending, Control Your Future: Start Adding Expenses Today!</p>
                        <Button
                            key="addExpenseBtn"
                            buttonId ="addExpense"
                            buttonConClassName="addExpenseBtnCon"
                            buttonClassName="addExpenseBtnClass"
                            onSubmit={(e)=>onButtonClick(e)}
                            title="Add Expense"
                            name="addExpense"
                            icon={cashIcon}
                        />
                    </div>

                    <p className="homeTotalMoneyTextCon">Your Expense on your favorites.... <span className="homeTotalMoneyText">Total Spent : <span>₹45 000</span></span></p>

                    <div className="allCategoryDisplayCon">
                        {allCategory.map((eachItem, i) =>{
                            return(
                                <div key={i} className="categoryCard">
                                    {eachItem.icon}
                                    <p className="categoryCardText"><span>{eachItem.value}</span><br/>{eachItem.title}</p>
                                </div>  
                            )
                        })}
                    </div>

                    <Button
                            key="expenseChart"
                            buttonId ="expenseChart"
                            buttonConClassName="expenseChartBtnCon"
                            buttonClassName="addExpenseBtnClass"
                            onSubmit={(e)=>onButtonClick(e)}
                            title="Show Expense Chart"
                            name="expenseChart"
                            icon={chartIcon}
                    />


                </div>
                <div className="homeRightContainer">
                    <div className="groupDetailsCradHeader">
                        <p>Groups</p>
                        <Button
                            key="createGroup"
                            buttonId ="createGroup"
                            buttonClassName="addExpenseBtnClass createGroupBtnClass"
                            onSubmit={(e)=>onButtonClick(e)}
                            title="Create Group"
                            name="createGroup"
                            icon={groupIcon}
                        />
                    </div>

                    <div className="allCategoryDisplayCon groupConPriceDetailsCon">
                        <div className="priceDetailsCrad priceDetailsLeftCard">
                            <p className="priceDetailsCradText">Overall you owe</p>
                            <p className="priceDetailsCradPriceText">₹ 4000/-</p>
                        </div>

                        <div className="priceDetailsCrad">
                            <p className="priceDetailsCradText">Overall you owe</p>
                            <p className="priceDetailsCradPriceText">₹ 4000/-</p>
                        </div>
                    </div>

                    <hr className="priceDetailshrLine" />

                    <div className="groupFolderCard">
                        <div className="groupProfileCon">
                            {handMoneySvg}
                        </div>
                        <p className="expanseGroupName">Hello Friends <span>(New Group)</span></p>
                    </div>

                    <div className="groupFolderCardsDisplayMainCon">
                    {dummyGroup.map((eachItem, index)=>{
                        count = count + 1
                        var colors = groupColors.get(count);
                        if(count > 4){
                            count = 0;
                        };
                        return(
                            <div key={index} className="groupFolderCard">
                                <div 
                                    style={{
                                        backgroundColor: colors && colors.backgroundColor ? colors.backgroundColor : "",
                                        borderColor: colors && colors.borderColor ? colors.borderColor : ""
                                    }} 
                                    className="groupProfileCon"
                                >
                                    {handMoneySvg}
                                </div>
                                <div className="expanseGroupPriceTextCon">
                                    <p className="expanseGroupName">Hello Friends</p>
                                    <p className="expanseGroupPriceText">you are owe <span>₹ 300</span></p>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;