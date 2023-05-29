import React from 'react'
import { render } from 'react-dom'
// import {SmileTwoTone} from  '@ant-design/icons';
import {GetBalanceSheet,GetDayTarget} from '../../../utils/RequestService'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highcharts3d from 'highcharts/highcharts-3d';
import cylinder from "highcharts/modules/cylinder";
import '../../../css/font-awesome-4.7.0/css/font-awesome.min.css'
highcharts3d(Highcharts);
cylinder(Highcharts);
export default class H_BalanceSheet extends React.Component<any,any>{
  
  constructor(props) {
    super(props);
   
    this.state = { data_Description:[],data_Quantity:[],data_goal_quantity:[], goaltotal:99999, _height:0,
    _fontSize:16};
    }


    
    getAPIData=async()=>{
      const res0=await GetDayTarget()
      if(res0.Table==null)return;
      if(res0.Table.length>0)
      {
      console.log('res0res0',res0)
      var _goaltotal=res0.Table[0].goaltotal;//目标
      this.setState({goaltotal:_goaltotal})
      //this.setState({goaltotal:20})
      }
     

      const res=await GetBalanceSheet()
      if(res.Table==null)return;
      if(res.Table.length==0)return;
      var _data_Description=[];
      var _data_Quantity=[];
      var _data_goal_quantity=[];
      
      console.log('res.Table',res.Table)
      // for(var k=0;k<4;k++){
      
      for(var i=0;i<res.Table.length;i++)
      {
        var item=res.Table[i];
        var Quantity=item.Quantity==null?0:item.Quantity;
        var goal_quantity=item.goal_quantity==null?0:item.goal_quantity;
        var Description=item.Description==null?0:item.Description;
        _data_Description.push(Description)
        _data_Quantity.push(Quantity)
        _data_goal_quantity.push(goal_quantity)       
      }  
    // }

//     for(var i=0;i<10;i++)
//     {
//  _data_Description.push('的说法描述'+i)
//         _data_Quantity.push(i+1)
//         _data_goal_quantity.push(i+1)
//     }


      this.setState(
        {
          data_Description:_data_Description,
          data_Quantity:_data_Quantity,
          data_goal_quantity:_data_goal_quantity
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

    const options:any = {
      credits: {
        enabled: false
      },
      chart: {
        //animation: false,
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
        shared: false,
        // style: {
        //   //fontWeight:600,
        //   fontSize:40,
        //   color: "#000",
        // },
      },
       title: {
         
         text: null
       },
      plotOptions: {
        series:{
          animation: false,
        },
        cylinder: {
          colorByPoint: true,
          depth: 40,
          //pointWidth: 40,
          // labels:{
          //   useHTML:true,
          //   formatter:function(){
          //     return "<i className='fa fa-camera-retro fa-5x'></i>"
          //   }
          // },
          dataLabels: {
            enabled: true,
            useHTML: true, 
            y: -20,
            formatter : function(){ 
              var index=that.state.data_Description.indexOf(this.x);
              var _reLable=that.state.data_goal_quantity[index];
              if(_reLable>=that.state.goaltotal)
              {
                return `<i class="fa fa-smile-o fa-3x" style="color:rgb(4, 172, 247)"></i><br/><span style='padding-left:3px;text-align:"center";font-size:${that.state._fontSize}px'>${_reLable}</span>`
              }
              else
              {
                return `<i class="fa fa-meh-o fa-3x" style="color:red"></i><br/><span style='padding-left:3px;text-align:"center";font-size:${that.state._fontSize}px'>${_reLable}</span>`
             //return `<span style='font-size:${that.state._fontSize}px'>${_reLable}</span>`
              }
            }, 
            //useHtml:true,
            //format:'<svg><i class="fa fa-camera-retro fa-5x"></i></svg> 7 %'
           // enabled: true,
            //y: -10,
            
            // formatter: function() {
            //   var k=this;
              
            //   var index=that.state.data_Description.indexOf(this.x);
            //   var _reLable=that.state.data_goal_quantity[index];
            //   if(_reLable>=that.state.goaltotal)
            //   {
            //     _reLable=9999;
            //   }
            //   var pp="<i className='fa fa-camera-retro fa-5x'></i>"
            //   return pp;
            // }
          },
          
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
          //autoRotationLimit: 40,
          //autoRotation: true,
          // rotation: true,  // 设置轴标签旋转角度
          // style: {
          //   //fontWeight:600,
          //   fontSize: 16,
          //   color: "#000"
          // }
         
          rotation:this.state.data_Description.length>10? -35:0, 
          style: {
            //fontWeight:600,
            //fontSize: 12,
            fontSize: this.state._fontSize,
            color: "#000",
            autoRotation:true,
            autoRotationLimit:10
            //autoRotationLimit:10,
            //step:100
            //,textOverflow: 'none',
           // whiteSpace: 'auto'
          },
          
        },
       
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
              //fontWeight:600,
              fontSize: this.state._fontSize,
              color: "#000"
            }
          }
      },
      series: [
        {
          name: "生产数量",
          data: this.state.data_goal_quantity,
          color: "#000",
          index:'',
         // y:'y',
          dataLabels: {
            enabled: true,
            //fontSize:30,
            color: '#000',
           // format:'{index}',
            // formatter: (e)=>{
            //   console.log('-------------',options.chart.options3d)
            //   return '12'
            // },
            style:{ fontSize:this.state._fontSize}
          
           // y: 10
          }
        }
        ,
        
      ],
      legend: false,
  
    }

    
  
  return <div >
     {this.props.hh==null&&<div style={{width:'100%',textAlign:'center',paddingTop:60,paddingBottom:20,fontSize:'30px',fontWeight:600}}><h1>生产平衡状况</h1></div>}
     {this.state._height>0&&<HighchartsReact 
      
      highcharts={Highcharts}
      options={options}
  />}
</div>;
  }
};

