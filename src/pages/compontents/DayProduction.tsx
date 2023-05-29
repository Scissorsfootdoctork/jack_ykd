import React from 'react';
import { Table,Descriptions } from 'antd';
import '../../css/DayProduction.css'
import {GetDayProduction,GetDayTarget} from '../../utils/RequestService'


export default class DayProduction extends React.Component<any,any>{


  constructor(props) {
    super(props);
   
    this.state = { 
      data:[],
      goaltotal:0,
      comp_quantity:'0%',
      realtotal:0,
      Description:'',
      Order_Name:'',
      Style_Id:'',
      a_m_goal_quantity:0,//上午目标
      p_m_goal_quantity:0,//下午目标
      n_m_goal_quantity:0,//夜晚目标

      a_m_first_operation_quantity:0,
      p_m_first_operation_quantity:0,
      n_m_first_operation_quantity:0,
      firsttotal:0,

      a_m_real_quantity:0,
      p_m_real_quantity:0,
      n_m_real_quantity:0,

      real_redo:'',
      a_m_redo:'',
      p_m_redo:'',
      n_m_redo:'',

      currentTime:'',
       _height:0,
    _fontSize:16
    };
    }

  getAPIData=async()=>{

    const res0=await GetDayProduction();
    if(res0.Table==null)return;
    if(res0.Table.length==0)return;
    var Description=res0.Table[0].Description;
    var Order_Name=res0.Table[0].Order_Name;
    var Style_Id=res0.Table[0].Style_Id;
    
    const res=await GetDayTarget()
    if(res.Table==null)return;
    console.log(res)
    if(res.Table.length==0)return;
    var realtotal=res.Table[0].realtotal;//实际
    var goaltotal=res.Table[0].goaltotal;//目标
    var a_m_real_quantity=res.Table[0].a_m_real_quantity;//上午
    var p_m_real_quantity=res.Table[0].p_m_real_quantity;//下午
    var n_m_real_quantity=res.Table[0].n_m_real_quantity;//夜晚
    var comp_quantity=res.Table[0].comp_quantity;//完成率
    var a_m_goal_quantity=res.Table[0].a_m_goal_quantity;//上午
    var p_m_goal_quantity=res.Table[0].p_m_goal_quantity;//下午
    var n_m_goal_quantity=res.Table[0].n_m_goal_quantity;//夜晚

    var a_m_first_operation_quantity=res.Table[0].a_m_first_operation_quantity;//
    var p_m_first_operation_quantity=res.Table[0].p_m_first_operation_quantity;//
    var n_m_first_operation_quantity=res.Table[0].n_m_first_operation_quantity;//
    var firsttotal=res.Table[0].firsttotal;//

    var a_m_redo=res.Table[0].a_m_redo;//
    var n_m_redo=res.Table[0].n_m_redo;//
    var real_redo=res.Table[0].real_redo;//
    var p_m_redo=res.Table[0].p_m_redo;//

    var _data=[];
    _data.push({type: '上午', value: a_m_real_quantity})
    _data.push({type: '下午', value: p_m_real_quantity})
    _data.push({type: '夜晚', value: n_m_real_quantity})
    _data.push({type: '未完成', value: goaltotal-realtotal})
    
    this.setState({
      data:_data,
      goaltotal:goaltotal,
      comp_quantity:comp_quantity,
      realtotal:realtotal,
      Description:Description,
      Order_Name:Order_Name,
      Style_Id:Style_Id,

      a_m_goal_quantity:a_m_goal_quantity,
      p_m_goal_quantity:p_m_goal_quantity,
      n_m_goal_quantity:n_m_goal_quantity,

      a_m_first_operation_quantity:a_m_first_operation_quantity,
      p_m_first_operation_quantity:p_m_first_operation_quantity,
      n_m_first_operation_quantity:n_m_first_operation_quantity,
      firsttotal:firsttotal,

      a_m_real_quantity:a_m_real_quantity,
      p_m_real_quantity:p_m_real_quantity,
      n_m_real_quantity:n_m_real_quantity,

      a_m_redo:a_m_redo,
      n_m_redo:n_m_redo,
      p_m_redo:p_m_redo,
      real_redo:real_redo,

    })
    
  }

componentDidMount=async()=> {
  await this.getAPIData()

   setInterval(
    async() => {
      await this.getAPIData()
    },
    10000);

    setInterval(
      async() => {
        await this.getCurrentTime()
      },
      1000);
}

addZero(m){
  return m<10?'0'+m:m;
}

getCurrentTime=()=>{
  var time=new Date();
  var year=time.getFullYear();
  var month=time.getMonth()+1;
  var date=time.getDate();
  var hour=time.getHours();
  var min=time.getMinutes();
  month=this.addZero(month);
  date=this.addZero(date);
  hour=this.addZero(hour);
  min=this.addZero(min);
  var _time=`${year}-${month}-${date} ${hour}:${min}`;
  console.log(_time)
  this.setState({currentTime:_time}) 
}

componentWillMount=async()=>{
  var _full=this.props.full==null?true:this.props.full;
  if(_full)
  {
     this.setState({_height:document.body.scrollHeight,_fontSize:70})
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

        const columns:any = [
            {
              title: 'Name',
              dataIndex: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Cash Assets',
              className: 'column-money',
              dataIndex: 'money',
              align: 'right',
            },
            {
              title: 'Address',
              dataIndex: 'address',
            },
          ];
          
          const data = [
            {
              key: '1',
              name: 'John Brown',
              money: '￥300,000.00',
              address: 'New York No. 1 Lake Park',
            },
            {
              key: '2',
              name: 'Jim Green',
              money: '￥1,256,000.00',
              address: 'London No. 1 Lake Park',
            },
            {
              key: '3',
              name: 'Joe Black',
              money: '￥120,000.00',
              address: 'Sidney No. 1 Lake Park',
            },
          ];

        return(
           <>
            {this.props.hh==null&&<div style={{width:'100%',textAlign:'center',paddingTop:60,paddingBottom:20,fontSize:'30px',fontWeight:600}}><h1>当天产量报表</h1></div>}

            {this.state._height>0&&<div className='ant-table ant-table-bordered' style={{height:this.props._height,fontSize:this.state._fontSize}}>
<div className="ant-table-title" >
    <div className="ant-descriptions ant-descriptions-bordered">
        <div className="ant-descriptions-view" >
            <table>
                <tbody>
                    <tr className="ant-descriptions-row" >
                        <th className="ant-descriptions-item-label" colSpan={1} ><span style={{fontSize:this.state._fontSize}}>时间</span></th>
                        <td className="ant-descriptions-item-content" colSpan={1}><span style={{fontSize:this.state._fontSize}}>{this.state.currentTime}</span></td>
                        <th className="ant-descriptions-item-label" colSpan={1}><span style={{fontSize:this.state._fontSize}}>合同号</span></th>
                        <td className="ant-descriptions-item-content" colSpan={1}><span style={{fontSize:this.state._fontSize}}>{this.state.Order_Name}</span></td>
                        <th className="ant-descriptions-item-label" colSpan={1}><span style={{fontSize:this.state._fontSize}}>款式</span></th>
                        <td className="ant-descriptions-item-content" colSpan={1}><span style={{fontSize:this.state._fontSize}}>{this.state.Description}</span></td>
                        {/* <th className="ant-descriptions-item-label" colSpan={1}><span style={{fontSize:this.state._fontSize}}>款号</span></th>
                        <td className="ant-descriptions-item-content" colSpan={1}><span style={{fontSize:this.state._fontSize}}>{this.state.Style_Id}</span></td> */}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<div className='ant-table-container'>
            <div className='ant-table-content'>
                <table style={{tableLayout:'auto'}}>
                    <colgroup></colgroup>
                    <thead className='ant-table-thead'>
                        {/* <tr>
                            <th className='ant-table-cell'>Name</th>
                            <th className='ant-table-cell' style={{background:'#fff'}}>Name</th>
                            <th className='ant-table-cell'>Name</th>
                            <th className='ant-table-cell' style={{background:'#fff'}}>Name</th>
                            <th className='ant-table-cell'>Name</th>                           
                        </tr> */}
                        <tr>
                            <th className='ant-table-cell' style={{borderTop:0,textAlign:'center'}}>时间段</th>
                            <th className='ant-table-cell' style={{borderTop:0,textAlign:'center'}}>上午</th>
                            <th className='ant-table-cell' style={{borderTop:0,textAlign:'center'}}>下午</th>
                            <th className='ant-table-cell' style={{borderTop:0,textAlign:'center'}}>夜晚</th>
                            <th className='ant-table-cell' style={{borderTop:0,textAlign:'center'}}>累积量</th>
                        </tr>
                    </thead>
                    <tbody className='ant-table-tbody'>
                        <tr data-row-key="1" className='ant-table-row ant-table-row-level-0'>
                            <td className='ant-table-cell' style={{position:'relative',color:'rgba(0,0,0,0.85)',fontWeight:500,textAlign:'center',background:'#fafafa',borderBottom:'1px solid #f0f0f0',transition:'background 0.3s ease'}}>目标量</td>
                            <td className='ant-table-cell'>{this.state.a_m_goal_quantity}</td>
                            <td className='ant-table-cell'>{this.state.p_m_goal_quantity}</td>
                            <td className='ant-table-cell'>{this.state.n_m_goal_quantity}</td>
                            <td className='ant-table-cell'  style={{}}>{this.state.goaltotal}</td>
                        </tr>
                        <tr data-row-key="2" className='ant-table-row ant-table-row-level-0'>
                            <td className='ant-table-cell' style={{position:'relative',color:'rgba(0,0,0,0.85)',fontWeight:500,textAlign:'center',background:'#fafafa',borderBottom:'1px solid #f0f0f0',transition:'background 0.3s ease'}}>裁片量</td>
                            <td className='ant-table-cell'>{this.state.a_m_first_operation_quantity}</td>
                            <td className='ant-table-cell'>{this.state.p_m_first_operation_quantity}</td>
                            <td className='ant-table-cell'>{this.state.n_m_first_operation_quantity}</td>
                            <td className='ant-table-cell' style={{}}>{this.state.firsttotal}</td>
                        </tr>
                        <tr data-row-key="3" className='ant-table-row ant-table-row-level-0'>
                            <td className='ant-table-cell' style={{position:'relative',color:'rgba(0,0,0,0.85)',fontWeight:500,textAlign:'center',background:'#fafafa',borderBottom:'1px solid #f0f0f0',transition:'background 0.3s ease'}}>成品量</td>
                            <td className='ant-table-cell'>{this.state.a_m_real_quantity}</td>
                            <td className='ant-table-cell'>{this.state.p_m_real_quantity}</td>
                            <td className='ant-table-cell'>{this.state.n_m_real_quantity}</td>
                            <td className='ant-table-cell' style={{}}>{this.state.realtotal}</td>
                        </tr>
                        <tr data-row-key="4" className='ant-table-row ant-table-row-level-0'>
                            <td className='ant-table-cell' style={{position:'relative',color:'rgba(0,0,0,0.85)',fontWeight:500,textAlign:'center',background:'#fafafa',borderBottom:'1px solid #f0f0f0',transition:'background 0.3s ease'}}>返工率</td>
                            <td className='ant-table-cell'>{this.state.a_m_redo}</td>
                            <td className='ant-table-cell'>{this.state.p_m_redo}</td>
                            <td className='ant-table-cell'>{this.state.n_m_redo}</td>
                            <td className='ant-table-cell' style={{}}>{this.state.real_redo}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
</div>
</div>}

          </>
        )
      }
}


