import { default as districts } from '../assets/address/district.json'
import { default as provinces } from '../assets/address/province.json'
import queryString from 'query-string'
import { default as wards } from '../assets/address/ward.json'
import { Product } from '@/types/order'
import { ProductType } from '@/apis/client/interface'

export const getAlwayArrayOfString = (stringOrArray: any) => {
  if (typeof stringOrArray === 'string') return [stringOrArray]
  return stringOrArray ?? []
}

export const objectToQueryString = (obj: any) => {
  return queryString.stringify(obj)
}

export function removeEmptyProperties(input: any) {
  const paramsString = JSON.stringify(input)

  const obj = JSON.parse(paramsString)

  for (const key in obj) {
    if (
      obj[key] === null ||
      obj[key] === undefined ||
      obj[key] === '' ||
      (Array.isArray(obj[key]) && obj[key].length === 0)
    ) {
      delete obj[key]
    }
  }

  return obj
}

export const createQueryStringDetail = ({
  id,
  searchParams,
  title
}: {
  title: string
  id: string
  searchParams?: any
}) => {
  const encodedTitle = encodeURIComponent(title)
  const params = new URLSearchParams(searchParams)
  const finalUrl = `${encodedTitle}?${params.toString()}&id=${id}`
  return finalUrl
}
// Ensure searchParams is included in dependencies
export const mergeUniqueByCode = (array1: any, array2: any) => {
  const mergedArray = [...array1, ...array2]
  const uniqueArray = mergedArray.filter(
    (item, index, self) => index === self.findIndex(t => t.code === item.code)
  )
  return uniqueArray
}

export function renderFullAddress(
  wardCode: any,
  districtCode: any,
  provinceCode: any
) {
  //@ts-ignore
  const wardName = wards[wardCode]?.name || ''
  const districtName =
    //@ts-ignore
    districts[districtCode]?.name || ''
  const provinceName =
    //@ts-ignore
    provinces[provinceCode]?.name || ''

  return `${wardName} ${districtName}  ${provinceName}`
}

export function getUniqueArray(arr: any) {
  return arr?.filter(
    (value: any, index: any, self: any) => self.indexOf(value) === index
  )
}
export function getUniqueObjects(arr: any) {
  const uniqueKeys = new Set()
  return arr.reduce((uniqueList: any, item: any) => {
    if (!uniqueKeys.has(item.key.trim())) {
      uniqueKeys.add(item.key.trim())
      uniqueList.push(item)
    }
    return uniqueList
  }, [])
}

export function formatSchedules(data: any, breakTime: any) {
  // Vietnamese day abbreviations
  const vietnameseDays = {
    MONDAY: 'Thứ 2',
    TUESDAY: 'Thứ 3',
    WEDNESDAY: 'Thứ 4',
    THURSDAY: 'Thứ 5',
    FRIDAY: 'Thứ 6',
    SATURDAY: 'Thứ 7',
    SUNDAY: 'CN'
  }

  // Dictionary to group days by their schedules
  const scheduleDict = {} as any

  if (data === null || data === undefined) return 'Chưa có dữ liệu'
  data.forEach((entry: any) => {
    const startTime = entry.time[0].slice(0, 2)
    const endTime = entry.time[1].slice(0, 2)
    let schedule

    if (breakTime && breakTime.length > 0) {
      const breakStartTime = breakTime[0].slice(0, 2)
      const breakEndTime = breakTime[1].slice(0, 2)
      schedule = `${startTime}h-${breakStartTime}h  ${breakEndTime}h-${endTime}h`
    } else {
      schedule = `${startTime}h-${endTime}h`
    }

    if (!scheduleDict[schedule]) {
      scheduleDict[schedule] = []
    }
    scheduleDict[schedule].push(entry.day)
  })

  // Helper function to get Vietnamese day abbreviation and check for consecutive days
  //@ts-ignore
  const getVietnameseDay = (day: any) => vietnameseDays[day]
  const dayOrder = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ]
  const dayIndex = (day: any) => dayOrder.indexOf(day)

  const formatDayRange = (days: any) => {
    if (days.length === 1) {
      return getVietnameseDay(days[0])
    }
    let ranges = []
    let start = days[0]
    let end = days[0]

    for (let i = 1; i < days.length; i++) {
      if (dayIndex(days[i]) === dayIndex(end) + 1) {
        end = days[i]
      } else {
        ranges.push(
          start === end
            ? getVietnameseDay(start)
            : `${getVietnameseDay(start)}-${getVietnameseDay(end)}`
        )
        start = days[i]
        end = days[i]
      }
    }
    ranges.push(
      start === end
        ? getVietnameseDay(start)
        : `${getVietnameseDay(start)}-${getVietnameseDay(end)}`
    )

    return ranges.join(', ')
  }

  // Format the final output
  const formattedSchedules = Object.entries(scheduleDict)
    .map(([time, days]) => {
      //@ts-ignore
      days.sort((a: any, b: any) => dayIndex(a) - dayIndex(b))
      const dayString = formatDayRange(days)
      return `${dayString}: ${time}`
    })
    .join('\n')

  return `${formattedSchedules}`
}

/**
 * Converts the first character of a string to uppercase and returns the modified string.
 * If the input string is empty or undefined, an empty string is returned.
 *
 * @param {string} str - The string whose first character is to be converted to uppercase.
 * @returns {string} - The string with its first character converted to uppercase, or an empty string if the input is undefined or empty.
 */
export function upperFirstLetter(str?: string) {
  if (!str) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncates a string to a specified length and appends an ellipsis at the start, middle, or end if the original string exceeds that length.
 *
 * @param {Object} options - Options for truncation.
 * @param {string} options.str - The string to be truncated.
 * @param {number} [options.limit=4] - The maximum length of the string before truncation.
 * @param {'start' | 'center' | 'end'} [options.position='center'] - The position where the truncation should occur.
 * @param {'.' | '*' | '#'} [options.hiddenStr='.'] - The character used to fill the ellipsis.
 * @param {number} [options.lengthHidden=3] - The length of the ellipsis.
 * @returns {string} - The truncated string.
 */
export function truncate({
  str,
  limit = 4,
  position = 'center',
  hiddenStr = '.',
  lengthHidden = 3
}: {
  str: string
  limit?: number
  position?: 'start' | 'center' | 'end'
  hiddenStr?: '.' | '*' | '#'
  lengthHidden?: number
}): string {
  // Check if truncation is necessary based on position and limits
  if (position === 'center' && str.length <= limit * 2) {
    return str
  } else if (position !== 'center' && str.length <= limit) {
    return str
  }

  // Create the ellipsis string
  const ellipsis = Array.from({ length: lengthHidden }, () => hiddenStr).join(
    ''
  )

  // Perform truncation based on position
  switch (position) {
    case 'start':
      return ellipsis + str.slice(-limit)
    case 'center':
      const start = str.substring(0, limit)
      const end = str.substring(str.length - limit, str.length)
      return `${start}${ellipsis}${end}`
    case 'end':
      return str.slice(0, limit) + ellipsis
    default:
      return str.slice(0, limit) + ellipsis
  }
}

/**
 * Function to remove Vietnamese accents from a string
 * @function
 * @param {string} str - The string from which to remove accents
 * @returns {string} - The string after removing accents
 */
export function removeAccents(str: string) {
  if (!str) {
    return ''
  }
  return str
    .normalize('NFD') // Normalize the string to Unicode Normalization Form D (NFD)
    .replace(/[\u0300-\u036f]/g, '') // Remove all combining diacritical marks
    .replace('đ', 'd') // Replace specific Vietnamese characters with their non-accented counterparts
    .replace('Đ', 'D') // Replace specific Vietnamese characters with their non-accented counterparts
}

/**
 * Function to create a slug from a string
 * @function
 * @param {string} str - The string from which to create a slug
 * @param {string|number} id - Id which will be added to the end of the slug
 * @returns {string} - The slug created from the input string
 */
export function slug(str: string, id?: string | number) {
  str = removeAccents(str)
  str = str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
  if (id) {
    str += `~${id}`
  }
  return str
}

export function formatSchedulesNew(data: any) {
  const vietnameseDays = {
    MONDAY: 'Thứ 2',
    TUESDAY: 'Thứ 3',
    WEDNESDAY: 'Thứ 4',
    THURSDAY: 'Thứ 5',
    FRIDAY: 'Thứ 6',
    SATURDAY: 'Thứ 7',
    SUNDAY: 'CN'
  }

  const scheduleDict = {} as any
  const dayOff = [] as any

  if (data === null || data === undefined) return 'Chưa có dữ liệu'

  const workingData = data.filter(
    (entry: any) => entry.work && entry.day !== 'LUNCHBREAK'
  )

  const lunchBreak = data.find((entry: any) => entry.day === 'LUNCHBREAK')
  const breakTime = lunchBreak ? lunchBreak.time : null
  data.forEach((entry: any) => {
    if (!entry.work && entry.day !== 'LUNCHBREAK') {
      dayOff.push(entry.day)
      return
    }
  })

  workingData.forEach((entry: any) => {
    if (!entry.work) {
      dayOff.push(entry.day)
      return
    }

    const startTime = entry.time[0]
    const endTime = entry.time[1]
    let schedule

    if (breakTime && breakTime.length > 0) {
      const breakStartTime = breakTime[0]
      const breakEndTime = breakTime[1]
      schedule = `${startTime}-${breakStartTime}|${breakEndTime}-${endTime}`
    } else {
      schedule = `${startTime}-${endTime}`
    }

    if (!scheduleDict[schedule]) {
      scheduleDict[schedule] = []
    }

    scheduleDict[schedule].push(entry.day)
  })
  //@ts-ignore
  const getVietnameseDay = (day: any) => vietnameseDays[day]
  const dayOrder = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
  ]
  const dayIndex = (day: any) => dayOrder.indexOf(day)

  const formatDayRange = (days: any) => {
    if (days.length === 1) {
      return getVietnameseDay(days[0])
    }
    let ranges = []
    let start = days[0]
    let end = days[0]

    for (let i = 1; i < days.length; i++) {
      if (dayIndex(days[i]) === dayIndex(end) + 1) {
        end = days[i]
      } else {
        ranges.push(
          start === end
            ? getVietnameseDay(start)
            : `${getVietnameseDay(start)}-${getVietnameseDay(end)}`
        )
        start = days[i]
        end = days[i]
      }
    }
    ranges.push(
      start === end
        ? getVietnameseDay(start)
        : `${getVietnameseDay(start)}-${getVietnameseDay(end)}`
    )

    return ranges.join(', ')
  }

  const formattedSchedules = Object.entries(scheduleDict)
    .map(([time, days]) => {
      //@ts-ignore
      days.sort((a, b) => dayIndex(a) - dayIndex(b))
      const dayString = formatDayRange(days)
      return `${dayString}: ${time}`
    })
    .join('\n')

  const formattedDayOff = dayOff
    .map((day: any) => getVietnameseDay(day))
    .join(', ')

  return formattedDayOff
    ? `${formattedSchedules}\n\nNgày nghỉ: ${formattedDayOff}`
    : formattedSchedules
  // return `${formattedSchedules}\n\nNgày nghỉ: ${formattedDayOff}`;
}

enum ProductStockStatus {
  'STOCKING' = 'STOCKING',
  'OUTOFSTOCK' = 'OUTOFSTOCK'
}

export const checkProductIsOutOfStock = ({
  product,
  selectedItem
}: {
  product: any
  selectedItem: any
}) => {
  if (product.category_code === ProductType.LOP) {
    // @ts-ignore
    const findItem = product.sell_info.classifies.find(
      (item: any) =>
        item.manufacture === selectedItem.detail.classifies.manufacture
    )

    if (!findItem)
      return {
        product: product,
        isOutOfStock: true
      }

    return {
      product,
      isOutOfStock: findItem.stock !== ProductStockStatus.STOCKING
    }
  }

  return {
    product,
    isOutOfStock: product.sell_info.stock !== ProductStockStatus.STOCKING
  }
}

export const getClassifiesFromCartOrOrder = (item: any) => {
  console.log('item::::', item)
  if (item.product.category_code === ProductType.LOP) {
    const selectedItem = item.detail.classifies.manufacture

    const findItem = item.product.sell_info.classifies.find(
      (classifyItem: any) => classifyItem.manufacture == selectedItem
    )

    return findItem
  }

  const sellInfo = item.product.sell_info
  return {
    price: sellInfo.price,
    stock: sellInfo.stock,
    discount_type: sellInfo.discount_type,
    discount_number: sellInfo.discount_number
  }
}

export function removeDiacritics(text?: string) {
  if (!text) return ''
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
}
