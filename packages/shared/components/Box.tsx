import styled from 'styled-components'
import {
  position,
  color,
  layout,
  space,
  flexbox,
  background,
  typography,
  ColorProps,
  border,
  TypographyProps,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system'

export default styled.div<
  ColorProps &
    TypographyProps &
    LayoutProps &
    SpaceProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>`
  ${color};
  ${layout};
  ${space};
  ${flexbox};
  ${typography};
  ${border};
  ${position};
  ${background};
`
