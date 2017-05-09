/**
 * Created by Yash on 5/8/2017.
 */
/**
 * Created by Yash on 5/8/2017.
 */

var flag = true;

function test() {
    loadData();
}


function sort(srt) {
    flag = !flag;
    loadData(srt);
}

function predicateBy(prop, flag){
    if (flag) {
        return function(a,b){
            if( a[prop] > b[prop]){
                return 1;
            }else if( a[prop] < b[prop] ){
                return -1;
            }
            return 0;
        }
    } else {
        return function(a,b){
            if( a[prop] < b[prop]){
                return 1;
            }else if( a[prop] > b[prop] ){
                return -1;
            }
            return 0;
        }
    }

}

function loadData(srt) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (srt) {
                data.sort(predicateBy(srt, flag));
            }
            var test = document.getElementById("tab-body");
            if (test){
                test.parentNode.removeChild(test);
            }
            var newElem = document.createElement("DIV");
            newElem.setAttribute("id", "tab-body");
            var parent = document.getElementById("main");
            parent.appendChild(newElem);

            for (var i = 0; i < Object.keys(data).length; i++) {
                var tab_body = document.getElementById("tab-body");

                var main = document.createElement("DIV");
                main.className = "body-row";
                var div1 = document.createElement("DIV");
                div1.className = "cell";
                div1.innerHTML = data[i].name;

                var div2 = document.createElement("DIV");
                div2.className = "cell";
                div2.innerHTML = data[i].plan;

                var div3 = document.createElement("DIV");
                div3.className = "cell";
                div3.innerHTML = data[i].forecast;

                var div4 = document.createElement("DIV");
                div4.className = "cell";
                if (document.querySelector(":checked").value == "more") {
                    div4.innerHTML = data[i].best_case[0] + " " + data[i].best_case[1];
                } else {
                    div4.innerHTML = data[i].best_case[0];
                }


                var div5 = document.createElement("DIV");
                div5.className = "cell";
                if (document.querySelector(":checked").value == "more") {
                    div5.innerHTML = data[i].commit[0] + " " + data[i].commit[1];
                } else {
                    div5.innerHTML = data[i].commit[0];
                }


                main.appendChild(div1);
                main.appendChild(div2);
                main.appendChild(div3);
                main.appendChild(div4);
                main.appendChild(div5);
                tab_body.appendChild(main);
            }
        }
    };
    xhttp.open("GET", "data.json");
    xhttp.send();
}

loadData();