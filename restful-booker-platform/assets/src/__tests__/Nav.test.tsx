import React from 'react';
import Nav from '../components/admin/Nav';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Nav Component', () => {
  test('Nav bar renders', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Nav setAuthenticate={() => {}} isAuthenticated={true} />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
