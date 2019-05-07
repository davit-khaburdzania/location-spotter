import React from "react";
import LibraryMap from "../LibraryMap/LibraryMap";
import LibraryList from "../LibraryList/LibraryList";
import Pagination from "../LibraryList/Pagination";
import { sortPlacesByDistance } from "../../services/place/place";
import libraries from "../../services/library/parsed_libraries.json";

import "./App.css";

export default class App extends React.PureComponent {
  state = {
    page: 1,
    offset: 10,
    selectedLib: null,
    libraries: libraries
  };

  componentDidMount () {
    this.sortLibraries();
  }

  onMapMounted = map => {
    this.setState({ map });
  };

  onPageChange = page => {
    this.setState({ page, selectedLib: null });
    this.sortLibraries();
  };

  onMarkerClick = library => {
    this.setState({ selectedLib: library });
  };

  allPages = () => {
    return Math.floor(libraries.length / this.state.offset) + 1;
  };

  sortLibraries = () => {
    const libraries = this.state.libraries;
    const start_index = (this.state.page - 1) * this.state.offset;
    const currentLibs = libraries.slice(start_index);
    const sorted = sortPlacesByDistance(currentLibs);
    const newLibs = libraries.slice(0, start_index).concat(sorted);

    this.setState({ libraries: newLibs });
  };

  getCenter = () => {
    const start_index = (this.state.page - 1) * this.state.offset;

    return this.state.libraries[start_index];
  };

  getCurrentLibraries = () => {
    const { libraries, offset } = this.state;
    const start_index = (this.state.page - 1) * this.state.offset;

    return libraries.slice(start_index, start_index + offset);
  };

  render() {
    const { selectedLib, page } = this.state;
    const currentLibs = this.getCurrentLibraries();

    return (
      <div className="App">
        <LibraryMap
          center={this.getCenter()}
          libraries={currentLibs}
          onMarkerClick={this.onMarkerClick}
          onMapMounted={this.onMapMounted}
          selectedLib={selectedLib}
        />
        <LibraryList
          libraries={currentLibs}
          selectedLib={selectedLib}
          onLibraryClick={this.onMarkerClick}
        />
        <Pagination
          page={page}
          allPages={this.allPages()}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}
