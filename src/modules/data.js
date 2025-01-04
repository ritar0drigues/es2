export const nodes = [
  { id: "Estudante/Inquilino", group: "user", color: "blue" },
  { id: "Proprietário", group: "user", color: "green" },
  { id: "Administrador", group: "user", color: "red" },
  { id: "Acomodação 1", group: "property", color: "orange" },
  { id: "Acomodação 2", group: "property", color: "orange" },
  { id: "Sistema de Pagamento", group: "system", color: "gray" },
  { id: "Sistema de Login", group: "system", color: "pink" },
  { id: "Sistema de Cadastro Proprietário", group: "system", color: "purple" },
  { id: "Sistema de Cadastro Estudante", group: "system", color: "purple" },
  { id: "Sistema de Chat", group: "system", color: "black" },
  { id: "Sistema de Notificação", group: "system", color: "black" },
  { id: "Sistema de Banco de Dados", group: "system", color: "yellow" },
  { id: "Sistema de Busca", group: "system", color: "cyan" },
];

// Definição dos links (relacionamentos)
export const links = [
  { source: "Estudante/Inquilino", target: "Proprietário", type: "message" },
  { source: "Estudante/Inquilino", target: "Administrador", type: "message" },
  { source: "Proprietário", target: "Administrador", type: "message" },

  { source: "Proprietário", target: "Acomodação 1", type: "owns" },
  { source: "Proprietário", target: "Acomodação 2", type: "owns" },
  { source: "Estudante/Inquilino", target: "Acomodação 1", type: "interested" },
  { source: "Estudante/Inquilino", target: "Acomodação 2", type: "interested" },

  { source: "Estudante/Inquilino", target: "Sistema de Cadastro Estudante", type: "register" },
  { source: "Proprietário", target: "Sistema de Cadastro Proprietário", type: "register" },
  { source: "Estudante/Inquilino", target: "Sistema de Login", type: "login" },
  { source: "Proprietário", target: "Sistema de Login", type: "login" },
  { source: "Estudante/Inquilino", target: "Sistema de Chat", type: "message" },
  { source: "Proprietário", target: "Sistema de Chat", type: "message" },
  { source: "Sistema de Cadastro Estudante", target: "Sistema de Banco de Dados", type: "notify" },
  { source: "Sistema de Cadastro Proprietário", target: "Sistema de Banco de Dados", type: "notify" },
  { source: "Sistema de Pagamento", target: "Sistema de Banco de Dados", type: "notify" },
  { source: "Sistema de Notificação", target: "Sistema de Chat", type: "notify" },
  { source: "Sistema de Busca", target: "Acomodação 1", type: "search" },
  { source: "Sistema de Busca", target: "Acomodação 2", type: "search" },
];


