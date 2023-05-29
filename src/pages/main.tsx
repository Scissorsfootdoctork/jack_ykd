import React, { useState, useEffect } from 'react'
import DayTarget from './compontents/DayTarget'
import StaffWork from './compontents/StaffWork'
import ReworkTarget from './compontents/ReworkTarget'
import DayProduction from './compontents/DayProduction'
import H_BalanceSheet from './compontents/hcharts/H_BalanceSheet'
import H_ProcessWork from './compontents/hcharts/H_ProcessWork'
import { Row, Col, Card, Space } from 'antd'
import 'antd/dist/antd.css'
import '../css/main.css'
import { useHistory } from 'react-router-dom'

function Main() {
  const [divHeight, setdivHeight] = useState(0)

  function fontSize() {
    var deviceWidth = document.documentElement.clientWidth > 760
                      ? 760
                      : document.documentElement.clientWidth
    document.documentElement.style.fontSize = (deviceWidth / 76) + 'em'
    var scropHeight = window.screen.height
    setdivHeight(scropHeight / 3 - 80)
    console.log('scropHeight/3-80', scropHeight / 3 - 80)
  }

  useEffect(() => {
    window.onresize = function() {
      fontSize()
    }
    document.addEventListener('keydown', F11)
    fontSize()
    return () => {
      document.removeEventListener('keydown', F11)
    }

  }, [])

  //监听F11解决高度适配问题
  function F11(e) {
    if (e.keyCode == 122) {
      fontSize()
    }
  }

  return (
      <>
        <Space direction="vertical" style={ { width: '99%' } }>
          <Row gutter={ 24 }>
            <Col span={ 8 }>
              <Card title="员工效率与返工率" bordered={ true }
                    className="inputStyle"
                    style={ { padding: '10px 20px', height: '100%' } }>
                { divHeight > 0 &&
									<StaffWork hh={ divHeight } full={ false }/> }
              </Card>
            </Col>
            <Col span={ 16 }>
              <Card title="当天产量报表" bordered={ true }
                    className="inputStyle" style={ { padding: '10px 20px' } }>
                { divHeight > 0 &&
									<DayProduction hh={ divHeight } full={ false }/> }
              </Card>
            </Col>
          </Row>
          <Row gutter={ 24 }>
            <Col span={ 8 }>
              <Card title="当天目标与产量" bordered={ true }
                    className="inputStyle" style={ { padding: '10px 20px' } }>
                { divHeight > 0 &&
									<DayTarget hh={ divHeight } full={ false }/> }
              </Card>
            </Col>
            <Col span={ 16 }>
              <Card title="生产平衡状况" bordered={ true }
                    className="inputStyle" style={ { padding: '10px 20px' } }>
                { divHeight > 0 &&
									<H_BalanceSheet hh={ divHeight } full={ false }/> }
              </Card>
            </Col>
          </Row>
          <Row gutter={ 24 }>
            <Col span={ 8 }>
              <Card title="当天返工目标与返工率" bordered={ true }
                    style={ { padding: '10px 20px' } } className="inputStyle">
                { divHeight > 0 &&
									<ReworkTarget hh={ divHeight } full={ false }/> }
              </Card>
            </Col>
            <Col span={ 16 }>
              <Card style={ {
                paddingTop: '10px !important',
                padding: '10px 20px'
              } } title="工序返工率状况" bordered={ true }
                    className="inputStyle">
                { divHeight > 0 &&
									<H_ProcessWork hh={ divHeight } full={ false }/> }
              </Card>
            </Col>
          </Row>
        </Space>
      </>
  )
}

export default Main
