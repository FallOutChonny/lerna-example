import { css } from 'styled-components'
import { normalize } from 'polished'
import { keys, map, compose } from 'ramda'
import { MARGINS } from './constants/margins'

export const DIRECTS = {
  mt: 'margin-top',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mr: 'margin-right',
  pt: 'padding-top',
  pb: 'padding-bottom',
  pl: 'padding-left',
  pr: 'padding-right',
}

const utils = css`
  ${map(
    m =>
      compose(
        map(
          d =>
            css`
        .${d}-${m} {
          ${DIRECTS[d]}: ${m}px !important;
        }
      `,
        ),
        keys,
      )(DIRECTS),
    MARGINS,
  )};

  ${map(
    (w: number) => css`
      .w${w} {
        width: ${w}px !important;
      }

      .h${w} {
        height: ${w}px !important;
      }
    `,
    MARGINS,
  )}

  ${p =>
    map(
      (x: string | any) => css`
        .text-${x} {
          color: ${p.theme[x]} !important;
        }

        .bg-${x} {
          background: ${p.theme[x]} !important;
        }
      `,
      keys(p.theme),
    )};

  .text-danger {
    color: #f5222d;
  }

  .text--largest {
    font-size: 18px !important;
  }

  .text--larger {
    font-size: 16px !important;
  }

  .text--default {
    font-size: 14px !important;
  }

  .text--sm {
    font-size: 12px !important;
  }

  .text--xs {
    font-size: 10px;
  }

  .text--400 {
    font-weight: 400 !important;
  }

  .text--500 {
    font-weight: 500 !important;
  }

  .text--center {
    text-align: center;
  }

  .text--left {
    text-align: left;
  }

  .text--right {
    text-align: right;
  }

  .text--underline {
    text-decoration: underline;
  }

  .text--white {
    color: #fff;
  }

  .flex-1 {
    flex: 1;
  }

  .pull--left {
    float: left;
  }

  .pull--right {
    float: right;
  }

  .p--relative {
    position: relative;
  }

  .opacity--half {
    opacity: 0.5;
  }

  .cursor--pointer {
    cursor: pointer;
  }

  .width--full {
    width: 100%;
  }
`

const layout = css`
  .d-flex {
    display: flex;

    &.is--center {
      display: flex;
      align-items: center;
    }

    &.align-items--stretch {
      align-items: stretch;
    }

    &.h--center {
      justify-content: center;
    }

    &.is--end {
      justify-content: flex-end;
    }

    &.v--center {
      align-items: center;
    }

    &.is--space-between {
      justify-content: space-between;
    }

    &.is--column {
      flex-direction: column;
    }
  }

  .d-inline-block {
    display: inline-block;
  }
`

export default css`
  ${normalize};
  ${utils};
  ${layout};
`
