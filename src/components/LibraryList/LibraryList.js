import React from "react";
import { Pane, Card, Text, majorScale } from "evergreen-ui";
import Library from "./Library";

export default class LibraryList extends React.PureComponent {
  isSelected = (selectedLib, lib) => selectedLib && selectedLib.id === lib.id;

  render() {
    const { libraries, selectedLib, onLibraryClick } = this.props;

    return (
      <Pane
        width={700}
        backgroundColor="white"
        padding={majorScale(2)}
        display="flex"
      >
        <Pane>
          <Card
            background="tint1"
            elevation={0}
            height={330}
            width={350}
            display="flex"
            flexDirection="column"
            alignItems="flexStart"
            justifyContent="center"
            paddingLeft={majorScale(2)}
          >
            {libraries.map(library => (
              <Library
                key={library.id}
                library={library}
                onLibraryClick={onLibraryClick}
                selected={this.isSelected(selectedLib, library)}
              />
            ))}
          </Card>
        </Pane>

        {selectedLib && (
          <Card
            background="tint1"
            elevation={0}
            height={330}
            width={350}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            padding={majorScale(2)}
            marginLeft={majorScale(2)}
          >
            <Text size={500} fontWeight={600} marginBottom={majorScale(2)}>
              {selectedLib.name}
            </Text>
            <Text size={300}>{selectedLib.formatted_address}</Text>
            <Text size={400}>Rating: {selectedLib.rating}</Text>
            {selectedLib.opening_hours && (
              <Text size={400}>{selectedLib.opening_hours.open_now ? "Open now" : "Closed now"}</Text>
            )}
          </Card>
        )}
      </Pane>
    );
  }
}
