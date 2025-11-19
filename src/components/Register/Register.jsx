import React, { use, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {createUser, setUser} = use(AuthContext);

  const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = (e) =>{
        e.preventDefault();
        console.log(e.target)
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photo, email, password)

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{6,}$/;

        if(!passwordPattern.test(password)){
          setError("Password must be at least 6 characters, include 1 uppercase, 1 lowercase, and 1 special character.")
          return
        }
        // reset status
        setError('');
        setSuccess(false)


        createUser(email, password)
        .then(result =>{
            const user = result.user;
            // console.log(user)
            setUser(user)
            setSuccess(true);
            form.reset();
            navigate(location?.state|| '/')

            const profile = {
              displayName: name,
              photoURL: photo
            }

            updateProfile(result.user, profile)
            .then(() =>{ })
            .catch()
        })
        .catch(error =>{
            console.log(error.message);
            // alert(error.message)
            setError(error.message)
        })
    }

    return (
         <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body w-75">
              <h1 className="text-2xl font-bold">Register now!</h1>
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                {/* name */}
                 <label className="label">Name</label>
                <input 
                  name='name' 
                  type="text" 
                  className="input" 
                  placeholder="Name"
                  required 
                />
                {/* photoURL */}
                 <label className="label">PhotoURL</label>
                <input 
                   name='photo' 
                   type="text" 
                   className="input" 
                   placeholder="PhotoURL" 
                />
                {/* email */}
                <label className="label">Email</label>
                <input 
                   name='email' 
                   type="email" 
                   className="input" 
                   placeholder="Email" 
                   required
                />
                {/* password */}
                <label className="label">Password</label>
                <input
                  name='password'
                  type="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <button type='submit' className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {
                success && <p className='text-green-600'>Account created successfully.</p>
              }
              {
                error && <p className='text-red-600'>{error}</p>
              }
              </form>
             <p>Already have an account? Please, <Link to={'/login'} className="text-green-700  hover:text-green-400 underline">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Register;

 
