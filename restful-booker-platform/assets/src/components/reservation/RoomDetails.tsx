import React from 'react';

import { Room as RoomType } from "@/types/room";
import { translateIcon } from "@/utils/iconUtils";

interface RoomDetailsProps {
    room: RoomType;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {

    return (
        <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="mb-4">
                <h1 className="fw-bold mb-2">{room.type} Room</h1>
                <div className="d-flex align-items-center mb-2">
                    {room.accessible && (
                        <div className="me-3">
                            <span className="badge bg-success">Accessible</span>
                        </div>
                    )}
                    <div className="text-muted">
                        <i className="bi bi-people-fill me-1"></i> Max 2 Guests
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="row g-2">
                    <div className="col-12">
                        <img src={room.image} alt="Room Image" className="rounded mb-3 w-100 hero-image" />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="fs-4 fw-bold mb-3">Room Description</h2>
                <p>{room.description}</p>
            </div>

            <div className="mb-4">
                <h2 className="fs-4 fw-bold mb-3">Room Features</h2>
                <div className="row g-3 d-flex flex-wrap">
                
                {room.features.map((feature, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="d-flex align-items-center">
                        <i className={`bi bi-${translateIcon(feature)} amenity-icon me-3`}></i>
                        <span>{feature}</span>
                        </div>
                    </div>
                ))}

                </div>
            </div>

            <div className="mb-4">
                <h2 className="fs-4 fw-bold mb-3">Room Policies</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                            <h3 className="fs-5 mb-3">Check-in & Check-out</h3>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2 d-flex">
                                    <i className="bi bi-clock me-2 text-primary"></i>
                                    <div>
                                        <strong>Check-in:</strong> 3:00 PM - 8:00 PM
                                    </div>
                                </li>
                                <li className="mb-2 d-flex">
                                    <i className="bi bi-clock-history me-2 text-primary"></i>
                                    <div>
                                        <strong>Check-out:</strong> By 11:00 AM
                                    </div>
                                </li>
                                <li className="d-flex">
                                    <i className="bi bi-info-circle me-2 text-primary"></i>
                                    <div>
                                        <strong>Early/Late:</strong> By arrangement
                                    </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h3 className="fs-5 mb-3">House Rules</h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-2 d-flex">
                                    <i className="bi bi-x-circle me-2 text-danger"></i>
                                        <div>No smoking</div>
                                    </li>
                                    <li className="mb-2 d-flex">
                                    <i className="bi bi-x-circle me-2 text-danger"></i>
                                        <div>No parties or events</div>
                                    </li>
                                    <li className="d-flex">
                                    <i className="bi bi-question-circle me-2 text-warning"></i>
                                        <div>Pets allowed (restrictions apply)</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RoomDetails;
