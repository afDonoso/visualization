const canvas = d3.select("#reto2")
d3.json("https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json").then(data => {
    let maxPurchasingPower = Number.NEGATIVE_INFINITY
    let maxLifeExp = Number.NEGATIVE_INFINITY
    let totalpopulation = 0

    data.forEach(element => {
        let purchasingPower = parseInt(element.purchasingpower)
        let lifeExpectancy = parseInt(element.lifeexpectancy)
        let population = parseInt(element.population)

        if (purchasingPower >= maxPurchasingPower) {
            maxPurchasingPower = purchasingPower
        }

        if (lifeExpectancy >= maxLifeExp) {
            maxLifeExp = lifeExpectancy
        }

        totalpopulation += population
    });

    console.log(totalpopulation)

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

    const x = d3.scaleLinear()
        .domain([0, maxPurchasingPower + 10000])
        .range([0, iwidth])

    const y = d3.scaleLinear()
        .domain([0, maxLifeExp + 30])
        .range([iheight, 0])

    const points = g.selectAll("circle").data(data)
    points.enter()
        .append("circle")
        .style("fill", "steelblue")
        .attr("cx", d => x(d.purchasingpower))
        .attr("cy", d => y(d.lifeexpectancy))
        .attr("r", d => (d.population / totalpopulation) * 100)

    const labels = g.selectAll("text").data(data)
    labels.enter()
        .append("text")
        .attr("font-size", 10)
        .attr("dy", "0.35em")
        .attr("x", d => x(d.purchasingpower) + ((d.population / totalpopulation) * 100))
        .attr("y", d => y(d.lifeexpectancy))
        .text(d => d.country)

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`)

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y))

    grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
            .selectAll("line")
            .data(x.ticks())
            .join("line")
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d))
            .attr("y1", 0)
            .attr("y2", iheight))
        .call(g => g.append("g")
            .selectAll("line")
            .data(y.ticks())
            .join("line")
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d))
            .attr("x1", 0)
            .attr("x2", iwidth));

    g.append("g")
        .call(grid)
})