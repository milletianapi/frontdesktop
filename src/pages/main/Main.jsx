import {Title} from "../compoent/Title.jsx";
import {Menu} from "../compoent/Menu.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRecoilState} from "recoil";
import {createColorState, filterColorState} from "../../stores/Store.jsx";
import {useNavigate} from "react-router-dom";
import {Timer} from "../searchOne/component/FilterBox/component/Timer.jsx";


export const Main = () => {
    const [aPotColorSet, setaPotColorSet] = useState([])
    const [colorSet, setColorSet] = useState([])
    const [filterColors, setFilterColors] = useRecoilState(filterColorState);
    const navigate = useNavigate();
    const [searchAllReady, setSearchAllReady] = useState({status:"로딩중", count: 0});
    const [oneMinute, setOneMinute] = useState(0);

    useEffect(() => {
        const handleping = async () => {
            const status = await axios.get("https://milletianapi.com/searchallping")
            setSearchAllReady(status.data)
        }
        handleping();
    },[oneMinute])


    const rgbToHex = ({ r, g, b }) => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
    };


    useEffect(() => {
        const handleAPotColorSet = async () => {
        const {data: res} = await axios.get("https://milletianapi.com/getmain")
           setaPotColorSet(res.aPot)
            setColorSet(res.colorSet)
        }
        handleAPotColorSet()
    },[])

    // hex: "#000000",
    //     rgb: {r: 0, g: 0, b: 0},
    // selectCollection: false,

    const filterColorSet = (color, pot, a) => {
        color[pot].rgb = a
        color[pot].hex = rgbToHex(a)
        color[pot].active = true
        return color
    }

    const colorsave = (color) => {
        const preferredColor = localStorage.getItem('preferredColor') === null ? `[]` : localStorage.getItem('preferredColor')
        const hex = rgbToHex(color)
            const oldColor = JSON.parse(preferredColor)
            if(!preferredColor.includes(hex)){
                oldColor.push(hex)
                localStorage.setItem('preferredColor', JSON.stringify(oldColor))
        }

    }

    const handleSearchAPot = (a) => {
        const color = { a: createColorState(), b: createColorState(), c: createColorState() }
        setFilterColors(filterColorSet(color, `a` ,a._id))
        navigate("/searchall?tomain=true");
    }

    const handleSearchAll = (colors) => {
        console.log(colors)
        const color = { a: createColorState(), b: createColorState(), c: createColorState() }
        filterColorSet(color, `a`, colors.a)
        filterColorSet(color, `b`, colors.b)
        filterColorSet(color, `c`, colors.c)
        setFilterColors(color)
        navigate("/searchall?tomain=true");
    }

    const handleSaveAll = (colors) => {
        colorsave(colors.a)
        colorsave(colors.b)
        colorsave(colors.c)
        alert("지염을 등록 하였습니다.")
    }


    return (
        <div className={"w-full"}>
            <div className="w-[878px] p-[35px] bg-white justify-start items-center gap-2.5 inline-flex">
                <div className="w-[807px] relative">
                    <div className="w-[807px] bg-white rounded-[10px] flex">
                        <div className={"flex"}>
                            <div>
                                <Title/>
                            </div>
                            <div className={"pt-[14px]"}>
                                <Menu/>
                                <Timer isMain={true} setOneMinute={setOneMinute}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm mb-4 ml-[15px]">
                        <div>공지사항</div>
                        <div className={"border-b border-[#9f7394] w-[774px] h-full"}></div>
                        <p className={"mt-1"}>안녕하세요. 밀레시안API입니다. 데스크탑UI가 업데이트 되었습니다.</p>
                    </div>
                    <div className={"flex text-[12px]  ml-[15px]"}>
                        <div className={"w-[254px]"}>
                            <div className={"text-sm"}>{searchAllReady.status === `준비중` ? `이전` : `현재`} 주기 A팟 색상 현재 색상 수 : {aPotColorSet.length}</div>
                            <div className={"button1 w-full min-h-96"}>
                                {aPotColorSet.length === 0 ? `색상 가져오는중...` :
                                <ul>
                                    {aPotColorSet.map((color,index) => {
                                        const r = color._id.r
                                        const g = color._id.g
                                        const b = color._id.b
                                        return <li key={index} className={"flex items-center justify-between p-2"}>
                                            <div className={"w-[17px] h-[17px]"}
                                                 style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
                                            >
                                            </div>
                                            <div className={"w-20"}>
                                                {`${r}, ${g}, ${b}`}
                                            </div>
                                            <button
                                                className={"h-[17px] px-2 bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] middle text-[#3b3b3b] text-xs"}
                                                onClick={() => handleSearchAPot(color)}>
                                                전체 검색
                                            </button>
                                            <button
                                                className={"h-[17px] px-2 bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] middle text-[#3b3b3b] text-xs"}
                                                onClick={() => {
                                                    colorsave(color._id)
                                                    alert("지염을 등록 하였습니다.")
                                                }}>
                                                지염 등록
                                            </button>
                                        </li>

                                    })}
                                </ul>
                                }
                            </div>
                        </div>
                        <div className={"ml-3 w-[508px]"}>
                            <div className={"text-sm"}>{searchAllReady.status === `준비중` ? `이전` : `현재`} 주기 색상 조합 현재 색상 수 : {colorSet.length}</div>
                            <div className={"button1 w-full min-h-96"}>
                                {colorSet.length === 0 ? `색상 가져오는중...` :
                                    <ul>
                                    {colorSet.map((color, index) => {

                                        const potColor = (color) => {
                                            const r = color.r
                                            const g = color.g
                                            const b = color.b
                                            return <div className={"flex items-center gap-1"}>
                                                <div className={"w-[17px] h-[17px]"}
                                                     style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}
                                                />
                                                <div className={"w-20"}>
                                                    {`${r}, ${g}, ${b}`}
                                                </div>
                                            </div>
                                        }

                                        return <li key={index} className={"flex items-center justify-between p-2"}>
                                            {potColor(color._id.a)}
                                            {potColor(color._id.b)}
                                            {potColor(color._id.c)}
                                            <button className={"h-[17px] px-2 bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] middle text-[#3b3b3b] text-xs"}
                                                    onClick={() => handleSearchAll(color._id)}>
                                                전체 검색
                                            </button>
                                            <button className={"h-[17px] px-2 bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] middle text-[#3b3b3b] text-xs"}
                                                    onClick={() => handleSaveAll(color._id)}
                                            >
                                                지염 등록
                                            </button>
                                        </li>

                                    })}
                                </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
