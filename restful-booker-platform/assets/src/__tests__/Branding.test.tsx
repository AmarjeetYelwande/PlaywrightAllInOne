import React from 'react';
import BrandingForm from '../components/admin/Branding';
import ReactModal from 'react-modal';
import { render, fireEvent, waitFor } from '@testing-library/react';

const brandingData = {
  name: 'Shady Meadows B&B',
  map: {
    latitude: 52.6351204,
    longitude: 1.2733774
  },
  directions: 'Take the first left after the big tree, then follow the road until you see the sign.',
  logoUrl: 'https://www.mwtestconsultancy.co.uk/img/rbp-logo.png',
  description: 'Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.',
  contact: {
    name: 'Shady Meadows B&B',
    phone: '0123456789',
    email: 'fake@fakeemail.com'
  },
  address: {
    line1: '123 Fake Street',
    line2: 'Fake Town',
    postTown: 'Fake Town',
    county: 'Fake County',
    postCode: 'FA1 2KE'
  }
};

describe('Branding Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(brandingData)
      }));
  });

  test('Branding page renders', async () => {
    const { asFragment, findByDisplayValue } = render(
      <BrandingForm />
    );

    await findByDisplayValue("52.6351204");
    
    expect(asFragment()).toMatchSnapshot();
  });

  test('Branding page shows modal on success', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(brandingData)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true
      }));

    ReactModal.setAppElement(document.createElement('div'));

    const { getByText, getByPlaceholderText } = render(
      <BrandingForm />
    );

    fireEvent.change(getByPlaceholderText('Enter B&B name'), { target: { value: 'Updated Room' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(getByText('Branding updated!')).toBeInTheDocument());
  });

  test('Branding page shows errors', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(brandingData)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: false,
        json: () => Promise.resolve({
          fieldErrors: ["Phone should not be blank"]
        })
      }));

    const { getByText, findByText } = render(
      <BrandingForm />
    );

    fireEvent.click(getByText('Submit'));
    await findByText('Phone should not be blank');

    expect(getByText('Phone should not be blank')).toBeInTheDocument();
  });
});
