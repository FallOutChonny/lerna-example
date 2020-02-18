import { css } from 'styled-components'
import { normalize } from 'polished'
import { keys, map } from 'ramda'

const SPACES = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  20,
  21,
  22,
  24,
  36,
  48,
  60,
]

const base = css`
  ${map(
    s => css`
      .mt-${s} {
        margin-top: ${s}px !important;
      }
      .mr-${s} {
        margin-right: ${s}px !important;
      }
      .mb-${s} {
        margin-bottom: ${s}px !important;
      }
      .ml-${s} {
        margin-left: ${s}px !important;
      }
      .pt-${s} {
        padding-top: ${s}px !important;
      }
      .pr-${s} {
        padding-right: ${s}px !important;
      }
      .pb-${s} {
        padding-bottom: ${s}px !important;
      }
      .pl-${s} {
        padding-left: ${s}px !important;
      }
    `,
    SPACES,
  )};

  ${p =>
    map(
      (x: string | any) => css`
        .text--${x} {
          color: ${p.theme[x]} !important;
        }

        .bg--${x} {
          background: ${p.theme[x]} !important;
        }
      `,
      keys(p.theme),
    )};

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

  .flex--1 {
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
  .d--flex {
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

  .d--inline-block {
    display: inline-block;
  }
`

const components = css``

export default css`
  ${normalize};
  ${base};
  ${layout};
  ${components};
`
