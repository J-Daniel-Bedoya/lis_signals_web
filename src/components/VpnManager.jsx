import React, { useEffect } from 'react';
import axios from 'axios';

const VpnManager = () => {
  const connectVPNs = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/connect-vpns');
      console.log(response.data.message);
    } catch (error) {
      console.error('Error connecting VPNs:', error);
    }
  };

  const disconnectVPNs = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/disconnect-vpns');
      console.log(response.data.message);
    } catch (error) {
      console.error('Error disconnecting VPNs:', error);
    }
  };

  useEffect(() => {
    connectVPNs();

    // Desconectar VPNs cada 30 minutos (1800000 ms)
    const intervalId = setInterval(() => {
      disconnectVPNs();
    }, 
    1800000
  );

    // Desconectar VPNs al cerrar la ventana
    const handleBeforeUnload = () => {
      disconnectVPNs();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      disconnectVPNs();
    };
  }, []);

  return null; // No se necesita un botón o contenido visual
};

export default VpnManager;