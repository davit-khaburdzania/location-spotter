import React from "react";
import { Pane, Text, Button, majorScale } from "evergreen-ui";

export default class Pagination extends React.PureComponent {
  render() {
    const { page, allPages, onPageChange } = this.props;

    return (
      <Pane display="flex" alignItems="center" padding={majorScale(2)} paddingTop={0}>
        <Button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          appearance="minimal"
        >
          Prev
        </Button>
        <Text marginLeft={majorScale(1)} marginRight={majorScale(1)} size={300}>
          Page {page} of {allPages}
        </Text>
        <Button
          disabled={page === allPages}
          onClick={() => onPageChange(page + 1)}
          marginRight={16}
          appearance="minimal"
        >
          Next
        </Button>
      </Pane>
    );
  }
}
