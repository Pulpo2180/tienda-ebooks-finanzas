
/**
 * Catálogo de ebooks em português sobre educação financeira.
 */

import { Book } from './data';

const PRICE = 9.99;

/** Converte texto editorial em uma seção HTML segura para exibição. */
function createSection(title: string, paragraphs: string[]): string {
  const content = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('\n');
  return `<h2>${title}</h2>\n${content}`;
}

/** Cria uma edição em português com introdução, capítulos e encerramento. */
function createPortugueseBook({
  id,
  title,
  description,
  cover,
  sections,
}: {
  id: string;
  title: string;
  description: string;
  cover: string;
  sections: { title: string; paragraphs: string[] }[];
}): Book {
  const content = [
    `<h1>${title}</h1>`,
    `<p>${description}</p>`,
    ...sections.map(section => createSection(section.title, section.paragraphs)),
    '<p><em>Este material é educativo e não constitui aconselhamento financeiro personalizado. Considere sua realidade, os riscos envolvidos e as regras aplicáveis no seu país antes de tomar decisões.</em></p>',
  ].join('\n');

  return {
    id,
    title,
    description,
    cover,
    lang: 'pt',
    price: PRICE,
    content,
  };
}

/** Edições introdutórias em português para o catálogo da loja. */
export const portugueseBooks: Book[] = [
  createPortugueseBook({
    id: 'habitos-financeiros-pt',
    title: 'Hábitos de Finanças Pessoais',
    description: 'Uma leitura teórica sobre hábitos, emoções e princípios para construir uma relação mais sustentável com o dinheiro.',
    cover: 'https://pub-cdn.sider.ai/u/U0X7H47829Y/web-coder/6a399748a419c8a5108fef65/resource/3183dff1-01dc-4814-bf2f-daa22c28cc81.jpg',
    sections: [
      {
        title: 'Introdução — Suas finanças refletem seus hábitos',
        paragraphs: [
          'A tranquilidade financeira depende de comportamentos repetidos, não apenas do salário. Pessoas com rendas parecidas podem ter resultados muito diferentes por causa dos hábitos, das emoções e das decisões cotidianas.',
          'Esta edição é teórica: propõe compreender como agimos antes de tentar mudar. A lucidez sustentada é uma forma sólida de liberdade.',
        ],
      },
      {
        title: 'Capítulo 1 — Os fundamentos invisíveis dos hábitos financeiros',
        paragraphs: [
          'Um hábito é uma resposta que se torna automática e poupa energia. No dinheiro, o circuito pode começar com uma situação — receber, sentir estresse ou ver uma oferta —, seguir com uma ação e terminar com alívio imediato.',
          'A motivação varia; sistemas simples ajudam a manter o rumo. A identidade também importa: mudar não é apenas fazer um orçamento, mas construir a imagem de alguém que toma decisões com clareza.',
          'A busca por recompensa imediata, a aversão à perda e a influência do ambiente podem afetar nossas escolhas. Compreender esses mecanismos ajuda a desenhar hábitos mais sustentáveis, sem depender de força de vontade constante.',
        ],
      },
      {
        title: 'Capítulo 2 — A psicologia do dinheiro',
        paragraphs: [
          'As primeiras experiências familiares podem formar crenças silenciosas sobre dinheiro. Algumas pessoas evitam olhar para as contas; outras esperam que o dinheiro resolva tudo, usam o consumo para expressar status ou vivem em alerta constante.',
          'Medo, culpa, comparação e tédio podem influenciar compras e decisões. Em vez de transformar cada erro em julgamento moral, vale observar a emoção e a história que acompanham o comportamento.',
          'Questionar uma crença herdada e substituí-la por uma ideia mais útil abre espaço para decisões conscientes.',
        ],
      },
      {
        title: 'Capítulo 3 — Os pilares da organização financeira',
        paragraphs: [
          'Renda é fluxo, não patrimônio. Uma renda alta não garante estabilidade se todos os recursos forem comprometidos. O espaço entre o que entra e as obrigações ajuda a criar opções.',
          'As despesas essenciais sustentam a vida; as despesas expressivas podem refletir valores e pertencimento; os gastos automáticos podem consumir recursos sem trazer satisfação duradoura.',
          'Poupar significa reservar recursos para proteção, projetos e possibilidades futuras. Dívidas antecipam consumo e podem reduzir a flexibilidade por causa dos juros e dos compromissos assumidos.',
        ],
      },
      {
        title: 'Capítulo 4 — Constância, simplicidade e sustentabilidade',
        paragraphs: [
          'Pequenos passos consistentes costumam ser mais sustentáveis do que restrições extremas. Um sistema simples pode ser retomado depois de um mês difícil e não exige atenção permanente.',
          'Planejar quando se está calmo, separar recursos por finalidade e adicionar fricção a compras impulsivas pode reduzir decisões feitas sob pressão.',
          'Uma recaída não define a identidade de ninguém. Observar o que aconteceu, ajustar o ambiente e retomar o plano com serenidade fortalece a continuidade.',
        ],
      },
      {
        title: 'Capítulo 5 — Da estabilidade ao crescimento',
        paragraphs: [
          'Patrimônio representa opções futuras e margem para atravessar períodos sem depender exclusivamente do próximo salário. Proteção, liquidez e decisões proporcionais ajudam a evitar retrocessos.',
          'Investir envolve incerteza, prazo e riscos. É importante compreender o que está sendo adquirido, evitar promessas de ganhos garantidos e não expor recursos necessários no curto prazo.',
          'Crescer é construir margem, protegê-la e permitir que o tempo trabalhe, sem confundir riqueza com exibição.',
        ],
      },
      {
        title: 'Conclusão — Uma nova relação com o dinheiro',
        paragraphs: [
          'As finanças são hábitos, não veredictos. Observe o dinheiro sem culpa nem comparação e pergunte: “Isso me dá liberdade ou a tira?”. Uma vida sustentável combina cuidado, proteção, valores e possibilidades futuras.',
        ],
      },
    ],
  }),
  createPortugueseBook({
    id: 'inversion-esencial-es',
    title: 'Investimento Essencial: do zero à confiança',
    description: 'Uma introdução teórica aos fundamentos do investimento, com foco em prazo, risco, diversificação e tranquilidade.',
    cover: 'https://pub-cdn.sider.ai/u/U0X7H47829Y/web-coder/6a399748a419c8a5108fef65/resource/3b1a2172-10aa-4984-a7f3-b017f5318952.jpg',
    sections: [
      {
        title: 'Introdução — Investir é para quem tem paciência',
        paragraphs: [
          'Investir não é adivinhar o mercado. É permitir que o capital participe do crescimento produtivo ao longo do tempo, aceitando a incerteza e preservando a capacidade de viver no presente.',
          'Esta leitura apresenta conceitos como risco, inflação, diversificação e custos para ajudar o leitor a compreender antes de agir. Não contém recomendações de compra.',
        ],
      },
      {
        title: 'Capítulo 1 — O que realmente significa investir',
        paragraphs: [
          'Investir é abrir mão de parte da liquidez atual em busca de uma capacidade futura maior. Essa expectativa nunca é uma garantia: retornos elevados e certos não existem sem riscos relevantes.',
          'Poupança e investimento têm funções diferentes. Uma reserva acessível pode proteger contra emergências; investimentos estão sujeitos a oscilações e são mais adequados a objetivos compatíveis com seu prazo.',
          'Os juros compostos permitem que rendimentos gerem novos rendimentos ao longo do tempo, mas não eliminam perdas nem garantem um resultado específico.',
        ],
      },
      {
        title: 'Capítulo 2 — Rentabilidade, risco, tempo e inflação',
        paragraphs: [
          'A rentabilidade precisa ser analisada com prazo, inflação e custos. Uma taxa nominal não mostra sozinha quanto poder de compra foi preservado.',
          'Risco inclui a possibilidade de perder valor ou precisar vender em um momento desfavorável. O mesmo investimento pode ser inadequado para uma necessidade próxima e mais compatível com um objetivo distante.',
          'A volatilidade descreve oscilações de preço, mas não prevê o resultado final. A inflação reduz o poder de compra; investir também envolve riscos, por isso é importante compreender ambos.',
        ],
      },
      {
        title: 'Capítulo 3 — Os principais veículos de investimento',
        paragraphs: [
          'Dinheiro em conta e depósitos podem oferecer disponibilidade ou previsibilidade, mas talvez não acompanhem a inflação. Títulos de renda fixa envolvem risco de crédito, de taxa de juros e de inflação.',
          'Ações representam participação em empresas e podem variar bastante de valor. Fundos e ETFs podem reunir muitos ativos, mas é necessário entender sua composição, custos, regras e riscos.',
          'Imóveis podem gerar renda, mas exigem capital, manutenção e tempo para venda. Ativos complexos ou alavancados podem envolver riscos maiores e não devem ser tratados como atalhos.',
        ],
      },
      {
        title: 'Capítulo 4 — A psicologia do investidor',
        paragraphs: [
          'O medo pode levar a vender durante uma queda; a euforia pode incentivar compras sem avaliação. Notícias frequentes e comparação com outras pessoas podem intensificar essas reações.',
          'Um horizonte definido, diversificação e revisões periódicas ajudam a reduzir decisões impulsivas. Não fazer uma alteração pode ser uma decisão deliberada quando o plano continua coerente.',
          'Uma estratégia precisa permitir que a pessoa atravesse períodos difíceis sem assumir riscos que não compreende ou não pode suportar.',
        ],
      },
      {
        title: 'Capítulo 5 — Prazo, diversificação e proteção',
        paragraphs: [
          'Diversificar distribui recursos entre ativos, setores ou regiões, reduzindo a dependência de uma única hipótese. Isso não elimina perdas nem protege contra todas as quedas.',
          'Uma reserva para necessidades próximas pode diminuir a chance de vender investimentos em um momento desfavorável. O tamanho e a composição do plano precisam considerar objetivos, prazo e tolerância a perdas.',
          'Desconfie de urgência, retornos garantidos e explicações confusas. Antes de investir, entenda custos, liquidez, riscos e a regulamentação aplicável no seu país.',
        ],
      },
      {
        title: 'Conclusão — Sua identidade como investidor',
        paragraphs: [
          'Confiança não é prever o mercado. É compreender o que se faz, respeitar o prazo, diversificar de forma adequada e não depender de promessas ou de um único prognóstico.',
        ],
      },
    ],
  }),
  createPortugueseBook({
    id: 'orcamento-dividas-pt',
    title: 'Orçamento e Dívidas: retome o controle',
    description: 'Uma leitura teórica sobre orçamento, dívidas, prioridades e maneiras de recuperar margem sem culpa.',
    cover: 'https://pub-cdn.sider.ai/u/U0X7H47829Y/web-coder/6a399748a419c8a5108fef65/resource/553d03dc-4418-47e0-969c-75b8189cb53d.jpg',
    sections: [
      {
        title: 'Introdução — Recuperar o controle sem culpa',
        paragraphs: [
          'Trabalhar o mês inteiro e sentir que o dinheiro desapareceu, ou pagar uma dívida sem perceber que ela diminui, pode gerar ansiedade. Isso não é prova de falta de inteligência: muitas vezes o ambiente facilita gastar e dificulta acompanhar.',
          'A organização começa com compreensão e visibilidade, não com pressão ou exigências impossíveis.',
        ],
      },
      {
        title: 'Capítulo 1 — O mapa invisível dos gastos e das dívidas',
        paragraphs: [
          'Gastos automáticos costumam seguir um circuito: uma situação dispara uma conduta e a conduta oferece alívio imediato. Identificar o disparador ajuda a compreender o padrão sem transformá-lo em culpa.',
          'O pagamento mínimo pode evitar um atraso, mas não significa que a dívida esteja sendo reduzida rapidamente. Juros, tarifas e prazo podem manter o saldo por mais tempo.',
          'Mais renda, por si só, não garante organização. Entender os compromissos e observar o fluxo é o primeiro passo para voltar a dirigir.',
        ],
      },
      {
        title: 'Capítulo 2 — O orçamento como linguagem',
        paragraphs: [
          'Um orçamento descreve como a renda será distribuída e quais prioridades ela deve apoiar. Não é uma punição: é uma forma de aproximar decisões cotidianas dos valores pessoais.',
          'Uma estrutura simples pode separar o que sustenta a vida, o que constrói o futuro e o que permite desfrutar do presente. Os valores e proporções dependem da realidade de cada pessoa.',
          'Um plano fácil de revisar e retomar tende a ser mais útil do que um sistema complexo que exige atenção constante.',
        ],
      },
      {
        title: 'Capítulo 3 — O que significa dever',
        paragraphs: [
          'Uma dívida antecipa recursos futuros para atender uma necessidade ou desejo atual. Além dos juros, ela pode reduzir o fluxo disponível, a flexibilidade e a tranquilidade.',
          'O crédito pode financiar objetivos de longo prazo, mas também pode sustentar consumo que perde valor antes de ser pago. Avalie o custo total, as condições e o efeito dos pagamentos futuros.',
          'Se houver dificuldade para pagar, procure o credor pelos canais oficiais e pergunte sobre opções. Confirme os termos por escrito e desconfie de promessas de eliminação garantida de dívidas.',
        ],
      },
      {
        title: 'Capítulo 4 — Prioridades e organização sustentável',
        paragraphs: [
          'Simplicidade ajuda a manter um plano em períodos cansativos. Comece identificando necessidades essenciais, compromissos e prioridades, sem tentar resolver tudo ao mesmo tempo.',
          'Pequenas decisões consistentes podem ser mais sustentáveis do que uma restrição extrema. Se o plano falhar em um mês difícil, observe o que mudou e retome com ajustes realistas.',
          'Organizar lembretes, separar recursos por finalidade e decidir com antecedência pode diminuir escolhas feitas sob pressão.',
        ],
      },
      {
        title: 'Capítulo 5 — Da pressão à tranquilidade',
        paragraphs: [
          'Uma reserva acessível pode ajudar a lidar com despesas inesperadas sem recorrer imediatamente a crédito caro. Mesmo uma margem pequena pode oferecer mais opções.',
          'Cada compromisso quitado pode liberar parte do fluxo futuro. A direção não exige vigilância ansiosa: exige compreender as obrigações e revisar o plano com regularidade.',
          'O objetivo não é controlar cada centavo, mas conseguir enfrentar imprevistos sem comprometer o que é importante.',
        ],
      },
      {
        title: 'Conclusão — Dirigir com clareza',
        paragraphs: [
          'Retomar o controle é passar de automatismos a escolhas mais conscientes, da pressão à simplicidade e da falta de margem a possibilidades graduais. Organize o essencial, construa o futuro e preserve espaço para viver.',
        ],
      },
    ],
  }),
];
