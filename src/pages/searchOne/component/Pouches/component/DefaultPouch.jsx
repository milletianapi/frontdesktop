import decode_item from "./decode_item.json";
import {defaultItems} from "./defaultItems.js";


const DefaultPouch = () =>  {

    const dePouch = (item) => {
        const url = 'https://open.api.nexon.com/static/mabinogi/img/' + decode_item[item]
        return (
            <div className={"pt-5 middle w-[128px] flex-wrap text-[10px]"} key={item}>
                <img src={url} alt={`${item}`} width={80} height={80}></img>
                <a> {item} </a>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-2"}>
                    <div className={"middle"}>
                        <a className={"w-5 text-center"}>A팟</a>
                        <div className={"w-[10px] h-[10px] ml-1 mr-1 -translate-y-[2px]"} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>
                    <div className={"middle"}>
                        <a className={"w-5 text-center"}>B팟</a>
                        <div className={"w-[10px] h-[10px] ml-1 mr-1 -translate-y-[2px]"} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>
                    <div className={"middle"}>
                        <a className={"w-5 text-center"}>C팟</a>
                        <div className={`w-[10px] h-[10px] ml-1 mr-1 -translate-y-[2px]`} style={{backgroundColor: `rgb(0, 0, 0`}}></div>
                        <a>(000, 000, 000)</a>
                    </div>
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

export default DefaultPouch