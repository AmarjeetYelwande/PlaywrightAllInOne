import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeNav from '../components/HomeNav';
import '@testing-library/jest-dom';

describe('HomeNav Component', () => {
  const mockBranding = {
    name: 'Test B&B',
    logoUrl: '/logo.png',
    description: 'A lovely place to stay',
    map: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    directions: 'Turn left, then right',
    contact: {
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com'
    },
    address: {
      line1: '123 Test Street',
      line2: 'Test Village',
      postTown: 'Testington',
      county: 'Testshire',
      postCode: 'TE1 1ST'
    }
  };

  it('renders the B&B name correctly', () => {
    render(<HomeNav branding={mockBranding} />);
    expect(screen.getByText('Test B&B')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<HomeNav branding={mockBranding} />);
    
    const navLinks = [
      { text: 'Rooms', href: '/#rooms' },
      { text: 'Booking', href: '/#booking' },
      { text: 'Amenities', href: '/#amenities' },
      { text: 'Location', href: '/#location' },
      { text: 'Contact', href: '/#contact' },
      { text: 'Admin', href: '/admin' }
    ];

    navLinks.forEach(link => {
      const element = screen.getByText(link.text);
      expect(element).toBeInTheDocument();
      expect(element.closest('a')).toHaveAttribute('href', link.href);
    });
  });

  it('contains the navbar toggler button for mobile views', () => {
    render(<HomeNav branding={mockBranding} />);
    
    const togglerButton = screen.getByRole('button');
    expect(togglerButton).toBeInTheDocument();
    expect(togglerButton).toHaveAttribute('data-bs-toggle', 'collapse');
    expect(togglerButton).toHaveAttribute('data-bs-target', '#navbarNav');
  });

  it('has the correct Bootstrap classes for styling', () => {
    render(<HomeNav branding={mockBranding} />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('navbar');
    expect(navbar).toHaveClass('navbar-expand-lg');
    expect(navbar).toHaveClass('navbar-light');
    expect(navbar).toHaveClass('bg-white');
    expect(navbar).toHaveClass('shadow-sm');
    expect(navbar).toHaveClass('sticky-top');
  });

  it('contains the brand link that points to homepage', () => {
    render(<HomeNav branding={mockBranding} />);
    
    const brandLink = screen.getByText('Test B&B').closest('a');
    expect(brandLink).toHaveAttribute('href', '/');
    expect(brandLink).toHaveClass('navbar-brand');
  });
});