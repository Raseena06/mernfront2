import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils.js';
import Axios from "axios";
import styles from './form.module.scss';

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { token } = useParams()
   
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

        if (!password) {
            return handleError('password required')
        }
        else if (password?.length < 4 || password?.length > 101) {
            return handleError('password length should be greater than 4')
        }
        else if (password != confirmPassword) {
            return handleError('Passwords must match')

        }
        try {
            // Axios.put("http://localhost:3001/auth/reset-password/" + id + "/" + token, {
            //     password,
            // })
            Axios.put("https://mernback-6nkm.onrender.com/auth/reset-password/" + token, {
                password,
            }) .then(response => {
                    console.log(response, "resppppppp")
                   
                    if (response.data.success) {
                        handleSuccess("Password changed Successfully");
                        setTimeout(() => {
                            navigate('/login')
                        }, 1000)
                    }

                })
                .catch(err => {
                    console.log(err, "errorrrr")
                    if (err.response.status == 401) {
                        handleError("no user found")
                    }
                    else {
                        handleError("reset Link expired")
                    }
                   
                })
        }
        catch (err) {
            console.log(err, "errorrrrsss")

            handleError(err);
       
        }



    }
    return (
        <div className={styles.container}>
            <div className={styles.formCenter}>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>

                
                    <div>
                        <label htmlFor='password'>New Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'

                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Confirm Password</label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'

                        />
                    </div>
              

                <button type='submit'>Reset</button>


            </form>
            <ToastContainer />
        </div>
        </div>
    )
}

export default ResetPassword
