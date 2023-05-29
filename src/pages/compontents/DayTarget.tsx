import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/charts';
import {GetDayTarget} from '../../utils/RequestService'

function renderStatistic(containerWidth, text, style) {
  // var _measureTextWidth = ('', measureTextWidth)(text, style),
  //   textWidth = _measureTextWidth.width,
  //   textHeight = _measureTextWidth.height;
  var R = containerWidth / 2;
  var scale = 1;
  if (containerWidth < 50) {
    scale = Math.min(
      Math.sqrt(
        Math.abs(Math.pow(R, 2) / (Math.pow(50 / 2, 2) + Math.pow(50, 2))),
      ),
      1,
    );
  }
  var textStyleStr = 'width:'.concat(containerWidth, 'px;');
  return '<h1>90%</h1>';
}

const data:any = [
  {
    type: '上午',
    value: 40,
  },
  {
    type: '下午',
    value: 30,
  },
  {
    type: '未完成',
    value: 20,
  },
  {
    type: '夜晚',
    value: 10,
  }
];

export default class DayTarget extends React.Component<any,any>{
  
  constructor(props) {
    super(props);
   
    this.state = { data:[],goaltotal:0,comp_quantity:'0%',realtotal:0,  _height:0,
    _fontSize:16,_innerRadius:0.64};
    }

  getAPIData=async()=>{

    const res=await GetDayTarget()
    if(res.Table==null)return;
    if(res.Table.length==0)return;
    var realtotal=res.Table[0].realtotal;//实际
    var goaltotal=res.Table[0].goaltotal;//目标
    var a_m_real_quantity=res.Table[0].a_m_real_quantity;//上午
    var p_m_real_quantity=res.Table[0].p_m_real_quantity;//下午
    var n_m_real_quantity=res.Table[0].n_m_real_quantity;//夜晚
    var comp_quantity=res.Table[0].comp_quantity;//完成率

    var _data=[];
    if(a_m_real_quantity>0)_data.push({type: '上午', value: a_m_real_quantity})
    
    if(p_m_real_quantity>0)_data.push({type: '下午', value: p_m_real_quantity})
    if(n_m_real_quantity>0)_data.push({type: '夜晚', value: n_m_real_quantity})
    if((goaltotal-realtotal)>0) _data.push({type: '未完成', value: goaltotal-realtotal})

  
    if(goaltotal>1000)
    {
this.setState({_innerRadius:0.84})
    }
    else
    {
      this.setState({_innerRadius:0.64})
    }
    this.setState({data:_data,goaltotal:goaltotal,comp_quantity:comp_quantity,realtotal:realtotal})
  }

componentDidMount=async()=> {
  await this.getAPIData()

   setInterval(
    async() => {
      await this.getAPIData()
    },
    10000);
}

componentWillMount=async()=>{
  var _full=this.props.full==null?true:this.props.full;
  if(_full)
  {
     this.setState({_height:document.body.scrollHeight*0.7,_fontSize:46})
  }
  else
  {
    
   this.setState({_fontSize:24,_height:this.props.hh})
  }
}

 
  render(){
    const that = this;
    document.onkeydown = function (e: any) {
      var ev = document.all ? window.event : e;
      if (ev.keyCode == 27) {
        that.props.history.push('/')
      }
    }

    function fontSize(){
      var deviceWidth=document.documentElement.clientWidth>760?760:document.documentElement.clientWidth;
      document.documentElement.style.fontSize=(deviceWidth/76)+"em";
      
  }
  fontSize();
  window.onresize=fontSize;

    const config:any = {
      appendPadding: 5,
      data: this.state.data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      fontSize:this.state._fontSize,
      innerRadius: this.state._innerRadius,
      legend:false,
      // legend:{
      //   position: 'left',
      //   spacing:1011
      // },
      meta: {
        value: {
          formatter: function formatter(v) {
            return ''.concat(v, ' \xA5');
          },
        },
      },
      // label: {
      //   type: 'inner',
      //   offset: '-50%',
      //   style: { textAlign: 'center' },
      //   autoRotate: false,
      //   content: '{value}',
      // },
      label: {
        type: 'outer',
        content: '{name} {value}',
       
        style:{
          fontSize:22,//this.state._fontSize,
          
          //fontWeight:600,
          //opacity:1
        }
      },
      statistic: {
        title: false,
        content: {
          style: {
            fontSize:this.state._fontSize,
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

          },
          content: `${this.state.realtotal}/${this.state.goaltotal}\n${this.state.comp_quantity}`,
        },
      },
      interactions: [
        { type: 'element-selected' },
        { type: 'element-active' },
        { type: 'pie-statistic-active' },
      ],
    };
  
  return <>
   {this.props.hh==null&&<div style={{width:'100%',textAlign:'center',paddingTop:60,paddingBottom:20,fontWeight:600,fontSize:'30px'}}><h1>当天目标与产量</h1></div>}
   {this.state._height>0&&<Pie {...config} style={{height:this.state._height}} />}
   </>
  }
};




