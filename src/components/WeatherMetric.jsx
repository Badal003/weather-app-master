import React from 'react';

/**
 * WeatherMetric Component
 * Renders a single weather metric with an icon, value, and label
 * 
 * @param {Object} props
 * @param {string} props.icon - URL of the metric icon
 * @param {string} props.value - Value to display
 * @param {string} props.label - Label for the metric
 * @param {string} props.iconAlt - Alt text for the icon
 */
const WeatherMetric = ({ icon, value, label, iconAlt }) => {
  return (
    <section className="d-flex flex-column align-items-center justify-content-center">
      <section className="py-1">
        <img src={icon} height={"30"} width={"30"} alt={iconAlt} />
      </section>
      <p className="fw-bold text-light brand-small-text text-center py-1 m-0">
        {value}
      </p>
      <p className="m-0 text-muted text-capitalize brand-small-text-2 weather-text text-center">
        {label}
      </p>
    </section>
  );
};

export default WeatherMetric;