import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
/* componet Import  */
import TemperatureChart from '../../Chart/WeatherChart/TemperatureChart'
import RainChart from '../../Chart/WeatherChart/RainChart'
import HumidityChart from '../../Chart/WeatherChart/HumidityChart'
import HumidityChart_ from '../../Chart/APIWeatherChart/HumidityChart'
import RainChart_ from '../../Chart/APIWeatherChart/RainChart'
import TemperatureChart_ from '../../Chart/APIWeatherChart/TemperatureChart'
import WeatherInfo from '../../WeatherInfo/'
import Clock from '../../Clock'
import DustInfo from '../../WeatherInfo/DustInfo'



import style from './EditComponentList.module.css';
import axios from 'axios'
import * as weatherApi from '../../../lib/api/weatherApi'
import moment from 'moment'


let cx;
let cy;
class EditComponentList extends Component {

    componentDidMount(){
      const { putComponentList,
              nowGeolocation } = this.props;
      /*
      putComponentList('온도' , TemperatureChart)
      putComponentList('강수확률' , RainChart);
      putComponentList('습도' , HumidityChart);
      */
      putComponentList('습도NEW', HumidityChart_)
      putComponentList('강수확률NEW', RainChart_)
      putComponentList('온도NEW', TemperatureChart_)
      putComponentList('weatherInfo' ,WeatherInfo)
      putComponentList('Clock' , Clock)
      putComponentList('DustInfo', DustInfo)
      nowGeolocation();

    }
    state = {
        collapse : false,
    
    }
    toggle =()=> {
        this.setState({ collapse: !this.state.collapse });
    }



  //   convert = () =>{
  //     var RE = 6371.00877; // 지구 반경(km)
  //     var GRID = 5.0; // 격자 간격(km)
  //     var SLAT1 = 30.0; // 투영 위도1(degree)

  //     var SLAT2 = 60.0; // 투영 위도2(degree)
  //     var OLON = 126.0; // 기준점 경도(degree)
  //     var OLAT = 38.0; // 기준점 위도(degree)
  //     var XO = 43; // 기준점 X좌표(GRID)
  //     var YO = 136; // 기1준점 Y좌표(GRID)
  
  // // LCC DFS 좌표변환 ( code : 
  // //          "toXY"(위경도->좌표, v1:위도, v2:경도), 
  // //          "toLL"(좌표->위경도,v1:x, v2:y) )
  // //
  //     function dfs_xy_conv(code, v1, v2) {
        
  //         var DEGRAD = Math.PI / 180.0;
  //         var RADDEG = 180.0 / Math.PI;
          
  //         var re = RE / GRID;
  //         var slat1 = SLAT1 * DEGRAD;
  //         var slat2 = SLAT2 * DEGRAD;
  //         var olon = OLON * DEGRAD;
  //         var olat = OLAT * DEGRAD;
          
  //         var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  //         sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  //         var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  //         sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
  //         var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  //         ro = re * sf / Math.pow(ro, sn);
  //         var rs = {};
  //         if (code == "toXY") {
  //             rs['lat'] = v1;
  //             rs['lng'] = v2;
  //             var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
  //             ra = re * sf / Math.pow(ra, sn);
  //             var theta = v2 * DEGRAD - olon;
  //             if (theta > Math.PI) theta -= 2.0 * Math.PI;
  //             if (theta < -Math.PI) theta += 2.0 * Math.PI;
  //             theta *= sn;
  //             rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  //             rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  //         }
  //         else {
  //             rs['x'] = v1;
  //             rs['y'] = v2;
  //             var xn = v1 - XO;
  //             var yn = ro - v2 + YO;
  //             ra = Math.sqrt(xn * xn + yn * yn);
  //             if (sn < 0.0) {
  //               ra = -ra;
  //             }
  //             var alat = Math.pow((re * sf / ra), (1.0 / sn));
  //             alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;
              
  //             if (Math.abs(xn) <= 0.0) {
  //                 theta = 0.0;
  //             }
  //             else {
  //                 if (Math.abs(yn) <= 0.0) {
  //                     theta = Math.PI * 0.5;
  //                     if (xn < 0.0){
  //                       theta = -theta;
  //                     } 
  //                 }
  //                 else theta = Math.atan2(xn, yn);
  //             }
  //             var alon = theta / sn + olon;
  //             rs['lat'] = alat * RADDEG;
  //             rs['lng'] = alon * RADDEG;
  //         }
  //         return rs;
  //     }


  //     var rs = dfs_xy_conv("toXY","37.579871128849334","126.98935225645432");
  //     console.log(rs)
  //     this.nowGeolocation();
  //   }


  /*
	mapToComponent
	1. pureComponents의 키 값(컴포넌트의 이름)만을 추출해 div로 만드는 함수이다.
		 onClick 이벤트에 props로 전달받은 handleSelect 함수를 연결하여
		 div를 클릭하면 layout에 해당 컴포넌트가 추가될 수 있도록 해준다.
	*/
	mapToComponent = () => {
    const { componentList, addSelectedComponent } = this.props;
		return componentList.map((item, i) => {
			let name;
			for(let compName in item){
				name = compName;
			}
			return (
            <div className  = {style.EditableList_Component}
                  onClick    = {addSelectedComponent}
                  key  		= {i}
                  id			= {name}>
                  {name}
						
					</div>);
		});
  };
  
  getLocationAtDB = async(locationA, locationB, locationC) =>{
    try{ 
      const response = await weatherApi.getLocation( 
                                                    locationA, 
                                                    locationB,
                                                    locationC
                                                  );
    if (response.statusText === "OK") { //포스트 작성 성공 
        console.log(response)
        let responseData= response.data.response.body;
        let weatherArray = responseData.items.item;
        console.log(weatherArray)

        let rainfallArr = []
        let rainfallmmArr = [];
        let humidityArr = [];
        let skyArr = [];
        let temperatureArr = [] 
        weatherArray.map((item)=>{
          if(item.category ==='POP'){
            rainfallArr.push(item)
          }
          if(item.category ==='PTY'){
            rainfallmmArr.push(item)
          }
          if(item.category ==='REH'){
            humidityArr.push(item)
          }
          if(item.category ==='SKY'){
            skyArr.push(item)
          }
          if(item.category ==='T3H'){
            temperatureArr.push(item)
          }
        })
        console.log(rainfallArr)
        console.log(rainfallmmArr)
        console.log(humidityArr)
        console.log(skyArr)
        console.log(temperatureArr)
      }
    }catch(e){
        console.log(e)
    }
  }

    
  render() {
    const {componentList, handlePage, handleSavePage, getDustInfo}  = this.props;
    const {mapToComponent} = this; 
    return (
      <div>
      <button onClick ={this.getNowTime}>모멘트 테스트 </button>
        <button onClick={this.toggle}> 토글</button>
        <button onClick={handlePage}> 핸들페이지</button>

        <button onClick ={getDustInfo}> getDustInfo </button>
        <button onClick ={handleSavePage}> handleSavePage </button>
        
        <Collapse isOpen={this.state.collapse}>
            {this.mapToComponent()}
        </Collapse>
      </div>
    )
  }
}
export default inject(({ edit, weather }) => ({
  getDustInfo : weather.getDustInfo,
  handleSavePage : edit.handleSavePage,
  putComponentList : edit.putComponentList,
  addSelectedComponent : edit.addSelectedComponent,
  componentList : edit.componentList,
  handlePage : edit.handlePage,
  getLocationName : weather.getLocationName,
  currentX : weather.currentX,
  currentY : weather.currentY,
  nowGeolocation : weather.nowGeolocation
}))(observer(EditComponentList));