import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const toTitleCase = (str) => {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
};

const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/�/g, 'ñ');
};

const getSignalColor = (signal) => {
    if (signal >= -65) {
        return '#00bfff'; // Fresh blue
    } else if (signal >= -69) {
        return '#00ff7f'; // Greenish blue
    } else if (signal >= -74) {
        return '#ffa500'; // Orange
    } else {
        return '#ff4500'; // Red
    }
};

const cleanSignalValue = (signal) => {
    return parseInt(signal.split('@')[0], 10);
};

const getLowestSignalColor = (signal1, signal2) => {
    const lowestSignal = Math.min(signal1, signal2);
    return getSignalColor(lowestSignal);
};

const mapDataToObject = (dataArray) => {
    const dataObject = {};
    dataArray.forEach(item => {
        dataObject[item.field] = item.value;
    });
    return dataObject;
};

const formatUptime = (uptime) => {
    const days = uptime.match(/(\d+)d/);
    const hours = uptime.match(/(\d+)h/);
    const minutes = uptime.match(/(\d+)m/);
    const seconds = uptime.match(/(\d+)s/);

    return `${days ? days[1] + 'd' : ''}-${hours ? hours[1] + 'h' : ''}-${minutes ? minutes[1] + 'm' : ''}`.trim();
};

const SectorDetail = () => {
    const { sectorId } = useParams();
    const [sector, setSector] = useState([]);
    const [sectorData, setSectorData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sectors/${sectorId}`)
            .then(res => {
                setSector(res.data);
                setSectorData(res.data.mikrotikData[0].data);
                console.log(res.data);
            })
            .catch(console.error);
    }, [sectorId]);

    if (!sectorData || sectorData.length === 0) return <div>Loading...</div>;

    return (
        <div className="sector-detail">
            <h2>{toTitleCase(sector.name)}</h2>
            <h4>{sector.ip}</h4>
            <div className="sector-data">
                {sectorData.map((data, index) => {
                    const dataObject = mapDataToObject(data);
                    const cleanedSignal1 = cleanSignalValue(dataObject['tx-signal-strength']);
                    const cleanedSignal2 = cleanSignalValue(dataObject['signal-strength']);
                    const signalColor = getLowestSignalColor(cleanedSignal1, cleanedSignal2);
                    return (
                        <div key={index}>
                            <p>Name: {toTitleCase(normalizeString(dataObject['radio-name']))}</p>
                            <p>MAC: {dataObject['mac-address']}</p>
                            <p>IP: {dataObject['last-ip']}</p>
                            <p>Uptime: {formatUptime(dataObject['uptime'])}</p>
                            <p style={{ color: signalColor }}>
                                Signal: {cleanedSignal1}/{cleanedSignal2}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SectorDetail;