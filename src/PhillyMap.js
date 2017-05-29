import React, { Component } from 'react'
import Neighborhood from './Neighborhood'
import './App.css'
import { geoAlbers, geoPath } from 'd3-geo'

class PhillyMap extends Component {

	renderNeighb(d,i) {
		const scale = 115000
		const projection = geoAlbers()
			.center([39,-75])
			.scale(scale)
			.translate([89400,136505])
			//.translate([(scale - scale*0.2219), (scale + scale*0.187)])

		//console.log(projection([39,-75]))
		const pathGenerator = geoPath().projection(projection)

		return (
			<Neighborhood
				key={"path" + i}
				d={pathGenerator(d)}
				dataSelected={this.props.neighb.name === d.properties.mapname}
				className="neighborhood"
				onClick={this.props.onClick.bind(this, d)}
			/>
		)
	}

	render() {
		
		return <svg width={this.props.size[0]} height={this.props.size[1]}>
			{this.props.data.features.map(this.renderNeighb.bind(this))}
		</svg>
	}
}

export default PhillyMap