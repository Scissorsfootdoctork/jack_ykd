
import { Carousel } from 'antd';
import DayTarget from './compontents/DayTarget'
 import BalanceSheet from './compontents/BalanceSheet'
import StaffWork from './compontents/StaffWork'
import StaffWorkFull from './compontents/StaffWorkFull'
import ReworkTarget from './compontents/ReworkTarget'
import DayProduction from './compontents/DayProduction'

import H_BalanceSheet from './compontents/hcharts/H_BalanceSheet'
import H_ProcessWork from './compontents/hcharts/H_ProcessWork'


function CarouselPage() {

    const divHeight=document.body.scrollHeight-100;
    const contentStyle:any = {
        height: divHeight,
        color: '#fff',
        //lineHeight: '160px',
        textAlign: 'center',
        //margin:100
        //margin:30
       // background: '#364d79',
      };

    //   function fontSize(){
    //     var deviceWidth=document.documentElement.clientWidth>760?760:document.documentElement.clientWidth;
    //     document.documentElement.style.fontSize=(deviceWidth/76)+"em";
        
    // }
    // fontSize();
    // window.onresize=fontSize;
      

    return (<>
     <Carousel autoplay={true} autoplaySpeed={3000} pauseOnHover={false}>
     <div>
      <h3 style={contentStyle}>
      <StaffWorkFull  />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
            <DayProduction  />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <DayTarget  />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <H_BalanceSheet  />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <ReworkTarget  />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <H_ProcessWork  />
      </h3>
    </div>
   
  </Carousel>
    
    </>)
}

export default CarouselPage;



