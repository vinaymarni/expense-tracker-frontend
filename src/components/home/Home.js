import React, { Fragment, useEffect, useState } from 'react';
import './home.css'
import Header from '../header/Header';
import Button from '../../commonElements/Button';
import { cashIcon, chartIcon, groupIcon, handMoneySvg } from '../../commonElements/commonSvgs';
import { allCategory, groupColors, isNull, isValueNull, todayDate } from '../../commonElements/commonData';
import AddExpense from '../popup/AddExpense';
import CreateGroup from '../popup/CreateGroup';
import ExpenseChart from '../popup/ExpenseChart';
import { addExpanse, getConstantList, getMonthlyExpense } from '../../apis';
import { addExpanseValidation } from '../../validations';

const Home = ({userHomeDetails, onLogOut}) => {
    const [isPopup, setIsPopup] = useState(false);
    const [expanseDetails, setExpanseDetails] = useState({});
    const [allExpanseDetails, setAllExpanseDetails] = useState([]);

    const [errorList, setErrorList] = useState([]);
    const [currentPopup, setCurrentPopup] = useState("");
    const [groupDetails, setGroupDetails] = useState([]);
    const [chartType, setChartType] = useState("");

    const [chartDetails, setChartDetails] = useState({});

    const [constantList, setConstantList] = useState([]);

    useEffect(() => {
        if(constantList.length === 0){
            getConstantList(setConstantList);
        }
        
        if(allExpanseDetails.length === 0){
            getMonthlyExpense(setAllExpanseDetails, 28);
        }
    }, []);


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
            let obj = prevList[index];
            obj[e.target.name] = e.target.value;
            onValueChange(undefined, "groupMembers", prevList);
        }
    };

    
    const onButtonClick = (e, identifier, index, data) => {
        if(identifier == undefined && e !== undefined && e.target !== undefined && e.target.name !== undefined){
            setCurrentPopup(e.target.name);
            setIsPopup(true);
            setChartType(e.target.name);
        };

        if(e !== undefined && e.target !== undefined && e.target.name !== undefined && e.target.name == "groupDetails" ){
            setChartDetails(data);
        }

        let errorIds=[...errorList];

        if(identifier){
            switch (identifier) {
                case 'addExpense':
                    if(expanseDetails.expenseDate){
                        expanseDetails.expenseDate = new Date(expanseDetails.expenseDate).toJSON();
                    }else{
                        expanseDetails.expenseDate = todayDate;
                    }
                    expanseDetails.isActive = "Y"

                    //Api call
                    if(addExpanseValidation(expanseDetails) == true){
                        addExpanse(expanseDetails, setAllExpanseDetails, setExpanseDetails, setIsPopup);
                    }else{
                        console.log("Fill all required Details");
                    };
                        
                    break;
                case 'expenseChart':
                    console.log("Expense Chart");
                    console.log(expanseDetails);
                    
                    
                    break;
                case 'createGroup':
                    if(!isNull(expanseDetails, "groupName")){
                        errorIds.push("groupName");
                    }

                    if(isNull(expanseDetails, "groupName") && isNull(expanseDetails, "groupMembers")){
                        console.log("Create Group", expanseDetails);
                        let prevArray = [...groupDetails];
                        prevArray.push(expanseDetails);
                        setGroupDetails(prevArray);
                        //clear prev details
                        setExpanseDetails({});
                        // Close popup
                        setIsPopup(false);
                    }
                    break;
                case 'addNewMember':
                    let newList = isNull(expanseDetails, "groupMembers") ? [...expanseDetails.groupMembers] : [];
                    let newMemberEl = document.getElementById('newMember');
                    let newNumberEl = document.getElementById('newMemberNumber');
                   
                    if(isValueNull(newMemberEl) && isValueNull(newNumberEl)){
                        let obj={
                            name : newMemberEl.value,
                            number: newNumberEl.value 
                        };
                        newList.push(obj);
                        onValueChange(undefined, "groupMembers", newList);
                        newMemberEl.value = "";
                        newNumberEl.value = "";
                        
                    }else if(!isValueNull(newMemberEl) && !isValueNull(newNumberEl)){
                        errorIds.push("newMember");
                        errorIds.push("newMemberNumber");
                    }else if(isValueNull(newMemberEl) && !isValueNull(newNumberEl)){
                        errorIds.push("newMemberNumber");
                    }else{
                        errorIds.push("newMember");
                    }
                   
                    break;
                case 'removeMember':
                    let prevList = [...expanseDetails.groupMembers];
                    prevList.splice(index, 1);
                    onValueChange(undefined, "groupMembers", prevList);

                    break;
                case 'close':  
                    //clear prev details
                    setExpanseDetails({});
                    // Close popup
                    setIsPopup(false);
                    setErrorList([]);
                    break;
            }
        }

        setErrorList(errorIds);

    }

    let count = 0;
    let reversedArray = [...groupDetails].reverse();

    return (
        <div className="homeMainContainer">
            <Header userHomeDetails={userHomeDetails} onLogOut={onLogOut} />
            {isPopup &&
                <Fragment>

                    {currentPopup === "addExpense" &&
                    <AddExpense
                        key="addExpense"
                        errorList={errorList}
                        onValueChange={onValueChange}
                        expanseDetails={expanseDetails} 
                        onButtonClick={onButtonClick}
                        constantList={constantList}
                    />
                    }

                    {(currentPopup === "expenseChart" || currentPopup === "groupDetails") &&
                    <ExpenseChart
                        errorList={errorList}
                        onValueChange={onValueChange}
                        expanseDetails={expanseDetails} 
                        onButtonClick={onButtonClick}
                        chartType={chartType}
                        chartDetails={chartDetails}
                        constantList={constantList}
                        allExpanseDetails={allExpanseDetails}
                    />
                    }

                    {currentPopup === "createGroup" &&
                    <CreateGroup
                        errorList={errorList}
                        onValueChange={onValueChange}
                        expanseDetails={expanseDetails} 
                        onButtonClick={onButtonClick}
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
                            buttonConClassName=""
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

{/* New Group */}
                    {/* <div className="groupFolderCard">
                        <div className="groupProfileCon">
                            {handMoneySvg}
                        </div>
                        <p className="expanseGroupName">Hello Friends <span>(New Group)</span></p>
                    </div> */}

{/* Groups Displaying */}
                    <div className="groupFolderCardsDisplayMainCon">
                    {reversedArray.map((eachItem, index)=>{
                        count = count + 1
                        var colors = groupColors.get(count);
                        if(count > 4){
                            count = 0;
                        };
                        return(
                            <div key={index} id={`group_${index}`} onClick={(e)=>onButtonClick({target: {name: "groupDetails"}}, undefined, undefined, eachItem )} className="groupFolderCard">
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
                                    <p className="expanseGroupName">{eachItem.groupName}</p>
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