export const benefits = [
  "Posições inicial e final em cada exercício",
  "Séries, repetições e descansos já indicados",
  "8 iniciantes, 13 intermediárias e 4 avançadas",
  "Cuidados de segurança em todas as fichas",
];

export const showcaseCards = [
  {
    title: "25 fichas ilustradas",
    text: "Cada ficha mostra duas fases do movimento, objetivo e músculos trabalhados.",
    fichas: [
      { number: 1, category: "EXTENSÃO DO QUADRIL", name: "PONTE COM FAIXA" },
      { number: 3, category: "ROTAÇÃO EXTERNA", name: "CONCHA LATERAL" },
    ],
  },
  {
    title: "Do iniciante ao avançado",
    text: "**8 fichas iniciantes, 13 intermediárias e 4 avançadas** para escolher opções compatíveis com seu nível.",
    fichas: [
      { number: 11, category: "FORÇA BILATERAL", name: "AGACHAMENTO COM FAIXA" },
      { number: 19, category: "DOBRADIÇA DO QUADRIL", name: "TERRA ROMENO" },
    ],
  },
  {
    title: "Dose e segurança",
    text: "Consulte séries, repetições ou tempo, descanso, dica e aviso específico de cada exercício.",
    fichas: [
      { number: 21, category: "VETOR HORIZONTAL", name: "PUXADA ENTRE AS PERNAS" },
      { number: 23, category: "GLÚTEO E TRONCO", name: "PRANCHA LATERAL COM ABDUÇÃO" },
    ],
  },
];

export const heroFichas = [
  { number: 1, category: "EXTENSÃO DO QUADRIL", name: "PONTE COM FAIXA" },
  { number: 11, category: "FORÇA BILATERAL", name: "AGACHAMENTO COM FAIXA" },
  { number: 24, category: "ESTABILIDADE DO QUADRIL", name: "URSO COM ABDUÇÃO" },
  { number: 23, category: "GLÚTEO E TRONCO", name: "PRANCHA LATERAL COM ABDUÇÃO" },
  { number: 5, category: "EXTENSÃO DE QUADRIL", name: "PÉ ELEVADO" },
  { number: 6, category: "ABDUÇÃO FUNCIONAL", name: "HIDRANTE" },
  { number: 17, category: "FORÇA UNILATERAL", name: "SUBIDA NO DEGRAU" },
  { number: 19, category: "DOBRADIÇA DO QUADRIL", name: "TERRA ROMENO" },
];

export const bonuses = [
  {
    label: "Bônus #1",
    title: "250 Receitas Low Carb",
    text: "Preparado para você que está com dificuldades em montar cardápios para o seu dia a dia com foco em dietas Low Carb.",
    tone: "#ffb703",
  },
  {
    label: "Bônus #2",
    title: "128 Receitas Anabólicas",
    text: "Para você que deseja escolher um estilo de vida saudável com alimentação limpa, concentrada em alimentos integrais não refinados, em vez de alternativas pré-cozidas ou processadas.",
    tone: "#fb8500",
  },
  {
    label: "Bônus #3",
    title: "50 Receitas Saudáveis",
    text: "Receitas para secar! Este material prático oferece uma coleção de receitas saudáveis, projetadas para apoiar seus objetivos de perda de peso e bem-estar.",
    tone: "#e85d75",
  },
];

export const steps = [
  {
    number: 1,
    title: "Faça seu Pedido",
    text: "Clique no botão de compra, confira os dados do pedido e conclua o pagamento.",
  },
  {
    number: 2,
    title: "Receba o Acesso",
    text: "As instruções de acesso ao material serão enviadas pelo WhatsApp e por e-mail.",
  },
  {
    number: 3,
    title: "Consulte Quando Quiser",
    text: "O pagamento é único e o acesso ao material fica disponível para você sem mensalidades.",
  },
];

export interface Testimonial {
  name: string;
  text: string;
  reply?: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Andressa Braga Sato",
    text: "O material é muito bom e organizado. Os treinos são explicados e eu consegui adaptar mesmo sendo iniciante.",
    reply: "Obrigado pelo depoimento! 😊",
    avatarColor: "#f6a5c0",
  },
  {
    name: "Elisa Marin",
    text: "Estou até agora sem acreditar que paguei tão barato em tanto conteúdo TOP!! Obrigadooo.",
    reply: "Ficamos feliz em conseguir te ajudar! 🥰",
    avatarColor: "#a5c9f6",
  },
  {
    name: "Sharon Haynes",
    text: "Achava que precisava de academia para crescer, esses treinos me provaram o contrário. Tô fazendo tudo em casa e já vejo meu corpo mudado!",
    reply: "Seguindo os treinos você consegue fazer tranquilamente em casa e ter excelentes resultados! 😍",
    avatarColor: "#f6d5a5",
  },
  {
    name: "Bianca Zanetti Cardoso",
    text: "Nunca fui muito de treinar, mas com 10 minutos por dia consegui criar um hábito. Agora não fico mais sem.",
    avatarColor: "#c5a5f6",
  },
  {
    name: "Suzana Romero",
    text: "Agora vai! adeus fichas de academiaaaaa! haha",
    avatarColor: "#a5f6d5",
  },
  {
    name: "Hortência Medina",
    text: "Já tinha tentando vários vídeos do youtube e sempre largava, aqui estou conseguindo seguir certinho por que os treinos são divididos por nível e objetivo!",
    avatarColor: "#f6a5a5",
  },
];

export const trustCards = [
  {
    title: "Conteúdo bem especificado",
    text: "Material em PDF com 25 fichas ilustradas, orientações de uso e avisos de segurança.",
    icon: "heart",
  },
  {
    title: "Uso responsável",
    text: "Níveis, doses e cuidados ajudam na consulta, sem substituir avaliação ou orientação profissional individual.",
    icon: "lock",
  },
];

export const faqItems = [
  {
    question: "O que está incluído no acesso ao material?",
    answer:
      "Você terá acesso ao material em PDF com 28 páginas: capa, orientações de uso, termo de uso e 25 fichas ilustradas. Cada ficha reúne duas fases do movimento, objetivo, músculos, cinco passos, séries, repetições ou tempo, descanso, dica e aviso.",
  },
  {
    question: "Para quem o material é indicado?",
    answer:
      "Para quem busca consultar exercícios de glúteos com elástico em casa ou na academia, escolhendo fichas compatíveis com sua condição e seu nível. Há 8 fichas iniciantes, 13 intermediárias e 4 avançadas. O conteúdo é educativo e não substitui avaliação ou orientação profissional; gestantes, menores, idosos, pessoas com cirurgia recente, dor persistente ou doenças crônicas devem buscar orientação antes de iniciar.",
  },
  {
    question: "De quais elásticos e apoios eu preciso?",
    answer:
      "As fichas usam mini band e faixa elástica longa. Algumas opções também pedem banco firme, cadeira, degrau antiderrapante, parede, apoio ou ancoragem própria. Escolha apenas exercícios compatíveis com os recursos disponíveis e inspecione a faixa antes do uso.",
  },
  {
    question: "Como recebo o acesso ao material?",
    answer:
      "Após a confirmação do pagamento, as instruções de acesso ao material em PDF serão enviadas pelo WhatsApp e por e-mail. O arquivo pode ser consultado em celular, tablet ou computador com leitor de PDF.",
  },
  {
    question: "Por quanto tempo o acesso fica disponível?",
    answer:
      "A oferta desta página informa pagamento único e acesso vitalício, sem mensalidades. Não há prazo de garantia informado no material; confira também as condições exibidas no checkout antes de concluir a compra.",
  },
];

export const checkoutUrl = "https://checkpay.me/?p=fichas-exercicios-gluteos-elastico";
