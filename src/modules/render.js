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
      if (d.type === "owns") return "orange";
      if (d.type === "notify") return "gray";
      if (d.type === "rate") return "gold";
      if (d.type === "review") return "brown";
      if (d.type === "search") return "lightgreen";

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
    .force("link", d3.forceLink(links).id(d => d.id).distance(400)) // Aumenta a distância entre nós
    .force("collide", d3.forceCollide(config.nodeRadius * 2)) // Evita colisões entre nós
    .force("center", d3.forceCenter(config.width / 2, config.height / 2))
    .force("charge", d3.forceManyBody().strength(10))
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
