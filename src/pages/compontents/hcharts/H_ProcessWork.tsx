import React from 'react'
import { render } from 'react-dom'
import {GetProcessWork} from '../../../utils/RequestService'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d';
import cylinder from "highcharts/modules/cylinder";
highcharts3d(Highcharts);
cylinder(Highcharts);






export default class H_ProcessWork extends React.Component<any,any>{
  
  constructor(props) {
    super(props);
   
    this.state = { data_Description:[],data_ac:[],data_pc:[], _height:0,
    _fontSize:16};
    }

   
    getAPIData=async()=>{

      const res=await GetProcessWork()
      if(res.Table==null)return;
      if(res.Table.length==0)return;
      var _data_Description=[];
      var _data_ac=[];
      var _data_pc=[];
      
      for(var i=0;i<res.Table.length;i++)
      {
       
        if(res.Table[i].ac!=0&&res.Table[i].ac!=null)
        {
        var item=res.Table[i];
        var ac=item.ac==null?'':item.ac;
        var pc=item.pc==null?'':item.pc;
        var Description=item.Description==null?0:item.Description;
        _data_Description.push(Description)
        _data_ac.push(ac)
        _data_pc.push(pc)
        }
      }  
      this.setState(
        {
          data_Description:_data_Description,
          data_ac:_data_ac,
          data_pc:_data_pc
        }
        )
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
       this.setState({_height:document.body.scrollHeight*0.7,_fontSize:30})
    }
    else
    {
     this.setState({_fontSize:20,_height:this.props.hh})
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

    const options:any = {
      credits: {
        enabled: false
      },
      chart: {
        height:this.state._height,
        type: 'cylinder',
        options3d: {
          enabled: false,
          alpha: 20,
          beta: 0,
          depth: 0,
          viewDistance: 25
        }
      },
      tooltip: {
        shared: false
      },
       title: {
         
         text: null
       },
      plotOptions: {
        cylinder: {
          colorByPoint: true,
          depth: 40,
          //pointWidth: 40,
          dataLabels: {
            enabled: true,
            y: -10,
            formatter: function() {
              return this.y.toFixed(2) + "%";
            }
          }
        },
        // line: {
        //   dataLabels: {
        //     enabled: true,
        //     y: -5,
        //     formatter: function() {
        //       return this.y.toFixed(2) + "%";
        //     }
        //   }
        // }
      },
      xAxis: {
        categories: this.state.data_Description,
        //type: 'category',
        labels: {
          rotation:this.state.data_Description.length>10? -35:0, 
          style:{
            fontSize: this.state._fontSize,
            color: "#000",
            autoRotation:true,
            autoRotationLimit:10
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        gridLineColor: "#999", //横向网格线颜色,
          labels: {
            rotation: 0,
            style: {
              fontSize: this.state._fontSize,
              color: "#000"
            }
          }
      },
      series: [
        {
          name: "返工",
          data: this.state.data_ac,
          color: "#191970",
          dataLabels: {
            enabled: true,
            //fontSize:30,
            color: '#000',
            style:{ fontSize:this.state._fontSize}
          
           // y: 10
          }
        }
        ,
        // {
        //   name: "合格",
        //   data: [100,100,100],
        //   type: "line",
        //   color: "#191970",
        //   dataLabels: {
        //     enabled: true,
        //     color: '#000',
        //     style:{ fontSize:this.state._fontSize}
        //   }
        // }
      ],
      legend: false
    }
    
  
  return <div>
   
  {this.props.hh==null&&<div style={{width:'100%',textAlign:'center',paddingTop:60,paddingBottom:20,fontSize:'30px',fontWeight:600}}><h1>生产平衡状况</h1></div>}
  {this.state._height>0&&<HighchartsReact 
      highcharts={Highcharts}
      options={options}
  />}
</div>;
  }
};

