import ScrollBoard from '@jiaminghi/data-view-react/es/scrollBoard'
import React, { useState, useEffect } from 'react';
import '../../css/StaffWorkFull.css'
import { GetForStaffWork } from '../../utils/RequestService'


export default class StaffWorkFull extends React.Component<any, any>{

  constructor(props) {
    super(props);

    this.state = {
      data: [], scrollTime: 5000, refreshTime: 3000, _height: 0,
      _fontSize: 16
    };
  }










  getAPIData = async () => {

    const res = await GetForStaffWork()
    if(res.Table==null)return;

    var _data = [];

    for (var i = 0; i < res.Table.length; i++) {

      // var _d: any = res.Table[i];
      // var _item: any = [];

      // var Employee_Name = _d.Employee_Name;
      // var a = _d.a;
      // var d = _d.d;
      // var e=_d.e;
      // _item.push(Employee_Name);
      // _item.push(a);
      // _item.push(d + "%");
      // _item.push(e+"%");

      // _data.push(_item)
      var _d:any=res.Table[i];
      var _item:any=[];
      
      var Employee_Name=_d.Employee_Name;
      var a=_d.goal_quantity;
      var d=_d.d;
      var e=_d.e;
      _item.push(Employee_Name);
      _item.push(a);
      _item.push(d+"%");
      _item.push(e+"%");

      _data.push(_item)

    }

    var t = (res.Table.length + 1) / 5;
    var k = (res.Table.length + 1) % 5;


    var _refreshTime = (parseInt(t.toString()) + k) * this.state.scrollTime



    this.setState({ data: _data, refreshTime: _refreshTime })
  }

  componentDidMount = async () => {
    await this.getAPIData()
    setInterval(
      async () => {
        await this.getAPIData()
      },
      6000);
  }

  componentWillMount = async () => {
    var _full = this.props.full == null ? true : this.props.full;
    if (_full) {
      this.setState({ _height: document.body.scrollHeight - 120, _fontSize: 24 })

    }
    else {
      this.setState({ _fontSize: 16, _height: this.props.hh })
    }
  }


  render() {

    const that = this;
    document.onkeydown = function (e: any) {
      var ev = document.all ? window.event : e;
      if (ev.keyCode == 27) {
        that.props.history.push('/')
      }
    }


    return <div className='fullStaffWork'>
      {this.props.hh == null && <div style={{ width: '100%', textAlign: 'center' }}><h1 style={{ fontSize: 50 }} >员工效率与返工率</h1></div>}

      {this.state._height > 0 &&
        <ScrollBoard config={{
          header: ['姓名', '件数', '效率','返工率'],
          headerHeight: 100,
          rowNum: 10,
          data: this.state.data,
          headerBGC: '#fafafa',
          oddRowBGC: '#fafafa',
          evenRowBGC: '#fff',

          waitTime: this.state.scrollTime,
          index: false,
          hoverPause: false,
          // columnWidth: [250],
          align: ['center'],
          carousel: 'page'
        }} style={{ 'height': this.state._height, color: 'rgba(0, 0, 0, 0.85)', 'font-size': '100px' }} />
      }

    </div>
  }
}