import { Ride } from '~/types/type';

export const sortRides = (rides: Ride[]): Ride[] => {
  const result = rides.sort((a, b) => {
    const dateA = new Date(`${a.created_at}T${a.ride_time}`);
    const dateB = new Date(`${b.created_at}T${b.ride_time}`);
    return dateB.getTime() - dateA.getTime();
  });

  return result.reverse();
};

export function formatTime(minutes: number): string {
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day < 10 ? '0' + day : day} ${month} ${year}`;
}

export const convertDate = (dateString: string) => {
  const date = new Date(dateString);

  // Format the date
  const day = date.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? '0' + day : day} ${month} ${year}`;

  // Format the time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Combine date and time
  return `${formattedDate}, ${formattedTime}`;
};

//to cal price of what we have to pay

export const calculateRidePrice = (distance: number): string => {
  // Convert distance to kilometers
  const kilometers = (distance / 1000).toFixed(1); // e.g., 2044 meters -> 2.0 km

  // Calculate the price
  const price = (parseFloat(kilometers) * 2).toFixed(2); // e.g., 2.0 km * 2 LKR = 4.00 LKR

  //return `Distance: ${kilometers} km, Price: ${price} LKR`;
  return price;
};

//to cal duration in time
export const calculateRideDuration = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600); // Calculate hours
  const minutes = Math.floor((durationInSeconds % 3600) / 60); // Calculate remaining minutes
  const seconds = Math.round(durationInSeconds % 60); // Remaining seconds

  // Format the duration into a readable format
  return `${hours}h ${minutes}m ${seconds}s`;
};
