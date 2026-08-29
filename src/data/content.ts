export const restaurant = {
  name: "Matuto's Grill",
  tagline: "Churrasco Grego",
  category: "Sanduicheria",
  rating: 4.7,
  reviewCount: 457,
  priceRange: "R$ 20–40",
  priceInformants: 48,
  phoneDisplay: "(81) 99939-8745",
  phoneHref: "+5581999398745",
  whatsappHref: "5581999398745",
  address: {
    line1: "Praça Teotônio Viléla, 155",
    line2: "Nossa Sra. das Dores, Caruaru - PE",
    cep: "55004-055",
    full: "Praça Teotônio Viléla, 155 - Nossa Sra. das Dores, Caruaru - PE, 55004-055",
  },
  plusCode: "P28H+67 Nossa Sra. das Dores, Caruaru - PE",
  closingTime: "23:30",
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  restaurant.address.full
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  restaurant.address.full
)}`;

export interface ServiceOption {
  label: string;
  icon: "online" | "dine-in" | "takeaway" | "delivery";
}

export const serviceOptions: ServiceOption[] = [
  { label: "Pedido on-line", icon: "online" },
  { label: "Refeição no local", icon: "dine-in" },
  { label: "Para viagem", icon: "takeaway" },
  { label: "Entrega sem contato", icon: "delivery" },
];

export interface MenuHighlight {
  name: string;
  description: string;
}

export const menuHighlights: MenuHighlight[] = [
  {
    name: "Molho Especial",
    description:
      "A receita da casa que dá nome ao sabor do Matuto's — cremoso, apimentado na medida certa e presente em quase todos os lanches do cardápio.",
  },
  {
    name: "Mortadela",
    description:
      "Fatiada na hora e generosa no lanche, é o pedido clássico de quem busca um sanduíche robusto e cheio de sabor.",
  },
  {
    name: "Pulled Pork",
    description:
      "Carne suína desfiada, cozida lentamente até ficar bem macia — uma opção que foge do tradicional sem perder a essência do churrasco.",
  },
];

export const menuNotes: string[] = [
  "Variedade de pães e sabores, do pão francês ao churrasco grego completo.",
  "Sucos naturais, com destaque para o de laranja com morango.",
  "Hambúrgueres artesanais elogiados por quem visita pela primeira vez.",
];

export const reviewSummary =
  "Os frequentadores dizem que a comida deste restaurante é deliciosa e de alta qualidade, com muitos destacando os saborosos hambúrgueres e o churrasco grego. Mencionam também os preços acessíveis e o ambiente agradável. Apreciam o serviço excepcional e atencioso da equipe.";

export const reviewQuotes: string[] = [
  "A comida é ótima e tem uma localização ótima, bem no centro da cidade.",
  "Ambiente muito agradável, ótimas opções de lanche!",
  "Melhor churrasco grego de Caruaru, com variedade de pães e sabores.",
];

export const visitorUpdate = {
  text: "Rodamos 150 kms, mas valeu a pena. Comida excelente, atendimento diferenciado.",
  time: "um mês atrás",
};

export interface Review {
  name: string;
  badge: string;
  time: string;
  text: string;
}

export const reviews: Review[] = [
  {
    name: "Niédja Martins",
    badge: "Local Guide · 38 avaliações · 165 fotos",
    time: "3 meses atrás",
    text: "Fomos super bem atendidos! O garçom fez questão de explicar todos os pratos disponíveis, um por um, o que achei um diferencial gigantesco, principalmente para um local com uma proposta mais popular, com mesas e cadeiras na calçada.",
  },
  {
    name: "Renato Pereira",
    badge: "9 avaliações · 3 fotos",
    time: "3 meses atrás",
    text: "Comida perfeita. Provamos boa parte do cardápio, tudo muito bom. O atendente Josef deu um show de cordialidade. O dono Jackson “Matuto”, uma simpatia. Deus abençoe vocês.",
  },
  {
    name: "Gabrielly Torres",
    badge: "Local Guide · 7 avaliações · 15 fotos",
    time: "5 meses atrás",
    text: "Adorei o pão francês com churrasco grego e o suco de laranja e morango é divino! Da próxima vez vou pedir uma jarra só pra mim 🥰",
  },
];

export const galleryCategories = [
  { label: "Cardápio", icon: "menu" as const },
  { label: "Gastronomia", icon: "food" as const },
  { label: "Ambiente", icon: "place" as const },
  { label: "Do proprietário", icon: "owner" as const },
];
