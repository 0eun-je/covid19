class genderNage {
    constructor() {
        this.gubun = ""; // 카테고리
        this.male = 0;   // 남자 확진자 수
        this.female = 0;  // 여자 확진자 수
        this.underage = 0;    // 0-9
        this.tenth = 0; // 10-19
        this.twenty = 0; // 20-29
        this.thirty = 0;   // 30-39
        this.forty = 0;   // 40-49
        this.fifty = 0; // 50-59
        this.sixty = 0; // 60-69
        this.seventy = 0; // 70-79
        this.eighty = 0;   // 80이상
    }

    onLoadGenderNage() {
        let xhr = new XMLHttpRequest();
        let xmlObj;
        const url = "../genderNage.xml";
        // 남/녀 차트
        var genderChart = new Chart(document.getElementById("gender-doughnut-chart"), {
            type: 'doughnut',
            data: {
              labels: ["남", "녀"],
              datasets: [{
                  label: "확진자 수 (명)",
                  backgroundColor: ["#4E89AE","#ED6663"],
                  data: [0,0]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        // 연령대별 차트
        var ageChart = new Chart(document.getElementById("age-line-chart"), {
            type: 'line',
            data: {
              labels: ["0-9","10-19","20-29","30-39","40-49","50-59","60-69","70-79","80"],
              datasets: [{ 
                  label: "확진자 수 (명)",
                  data: [0,0,0,0,0,0,0,0,0],
                  borderColor: "#D35D6E",
                  fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    
        xhr.onreadystatechange = function() {
            let stringMale, stringFemale;
            if(this.readyState == 4 && this.status == 200) {
                xmlObj = xhr.responseXML;
                let gubunTag = xmlObj.getElementsByTagName("gubun");
                for(var i = 0; i < gubunTag.length; i++){
                    if(gubunTag[i].childNodes[0].nodeValue == "남성")
                        this.male = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "여성")
                        this.female = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "0-9")
                        this.underage = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "10-19")
                        this.tenth = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "20-29")
                        this.twenty = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "30-39")
                        this.thirty = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "40-49")
                        this.forty = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "50-59")
                        this.fifty = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "60-69")
                        this.sixty = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "70-79")
                        this.seventy = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                    if(gubunTag[i].childNodes[0].nodeValue == "80 이상")
                        this.eighty = xmlObj.getElementsByTagName("confCase")[i].childNodes[0].nodeValue;
                }
            }
            //값이 있을 때 addComma 호출. undefined error 방지.
            if(this.male)
                stringMale = this.male.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if(this.female)
                stringFemale = this.female.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            
            document.getElementById('male-value').innerHTML = stringMale;
            document.getElementById('female-value').innerHTML = stringFemale;

            // 차트 데이터 업데이트
            var genderDataset = genderChart.data.datasets;
            for(var i = 0; i < genderDataset.length; i++){
                var data = genderDataset[i].data;
                data[0] = this.male;
                data[1] = this.female;
            }
            genderChart.update();

            var ageDataset = ageChart.data.datasets;
            for(var i = 0; i < ageDataset.length; i++){
                var data = ageDataset[i].data;
                data[0] = this.underage;
                data[1] = this.tenth;
                data[2] = this.twenty;
                data[3] = this.thirty;
                data[4] = this.forty;
                data[5] = this.fifty;
                data[6] = this.sixty;
                data[7] = this.seventy;
                data[8] = this.eighty;
            }
            ageChart.update();
        };

        xhr.open('GET', url, true);
        xhr.send();
    }
}

export default genderNage;