import React, { Component } from 'react'
import { scaleLinear, scaleTime, select, line, extent, axisBottom, axisLeft, timeFormat } from 'd3'

class LineChart extends Component {
   
   componentDidMount() {
      this.createLineChart()
   }
   componentDidUpdate() {
      this.createLineChart()
   }

   createLineChart = () => {
    const data = this.props.chartData
    
    //Getting node for DOM manipulation
    const node = this.node

    //Dimension variables
    var svgWidth = this.props.size[0];
    var svgHeight = this.props.size[1];
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom - 40;
    
    //creates svg tag which holds all g tags
    var svg = select(node)
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    //creates a g tag template inside svg with x,y positioning
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    // function to create scales which accepts input between 0 and x/y (the domain) and maps it to output between 0 and x/y (the range). d3.extent(iterable) Returns the minimum and maximum value in the given iterable using natural order.

    var x = scaleTime()
        .domain(extent(data, function(d) { return d.date}))
        .rangeRound([0, width]);
    
    //appends new g tag for the axisBottom, it positions it, uses domain from var x
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x)
            .tickFormat(timeFormat("%Y-%m-%d")))
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-1em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");
    
    var y = scaleLinear()
        .domain(extent(data, function(d) { return d.open }))
        .rangeRound([height, 0]);
    
    //appends new g tag for the axisLeft, it positions it, uses domain from var y, and adds label
    g.append("g")
        .call(axisLeft(y))
        .append("text")
        .attr("dy", "0.71em")
        .text("Price ($)")
        .attr("transform", "rotate(-90)")
        .attr("y", -45)
        .attr("fill", "white");
    
    //creates a line/path using x and y coordinates from the data
    var pathLine = line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.open)})
    //appends path to g tag. it passes the data, defines style and adds the d attribute which defines a path to be drawn based on the var pathLine.  
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", pathLine);
    }

render() {
    return <svg 
                //Passing modified node for DOM manipulation
                ref={node => this.node = node}
                width={this.props.size[0]}
                height={this.props.size[1]}>
            </svg>
   }
}
export default LineChart