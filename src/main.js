// main.js

/* O arquivo main.js é o ponto de entrada e conecta os módulos. */
import { config } from './modules/config.js';
import { nodes, links } from './modules/data.js';
import { createSVG, renderGraph } from './modules/render.js';
import { enableZoom, addDragBehavior } from './modules/interaction.js';

// Cria o SVG
const svg = createSVG("body");

// Configura a simulação de força
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(config.width / 2, config.height / 2));

// Renderiza o gráfico
const { node, link } = renderGraph(svg, nodes, links);

// Adiciona interatividade
enableZoom(svg);
node.call(addDragBehavior(simulation));

// Atualiza a simulação
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);
});
