export const getFontSize = function ({ small, large, xSmall, xLarge, theme }) {
  return small
    ? theme.font.size.s
    : large
    ? theme.font.size.l
    : xSmall
    ? theme.font.size.xs
    : xLarge
    ? theme.font.size.xl
    : theme.font.size.m
}

export const getColor = function ({
  primary,
  primaryLight,
  primaryDark,
  secondary,
  secondaryDark,
  secondaryLight,
  tetrary,
  tetraryLight,
  tetraryDark,
  theme,
}) {
  return primary
    ? theme.color.primary.base
    : primaryLight
    ? theme.color.primary.light
    : primaryDark
    ? theme.color.primary.dark
    : secondary
    ? theme.color.secondary.base
    : secondaryLight
    ? theme.color.secondary.light
    : secondaryDark
    ? theme.color.secondary.dark
    : tetrary
    ? theme.color.tetrary.base
    : tetraryLight
    ? theme.color.tetrary.light
    : tetraryDark
    ? theme.color.tetrary.dark
    : theme.color.tetrary.base
}

export const getBgColor = function ({
  primary,
  primaryLight,
  primaryDark,
  secondary,
  secondaryDark,
  secondaryLight,
  tetrary,
  tetraryLight,
  tetraryDark,
  theme,
}) {
  return primary
    ? theme.color.secondary.base
    : primaryLight
    ? theme.color.secondary.light
    : primaryDark
    ? theme.color.secondary.dark
    : secondary
    ? theme.color.primary.base
    : secondaryLight
    ? theme.color.primary.light
    : secondaryDark
    ? theme.color.primary.dark
    : tetrary
    ? theme.color.secondary.base
    : tetraryLight
    ? theme.color.secondary.light
    : tetraryDark
    ? theme.color.secondary.dark
    : theme.color.secondary.dark
}
