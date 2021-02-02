var sat=d3.select("#sat");
var accpt=d3.select("#accpt");
var button=d3.select("#filter-btn");
//all_clusters=
// Create event handlers 
button.on("click", runEnter);

function predict(clusterResult,firstParam, firstData,secondParam, secondData){
    console.log(firstParam, firstData,secondParam, secondData);
    xname=firstParam;
    yname=secondParam;
    x=firstData;
    y=secondData;
    if(firstData=="mean_sat_score"){
        label1="Enter SAT score";
        if(secondData=="acceptance_rate"){
            label2="Enter Acceptance rate";
        }
        else{
            label2="Enter Mid Career Median Salary";
        }
    }
    else if(firstData=="acceptance_rate"){
        label1="Enter Acceptance rate";
        if(secondData=="mean_sat_score"){
            label2="Enter SAT score";
        }
        else{
            label2="Enter Mid Career Median Salary"
        }
    }
    else if(firstData=="mid_career_median_salary"){
        label1="Enter Mid Career Median Salary";
        if(secondData=="mean_sat_score"){
            label2="Enter SAT score"
        }
    }
    
    data=clusterResult[0];
    clusters=clusterResult[1];
    console.log(data);
    console.log(clusters);
    form=d3.select("#form");
    label1_tag=d3.select("#label1");
    label1_tag.text(label1);
    d3.select("#first_val").property("value","");
    label2_tag=d3.select("#label2");
    label2_tag.text(label2);
    d3.select("#second_val").property("value","");
    

 }

 function distanceFromCluster (a, b, xname, x, yname, y, data) {
    console.log(a, b, xname, x, yname, y, data);
    // Maxes
    var maxX = d3.max(data, function (d) {
      return d[xname][x];
    });
    console.log(maxX);
    var maxY = d3.max(data, function (d) {
  
      return d[yname][y];
    });
    console.log(maxY);
  
  
    // Mins
    var minX = d3.min(data, function (d) {
      return d[xname][x];
    })
    var minY = d3.min(data, function (d) {
      return d[yname][y];
    });
    console.log(minX,minY);
  
    // Relative divisor
    var divX = maxX-minX;
    var divY = maxY-minY;
    console.log(a[xname][x]);
  
    // Relative division
    var aX = (a[xname][x]-minX) / (divX).toFixed(4);
    var aY = (a[yname][y]-minY) / (divY).toFixed(4);
    var bX = (b[xname][x]-minX) / (divX).toFixed(4);
    var bY = (b[yname][y]-minY) / (divY).toFixed(4);
    console.log(Math.sqrt(
        (aX - bX) * (aX - bX) + (aY - bY) * (aY - bY)
      ));
  
    return Math.sqrt(
      (aX - bX) * (aX - bX) + (aY - bY) * (aY - bY)
    );
  }




function runEnter() {
    console.log(clusters);
    console.log(data);
    // Prevent the page from refreshing
    //d3.event.preventDefault();
    console.log(xname,x,yname,y);
    //key1=x;

    x_dict={};
    y_dict={};
    values={};
    first_val=d3.select("#first_val").property("value");

    second_val=d3.select("#second_val").property("value");
    x_dict[x]=first_val;
    y_dict[y]=second_val;
    values[xname]=x_dict;
    values[yname]=y_dict;


    console.log(values);

    //values=[first_val,second_val];

    
    dataCopies=[];

    var distances = clusters.map(function(d) {
        console.log(d);
        return distanceFromCluster(values, d, xname, x, yname, y, data);
    });
    console.log(distances)
    var minDist = d3.min(distances);
    var clusterIndex = distances.indexOf(minDist);
    console.log(clusterIndex);
    console.log(clusters);
    var clusterId = clusters[clusterIndex].id;
    console.log(clusterId);
    console.log(data)

    var filteredData = data.filter(data => data["clusterId"] == clusterId);
    console.log(filteredData);
    console.log(filteredData[1]["school"]);
    rank=[];
    college=[];
    state=[];
    link=[];
    sat=[];
    accpt=[];
    students=[];
    salary=[];
    for(var i=0;i<filteredData.length;i++){
        rank.append(filteredData[i]["salary_info"]["rank"]);
        college.append(filteredData[i]["school"]);
        state.append(filteredData[i]["location_info"]["state"])

    }
    

    




}  