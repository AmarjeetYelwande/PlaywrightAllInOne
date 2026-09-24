import React from 'react';
import Notification from '../components/admin/Notification';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Notification Component', () => {
  test('Notification renders plain inbox when no unread notifications', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Notification setCount={() => {}} />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Notification renders alert inbox when there are unread notifications', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Notification setCount={() => {}} count={34} />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
