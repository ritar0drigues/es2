// interaction.js

/*O módulo interaction.js adiciona comportamentos interativos, como zoom, pan e drag-and-drop. */
import { config } from './config.js';

export function enableZoom(svg) {
    svg.call(d3.zoom()
        .scaleExtent(config.zoomScale)
        .on("zoom", (event) => {
            svg.select("g.graph-content").attr("transform", event.transform);
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

export function addTooltips(svg, nodes, links) {
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "rgba(255, 255, 255, 0.8)")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    nodes.on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<strong>${d.id}</strong><br>${d.description}`)
            .style("left", `${event.pageX + config.tooltipOffset.x}px`)
            .style("top", `${event.pageY + config.tooltipOffset.y}px`);
    }).on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
    });

    links.on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`<strong>${d.type}</strong><br>${d.description}`)
            .style("left", `${event.pageX + config.tooltipOffset.x}px`)
            .style("top", `${event.pageY + config.tooltipOffset.y}px`);
    }).on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
    });
}
