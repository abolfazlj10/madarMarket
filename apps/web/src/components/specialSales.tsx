import { useState, useEffect } from 'react';

const SpecialSales = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { hours, minutes, seconds } = prevTime;
                
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            // Timer finished
                            return { hours: 0, minutes: 0, seconds: 0 };
                        }
                    }
                }
                
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0');
    };

    return (
        <div className="border bg-[#FDF2F6] border-[#FFCACA] w-full flex justify-between rounded-xl px-4 py-3 mt-5">
            <div className="flex items-center gap-2">
                <img src="/icons/fireIcon.svg" />
                <div className="text-[#DE030A] text-sm">
                    <div>جشنواره فروش</div>
                    <div className="flex">
                        <div className="font-bold">ویـــــــــــژه!</div>
                        <img src="/icons/leftArrow.svg" />
                    </div>
                </div>
            </div>
            <div className="flex gap-2 items-center text-sm text-redBg">
                <div className="bg-[#FA2C37] rounded font-semibold text-white px-2 py-1 text-base overflow-hidden">
                    <span className="countdown leading-none">
                        <span 
                            style={{"--value": timeLeft.seconds} as React.CSSProperties} 
                            aria-live="polite" 
                            aria-label={`${timeLeft.seconds} ثانیه`}
                            className="block"
                        >
                            {formatTime(timeLeft.seconds)}
                        </span>
                    </span>
                </div>:
                <div className="bg-[#FA2C37] rounded font-semibold text-white px-2 py-1 text-base overflow-hidden">
                    <span className="countdown leading-none">
                        <span 
                            style={{"--value": timeLeft.minutes} as React.CSSProperties} 
                            aria-live="polite" 
                            aria-label={`${timeLeft.minutes} دقیقه`}
                            className="block"
                        >
                            {formatTime(timeLeft.minutes)}
                        </span>
                    </span>
                </div>:
                <div className="bg-[#FA2C37] rounded font-semibold text-white px-2 py-1 text-base overflow-hidden">
                    <span className="countdown leading-none">
                        <span 
                            style={{"--value": timeLeft.hours} as React.CSSProperties} 
                            aria-live="polite" 
                            aria-label={`${timeLeft.hours} ساعت`}
                            className="block"
                        >
                            {formatTime(timeLeft.hours)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SpecialSales