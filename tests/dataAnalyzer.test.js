import DataAnalyzer from '../src/dataAnalyzer';

describe('DataAnalyzer', () => {

  test('should return true if the oscillation is >= +0.01%', () => {

    const result = DataAnalyzer.checkOscillation(200, 200.002, 0.001)
    expect(result.isSignal).toBe(true)
    expect(result.priceDifferencePercentage).toBe(0.001)
   
  })

  test('should return true if the oscillation is <= -0.01%', () => {

    const result = DataAnalyzer.checkOscillation(200, 199.98, 0.01)
    expect(result.isSignal).toBe(true)
    expect(result.priceDifferencePercentage).toBe(-0.01000)
  })

  test('should return false if the oscillation is <= -0.01%', () => {

    const result = DataAnalyzer.checkOscillation(200, 199.99, 0.01)
    expect(result.isSignal).toBe(false)
    expect(result.priceDifferencePercentage).toBe(-0.005)
  })

  test('should handle incorrect values', () => {

    const result = DataAnalyzer.checkOscillation('fake1', 'fake2', 'fake3')
    expect(result.isError).toBe(true)
    expect(result.errorMessage).toBe('INVALID VALUES')
    expect(result.isSignal).toBe(false)
    expect(result.priceDifferencePercentage).toBe(0)
  })

})