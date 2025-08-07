// main.js
export const uppercase = (text: string) => {
  return text?.toUpperCase() || ''
};
export const lowercase = (text: string) => {
  return text?.toLowerCase() || ''
};
export const capitalize = (text: string) => {
  return text?.charAt(0).toUpperCase() + text?.slice(1) || ''
};
export const truncate = (text: string, length = 30) => {
    return text?.length > length ? text.substring(0, length) + '...' : text
};
export const substring = (text: string, length = 30) => {
    return text?.length > length ? text.substring(0, length) + '...' : text
};
export const currency = (text: string, symbol = '$') => {
  return `${symbol}${parseFloat(text).toFixed(2)}`
}


