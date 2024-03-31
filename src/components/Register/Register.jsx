import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        // console.log(email, password, accepted)

        setRegisterError('')
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have one upper case')
            return
        }
        else if (!accepted) {
            setRegisterError('Accept our terms and condition.')
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('User created successfully.')

                // send verification email
                sendEmailVerification(result.user)
                .then(()=> {
                    alert('Please check your email and verify you email.')
                })
            })
            .catch(error => {
                // console.log(error)
                setRegisterError(error.message)
            })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="w-3/4 mb-4 px-4 py-2" type="email" name="email" placeholder="Email Address" id="1" required />
                    <br />
                    <input className="w-3/4 mb-4 px-4 py-2"
                        type={showPassword ? 'text' : "password"}
                        name="password"
                        placeholder="Password"
                        id="2"
                        required />
                    <button onClick={() => setShowPassword(!showPassword)} className="btn btn-sm btn-ghost">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                    <br />
                    <div className="my-2">
                        <input className="mr-2" type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Accept our <a href=""></a>terms and condition</label>
                    </div>
                    <input className="btn btn-secondary w-3/4 mb-4" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-500">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
                <p>Already have an account? <Link className="underline" to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;