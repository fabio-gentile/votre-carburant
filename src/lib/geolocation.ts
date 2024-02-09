/**
 * Custom hook to get the geolocation.
 * @returns Promise
 * @example
 * const geolocation = useGeolocation(true);
 */
export async function getGeolocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error: GeolocationPositionError) => {
        console.error(error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  });
}
