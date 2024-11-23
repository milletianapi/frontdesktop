import {useRecoilState} from "recoil";
import {filterColorState} from "../../../../stores/Store.jsx";
import {useState} from "react";

export const Filter = () => {
    const initialState = localStorage.getItem('preferredColor') === null ? [] : JSON.parse(localStorage.getItem('preferredColor'));
    const [filterColors, setFilterColors] = useRecoilState(filterColorState);
    const [preferredColor, setPreferredColor] = useState(initialState);

    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    const rgbToHex = ({ r, g, b }) => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
    };

    const handleToggleDetails = (key) => {
        setFilterColors((prevColors) => ({
            ...prevColors,
            [key]: {...prevColors[key], showDetails: !prevColors[key].showDetails},
        }));
    };

    const handleHexChange = (e, key) => {
        const hex = e.target.value;
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
            setFilterColors((prevColors) => ({
                ...prevColors,
                [key]: {...prevColors[key], hex, rgb: hexToRgb(hex)},
            }));
        }
    };

    const handleHexCode = (e, key) => {
        const hex = e;
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
            setFilterColors((prevColors) => ({
                ...prevColors,
                [key]: {...prevColors[key], hex, rgb: hexToRgb(hex)},
            }));
        }
    };

    const handleRgbChange = (e, key, color) => {
        const value =
            e.target.value === "" ? "" : Math.max(0, Math.min(255, Number(e.target.value)));
        setFilterColors((prevColors) => {
            const newRgb = { ...prevColors[key].rgb, [color]: value };
            return {
                ...prevColors,
                [key]: {
                    ...prevColors[key],
                    rgb: newRgb,
                    hex:
                        newRgb.r !== "" && newRgb.g !== "" && newRgb.b !== ""
                            ? rgbToHex(newRgb)
                            : prevColors[key].hex,
                },
            };
        });
    };

    const handleActivationChange = (e, key) => {
        setFilterColors((prevColors) => ({
            ...prevColors,
            [key]: {...prevColors[key], active: e.target.checked},
        }));
    };

    const handleToleranceChange = (e, key) => {
        const value =
            e.target.value === "" ? "" : Math.max(0, Math.min(255, Number(e.target.value)));
        setFilterColors((prevColors) => ({
            ...prevColors,
            [key]: {...prevColors[key], tolerance: value},
        }));
    };

    const handleSaveToLocalStorage = (key) => {
        const hex = filterColors[key].hex;
        if (!preferredColor.includes(hex)) {
            const pc = [...preferredColor, hex];
            setPreferredColor(pc);
            localStorage.setItem('preferredColor', JSON.stringify(pc));
        }
    };

    const handleRemoveFromLocalStorage = (key) => {
        const hex = key;
        if (preferredColor.includes(hex)) {
            const pc = preferredColor.filter(color => color !== hex);
            setPreferredColor(pc);
            localStorage.setItem('preferredColor', JSON.stringify(pc));
        }
    };


    return (
        <div
            className="w-[507px] h-[190px] p-[17px] rounded-[5px] border border-[#9f7394] flex-col justify-start items-start gap-[9px] flex">
            {Object.keys(filterColors).map((key, index) => {
                const colorState = filterColors[key];
                return (
                    <div key={index}
                         className="w-[472px] h-[46px] justify-start items-center gap-[7px] inline-flex relative">
                        <div className="w-[23px] h-[46px] flex-col justify-start items-start gap-1 inline-flex">
                            <div className="w-[23px] h-[19px] pt-[5px] justify-center items-center gap-2.5 inline-flex">
                                <div className="text-center text-[#232323] text-xs">{key.toUpperCase()}팟</div>
                            </div>
                            <input
                                type="color"
                                className="color-input w-[23px] h-[23px] border border-[#3c3c3c]"
                                style={{appearance: "none"}}
                                value={colorState.hex}
                                onChange={(e) => handleHexChange(e, key)}/>
                        </div>
                        <div className="w-[67px] h-[46px] flex items-end">
                            <input
                                className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs"
                                value={colorState.rgb.r}
                                onChange={(e) => handleRgbChange(e, key, "r")}
                                placeholder="R"
                            />
                        </div>
                        <div className="w-[67px] h-[46px] flex-col justify-start items-start gap-1 inline-flex">
                            <div
                                className="w-[67px] h-[19px] pr-[3px] justify-end items-center inline-flex text-[#585858] text-xs">오차
                                계산
                            </div>
                            <input
                                className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs"
                                value={colorState.rgb.g}
                                onChange={(e) => handleRgbChange(e, key, "g")}
                                placeholder="G"
                            />
                        </div>
                        <div className="w-[67px] h-[46px] flex-col justify-start items-start gap-1 inline-flex">
                            <div
                                className="w-[67px] h-[19px] px-[11px] rounded-[3px] border border-[#999999] justify-center items-center inline-flex text-center text-[#3c3c3c]">RGB거리
                            </div>
                            <input
                                className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs"
                                value={colorState.rgb.b}
                                onChange={(e) => handleRgbChange(e, key, "b")}
                                placeholder="B"
                            />
                        </div>
                        <div className="w-[86px] h-[46px] flex-col justify-start items-start gap-1 inline-flex">
                            <div
                                className="w-[86px] h-[19px] px-[13px] py-1 rounded-[3px] border border-[#999999] justify-center items-center gap-2.5 inline-flex text-center text-[#3c3c3c]">오차
                                값 이하
                            </div>
                            <input
                                className="w-[86px] h-[23px] px-[13px] rounded-[3px] border border-[#d5b8e6] flex-col justify-center items-center flex text-center text-[#3c3c3c] text-xs"
                                value={colorState.hex}
                                onChange={(e) => handleHexChange(e, key)}
                                maxLength={7}
                            />
                        </div>
                        <div className="w-32 h-[46px] flex-col justify-start items-start gap-1 inline-flex">
                            <div className="w-32 justify-between items-center inline-flex">
                                <div
                                    className="w-[33px] h-[19px] justify-center items-center flex text-center text-[#585858] text-xs">오차
                                </div>
                                <input
                                    className="w-[95px] h-[19px] pr-[9px] rounded-[3px] border border-[#999999] justify-end items-center flex text-right text-[#3c3c3c] text-[11px]"
                                    value={colorState.tolerance}
                                    onChange={(e) => handleToleranceChange(e, key)}
                                />
                            </div>
                            <div className="justify-start items-center inline-flex">
                                <button
                                    className="w-[66px] h-[23px] px-5 bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] justify-center items-center flex text-[#3b3b3b] text-xs"
                                    onClick={() => handleToggleDetails(key)}
                                >지염
                                </button>
                                <label className={"flex"}>
                                    <div
                                        className="w-[43px] h-[23px] px-1 pt-[3px] pb-0.5 justify-end items-center flex text-[#585858] text-xs">활성화
                                    </div>
                                    <div className="w-[19px] h-[23px] py-0.5 justify-start items-center flex">
                                        <input className="w-[19px] h-[19px] border border-[#999999]"
                                               type="checkbox"
                                               name="exampleCheckbox"
                                               checked={colorState.active}
                                               onChange={(e) => handleActivationChange(e, key)}/>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {colorState.showDetails && (
                            <div
                                className="-left-[9px] top-[50px] absolute w-[458px] bg-white rounded-[5px] border border-[#9f7394] p-2 z-10 flex flex-col gap-[7px]">
                                <div className={"flex gap-[7px]"}>
                                    <div
                                        className="w-[23px] h-[23px] border border-[#3c3c3c]"
                                        style={{backgroundColor: colorState.hex}}
                                    />
                                    <div
                                        className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs">
                                        {colorState.rgb.r}
                                    </div>
                                    <div
                                        className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs">
                                        {colorState.rgb.b}
                                    </div>
                                    <div
                                        className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs">
                                        {colorState.rgb.g}
                                    </div>
                                    <div
                                        className="w-[86px] h-[23px] px-[13px] rounded-[3px] border border-[#d5b8e6] flex-col justify-center items-center flex text-center text-[#3c3c3c] text-xs">
                                        {colorState.hex}
                                    </div>
                                    <button
                                        className={`w-[66px] h-[23px] bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] justify-center items-center flex text-[#3b3b3b] text-xs`}
                                        onClick={() => handleSaveToLocalStorage(key)}
                                    >
                                        저장하기
                                    </button>
                                </div>
                                {preferredColor.map((color, index) => {
                                        const colors = hexToRgb(color)
                                        return (
                                            <div className={"flex gap-[7px]"} key={index}>
                                                <div
                                                    className="w-[23px] h-[23px] border border-[#3c3c3c]"
                                                    style={{backgroundColor: color}}
                                                />
                                                <div
                                                    className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs">
                                                    {colors.r}
                                                </div>
                                                <div
                                                    className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs">
                                                    {colors.b}
                                                </div>
                                                <div
                                                    className="w-[67px] h-[23px] px-[9px] flex items-center justify-end rounded-[3px] border border-[#d5b8e6] text-right text-[#3b3b3b] text-xs">
                                                    {colors.g}
                                                </div>
                                                <div
                                                    className="w-[86px] h-[23px] px-[13px] rounded-[3px] border border-[#d5b8e6] flex-col justify-center items-center flex text-center text-[#3c3c3c] text-xs">
                                                    {color}
                                                </div>
                                                <button
                                                    className={`w-[66px] h-[23px] bg-[#cf9bee] active:bg-[#C571C7] rounded-[3px] justify-center items-center flex text-[#3b3b3b] text-xs`}
                                                    onClick={() => handleHexCode(color, key)}
                                                >
                                                    불러오기
                                                </button>
                                                <button
                                                    className={`w-[23px] h-[23px] bg-[#cf9bee] rounded-0.75 mid active:bg-[#C571C7]`}
                                                    onClick={() => handleRemoveFromLocalStorage(color)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
