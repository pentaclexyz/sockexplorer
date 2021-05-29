export default function define(runtime, observer) {
    const main = runtime.module();
    const fileAttachments = new Map([["socks-holders.csv","/socks-holders.csv"]]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.variable(observer()).define(["md"], function(md){return(
        md`SOCK explorer`
    )});
    main.variable(observer("chart"))
        .define("chart", ["pack","data","d3","width","height","DOM","color","invalidation"],
            function(pack,data,d3,width,height,DOM,color,invalidation) {

            const root = pack(data);

            const s1 = 0.001
            const s2 = 0.9
            const s3 = 0.8

            const simulation = d3
                .forceSimulation(root.leaves())
                .velocityDecay(0.5)
                .force("x", d3.forceX(width / 2).strength(s1))
                .force("y", d3.forceY(height / 2).strength(s1))
                .force('charge', d3.forceManyBody().strength(s2))
                .force("collision", d3.forceCollide().radius(function(d) {return d.r + 0.1;}).strength(s3));

            var tooltip = d3.select(".wallet-info")
                .append("div")
                .style("opacity", 0)
                .style("color", "black");


            var showTooltip = function(d) {
                tooltip
                    .style("opacity", 1)
                    .style("background-color", "pink")
                    .style("border", "solid")
                    .style("border-radius", ".5rem")
                    .style("padding", ".75rem")
                    .html(d => d.data.wallet);
            }
            var hideTooltip = function(d) {
                tooltip
                    .style("opacity", 0)

                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 1)
            }

            const svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("font-size", 10)
                .attr("font-family", "sans-serif")
                .attr("text-anchor", "middle");

            svg.append("rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("fill", "#1c252c");

            const g = svg.append("g");

            const leaf = g.selectAll("g")
                .data(root.leaves())
                .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

                leaf.append("circle")
                .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
                .attr("r", d => d.r)
                .attr("stroke", "#1c252c")
                .attr("stroke-width", 0.1)
                .attr("fill-opacity", 1)
                .attr("fill", d => color(d.value))
                .attr("xlink:href",  function(d) { return d.url;})
                .on("mouseover", showTooltip)
                .on("mouseleave", hideTooltip)
                .on('click', function(d) {(window.open(d.url, '_blank'))})

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
    main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
        FileAttachment("socks-holders.csv").text()
    )});
    main.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
        data => d3.pack()
            .size([width - 2, height - 2])
            .padding(3)
            (d3.hierarchy({children: data})
                .sum(d => d.value)
            )
    )});
    main.variable(observer("width")).define("width", function(){return(
        900
    )});
    main.variable(observer("height")).define("height", ["width"], function(width){return(
        width
    )});
    main.variable(observer("format")).define("format", ["d3"], function(d3){return(
        d3.format(",d")
    )});
    main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
        d3.scaleSequential()
            .domain(data.map(d => d.group))
            .range(d3.quantize(t => d3.interpolateRdPu(t), 121))
    )});
    main.variable(observer("d3")).define("d3", ["require"], function(require){return(
        require("d3@6")
    )});
    return main;
}
