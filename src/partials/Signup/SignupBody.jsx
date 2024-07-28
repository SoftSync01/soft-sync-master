import { useState } from 'react';
import { signupFields } from "./signupFields"
import Input from "./SignupInput";
import FormAction from './formAction';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword} from "firebase/auth";
import { db } from '../../firebase/firebase-config';
import { set, ref} from 'firebase/database';


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function SignupBody(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  function createdata(userid,email,username){
    const dbRef = ref(db,"user/" + userid);
    set(dbRef,{
        email: email,
        username: username,
        card01: { visible: true, position: 1 },
        card02: { visible: true, position: 2 },
        card03: { visible: true, position: 3 },
        card04: { visible: true, position: 4 },
        card05: { visible: true, position: 5 },
        card06: { visible: true, position: 6 },
        card07: { visible: true, position: 7 },
        card08: { visible: true, position: 8 },
        card09: { visible: true, position: 9 },
        card10: { visible: true, position: 10 },
        card11: { visible: true, position: 11 },
        card12: { visible: true, position: 12 },
        card13: { visible: true, position: 13 },
    })
    alert("User Creation Successful");
}

  //handle Signup API Integration here
  const createAccount= async(e)=>{
        //e.preventDefault();
        console.log("Sign Up Button Pressed");
        const email = signupState.emailAddress;
        const password = signupState.password;
        const username = signupState.username;
        console.log(emailAddress);
        console.log(username);
        console.log(password);
        try{
        await createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            createdata(user.uid,email,username)
            navigate('/');
        })
        } catch (err){
            console.error(err);
        }
        
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="w-3/4">
            {fields.map(field => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
            <FormAction handleSubmit={handleSubmit} text="Signup" />
          </div>
        </div>
      </form>
    )
}