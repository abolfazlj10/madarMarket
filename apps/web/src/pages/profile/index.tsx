import { useUser } from "../../context/userContext"
import { RiUserSmileFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoginUser } from "../../hooks/useLogin";
import { FadeLoader } from "react-spinners";
const Profile = () => {
    const { user, logout } = useUser()
    const navigate = useNavigate()
    const { data: userData } = isLoginUser()
    const logoutUser = () => {
        logout()
        navigate('/login')
    }
    useEffect(() => {
        if(userData != undefined){
            if(!userData?.success){
                navigate('/login')
            }
        }
    },[])
    return(
        <>
        {user ? (
        <div className="flex-1 flex gap-5 items-center flex-col">
            <div className="text-2xl font-bold w-full bg-[#FF5C01] rounded-2xl text-white py-5">
                <div className="avatar -mb-10 flex justify-center items-center">
                    <RiUserSmileFill className="text-secondary text-[90px]" />
                </div>
            </div>
            <div className="flex flex-col items-center border-dashed border-2 border-gray-500 rounded-2xl p-5 w-full">
                <div className="text-2xl font-bold text-gray-500 mb-2">
                    ابوالفضل جمشیدی
                </div>
                <div className="text-sm text-gray-500 mb-2">
                    {user?.phone}
                </div>
            </div>
            <div onClick={logoutUser} className="btn btn-block btn-outline hover:text-white btn-error mt-auto mb-20">خروج</div>
        </div>
        ) : (
            <div className="flex-1 flex justify-center items-center">
                <FadeLoader color="#FF6A29"/>
            </div>
        )}
        </>
    )
}
export default Profile;