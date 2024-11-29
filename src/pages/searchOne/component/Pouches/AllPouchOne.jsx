import {useState} from "react";
import {decoding} from "./component/decoding.js";
import lute from "../../../../assets/images/lute.svg"
import harp from "../../../../assets/images/harp.svg"
import wolf from "../../../../assets/images/wolf.svg"
import mandolin from "../../../../assets/images/mandolin.svg"

export const decodeTrade = {
    tirChonaill: '티르코네일',
    dunbarton: '던바튼',
    bangor: '티르코네일',
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

export const AllPouchOne = ({item, color, colors}) => {
        const item_name = item.item_name;
        const event = item.event;
        const [expanded, setExpanded] = useState(server);
        const servers = { lute: [], harp: [], mandolin: [], wolf: [] };
        const image_url = decoding({ item_name, color });

        event.forEach((evt) => {
            if (servers[evt.server]) {
                servers[evt.server].push({ channel: evt.channel, trade: evt.trade });
            }
        });

    const getServerImage = (server) => {
        const images = {
            lute: lute,
            harp: harp,
            wolf: wolf,
            mandolin: mandolin,
        };
        return images[server] || lute;
    };


        return (
            <div className={"flex justify-center w-[128px] flex-wrap text-[11px]"}>
                <img src={image_url} alt={item_name} width={80} height={80} />
                <p>{item_name}</p>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-1.5"}>
                    {colors.map(({ label, rgb }) => (
                        <div key={`${label}`} className={"flex items-center w-[120px]"}>
                            <p className={"w-5 text-center"}>{label}</p>
                            <div
                                className={"w-[11px] h-[11px] mx-1"}
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
                                            <div className={"cursor-pointer flex items-center"}
                                                 onClick={() => setExpanded((prev) => ({
                                                     ...prev,
                                                     [server]: !prev[server]
                                                 }))}
                                            >
                                                <img src={getServerImage(server)} alt={server}/>
                                                <p className={"mx-1 w-[35px] text-center"}>{`${events[0].channel >= 10 ? "" : `0`}${events[0].channel}채널`}</p>
                                                <p className={"w-[50px]"}>{decodeTrade[events[0].trade]}</p>
                                                {events.length > 1 &&
                                                    <svg width="4" height="17" viewBox="0 0 4 17" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="2" cy="5" r="1" fill="#525252"/>
                                                        <circle cx="2" cy="8.5" r="1" fill="#525252"/>
                                                        <circle cx="2" cy="12" r="1" fill="#525252"/>
                                                    </svg>

                                                }
                                            </div>
                                        ) : (
                                            <div className={"flex items-center"}>
                                                <img src={getServerImage(server)} alt={server}/>
                                                <div className={"flex items-center h-[17px]"}>
                                                    <p className={"mx-1 w-[35px] text-center"}>{`${events[0].channel >= 10 ? "" : `0`}${events[0].channel}채널`}</p>
                                                    <p className={"w-[50px]"}>{decodeTrade[events[0].trade]}</p>
                                                </div>
                                            </div>
                                        )}
                                        {expanded[server] && events.length > 1 && (
                                            <div
                                                className={"absolute bg-white border border-[#9f7394] rounded-[10px] shadow-md py-2 mt-1 z-10 w-full -translate-y-1 -translate-x-1"}>
                                                {events.slice(1).map((event, index) => (
                                                    <div key={`${server}-${index + 1}`}
                                                         className={"flex items-center h-[17px]"}>
                                                        <div className={"w-[18px] h-[17px]"}></div>
                                                        <p className={"mx-1 w-[35px] text-center"}>{`${event.channel >= 10 ? "" : `0`}${event.channel}채널`}</p>
                                                        <p className={"w-[50px] text-center"}>{decodeTrade[event.trade]}</p>
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
