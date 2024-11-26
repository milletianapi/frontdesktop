import { useState } from "react";
import { decoding } from "./component/decoding.js";
import { response } from "../../../searchAll/data.js";
import luteImage from "../../../../assets/images/lute.png"
import harp from "../../../../assets/images/harp.png"
import wolf from "../../../../assets/images/icon_w.png"
import mandolin from "../../../../assets/images/icon_m.png"

const Pouch = () => {
    const pouches = response;
    const pouchCreate = ({ key, item_name, color, event }) => {
        const [expanded, setExpanded] = useState({ lute: false, harp: false, mandolin: false, wolf: false });
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
            switch (server) {
                case 'lute':
                    return luteImage;
                case 'harp':
                    return harp;
                case 'wolf':
                    return wolf;
                case 'mandolin':
                    return mandolin;
                default:
                    return luteImage;
            }
        };

        return (
            <div key={key} className={"pt-5 flex justify-center w-[128px] flex-wrap text-[10px]"}>
                <img src={image_url} alt={item_name} width={80} height={80} />
                <p>{item_name}</p>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-2"}>
                    {colors.map(({ label, rgb }) => (
                        <div key={`${key}-${label}`} className={"flex items-center justify-center"}>
                            <p className={"w-5 text-center"}>{label}</p>
                            <div
                                className={"w-[10px] h-[10px] ml-1 mr-1 -translate-y-[2px]"}
                                style={{ backgroundColor: `rgb(${rgb})` }}
                            ></div>
                            <p>({rgb})</p>
                        </div>
                    ))}
                </div>
                <div className={"relative w-full h-[90px] pl-2"}>
                    <div className={"relative"}>
                        {Object.entries(servers).map(([server, events]) => (
                            <div key={`${key}-${server}`}>
                                {events.length > 0 && (
                                    <div>
                                        {events.length > 1 ? (
                                            <div
                                                className={"cursor-pointer flex gap-2"}
                                                onClick={() => setExpanded((prev) => ({ ...prev, [server]: !prev[server] }))}
                                            >
                                                <img src={getServerImage(server)} alt={server} />
                                                <div className={"relative flex items-center h-[21px] gap-1"}>
                                                    <p className={"w-[34px] text-right"}>{`${events[0].channel} 채널`}</p>
                                                    <p>{events[0].trade}</p>
                                                    {events.length > 1 && <span>...</span>}

                                                </div>
                                            </div>
                                        ) : (
                                            <div className={"flex gap-2"}>
                                                <img src={getServerImage(server)} alt={server} />
                                                <div className={"flex items-center h-[21px] gap-1"}>
                                                    <p className={"w-[34px] text-right"}>{`${events[0].channel} 채널`}</p>
                                                    <p>{events[0].trade}</p>
                                                </div>
                                            </div>
                                        )}
                                        {expanded[server] && events.length > 1 && (
                                            <div className={"absolute bg-white shadow-md p-2 mt-1 z-10"}>
                                                {events.slice(1).map((event, index) => (
                                                    <div key={`${key}-${server}-${index + 1}`} className={"flex gap-1"}>
                                                        <p className={"w-[34px] text-right"}>{`${event.channel} 채널`}</p>
                                                        <p>{event.trade}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={"flex flex-wrap"}>
            {pouches.map((pouch, index) => pouchCreate({ ...pouch, key: `pouch-${index}` }))}
        </div>
    );
};

export default Pouch;
