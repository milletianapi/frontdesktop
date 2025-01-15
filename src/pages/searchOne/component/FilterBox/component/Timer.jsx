import { useCallback, useEffect, useMemo, useState } from "react";

export const Timer = (props) => {
    const CYCLE_DURATION = 36 * 60 * 1000;
    const isAll = props.isAll;

    const getInitialCycleData = () => {
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime();
        const currentCycle = Math.floor(elapsed / CYCLE_DURATION) + 1;
        const nextCycleTime = currentCycle * CYCLE_DURATION + startTime.getTime();
        const timeLeft = nextCycleTime - now.getTime();

        return { cycleCount: currentCycle, timeLeft };
    };

    const [time, setTime] = useState(new Date());
    const [{ cycleCount, timeLeft }, setCycleData] = useState(getInitialCycleData);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleData(getInitialCycleData());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((prevTime) => {
                return new Date(prevTime.getTime() + 1000);
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    // 1분마다 00초에 실행되도록 설정
    useEffect(() => {
        const executeOnMinute = () => {
            props.setOneMinute(Math.floor(Math.random()*100));
        };

        const alignToNextMinute = () => {
            const now = new Date();
            const seconds = now.getSeconds();
            const delay = (60 - seconds) * 1000; // 다음 00초까지 남은 시간 계산
            setTimeout(() => {
                executeOnMinute(); // 첫 실행
                setInterval(executeOnMinute, 60000); // 이후 매 1분마다 실행
            }, delay);
        };

        alignToNextMinute();
    }, [cycleCount, timeLeft]);

    const formattedTime = useMemo(() => {
        const minutes = String(Math.floor(timeLeft / (1000 * 60))).padStart(2, "0");
        const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, "0");
        return {
            timeString: time.toLocaleTimeString().substring(0, time.toLocaleTimeString().length - 3),
            minutes,
            seconds,
        };
    }, [timeLeft]);

    const handleTime = useCallback(() => {
        return (
            <>
                <p>{`[${formattedTime.timeString}] ㅣ `}</p>
                <p>{`현재 ${cycleCount}주기${isAll ? `` : ` ㅣ `}`}</p>
                <p>{`다음 주기까지 ${formattedTime.minutes}분 ${formattedTime.seconds}초`}</p>
            </>
        );
    }, [formattedTime, cycleCount]);

    return (
        <div
            className={`${isAll ? `ml-[15px] w-[251px] h-[62px] flex-wrap` : `${props.isMain ? `w-full h-[64px]` : `w-[386px] h-[50px]`} tracking-wider`} button1 middle text-[#3f3f3f] text-sm `}>
            {handleTime()}
            {isAll && <div className={"text-[#999999] middle text-[12px]"}>※ 주머니는 남은시간 30분에 갱신</div>}
        </div>
    );
};
