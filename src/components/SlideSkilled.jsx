import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getSkilled from '@/pages/api/getSkilled';

const SlideSkilled = () => {
    const [skilledItems, setSkilledItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const skilledData = await getSkilled();
            setSkilledItems(skilledData);
        }

        fetchData();
    }, []);

    return (
        <div className='flex-col'>
            <div className='text-3xl'>Skilled</div>
            <Slider arrows={false} dots={false} autoplay={true} autoplaySpeed={200} cssEase='ease-in-out' className='w-[calc(100%_-_36px)] h-full'>
                {skilledItems.map((item) => (
                    <div key={item.id}>
                        <div className='text-center text-lg underline'>{item.title}</div>
                        <img src={item.pic_url} alt={item.title} className='object-cover p-5' />
                    </div>

                ))}
            </Slider>
        </div>
    )
}

export default SlideSkilled