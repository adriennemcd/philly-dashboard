import React, { Component } from 'react'
import './App.css'
import { geoAlbers, geoPath } from 'd3-geo'

class PhillyMap extends Component {
	render() {
		const projection = geoAlbers()
			.center([39,-75])
			.scale(43000)
			.translate([33500, 51050])

		//console.log(projection([39,-75]))
		const pathGenerator = geoPath().projection(projection)
		const neighborhoods = this.props.data.features.map((d,i) =>
			<path
				key={"path" + i}
				d={pathGenerator(d)}
				style={{
					fill: this.props.colorScale(d.properties.tot_hhs),
					stroke: "black", 
					strokeOpacity: 0.5 }}
				className="neighborhood"
			/>)
		
		return <svg width={this.props.size[0]} height={this.props.size[1]}>
			{neighborhoods}
		</svg>
	}
}

export default PhillyMap