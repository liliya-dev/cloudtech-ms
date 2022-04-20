import { useRef, useState, useCallback, useEffect, memo } from 'react';

import { Tooltip } from '../components/Tooltip/Tooltip';
import { Icon } from '../components/icons/Icon';
import { iconNames, IconName } from '../components/icons/Icons';
import { useDebounce } from '../hooks/useDebounce';

export const IconFinder = () => {
  const queryFieldRef = useRef(null);
  const [query, setQuery] = useState<string>('');
  const [filteredIconNames, setFilteredIconNames] = useState<string[]>(iconNames);
  const debouncedIconNames = useDebounce(filteredIconNames, 100);

  const onQueryChange = useCallback((e) => {
    const value = e.target.value.toLowerCase().trim();
    setQuery(value);
  }, []);

  const onClear = () => {
    setQuery('');
    queryFieldRef.current.focus();
  };

  useEffect(() => {
    if (query === '') return setFilteredIconNames(iconNames);

    setFilteredIconNames(
      iconNames.filter((icon) => icon.toLowerCase().indexOf(query) > -1),
    );
  }, [query]);

  return (
    <div>
      <div className="pb-4 flex items-center">
        <span className="p-4 absolute">
          <Icon name="MagnifyingGlassIcon" className="h-4 w-4" />
        </span>
        <input
          value={query}
          type="text"
          placeholder="search"
          className="border border-black border-opacity-30 pl-10"
          onChange={onQueryChange}
          ref={queryFieldRef}
        />
        {query && (
          <button
            className="p-3 bg-blue-500 transform -translate-x-full"
            type="button"
            onClick={onClear}
          >
            <Icon name="CloseIcon" className="h-4 w-4 text-white" />
          </button>
        )}
      </div>

      <MemoIconGrid iconNames={debouncedIconNames} />
    </div>
  );
};

const IconGrid = ({ iconNames }) => (
  <div style={{}}>
    {['h-4 w-4', 'h-6 w-6', 'h-8 w-8', 'h-10 w-10'].map((sizeClass) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 24,
          color: 'black',
        }}
        key={sizeClass}
      >
        {iconNames.map((name) => (
          <div key={`${name}-${sizeClass}`}>
            <Tooltip title={name}>
              <div
                onClick={() => navigator.clipboard.writeText(name)}
                className="p-2 border bg-white rounded-sm"
              >
                <Icon
                  name={name as IconName}
                  className={`${sizeClass} text-blue-500`}
                />
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const MemoIconGrid = memo(IconGrid);
