import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelMap from '../components/home/HotelMap';

// Mock the pigeon-maps library
jest.mock('pigeon-maps', () => ({
  Map: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-map">{children}</div>
  ),
  Marker: () => <div data-testid="mocked-marker"></div>
}));

describe('HotelMap Component', () => {
  const mockBranding = {
    name: 'Test B&B',
    logoUrl: '/logo.png',
    description: 'A lovely place to stay',
    map: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    directions: 'Turn left at the church, continue for half a mile',
    contact: {
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'contact@testbandb.com'
    },
    address: {
      line1: '123 Test Street',
      line2: 'Test Area',
      postTown: 'Testington',
      county: 'Testshire',
      postCode: 'TE1 1ST'
    }
  };

  it('renders the location section with correct heading', () => {
    render(<HotelMap branding={mockBranding} />);
    
    expect(screen.getByText('Our Location')).toBeInTheDocument();
    expect(screen.getByText(/Find us in the beautiful Testington countryside/)).toBeInTheDocument();
  });

  it('renders the address information correctly', () => {
    render(<HotelMap branding={mockBranding} />);
    
    const addressText = "123 Test Street, Test Area, Testington, Testshire, TE1 1ST";
    expect(screen.getByText(addressText)).toBeInTheDocument();
  });

  it('displays contact phone and email', () => {
    render(<HotelMap branding={mockBranding} />);
    
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('contact@testbandb.com')).toBeInTheDocument();
  });

  it('renders directions information', () => {
    render(<HotelMap branding={mockBranding} />);
    
    expect(screen.getByText('Getting Here')).toBeInTheDocument();
    expect(screen.getByText('Turn left at the church, continue for half a mile')).toBeInTheDocument();
  });

  it('renders the map component', () => {
    render(<HotelMap branding={mockBranding} />);
    
    expect(screen.getByTestId('mocked-map')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-marker')).toBeInTheDocument();
  });
});