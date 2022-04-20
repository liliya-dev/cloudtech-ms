import { useId } from '@reach/auto-id';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { Stack, Tooltip, Box, Text } from '@sanity/ui';
import React from 'react';

const ColorSwatches = React.forwardRef<HTMLInputElement, any>((props, ref) => {
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
  } = props;

  // Creates a unique ID for our input
  const inputId = useId();

  const onSwatchClick = React.useCallback(
    (color) => {
      onChange(PatchEvent.from(color ? set(color) : unset()));
    },
    [onChange],
  );

  const swatchStyle = {
    width: 60,
    height: 60,
    borderRadius: 2,
    backgroundColor: 'white',
    display: 'inline-block',
    border: 0,
    boxShadow: 'inset 0 10px 10px 0 rgba(0, 0, 0, 0.1)',
    outlineOffset: -1,
    cursor: 'pointer',
  };

  return (
    <Stack space={1}>
      <FormField
        description={type.description} // Creates description from schema
        title={type.title} // Creates label from schema title
        __unstable_markers={markers} // Handles all markers including validation
        __unstable_presence={presence} // Handles presence avatars
        compareValue={compareValue} // Handles "edited" status
        inputId={inputId} // Allows the label to connect to the input field
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Tooltip
            content={
              <Box padding={2}>
                <Text size={1}>Clear</Text>
              </Box>
            }
            placement="top"
            portal
          >
            <button
              type="button"
              aria-label="Clear"
              onClick={() => onSwatchClick(false)}
              style={{
                ...swatchStyle,
                backgroundColor: 'white',
                backgroundImage:
                  'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                outline: value?.length
                  ? '1px solid transparent'
                  : '1px solid rgba(0,0,0,.75)',
              }}
            />
          </Tooltip>

          {type.options?.list?.map((option) => (
            <Tooltip
              content={
                <Box padding={2}>
                  <Text size={1}>{option.value}</Text>
                </Box>
              }
              placement="top"
              portal
            >
              <button
                type="button"
                aria-label={option.value}
                onClick={() => onSwatchClick(option.value)}
                style={{
                  ...swatchStyle,
                  backgroundColor: option.title,
                  outline:
                    value === option.value
                      ? '1px solid rgba(0,0,0,.5)'
                      : '1px solid transparent',
                }}
              />
            </Tooltip>
          ))}
        </div>
      </FormField>
    </Stack>
  );
});

export default ColorSwatches;
