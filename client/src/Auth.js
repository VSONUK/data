import React,{useState,useSEffect} from 'react'
import { Alert } from 'antd';
import "./authstyle.css"

const Auth =()=> {
    const [username,setUserName] =  useState("")
    const [email,setEmail] =  useState("")
    const [password,setPasword] =  useState("")
    const [successMessage, setSuccessMessage] = useState(false)

    const handleOnSubmit =() =>{
        // event.defaultPrevent()
    }
 
    const handleFomData = (e)=>{
   
     if(username!==""||email!==""||password!==""){
        console.log(username,email,password)
        setSuccessMessage(true)
        setUserName("")
        setEmail("")
        setPasword("")
     }
     else{
         console.log("invalid")
     }
    } 
    return (
        <div>
        <h3 style={{textAlign:"center"}}>Sign up</h3>
        {
            successMessage===true?  <Alert style={{marginLeft:"10%",marginRight:"20%"}} message="Registered Successfully" type="success" showIcon />:""
        }
         <div className='form-group row' style={{marginBottom:"3%",marginTop:"4%",width:"70%",marginLeft:"10%",marginRight:"10%"}}>
            <input 
              onChange={(text)=>setUserName(text.target.value)}
              value={username} 
              className='input' 
              type='text' 
              placeholder='user name'/>
          </div> 
          <div className='form-group row' style={{marginBottom:"3%",marginTop:"4%",width:"70%",marginLeft:"10%",marginRight:"10%"}}>
            <input 
              onChange={(text)=>setEmail(text.target.value)}
              value={email} 
              className='input' 
              type='text' 
              placeholder='Email'/>
          </div>
          <div className='form-group row' style={{marginBottom:"3%",marginTop:"4%",width:"70%",marginLeft:"10%",marginRight:"10%"}}>
            <input 
            onChange={(text)=>setPasword(text.target.value)}
            value={password}
            className='input' 
            type='password'
            placeholder='Password'/>
          </div>
          <div className='form-group row' style={{width:"70%",marginLeft:"10%",marginRight:"10%"}}>
            {/* <button onClick={handleOnSubmit} className='btn' type='submit'>Log In</button> */}
          <button className='btn' onClick={handleFomData} >Sign up</button>
          </div>
        {/* </form> */}
    </div>
    )
}

export default Auth
