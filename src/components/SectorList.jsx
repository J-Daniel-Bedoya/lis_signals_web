import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SectorList = () => {
    const { towerId } = useParams();
    const [sectors, setSectors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/towers/${towerId}`)
            .then(res => {setSectors(res.data.sectors), console.log(res.data);
            })
            .catch(console.error);
    }, [towerId]);

    return (
        <div>
            {sectors.map((sector) => (
                <div key={sector.id}>
                    <h4>
                        <Link to={`/sector/${sector.id}`}>{sector.name}</Link>
                    </h4>
                </div>
            ))}
        </div>
    );
}

export default SectorList;