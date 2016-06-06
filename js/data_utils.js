function initializePlot() {
  // This function is responsible for initializing the area for plotting.
  // If the plot already exists, the nothing is executed

}


function updateClass1Data(dataClass1) {
  d3.select("#lineMean")
      .datum(dataClass1)
      .attr("class", "line")
      .attr("d", lineMean)
      .attr("id", "lineMean")
      .style("stroke", function(d) { return color(1); });

  d3.select("#lineMax")
      .datum(dataClass1)
      .attr("class", "line")
      .attr("d", lineMax)
      .attr("id", "lineMax")
      .style("stroke", function(d) { return color(1); });

  d3.select("#lineMin")
      .datum(dataClass1)
      .attr("class", "line")
      .attr("d", lineMin)
      .attr("id", "lineMin")
      .style("stroke", function(d) { return color(1); });

  d3.select(".area")
    .datum(dataClass1)
    .attr("d", uncertaintyArea)
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

    //we need to check if we need to create a new plot, or just update an existing one
    if (plotCreated.class1) {
      // update the plot

      x.domain(d3.extent(dataClass1, function(d) { return d.date; }));
      y.domain([
        d3.min(dataClass1, function(d) { return d.min; }),
        d3.max(dataClass1, function(d) { return d.max; })
      ]);

      updateClass1Data(dataClass1);

    } else {

      x.domain(d3.extent(dataClass1, function(d) { return d.date; }));
      y.domain([
        d3.min(dataClass1, function(d) { return d.min; }),
        d3.max(dataClass1, function(d) { return d.max; })
      ]);

      zoom.x(x)
          .y(y)
          .scaleExtent([1, 8])
          .on("zoom", zoomed);

      mainGroup.append("g")
        .attr("class", "x axis")
        .attr("id", "xaxis")
        .call(xAxis)
        .attr("transform", "translate(0," + height + ")");

      mainGroup.append("g")
          .attr("class", "y axis")
          .attr("id", "yaxis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Temperature (F)");

      var newSubGroup = mainGroup.append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + 0 + "," + 0 + ")")
          .attr("id", "newsubroup");

      newSubGroup.append("path")
          .datum(dataClass1)
          .attr("class", "line")
          .attr("d", lineMean)
          .attr("id", "lineMean")
          .style("stroke", function(d) { return color(1); });

      newSubGroup.append("path")
        .datum(dataClass1)
        .attr("class", "line")
        .attr("d", lineMax)
        .attr("id", "lineMax")
        .style("stroke", function(d) { return color(1); })
        .style("stroke-width", "0.5px");

      newSubGroup.append("path")
        .datum(dataClass1)
        .attr("class", "line")
        .attr("d", lineMin)
        .attr("id", "lineMin")
        .style("stroke", function(d) { return color(1); })
        .style("stroke-width", "0.5px");

      newSubGroup.append("path")
        .datum(dataClass1)
        .attr("class", "area")
        .attr("d", uncertaintyArea)
        .style("fill", color(1))
        .style("opacity", 0.5);

      plotCreated.class1 = true;
    }

    // update size of the axes
    /*d3.select("#xaxis").duration(750).call(xAxis);
    d3.select("#yaxis").duration(750).call(yAxis);*/
    d3.select("#xaxis").call(xAxis);
    d3.select("#yaxis").call(yAxis);
  });
}

function class2() {
  initializePlot();
}

function class3() {
  initializePlot();
}

function zoomed() {
  mainGroup.select("#yaxis").call(yAxis);
  mainGroup.select("#xaxis").call(xAxis);
  updateClass1Data(dataClass1);
}
