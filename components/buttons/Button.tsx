import cx from 'classnames';
import React from 'react';

import { isInternalLink } from '../../helpers/sitemap/isInternalLink';
import { Icon } from '../icons/Icon';
import { IconName } from '../icons/Icons';
import { Spinner } from '../loaders/Spinner';
import {
  AlignType,
  ColorType,
  SizeType,
  IconPositionType,
  WeightType,
} from './ButtonOptions';
import { Link } from './Link';

export type ButtonProps = {
  align?: AlignType;
  ariaLabel?: string;
  as?: 'button' | 'a' | 'div' | 'span';
  compact?: boolean;
  current?: boolean;
  href?: string;
  icon?: IconName;
  iconPosition?: IconPositionType;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  plain?: boolean;
  round?: boolean;
  size?: SizeType;
  stretch?: boolean;
  target?: string;
  theme?: ColorType;
  disabled?: boolean;
  loading?: boolean;
  weight?: WeightType;
  download?: boolean;
};

const bgClasses: Record<ColorType, string> = {
  white: 'bg-white hover:bg-gray-50 focus:bg-white border-gray-300',
  black: 'bg-black hover:bg-gray-90 focus:bg-black border-black',
};

const bgCurrentClasses: Record<ColorType, string> = {
  white: 'bg-white',
  black: 'bg-black',
};

const textColorClasses: Record<ColorType, string> = {
  white: 'text-gray-700',
  black: 'text-white',
};

const textColorCurrentClasses: Record<ColorType, string> = {
  white: 'text-gray-700',
  black: 'text-gray-100',
};

const plainTextColorClasses: Record<ColorType, string> = {
  white: 'text-black',
  black: 'text-white',
};

const plainTextCurrentColorClasses: Record<ColorType, string> = {
  white: 'text-black',
  black: 'text-white',
};

const sizeClasses: Record<SizeType, string> = {
  xxs: 'text-xs md:text-xs',
  xs: 'text-xs md:text-sm',
  sm: 'text-xs md:text-sm',
  md: 'text-sm md:text-base',
  lg: 'text-sm md:text-xl',
};

const spaceClasses: Record<SizeType, string> = {
  xxs: 'px-2 py-1.5 md:py-1.5 md:px-2.5',
  xs: 'px-2 py-1.5 md:py-1.5 md:px-3',
  sm: 'px-3 py-2 md:py-2 md:px-4',
  md: 'px-3 py-2 md:py-2 md:px-4',
  lg: 'px-4 py-2 md:py-3 md:px-6',
};

const iconSizeClasses: Record<SizeType, string> = {
  xxs: 'w-4 h-4',
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
};

const iconOnlySizeClasses: Record<SizeType, string> = {
  xxs: 'w-8 h-8',
  xs: 'w-8 h-8 md:w-9 md:h-9',
  sm: 'w-10 h-10 md:w-10 md:h-10',
  md: 'w-10 h-10 md:w-11 md:h-11',
  lg: 'w-10 h-10 md:w-12 md:h-12',
};

const alignClasses: Record<AlignType, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const weightClasses: Record<WeightType, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

export const Button = (props: ButtonProps) => {
  if (isInternalLink(props.href)) {
    return (
      <Link href={props.href}>
        <ButtonInner {...props} as="span" />
      </Link>
    );
  }

  return <ButtonInner {...props} />;
};

export const ButtonMemo = React.memo(Button);

const ButtonInner = ({
  as = 'a',
  label = '',
  href,
  onClick,
  target,
  size = 'lg',
  theme = 'white',
  stretch = false,
  round = true,
  icon,
  iconPosition = 'after',
  plain = false,
  compact = false,
  ariaLabel,
  align = 'center',
  current = false,
  disabled = false,
  loading = false,
  weight = 'normal',
  download = false,
}: ButtonProps) => {
  const Element = as;
  const props = {
    type: null,
    href: null,
    target: null,
    download: null,
  };

  label = label || '';
  iconPosition = iconPosition || 'after';

  // prevent orphan icon by adding first / last word to icon
  const labelWords = label?.split(' ');

  if (as === 'button') {
    props.type = 'button';
  }

  if (as === 'a') {
    props.href = href;
    props.target = target;
  }

  if (download) {
    props.download = true;
    if (props.href?.indexOf('.sanity.io') > -1) props.href = `${props.href}?dl`;
  }

  const handleClick = (e: React.MouseEvent) =>
    disabled ? () => {} : onClick ? onClick(e) : () => {};

  const ButtonIcon = icon
    ? ({ wordBefore, wordAfter }: { wordBefore?: string; wordAfter?: string }) => (
        <span className=" whitespace-nowrap break-all">
          {wordBefore && ` ${wordBefore}\u00A0\u00A0`}
          <Icon
            name={icon}
            className={cx(
              'inline text-current transform -translate-y-px',
              iconSizeClasses[size],
            )}
          />
          {wordAfter && `\u00A0\u00A0${wordAfter} `}
        </span>
      )
    : null;

  const sharedClasses = {
    ['border transition-colors duration-200']: true,
    ['rounded-md']: round,
    [bgClasses[theme]]: true,
    [bgCurrentClasses[theme]]: current,
    ['inline-flex items-center justify-center']: !stretch,
    ['bg-opacity-0 border-opacity-0']: plain,
    ['hover:bg-opacity-0 focus:bg-opacity-0']: plain,
    ['hover:underline focus:underline']: plain,
    [current ? plainTextCurrentColorClasses[theme] : plainTextColorClasses[theme]]:
      plain,
    [current ? textColorCurrentClasses[theme] : textColorClasses[theme]]: !plain,
    ['pointer-events-none opacity-75']: disabled,
    [weightClasses[weight]]: true,
  };

  // icon only button
  if (!label?.trim().length) {
    return (
      <Element
        {...props}
        aria-label={ariaLabel || label}
        onClick={handleClick}
        className="btn"
      >
        <span
          className={cx(sharedClasses, { [iconOnlySizeClasses[size]]: !compact })}
        >
          {ButtonIcon && <ButtonIcon />}
          {loading && <ButtonLoader />}
        </span>
      </Element>
    );
  }

  // icon + text button
  return (
    <Element
      {...props}
      aria-label={ariaLabel || label}
      onClick={handleClick}
      className="btn"
    >
      <span
        className={cx(
          sharedClasses,
          sizeClasses[size],
          alignClasses[align],
          { ['w-full flex']: stretch },
          { ['rounded-md']: round },
          { [spaceClasses[size]]: !compact },
        )}
      >
        <span className="no-underline text-left break-words">
          {ButtonIcon ? (
            <>
              {ButtonIcon && iconPosition === 'before' && (
                <ButtonIcon wordAfter={labelWords[0]} />
              )}
              {iconPosition === 'before'
                ? labelWords.slice(1).join(' ')
                : labelWords.slice(0, -1).join(' ')}
              {ButtonIcon && iconPosition === 'after' && (
                <ButtonIcon wordBefore={labelWords[labelWords.length - 1]} />
              )}
              {loading && <ButtonLoader />}
            </>
          ) : (
            <span className="flex">
              {label}
              {loading && <ButtonLoader />}
            </span>
          )}
        </span>
      </span>
    </Element>
  );
};

const ButtonLoader = () => (
  <span className="h-5 w-5 inline-flex self-center align-middle ml-2 -mb-1">
    <Spinner />
  </span>
);
