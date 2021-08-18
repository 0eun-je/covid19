class vaccin {
    constructor() {
        this.sido = ""; // 지역 구분
        this.firstCnt = 0;   // 1차 접종
        this.secondCnt = 0; // 2차 접종
        this.totalCnt = 0;   // 1차 접종 + 2차 접종 = 총 접종 수
    }

    onLoadVaccin(){
        let xhr = new XMLHttpRequest();
        let xmlObj;
        const url = "https://github.com/0eun-je/covid19/blob/master/vaccin.xml";
        let seoulDef, incheonDef, daejeonDef, daeguDef, busanDef, ulsanDef, gwangjuDef, kyunggiDef,
            kangwonDef, chungbukDef, chungnamDef, kyungbukDef, kyungnamDef, jeonbukDef, jeonnamDef, jejuDef;
        
        // 예방접종 현황 차트
        var vaccinChart = new Chart(document.getElementById("vaccin-bar-chart"), {
            type: 'bar',
            data: {
              labels: ["서울", "인천", "대전", "대구", "부산", "울산", "광주", "경기", "강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주"],
              datasets: [
                {
                  label: "예방접종 수 (명)",
                  backgroundColor: "#91D18B",
                  data: [73827,25670,14525,25411,40045,9270,22683,105876,14790,15374,24274,28435,43848,25169,25748,4830]
                }
              ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false },
                barPercentage: 0.7
            }
        }); 

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                xmlObj = xhr.responseXML;
                let sidoTag = xmlObj.getElementsByName("sido");    // 이름이 sido인 결과값 모음
                for(let i = 0; i < sidoTag.length; i++){
                    if(sidoTag[i].childNodes[0].nodeValue == '서울특별시'){
                        seoulDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '인천광역시'){
                        incheonDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '대전광역시'){
                        daejeonDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '대구광역시'){
                        daeguDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '부산광역시'){
                        busanDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '울산광역시'){
                        ulsanDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '광주광역시'){
                        gwangjuDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '경기도'){
                        kyunggiDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '강원도'){
                        kangwonDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '충청북도'){
                        chungbukDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '충청남도'){
                        chungnamDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '경상북도'){
                        kyungbukDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '경상남도'){
                        kyungnamDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '전라북도'){
                        jeonbukDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '전라남도'){
                        jeonnamDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                    if(sidoTag[i].childNodes[0].nodeValue == '제주특별자치도'){
                        jejuDef = Number(xmlObj.getElementsByName("totalFirstCnt")[i].childNodes[0].nodeValue) +
                                    Number(xmlObj.getElementsByName("totalSecondCnt")[i].childNodes[0].nodeValue);
                    }
                }
            }
            // 차트 데이터 업데이트
            var vaccinDataset = vaccinChart.data.datasets;
            for(var i = 0; i < vaccinDataset.length; i++){
                var data = vaccinDataset[i].data;
                data[0] = seoulDef; data[1] = incheonDef; data[2] = daejeonDef; data[3] = daeguDef; 
                data[4] = busanDef; data[5] = ulsanDef; data[6] = gwangjuDef; data[7] = kyunggiDef;
                data[8] = kangwonDef; data[9] = chungbukDef; data[10] = chungnamDef; data[11] = kyungbukDef;
                data[12] = kyungnamDef; data[13] = jeonbukDef; data[14] = jeonnamDef; data[15] = jejuDef;
            }
            vaccinChart.update();
        };

        xhr.open('GET', url, true);
        xhr.send();
    }
}

export default vaccin;