import decode_item from "./decode_item.json";
import {defaultItems} from "./defaultItems.js";
import lute from "../../../../../assets/images/lute.png"
import harp from "../../../../../assets/images/harp.png"
import wolf from "../../../../../assets/images/icon_w.png"
import mandolin from "../../../../../assets/images/icon_m.png"

export const AllDefaultPouch = () =>  {
    const dePouch = (item) => {
        const url = 'https://open.api.nexon.com/static/mabinogi/img/' + decode_item[item]
        return (
            <div className={"flex items-center justify-center w-[128px] flex-wrap text-[10px]"} key={item}>
                <img src={url} alt={`${item}`} width={80} height={80}></img>
                <a> {item} </a>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-2"}>
                    <div className={"flex items-center justify-center"}>
                        <a className={"w-5 text-center"}>A팟</a>
                        <div className={"w-[10px] h-[10px] ml-1 mr-1"} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <a className={"w-5 text-center"}>B팟</a>
                        <div className={"w-[10px] h-[10px] ml-1 mr-1"} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <a className={"w-5 text-center"}>C팟</a>
                        <div className={`w-[10px] h-[10px] ml-1 mr-1`} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>
                </div>
                <div className={"w-full mt-1 pl-1.5 h-[90px]"}>
                    <div className={"flex items-center gap-0.5"}>
                        <img src={lute}></img>
                        <p className={"w-[31px] text-center"}>1채널</p>
                        <p className={"w-[47px] text-center"}>오아시스</p>
                        <svg width="4" height="21" viewBox="0 0 4 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="7" r="1" fill="#525252"/>
                            <circle cx="2" cy="10.5" r="1" fill="#525252"/>
                            <circle cx="2" cy="14" r="1" fill="#525252"/>
                        </svg>
                    </div>
                    <img src={harp}></img>
                    <img src={wolf}></img>
                    <img src={mandolin}></img>
                </div>
            </div>
        )
    }
    return (
        <>
        {defaultItems.map(item => dePouch(item))}
        </>
    )
}
