class region {
    constructor() {
        this.gubun = ""; // 시도명
        this.defCnt = 0; // 확진자 수
        this.isolClearCnt = 0; // 격리 해제 수(퇴원)
        this.isolIngCnt = 0;   // 격리중(치료중)
        this.deathCnt = 0;   // 사망자 수
        this.incDec = 0;   // 전일 대비 증감 수
        this.qurRate = 0; // 10만명 당 발생률
        this.overFlowCnt = 0; // 해외유입 수
        this.localOccCnt = 0; // 지역발생 수
    }

    setRegionDecideCnt(){
        let xhr = new XMLHttpRequest();
        let xmlObj;
        const url = "../xml/region.xml";

        let seoulDef, incheonDef, daejeonDef, daeguDef, busanDef, ulsanDef, gwangjuDef, kyunggiDef,
            kangwonDef, chungbukDef, chungnamDef, kyungbukDef, kyungnamDef, jeonbukDef, jeonnamDef, jejuDef;
        // 지역별 확진자 차트
        var regionChart = new Chart(document.getElementById("confirmed-bar-chart"), {
            type: 'bar',
            data: {
              labels: ["서울", "인천", "대전", "대구", "부산", "울산", "광주", "경기", "강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주"],
              datasets: [
                {
                  label: "확진자 수 (명)",
                  backgroundColor: "#FFB961",
                  data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                }
              ]
            },
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
              }
            }
        });

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                xmlObj = xhr.responseXML;
                let gubunTag = xmlObj.getElementsByTagName("gubun");    // 태그 이름이 gubun인 결과값 모음
                for(let i = 0; i < gubunTag.length; i++){
                    if(gubunTag[i].childNodes[0].nodeValue == '서울')
                        seoulDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '인천')
                        incheonDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '대전')
                        daejeonDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '대구')
                        daeguDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '부산')
                        busanDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '울산')
                        ulsanDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '광주')
                        gwangjuDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '경기')
                        kyunggiDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '강원')
                        kangwonDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '충북')
                        chungbukDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '충남')
                        chungnamDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '경북')
                        kyungbukDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '경남')
                        kyungnamDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '전북')
                        jeonbukDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '전남')
                        jeonnamDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == '제주')
                        jejuDef = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                }
                
            }
            // 차트 데이터 업데이트
            var regionDataset = regionChart.data.datasets;
            for(var i = 0; i < regionDataset.length; i++){
                var data = regionDataset[i].data;
                data[0] = seoulDef; data[1] = incheonDef; data[2] = daejeonDef; data[3] = daeguDef; 
                data[4] = busanDef; data[5] = ulsanDef; data[6] = gwangjuDef; data[7] = kyunggiDef;
                data[8] = kangwonDef; data[9] = chungbukDef; data[10] = chungnamDef; data[11] = kyungbukDef;
                data[12] = kyungnamDef; data[13] = jeonbukDef; data[14] = jeonnamDef; data[15] = jejuDef;
            }
            regionChart.update();

            // 지역별 확진자 순위
            let ranking = [
                {name: "서울", def: seoulDef},
                {name: "인천", def: incheonDef},
                {name: "대전", def: daejeonDef},
                {name: "대구", def: daeguDef},
                {name: "부산", def: busanDef},
                {name: "울산", def: ulsanDef},
                {name: "광주", def: gwangjuDef},
                {name: "경기", def: kyunggiDef},
                {name: "강원", def: kangwonDef},
                {name: "충북", def: chungbukDef},
                {name: "충남", def: chungnamDef},
                {name: "경북", def: kyungbukDef},
                {name: "경남", def: kyungnamDef},
                {name: "전북", def: jeonbukDef},
                {name: "전남", def: jeonnamDef},
                {name: "제주", def: jejuDef}
            ]

            ranking.sort(function(a,b){
                return b.def - a.def;
            });

            document.getElementById('lanking-one').innerHTML = ranking[0].name;
            document.getElementById('lanking-two').innerHTML = ranking[1].name;
            document.getElementById('lanking-three').innerHTML = ranking[2].name;
            document.getElementById('lanking-four').innerHTML = ranking[3].name;
            document.getElementById('lanking-five').innerHTML = ranking[4].name;
            document.getElementById('lanking-six').innerHTML = ranking[5].name;
        };

        xhr.open('GET', url, true);
        xhr.send();
    }

    onLoadRegion(reg){
        let xhr = new XMLHttpRequest();
        let xmlObj;
        const url = "../xml/region.xml";

        xhr.onreadystatechange = function() {
            let stringDefCnf, stringIsolClearCnt, stringIsolIngCnt, stringDeathCnt, stringQurRate,
                stringOverFlowCnt, stringLocalOccCnt;

            if(this.readyState == 4 && this.status == 200) {
                xmlObj = xhr.responseXML;
                let gubunTag = xmlObj.getElementsByTagName("gubun");
                for(var i = 0; i < gubunTag.length; i++){
                    if(xmlObj.getElementsByTagName("gubun")[i].childNodes[0].nodeValue == reg){
                        this.gubun = xmlObj.getElementsByTagName("gubun")[i].childNodes[0].nodeValue;
                        this.defCnt = xmlObj.getElementsByTagName("defCnt")[i].childNodes[0].nodeValue;
                        this.isolClearCnt = xmlObj.getElementsByTagName("isolClearCnt")[i].childNodes[0].nodeValue;
                        this.isolIngCnt = xmlObj.getElementsByTagName("isolIngCnt")[i].childNodes[0].nodeValue;
                        this.deathCnt = xmlObj.getElementsByTagName("deathCnt")[i].childNodes[0].nodeValue;
                        this.incDec = xmlObj.getElementsByTagName("incDec")[i].childNodes[0].nodeValue;
                        this.qurRate = xmlObj.getElementsByTagName("qurRate")[i].childNodes[0].nodeValue;
                        this.overFlowCnt = xmlObj.getElementsByTagName("overFlowCnt")[i].childNodes[0].nodeValue;
                        this.localOccCnt = xmlObj.getElementsByTagName("localOccCnt")[i].childNodes[0].nodeValue;
                    }
                }
            }
            //값이 있을 때 addComma 호출. undefined error 방지.
            if(this.defCnt)
                stringDefCnf = this.defCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.isolClearCnt)
                stringIsolClearCnt = this.isolClearCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.isolIngCnt)
                stringIsolIngCnt = this.isolIngCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.deathCnt)
                stringDeathCnt = this.deathCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.qurRate)
                stringQurRate = this.qurRate.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.overFlowCnt)
                stringOverFlowCnt = this.overFlowCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.localOccCnt)
                stringLocalOccCnt = this.localOccCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            
            document.getElementById('region-confirmed-value').innerHTML = stringDefCnf;
            document.getElementById('region-release-value').innerHTML = stringIsolClearCnt;
            document.getElementById('region-cure-value').innerHTML = stringIsolIngCnt;
            document.getElementById('region-death-value').innerHTML = stringDeathCnt;
            document.getElementById('ratio-value').innerHTML = stringQurRate;
            document.getElementById('foreign-value').innerHTML = stringOverFlowCnt;
            document.getElementById('domestic-value').innerHTML = stringLocalOccCnt;

            // 차트 데이터 업데이트
            var flucDataset = flucChart.data.datasets;
            for(var i = 0; i < flucDataset.length; i++){
                var data = flucDataset[i].data;
                data[0] = this.defCnt - this.incDec;
                data[1] = this.defCnt;
            }
            flucChart.update();
        };

        xhr.open('GET', url, true);
        xhr.send();
    }
}

var flucChart = new Chart(document.getElementById("fluctuation-line-chart"), {
    type: 'line',
    data: {
      labels: ["전일","오늘"],
      datasets: [{ 
          label: "확진자 수 (명)",
          data: [0,0],
          borderColor: "#5EAAA8",
          fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

export default region;