// import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', async () => {
    render(<App />);
    const headerTitle = await screen.findByText(/IQUNEX test/i);
    expect(headerTitle).toBeInTheDocument();
});
