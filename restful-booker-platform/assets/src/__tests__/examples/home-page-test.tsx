import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoomListings from '../../components/admin/RoomListings';
import { findByText, render } from '@testing-library/react';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      rooms: [
        {
          roomid: 1,
          roomName: "202",
          type: "Single",
          accessible: true,
          image: "string",
          description: "string",
          features: ["string"],
          roomPrice: 0
        }
      ]
    })
  })
) as jest.Mock;

test('Rooms list component', async () => {
    const { asFragment, findByText } = render(
        <BrowserRouter>
            <RoomListings />
        </BrowserRouter>
    );

    await findByText("string");

    expect(asFragment()).toMatchSnapshot();
});

// Check suggestions...
//
// Check creation of components are consistent
// Check state changes in components that use isAuthorised
// Check BookingListings populates with BookingListing components
