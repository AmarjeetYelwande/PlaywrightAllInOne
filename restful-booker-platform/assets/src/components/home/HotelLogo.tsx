import React from 'react';
import { Branding } from '@/types/branding';

interface HotelLogoProps {
  branding: Branding;
}

const HotelLogo: React.FC<HotelLogoProps> = ({ branding }) => {
  return (
    <section className="hero py-5" style={{"backgroundImage": "url('" + branding.logoUrl + "')"}}>
      <div className="container py-5">
        <div className="row py-5">
          <div className="col-lg-8 hero-content text-center text-lg-start py-5">
            <h1 className="display-4 fw-bold mb-4">Welcome to {branding.name}</h1>
            <p className="lead mb-4">{branding.description}</p>
            <a href="#booking" className="btn btn-primary btn-lg">Book Now</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelLogo;