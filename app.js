/**
 * Created by Yash on 5/8/2017.
 */

var data;
var flag = true;

function test() {
    var test = document.getElementById("tab-body");
    if (test){
        test.parentNode.removeChild(test);
    }
    var newElem = document.createElement("DIV");
    newElem.setAttribute("id", "tab-body");
    var parent = document.getElementById("main");
    parent.appendChild(newElem);

    var selected = document.getElementsByName("category");
    var result = [];
    for (var a = 0; a < selected.length; a++) {
        if (selected[a].checked) {
            result.push(selected[a].value);
        }
    }
    console.log(result);

    for (var i = 0; i < Object.keys(data).length; i++) {
        var tab_body = document.getElementById("tab-body");
        var main = document.createElement("DIV");
        main.className = "body-row";

        if (result.indexOf("1") != -1) {
            var title = document.getElementById("name");
            title.style.display = "block";
            var div1 = document.createElement("DIV");
            div1.className = "cell";
            div1.setAttribute("name", "div1");
            div1.innerHTML = data[i].name;
            main.appendChild(div1);
        } else {
            var title = document.getElementById("name");
            title.style.display = "none";
        }

        if (result.indexOf("2") != -1) {
            var title = document.getElementById("plan");
            title.style.display = "block";
            var div2 = document.createElement("DIV");
            div2.className = "cell";
            div2.setAttribute("name", "div2");
            div2.innerHTML = data[i].plan;
            main.appendChild(div2);
        } else {
            var title = document.getElementById("plan");
            title.style.display = "none";
        }

        if (result.indexOf("3") != -1) {
            var title = document.getElementById("forecast");
            title.style.display = "block";
            var div3 = document.createElement("DIV");
            div3.className = "cell";
            div3.setAttribute("name", "div3");
            div3.innerHTML = data[i].forecast;
            main.appendChild(div3);
        } else {
            var title = document.getElementById("forecast");
            title.style.display = "none";
        }

        if (result.indexOf("4") != -1) {
            var title = document.getElementById("best_case");
            title.style.display = "block";
            var div4 = document.createElement("DIV");
            div4.className = "cell";
            div4.setAttribute("name", "div4");
            if (document.querySelector(":checked").value == "more") {
                div4.innerHTML = data[i].best_case[0] + " " + data[i].best_case[1];
            } else {
                div4.innerHTML = data[i].best_case[0];
            }
            main.appendChild(div4);
        } else {
            var title = document.getElementById("best_case");
            title.style.display = "none";
        }

        if (result.indexOf("5") != -1) {
            var title = document.getElementById("monthly");
            title.style.display = "block";
            var div5 = document.createElement("DIV");
            div5.className = "cell";
            div5.setAttribute("name", "div5");
            div5.innerHTML = data[i].monthly_plan;
            main.appendChild(div5);
        } else {
            var title = document.getElementById("monthly");
            if (title) {
                title.style.display = "none";
            }
        }

        if (result.indexOf("6") != -1) {
            var title = document.getElementById("comments");
            title.style.display = "block";
            var div7 = document.createElement("DIV");
            div7.className = "cell";
            div7.setAttribute("name", "div7");
            div7.innerHTML = data[i].comments;
            main.appendChild(div7);
        } else {
            var title = document.getElementById("comments");
            title.style.display = "none";
        }

        if (result.indexOf("7") != -1) {
            var title = document.getElementById("commit");
            title.style.display = "block";
            var div6 = document.createElement("DIV");
            div6.className = "cell";
            div6.setAttribute("name", "div6");
            if (document.querySelector(":checked").value == "more") {
                div6.innerHTML = data[i].commit[0] + " " + data[i].commit[1];
            } else {
                div6.innerHTML = data[i].commit[0];
            }
            main.appendChild(div6);
        } else {
            var title = document.getElementById("commit");
            title.style.display = "none";
        }

        tab_body.appendChild(main);
    }
}

function sort(name) {
    flag = !flag;
    if (name) {
        data.sort(predicateBy(name, flag));
        test();
    }
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

function clickMe() {
    var dropdown = document.getElementById("drop");
    dropdown.style.display = (dropdown.style.display == "inherit") ? "none" : "inherit";
}

function loadData(srt) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            saveData(data);
        }
    };
    xhttp.open("GET", "data.json");
    xhttp.send();
}

function saveData(dta) {
    data = dta;
    console.log(data);
    test();
}

loadData();

function check() {
    var size = 0;
    var drops = document.getElementsByName("category");
    var btn = document.getElementById("apply");
    // console.log(drops);
    for (var i = 0; i < drops.length; i++) {
       if (drops[i].checked) {
           size++;
       }
    }
    console.log(size);
    size > 5 ? btn.disabled = true : btn.disabled = false;
}

function apply() {
    var drop = document.getElementById("drop");
    drop.style.display = "none";
    test();
}
