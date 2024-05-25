import axios from 'axios';
var URL = "http://localhost:9999"

export const userRegistration = async (userDetails) => {
    try {
        const url = `${URL}/user/v1/register`;
        const userDetailsJSON = JSON.stringify(userDetails);
        const res = await axios.post(url, userDetailsJSON, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Assuming the server responds with a JSON object containing a 'status' field
        if (res.status == true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};



// export const userRegistration = (userDetails) => {
// 	  var URL2 = http://localhost:9999
//     const url = `${URL2}/user/v1/register`;
    
//     fetch(url,{
//         method:'post',
//         headers: { 'Content-Type': 'application/json' },
// 		    body: JSON.stringify(userDetails)
//     })
//     .then(response => { 
//         return response.json()
//     })
//     .then(res=>{
//         return res.status;
//     })
//     .catch((err=>{
//         console.error(err);
//     }));
// };