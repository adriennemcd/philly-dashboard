import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max , sum} from 'd3-array'
import { select } from 'd3-selection'
import { legendColor } from 'd3-svg-legend'
import { transition } from 'd3-transition'

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data.map(d => sum(d.data)))
      const barWidth = this.props.size[0] / this.props.data.length
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

      const legend = legendColor()
         .scale(this.props.colorScale)
         .labels(["Wave 1", "Wave 2", "Wave 3", "Wave 4", "Wave 5"])

      const bars = this.props.data.map((d, i) => 
         <rect
            key={'rect' + i}
            fill={(d,i) => this.props.colorScale(d.launchday)}
            x={(d,i) => i * barWidth}
            y={d => this.props.size[1] - yScale(sum(d.data))}
            height={d => this.props.size[1] - yScale(sum(d.data))}
            width={barWidth}
         />
      );

      select(node)
         .selectAll("g.legend")
         .data([0])
         .enter()
         .append("g")
         .attr("class", "legend")
         .call(legend)
         select(node)
         .select("g.legend")
         .attr("transform", "translate(" + (this.props.size[0] - 100) + ", 20)")

      return bars
   // select(node)
   //    .selectAll('rect')
   //    .data(this.props.data)
   //    .enter()
   //    .append('rect')
   
   // select(node)
   //    .selectAll('rect')
   //    .data(this.props.data)
   //    .exit()
   //    .remove()

   // select(node)
   //    .selectAll("rect")
   //    .data(this.props.data)
   //    .enter()
   //    .append('rect')
   //    .attr("x", (d,i) => i * barWidth)
   //    .attr("y", d => this.props.size[1] - yScale(sum(d.data)))
   //    .attr("height", d => yScale(sum(d.data)))
   //    .attr("width", barWidth)
   //    .style("fill", (d,i) => this.props.colorScale(d.launchday))
   //    .style("stroke", "black")
   //    .style("stroke-opacity", 0.25)
   }
render() {
   const node = this.node
      const dataMax = max(this.props.data.map(d => sum(d.data)))
      const barWidth = this.props.size[0] / this.props.data.length
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

      const legend = legendColor()
         .scale(this.props.colorScale)
         .labels(["Wave 1", "Wave 2", "Wave 3", "Wave 4", "Wave 5"])

      const bars = this.props.data.map((d, i) => 
         <rect
            key={'rect' + i}
            fill={this.props.colorScale(d.launchday)}
            x={i * barWidth}
            y={this.props.size[1] - yScale(sum(d.data))}
            height={yScale(sum(d.data))}
            width={barWidth}
         />
      );

      select(node)
         .selectAll("g.legend")
         .data([0])
         .enter()
         .append("g")
         .attr("class", "legend")
         .call(legend)
         select(node)
         .select("g.legend")
         .attr("transform", "translate(" + (this.props.size[0] - 100) + ", 20)")

      return <svg ref={node => this.node = node}
       width={this.props.size[0]} height={this.props.size[1]}>
         {bars}
      </svg>
   }
}
export default BarChart