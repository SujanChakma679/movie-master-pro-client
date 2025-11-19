import React from 'react';

const Slider = () => {
  const images = [

    "https://i.ibb.co/nNcw0ByG/10908865.jpg",
    "https://i.ibb.co/sdtnJTGP/8946766.jpg",
    "https://i.ibb.co/67gj2ZpB/7894911.jpg",
    "https://i.ibb.co/3m34rRTf/4308881.jpg",
    "https://i.ibb.co/vCKD6rzw/the-prestige.webp",
    "https://i.ibb.co/9kBNZNSF/samplemovie.jpg",
    "https://i.ibb.co/jPQ7ypR7/6367742.jpg",
    "https://i.ibb.co/fz6Hkwm8/4308881.jpg",
    "https://i.ibb.co/kgX62dLY/11535583.jpg",
    "https://i.ibb.co/qLZK6wPD/9553087.jpg",
    "https://i.ibb.co/23L6ZZT9/9361093.jpg",
    "https://i.ibb.co/B22bfcWV/8971915.jpg",
    
    "https://i.ibb.co/TMppyjm7/4190579.jpg"
  ];

  return (
    <div className="carousel w-full h-80 md:h-96 lg:h-[600px]">
      {images.map((src, index) => {
        const prevIndex = (index === 0) ? images.length - 1 : index - 1;
        const nextIndex = (index === images.length - 1) ? 0 : index + 1;

        return (
          <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
            <img
              src={src}
              className="w-full h-full object-cover rounded-lg"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${prevIndex + 1}`} className="btn btn-circle">❮</a>
              <a href={`#slide${nextIndex + 1}`} className="btn btn-circle">❯</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
