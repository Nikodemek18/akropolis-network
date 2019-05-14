import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';
import { theme as extraTheme } from 'shared/styles/theme';

const bottomBorder = `0px 1px 0px rgba(0, 0, 0, 0.1)`;
const activeBorder = `-3px 0px 0px -1px ${extraTheme.colors.royalPurple}`;
const hoverBorder = `0 0 0 1px ${extraTheme.colors.coldPurple}`;

const borderRadius = '0.25rem';

const styles = ({ extra: theme }: Theme) => ({
  row: rule({
    boxShadow: bottomBorder,
    borderRadius,
    background: theme.colors.white,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    cursor: 'pointer',

    '&$active': {
      boxShadow: `${bottomBorder}, ${activeBorder}`,
    },

    '&:hover': {
      boxShadow: `${hoverBorder}, ${bottomBorder}`,
    },

    '&$active&:hover': {
      boxShadow: `${hoverBorder}, ${bottomBorder}, ${activeBorder}`,
    },
  }),

  active: {},

  cell: rule({
    padding: theme.spacing.unit * 2,

    '&:first-child': {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    },

    '&:last-child': {
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },

  }),

  complexCellTitle: rule({
    color: theme.colors.topaz,
    marginBottom: theme.spacing.unit * 0.5,
  }),

  description: rule({
    display: '-webkit-box',
    lineHeight: '1.25rem',
    maxHeight: '2.5rem',
    maxWidth: '17.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 2,
    boxOrient: 'vertical',
    color: theme.colors.topaz,
  }),

  newEvent: rule({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0.25rem 0.5rem 0.25rem 0.75rem',
    borderRadius: '2.125rem',
    background: theme.colors.whiteLilac,
    color: theme.colors.royalPurple,

  }),

  eventTag: rule({
    color: theme.colors.royalPurple,
  }),

  eventIcon: rule({
    width: '1rem',
    color: theme.colors.royalPurple,
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
