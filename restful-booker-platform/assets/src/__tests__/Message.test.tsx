import React from 'react';
import Message from '../components/admin/Message';
import { render, waitFor, screen, act } from '@testing-library/react';

const messageData = {
  name: "Mark Winteringham",
  email: "mark@mwtestconsultancy.co.uk",
  phone: "01821 912812",
  subject: "Subject description here",
  description: "Lorem ipsum dolores est"
};

describe('Message Component', () => {
  beforeEach(() => {
    // Mock the GET request
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(messageData)
      }))
      // Mock the PUT request for marking as read
      .mockImplementationOnce(() => Promise.resolve({
        ok: true
      }));
  });

  test('Message popup is populated with details', async () => {
    await act(async () => {
      render(<Message messageId={1} refreshMessageList={() => {}} closeMessage={() => {}} />);
    });

    await waitFor(() => {
      const modalComponent = screen.getByTestId(/message/);
      expect(modalComponent).toMatchSnapshot();
    });
  });
});
