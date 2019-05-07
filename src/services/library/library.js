import { getPlaceDetails } from "../place/place";
import libraries from "./raw_libraries";

const OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT";

const getLibrary = (map, libraries, currentInd, result) => {
  if (currentInd === libraries.length) {
    window.localStorage.setItem("LIBRARIES", JSON.stringify(result));
    return console.log(result);
  }

  const { Library: name, Phone: phone, Zip: zip } = libraries[currentInd];
  const query = `${name} ${zip}`;

  getPlaceDetails(map, { name, phone, query }, (error, place) => {
    if (error === OVER_QUERY_LIMIT) {
      setTimeout(() => getLibrary(map, libraries, currentInd, result), 2000);
    } else {
      if (!error && place) result.push(place);

      getLibrary(map, libraries, currentInd + 1, result);
    }
  });
};

export const getLibraryDetails = map => {
  getLibrary(map, libraries, 0, []);
};
