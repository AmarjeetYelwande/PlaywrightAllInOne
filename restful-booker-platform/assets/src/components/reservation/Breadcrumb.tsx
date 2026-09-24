
import React from 'react';

interface BreadcrumbProps {
    roomType: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ roomType }) => {

    return (
        <div className="bg-light py-2">
            <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
                <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Rooms</a></li>
                <li className="breadcrumb-item active" aria-current="page">{roomType} Room</li>
                </ol>
            </nav>
            </div>
        </div>
    );
}

export default Breadcrumb;