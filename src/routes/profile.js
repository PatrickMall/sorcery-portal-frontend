import { useState } from "react"
import FormInput from "../components/common/form-input"
import authAxios from "../lib/authAxios"
import apiRoute from "../lib/apiRoute"

const Profile = ({ user }) => {
    const [updateProfile, setUpdateProfile] = useState(false)
    const [updateFirstName, setUpdateFirstName] = useState(user.first_name)
    const [updateLastName, setUpdateLastName] = useState(user.last_name)
    const [updateEmail, setUpdateEmail] = useState(user.email)
    const [updatePhoneNumber, setUpdatePhoneNumber] = useState(user.phone_number)
  

    
    const deleteProfile = async () => {
        const response = await authAxios.delete(`${apiRoute}signup`);
        window.location.href = "/";
        }
    
    return (
        <div className="flex justify-center items-center">
        <div className="bg-black-transparent border border-white p-16 rounded-lg w-4/12">
            {updateProfile && (
                <div className= "flex flex-col items-center">
                    <h2 className="forum text-5xl mb-8">Update Your details</h2>
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
                    <h2 className="forum text-5xl mb-8">Your details</h2>
                    <p className="forum text-3xl mb-8">First Name: {updateFirstName}</p>
                    <p className="forum text-3xl mb-8">Last Name: {updateLastName}</p>
                    <p className="forum text-3xl mb-8">Email: {updateEmail}</p>
                    <p className="forum text-3xl mb-8">Phone Number: {updatePhoneNumber}</p>
                </div>
            )}
            <div className="flex flex-col items-center justify-around">
                {updateProfile ? <button className="button mt-8" onClick={() => setUpdateProfile(false)}>Save</button> : <button className="button mt-8" onClick={() => setUpdateProfile(true)}>Update My Profile</button>}
                    <button className="button mt-12" onClick={(e) => { e.preventDefault();  deleteProfile()}}>Delete my account</button>
            </div>
            </div>
            </div>
            )
            
}

export default Profile
