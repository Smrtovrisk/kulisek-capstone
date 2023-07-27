import { useState, useContext } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './styles.css'; 
import { UserContext } from './UserContext';

function Login() {
let [emailid,setEmailiId]=useState("");
let [password,setPassword]=useState("");
let [typeofuser,setTypeOfUser]=useState("");
let navigate = useNavigate();
const { setUser } = useContext(UserContext);

let signIn=async (event)=> {
    event.preventDefault();
    let login = {"emailid":emailid,"password":password,"typeofuser":typeofuser};
    try{
    let result = await axios.post("http://localhost:8081/login/signIn",login);
    //console.log(result.data);
    if(result.data=="Admin Success"){
        setUser({ email: emailid, type: 'admin' });
        navigate("/Admin");
    }else if(result.data=="Customer success"){
        setUser({ email: emailid, type: 'customer' });
        navigate("/Customer");
    }else {
        alert(result.data);
    }
    }catch(ex){
        console.log(ex);
    }
}
return(
    <div> <h1>Welcome to Medicare</h1>
    <div className="login-div">
      <div>Login Page</div>
      <form onSubmit={signIn}>
        <label>Email</label>
        <input type="email" name="emidlid" onChange={e=>setEmailiId(e.target.value)}/><br/>
        <label>Password</label>
        <input type="password" name="password" onChange={e=>setPassword(e.target.value)}/><br/>
        <label>Type of user</label>
        <input type="radio" name="typeofuser" value="admin" onChange={e=>setTypeOfUser(e.target.value)}/>Admin
        <input type="radio" name="typeofuser" value="customer" onChange={e=>setTypeOfUser(e.target.value)}/>Customer<br/>
        <input type="submit" value="submit"/>
        <input type="reset" value="reset"/><br/>
        <Link to="signup">SignUp</Link>
      </form>
    </div>
    <p>Hello, this is FSD Capstone project</p>
<p>Author: martin.kulisek@vodafone.com</p>
<p>Git: <a href="https://github.com/Smrtovrisk/kulisek-capstone">https://github.com/Smrtovrisk/kulisek-capstone</a></p>
    </div>
  )
}

export default Login;