/**
 * Accept a date object and return a date string in ISO format (YYYY-MM-DD).
 */
export function getISOFromDateObj(dateObj: Date) {
  // Get the current date in US format, which also pads the dates with leading zeros when necessary.
  // See https://stackoverflow.com/a/47160545/9453009
  const localeDateString = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return `${localeDateString.slice(6)}-${localeDateString.slice(0, 2)}-${localeDateString.slice(3, 5)}`;
}

/**
 * Accept a date string in ISO format (YYYY-MM-DD) and return a date object.
 * NOTE: If I simply pass the ISO string to the `new Date()` constructor, then the date could be off by a day depending on the timezone. However, if I create a new Date object and then parse out the year, month, and day with the getUTC* functions (aka getISO* functions), then the date appears to be accurate. I think the reason for that is because the string that is being passed to this function is an ISO string and when you parse that string into a Date object using the getUTC* functions, then you will get the correct date. I think this is because both the input (ISO string) and output (Date object) are using the same timezone, so there are no one-off errors due to the timezone conversions.
 */  
export function getDateObjFromISO(isoDateString: string) {
  const d = new Date(isoDateString);
  const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return utcDate;
}

/**
 * This `isValidDate()` function is borrowed from this post:
 * https://stackoverflow.com/a/35413963/9453009
 */
export function isValidDate(dateString:string) {
  // Leaving the date field empty is valid. So if the input is an empty string, then return true.
  if (!dateString) return true;
  // Otherwise, run the validation against the string input.
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;  // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}
