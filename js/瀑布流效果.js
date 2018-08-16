window.onload=function () {
    test("container","box");

    var imgDate ={
        "date":[
            {"src":"01.jpg"}, {"src":"02.jpg"}, {"src":"03.jpg"}, {"src":"04.jpg"}, {"src":"05.jpg"},
            {"src":"06.jpg"}, {"src":"07.jpg"}, {"src":"08.jpg"}, {"src":"09.jpg"}, {"src":"10.jpg"}
        ]
    }
    window.onscroll=function () {
        if(checkFlag()){
            var cpa = document.getElementById("container");
            for (var i = 0;i<imgDate.date.length;i++){

                var cc = document.createElement("ul");
                cc.className = "box";
                cpa.appendChild(cc);

                var box_img = document.createElement("li");
                box_img.className = "box_img";
                cc.appendChild(box_img);

                var a_img = document.createElement("a");
                a_img.href = "images/"+imgDate.date[i].src;
                box_img.appendChild(a_img);

                var img = document.createElement("img");
                img.src = "images/"+imgDate.date[i].src;
                a_img.appendChild(img);
            }
        }
        test("container","box");
    }
}

function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getchild(cparent,"box");
    var lastimgheight = ccontent[ccontent.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastimgheight+":"+scrollTop+":"+pageHeight);
    if(lastimgheight<scrollTop+pageHeight){
        return true;
    }
}
function test(parent,content) {
    var cp = document.getElementById(parent);
    var cc = getchild(cp,content);
    var imgWidth = cc[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/imgWidth);
    cp.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto";

    var BoxHeightArr = [];
    for (var i = 0; i<cc.length;i++){
        if (i<cols){
            BoxHeightArr[i]=cc[i].offsetHeight;
            //console.log(BoxHeightArr[i]);
        }else {
            var minHeight = Math.min.apply(null,BoxHeightArr);
            //console.log(minHeight);
            var minIndex = getminheightLocation(BoxHeightArr,minHeight);

            cc[i].style.position = "absolute";
            cc[i].style.top = minHeight+"px";
            cc[i].style.left= cc[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+cc[i].offsetHeight;
        }
    }
    //console.log(cc.length);
}

function getminheightLocation(BoxHeightArr,minHeight) {
    for(var i in BoxHeightArr){
        if (BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}
function getchild(parent,content) {
    var contentArr = [];
    var all = parent.getElementsByTagName("*");
    for (var i = 0;i<all.length;i++){
        if (all[i].className==content){
            contentArr.push(all[i]);
        }
    }
    return contentArr;
}