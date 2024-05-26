import $ from 'jquery';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();


// import axios from 'axios';

const URL = "http://localhost:9999"

// export const userRegistration = async (userDetails) => {
//     try {
//         const url = `${URL}/user/v1/register`;
//         const userDetailsJSON = JSON.stringify(userDetails);
//         const res = await axios.post(url, userDetailsJSON, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         // Assuming the server responds with a JSON object containing a 'status' field
//         if (res.status == true) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         throw error;
//     }
// };


const enebleAndDisbledBtn = (elId, status) => {
    if(status === "EN") {
        $(`#${elId}`).css("disabled", true);
        $(`#${elId}`).css("cursor", "wait");
    }else{
        $(`#${elId}`).css("disabled", false);
        $(`#${elId}`).css("cursor", "cursor");
    }
};

const updateErrorMessage = (elId, message, status) => {
    if(status === "HIDE") {
        $(`#${elId}`).hide();
        $(`#${elId}`).text("");
    }else{
        $(`#${elId}`).show();
        $(`#${elId}`).text(message);

        setTimeout(() =>{
            $(`#${elId}`).hide();
            $(`#${elId}`).text("");
        }, 2000);
    }
};


export const userSignupAndLogin = (userDetails, setIsLogin, identifier) => {
    const url = identifier !== "login" ? `${URL}/user/v1/register` : `${URL}/user/v1/auth/login`;

    enebleAndDisbledBtn("loginButton", "EN");

    fetch(url,{
        method:'post',
        headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userDetails)
    })
    .then(response => { 
        return response.json()
    })
    .then(res=>{
        enebleAndDisbledBtn("loginButton", "DIS");
        if (res.status == true) {
            if(res.token){
                cookies.set('token', res.token);
            }

            setIsLogin(prev => !prev);

            updateErrorMessage("loginErrorMsg", "", "HIDE");
        }else{
            updateErrorMessage("loginErrorMsg", res.message, "SHOW");
        }
    })
    .catch((err=>{
        enebleAndDisbledBtn("loginButton", "DIS");
        console.error(err);
    }));
};


export const addExpanse = (expenseDetails) => {
    const url = `${URL}/expense/add-expense`;
    let token0 = cookies.get("token");

    fetch(url, {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token0}`
        },
        body: JSON.stringify(expenseDetails)
    })
    .then(response => { 
        return response.json()
    })
    .then(res=>{
        if (res.status == true) {
            console.log("Success");
        }else{
            console.log("Fail");
        }
    })
    .catch((err=>{
        console.error(err);
    }));
};


export const getUserDetails = (setUserHomeDetails, monthId) => {
    const url = `${URL}/user/v1/home-page?monthId=${monthId}`;

    fetch(url)
    .then(response => { 
        return response.json()
    })
    .then(res=>{
        if (res.status == true) {
            console.log("Success");
            //setUserHomeDetails(res);
        }else{
            console.log("Fail");
        }
    })
    .catch((err=>{
        console.error(err);
    }));
};


export const getMonthlyExpense = (setMonthlyExpense, monthId) => {
    const url = `${URL}/expense/get-monthly-expense?monthId=${monthId}`;
    
    fetch(url)
    .then(response => { 
        return response.json()
    })
    .then(res=>{
        if (res.status == true) {
            console.log("Success");
            //setMonthlyExpense(res);
        }else{
            console.log("Fail");
        }
    })
    .catch((err=>{
        console.error(err);
    }));
};

export const getConstantList = (setConstantList) => {
    const url = `${URL}/common/getConstantList?groupName=Expense&groupName=month`;
    
    fetch(url)
    .then(response => { 
        return response.json()
    })
    .then(res=>{
        if (res !== undefined) {
            setConstantList(res);
        }else{
            console.log("getConstantList Api Fail");
        }
    })
    .catch((err=>{
        console.error(err);
    }));
};