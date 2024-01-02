/**
 * Toolpad handlers file.
 */

interface StopPoint{
  persistent?: {
  id: number;
  name?: string;
  description?: string;
  creator?: number;
  locales?: [];
   active?: boolean;
  },
    number?: number;
 poin?: {
        x?: GeolocationCoordinates,
        y?: GeolocationCoordinates
    },
  stopId?: number;
}




const stoppoints: StopPoint[] = { ...StopPoint }

// export default async function handler(message: string) {
//   return `Hello ${message}`;
// }


export async function updateStopPoint(id: number, values: Omit<StopPoint, 'id'>) {
  const index = stoppoints.findIndex((item) => item.persistent?.id === id);

  if (stoppoints[index]) {
    Object.assign(stoppoints[index], values);
  }

  return stoppoints[index];
}

export async function getStopPointsAll() {
  return stoppoints;
}