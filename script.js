const questions = [
    {
        question: "Qual dessas atividades você mais gosta?",
        answers: [
            { text: "Escrever", profession: "Escritor" },
            { text: "Resolver problemas", profession: "Engenheiro" },
            { text: "Ajudar pessoas", profession: "Médico" },
            { text: "Criar algo novo", profession: "Designer" }
        ]
    },
    {
        question: "Você prefere trabalhar em:",
        answers: [
            { text: "Um ambiente calmo", profession: "Escritor" },
            { text: "Um escritório", profession: "Engenheiro" },
            { text: "Um hospital", profession: "Médico" },
            { text: "Um estúdio de design", profession: "Designer" }
        ]
    },
    {
        question: "Qual é a sua habilidade mais forte?",
        answers: [
            { text: "Criar histórias", profession: "Escritor" },
            { text: "Resolver problemas técnicos", profession: "Engenheiro" },
            { text: "Cuidar de outras pessoas", profession: "Médico" },
            { text: "Criatividade", profession: "Designer" }
        ]
    },
    {
        question: "Qual desses livros você mais gostaria de ler?",
        answers: [
            { text: "Romance", profession: "Escritor" },
            { text: "Ciência", profession: "Engenheiro" },
            { text: "Saúde", profession: "Médico" },
            { text: "Arte", profession: "Designer" }
        ]
    },
    {
        question: "O que você valoriza mais em um trabalho?",
        answers: [
            { text: "Liberdade de expressão", profession: "Escritor" },
            { text: "Estabilidade financeira", profession: "Engenheiro" },
            { text: "Impacto na vida das pessoas", profession: "Médico" },
            { text: "Inovação", profession: "Designer" }
        ]
    },
    {
        question: "Você se imagina:",
        answers: [
            { text: "Publicando um livro", profession: "Escritor" },
            { text: "Trabalhando em grandes projetos", profession: "Engenheiro" },
            { text: "Cuidando de pacientes", profession: "Médico" },
            { text: "Criando novos produtos", profession: "Designer" }
        ]
    },
    {
        question: "Qual destas atividades você acha mais empolgante?",
        answers: [
            { text: "Ler e escrever", profession: "Escritor" },
            { text: "Construir e projetar", profession: "Engenheiro" },
            { text: "Tratar e ajudar pessoas", profession: "Médico" },
            { text: "Desenvolver ideias criativas", profession: "Designer" }
        ]
    },
    {
        question: "Você se considera uma pessoa:",
        answers: [
            { text: "Sonhadora", profession: "Escritor" },
            { text: "Prática", profession: "Engenheiro" },
            { text: "Empática", profession: "Médico" },
            { text: "Inovadora", profession: "Designer" }
        ]
    },
    {
        question: "Qual destes seria seu trabalho dos sonhos?",
        answers: [
            { text: "Trabalhar para mim mesmo", profession: "Empreendedor" },
            { text: "Descobrir curas", profession: "Pesquisador" },
            { text: "Influenciar a sociedade", profession: "Político" },
            { text: "Produzir arte", profession: "Artista" }
        ]
    },
    {
        question: "Como você se vê em cinco anos?",
        answers: [
            { text: "Publicando bestsellers", profession: "Escritor" },
            { text: "Liderando projetos", profession: "Engenheiro" },
            { text: "Ajudando comunidades", profession: "Médico" },
            { text: "Criando um estúdio", profession: "Designer" }
        ]
    }
];

let currentQuestionIndex = 0;
let professionScore = {
    "Escritor": 0,
    "Engenheiro": 0,
    "Médico": 0,
    "Designer": 0,
    "Professor": 0,
    "Biólogo": 0,
    "Historiador": 0,
    "Artesão": 0,
    "Psicólogo": 0,
    "Publicitário": 0,
    "Cientista": 0,
    "Advogado": 0,
    "Programador": 0,
    "Jornalista": 0,
    "Artista": 0,
    "Empreendedor": 0,
    "Pesquisador": 0,
    "Político": 0
};

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const progressBar = document.getElementById('progress-bar');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');
const resultTitle = document.getElementById('result-title');
const resultImage = document.getElementById('result-image');
const resultDescription = document.getElementById('result-description');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    professionScore = {
        "Escritor": 0,
        "Engenheiro": 0,
        "Médico": 0,
        "Designer": 0,
        "Professor": 0,
        "Biólogo": 0,
        "Historiador": 0,
        "Artesão": 0,
        "Psicólogo": 0,
        "Publicitário": 0,
        "Cientista": 0,
        "Advogado": 0,
        "Programador": 0,
        "Jornalista": 0,
        "Artista": 0,
        "Empreendedor": 0,
        "Pesquisador": 0,
        "Político": 0
    };
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    showNextQuestion();
}

function showNextQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.profession));
        answerButtonsElement.appendChild(button);
    });
    updateProgressBar();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(profession) {
    professionScore[profession]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showNextQuestion();
    } else {
        showResult();
    }
}

function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + '%';
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let highestScore = 0;
    let mostSuitedProfession = '';

    for (const profession in professionScore) {
        if (professionScore[profession] > highestScore) {
            highestScore = professionScore[profession];
            mostSuitedProfession = profession;
        }
    }

    if (!mostSuitedProfession) {
        console.error("Nenhuma profissão foi selecionada corretamente.");
        resultTitle.innerText = "Erro ao determinar a profissão!";
        resultDescription.innerText = "Por favor, tente novamente.";
        return;
    }

    resultTitle.innerText = `Sua profissão ideal é: ${mostSuitedProfession}`;

    const professionImages = {
        "Escritor": "imagens/escritor.jpg",
        "Engenheiro": "imagens/engenheiro.jpg",
        "Médico": "imagens/medico.jpg",
        "Designer": "imagens/designer.jpg",
        "Professor": "imagens/professor.jpg",
        "Biólogo": "imagens/biologo.jpg",
        "Historiador": "imagens/historiador.jpg",
        "Artesão": "imagens/artesao.jpg",
        "Psicólogo": "imagens/psicologo.jpg",
        "Publicitário": "imagens/publicitario.jpg",
        "Cientista": "imagens/cientista.jpg",
        "Advogado": "imagens/advogado.jpg",
        "Programador": "imagens/programador.jpg",
        "Jornalista": "imagens/jornalista.jpg",
        "Artista": "imagens/artista.jpg",
        "Empreendedor": "imagens/empreendedor.jpg",
        "Pesquisador": "imagens/pesquisador.jpg",
        "Político": "imagens/politico.jpg"
    };

    const professionDescriptions = {
        "Escritor": "Você é criativo e gosta de se expressar através das palavras.",
        "Engenheiro": "Você é analítico e adora resolver problemas.",
        "Médico": "Você tem empatia e gosta de ajudar os outros.",
        "Designer": "Você é inovador e gosta de criar.",
        "Professor": "Você ama compartilhar conhecimento.",
        "Biólogo": "Você se interessa pela vida e pela natureza.",
        "Historiador": "Você adora entender o passado e suas histórias.",
        "Artesão": "Você tem habilidades manuais e gosta de criar com as mãos.",
        "Psicólogo": "Você é observador e se importa com a saúde mental dos outros.",
        "Publicitário": "Você é criativo e gosta de trabalhar com marketing.",
        "Cientista": "Você tem curiosidade e adora fazer experimentos.",
        "Advogado": "Você é argumentativo e busca justiça.",
        "Programador": "Você gosta de tecnologia e resolver problemas lógicos.",
        "Jornalista": "Você é curioso e gosta de investigar.",
        "Artista": "Você se expressa através da arte.",
        "Empreendedor": "Você é determinado e busca criar seu próprio negócio.",
        "Pesquisador": "Você se dedica a descobrir coisas novas.",
        "Político": "Você quer fazer a diferença na sociedade."
    };

    resultImage.src = professionImages[mostSuitedProfession];
    resultDescription.innerText = professionDescriptions[mostSuitedProfession];
}

restartBtn.addEventListener('click', startQuiz);

// Inicie o quiz quando a página carregar
startQuiz();
