export default function define(runtime, observer) {
    const main = runtime.module();
    const fileAttachments = new Map([["socks-holders.json","/socks-holders.json"]]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.variable(observer()).define(["md"], function(md){return(
        md`# Unisocks holders`
    )});
    main.variable(observer("chart"))
        .define("chart", ["pack", "data", "d3", "width", "height", "DOM", "color", "invalidation"],
            function (pack, data, d3, width, height, DOM, color, invalidation) {

                const centre = {x: width / 2, y: height / 2};

                const root = pack(data);
                const tooltip = d3.select('.tooltip');

                const s1 = 0.001
                const s2 = 0.9
                const s3 = 0.8

                const simulation = d3
                    .forceSimulation(root.leaves())
                    .velocityDecay(0.5)
                    .force("x", d3.forceX(width / 2).strength(s1))
                    .force("y", d3.forceY(height / 2).strength(s1))
                    .force('charge', d3.forceManyBody().strength(s2))
                    .force(
                        "collision",
                        d3.forceCollide().radius(function(d) {return d.r + 0.1;}).strength(s3));

                const svg = d3.create("svg")
                    .attr("viewBox", [0, 0, width, height])
                    .style("font-size", ".5rem")
                    .attr("text-anchor", "middle");

                const g = svg.append("g");

                const leaf = g.selectAll('g')
                    .data(root.leaves())
                    .enter().append('g')
                    .attr('transform', `translate(${width / 2}, ${height / 2})`);

                const circle = leaf.append('circle')
                    .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
                    .attr("r", d => d.r)
                    .attr("fill", d => color(d.value))

                    .on('mouseover', function (e, d) {
                        tooltip.select('.name').text(d.data.wallet);
                        tooltip.select('.value').text(d.data.value);
                        tooltip.select('.buy').text(d.data.buydate);
                        tooltip.style('visibility', 'visible');

                        d3.select(this).style('stroke', '#ff80ed')
                        .attr("fill", '#ff80ed');
                    })
                    .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                        .style('left', `${e.pageX + 10}px`))

                    .on('mouseout', function () {
                        d3.select(this).style('stroke', 'none')
                       .attr("fill", d => color(d.value))
                        return tooltip.style('visibility', 'hidden');
                    })

                    .on('click', (e, d) => window.open(d.data.url));

                    const label = leaf.append('text')
                        .attr('dy', 2)
                        .style("cursor", "pointer")
                        .text(d => d.data.wallet.substring(0, d.r / 3))

                    leaf.transition()
                        .ease(d3.easeExpInOut)
                        .duration(1000)
                        .attr('transform', d => `translate(${d.x}, ${d.y})`);

                    circle.transition()
                        .ease(d3.easeExpInOut)
                        .duration(1000)
                        .attr('r', d => d.r);

                    label.transition()
                        .delay(700)
                        .ease(d3.easeExpInOut)
                        .duration(1000)
                        .style('opacity', 1)

                    leaf.append("clipPath")
                        .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
                        .append("use")
                        .attr("xlink:href", d => d.leafUid.href);

                    simulation.on("tick", () => {
                        leaf.attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
                    });

                    svg.call(d3.zoom()
                        .extent([[0, 0], [width, height]])
                        .scaleExtent([1, 50])
                        .on("zoom", zoomed));

                    invalidation.then(() => simulation.stop());

                function zoomed({transform}) {
                    g.attr("transform", transform);
                }

                return svg.node();
            }
        );

    main.variable(observer("data")).define("data", ["FileAttachment"], function (FileAttachment) {
        return (
            FileAttachment("socks-holders.json").json()
        )
    });

    main.variable(observer("pack")).define("pack", ["d3", "width", "height"], function (d3, width, height) {
        return (
            data => d3.pack()
                .size([width - 2, height - 2])
                .padding(3)
                (d3.hierarchy({children: data})
                    .sum(d => d.value)
                )
        )
    });
    main.variable(observer("width")).define("width", function () {
        return (
            900
        )
    });
    main.variable(observer("height")).define("height", ["width"], function (width) {
        return (
            width
        )
    });
    main.variable(observer("format")).define("format", ["d3"], function (d3) {
        return (
            d3.format(",d")
        )
    });
    main.variable(observer("color")).define("color", ["d3", "data"], function (d3, data) {
        return (
            d3.scaleOrdinal()
                .domain(data.map(d => d.group))
                .range(d3.quantize(t => d3.interpolateRdPu(t), 121))
        )
    });
    main.variable(observer("d3")).define("d3", ["require"], function (require) {
        return (
            require("d3@6")
        )
    });
    return main;
}
