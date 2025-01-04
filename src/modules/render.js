import { config } from './config.js';

export function createSVG(container) {
  return d3.select(container)
    .append("svg")
    .attr("width", config.width)
    .attr("height", config.height);
}

export function renderGraph(svg, nodes, links) {
  // Definir posições iniciais para os nós com base no grupo
  nodes.forEach(node => {
    switch (node.group) {
      case "user":
        node.x = Math.random() * (config.width / 2); // Espalhar na metade esquerda
        node.y = Math.random() * config.height; // Espalhar verticalmente
        break;
      case "property":
        node.x = Math.random() * (config.width / 4) + (config.width / 2); // Espalhar na metade direita
        node.y = Math.random() * (config.height / 2) + (config.height / 4); // Espalhar verticalmente
        break;
      case "system":
        node.x = Math.random() * (config.width / 2) + (config.width / 4); // Espalhar entre as áreas
        node.y = Math.random() * (config.height / 2); // Espalhar verticalmente
        break;
    }
  });

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
      return "black"; // Cor padrão
    })
    .attr("marker-end", "url(#arrow)");

  // Renderiza os nós
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", config.nodeRadius)
    .attr("fill", d => d.color)
    .call(d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded));

  // Simulação de força para o layout do gráfico
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(150)) // Aumenta a distância entre nós
    .force("charge", d3.forceManyBody().strength(-300)) // Atração entre nós
    .force("center", d3.forceCenter(config.width / 2, config.height / 2))
    .on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

  // Funções de arrasto
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

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
