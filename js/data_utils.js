function initializePlot() {
  // This function is responsible for initializing the area for plotting.
  // If the plot already exists, the nothing is executed

}
function class1() {
  // parse data from class 1
  var myParser = d3.dsv(" ");

  mainGroup.selectAll(".idle").remove();

  d3.csv("data/sample_data_1.csv", function(error, data) {
    if (error) throw error;
    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.mean = +d.mean;
      d.min = +d.min;
      d.max = +d.max;
    });
    dataClass1 = data;

    x.domain(d3.extent(dataClass1, function(d) { return d.date; }));
    y.domain([
      d3.min(dataClass1, function(d) { return d.min; }),
      d3.max(dataClass1, function(d) { return d.max; })
    ]);

  mainGroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  mainGroup.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (F)");

  mainGroup.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineMean)
      .style("stroke", function(d) { return color(0); });

  mainGroup.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineMax)
      .style("stroke", function(d) { return color(1); });

  mainGroup.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineMin)
      .style("stroke", function(d) { return color(2); });
  });
}

function class2() {
  initializePlot();
}

function class3() {
  initializePlot();
}
