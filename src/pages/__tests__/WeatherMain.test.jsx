import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherMain from '../WeatherMain';
import { db } from '../../backend/app_backend';

// Mock the database and navigation
jest.mock('../../backend/app_backend');
jest.mock('../../inc/scripts/utilities', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('WeatherMain Component', () => {
  beforeEach(() => {
    // Mock database values
    db.get.mockImplementation((key) => {
      const mockData = {
        'WEATHER_LOCATION': 'Test City, TC',
        'WEATHER_DEG': 25,
        'WEATHER_DESCRIPTION': 'clear sky',
        'SUB_WEATHER_WIND_VALUE': '3.5 m/s',
        'SUB_WEATHER_HUMIDITY_VALUE': '65%',
        'SUB_WEATHER_PRESSURE_VALUE': '1013 hPa'
      };
      return mockData[key];
    });
  });

  test('renders weather information correctly', () => {
    render(<WeatherMain />);
    
    // Check if location is rendered
    expect(screen.getByText('Test City, TC')).toBeInTheDocument();
    
    // Check if temperature is rendered
    expect(screen.getByText('25')).toBeInTheDocument();
    
    // Check if weather description is rendered
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    
    // Check if weather metrics are rendered
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
  });

  test('displays default values when db returns null', () => {
    db.get.mockImplementation(() => null);
    
    render(<WeatherMain />);
    
    expect(screen.getByText('Lagos, 9ja')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  test('renders weather icons', () => {
    render(<WeatherMain />);
    
    // Check if all weather icons are present
    expect(screen.getByAltText('wind-icon')).toBeInTheDocument();
    expect(screen.getByAltText('humidity-icon')).toBeInTheDocument();
    expect(screen.getByAltText('rain-icon')).toBeInTheDocument();
  });
});