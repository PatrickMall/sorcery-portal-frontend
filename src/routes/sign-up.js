import { useState } from 'react'
import FormInput from '../components/common/form-input'
import apiRoute from '../lib/apiRoute'
import authAxios from '../lib/authAxios';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const Submit = async () => {
        const user = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
        }
    
        try {
            const response = await authAxios.post(`${apiRoute}signup`, { user: user });
            console.log(response);
            if (response.status === 200) {
                const tokenResponse = response.headers.get("Authorization")
                localStorage.setItem("token", tokenResponse);
                 console.log(localStorage)
                const loginResponse = await authAxios.post(`${apiRoute}login`, {
                    user: { email: user.email, password: user.password }
                })
                
                setError("");
                // window.location.href = "/";
            }
            setError("");
            // window.location.href = "/";
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    



    return (
        <section className='flex flex-col-2 items-center justify-around'>
            <div className='bg-black-transparent border border-white p-16 rounded-lg w-4/12'>
                <div className='flex flex-col items-center justify-around'>
                <h2 className="forum text-5xl mb-8">Sign Up</h2>
                <form onSubmit={(e) => {
                e.preventDefault()
                Submit()
            }}>
                <FormInput label={"first name"} type={"text"} value={firstName} onChange={setFirstName}  />
                <FormInput label={"last name"} type={"text"} value={lastName} onChange={setLastName}  />
                <FormInput label={"phone number"} type={"text"} value={phoneNumber} onChange={setPhoneNumber}  />
                <FormInput label={"email"} type={"email"} value={email} onChange={setEmail} />
                <FormInput label={"password"} type={"password"} value={password} onChange={setPassword} />
                <button className='button' type='submit'>Sign Up</button>
                    </form>
                    </div>
            </div>
            {error && <div className="bg-red-200 w-full rounded">Error: {error}</div>}
        </section>
    )
}

export default SignUp