import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SignUpInStyles.css'

function Login(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function save(event){
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/login", {
                name: name,
                password: password,
            }
            ).then((res) => {

                if(res.data.message === "Email not exits"){
                    alert("Chuj");
                }
                else if (res.data.message === "Login Success"){
                    navigate('/SignUp');
                }
                else{
                    alert("Bledne dane");
                }
            }, fail => {console.error(fail);});
        } catch(err){
            alert(err);
        }
    }

    return(
        <div>
            <Navbar/>
            <br /><br /><br /><br />
            <form>
                <label htmlFor='name'>Username</label>
                <input type='name' placeholder='username' id='name' name='name' value = {name} onChange = {(event) => {setName(event.target.value);}}/>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='password' id='password' name='password' value = {password} onChange = {(event) => {setPassword(event.target.value);}}/>
                <button type = "submit" onClick = {save}>Login</button>
            </form>
        </div>
    )
};

export default Login;