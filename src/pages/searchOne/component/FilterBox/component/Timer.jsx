import {useCallback, useEffect, useMemo, useState} from "react";

export const Timer = () => {
    const CYCLE_DURATION = 36 * 60 * 1000;

    const getInitialCycleData = () => {
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime();
        const currentCycle = Math.floor(elapsed / CYCLE_DURATION) + 1;
        const nextCycleTime = (currentCycle * CYCLE_DURATION) + startTime.getTime();
        const timeLeft = nextCycleTime - now.getTime();

        return {cycleCount: currentCycle, timeLeft};
    };

    const [time, setTime] = useState(new Date());
    const [{cycleCount, timeLeft}, setCycleData] = useState(getInitialCycleData);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleData(getInitialCycleData());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(prevTime => {
                return new Date(prevTime.getTime() + 1000);
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formattedTime = useMemo(() => {
        const minutes = String(Math.floor(timeLeft / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, '0');
        return {
            timeString: time.toLocaleTimeString().substring(0, time.toLocaleTimeString().length - 3),
            minutes,
            seconds
        };
    }, [timeLeft]);

    const handleTime = useCallback(() => {
        return (
            <>
                <p>{`[${formattedTime.timeString}] ㅣ 현재 ${cycleCount}주기 ㅣ 다음 주기까지 ${formattedTime.minutes}분 ${formattedTime.seconds}초`}</p>
            </>
        );
    }, [formattedTime, cycleCount]);

    return (
        <div
            className="w-[386px] h-[50px] rounded-[5px] border border-[#9f7394] justify-center items-center flex text-[#3f3f3f] text-sm tracking-wider">
            {handleTime()}
        </div>
    );
};
