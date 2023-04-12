import React, { useState, useEffect } from 'react';
import { db } from '@/confic/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Slideshow } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const SkilledSlideshow = () => {
  const [skilledData, setSkilledData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'Skilled'));
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSkilledData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="slide-container">
      <Slideshow
        autoplay={true}
        transitionDuration={1000}
        indicators={true}
        arrows={false}
      >
        {skilledData.map((item) => (
          <div className="each-slide" key={item.id}>
            <div style={{ backgroundImage: `url(${item.url})` }}></div>
          </div>
        ))}
      </Slideshow>
    </div>
  );
};

export default SkilledSlideshow;