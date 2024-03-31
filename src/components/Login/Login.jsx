import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null)

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setRegisterError('')
        setSuccess('')

        // validation here .........

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('login successfully.')
            })
            .catch(error => {
                setRegisterError(error.message)
            })
    }

    const handleForgatePassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('email')
            return
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('please write a valid email')
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email.')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex flex-col">
                <div className="">
                    <h1 className="text-3xl font-bold">Login now!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgatePassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-secondary uppercase">Login</button>
                        </div>
                    </form>
                    {
                        registerError && <p className="text-red-500">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-500">{success}</p>
                    }
                    <p>New user? <Link className="underline" to='/register'>Please Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;