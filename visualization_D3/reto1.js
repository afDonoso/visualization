const canvas1 = d3.select("#reto1")

d3.json("https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json").then(data => {
    let maxValue = Number.NEGATIVE_INFINITY

    data.forEach(element => {
        if (element.value >= maxValue) {
            maxValue = element.value
        }
    });

    //Graph creation
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

    const svg = canvas1.append("svg")
    svg.attr("width", width)
    svg.attr("height", height)

    let g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, iheight])
        .padding(0.1)

    const x = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, iwidth])

    const bars = g.selectAll("rect").data(data)
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", 0)
        .attr("y", d => y(d.name))
        .attr("height", y.bandwidth())
        .attr("width", d => x(parseInt(d.value)))

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`)

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y))
});