
import React from 'react';
import { Branding } from "@/types/branding";

interface NavProps {
    branding: Branding;
}

const HomeNav: React.FC<NavProps> = ({ branding }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
                <span>{branding.name}</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/#rooms">Rooms</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#booking">Booking</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#amenities">Amenities</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#location">Location</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#contact">Contact</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin">Admin</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    );

}

export default HomeNav;
