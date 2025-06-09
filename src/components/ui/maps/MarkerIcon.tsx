import { IconProps } from '@/components/icons/iconProps';
import { categoryTitle, iconWrapper } from '@/components/map/map.recipe';
import { flex } from '@/components/ui/common/cards/card.recipe';

import { css, cx } from '@root/styled-system/css';

type MarkerIconProps = {
  label: string;
  icon: React.ComponentType<IconProps>;
  size?: 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
};

function MarkerIcon({
  label,
  icon: Icon,
  size = 'lg',
  selected,
  onClick,
}: MarkerIconProps) {
  return (
    <div
      key={label}
      className={cx(
        flex({ width: 'auto', align: 'center' }),
        css({ cursor: 'pointer' }),
      )}
      onClick={onClick}
    >
      <div
        className={iconWrapper({
          size,
          radius: 'full',
          border: 'black',
          bg: selected ? 'black' : 'white',
          margin: 'xs',
        })}
      >
        <Icon stroke={selected ? 'white' : 'black'} />
      </div>
      <p
        className={categoryTitle({
          textStyle: size === 'lg' ? 'body3' : 'body4',
        })}
      >
        {label}
      </p>
    </div>
  );
}

export default MarkerIcon;
