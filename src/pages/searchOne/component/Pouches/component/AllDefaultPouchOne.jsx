import decode_item from "./decode_item.json";
import lute from "../../../../../assets/images/lute.png"
import harp from "../../../../../assets/images/harp.png"
import wolf from "../../../../../assets/images/icon_w.png"
import mandolin from "../../../../../assets/images/icon_m.png"

export const AllDefaultPouchOne = ({item}) =>  {
        const url = 'https://open.api.nexon.com/static/mabinogi/img/' + decode_item[item.item_name]
        return (
            <div className={"flex items-center justify-center w-[128px] flex-wrap text-[10px]"} key={item.item_name}>
                <img src={url} alt={`${item.item_name}`} width={80} height={80}></img>
                <a> {item.item_name} </a>
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
                    <img src={lute}></img>
                    <img src={harp}></img>
                    <img src={wolf}></img>
                    <img src={mandolin}></img>
                </div>
            </div>
        )
}
