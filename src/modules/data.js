// data.js

/*O módulo data.js armazena ou recupera os dados do gráfico. Pode ser um mock (dados fictícios) ou vir de uma API.*/

// data.js

// Definição dos nós
export const nodes = [
    { id: "Estudante/Inquilino", group: "user", color: "blue" },
    { id: "Proprietário", group: "user", color: "green" },
    { id: "Acomodação 1", group: "property", color: "orange" },
    { id: "Acomodação 2", group: "property", color: "orange" },
    { id: "Sistema", group: "system", color: "gray" },
  ];
  
  // Definição dos links (relacionamentos)
  export const links = [
    { source: "Estudante/Inquilino", target: "Sistema", type: "register" },
    { source: "Proprietário", target: "Sistema", type: "register" },
    { source: "Estudante/Inquilino", target: "Proprietário", type: "message" },
    { source: "Proprietário", target: "Estudante/Inquilino", type: "reply" },
    { source: "Proprietário", target: "Acomodação 1", type: "owns" },
    { source: "Proprietário", target: "Acomodação 2", type: "owns" },
    { source: "Estudante/Inquilino", target: "Acomodação 1", type: "interested" },
    { source: "Estudante/Inquilino", target: "Acomodação 2", type: "interested" },
    { source: "Sistema", target: "Estudante/Inquilino", type: "notify" },
    { source: "Sistema", target: "Proprietário", type: "notify" },
    { source: "Estudante/Inquilino", target: "Proprietário", type: "rate" },
    { source: "Estudante/Inquilino", target: "Acomodação 1", type: "review" },
  ];
  