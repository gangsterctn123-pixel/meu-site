export const benefits = [
  "Demonstração visual completa, do posicionamento inicial à execução final",
  "Protocolos prontos com séries, repetições e pausas já definidas",
  "Progressão inteligente em 3 fases: 8 de Base, 13 de Evolução e 4 de Intensidade",
  "Orientações de execução e segurança integradas em todas as sessões",
];

export const galleryGroups = [
  {
    images: ["/gallery-1.png", "/gallery-2.png"],
    caption: "Ativação e Controle · Força no Agachamento",
  },
  {
    images: ["/gallery-3.png", "/gallery-4.png"],
    caption: "Trabalho em Quatro Apoios · Variações de Ponte",
  },
  {
    images: ["/gallery-5.png", "/gallery-6.png"],
    caption: "Avanço e Controle · Caminhada com Elástico",
  },
];

export const bonusIntro =
  "Além das 25 sessões G4, você também receberá 3 bônus exclusivos:";

export const bonusFootnote =
  "Todos os bônus estão incluídos gratuitamente e serão liberados imediatamente após a compra.";

export const bonuses = [
  {
    label: "Bônus #1",
    title: 'Guia "Comece Certo"',
    text: "Descubra qual intensidade de mini band utilizar, quantas repetições realizar, o número recomendado de rodadas e o tempo de descanso entre os movimentos.",
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
      "Para quem busca consultar movimentos de glúteos com elástico em casa ou na academia, escolhendo sessões compatíveis com sua condição e seu nível. Há 8 sessões iniciantes, 13 intermediárias e 4 avançadas. O conteúdo é educativo e não substitui avaliação ou orientação profissional; gestantes, menores, idosos, pessoas com cirurgia recente, dor persistente ou doenças crônicas devem buscar orientação antes de iniciar.",
  },
  {
    question: "De quais elásticos e apoios eu preciso?",
    answer:
      "As sessões usam mini band e faixa elástica longa. Algumas opções também pedem banco firme, cadeira, degrau antiderrapante, parede, apoio ou ancoragem própria. Escolha apenas movimentos compatíveis com os recursos disponíveis e inspecione a faixa antes do uso.",
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

export const checkoutUrl = "https://pay.wiapy.com/UUtG8o9BWZVF";
