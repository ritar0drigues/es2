// render.js
/*O módulo render.js cria o SVG e renderiza os nós e links no gráfico.*/

// render.js
import { config } from './config.js';

export function createSVG(container) {
  return d3.select(container)
    .append("svg")
    .attr("width", config.width)
    .attr("height", config.height);
}

export function renderGraph(svg, nodes, links) {
  // Renderiza os links com cores baseadas no tipo
  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 2)
    .attr("stroke", d => {
      if (d.type === "register") return "blue";
      if (d.type === "message") return "purple";
      if (d.type === "reply") return "green";
      if (d.type === "owns") return "orange";
      if (d.type === "interested") return "red";
      if (d.type === "notify") return "gray";
      if (d.type === "rate") return "gold";
      if (d.type === "review") return "brown";
      return "black"; // Default
    })
    .attr("marker-end", "url(#arrow)");

  // Renderiza os nós
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", config.nodeRadius)
    .attr("fill", d => d.color);

  return { node, link };
}

// Adiciona legenda ao gráfico
export function addLegend(svg) {
  const legend = svg.append("g").attr("transform", `translate(${config.width - 200}, 20)`);

  const linkTypes = [
    { type: "register", color: "blue" },
    { type: "message", color: "purple" },
    { type: "reply", color: "green" },
    { type: "owns", color: "orange" },
    { type: "interested", color: "red" },
    { type: "notify", color: "gray" },
    { type: "rate", color: "gold" },
    { type: "review", color: "brown" },
  ];

  linkTypes.forEach((link, i) => {
    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", i * 20)
      .attr("r", 5)
      .attr("fill", link.color);

    legend.append("text")
      .attr("x", 10)
      .attr("y", i * 20 + 5)
      .text(link.type)
      .attr("font-size", "12px")
      .attr("alignment-baseline", "middle");
  });
}
