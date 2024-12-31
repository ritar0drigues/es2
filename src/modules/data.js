// data.js

/*O módulo data.js armazena ou recupera os dados do gráfico. Pode ser um mock (dados fictícios) ou vir de uma API.*/

export const nodes = [
    { id: "req1", type: "requisito", color: "blue" },
    { id: "useCase1", type: "caso de uso", color: "green" },
];

export const links = [
    { source: "req1", target: "useCase1", color: "gray" },
];
