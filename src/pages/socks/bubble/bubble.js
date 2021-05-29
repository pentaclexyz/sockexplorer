export default function define(runtime, observer) {
    const main = runtime.module();
    const fileAttachments = new Map([["socks-holders.json","/socks-holders.json"]]);
    main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    main.variable(observer()).define(["md"], function(md){return(
        md`SOCK explorer`
    )});
    main.variable(observer("chart"))
        .define("chart", ["pack","data","d3","width","height","DOM","color","invalidation"],
            function(pack,data,d3,width,height,DOM,color,invalidation) {

            const centre = { x: width/2, y: height/2 };

            const root = pack(data);
            root.each((d) => (d.current = d));

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

            const tooltip = d3.select(".wallet-info")
                .style("opacity", 0)
                .attr("class", "tooltip")

            const showTooltip = function(d) {
                tooltip
                    .style("opacity", 1)
                    .style("background-color", "pink")
                    .style("border", "solid")
                    .style("border-radius", ".5rem")
                    .style("padding", ".75rem")
                    .text(root, d => d.wallet) // trying to get it to display some text!!
                    // .html("Wallet Address: " + d.wallet + "<br>" + "Token Balance: " + d.value + "<br>" + "Initial Transaction Date: " + d.buydate+ "<br>" + "Last Transaction Date: " + d.lastdate)
            }

            const hideTooltip = function(d) {
                tooltip
                    .style("opacity", 0)

                d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 1)
            }

            const svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("text-anchor", "middle");

            svg.append("rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("fill", "#1c252c");

            const g = svg.append("g");

            const leaf = g.selectAll('g')
                .data(root.leaves())
                .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

            leaf.append("text")
                .attr("pointer-events", "none")
                .attr('color', "violet")
                .attr("dy", "0.35em")
                .text(d => d.data.name)

            leaf.append("circle")
                .attr("pointer-events", "all")
                .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
                .attr("r", d => d.r)
                .attr("stroke", "#1c252c")
                .attr("stroke-width", 0.1)
                .attr("fill-opacity", 1)
                .attr("fill", d => color(d.value))
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
        FileAttachment("socks-holders.json").json()
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
        d3.scaleOrdinal()
            .domain(data.map(d => d.group))
            .range(d3.quantize(t => d3.interpolateRdPu(t), 121))
    )});
    main.variable(observer("d3")).define("d3", ["require"], function(require){return(
        require("d3@6")
    )});
    return main;
}
