import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils.js';
import Axios from "axios";
import styles from './form.module.scss';


function ForgotPassword() {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value);
    //     const copySignupInfo = { ...signupInfo };
    //     copySignupInfo[name] = value;
    //     setSignupInfo(copySignupInfo);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return handleError('email required')
        }

        //    const val= Yup.object({
        //         email: Yup.string().email("Invalid email address").required("Required")

        //       },
        //       console.log(email,"emailll")


        //     )

        //       console.log(val,"yupppp")

            try{
            var options = {
                method: 'POST',
                url: 'https://mernback-6nkm.onrender.com/auth/forgot-password',
                headers: {'content-type': 'application/json'},
                data: {
                 email:email
                }
              };
           await   Axios.request(options).then(function (res) {
                console.log(res,"respppp");
                //  if(res.data.success  ){
                    if(res.data.success  ){

                            alert("check your email for reset password link");
                            navigate('/login')
                        }
                        else{
                            alert("User not registered");

                        }

              }).catch(function (error) {
                console.error(error);
                alert("User not registered");
              });
        //  Axios.post(`http://localhost:3001/auth/forgot-password`,{email}, {headers: {'Content-type': 'application/json'}})
        //       .then((res) => {
        //                  console.log(res,"front end axios ")
                        // if(res.data.success  ){
                            // alert("check your email for reset password link");
                            // navigate('/login')
                        // }
                        // else{
                        //     alert("User not registered");

                        // }
                //     }
                // )
}
                catch(err) {
                    console.log(err)
                    alert("User not registered");
                }
                
            // }
            // catch(err ) {
            //     console.log(err)
            // }
        // const url = `http://localhost:3001/auth/forgot-password`;
        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: email }),
        // });

        // console.log(response, "resulttt")
        // const result = await response.json();
        // const { success, message, error } = result;
        // console.log(result, "resulttt eres")
        // if (success) {
        //     handleSuccess(message);
        //     setTimeout(() => {
        //         navigate('/login')
        //     }, 1000)
        // } else if (error) {
        //     const details = error?.details[0].message;
        //     handleError(details);
        // } else if (!success) {
        //     handleError(message);
        // }
        //     console.log(result);
        // } catch (err) {
        //     handleError(err);
        //       }
        // catch (err) {
        //             handleError(err);
        // }
    }
    return (
        <div className={styles.container}>
            <div className={styles.formCenter}>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                    // autoComplete='off'
                    // value={signupInfo.email}
                    />
                </div>

                <button type='submit'>Send</button>

            </form>
            <ToastContainer />
        </div>
        </div>
    )
}

export default ForgotPassword
