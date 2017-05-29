import React, { Component } from 'react'
import './App.css'
import BarChart from './BarChart'
import PhillyMap from './PhillyMap'
import { range, sum } from 'd3-array'
import { scaleThreshold, scaleOrdinal } from 'd3-scale'
import { geoCentroid } from 'd3-geo'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      screenWidth: 1000, 
      screenHeight: 500,
      selectedNeighb: '',
      philly: {
        name: 'Philadelphia',
        ethnicity: [
          {
            'name': 'African-American',
            'value': 0.4188
          },
          {
            'name':'White',
            'value': 0.3669
          },{
            'name': 'Hispanic/Latinx',
            'value': 0.1270
          },
          {
            'name':'Asian',
            'value': 0.0647
          },
          {
            'name':'Other',
            'value': 0.0227
          }
        ]
      }
    }

    this.onResize = this.onResize.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()

    const setData = (neighbs) => this.setState({data: neighbs})
    
    fetch('https://adriennemcd.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM phlneighbs_wdata')
      .then((resp) => resp.json())
      .then(function(data) {
        console.log('DATA', data)
        setData(data)
      })
      .catch(function(error) {
        console.log('ERROR', error)
      })
  }

  onResize() {
    this.setState({ screenWidth: window.innerWidth,
    screenHeight: window.innerHeight - 70 }) // height of header
  }

  onMapClick(neighb) {
    this.setState({selectedNeighb: neighb.properties.mapname})
  }

  render() {
    const colorScale = scaleOrdinal()
      .domain(['African-American','White','Hispanic/Latinx','Asian','Other'])
      .range(['#0EDD93', '#17AAA1', '#2077B0', '#2944BF', '#3312CE'])



    return (
      <div className="App">
        <div className="App-header">
          <h2>Philly Neighborhood Dashboard</h2>
        </div>
        <div>
          {this.state.data !== undefined ? 
            <PhillyMap 
              colorScale={colorScale} 
              data={this.state.data} 
              size={[this.state.screenWidth / 2, this.state.screenHeight]} 
              onClick={this.onMapClick} 
              neighb={this.state.selectedNeighb} /> : null
          }
          {this.state.data !== undefined ? <BarChart colorScale={colorScale} data={this.state.philly} size={[this.state.screenWidth / 3, this.state.screenHeight / 2]} /> : null}
          {this.state.data !== undefined ? <BarChart colorScale={colorScale} data={this.state.philly} size={[this.state.screenWidth / 3, this.state.screenHeight / 2]} /> : null}
        </div>
      </div>
    )
  }
}

export default App