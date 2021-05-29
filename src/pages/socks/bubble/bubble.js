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
                // root.each((d) => (d.current = d));

                const forceStrength = 0.001;
                const strength_var_1 = 0.5;
                const strength_var_2 = 0.8;

                const simulation = d3.forceSimulation()
                    .force('charge', d3.forceManyBody().strength(strength_var_1))
                    .velocityDecay(0.4)
                    .force('center', d3.forceCenter(centre.x, centre.y))
                    .force('x', d3.forceX(width / 2).strength(forceStrength).x(centre.x))
                    .force('y', d3.forceY(height / 2).strength(forceStrength).y(centre.y))
                    .force('collision', d3.forceCollide().radius(d => d.radius + 0.1).strength(strength_var_2));

                const svg = d3.create("svg")
                    .attr("viewBox", [0, 0, width, height])
                    .style("font-size", ".6rem")
                    .attr("text-anchor", "middle");

                const g = svg.append("g");

                const leaf = g.selectAll('g')
                    .data(root.leaves())
                    .join("g")
                      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

                const tooltip = d3.select('.tooltip');

                leaf.append("circle")
                    .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
                    .attr("r", d => d.r)
                    .attr("fill-opacity", 1)
                    .attr("fill", d => color(d.value))
                    .on('mouseover', function (e, d) {
                        tooltip.select('a').attr('href', d.data.url).text(d.data.url);
                        tooltip.select('span').attr('class', d.data.category).text(d.data.category);
                        tooltip.style('visibility', 'visible');

                        d3.select(this).style('stroke', '#222')
                        .attr("fill-opacity", .7);
                    })
                    .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                        .style('left', `${e.pageX + 10}px`))

                    .on('mouseout', function () {
                        d3.select(this).style('stroke', 'none')
                       .attr("fill-opacity", 1);
                        return tooltip.style('visibility', 'hidden');
                    })

                    .on('click', (e, d) => window.open(d.data.url));

                leaf.append("clipPath")
                    .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
                    .append("use")
                    .attr("xlink:href", d => d.leafUid.href);

                leaf.append("text")
                    .attr("clip-path", d => d.clipUid)
                    .text(d => `${d.data.wallet}`)
                    .join("tspan");

                leaf.append("title")
                    // .text(d => `${d.data.wallet}`);
                    .text(d => `${d.data.value}`);

                simulation.on("tick", () => {
                    console.log(root.leaves());
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
