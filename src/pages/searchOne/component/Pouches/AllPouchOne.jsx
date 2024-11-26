import { useState } from "react";
import { decoding } from "./component/decoding.js";
import luteImage from "../../../../assets/images/lute.png"
import harp from "../../../../assets/images/harp.png"
import wolf from "../../../../assets/images/icon_w.png"
import mandolin from "../../../../assets/images/icon_m.png"
import lute from "../../../../assets/images/lute.png";
export const decodeTrade = {
    tirChonaill: '티르코네일',
    dunbarton: '던바튼',
    bangor: '반호르',
    emainMacha: '이멘마하',
    taillteann: '탈틴',
    tara: '타라',
    portCobhr: '카브항구',
    belvast: '벨바스트',
    beachOfScathach: '스카하해변',
    qillaBaseCamp: '켈라',
    filia: '필리아',
    vales: '발레스',
    cor: '코르',
    calidaExplorationCamp : '칼리다',
    oasis: '오아시스',
    caruForest : '카루숲',
    pela : '페라화산',};

const server = { lute: false, harp: false, mandolin: false, wolf: false }

export const AllPouchOne = ({item}) => {
        const item_name = item.item_name;
        const color = item.color;
        const event = item.event;
        const [expanded, setExpanded] = useState(server);
        const servers = { lute: [], harp: [], mandolin: [], wolf: [] };
        const image_url = decoding({ item_name, color });
        const colors = ["a", "b", "c"].map((colorKey) => {
            if (!color[colorKey]) {
                return { label: colorKey.toUpperCase() + "팟", rgb: "0, 0, 0" };
            }
            return {
                label: colorKey.toUpperCase() + "팟",
                rgb: `${color[colorKey].r}, ${color[colorKey].g}, ${color[colorKey].b}`,
            };
        });

        event.forEach((evt) => {
            if (servers[evt.server]) {
                servers[evt.server].push({ channel: evt.channel, trade: evt.trade });
            }
        });

    const getServerImage = (server) => {
        const images = {
            lute: luteImage,
            harp: harp,
            wolf: wolf,
            mandolin: mandolin,
        };
        return images[server] || luteImage;
    };


        return (
            <div className={"flex justify-center w-[128px] flex-wrap text-[10px]"}>
                <img src={image_url} alt={item_name} width={80} height={80} />
                <p>{item_name}</p>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-2"}>
                    {colors.map(({ label, rgb }) => (
                        <div key={`${label}`} className={"flex items-center justify-center"}>
                            <p className={"w-5 text-center"}>{label}</p>
                            <div
                                className={"w-[10px] h-[10px] ml-1 mr-1"}
                                style={{ backgroundColor: `rgb(${rgb})` }}
                            ></div>
                            <p>({rgb})</p>
                        </div>
                    ))}
                </div>
                <div className={"relative w-full h-[90px] pl-1.5 mt-1"}>
                    <div className={"relative"}>
                        {Object.entries(servers).map(([server, events]) => (
                            <div key={`${server}`}>
                                {events.length > 0 ? (
                                    <div>
                                        {events.length > 1 ? (
                                            <div className={"cursor-pointer flex gap-0.5 items-center"}
                                                 onClick={() => setExpanded((prev) => ({
                                                     ...prev,
                                                     [server]: !prev[server]
                                                 }))}
                                            >
                                                <img src={getServerImage(server)} alt={server}/>
                                                <p className={"w-[31px] text-center"}>{`${events[0].channel}채널`}</p>
                                                <p className={"w-[47px] text-center"}>{decodeTrade[events[0].trade]}</p>
                                                {events.length > 1 &&
                                                    <svg width="4" height="21" viewBox="0 0 4 21" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="2" cy="7" r="1" fill="#525252"/>
                                                        <circle cx="2" cy="10.5" r="1" fill="#525252"/>
                                                        <circle cx="2" cy="14" r="1" fill="#525252"/>
                                                    </svg>}
                                            </div>
                                        ) : (
                                            <div className={"flex gap-0.5 items-center"}>
                                                <img src={getServerImage(server)} alt={server}/>
                                                <div className={"flex items-center h-[21px] gap-0.5"}>
                                                    <p className={"w-[31px] text-center"}>{`${events[0].channel}채널`}</p>
                                                    <p className={"w-[47px] text-center"}>{decodeTrade[events[0].trade]}</p>
                                                </div>
                                            </div>
                                        )}
                                        {expanded[server] && events.length > 1 && (
                                            <div
                                                className={"absolute bg-white shadow-md py-2 mt-1 z-10 w-full -translate-y-1"}>
                                                {events.slice(1).map((event, index) => (
                                                    <div key={`${server}-${index + 1}`}
                                                         className={"flex gap-0.5 items-center h-[21px]"}>
                                                        <div className={"w-[24px] h-[21px]"}></div>
                                                        <p className={"w-[31px] text-center"}>{`${event.channel}채널`}</p>
                                                        <p className={"w-[47px] text-center"}>{decodeTrade[event.trade]}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : <img src={getServerImage(server)} alt={server}></img>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
};
