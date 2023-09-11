import Navbar from '../Components/Navbar.tsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUpInStyles.css';
import { motion } from 'framer-motion';
import * as pv from '../Components/PasswordVerification.tsx'; 

function Register() {
    const url = "http://localhost:8080/"

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameValid, setNameValid] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState("");

    useEffect(() => {

        const verifyName = async () => {

            try {
                const response = await axios
                    .get(url + "GetName/" + name);
                response.data === true ? setNameValid("Ok") : setNameValid("Nazwa już w użyciu.")
            } catch (err) {
                console.log("Error: " + err);
            }

        };

        !!name ? name.length < 8 ? setNameValid("Zbyt krótka nazwa użytkownika.") : verifyName() : setNameValid("");

    }, [name]);

    useEffect(() => {

        const verifyEmail = async () => {

            try {
                const response = await axios
                    .get(url + "GetEmail/" + email);
                setEmailValid(response.data);
            } catch (err) {
                console.log("Error: " + err);
            }

        };

        if (!!email) {
            const regex = new RegExp('.{1,}@.{1,}[.].{1,}'); // todo
            regex.test(email) ? verifyEmail() : setEmailValid(false);
        }

    }, [email]);

    useEffect(() => {

        if(!!password) {
            const verify: pv.PasswordVerification.Handler = new pv.PasswordVerification.Handler();
            const verifyLength: pv.PasswordVerification.EnoughCharacters = new pv.PasswordVerification.EnoughCharacters();
            const verifyUpperCase: pv.PasswordVerification.ContainsUpperCase = new pv.PasswordVerification.ContainsUpperCase();
            const verifyNumber: pv.PasswordVerification.ContainsNumber = new pv.PasswordVerification.ContainsNumber();
            const verifySpecial: pv.PasswordVerification.ContainsSpecialSign = new pv.PasswordVerification.ContainsSpecialSign();
            verify.setNextHandler(verifyLength);
            verifyLength.setNextHandler(verifyUpperCase);
            verifyUpperCase.setNextHandler(verifyNumber);
            verifyNumber.setNextHandler(verifySpecial);
            setPasswordValid(verify.handle(password));
        }

    }, [password]);

    async function save(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (emailValid === false) {
            alert("Niepoprawne dane!");
            return;
        }
        try {
            await axios.post("http://localhost:8080/Register", {
                name: name,
                email: email,
                password: password
            }
            );
            alert("Rejestracja pomyslna");
        } catch (err) {
            alert("Rejestracja nieudana");
        }
        setEmail('');
        setName('');
        setPassword('');
    };

    return (
        <div>
            <Navbar />

            <div className='RegisterLoginForm'>
                <form>

                { /* ----------------------------------- USERNAME ----------------------------------- */ }

                    <label htmlFor='name'>
                        <motion.div
                            transition={{type: "tween"}} 
                            key={!!name ? 1 : 0}
                            initial={{y: 30, x: 10}}
                            animate={{y: 0}}
                            className='motionLabel'
                        >
                            {!!name ? "Username" : ""}
                        </motion.div>
                    </label>

                    <div className='Input'>
                        <input
                            className={!!name ? nameValid === "Ok" ? "correctData" : "wrongData" : "noDataYet"}
                            type='name'
                            placeholder='Username'
                            name='name'
                            onChange={(event) => {setName(event.target.value);}}
                        />
                    </div>

                    <div className="wrongDataMessage">
                            {nameValid === "Ok" ? "" : nameValid}
                    </div>

                    { /* ----------------------------------- EMAIL ----------------------------------- */ }

                    <label htmlFor='email'>
                        <motion.div
                            transition={{type: "tween"}} 
                            key={!!email ? 1 : 0}
                            initial={{y: 30, x: 10}}
                            animate={{y: 0}}
                            className='motionLabel'
                        >
                            {!!email ? "Email" : ""}
                        </motion.div>
                    </label>

                    <div className='Input'>
                        <input
                            className={!!email ? emailValid === true ? "correctData" : "wrongData" : "noDataYet"}
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={(event) => {setEmail(event.target.value);}}
                        />

                        <div className="wrongDataMessage">
                            {!emailValid && !!email ? "Niepoprawny adres email, lub adres juz w uzyciu." : ""}
                        </div>
                    </div>

                    { /* ----------------------------------- PASSWORD ----------------------------------- */ }

                    <label htmlFor='password'>
                        <motion.div
                            transition={{type: "tween"}} 
                            key={!!password ? 1 : 0}
                            initial={{y: 30, x: 10}}
                            animate={{y: 0}}
                            className='motionLabel'
                        >
                            {!!password ? "Password" : ""}
                        </motion.div>
                    </label>
                    
                    <div className='Input'>
                        <input
                            className={!!password ? passwordValid === "Hasło prawidłowe." ? "correctData" : "wrongData" : "noDataYet"}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value); }}
                        />
                    </div>

                         <div className="wrongDataMessage">
                            {passwordValid !== "Hasło prawidłowe." && !!password ? passwordValid : ""}
                        </div>


                    
                    <button type="submit" onClick={save} className="SignUp">Rejestracja</button>
                </form>
            </div>
        </div>
    )
};

export default Register;