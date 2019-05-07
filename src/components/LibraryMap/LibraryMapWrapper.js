import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
const MAP_KEY = "AIzaSyDpY6WL8JItnEEaReTqil6YNEgvwtSMPgA";

const LibraryMapWrapper = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "350px", width: "800px" }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    center={props.center}
    ref={props.onMapMounted}
  >
    {props.children}
  </GoogleMap>
));

export default LibraryMapWrapper;
