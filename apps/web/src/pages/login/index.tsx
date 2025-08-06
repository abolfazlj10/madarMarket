import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { RiEditBoxLine } from "react-icons/ri";
import { TbClockHour5 } from "react-icons/tb";
import OTPInput from "react-otp-input";
import { useLogin, useVerify } from "../../hooks/useLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type InputsPhone = {
    phone: string
}
type InputsOTP = {
    otp: string
}

const formTransition = {
    initial:{ opacity: 1, y: 20, scale: 0.98 },
    animate:{ opacity: 1, y: 0, scale: 1 },
    exit:{ opacity: 0, y: -10, scale: 0.98 },
    transition:{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }
}

const animateHandsSVG = {
    initial:{ opacity: 0, y: 300, },
    animate:{ opacity: 1, y: 0 },
    exit:{ opacity: 0, y: 300,},
    transition:{ duration: 0.7, ease: 'easeOut' as const }
}

const Login = () => {
    const [otp, setOtp] = useState<string | undefined>('')
    const [showOTP, setShowOTP] = useState<boolean>(false)

    const [timeLeft, setTimeLeft] = useState<number>(10)
    const [canResend, setCanResend] = useState<boolean>(false)

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!showOTP) return;
        if (timeLeft <= 0) {
            setCanResend(true)
            return
        }
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearTimeout(timer)
    }, [timeLeft, showOTP])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const handleResend = () => {
        const phone = watchPhone("phone")
        if (!phone) {
            toast.error("شماره موبایل معتبر نیست")
            return
        }

        setOtp('')
    
        mutate(phone, {
            onSuccess: (data) => {
                toast.success(`کد جدید ارسال شد ${data.otp}`, {
                    duration: 5000,
                })
                setTimeLeft(60)
                setCanResend(false)
            },
            onError: () => {
                toast.error("ارسال مجدد با مشکل مواجه شد.")
            }
        })
    }
    const { mutate } = useLogin()
    const { register: registerPhone, handleSubmit: handleSubmitPhone, watch: watchPhone, formState: { errors: errorsPhone, isValid: isValidPhone } } = useForm<InputsPhone>()
    const onSubmitPhone: SubmitHandler<InputsPhone> = (data) => {
        mutate(data.phone.toString(),{
            onSuccess: (data) => {
                toast.success(`کد ارسال شد ${data.otp}`, {
                    duration: 5000,
                })
                console.log(data)
                setShowOTP(true)
                setTimeLeft(60)
                setCanResend(false)
            }
        })
    }

    const { register: registerOTP, handleSubmit: handleSubmitOTP, setValue, trigger,reset, watch, formState: { errors: errorsOTP, isValid: isValidOTP }} = useForm<InputsOTP>({
        mode: "onChange",
        defaultValues: { otp: "" },
        resolver: (values) => {
            const errors: any = {};
            if (!values.otp || values.otp.length < 4) {
                errors.otp = {
                    type: "required",
                    message: "کد OTP باید 4 رقم باشد"
                };
            }
            return {
                values,
                errors
            };
        }
    });

    useEffect(() => {
        setValue("otp", otp || "");
        trigger("otp");
    }, [otp, setValue, trigger])

    const { mutate: mutateVerify } = useVerify()
    const onSubmitOTP: SubmitHandler<InputsOTP>  = (data) => {        
        if(timeLeft == 0){
            toast.error('مجددا کد را دریافت کنید.')
        }else{
            mutateVerify({phone: watchPhone("phone") ,otp: data.otp}, {
                onSuccess: (data) => {
                    if(data.success){
                        toast.success('ورود با موفقیت انجام شد.')
                        const token = data.token
                        localStorage.setItem('tokenMarket', token)
                        queryClient.invalidateQueries({ queryKey: ['me'] })
                        navigate('/')
                    }else{
                        setOtp('')
                        toast.error('کد نامعتبر')
                    }
                }
            })
        }
    }

    return (
        <div className="flex-1 grid grid-rows-[fr_1fr_1fr] justify-around font-iranYekanX text-darkText max-h-screen h-screen">
            <div className="flex justify-center items-center">
                <div className="space-y-2">
                    <img src="/logo/madarLoginLogo.svg" alt="logo" className="mx-auto" />
                    <img src="/logo/madarLoginLogoText.svg" alt="logo text" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-medium">ورود</div>
                <AnimatePresence mode="wait" initial={false}>
                    {!showOTP ? (
                        <motion.form
                            key="phone-form"
                            {...formTransition}
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
                                        {...registerPhone('phone', {
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
                            <button className={`btn !py-6 text-white rounded-xl border-0 duration-300 ${isValidPhone ? '!bg-mainColor' : '!bg-[#FF6A29]/40'}`} type="submit">ادامه</button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-form"
                            {...formTransition}
                            className="flex flex-col gap-5"
                            noValidate
                            onSubmit={handleSubmitOTP(onSubmitOTP)}
                        >
                            <div className="form-control w-full space-y-2">
                                <label className="label">
                                    <span className="label-text text-sm">کد ارسال شده به شماره موبایل را وارد کنید</span>
                                </label>
                                <label dir="ltr" className="input-bordered">
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        shouldAutoFocus
                                        skipDefaultStyles
                                        containerStyle={`flex gap-10`}
                                        inputStyle="input h-15 rounded-lg text-center"
                                        renderInput={(props) =>
                                            <input {...props} className={`input h-15 rounded-xl text-center focus-within:outline-none focus:border-mainColor ${props.value ? 'border-black' : ''}`} />}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1 text-[#C4C2C0] text-sm">
                                    <TbClockHour5 className="text-xl" />
                                    {canResend ? (
                                        <div
                                            onClick={handleResend}
                                            className="text-mainColor cursor-pointer border border-mainColor rounded-lg py-1 px-3"
                                        >
                                            ارسال مجدد کد
                                        </div>
                                    ) : (
                                        <>
                                            <div>دریافت مجدد کد</div>
                                            <div className="border border-[#EDEDED] rounded-lg py-1 px-3 text-mainColor">{formatTime(timeLeft)}</div>
                                        </>
                                    )}
                                </div>
                                <div onClick={() => setShowOTP(false)} className="flex items-center gap-1 text-[#787471] cursor-pointer text-sm">
                                    <div><RiEditBoxLine /></div>
                                    <div>ویرایش شماره</div>
                                </div>
                            </div>
                            <button
                                className={`btn !py-6 text-white rounded-xl border-0 duration-300 ${isValidOTP && otp && otp.length === 4 ? "!bg-mainColor" : "!bg-mainColor/40"}`}
                                type="submit"
                                disabled={!isValidOTP || !otp || otp.length < 4}
                            >
                                ادامه
                            </button>
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
                <AnimatePresence mode="wait">
                    {!showOTP ?
                        <motion.img key="handsLogin" {...animateHandsSVG} src="/icons/handsLogin.svg" alt="hands image" />
                        :
                        <motion.img key="otpHands" {...animateHandsSVG} src="/icons/otpHands.svg" className="mx-auto duration-100" alt="hands image" />}
                </AnimatePresence>
                <img src="/icons/blur.svg" className="absolute top-0 right-0" alt="hands image" />
                <img src="/icons/blur2.svg" className="absolute top-0 left-0" alt="hands image" />
            </div>
        </div>
    );
}

export default Login;
