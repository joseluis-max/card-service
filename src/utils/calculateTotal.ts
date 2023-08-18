/******************************************************
 Copyright (c), Joseph Valdiviezo. All rights reserved.
 ******************************************************/
/**
 * Calculate the total price of a service
 * @param start - Start date of service
 * @param end - End date of service
 * @param service - Price of service
 * @returns - Total price of service
 */
export default function calculateTotal (start: Date, end: Date, service: number): number {
  const diff = end.getTime() - start.getTime()
  const minutes = Math.ceil(diff / (1000 * 60))
  return minutes * service
}
