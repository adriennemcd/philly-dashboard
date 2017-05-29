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
      this.createLegend = this.createLegend.bind(this)
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data.ethnicity.map(d => d.value))
      const barWidth = this.props.size[0] / this.props.data.ethnicity.length
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

      const bars = this.props.data.ethnicity.map((d, i) => 
         <rect
            key={'rect' + i}
            fill={this.props.colorScale(d.name)}
            x={i * barWidth}
            y={this.props.size[1] - yScale(d.value)}
            height={yScale(d.value)}
            width={barWidth}
            className={d.name}
         />
      );

      // select(node)
      //    .selectAll("g.legend")
      //    .data(this.props.colorScale)
      //    .enter()
      //    .append("g")
      //    .attr("class", "legend")
      //    .call(legend)
      
      // select(node)
      //    .select("g.legend")
      //    .attr("transform", "translate(" + (this.props.size[0] - 100) + ", 20)")

      return bars

   }

   createLegend() {
      const legend = legendColor()
         .scale(this.props.colorScale)
         .labels(['African-American','White','Hispanic/Latinx','Asian','Other'])

      const legendItem = this.props.data.ethnicity.map((d, i) =>
         <g
            key={'legendItem' + i}
            transform={"translate(" + (this.props.size[0] - 100) + "," + i*22 + ")"}
            // height='18'
            // width='50'
         >
            <rect
               key={'legendSwatch' + i}
               fill={this.props.colorScale(d.name)}
               width='18'
               height='18'
            />
            <text 
               key={'legendText' + i}
               x='25'
               y='14'
            >
               {d.name}
            </text>
         </g>
      )

      return legendItem
   }

render() {
      return <svg ref={node => this.node = node}
         width={this.props.size[0]}   
         height={this.props.size[1]}>
            {this.createBarChart()}
            {this.createLegend()}
      </svg>
   }
}
export default BarChart