export const getPlaceDetails = (map, attrs, cb) => {
  let google = window.google;
  let service = new google.maps.places.PlacesService(
    map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  );
  const STATUS_OK = google.maps.places.PlacesServiceStatus.OK;
  const { name, phone, query } = attrs;
  const request = {
    query,
    fields: [
      "place_id",
      "name",
      "geometry",
      "formatted_address",
      "opening_hours",
      "rating",
      "photos"
    ]
  };

  service.findPlaceFromQuery(request, function(results, status) {
    status === STATUS_OK
      ? cb(null, formatPlace(results[0], { name, phone }))
      : cb(status);
  });
};

export const distance = (lat1, lon1, lat2, lon2) => {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km

  return d / 1000; // Distance in meters
};

export const sortPlacesByDistance = places => {
  const center = places[0];
  
  return places.sort((a, b) => {
    return (
      distance(center.lat, center.lng, a.lat, a.lng) -
      distance(center.lat, center.lng, b.lat, b.lng)
    );
  });
};

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

const formatPlace = (place, additionalProps) => {
  return {
    formatted_address: place.formatted_address,
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
    rating: place.rating,
    place_id: place.place_id,
    opening_hours: place.opening_hours,
    photo: place.photos && place.photos[0] ? place.photos[0].getUrl() : null,
    ...additionalProps
  };
};
