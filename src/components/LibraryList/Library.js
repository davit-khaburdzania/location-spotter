import React from "react";
import { Pane, Avatar, Text, majorScale } from "evergreen-ui";

export default class Library extends React.PureComponent {
  render() {
    const { library, onLibraryClick, selected } = this.props;

    return (
      <Pane
        display="flex"
        alignItems="center"
        marginTop={majorScale(1)}
        cursor="pointer"
        onClick={() => onLibraryClick(library)}
      >
        <Avatar name={library.name} />
        <Text
          marginLeft={8}
          size={300}
          fontWeight={500}
          opacity={selected ? 0.5 : 1.0}
        >
          {library.name}
        </Text>
      </Pane>
    );
  }
}
