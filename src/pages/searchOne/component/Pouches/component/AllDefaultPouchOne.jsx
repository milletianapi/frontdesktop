import decode_item from "./decode_item.json";
import lute from "../../../../../assets/images/lute.svg"
import harp from "../../../../../assets/images/harp.svg"
import wolf from "../../../../../assets/images/wolf.svg"
import mandolin from "../../../../../assets/images/mandolin.svg"

const threePot = [`A`, `B`, `C`]

export const AllDefaultPouchOne = ({item}) =>  {
        const url = 'https://open.api.nexon.com/static/mabinogi/img/' + decode_item[item.item_name]
        return (
            <div className={"middle w-[128px] flex-wrap text-[11px]"} key={item.item_name}>
                <img src={url} alt={`${item.item_name}`} width={80} height={80}></img>
                <a> {item.item_name} </a>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-1"}>
                    {threePot.map((pot, index) => <div key={index}
                                                       className={"middle w-[120px]"}>
                        <a className={"w-5 text-center"}>{pot}팟</a>
                        <div className={"w-[11px] h-[11px] mx-1"} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>)}
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
