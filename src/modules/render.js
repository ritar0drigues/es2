// render.js
/*O módulo render.js cria o SVG e renderiza os nós e links no gráfico.*/

import { config } from './config.js';

export function createSVG(container) {
    return d3.select(container)
        .append("svg")
        .attr("width", config.width)
        .attr("height", config.height);
}

export function renderGraph(svg, nodes, links) {
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 2)
        .attr("stroke", d => d.color);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", config.nodeRadius)
        .attr("fill", d => d.color);

    return { node, link };
}
