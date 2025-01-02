// data.js

/*O módulo data.js armazena ou recupera os dados do gráfico. Pode ser um mock (dados fictícios) ou vir de uma API.*/

// Definição dos nós
export const nodes = [
  { id: "Estudante/Inquilino", group: "user", color: "blue", description: "Usuário que procura uma acomodação." },
  { id: "Proprietário", group: "user", color: "green", description: "Usuário que disponibiliza acomodações." },
  { id: "Acomodação 1", group: "property", color: "orange", description: "Acomodação disponível para aluguel." },
  { id: "Acomodação 2", group: "property", color: "orange", description: "Acomodação disponível para aluguel." },
  { id: "Sistema", group: "system", color: "gray", description: "Plataforma que gerencia os usuários e acomodações." },
];

// Definição dos links (relacionamentos)
export const links = [
  { source: "Estudante/Inquilino", target: "Sistema", type: "register", description: "Usuário registra-se no sistema." },
  { source: "Proprietário", target: "Sistema", type: "register", description: "Proprietário registra-se no sistema." },
  { source: "Estudante/Inquilino", target: "Proprietário", type: "message", description: "Usuário envia mensagem ao proprietário." },
  { source: "Proprietário", target: "Estudante/Inquilino", type: "reply", description: "Proprietário responde à mensagem do usuário." },
  { source: "Proprietário", target: "Acomodação 1", type: "owns", description: "Proprietário é responsável por esta acomodação." },
  { source: "Proprietário", target: "Acomodação 2", type: "owns", description: "Proprietário é responsável por esta acomodação." },
  { source: "Estudante/Inquilino", target: "Acomodação 1", type: "interested", description: "Usuário mostra interesse nesta acomodação." },
  { source: "Estudante/Inquilino", target: "Acomodação 2", type: "interested", description: "Usuário mostra interesse nesta acomodação." },
  { source: "Sistema", target: "Estudante/Inquilino", type: "notify", description: "Sistema envia notificações ao usuário." },
  { source: "Sistema", target: "Proprietário", type: "notify", description: "Sistema envia notificações ao proprietário." },
  { source: "Estudante/Inquilino", target: "Proprietário", type: "rate", description: "Usuário avalia o proprietário." },
  { source: "Estudante/Inquilino", target: "Acomodação 1", type: "review", description: "Usuário escreve uma avaliação sobre a acomodação." },
];