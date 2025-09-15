// src/mocks/utils/simulate.ts
export async function simulateLatency(min = 200, max = 1200) {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((res) => setTimeout(res, ms))
}

/**
 * returns true if simulated error should happen (default ~7%)
 */
export function shouldSimulateError(prob = 0.07) {
  return Math.random() < prob
}
