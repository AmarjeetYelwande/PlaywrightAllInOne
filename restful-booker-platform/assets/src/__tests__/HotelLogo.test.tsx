import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelLogo from '../components/home/HotelLogo';

describe('HotelLogo Component', () => {
  const mockBranding = {
    name: "Shady Meadows B&B",
    description: "A delightful hotel located in the heart of the countryside",
    logoUrl: "/images/logo.png",
    directions: "Follow the signs to the hotel",
    map: {
      latitude: 52.1234,
      longitude: -1.2345
    },
    contact: {
      name: "John Smith",
      phone: "01234 567890",
      email: "info@shadymeadows.com"
    },
    address: {
      line1: "The Shady Meadows",
      line2: "123 Country Lane",
      postTown: "Newtown",
      county: "Countryside",
      postCode: "NE12 3WD"
    }
  };

  it('renders the welcome message with hotel name', () => {
    render(<HotelLogo branding={mockBranding} />);
    
    expect(screen.getByText(`Welcome to ${mockBranding.name}`)).toBeInTheDocument();
  });

  it('renders the hotel description', () => {
    render(<HotelLogo branding={mockBranding} />);
    
    expect(screen.getByText(mockBranding.description)).toBeInTheDocument();
  });

  it('renders the Book Now button', () => {
    render(<HotelLogo branding={mockBranding} />);
    
    const bookButton = screen.getByText('Book Now');
    expect(bookButton).toBeInTheDocument();
    expect(bookButton).toHaveAttribute('href', '#booking');
    expect(bookButton).toHaveClass('btn', 'btn-primary', 'btn-lg');
  });

  it('applies the correct CSS classes to section and container elements', () => {
    const { container } = render(<HotelLogo branding={mockBranding} />);
    
    const heroSection = container.querySelector('.hero');
    expect(heroSection).toHaveClass('py-5');
    
    const heroContent = container.querySelector('.hero-content');
    expect(heroContent).toHaveClass('col-lg-8', 'text-center', 'text-lg-start', 'py-5');
  });
});