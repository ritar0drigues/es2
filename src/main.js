import * as d3 from "https://d3js.org/d3.v7.min.js";

const svg = d3.select("#graph-container")
    .append("svg")
    .attr("width", 800)
    .attr("height", 600)
    .style("background-color", "lightgray");

svg.append("circle")
    .attr("cx", 400)
    .attr("cy", 300)
    .attr("r", 50)
    .style("fill", "blue");
