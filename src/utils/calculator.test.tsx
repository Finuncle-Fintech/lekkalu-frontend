import { calculateSip, calculateCagr, calculateEmi, calculateAssetsForEmi, calculateTenureByUnit } from './calculators';
import { createUrlString, copyToClipboard, handleShare } from './clipboard';

describe('Calculate-SIP', () => {
  test('calculates SIP correctly', () => {
    const result = calculateSip(5000, 5, 10);
    expect(result).toBeDefined(); // Ensure result is defined
    expect(result.totalInvested).toBe(300000); // Example expected value
    // Add more assertions here based on your expected output
  });
});

describe('Calculate-CAGR', () => {
  test('calculates CAGR correctly', () => {
    const result = calculateCagr(5000, 25000, 5);
    expect(result).toBeDefined(); // Ensure result is defined
    expect(result.absoluteCAGR).toBe('0.38'); // Example expected value
    // Add more assertions here based on your expected output
  });
});

describe('Calculate-EMI', () => {
  test('calculates EMI correctly', () => {
    const result = calculateEmi(300000, 11, 3, 'Months');
    expect(result).toBeDefined(); // Ensure result is defined
    expect(result!.loan_emi).toBe('101838.91'); // Example expected value
    // Add more assertions here based on your expected output
  });
});

describe('CalculateAssetsForEMI', () => {
  test('calculates assets correctly', () => {
    const result = calculateAssetsForEmi(100000, '5000');
    expect(result).toBeDefined(); // Ensure result is defined
    expect(result.totalVal).toBe(105000); // Example expected value
    // Add more assertions here based on your expected output
  });
});

describe('CalculateTenureByUnit', () => {
  test('calculates tenure correctly', () => {
    const result = calculateTenureByUnit('Years', 60);
    expect(result).toBe(5); // Example expected value
    // Add more assertions here based on your expected output
  });
});

describe('CreateUrlString', () => {
    test('it creates a valid URL string', () => {
      const params = {
        key1: 'value1',
        key2: 123,
        key3: 'value3',
      };
      const expectedUrl = 'key1=value1&key2=123&key3=value3';
      expect(createUrlString(params)).toEqual(expectedUrl);
    });
});
  