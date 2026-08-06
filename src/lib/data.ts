export const steps = [
  {
    number: "01",
    title: "Conte Sua História",
    description:
      "Clique no botão e fale com nosso time pelo WhatsApp. Conte uma lembrança, um apelido, algo que só vocês dois entendem — atendimento 100% humano, sem formulário.",
  },
  {
    number: "02",
    title: "Escolha Seu Estilo Musical",
    description:
      "Escolha o gênero e o clima que combinam — de baladas emotivas a hinos animados — e confirme com um Pix seguro, direto na conversa.",
  },
  {
    number: "03",
    title: "Produção Profissional",
    description:
      "Nossos compositores e músicos transformam sua história em letra, melodia e uma faixa totalmente produzida.",
  },
  {
    number: "04",
    title: "Receba Sua Música",
    description:
      "Receba sua música finalizada, com qualidade de estúdio, direto no seu WhatsApp em até 1 hora — pronta para emocionar.",
  },
];

export const comparisonRows: {
  label: string;
  ours: boolean | string;
  others: boolean | string;
}[] = [
  { label: "Personalização", ours: "100% letra exclusiva", others: "Modelos genéricos" },
  { label: "Qualidade de Áudio", ours: "Produção de estúdio", others: "Básica / sintética" },
  { label: "Entrega Rápida", ours: "Até 1 hora", others: "1–2 semanas" },
  { label: "Revisões Incluídas", ours: "Uma revisão gratuita", others: "Cobrado à parte" },
  { label: "Músicos Profissionais", ours: true, others: false },
  { label: "Suporte ao Cliente", ours: "Atendimento humano, 7 dias", others: "Somente e-mail" },
  { label: "Processo de Compra Fácil", ours: true, others: false },
];

// Only claims we fully control and can stand behind — no vanity counts we can't verify yet.
export const statistics = [
  { value: 1, suffix: "h", label: "Entrega Média" },
  { value: 100, suffix: "%", label: "Atendimento Humano" },
  { value: 7, suffix: "", label: "Dias de Suporte por Semana" },
  { value: 1, suffix: "", label: "Revisão Grátis Incluída" },
];

export const faqs = [
  {
    question: "Quanto tempo leva para receber minha música?",
    answer:
      "A maioria das músicas é entregue em até 1 hora após a confirmação do pedido — direto no seu WhatsApp.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "É simples: você fala com a nossa equipe pelo WhatsApp, combina os detalhes da música e paga via Pix, direto na conversa. Assim que o pagamento é confirmado, começamos a produção.",
  },
  {
    question: "Vou falar com uma pessoa de verdade ou com um robô?",
    answer:
      "Com uma pessoa de verdade. Todo o atendimento — do primeiro \"oi\" até a entrega — é feito manualmente pela nossa equipe, sem robôs nem respostas automáticas.",
  },
  {
    question: "Posso pedir revisões?",
    answer:
      "Sim — todo pedido inclui uma rodada de revisão gratuita. É só nos contar o que gostaria de ajustar e nossa equipe atualiza sua música.",
  },
  {
    question: "Quem é o dono dos direitos da minha música?",
    answer:
      "Você. Assim que sua música for entregue, você recebe os direitos completos de uso pessoal para guardar, compartilhar e curtir como quiser.",
  },
  {
    question: "Quais gêneros musicais estão disponíveis?",
    answer:
      "Oferecemos Pop, Rock, Sertanejo, Jazz, Rap, R&B, Soul, Gospel e muito mais. Você pode escolher seu estilo preferido durante o processo de pedido.",
  },
  {
    question: "Posso usar a música comercialmente?",
    answer:
      "Pedidos padrão incluem direitos de uso pessoal. Se precisar de direitos de uso comercial, selecione o complemento de licença comercial no checkout.",
  },
  {
    question: "E se eu não gostar da música?",
    answer:
      "Você tem garantia de 7 dias. Peça sua revisão gratuita e, se ainda assim não ficar satisfeito, devolvemos seu dinheiro dentro desse prazo.",
  },
];

// Moments that justify the gift — helps different visitor motivations
// self-identify without diluting the single Father's Day offer.
export const fatherMoments = [
  { title: "Dia dos Pais", description: "O presente perfeito pra celebrar o dia dele." },
  { title: "Aniversário Dele", description: "Transforme mais um ano de vida numa trilha sonora." },
  { title: "Ele Mora Longe", description: "Uma forma de estar perto, mesmo à distância." },
  {
    title: "Um \"Obrigado\" Que Faltou Dizer",
    description: "Diga em música o que é difícil dizer de frente.",
  },
  { title: "Aposentadoria Dele", description: "Celebre uma vida inteira de trabalho e dedicação." },
  { title: "Só Porque Sim", description: "Não precisa de data especial pra emocionar quem você ama." },
];

// Verifiable trust signals instead of unattributed "as seen in" press logos.
export const trustBadges = [
  "🔒 Pagamento seguro via Pix",
  "👤 Atendimento 100% humano",
  "⚡ Entrega em até 1 hora",
  "🎵 Letra 100% personalizada",
  "✅ Garantia de satisfação",
  "💬 Resposta em minutos no WhatsApp",
];
