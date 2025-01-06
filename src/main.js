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
    .force("link", d3.forceLink(links).id(d => d.id).distance(100)) // Define a distância dos links, se necessário
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

// Reinicia a simulação após a interação
function restartSimulation() {
    simulation.alpha(1).restart(); // Reinicia a simulação
}

// Chamando a função para reiniciar a simulação sempre que um nó for arrastado
node.on("start", restartSimulation);


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".carrossel-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    const updateCarousel = () => {
        items.forEach((item, index) => {
            item.classList.toggle("active", index === currentIndex);
        });

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === items.length - 1;
    };

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel(); // Inicializa o carrossel
});


