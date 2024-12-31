// Importações dos módulos
import { nodes, links } from './modules/data.js';
import { createSVG, renderGraph, addLegend } from './modules/render.js';
import { enableZoom, addDragBehavior } from './modules/interaction.js';

// Configurações do gráfico
const width = 800;
const height = 600;

// Criação do SVG
const svg = createSVG("body");

// Configuração da simulação de força
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Renderização do gráfico (nós e links)
const { node, link } = renderGraph(svg, nodes, links);

// Adiciona a legenda
addLegend(svg);

// Adiciona interatividade
enableZoom(svg);
node.call(addDragBehavior(simulation));

// Atualização contínua durante a simulação
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
});
