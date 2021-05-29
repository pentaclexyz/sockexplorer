export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([
    ["eth-ecosystem.json", "/eth-ecosystem.json"],
  ]);
  main.builtin(
    "FileAttachment",
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );
  main
    .variable(observer("chart"))
    .define(
      "chart",
      ["partition", "data", "d3", "width", "color", "arc", "format", "radius"],
      function (partition, data, d3, width, color, arc, format, radius) {
        const root = partition(data);
        root.each((d) => (d.current = d));

        const svg = d3
          .create("svg")
          .attr("viewBox", [0, 0, width, width])
          .style("font-size", ".6rem");

        const g = svg
          .append("g")
          .attr("transform", `translate(${width / 2},${width / 2})`);

        const path = g
          .append("g")
          .selectAll("path")
          .data(root.descendants().slice(1))
          .join("path")
          .attr("fill", (d) => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
          })
          .attr("fill-opacity", (d) =>
            arcVisible(d.current) ? (d.children ? 0.7 : 0.5) : 0
          )
          .attr("d", (d) => arc(d.current));

        path
          .filter((d) => d.children)
          .style("cursor", "pointer")
          .on("click", clicked);

        const centreDefs = g.append("defs").attr("id", "imgdefs");

        const centrePattern = centreDefs
          .append("pattern")
          .attr("id", "centrePattern")
          .attr("height", 1)
          .attr("width", 1)
          .attr("x", "0")
          .attr("y", "0");

        centrePattern
          .append("image")
          .attr(
            "xlink:href",
            "https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/31987/eth-diamond-rainbow.png"
          )
          .attr("height", 200)
          .attr("width", 200);

        g.append("circle")
          .attr("r", 100)
          .attr("cy", 0)
          .attr("cx", 0)
          .attr("fill", "url(#centrePattern)");

        const image_height = 10;
        const image_width = 10;

        const icon = g
          .append("g")
          .selectAll("image")
          .attr("pointer-events", "all")
          .style("cursor", "pointer")
          .data(root.descendants().slice(1))
          .join("image")
          .attr("xlink:href", function (d) {
            return d.data.img;
          })
          .attr("width", image_width)
          .attr("height", image_height)
          .style("visibility", "visible")
          .attr("transform", (d) => iconTransform(d.current))
          .on("click", clicked);

        const label = g
          .append("g")
          .attr("pointer-events", "all")
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
          .style("text-decoration", "none")

          .selectAll("text")
          .data(root.descendants().slice(1))
          .join("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", (d) => +labelVisible(d.current))
          .attr("transform", (d) => labelTransform(d.current));

        label
          .append("a")
          .attr("pointer-events", "all")
          .style("text-decoration", "none")
          .attr("font-size", "0.6rem")
          .attr(
            "font-family",
            "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica-neue', Helvetica, sans-serif"
          )
          .attr("color", "white")
          .attr("dy", "0.35em")
          .attr("a:href", function (d) {
            return d.data.url;
          })
          .on("click", clicked)
          .text((d) => d.data.name);

        const parent = g
          .append("circle")
          .datum(root)
          .attr("r", radius)
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("click", clicked);

        function clicked(event, p) {
          parent.datum(p.parent || root);

          root.each(
            (d) =>
              (d.target = {
                x0:
                  Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
                  2 *
                  Math.PI,
                x1:
                  Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
                  2 *
                  Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth),
              })
          );

          const t = g.transition().duration(750);

          path
            .transition(t)
            .tween("data", (d) => {
              const i = d3.interpolate(d.current, d.target);
              return (t) => (d.current = i(t));
            })
            .filter(function (d) {
              return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
            .attr("fill-opacity", (d) =>
              arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
            )
            .attrTween("d", (d) => () => arc(d.current));

          label
            .filter(function (d) {
              return (
                +this.getAttribute("fill-opacity") || labelVisible(d.target)
              );
            })
            .transition(t)
            .attr("fill-opacity", (d) => +labelVisible(d.target))
            .attrTween("transform", (d) => () => labelTransform(d.current));

          icon
            .style("visibility", "hidden")
            .filter(function (d) {
              return +this.getAttribute("style") || iconVisible(d.target);
            })
            .style("visibility", "visible")
            .transition(t)
            .attrTween("transform", (d) => () => iconTransform(d.current));
        }

        function arcVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function iconVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
          const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
          const y = ((d.y0 + d.y1) / 2) * radius;
          return `rotate(${x - 90}) translate(${y},0) rotate(${
            x < 180 ? 0 : 180
          })`;
        }

        function iconTransform(d) {
          const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI + 0.5;
          const y = ((d.y0 + d.y1) / 2) * radius + 60;
          return `rotate(${x - 90}) translate(${y},0) rotate(${(x, 180)})`;
        }

        return svg.node();
      }
    );
  main
    .variable(observer("data"))
    .define("data", ["FileAttachment"], function (FileAttachment) {
      return FileAttachment("eth-ecosystem.json").json();
    });
  main
    .variable(observer("partition"))
    .define("partition", ["d3"], function (d3) {
      return (data) => {
        const root = d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value);
        return d3.partition().size([2 * Math.PI, root.height + 1])(root);
      };
    });
  main
    .variable(observer("color"))
    .define("color", ["d3", "data"], function (d3, data) {
      return d3.scaleOrdinal(
        d3.quantize(d3.interpolateRainbow, data.children.length + 1)
      );
    });
  main.variable(observer("format")).define("format", ["d3"], function (d3) {
    return d3.format(",d");
  });
  main.variable(observer("width")).define("width", function () {
    return 932;
  });
  main
    .variable(observer("radius"))
    .define("radius", ["width"], function (width) {
      return width / 6;
    });
  main
    .variable(observer("arc"))
    .define("arc", ["d3", "radius"], function (d3, radius) {
      return d3
        .arc()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius((d) => d.y0 * radius)
        .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));
    });

  main.variable(observer("d3")).define("d3", ["require"], function (require) {
    return require("d3@6");
  });

  main
    .variable(observer("d3moji"))
    .define("d3moji", ["require"], function (require) {
      return require("d3moji@0.1.0");
    });

  return main;
}
