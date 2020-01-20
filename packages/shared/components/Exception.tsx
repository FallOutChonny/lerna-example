import React from 'react'
import { Link } from 'react-router-dom'
import { backgroundImages } from 'polished'
import styled from 'styled-components'
import { imageUrlPrefix } from '../env'
import Button from './Button'

type Props = {
  type?: number | string | 404
}

export default React.memo(function Exception({ type }: Props) {
  return (
    <ExceptionWrapper>
      <div className="exception">
        <div className="exception__imgBlock">
          <div
            className="exception__imgEle"
            style={{
              ...backgroundImages(`url("${imageUrlPrefix}/${type}.svg")`),
            }}
          />
        </div>
        <div className="exception__content">
          <h1>404</h1>
          <div className="exception__desc">抱歉，你訪問的頁面不存在</div>
          <div className="exception__actions">
            <Link to="/">
              <Button color="primary">回首頁</Button>
            </Link>
          </div>
        </div>
      </div>
    </ExceptionWrapper>
  )
})

const ExceptionWrapper = styled.div`
  height: 100%;
  margin-right: -24px;
  background: #fff;
  border-radius: 4px;

  .exception {
    display: flex;
    align-items: center;
    height: 100%;
    /* min-height: 600px; */
  }

  .exception .exception__imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    zoom: 1;
  }

  .exception .exception__imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .exception .exception__content {
    flex: auto;
  }

  .exception .exception__content h1 {
    margin-bottom: 24px;
    color: #434e59;
    font-weight: 600;
    font-size: 72px;
    line-height: 72px;
  }

  .exception .exception__content .exception__desc {
    margin-bottom: 24px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
  }
`
