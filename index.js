//console.log = function () {}; //disabel display console log
var datas;
var datapilih;
var satuanold='gram';

var pilihmakanan=document.getElementById("pilihmakanan");
var jumlah=document.getElementById("jumlah");
var satuan=document.getElementById("satuan");

var showket=document.getElementById("showket");
var imgfood=document.getElementById("imgfood");
var keterangan=document.getElementById("keterangan");
var reference=document.getElementById("reference");
var linkreference=document.getElementById("linkreference");

var kalori =document.getElementById("kalori");
var karbonhidrat =document.getElementById("karbonhidrat");
var lemak =document.getElementById("lemak");
var protein=document.getElementById("protein");

document.addEventListener("DOMContentLoaded", async function () {
    
    let myObject = await fetch("database.json").then((res) => {
        
        return res.json();
    });
    console.log(myObject);
    datas=myObject;
    

    myObject.forEach(element => {
        var creatoption= document.createElement('option');
        creatoption.innerHTML=element.id;

        pilihmakanan.appendChild(creatoption);
    });

});
function foodklik(e) {
    
    datas.forEach(element => {
        if (element.id==e.value) {
            datapilih=element;

            showket.removeAttribute('style');
            imgfood.src=element.image;
            
            keterangan.innerHTML =`${jumlah.value} gram of ${e.value} contain:`;

            kalori.innerHTML=element.kalori;
            karbonhidrat.innerHTML=element.karbonhidrat;
            lemak.innerHTML=element.lemak;
            protein.innerHTML=element.protein;

            reference.removeAttribute('style');
            linkreference.innerHTML=element.reference;
            linkreference.href=element.reference;

            calculate();
        }
    });
    
}
imgfood.addEventListener('load',function () {
    document.getElementById('loadimg').removeAttribute('class');
})
function calculate() {
    var satuannew='gram';
    var satuannewkalori='Calories';
    var fixjumlah=jumlah.value;
    var fixkalori=(fixjumlah/100)*datapilih.kalori;

    if (satuanold!=satuan.value) {
        if (satuan.value=='gram'&&satuanold=='mL'||satuan.value=='mL'&&satuanold=='gram') {
            satuanold,satuannew='gram';
            if (satuan.value=='mL') {
                satuanold,satuannew='mL';
                
            }
            fixkalori=(fixjumlah/100)*datapilih.kalori;
        }else if(satuan.value=='kilogram'&&satuanold=='mL'||satuan.value=='kilogram'&&satuanold=='gram'){
            satuanold,satuannew='kilogram';
            satuannewkalori='kCal';
            fixjumlah=fixjumlah/1000;
            fixkalori=(Math.round((fixjumlah/100)*datapilih.kalori*100)/100).toFixed(3);
        }else{
            satuanold,satuannew='gram';
            if (satuan.value=='mL') {
                satuanold,satuannew='mL';
            }
            satuannewkalori='Calories';
            fixjumlah=fixjumlah*1000;
            fixkalori=(fixjumlah/100)*datapilih.kalori;
        }
    }
   

    keterangan.innerHTML =`${fixjumlah} ${satuannew} of ${pilihmakanan.value} contain:`;


    kalori.innerHTML=fixkalori;
    karbonhidrat.innerHTML=(fixjumlah/100)*datapilih.karbonhidrat;
    lemak.innerHTML=(fixjumlah/100)*datapilih.lemak;
    protein.innerHTML=(fixjumlah/100)*datapilih.protein;

    var dataelemensatuan=['kalori-unit','karbonhidrat-unit','lemak-unit','protein-unit'];

    dataelemensatuan.forEach(element => {
        if (element=='kalori-unit') {
            document.getElementById(element).innerHTML=satuannewkalori;
        }else{document.getElementById(element).innerHTML=satuannew;}
        
    });

}