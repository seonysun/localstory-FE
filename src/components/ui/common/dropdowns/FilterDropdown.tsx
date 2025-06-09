import { useRef, useState } from 'react';

import {
  dropdownButton,
  dropdownItem,
  dropdownList,
} from '@/components/ui/common/dropdowns/dropdown.recipe';
import useClickOutside from '@/hooks/useClickOutside';

type Option = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
};

function FilterDropdown({ options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(
    option => option.value === selected,
  )?.label;

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={dropdownButton()}
      >
        {selectedLabel}
        <span>▾</span>
      </button>
      {isOpen && (
        <ul className={dropdownList()}>
          {options.map(option => (
            <li key={option.value} className={dropdownItem()}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterDropdown;
