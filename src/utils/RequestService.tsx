import axios from 'axios';
const baseApi:string='http://localhost:801'
const baseApiCore:string='http://localhost:8003/api/Redo_Summary_View'
const isCore:boolean=true;



export const YKDRequest=async(_url:string,_data?:any,_method:any='post'):Promise<any>=>{

  var mainUrl=isCore?baseApiCore:baseApi;
   var msg= axios({
        method:_method,
        //withCredentials:true,
        url:mainUrl+_url,
        responseType:'json',
        data:_data
    }).then((res:any)=>{
      if(res.status===200)
      {
        if(isCore)
        {
          return res.data.data;
        }
        else
        {
          return res.data;
        }
      }
    })
   return msg;
}

// export const DoLogin=async(postData:any):Promise<any>=>{
//   var msg=await YKDRequest('/api/Login/Login',postData)
//   return msg;
// }

// export const GetColorInfo=async(postData:any):Promise<any>=>{
//   var msg=await YKDRequest('/api/ColorInfo/GetColorInfo',null,'get')
//   return msg;
// }




export const GetForStaffWork=async():Promise<any>=>{
  var msg=await YKDRequest('/GetQuantityPerEmployee',null,'get')
  return msg;
}

export const GetDayTarget=async():Promise<any>=>{
  var msg=await YKDRequest('/GetCurrentDayQuantity',null,'get')
  return msg;
}

export const GetProcessWork=async():Promise<any>=>{
  var msg=await YKDRequest('/GetProcessRedoState',null,'get')
  return msg;
}

export const GetReworkTarget=async():Promise<any>=>{
  var msg=await YKDRequest('/GetCurrentRedoQuantity',null,'get')
  return msg;
}

export const GetBalanceSheet=async():Promise<any>=>{
  var msg=await YKDRequest('/GetProcessQCState',null,'get')
  return msg;
}

export const GetDayProduction=async():Promise<any>=>{
  var msg=await YKDRequest('/GetCurrentStyle',null,'get')
  return msg;
}