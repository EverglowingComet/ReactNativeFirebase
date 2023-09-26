import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

export const locationServices = {
  configureFineTracking,
  requestAuthentication,
  startTracking,
  stopTracking,
};

function configureFineTracking() {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    locationProvider: 'auto',
    enableBackgroundLocationUpdates: true,
  });
}

function requestAuthentication(): Promise<any> {
  return new Promise((resolve, reject) => {
    Geolocation.requestAuthorization(
      () => {
        resolve(true);
      },
      error => {
        reject(error);
      },
    );
  });
}

function startTracking(
  distanceFilter: number = 10,
  interval: number = 5000,
  onLocationUpdaet: (position: GeolocationResponse) => void,
): Promise<number> {
  return new Promise<number>(resolve => {
    const watchId = Geolocation.watchPosition(
      position => {
        onLocationUpdaet(position);
      },
      error => {
        console.log(error);
      },
      {
        distanceFilter: distanceFilter,
        interval: interval,
        useSignificantChanges: true,
        enableHighAccuracy: true,
      },
    );
    resolve(watchId);
  });
}

function stopTracking(watchId: number): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    Geolocation.clearWatch(watchId);
    resolve(true);
  });
}
