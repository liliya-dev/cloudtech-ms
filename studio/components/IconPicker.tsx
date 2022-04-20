import { useId } from '@reach/auto-id';
import { FormField } from '@sanity/base/components';
import PatchEvent, { set } from '@sanity/form-builder/PatchEvent';
import { MagnifyingGlassIcon } from '@sanity/icons';
import { Autocomplete, Card, Text, Flex } from '@sanity/ui';
import React, { useCallback, useEffect, useState } from 'react';

type IconResponseType = {
  name: string;
  icon: string;
};

type OptionType = {
  value: string;
  icon: string;
  label: string;
};

const IconPicker = React.forwardRef((props, ref) => {
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

  const [options, setOptions] = useState<OptionType[]>([]);
  const [state, setState] = useState<'default' | 'loading'>('default');

  useEffect(() => {
    async function fetchIcons() {
      setState('loading');
      const res = await fetch(`${process.env.SANITY_STUDIO_PROJECT_PATH}api/icons`);
      const icons: IconResponseType[] = await res.json();
      const options: OptionType[] = icons.map(({ name, icon }) => ({
        value: name,
        label: name
          .match(/[A-Z][a-z]+/g)
          .join(' ')
          .replace('Icon', ''),
        icon,
      }));
      setOptions(options);
      setState('default');
    }
    fetchIcons();
  }, [setOptions]);

  const onSelect = useCallback(
    (newValue) => {
      setState('loading');
      onChange(PatchEvent.from(set(newValue)));
      setState('default');
    },
    [onChange, value, setState],
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
          option.value.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          option.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        }
        renderOption={(option) => (
          <Card as="button">
            <Flex padding={1} gap={3} align="center">
              <span
                dangerouslySetInnerHTML={{ __html: option.icon }}
                style={{ width: 30, height: 30, color: '#333' }}
              />
              <Text size={2}>{option.label}</Text>
            </Flex>
          </Card>
        )}
        value={value}
        icon={
          value ? (
            <span
              dangerouslySetInnerHTML={{
                __html: options.find((option) => value === option.value)?.icon,
              }}
              style={{ color: '#333', display: 'block', width: 16, height: 16 }}
            />
          ) : (
            MagnifyingGlassIcon
          )
        }
        id="autocomplete"
        openButton
        options={options}
        placeholder="Search dialogs"
        onSelect={onSelect}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onSelect}
        loading={state === 'loading'}
      />
    </FormField>
  );
});

export default IconPicker;
