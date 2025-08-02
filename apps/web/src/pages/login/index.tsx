import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { motion, AnimatePresence, animate } from "framer-motion";
import OTPInput from "react-otp-input";

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
    transition:{ duration: 0.5, ease: "easeOut" as const }
}

const animateHandsSVG = {
    initial:{ opacity: 0, y: 200 },
    animate:{ opacity: 1, y: 0 },
    exit:{ opacity: 0, y: 200 },
    transition:{ duration: 0.5, ease: "easeOut" as const }
}

const Login = () => {
    const [otp, setOtp] = useState<string | undefined>('')
    const [showOTP,setShowOTP] = useState<boolean>(false)
    
    const {register : registerPhone, handleSubmit : handleSubmitPhone, watch , formState: {errors : errorsPhone, isValid : isValidPhone}} = useForm<InputsPhone>()
    const onSubmitPhone: SubmitHandler<InputsPhone> = (data) => {
        console.log(data)
        setShowOTP(true)
    }

    const {register : registerOTP, handleSubmit : handleSubmitOTP, formState: {errors : errorsOTP, isValid : isValidOTP}} = useForm<InputsOTP>()
    const onSubmitOTP: SubmitHandler<InputsOTP>  = (data) => {
        console.log(data)
        setShowOTP(false)
    }
    
    return (
        <div className="flex-1 grid justify-around px-20 font-iranYekanX text-darkText max-h-screen">
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
                            autoComplete="off"
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
                        <button className={`btn !py-6 bg-mainColor/40 text-white rounded-xl border-0 duration-300 ${isValidPhone && '!bg-mainColor'}`} type="submit">ادامه</button>
                        </motion.form>
                    ):(
                        <motion.form 
                            key="otp-form"
                            {...formPhoneTransition}
                            className="flex flex-col gap-5" 
                            noValidate 
                            onSubmit={handleSubmitPhone(onSubmitOTP)}
                        >
                            <div className="form-control w-full space-y-2">
                                <label className="label">
                                    <span className="label-text text-sm">کد ارسال شده به شماره موبایل {watch("phone")} را وارد کنید</span>
                                </label>
                                <label dir="ltr" className="input-bordered">
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        shouldAutoFocus
                                        skipDefaultStyles
                                        containerStyle={`flex gap-10`}
                                        renderInput={(props) =>
                                            <input {...props} {...registerOTP(`otp1`)} className="input h-15 rounded-lg text-center" />}
                                    />
                                </label>
                            </div>
                            <button className={`btn !py-6 bg-mainColor/40 text-white rounded-xl border-0 duration-300 ${isValidPhone && '!bg-mainColor'}`} type="submit">ادامه</button>
                        </motion.form>
                    )}
                </AnimatePresence>
                <div className="flex gap-1 text-xs">
                    ورود شما به معنای پذیرش 
                    <div onClick={() => setShowOTP(!showOTP)} className="underline text-underlineColor cursor-pointer"> شرایط خدمات و حریم خصوصی </div>
                    است
                </div>
            </div>
            <div className="mt-auto relative overflow-hidden">
                 <AnimatePresence mode="wait">
                 {!showOTP ?
                  <motion.img key="handsLogin" {...animateHandsSVG} src="/icons/handsLogin.svg" alt="hands image" /> 
                  : 
                  <motion.img key="otpHands" {...animateHandsSVG} src="/icons/otpHands.svg" alt="hands image" />}        

                 </AnimatePresence>
                <img src="/icons/blur.svg" className="absolute top-0" alt="hands image" />        
                <img src="/icons/blur2.svg" className="absolute top-0" alt="hands image" />        
            </div>
        </div>
    );
}

export default Login;