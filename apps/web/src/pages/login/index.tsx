import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

type InputsPhone = {
    phone: number
}
type InputsOTP = {
    otp1: number
    otp2: number
    otp3: number
    otp4: number
}

const formPhoneTransition = {
    initial:{ opacity: 1, y: 0 },
    animate:{ opacity: 1, y: 0 },
    exit:{ opacity: 0, x: -20 },
    transition:{ duration: 0.3, ease: "easeOut" as const }
}

const Login = () => {
    const {register : registerPhone, handleSubmit : handleSubmitPhone, watch , formState: {errors : errorsPhone, isValid : isValidPhone}} = useForm<InputsPhone>()
    const onSubmitPhone: SubmitHandler<InputsPhone> = (data) => {
        console.log(data)
        setShowOTP(true)
    }
    const [showOTP,setShowOTP] = useState<boolean>(false)

    const {register : registerOTP, handleSubmit : handleSubmitOTP, formState: {errors : errorsOTP, isValid : isValidOTP}} = useForm<InputsOTP>()
    const onSubmitOTP: SubmitHandler<InputsOTP>  = (data) => {
        console.log(data)
        setShowOTP(false)
    }
    
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
                <AnimatePresence mode="wait">
                    {!showOTP ?(
                        <motion.form 
                            key="phone-form"
                            {...formPhoneTransition}
                            className="flex flex-col gap-5" 
                            noValidate 
                            onSubmit={handleSubmitPhone(onSubmitPhone)}
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
                        <motion.form 
                            key="otp-form"
                            {...formPhoneTransition}
                            className="flex flex-col gap-5" 
                            noValidate 
                            onSubmit={handleSubmitOTP(onSubmitOTP)}
                        >
                            <div className="form-control w-full space-y-2">
                                <label className="label">
                                    <span className="label-text text-sm flex gap-1 justify-center">
                                        کد ارسال شده به شماره موبایل  <span>{ watch("phone") }</span> را وارد کنید  
                                    </span>
                                </label>
                                <div className="flex justify-around">
                                    <input type="code" maxLength={1} className="input input-bordered w-2/12 h-15 rounded-xl text-center text-xl" />
                                    <input type="code" maxLength={1} className="input input-bordered w-2/12 h-15 rounded-xl text-center text-xl" />
                                    <input type="code" maxLength={1} className="input input-bordered w-2/12 h-15 rounded-xl text-center text-xl" />
                                    <input type="code" maxLength={1} className="input input-bordered w-2/12 h-15 rounded-xl text-center text-xl" />
                                </div>
                            </div>
                            <button className={`btn !py-6 bg-mainColor/40 text-white rounded-lg border-0 duration-300 ${isValidOTP && '!bg-mainColor'}`} type="submit">تایید</button>
                        </motion.form>
                    )}
                </AnimatePresence>
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