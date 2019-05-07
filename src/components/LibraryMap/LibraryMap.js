import React from "react";
import { Marker } from "react-google-maps";
import { Pane, majorScale } from "evergreen-ui";
import LibraryMapWrapper from "./LibraryMapWrapper";

export default class LibraryMap extends React.PureComponent {
  isSelected = (selectedLib, lib) => selectedLib && selectedLib.id === lib.id;

  render() {
    const { center, libraries, onMarkerClick, selectedLib } = this.props;

    return (
      <Pane background="tint1" padding={5} marginLeft={majorScale(2)}>
        <LibraryMapWrapper
          center={{ lat: center.lat, lng: center.lng }}
          onMapMounted={this.onMapMounted}
        >
          {libraries.map(library => (
            <Marker
              key={
                this.isSelected(selectedLib, library) ? -library.id : library.id
              }
              clickable
              defaultOpacity={this.isSelected(selectedLib, library) ? 0.3 : 1.0}
              position={{ lat: library.lat, lng: library.lng }}
              onClick={() => onMarkerClick(library)}
            />
          ))}
        </LibraryMapWrapper>
      </Pane>
    );
  }
}
