import { useState } from "react"
import FormInput from "../components/common/form-input"

const Profile = ({ user }) => {
    const [updateProfile, setUpdateProfile] = useState(false)
    const [updateFirstName, setUpdateFirstName] = useState(user.first_name)
    const [updateLastName, setUpdateLastName] = useState(user.last_name)
    const [updateEmail, setUpdateEmail] = useState(user.email)
    const [updatePhoneNumber, setUpdatePhoneNumber] = useState(user.phone_number)
    console.log(updateFirstName)
    return (
        <div className="bg-black-transparent p-16 rounded-lg">
            {updateProfile && (
                <div>
                    <h2 className="forum text-5xl mb-16">Update Your details</h2>
                    <form>
                        <FormInput type={"text"} label={"First Name"} onChange={setUpdateFirstName} value={updateFirstName} />
                        <FormInput type={"text"} label={"Last Name"} onChange={setUpdateLastName} value={updateLastName} />
                        <FormInput type={"email"} label={"Email"} onChange={setUpdateEmail} value={updateEmail} />
                        <FormInput type={"text"} label={"Phone Number"} onChange={setUpdatePhoneNumber} value={updatePhoneNumber} />
                    </form>
                </div>
            )}
            {!updateProfile && (
                <div>
                    <h2 className="forum text-5xl mb-16">Your details</h2>
                    <p className="forum text-3xl mb-8">First Name: {updateFirstName}</p>
                    <p className="forum text-3xl mb-8">Last Name: {updateLastName}</p>
                    <p className="forum text-3xl mb-8">Email: {updateEmail}</p>
                    <p className="forum text-3xl mb-8">Phone Number: {updatePhoneNumber.toString().charAt(0) === "4" ? `+` + `${updatePhoneNumber.toString()}` : `0` + `${updatePhoneNumber.toString()}`}</p>
                </div>
            )}
            <div className="flex flex-col-2 items-center justify-around">
                <button className="button">Logout</button>
                
                {updateProfile ? <button className="button" onClick={() => setUpdateProfile(false)}>Save</button> : <button className="button" onClick={() => setUpdateProfile(true)}>Update My Profile</button>}
        
                <button className="button">Delete my account</button>
            </div>
        </div>
    )
}

export default Profile
