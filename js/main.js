import wholeCountry from './wholeCountry.js';
import region from './region.js';
import genderNage from './genderNage.js';
import vaccin from './vaccin.js';

let whole = new wholeCountry();
let reg = new region();
let gen = new genderNage();
let vac = new vaccin();

whole.onLoadWholeCountry();
reg.setRegionDecideCnt();
reg.onLoadRegion('서울');   // default값은 서울
gen.onLoadGenderNage();
vac.onLoadVaccin();

document.getElementById("btn-search").onclick = function() {
    let select = document.getElementById("region-select");
    let selectOption = select.options[select.selectedIndex].text;
    reg.onLoadRegion(selectOption);
}