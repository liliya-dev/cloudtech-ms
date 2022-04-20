import { useId } from '@reach/auto-id';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set } from '@sanity/form-builder/PatchEvent';
import { SearchIcon } from '@sanity/icons';
import { Autocomplete, Stack, Card, Text } from '@sanity/ui';
import { withDocument } from 'part:@sanity/form-builder';
import React, { useCallback, useState } from 'react';

import { blocksToText } from '../utils/portableText/portableTextToText';

const DialogSelect = React.forwardRef((props, ref) => {
  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    placeholder, // Placeholder text from the schema
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events
    document,
  } = props;

  // Creates a unique ID for our input
  const inputId = useId();

  const [options] = useState<{ value: string; description: string }[]>(
    document.dialogs?.map(({ slug, content = [] }) => ({
      value: slug?.current,
      description: `${blocksToText(content)?.slice(0, 75)}…`,
    })),
  );

  const onSelect = useCallback(
    (newValue) => {
      onChange(PatchEvent.from(set(newValue)));
    },
    [onChange, value],
  );

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      compareValue={compareValue} // Handles "edited" status
      inputId={inputId} // Allows the label to connect to the input field
    >
      <Autocomplete
        radius={0}
        fontSize={2}
        filterOption={(query, option) =>
          option.value.toLowerCase().indexOf(query.toLowerCase()) > -1
        }
        renderOption={(option) => (
          <Card as="button">
            <Stack padding={3} space={3}>
              <Text size={2}>{option.value}</Text>
              {option.description && (
                <Text size={1} muted>
                  {option.description}
                </Text>
              )}
            </Stack>
          </Card>
        )}
        value={value}
        icon={SearchIcon}
        id="autocomplete"
        openButton
        options={options}
        placeholder="Search dialogs"
        onSelect={onSelect}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onSelect}
      />
    </FormField>
  );
});

export default withDocument(DialogSelect);
