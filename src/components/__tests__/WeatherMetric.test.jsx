import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherMetric from '../WeatherMetric';

describe('WeatherMetric Component', () => {
  const mockProps = {
    icon: 'test-icon.svg',
    value: '25 km/h',
    label: 'Wind Speed',
    iconAlt: 'wind-icon'
  };

  test('renders with all props correctly', () => {
    render(<WeatherMetric {...mockProps} />);
    
    // Check if icon is rendered with correct props
    const icon = screen.getByAltText(mockProps.iconAlt);
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain(mockProps.icon);
    
    // Check if value is rendered
    expect(screen.getByText(mockProps.value)).toBeInTheDocument();
    
    // Check if label is rendered
    expect(screen.getByText(mockProps.label)).toBeInTheDocument();
  });

  test('applies correct styling classes', () => {
    render(<WeatherMetric {...mockProps} />);
    
    // Check if value has correct styling classes
    const value = screen.getByText(mockProps.value);
    expect(value).toHaveClass('fw-bold', 'text-light', 'brand-small-text');
    
    // Check if label has correct styling classes
    const label = screen.getByText(mockProps.label);
    expect(label).toHaveClass('text-muted', 'text-capitalize', 'brand-small-text-2');
  });
});