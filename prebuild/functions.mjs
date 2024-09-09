export function formatDate(inputDate) {
  // Check if the input matches the DD/MM/YYYY format
  const dateParts = inputDate.split("/");

  if (dateParts.length !== 2) {
    throw new Error("Invalid date input");
  }

  // Extract day, month, and year from the input
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is zero-indexed
  const year = "2024";

  // Create a new Date object
  const date = new Date(year, month, day);

  // Validate the Date object
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  // Format day and month with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

  // Return the formatted date as dd/mm
  return `${formattedMonth}/${formattedDay}/2024`;
}
export function getLaterDate(dateStr1, dateStr2) {
  if (!dateStr1) {
    return dateStr2;
  }
  if (!dateStr2) {
    return dateStr1;
  }
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  return date1 >= date2 ? dateStr1 : dateStr2;
}
export function displayDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Get the day of the month and convert it to a string
  const day = String(date.getDate()).padStart(2, "0");

  // Get the abbreviated month name
  const monthName = date.toLocaleString("default", { month: "short" });

  // Return the formatted date string
  return `${day} ${monthName}`;
}
