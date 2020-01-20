import { css } from "styled-components";
import { normalize, rgb } from "polished";
import { keys, map, compose } from "ramda";
import { MARGINS, DIRECTS } from "./constants/margins";

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
      `
        ),
        keys
      )(DIRECTS),
    MARGINS
  )};

  ${map(
    (w: number) => css`
      .min-width--${w} {
        min-width: ${w}px !important;
      }

      .w${w} {
        width: ${w === 100 ? "100%" : w + "px"} !important;
      }

      .h${w} {
        height: ${w === 100 ? "100%" : w + "px"} !important;
      }

      .top-${w} {
        top: ${w}px;
      }

      .left-${w} {
        left: ${w}px;
      }
    `,
    MARGINS
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
      keys(p.theme)
    )};

  .text-danger {
    color: #f5222d;
  }

  .text-largest {
    font-size: 18px !important;
  }

  .text-larger {
    font-size: 16px !important;
  }

  .text--default {
    font-size: 14px !important;
  }

  .text--smaller {
    font-size: 13px;
  }

  .text-sm {
    font-size: 12px !important;
  }

  .text-xs {
    font-size: 10px;
  }

  .text-400 {
    font-weight: 400 !important;
  }

  .text-500 {
    font-weight: 500 !important;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .text-underline {
    text-decoration: underline;
  }

  .text-white {
    color: #fff;
  }

  .bg-light {
    background: #fffcf1;
  }

  .bg-white {
    background: #fff;
  }

  .flex-1 {
    flex: 1;
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .p--relative {
    position: relative;
  }

  .opacity--half {
    opacity: 0.5;
  }

  &.is--scrollbar-none {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .cursor--pointer {
    cursor: pointer;
  }
`;

const layout = css`
  .l-flex {
    display: flex;

    &--center {
      display: flex;
      align-items: center;
    }

    &.is--stretch {
      align-items: stretch;
    }

    &.is--center {
      justify-content: center;
    }

    &.is--space-between {
      justify-content: space-between;
    }

    &.is--right {
      justify-content: flex-end;
    }

    &.is--middle {
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
`;

export default css`
  ${normalize};
  ${utils};
  ${layout};
`;
