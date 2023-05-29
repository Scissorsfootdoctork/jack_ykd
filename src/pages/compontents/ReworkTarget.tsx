import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';
import {GetReworkTarget} from '../../utils/RequestService'

// const _data =  [
//     {
//         name: '最高返工【100】',
//         value: 100,
//         type: '最高返工',
//      },
//     {
//       name: '最高返工【100】',
//       value: 0,
//       type: '上午',
//     },
//     {
//         name: '最高返工【100】',
//       value: 0,
//       type: '下午',
//     },
//     {
//         name: '最高返工【100】',
//       value: 0,
//       type: '夜晚',
//     },
//     {
//         name: '实际返工【80】',
//       value: 40,
//       type: '上午',
//     },
//     {
//         name: '实际返工【80】',
//       value: 30,
//       type: '下午',
//     },
//     {
//         name: '实际返工【80】',
//       value: 10,
//       type: '夜晚',
//     },
//     {
//         name: '实际返工【80】',
//         value: 0,
//         type: '最高返工',
//      },
//   ];



export default class ReworkTarget extends React.Component<any,any>{

  constructor(props) {
    super(props);
   
    this.state = { data:[],  _height:0,
      _fontSize:16 };
    }

    getAPIData=async()=>{

      const res=await GetReworkTarget()
      if(res.Table==null)return;
      if(res.Table.length==0)return;
      
      var a_m_redo= res.Table[0].a_m_redo.substring(0, res.Table[0].a_m_redo.lastIndexOf('%'));
      var p_m_redo= res.Table[0].p_m_redo.substring(0, res.Table[0].p_m_redo.lastIndexOf('%'));
      var n_m_redo=res.Table[0].n_m_redo.substring(0, res.Table[0].n_m_redo.lastIndexOf('%'));
      var high_redo= res.Table[0].high_redo.substring(0, res.Table[0].high_redo.lastIndexOf('%'));
      var real_redo= res.Table[0].real_redo.substring(0, res.Table[0].real_redo.lastIndexOf('%'));
      
      if(a_m_redo==0)a_m_redo=parseInt(a_m_redo).toFixed(2);
      if(p_m_redo==0)p_m_redo=parseInt(p_m_redo).toFixed(2);
      if(n_m_redo==0)n_m_redo=parseInt(n_m_redo).toFixed(2);
      if(high_redo==0)high_redo=parseInt(high_redo).toFixed(2);
      if(real_redo==0)real_redo=parseInt(real_redo).toFixed(2);
      
      const _data =  [
      {
          name: `最高返工【${high_redo}】`,
          value: high_redo,
          type: `最高返工-${high_redo}%`,
       },
      {
        name: `最高返工【${high_redo}】`,
        value: 0,
        type: `上午-${a_m_redo}%`,
      },
      {
        name: `最高返工【${high_redo}】`,
        value: 0,
        type: `下午-${p_m_redo}%`,
      },
      {
        name: `最高返工【${high_redo}】`,
        value: 0,
        type: `夜晚-${n_m_redo}%`,
      },
      {
          name: `实际返工【${real_redo}】`,
        value: a_m_redo,
        type: `上午-${a_m_redo}%`,
      },
      {
        name: `实际返工【${real_redo}】`,
        value: p_m_redo,
        type: `下午-${p_m_redo}%`,
      },
      {
        name: `实际返工【${real_redo}】`,
        value: n_m_redo,
        type: `夜晚-${n_m_redo}%`,
      },
      {
        name: `实际返工【${real_redo}】`,
          value: 0,
          type: `最高返工-${high_redo}%`,
       },

       {
        name: `上午返工【${a_m_redo}】`,
      value: a_m_redo,
      type: `上午-${a_m_redo}%`,
    },
    {
      name: `上午返工【${a_m_redo}】`,
      value: 0,
      type: `下午-${a_m_redo}%`,
    },
    {
      name: `上午返工【${a_m_redo}】`,
      value: 0,
      type: `夜晚-${a_m_redo}%`,
    },
    {
      name: `上午返工【${a_m_redo}】`,
        value: 0,
        type: `最高返工-${a_m_redo}%`,
     },
   
     {
      name: `下午返工【${p_m_redo}】`,
    value: p_m_redo,
    type: `上午-${p_m_redo}%`,
  },
  {
    name: `下午返工【${p_m_redo}】`,
    value: 0,
    type: `下午-${p_m_redo}%`,
  },
  {
    name: `下午返工【${p_m_redo}】`,
    value: 0,
    type: `夜晚-${p_m_redo}%`,
  },
  {
    name: `下午返工【${p_m_redo}】`,
      value: 0,
      type: `最高返工-${p_m_redo}%`,
   },

   {
    name: `夜晚返工【${n_m_redo}】`,
  value: n_m_redo,
  type: `上午-${n_m_redo}%`,
},
{
  name: `夜晚返工【${n_m_redo}】`,
  value: 0,
  type: `下午-${n_m_redo}%`,
},
{
  name: `夜晚返工【${n_m_redo}】`,
  value: 0,
  type: `夜晚-${n_m_redo}%`,
},
{
  name: `夜晚返工【${n_m_redo}】`,
    value: 0,
    type: `最高返工-${n_m_redo}%`,
 },

     
    ];
    // var aa=0.0899.toFixed(2)
    // console.log('high_redo',high_redo)
    // console.log('a_m_redo',a_m_redo)
    // console.log('p_m_redo',p_m_redo)
    // console.log('n_m_redo',aa)
    // console.log('real_redo',real_redo)
    this.setState({data:_data})
    }
 
  componentDidMount=async()=> {
    await this.getAPIData()

     setInterval(
      async() => {
        await this.getAPIData()
      },
      5000);
  }

  componentWillMount=async()=>{
    var _full=this.props.full==null?true:this.props.full;
    if(_full)
    {
       this.setState({_height:document.body.scrollHeight-120,_fontSize:24})
    }
    else
    {
     this.setState({_fontSize:24,_height:this.props.hh})
    }
  }

  getAITraining=()=>{
    // const  ss=this.state.data;
    // const aaa=ss.filter(p=>p.name=='实际返工【80】'&&p.type=='夜晚')
    
    // const kkk=aaa[0].value;
    // aaa[0].value=kkk+1;
    // console.log(aaa[0])
    // this.setState({data:ss})
  }

  
  render(){
      const that=this;
    document.onkeydown = function (e: any) {
      var ev = document.all ? window.event : e;
      if (ev.keyCode == 27) {
        that.props.history.push('/')
      }
    }

    const config:any = {
        data: this.state.data,
        //appendPadding: 20,
        isStack: true,
        xField: 'value',
        yField: 'name',
        seriesField: 'type',
        //isPercent: true,
       
        height:that.props.hh,
        //colorField: 'year', // 部分图表使用 seriesField
        //colorField: 'type', // 部分图表使用 seriesField
        color: ['#0066cc', '#b3d9ff', '#66b3ff','#1a8cff'],
        label:{
           // position: 'middle',
           style:{
            fontSize:this.state._fontSize
          },
        },
        legend:false,
        xAxis: {
          label: {
            autoHide: false,
            autoRotate: true,
            style: {
              fill: 'black',
             // opacity: 0.6,
              fontSize: this.state._fontSize
            },
           // rotate: true
          },
        },
        yAxis: {
          label: {
            autoHide: false,
            autoRotate: true,
            style: {
              fill: 'black',
             // opacity: 0.6,
              fontSize: this.state._fontSize
            },
           // rotate: true
          },
        },
        // label: {
        //   position: 'middle',
        //   layout: [
        //     { type: 'interval-adjust-position' },
        //     { type: 'interval-hide-overlap' },
        //     { type: 'adjust-color' },
        //   ],
        // },
      };

  return <div style={{padding:'0px 20px'}}>
   {this.props.hh==null&&<div style={{width:'100%',textAlign:'center',fontSize:'30px',fontWeight:600}}><h1>当天返工目标与返工率</h1></div>}
   {this.state._height>0&&<Bar style={{height:this.state._height}} {...config}/>}
  </div>
  }
};
















