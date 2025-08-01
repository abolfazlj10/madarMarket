import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { motion } from "framer-motion";

type Inputs = {
    phone: number
}

const formPhoneTransition = {
    initial:{ opacity: 0, y: 20 },
    animate:{ opacity: 1, y: 0 },
    exit:{ opacity: 0, y: -20 },
    transition:{ duration: 0.3, ease: "easeOut" as const }
}

const Login = () => {
    const {register : registerPhone, handleSubmit : handleSubmitPhone, formState: {errors : errorsPhone, isValid : isValidPhone}} = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        setShowOTP(true)
    }
    const [showOTP,setShowOTP] = useState<boolean>(false)
    
    return (
        <div className="flex-1 grid justify-around font-iranYekanX text-darkText max-h-screen">
            <div className="flex justify-center items-center pt-14">
                <div className="space-y-2">
                    <img src="/logo/madarLoginLogo.svg" alt="logo" className="mx-auto" />
                    <img src="/logo/madarLoginLogoText.svg" alt="logo text" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-medium">ورود</div>
                {!showOTP ?(
                    <motion.form 
                        {...formPhoneTransition}
                        className="flex flex-col gap-5" 
                        noValidate 
                        onSubmit={handleSubmitPhone(onSubmit)}
                    >
                    <div className="form-control w-full space-y-2">
                        <label className="label">
                            <span className="label-text text-sm">شماره موبایل خود را وارد کنید</span>
                        </label>
                        <label className={`input input-bordered rounded-lg pr-0 flex items-center overflow-hidden focus-within:outline-0 gap-2 w-full ${errorsPhone.phone ? 'input-error' : isValidPhone ? 'border-mainColor' : ''}`}>
                            <div className={`h-full w-10 flex items-center justify-center bg-[#EDEDED] text-[#A3A3A3] border-l duration-300${isValidPhone && ' border-mainColor'}`}>
                                <HiMiniDevicePhoneMobile />
                            </div>
                            <input
                                {...registerPhone('phone',{
                                    required: 'شماره تماس الزامی‌ست',
                                    pattern: {
                                        value: /^09\d{9}$/,
                                        message: "شماره موبایل باید با 09 شروع شود و 11 رقم باشد",
                                    }
                                })}
                                type="tel"
                                className="tabular-nums flex-1 duration-500 text-right"
                                placeholder="09123456789"
                                maxLength={11}
                                minLength={11}
                            />
                        </label>
                    </div>
                    <button className={`btn !py-6 bg-mainColor/40 text-white rounded-lg border-0 duration-300 ${isValidPhone && '!bg-mainColor'}`} type="submit">ادامه</button>
                    </motion.form>
                ):(
                    <div>test</div>
                )}
                <div className="flex gap-1 text-xs">
                    ورود شما به معنای پذیرش 
                    <div className="underline text-underlineColor cursor-pointer"> شرایط خدمات و حریم خصوصی </div>
                    است
                </div>
            </div>
            <div className="mt-auto relative overflow-hidden">
                <img src="/icons/handsLogin.svg" alt="hands image" />        
                <img src="/icons/blur.svg" className="absolute top-0" alt="hands image" />        
                <img src="/icons/blur2.svg" className="absolute top-0" alt="hands image" />        
            </div>
        </div>
    );
}

export default Login;