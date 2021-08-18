class wholeCountry{
    constructor(){
        this.decideCnt = 0; // 확진자 수
        this.clearCnt = 0;  // 격리해제 수
        this.careCnt = 0;   // 치료중 환자 수
        this.deathCnt = 0;  // 사망자 수
        this.accExamCnt = 0;    // 누적 검사 수
        this.accExamCompCnt = 0;    // 누적 검사 완료 수
        this.resultlNegCnt = 0;  // 결과 음성 수
    }

    onLoadWholeCountry(){
        let xhr = new XMLHttpRequest();
        let xmlObj; //xml response 저장
        let stringDecideCnt, stringClearCnt, stringCareCnt, stringDeathCnt, stringAccExamCnt,
            stringAccExamCompCnt, stringResultlNegCnt;  // 콤마를 적용시킨 변수
        const url = '../xml/wholeCountry.xml';
        // const url = 'https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=M41JaRzOkoBYMF6MLAl5zCLF%2BOqERx0Y0RKGnYWrmQx31QlfZfg9%2FsmL3Yxn47NQdmhhkO%2F7sF5I9RBlcUaPeg%3D%3D&pageNo=1&numOfRows=100&startCreateDt=20210625&endCreateDt=20210625';
        // 검사 결과 차트
        var testChart = new Chart(document.getElementById("test-bar-chart"), {
            type: 'bar',
            data: {
            labels: ["누적 검사 수", "검사완료"],
            datasets: [
                {
                    label: "검사 수 (명)",
                    backgroundColor: ["#F2A51A","#EA6227"],
                    data: [0, 0]
                }
            ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false },
                barPercentage: 0.4
            }
        });
        // 양성/음성 차트
        var posnegChart = new Chart(document.getElementById("posneg-doughnut-chart"), {
            type: 'doughnut',
            data: {
              labels: ["양성", "음성"],
              datasets: [
                {
                  label: "확진자 수 (명)",
                  backgroundColor: ["#9DDFD3","#FFCBCB"],
                  data: [0, 0]
                }
              ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                xmlObj = xhr.responseXML;
                this.decideCnt = xmlObj.getElementsByTagName("decideCnt")[0].childNodes[0].nodeValue;
                this.clearCnt = xmlObj.getElementsByTagName("clearCnt")[0].childNodes[0].nodeValue;
                this.careCnt = xmlObj.getElementsByTagName("careCnt")[0].childNodes[0].nodeValue;
                this.deathCnt = xmlObj.getElementsByTagName("deathCnt")[0].childNodes[0].nodeValue;
                this.accExamCnt = xmlObj.getElementsByTagName("accExamCnt")[0].childNodes[0].nodeValue;
                this.accExamCompCnt = xmlObj.getElementsByTagName("accExamCompCnt")[0].childNodes[0].nodeValue;
                this.resultlNegCnt = xmlObj.getElementsByTagName("resutlNegCnt")[0].childNodes[0].nodeValue;
            }

            //값이 있을 때 addComma 호출. undefined error 방지.
            if(this.decideCnt)
                stringDecideCnt = this.decideCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.clearCnt)
                stringClearCnt = this.clearCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.careCnt)
                stringCareCnt = this.careCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.deathCnt)
                stringDeathCnt = this.deathCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.accExamCnt)
                stringAccExamCnt = this.accExamCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.accExamCompCnt)
                stringAccExamCompCnt = this.accExamCompCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.resultlNegCnt)
                stringResultlNegCnt = this.resultlNegCnt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            
            document.getElementById('confirmed-value').innerHTML = stringDecideCnt;
            document.getElementById('release-value').innerHTML = stringClearCnt;
            document.getElementById('cure-value').innerHTML = stringCareCnt;
            document.getElementById('death-value').innerHTML = stringDeathCnt;
            document.getElementById('test-value').innerHTML = stringAccExamCnt;
            document.getElementById('test-done-value').innerHTML = stringAccExamCompCnt;
            document.getElementById('positive-value').innerHTML = stringDecideCnt;
            document.getElementById('negative-value').innerHTML = stringResultlNegCnt;

            // 차트 데이터 업데이트
            var testDataset = testChart.data.datasets;
            for(var i = 0; i < testDataset.length; i++){
                var data = testDataset[i].data;
                data[0] = this.accExamCnt;
                data[1] = this.accExamCompCnt;
                
            }
            testChart.update();
            
            var posnegDataset = posnegChart.data.datasets;
            for(var i = 0; i < posnegDataset.length; i++){
                var data = posnegDataset[i].data;
                data[0] = this.decideCnt;
                data[1] = this.resultlNegCnt;
            }
            posnegChart.update();
        };
        
        xhr.open('GET', url, true);
        xhr.send();
    }
}
export default wholeCountry;