import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './SectorDetail.css';

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
                {sectorData.map((data, index) => (
                    <div key={index}>
                        <p>Name: {toTitleCase(normalizeString(data[2].value))}</p>
                        <p>MAC: {data[3].value}</p>
                        <p>IP: {data[27].value}</p>
                        <p style={{ color: getSignalColor(data[22].value), color: getSignalColor(data[15].value) }}>
                            Signal: {data[22].value}/{data[15].value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectorDetail;