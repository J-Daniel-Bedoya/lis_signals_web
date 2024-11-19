import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TowerList = () => {
    const [towers, setTowers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/towers')
            .then(res => setTowers(res.data))
            .catch(console.error);
    }, []);

    return (
        <div>
            {towers.map((tower) => (
                <div key={tower.id}>
                    <h3>
                        <Link to={`/tower/${tower.id}`}>{tower.name}</Link>
                    </h3>
                </div>
            ))}
        </div>
    );
}

export default TowerList;