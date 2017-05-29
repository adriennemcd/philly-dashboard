import React, { Component } from 'react'

function Neighborhood(props) {
	let fill = props.dataSelected === true ? '#17AAA1' : '#d2d3d7'

	return (
		<path
			d={props.d}
			style={{
				fill: fill,
				stroke: "black", 
				strokeOpacity: 0.5 }}
			data-selected={props.dataSelected}
			className="neighborhood"
			onClick={props.onClick}
		/>
	)
}

export default Neighborhood
