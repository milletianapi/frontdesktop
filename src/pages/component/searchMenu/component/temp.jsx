<div
    className="w-[507px] h-[190px] p-[17px] rounded-[5px] border border-[#9f7394] flex-col justify-start items-start gap-[9px] flex">
    <div className="w-[472px] h-[46px] justify-start items-center gap-[7px] inline-flex">
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
                    className="w-[66px] h-[23px] px-5 bg-[#cf9bee] rounded-[3px] justify-center items-center flex text-[#3b3b3b] text-xs"
                    onClick={() => handleToggleDetails(key)}
                >지염
                </button>
                <div>
                    <div
                        className="w-[43px] h-[23px] px-1 pt-[3px] pb-0.5 justify-end items-center flex text-[#585858] text-xs">활성화
                    </div>
                    <div className="w-[19px] h-[23px] py-0.5 justify-start items-center flex">
                        <div className="w-[19px] h-[19px] border border-[#999999]"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>