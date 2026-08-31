export const benefits = [
  "Demonstração visual completa, do posicionamento inicial à execução final",
  "Protocolos prontos com séries, repetições e pausas já definidas",
  "Progressão inteligente em 3 fases: 8 de Base, 13 de Evolução e 4 de Intensidade",
  "Orientações de execução e segurança integradas em todas as sessões",
];

export interface FichaDetail {
  number: number;
  category: string;
  name: string;
  equipment: string;
  objective: string;
  muscles: string[];
  steps: string[];
  series: string;
  reps: string;
  rest: string;
  warning: string;
}

export const fichaLibrary: Record<number, FichaDetail> = {
  1: {
    number: 1,
    category: "EXTENSÃO DO QUADRIL",
    name: "Ponte com Faixa",
    equipment: "Mini band acima dos joelhos",
    objective: "Ensinar a extensão do quadril com estabilidade dos joelhos e da pelve.",
    muscles: ["Glúteo máximo", "Glúteo médio"],
    steps: [
      "Deite com joelhos flexionados",
      "Afaste os joelhos contra a faixa",
      "Suba o quadril até alinhar",
      "Contraia o glúteo no topo",
      "Desça com controle",
    ],
    series: "2-3",
    reps: "10-15",
    rest: "40-60",
    warning: "Evite arquear a lombar durante a subida.",
  },
  3: {
    number: 3,
    category: "ROTAÇÃO EXTERNA",
    name: "Concha Lateral",
    equipment: "Mini band acima dos joelhos",
    objective: "Fortalecer os rotadores externos e melhorar o controle lateral do quadril.",
    muscles: ["Glúteo médio", "Glúteo máximo"],
    steps: [
      "Deite de lado, joelhos flexionados",
      "Mantenha os pés unidos",
      "Abra o joelho de cima",
      "Segure um instante no topo",
      "Retorne com controle",
    ],
    series: "2-3",
    reps: "12-15",
    rest: "40-60",
    warning: "Não deixe o quadril rolar para trás.",
  },
  5: {
    number: 5,
    category: "EXTENSÃO DE QUADRIL",
    name: "Pé Elevado",
    equipment: "Apoio elevado antiderrapante",
    objective: "Treinar a extensão de quadril unilateral com maior amplitude.",
    muscles: ["Glúteo máximo", "Isquiotibiais"],
    steps: [
      "Apoie um pé na elevação",
      "Incline levemente o tronco",
      "Estenda o quadril para trás",
      "Contraia o glúteo no topo",
      "Retorne sem tocar o chão",
    ],
    series: "2-3",
    reps: "10-12",
    rest: "45-60",
    warning: "Mantenha o apoio firme e antiderrapante.",
  },
  6: {
    number: 6,
    category: "ABDUÇÃO FUNCIONAL",
    name: "Hidrante",
    equipment: "Mini band acima dos joelhos",
    objective: "Ativar o glúteo médio em posição de quatro apoios.",
    muscles: ["Glúteo médio", "Glúteo mínimo"],
    steps: [
      "Posicione-se em quatro apoios",
      "Mantenha o joelho a 90°",
      "Abra o joelho para o lado",
      "Segure no ponto alto",
      "Retorne com controle",
    ],
    series: "2-3",
    reps: "12-15",
    rest: "40-60",
    warning: "Evite rotacionar o tronco durante o movimento.",
  },
  11: {
    number: 11,
    category: "FORÇA BILATERAL",
    name: "Agachamento com Faixa",
    equipment: "Mini band acima dos joelhos",
    objective: "Fortalecer os glúteos em um padrão funcional de agachamento.",
    muscles: ["Glúteo máximo", "Glúteo médio"],
    steps: [
      "Pés na largura do quadril",
      "Empurre os joelhos contra a faixa",
      "Desça flexionando quadril e joelhos",
      "Mantenha o peso nos calcanhares",
      "Suba contraindo o glúteo",
    ],
    series: "3",
    reps: "12-15",
    rest: "45-60",
    warning: "Não deixe os joelhos colapsarem para dentro.",
  },
  17: {
    number: 17,
    category: "FORÇA UNILATERAL",
    name: "Subida no Degrau",
    equipment: "Degrau ou banco firme",
    objective: "Desenvolver força unilateral de glúteo e quadríceps.",
    muscles: ["Glúteo máximo", "Quadríceps"],
    steps: [
      "Apoie um pé no degrau",
      "Empurre o corpo para cima",
      "Estenda o quadril no topo",
      "Controle a descida",
      "Alterne as pernas",
    ],
    series: "2-3",
    reps: "8-12",
    rest: "60-75",
    warning: "Use um degrau estável e antiderrapante.",
  },
  19: {
    number: 19,
    category: "DOBRADIÇA DO QUADRIL",
    name: "Terra Romeno",
    equipment: "Faixa longa sob os dois pés",
    objective: "Fortalecer glúteos e posteriores com joelhos pouco flexionados.",
    muscles: ["Glúteo máximo", "Biceps femoral"],
    steps: [
      "Pés sobre a faixa longa",
      "Incline o tronco à frente",
      "Empurre o quadril para trás",
      "Mantenha a coluna neutra",
      "Retorne contraindo o glúteo",
    ],
    series: "3",
    reps: "10-12",
    rest: "60-75",
    warning: "Não arredonde a lombar durante a descida.",
  },
  21: {
    number: 21,
    category: "VETOR HORIZONTAL",
    name: "Puxada entre as Pernas",
    equipment: "Faixa longa com ancoragem baixa",
    objective: "Treinar a dobradiça de quadril contra resistência que puxa o quadril para trás.",
    muscles: ["Glúteo máximo", "Biceps femoral"],
    steps: [
      "Ancore a faixa atrás do corpo",
      "Segure a faixa entre as pernas",
      "Incline o tronco à frente",
      "Estenda o quadril à frente",
      "Retorne com controle",
    ],
    series: "3",
    reps: "10-12",
    rest: "60-75",
    warning: "Verifique a ancoragem antes de iniciar.",
  },
  23: {
    number: 23,
    category: "GLÚTEO E TRONCO",
    name: "Prancha Lateral com Abdução",
    equipment: "Mini band acima dos joelhos",
    objective: "Fortalecer os abdutores e a estabilidade lateral do tronco.",
    muscles: ["Glúteo médio", "Glúteo mínimo"],
    steps: [
      "Apoie o antebraço no chão",
      "Alinhe ombro, quadril e pés",
      "Suba o quadril em prancha lateral",
      "Abra o joelho de cima",
      "Retorne com controle",
    ],
    series: "2-3",
    reps: "10-12",
    rest: "60-75",
    warning: "Mantenha o quadril alinhado, sem cair.",
  },
  24: {
    number: 24,
    category: "ESTABILIDADE DO QUADRIL",
    name: "Urso com Abdução",
    equipment: "Mini band acima dos joelhos",
    objective: "Desafiar a estabilidade do quadril em apoio quadrúpede elevado.",
    muscles: ["Glúteo médio", "Core"],
    steps: [
      "Posição de quatro apoios",
      "Eleve levemente os joelhos",
      "Abra um joelho para o lado",
      "Mantenha o quadril nivelado",
      "Retorne com controle",
    ],
    series: "2-3",
    reps: "10-12",
    rest: "45-60",
    warning: "Não deixe o quadril balançar para os lados.",
  },
};

export const showcaseCards = [
  {
    title: "25 sessões ilustradas",
    text: "Cada sessão mostra duas fases do movimento, objetivo e músculos trabalhados.",
    fichas: [1, 3],
  },
  {
    title: "Do iniciante ao avançado",
    text: "**8 sessões iniciantes, 13 intermediárias e 4 avançadas** para escolher opções compatíveis com seu nível.",
    fichas: [11, 19],
  },
  {
    title: "Dose e segurança",
    text: "Consulte séries, repetições ou tempo, descanso, dica e aviso específico de cada exercício.",
    fichas: [21, 23],
  },
];

export const heroFichas = [1, 11, 24, 23, 5, 6, 17, 19];

export const bonusIntro =
  "Além das 25 sessões G4, você também receberá 3 bônus exclusivos:";

export const bonusFootnote =
  "Todos os bônus estão incluídos gratuitamente e serão liberados imediatamente após a compra.";

export const bonuses = [
  {
    label: "Bônus #1",
    title: 'Guia "Comece Certo"',
    text: "Descubra qual intensidade de mini band utilizar, quantas repetições realizar, o número recomendado de rodadas e o tempo de descanso entre os exercícios.",
  },
  {
    label: "Bônus #2",
    title: "Protocolo de Ativação G4",
    text: "Uma sequência rápida de 5 minutos para ativar seus glúteos e preparar o corpo antes de iniciar qualquer uma das 25 sessões.",
  },
  {
    label: "Bônus #3",
    title: "Rastreador das 25 Sessões",
    text: "Um acompanhamento visual para registrar as sessões concluídas, a resistência utilizada e sua evolução durante os treinos.",
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
    text: "As instruções de acesso ao material serão enviadas por e-mail.",
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
    text: "Material em PDF com 25 sessões ilustradas, orientações de uso e avisos de segurança.",
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
      "Você terá acesso ao material em PDF com 25 páginas: capa, orientações de uso, termo de uso e 25 sessões ilustradas. Cada sessão reúne duas fases do movimento, objetivo, músculos, cinco passos, séries, repetições ou tempo, descanso, dica e aviso.",
  },
  {
    question: "Para quem o material é indicado?",
    answer:
      "Para quem busca consultar exercícios de glúteos com elástico em casa ou na academia, escolhendo sessões compatíveis com sua condição e seu nível. Há 8 sessões iniciantes, 13 intermediárias e 4 avançadas. O conteúdo é educativo e não substitui avaliação ou orientação profissional; gestantes, menores, idosos, pessoas com cirurgia recente, dor persistente ou doenças crônicas devem buscar orientação antes de iniciar.",
  },
  {
    question: "De quais elásticos e apoios eu preciso?",
    answer:
      "As sessões usam mini band e faixa elástica longa. Algumas opções também pedem banco firme, cadeira, degrau antiderrapante, parede, apoio ou ancoragem própria. Escolha apenas exercícios compatíveis com os recursos disponíveis e inspecione a faixa antes do uso.",
  },
  {
    question: "Como recebo o acesso ao material?",
    answer:
      "Após a confirmação do pagamento, as instruções de acesso ao material em PDF serão enviadas por e-mail. O arquivo pode ser consultado em celular, tablet ou computador com leitor de PDF.",
  },
  {
    question: "Por quanto tempo o acesso fica disponível?",
    answer:
      "A oferta desta página informa pagamento único e acesso vitalício, sem mensalidades. Não há prazo de garantia informado no material; confira também as condições exibidas no checkout antes de concluir a compra.",
  },
];

export const checkoutUrl = "https://checkpay.me/?p=fichas-exercicios-gluteos-elastico";
