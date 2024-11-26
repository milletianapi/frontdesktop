import colors from "../pages/searchAll/component/AllPouchBox/mabi.total.json";
import {useEffect, useState} from "react";

export const ColorList = () => {
    const [cl, setCl] = useState([]);

    function areArraysIdentical(arr1, arr2) {
        return arr1.every(item1 =>
            arr2.some(item2 =>
                item1.r === item2.r &&
                item1.g === item2.g &&
                item1.b === item2.b
            )
        ) && arr2.every(item2 =>
            arr1.some(item1 =>
                item1.r === item2.r &&
                item1.g === item2.g &&
                item1.b === item2.b
            )
        );
    }

    function rgbToHue(cr, cg, cb) {
        // RGB 값을 [0, 1]로 정규화
        let r = cr/255;
        let g = cg/255;
        let b = cb/255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        if (delta === 0) return 0; // 무채색 (Hue는 0으로 설정)

        let hue;
        if (max === r) {
            hue = ((g - b) / delta) % 6;
        } else if (max === g) {
            hue = (b - r) / delta + 2;
        } else {
            hue = (r - g) / delta + 4;
        }

        hue *= 60; // 각도로 변환
        if (hue < 0) hue += 360; // 음수일 경우 보정

        return hue;
    }

    function sortColorsByHue(colors) {
        return colors
            .map(color => ({
                _id: { ...color._id }, // _id 객체를 복사
                hue: rgbToHue(color._id.r, color._id.g, color._id.b) // Hue 계산
            }))// Hue 기준 정렬
    }

    useEffect(() => {
        const result = sortColorsByHue(colors)
        const array = [...result]
        const sorted = array.sort((a, b) => a.hue - b.hue);

        console.log(areArraysIdentical(colors, sorted));
        setCl(sorted);
        console.log(sorted);
        // 원본 데이터 안전하게 처리
    }, []);
    return (
        <>
        <div className="w-[806px] px-[15px] py-3 bg-white flex justify-center">
            <div
                className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
                <ul className="flex flex-wrap w-[765px] border">
                    {cl.map((color, index) => {
                        return (
                            <li key={index} className={`w-5 h-5`}
                                style={{backgroundColor: `rgb(${color._id.r},${color._id.g},${color._id.b})`}}></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    <div className="w-[806px] px-[15px] py-3 bg-white flex justify-center">
        <div
            className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
            <ul className="flex flex-wrap w-[765px] border">
                {colors.map((color, index) => {
                    return (
                        <li key={index}>
                            <div className={`w-5 h-5`}
                                 style={{backgroundColor: `rgb(${color._id.r},${color._id.g},${color._id.b})`}}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
        </>
)
}