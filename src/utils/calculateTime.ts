/******************************************************
 Copyright (c), Joseph Valdiviezo. All rights reserved.
 ******************************************************/

/**
 * Calculate the total time between two dates
 * @param start - Start date of service
 * @param end - End date of service
 * @returns - Total time of service
 * @example
 *
 * const start = new Date('2021-10-10T10:00:00.000Z')
 * const end = new Date('2021-10-10T11:00:00.000Z')
 * const total = calculateTotal(start, end)
 * console.log(total) // 01:00
 */
export default function calculateTotal (start: Date, end: Date): string {
  let str = ''
  const diff = end.getTime() - start.getTime()
  const time = Math.ceil(diff / (1000 * 60))
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  hours < 10 ? str += `0${hours} horas y ` : str += `${hours} horas y `
  minutes < 10 ? str += `0${minutes} minutos` : str += `${minutes} minutos`
  return str
}
