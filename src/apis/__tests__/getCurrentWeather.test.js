import { checkWeatherCode, checkWeatherUnitDeg, closeUtilityComponent } from '../getCurrentWeather';
import { db } from '../../backend/app_backend';
import Thunder from '../../assets/static/thunder.svg';
import Day from '../../assets/static/day.svg';

jest.mock('../../backend/app_backend');
jest.mock('jquery');

describe('Weather API Functions', () => {
  describe('checkWeatherCode', () => {
    test('should return Thunder svg for thunderstorm weather (200-299)', () => {
      const result = checkWeatherCode(201);
      expect(result).toBe(Thunder);
    });

    test('should return Day svg for clear sky (800)', () => {
      const result = checkWeatherCode(800);
      expect(result).toBe(Day);
    });
  });

  describe('checkWeatherUnitDeg', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return "c" for celsius unit', () => {
      db.get.mockReturnValue('celsius');
      const result = checkWeatherUnitDeg();
      expect(result).toBe('c');
    });

    test('should return "f" for fahrenheit unit', () => {
      db.get.mockReturnValue('farenheit');
      const result = checkWeatherUnitDeg();
      expect(result).toBe('f');
    });

    test('should set default to celsius if no unit is set', () => {
      db.get.mockReturnValue(null);
      const result = checkWeatherUnitDeg();
      expect(result).toBe('c');
      expect(db.create).toHaveBeenCalledWith('WEATHER_UNIT', 'celsius');
    });
  });
});