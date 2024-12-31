// interaction.js

/*O módulo interaction.js adiciona comportamentos interativos, como zoom, pan e drag-and-drop. */
import { config } from './config.js';

export function enableZoom(svg) {
    svg.call(d3.zoom()
        .scaleExtent(config.zoomScale)
        .on("zoom", (event) => {
            svg.attr("transform", event.transform);
        }));
}

export function addDragBehavior(simulation) {
    return d3.drag()
        .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
        })
        .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        });
}
