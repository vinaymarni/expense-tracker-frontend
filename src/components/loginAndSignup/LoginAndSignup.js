import React, { useState } from 'react';
import './loginAndSignup.css'
import InputField from '../../commonElements/InputField';
import Button from '../../commonElements/Button';
import { eyeIcon, loginPageSvg } from '../../commonElements/commonSvgs';
import { isNull } from '../../commonElements/commonData';

const LoginAndSignup = ({userDetails, setUserDetails, onFunction}) => {
    const [isSignPage, setIsSignPage] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const onValueChange = (e) => {
        let errorIds=[...errorList];

        if(errorIds.includes(e.target.name)){
            let index = errorIds.indexOf(e.target.name);
            errorIds.splice(index, 1);
            setErrorList(errorIds);
        }

        if(e.target.name == "mobile"){
            if(e.target.value < 10000000000){
                setUserDetails({...userDetails, [e.target.name] : e.target.value})
            }else{
                errorIds.push("mobile");
                setErrorList(errorIds);
            }
        }else{
            setUserDetails({...userDetails, [e.target.name] : e.target.value})
        }
    };

    const onButtonClick = (e, identifier) => {
        if(identifier == "main"){
            
            // validation
            let errorList = [];

            if(!isNull(userDetails, "mobile") || userDetails.mobile > 10000000000){
                errorList.push("mobile");
            };

            if(!isNull(userDetails, "password")){
                errorList.push("password");
            };

            if(e.target.name !== "login"){
                if(!isNull(userDetails, "name")){
                    errorList.push("name");
                }
            };

            setErrorList(errorList);

            // final Submission
            if(errorList.length === 0){

                console.log(userDetails, e.target.name);

                //If API call Success
                if(isSignPage){
                    onFunction("register");
                }else{
                    onFunction("login");
                };
            }

        }else{
            setUserDetails({});
            setErrorList([]);
            setShowPassword(false);
            setIsSignPage(isSignPage => !isSignPage);
        }
    };
    

    return (
        <div className="loginAndSignupMianCon">
            <div className="loginLeftSideCon">
                {loginPageSvg}
            </div>

            <div className="loginRightSideCon">
                <h3>Expense Tracker</h3>

                {!isSignPage && <p>Welcome back !!!</p>
                }
                <h2>{!isSignPage ? "Sign In" : "Sign Up"}</h2>
            
                {isSignPage &&
                <InputField  
                    key="fullName"
                    inputId = "name"
                    required={true}
                    inputType="text"
                    name="name"
                    placeholder="Enter Full Name"
                    labelName="Full Name"
                    labelClassName="loginInputFieldLable"
                    inputClassName={`loginInputField ${errorList.includes("name") ? "errorClass" : ""}`}
                    containerClass="loginInputContainer"
                    value={userDetails.name != undefined ? userDetails.name : ""}
                    onChange={onValueChange}
                />
                }

                <InputField  
                    key="mobile"
                    inputId = "mobile"
                    name="mobile"
                    required={true}
                    inputType="number"
                    placeholder="Enter Mobile Number"
                    labelName="Mobile"
                    labelClassName="loginInputFieldLable"
                    inputClassName={`loginInputField ${errorList.includes("mobile") ? "errorClass" : ""}`}
                    containerClass="loginInputContainer"
                    value={userDetails.mobile != undefined ? userDetails.mobile : ""}
                    onChange={onValueChange}
                />

                <div className="groupMemeberFieldCon">
                    <InputField  
                        key="password"
                        inputId = "password"
                        name="password"
                        required={true}
                        inputType={`${showPassword ? "text" : "password"}`}
                        placeholder="Enter Password"
                        labelName="Password"
                        labelClassName="loginInputFieldLable"
                        inputClassName={`loginInputField ${errorList.includes("password") ? "errorClass" : ""}`}
                        containerClass="loginInputContainer"
                        value={userDetails.password != undefined ? userDetails.password : ""}
                        onChange={onValueChange}
                    />
                    <span className='groupMemeberCrossIcon' onClick={()=>setShowPassword(!showPassword)}>
                        {eyeIcon}
                    </span>
                </div>

                <Button
                    key="loginAndSignupBtn"
                    buttonId ="loginButton"
                    buttonConClassName="loginButtonMainCon"
                    buttonClassName="loginButtonClass"
                    onSubmit={(e)=>onButtonClick(e, "main")}
                    title={!isSignPage ? "Login" : "Create Account"}
                    name={!isSignPage ? "login" : "signUp"}
                    icon={""}
                />

                <p id="loginErrorMsg" style={{display:"none"}} className="errorMessage"></p>
            
            {!isSignPage ?
            <p className="loginPageBottomText">I don’t have an account ? <span onClick={(e)=>onButtonClick(e, "switch")}>Sign up</span></p>
            :
            <p className="loginPageBottomText">Already have an account ? <span onClick={(e)=>onButtonClick(e, "switch")}>Sign in</span></p>
            }

            </div> 
        </div>
    )
};

export default LoginAndSignup;