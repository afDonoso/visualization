const canvas = d3.select("#canvas")

const data = [
    { name: "Andres", age: 21 },
    { name: "Valentina", age: 23 },
    { name: "Sofia", age: 59 },
    { name: "Daniel", age: 93 },
    { name: "Persona 1", age: 34 },
    { name: "Persona 2", age: 91 },
    { name: "Persona 3", age: 10 }
]

const width = 700
const height = 500
const margin = {
    top: 10,
    left: 50,
    bottom: 40,
    right: 10
}
const iwidth = width - margin.left - margin.right
const iheight = height - margin.top - margin.bottom

const svg = canvas.append("svg")
svg.attr("width", width)
svg.attr("height", height)

let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

const y = d3.scaleLinear()
    .domain([0, 93])
    .range([iheight, 0])

const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, iwidth])
    .padding(0.1)

const bars = g.selectAll("rect").data(data)
bars.enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.age))
    .attr("height", d => iheight - y(d.age))
    .attr("width", x.bandwidth())

g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`)

g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y))