import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelRoomInfo from '../components/home/HotelRoomInfo';

describe('HotelRoomInfo Component', () => {
  const mockRoom = {
    roomid: 123,
    roomName: "101",
    type: "Single",
    accessible: false,
    image: "/images/room.jpg",
    description: "A cozy single room with modern amenities",
    features: ["WiFi", "TV", "Refreshments"],
    roomPrice: 120
  };

  it('renders the room details correctly', () => {
    render(<HotelRoomInfo roomDetails={mockRoom} />);
    
    // Check room type and description
    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.getByText('A cozy single room with modern amenities')).toBeInTheDocument();
    
    // Check price
    expect(screen.getByText('£120', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('per night')).toBeInTheDocument();
  });

  it('renders features correctly', () => {
    render(<HotelRoomInfo roomDetails={mockRoom} />);
    
    // Check each feature is displayed
    mockRoom.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders book now link with correct room ID', () => {
    render(<HotelRoomInfo roomDetails={mockRoom} queryString=''/>);
    
    const bookButton = screen.getByText('Book now');
    expect(bookButton).toHaveAttribute('href', '/reservation/123');
  });

  it('appends query string to booking link when provided', () => {
    const queryString = '?checkin=2025-04-20&checkout=2025-04-25';
    render(<HotelRoomInfo roomDetails={mockRoom} queryString={queryString} />);
    
    const bookButton = screen.getByText('Book now');
    expect(bookButton).toHaveAttribute('href', `/reservation/123${queryString}`);
  });
});