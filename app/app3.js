/**
 * Created by Yash on 5/8/2017.
 */

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);


        for (var x in data) {
            var div = document.createElement("DIV");
            div.className = "header-cell";
            var label = document.createElement("LABEL");
            label.innerHTML = data[x].name;
            div.appendChild(label);

            var span1 = document.createElement("SPAN");
            span1.className = "cell";
            span1.innerHTML = data[x].plan;
            div.appendChild(span1);

            var span2 = document.createElement("SPAN");
            span2.className = "cell";
            span2.innerHTML = data[x].forecast;
            div.appendChild(span2);

            var span3 = document.createElement("SPAN");
            span3.className = "cell";
            span3.innerHTML = data[x].best_case[0];
            div.appendChild(span3);

            var span4 = document.createElement("SPAN");
            span4.className = "cell";
            span4.innerHTML = data[x].commit[0];
            div.appendChild(span4);

            var main = document.getElementById("main");
            main.appendChild(div);
        }
    }
};
xhttp.open("GET", "data.json");
xhttp.send();
