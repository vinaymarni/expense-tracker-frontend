import React from 'react';
import InputField from '../../commonElements/InputField';
import { crossIcon, groupIcon } from '../../commonElements/commonSvgs';
import Button from '../../commonElements/Button';
import './popup.css'
import { isNull } from '../../commonElements/commonData';


const CreateGroup = ({onValueChange, errorList, onButtonClick, setIsPopup, expanseDetails, onGroupValueChange }) => {

    return (
        <div className="popupStaticCon">
            <div className="popupinnerPopupCon">
                <div className='popupHeadercon'>
                    <p>Create Group</p>
                    <span onClick={()=>setIsPopup(false)}>
                        {crossIcon}
                    </span>
                </div>

                <div className='groupPopupDetailsClass'>
                <h3 className='groupPopupHeading'>Group Name</h3>

                <InputField
                    key="groupName"
                    inputId = "groupName"
                    required={true}
                    inputType="text"
                    name="groupName"
                    placeholder="Enter Group Name"
                    labelName=""
                    labelClassName=""
                    inputClassName={`loginInputField ${errorList.includes("groupName") ? "errorClass" : ""}`}
                    containerClass="loginInputContainer"
                    value={expanseDetails.groupName != undefined ? expanseDetails.groupName : ""}
                    onChange={onValueChange}
                />

                <hr className="groupPopuphrLine" />

                <h3 className='groupPopupHeading'>Add Group Members</h3>

                {isNull(expanseDetails, "groupMembers") &&
                    expanseDetails.groupMembers.map((eachMember, index)=>{
                        return(
                            <div className="groupMemeberFieldCon">
                                <InputField
                                    key={`newMember_${index}`}
                                    inputId = {`newMember_${index}`}
                                    required={true}
                                    inputType="text"
                                    name="newMember"
                                    placeholder={`Enter Member Name ${index+1}`}
                                    labelName=""
                                    labelClassName=""
                                    inputClassName={`loginInputField ${errorList.includes(`newMember_${index}`) ? "errorClass" : ""}`}
                                    containerClass="loginInputContainer"
                                    value={eachMember}
                                    onChange={(e) =>onGroupValueChange(e, index)}
                                /> 
                                <span className='groupMemeberCrossIcon' onClick={(e)=>onButtonClick(e, "removeMember", index)}>
                                    {crossIcon}
                                </span>
                            </div>
                        )
                    })
                }

                <InputField
                    key="newMember"
                    inputId = "newMember"
                    required={true}
                    inputType="text"
                    name="newMember"
                    placeholder={`Enter Member Name ${isNull(expanseDetails, "groupMembers") ? expanseDetails.groupMembers.length+1 : 1 }`}
                    labelName=""
                    labelClassName=""
                    inputClassName={`loginInputField ${errorList.includes("newMember") ? "errorClass" : ""}`}
                    containerClass="loginInputContainer"
                    onChange={(e) =>onGroupValueChange(e, undefined)}
                />

                <Button
                            key="addNewMember"
                            buttonId ="addNewMember"
                            buttonClassName="createGroupBtn"
                            onSubmit={(e)=>onButtonClick(e, "addNewMember")}
                            title="Add More Member"
                            name="addNewMember"
                            icon=""
                />


                <Button
                            key="createGroup_"
                            buttonId ="createGroup_"
                            buttonConClassName="popupDetailsClass"
                            buttonClassName="addExpenseBtnClass"
                            onSubmit={(e)=>onButtonClick(e, "createGroup")}
                            title="Save Group"
                            name="createGroup"
                            icon=""
                />
                </div>
            </div>
        </div>
    )
};

export default CreateGroup;