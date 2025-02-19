import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../sections/NavBar';
import '../style/home.css';

interface SpotifyData {
  id: string;
  name: string;
  [key: string]: any;
}

const Home = () => {
  const [data, setData] = useState<SpotifyData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const token = 'BQDsmL-SaZ-SShJXe7Zo9STIjWwXAVGL1aY0bFbX6FtV8n1toSx_3-LLyg-5Obt3qnhGRoXn3i-1fUn_Kk59BPK65SPtnXz3fjYi0nUahrWccM-6FU2mxc1ppLMEwwoz1UE2f7wyCL0'; // Replace with a valid token
        console.log('Using token:', token);

        const response = await axios.get('https://api.spotify.com/v1/users/391c0e1fbcad446d819738b243186417/playLists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data);

        setData(response.data.items || []); // Adjust based on actual response structure
      } catch (error:any) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="home-container">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="home-section">
              {item.name}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Home;