import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { GetBalanceSheet } from '../../utils/RequestService';

export default class BalanceSheet extends React.Component<any,any>{
  
  constructor(props) {
    super(props);
   
    this.state = { 
      data:[],
    _height:0,
      _fontSize:16
    };
    }

  getAPIData=async()=>{

    const res=await GetBalanceSheet()
    if(res.Table==null)return;
    if(res.Table.length==0)return;
    var _data=[];
    
    // for(var i=0;i<res.Table.length;i++)
    // {
    //   var item=res.Table[i];
    //   var Quantity=item.Quantity==null?0:item.Quantity;
    //   var Description=item.Description==null?0:item.Description;
    //   _data.push({name:Description,value:Quantity})
    // }  
   
     for(var k=0;k<3;k++)
     {
     for(var i=0;i<res.Table.length;i++)
    {
      var item=res.Table[i];
      var Quantity=item.Quantity==null?0:item.Quantity;
      var Description=item.Description==null?0:item.Description+k;
      _data.push({name:Description,value:Quantity})
    }  
  }
    
    this.setState({data:_data})
  }

componentDidMount=async()=> {
 
 

  await this.getAPIData()

   setInterval(
    async() => {
      await this.getAPIData()
    },
    6000);
}

componentWillMount=async()=>{
  var _full=this.props.full==null?true:this.props.full;
  if(_full)
  {
     this.setState({_height:document.body.scrollHeight-120,_fontSize:24})
  }
  else
  {
   this.setState({_fontSize:16,_height:this.props.hh})
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
    const config:any = {

      data: this.state.data,
      xField: 'name',
      yField: 'value',
      label: {
        //position: 'top',
        position:'middle',
        style: {
          fill: 'black',
          //opacity: 0.6,
          fontSize: this.state._fontSize
        },
      },
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
      //legend:{false},
      //legend: {
        //layout: 'horizontal',
        //position: 'right',
        
      //},
      meta: {
        type: { alias: '工序' },
        sales: { alias: '产量' },
      },
    };
  return <>
 {this.props.hh==null&&<div style={{width:'100%',textAlign:'center'}}><h1>生产平衡状况</h1></div>}

 {this.state._height>0&& <Column {...config} style={{height:this.state._height}}/>}
  </>
  
  //;
  }
};

