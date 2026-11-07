// Roteiro do vídeo, dividido em cenas (um parágrafo por cena).
// `visual` escolhe a ilustração animada que aparece atrás da legenda.

export type Visual =
  | { kind: "table"; variant: "dinner" | "cloth" }
  | { kind: "mushroom"; caption?: string }
  | { kind: "title"; kicker: string; title: string }
  | { kind: "location"; place: string; detail: string; coords: string }
  | { kind: "species"; name: string; detail: string; unknown?: boolean }
  | { kind: "statement"; text: string; accent?: string }
  | { kind: "book"; title: string; detail: string }
  | { kind: "question"; text: string; items?: string[] }
  | { kind: "dna"; label: string }
  | { kind: "molecule"; label: string; mode: "known" | "crossed" | "unknown" }
  | { kind: "eye"; variant: "camera" | "glitch" | "open"; label?: string }
  | { kind: "warning"; title: string; lines: string[] }
  | { kind: "timeline"; steps: string[] };

export type Scene = {
  id: string;
  text: string;
  visual: Visual;
};

export const SCENES: Scene[] = [
  {
    id: "jantar",
    text: "Imagine estar sentado à mesa, durante um jantar comum. De repente, pequenas pessoas começam a caminhar entre os pratos. Algumas correm, outras parecem conversar. Você fecha os olhos, olha novamente, mas elas continuam ali. E o mais assustador: parecem completamente reais.",
    visual: { kind: "table", variant: "dinner" },
  },
  {
    id: "em-comum",
    text: "Agora imagine descobrir que pessoas de lugares diferentes do mundo relataram algo muito parecido. Todas tinham uma coisa em comum: haviam comido determinados cogumelos.",
    visual: { kind: "mushroom", caption: "O ponto em comum" },
  },
  {
    id: "titulo",
    text: "Essa história parece saída de um filme de fantasia. Mas está ligada a um fenômeno estudado por cientistas: as alucinações liliputianas, em que alguém vê figuras humanas em miniatura. E uma espécie de cogumelo encontrada na Ásia está no centro desse mistério.",
    visual: {
      kind: "title",
      kicker: "Um fenômeno estudado pela ciência",
      title: "Alucinações liliputianas",
    },
  },
  {
    id: "papua",
    text: "Para entender o caso, precisamos voltar algumas décadas. Relatos antigos de alterações de comportamento após o consumo de cogumelos em Papua-Nova Guiné despertaram a curiosidade de pesquisadores.",
    visual: {
      kind: "location",
      place: "Papua-Nova Guiné",
      detail: "Relatos antigos",
      coords: "6°S · 147°E",
    },
  },
  {
    id: "yunnan",
    text: "Enquanto isso, na província de Yunnan, na China, um cogumelo silvestre fazia parte da culinária local. Seu nome científico é Lanmaoa asiatica. Ele pode ser consumido como alimento quando preparado adequadamente, mas há relatos de intoxicação associados ao consumo insuficientemente cozido.",
    visual: {
      kind: "species",
      name: "Lanmaoa asiatica",
      detail: "Yunnan, China",
    },
  },
  {
    id: "homenzinhos",
    text: "O detalhe mais estranho não é apenas a possibilidade de alucinar. É o conteúdo dessas visões. Algumas pessoas dizem enxergar homenzinhos andando sobre móveis, atravessando cômodos ou se movimentando perto da comida. Em vez de formas abstratas e luzes coloridas, surgem personagens completos, com braços, pernas e movimentos reconhecíveis.",
    visual: { kind: "table", variant: "dinner" },
  },
  {
    id: "toalha",
    text: "Um relato especialmente curioso descreve pequenas figuras marchando debaixo de uma toalha de mesa. A pessoa acreditava enxergar uma multidão de seres com poucos centímetros de altura.",
    visual: { kind: "table", variant: "cloth" },
  },
  {
    id: "aviso-real",
    text: "É importante deixar claro: ninguém encontrou seres minúsculos de verdade. Essas imagens são experiências subjetivas de pessoas intoxicadas. Mas, para quem as vê, a sensação pode ser convincente a ponto de provocar medo e confusão.",
    visual: {
      kind: "statement",
      text: "Ninguém encontrou seres minúsculos de verdade",
      accent: "de verdade",
    },
  },
  {
    id: "gulliver",
    text: "O nome alucinação liliputiana vem de Lilipute, a terra dos pequenos habitantes do romance As Viagens de Gulliver. Na medicina, o termo descreve a percepção de pessoas, animais ou objetos muito menores do que seriam na realidade.",
    visual: {
      kind: "book",
      title: "As Viagens de Gulliver",
      detail: "Lilipute, a terra dos pequenos habitantes",
    },
  },
  {
    id: "por-que",
    text: "Então surge uma pergunta fascinante: por que um cérebro humano produziria justamente imagens de pessoas pequenas?",
    visual: { kind: "question", text: "Por que pessoas pequenas?" },
  },
  {
    id: "filipinas",
    text: "A investigação ganhou uma nova pista quando pesquisadores estudaram relatos nas Filipinas. Comunidades locais conheciam cogumelos associados a experiências parecidas. Amostras foram coletadas e comparadas geneticamente com materiais de outras regiões. A análise apontou uma conexão com a espécie Lanmaoa asiatica, já conhecida na China.",
    visual: { kind: "dna", label: "Filipinas ↔ China" },
  },
  {
    id: "psilocibina",
    text: "Quando ouvimos falar de cogumelos alucinógenos, pensamos imediatamente na psilocibina. Ela é conhecida por seus efeitos sobre a percepção. Mas os estudos sobre Lanmaoa asiatica não identificaram uma explicação simples baseada nos compostos psicoativos mais conhecidos.",
    visual: { kind: "molecule", label: "Psilocibina", mode: "crossed" },
  },
  {
    id: "substancia",
    text: "Isso significa que os cientistas podem estar diante de uma substância ainda não caracterizada. Até que ela seja isolada, testada e identificada, não é possível afirmar com segurança qual molécula provoca as experiências, nem como age no sistema nervoso.",
    visual: { kind: "molecule", label: "Substância desconhecida", mode: "unknown" },
  },
  {
    id: "incerteza",
    text: "E é justamente essa incerteza que torna a história tão intrigante. Uma espécie aparentemente comum pode esconder uma química que ainda não compreendemos.",
    visual: { kind: "mushroom", caption: "Uma química ainda desconhecida" },
  },
  {
    id: "realidade",
    text: "Mas o mistério vai além dos fungos. Ele toca uma das perguntas mais profundas da neurociência: o que significa enxergar a realidade?",
    visual: { kind: "eye", variant: "open", label: "O que significa enxergar a realidade?" },
  },
  {
    id: "camera",
    text: "Nós costumamos imaginar os olhos como câmeras. A luz entra, a imagem aparece e pronto. Só que o cérebro não funciona como uma tela passiva. Ele interpreta sinais, compara informações com memórias, reconhece padrões e constrói uma experiência coerente do ambiente.",
    visual: { kind: "eye", variant: "camera" },
  },
  {
    id: "perturbados",
    text: "Mas quando certos processos cerebrais são perturbados, a percepção pode se afastar do que realmente está diante dos olhos. Uma imagem inexistente pode parecer tão sólida quanto um objeto real. O cérebro não está apenas registrando o mundo: está participando ativamente da experiência de vê-lo.",
    visual: { kind: "eye", variant: "glitch" },
  },
  {
    id: "questoes",
    text: "As alucinações liliputianas levantam questões difíceis. Será que determinados circuitos visuais estão envolvidos na percepção do tamanho das pessoas? Será que a memória e a expectativa ajudam a dar forma a essas figuras? Ou diferentes mecanismos podem produzir experiências semelhantes?",
    visual: {
      kind: "question",
      text: "Questões em aberto",
      items: ["Circuitos visuais?", "Memória e expectativa?", "Mecanismos diferentes?"],
    },
  },
  {
    id: "sem-resposta",
    text: "Por enquanto, não existe uma resposta definitiva.",
    visual: { kind: "statement", text: "Não existe uma resposta definitiva", accent: "definitiva" },
  },
  {
    id: "especies",
    text: "A pesquisa sobre esses cogumelos também revelou algo importante sobre a própria natureza. Ao comparar exemplares do gênero Lanmaoa, cientistas identificaram diferenças genéticas que ajudaram a reconhecer espécies até então não descritas.",
    visual: { kind: "dna", label: "Novas espécies de Lanmaoa" },
  },
  {
    id: "penicilina",
    text: "Há outro motivo para os pesquisadores se interessarem pelo assunto. Ao longo da história, substâncias produzidas por fungos contribuíram para descobertas científicas importantes. A penicilina é um exemplo famoso. Mas isso não significa que esse cogumelo seja um medicamento ou que suas toxinas tenham benefício comprovado.",
    visual: { kind: "molecule", label: "Penicilina", mode: "known" },
  },
  {
    id: "perigo",
    text: "Pelo contrário. A intoxicação pode ser perigosa. Buscar essas experiências por conta própria não é uma forma segura de explorar a consciência. O valor da investigação está em estudar o fenômeno com métodos controlados, e não em experimentar o fungo.",
    visual: {
      kind: "warning",
      title: "A intoxicação pode ser perigosa",
      lines: ["Não é uma forma segura de explorar a consciência", "Ciência se faz com métodos controlados"],
    },
  },
  {
    id: "caminho",
    text: "Agora pense no caminho percorrido por essa história. Primeiro, relatos estranhos em comunidades distantes. Depois, descrições de pequenos humanos sobre mesas e pratos. Mais tarde, análises genéticas, estudos químicos e novas perguntas sobre o cérebro.",
    visual: {
      kind: "timeline",
      steps: ["Relatos estranhos", "Pequenos humanos à mesa", "Genética, química e cérebro"],
    },
  },
  {
    id: "lenda",
    text: "O que parecia uma lenda se tornou um problema científico legítimo. Não porque os pequenos seres existam, mas porque as pessoas realmente podem ter experiências perceptivas desse tipo.",
    visual: { kind: "statement", text: "De lenda a problema científico", accent: "científico" },
  },
  {
    id: "olhos-abertos",
    text: "E talvez o aspecto mais perturbador seja este: quando abrimos os olhos, sentimos que estamos diante do mundo exatamente como ele é.",
    visual: { kind: "eye", variant: "open" },
  },
  {
    id: "invisiveis",
    text: "Um cogumelo, uma doença ou uma alteração neurológica pode revelar o quanto nossa percepção depende de processos invisíveis.",
    visual: { kind: "eye", variant: "glitch", label: "Processos invisíveis" },
  },
  {
    id: "ainda-nao",
    text: "Ainda não sabemos qual substância está por trás dessas visões associadas a Lanmaoa asiatica. Também não sabemos por que algumas experiências apresentam figuras humanas tão específicas. Mas cada nova investigação aproxima os cientistas de perguntas que atravessam a filosofia e a medicina há séculos.",
    visual: {
      kind: "species",
      name: "Lanmaoa asiatica",
      detail: "Substância ainda desconhecida",
      unknown: true,
    },
  },
  {
    id: "sentidos",
    text: "Até onde podemos confiar nos nossos sentidos? E quanto da realidade que percebemos é resultado da interpretação do cérebro?",
    visual: { kind: "question", text: "Até onde podemos confiar nos nossos sentidos?" },
  },
  {
    id: "final",
    text: "Talvez a maior descoberta dessa história não seja a existência de um cogumelo capaz de provocar visões extraordinárias. Talvez seja perceber que o instrumento com o qual conhecemos o mundo, o nosso próprio cérebro, continua sendo um dos maiores mistérios da natureza.",
    visual: {
      kind: "title",
      kicker: "O instrumento com o qual conhecemos o mundo",
      title: "O maior mistério da natureza",
    },
  },
];
