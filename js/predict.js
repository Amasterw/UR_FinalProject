var sat=d3.select("#sat");
var accpt=d3.select("#accpt");
var button=d3.select("#filter-btn");
//all_clusters=
// Create event handlers 
button.on("click", runEnter);

function predict(clusterResult){
    data=clusterResult[0];
    clusters=clusterResult[1];
    console.log(data);
    console.log(clusters);
}

function runEnter() {
    console.log(clusters);
    console.log(data);
    // Prevent the page from refreshing
    d3.event.preventDefault();
    var sat=d3.select("#sat");
    var sat_value=sat.property("value");

    var accpt=d3.select("#accpt");
    var accpt_value=accpt.property("value");
    console.log(sat_value,accpt_value);

    




}  