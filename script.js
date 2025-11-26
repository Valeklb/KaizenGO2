// ======================================================
// KAIZENGO v4.0 – JS Corrigido, Otimizado, Tutorial V2
// ======================================================

// ========== LOGIN ==========
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");
const badgeRH = document.getElementById("badge-rh");
const cardPainelGestor = document.getElementById("card-painel-gestor");

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("usuarios")) || [];
  const found = users.find((u) => u.matricula === user && u.senha === pass);

  if (found) {
    localStorage.setItem("usuarioLogado", JSON.stringify(found));

    document.getElementById("login-screen").classList.add("hidden");
    showScreen("home");
    logoutBtn.classList.remove("hidden");

    const welcomeTitle = document.querySelector(".welcome");

    if (found.tipo === "gestor") {
      welcomeTitle.textContent = `Bem-vindo(a), ${found.nome} 👋`;
      badgeRH.classList.remove("hidden");
      cardPainelGestor.classList.remove("hidden");
    } else {
      welcomeTitle.textContent = "Bem-vindo(a) 👋";
      badgeRH.classList.add("hidden");
      cardPainelGestor.classList.add("hidden");
    }
  } else {
    loginError.style.display = "block";
  }
});

// ========== PRIMEIRO ACESSO ==========
document.getElementById("first-access").addEventListener("click", () => {
  toggleScreens("login-screen", "register-screen");
});
document.getElementById("voltar-login").addEventListener("click", () => {
  toggleScreens("register-screen", "login-screen");
});

// ========== GESTORES AUTORIZADOS ==========
const matriculasGestores = {
  3081270: "Gestor Yamaha",
  3080943: "Gestor Yamaha",
  3081492: "Gestor Yamaha",
  3081495: "Gestor Yamaha",

  // NOVOS
  77709: "BELETI",
  49394: "ONISHI",
  3081146: "MARIO JUNIOR",
  77719: "ANA LUIZA",
  3079423: "UEMA",
  4010874: "SHERMAN",
  3079126: "MUKAI",
  77772: "SILVIA LOURENCO",
  3078635: "NAYARA OLIVEIRA",
  61927: "GUILHERME TAKAHASHI",
  1252: "MIKI",
  49049: "KENZO",
  3078217: "WESLEI MACHADO",
  3080155: "SATO",
};

// ========== CADASTRO ==========
document.getElementById("register-btn").addEventListener("click", () => {
  const matricula = document.getElementById("reg-matricula").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const senha = document.getElementById("reg-senha").value.trim();
  const confirma = document.getElementById("reg-confirma").value.trim();

  if (!matricula || !email || !senha || !confirma)
    return alert("Preencha todos os campos!");

  if (senha !== confirma) return alert("As senhas não conferem!");

  if (!matriculasGestores[matricula])
    return alert("Apenas matrículas autorizadas podem acessar.");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.some((u) => u.matricula === matricula))
    return alert("Essa matrícula já possui cadastro.");

  usuarios.push({
    matricula,
    email,
    senha,
    tipo: "gestor",
    nome: matriculasGestores[matricula],
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  toggleScreens("register-screen", "login-screen");
});

// ========== RESET DE SENHA ==========
document.getElementById("forgot-pass").addEventListener("click", () => {
  toggleScreens("login-screen", "reset-screen");
});
document.getElementById("voltar-login-reset").addEventListener("click", () => {
  toggleScreens("reset-screen", "login-screen");
});

document.getElementById("reset-btn").addEventListener("click", () => {
  const matricula = document.getElementById("reset-matricula").value.trim();
  const nova = document.getElementById("reset-nova-senha").value.trim();
  const confirma = document.getElementById("reset-confirma-senha").value.trim();

  if (!matricula || !nova || !confirma)
    return alert("Preencha todos os campos!");

  if (nova !== confirma) return alert("As senhas não conferem!");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex((u) => u.matricula === matricula);

  if (index === -1) return alert("Matrícula não encontrada!");

  usuarios[index].senha = nova;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Senha redefinida com sucesso!");
  toggleScreens("reset-screen", "login-screen");
});

// ========== LOGOUT ==========
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  showScreen("login-screen");
  logoutBtn.classList.add("hidden");
  badgeRH.classList.add("hidden");
  cardPainelGestor.classList.add("hidden");
});

// ========== TROCA DE TELAS ==========
document.querySelectorAll(".card[data-screen]").forEach((card) => {
  card.addEventListener("click", () => showScreen(card.dataset.screen));
});
document
  .querySelectorAll(".back")
  .forEach((b) => b.addEventListener("click", () => showScreen("home")));

function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);

  if (id === "home") {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const welcome = document.querySelector(".welcome");

    if (usuario && usuario.tipo === "gestor") {
      welcome.textContent = `Bem-vindo(a), ${usuario.nome} 👋`;
    }
  }
}

function toggleScreens(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(from).classList.add("hidden");
  const toEl = document.getElementById(to);
  toEl.classList.remove("hidden");
  toEl.classList.add("active");
  window.scrollTo(0, 0);
}

// =====================================
// ROTAS
// =====================================

const rotas = [
  {
    id: "01",
    nome: "Rota 01 - Av. Djalma Batista",
    caminho: "Av. Djalma Batista, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=103dJy2E-GKeFox94_UdyDz6jAJKlpw0&ehbc=2E312",
  },
  {
    id: "02",
    nome: "Rota 02 - Av. Governador José Lindoso",
    caminho: "Avenida Governador José Lindoso, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1D6E_wKKPmtHQ2u75LU0f_iH9Ao3CQXg&ehbc=2E312F",
  },
  {
    id: "03",
    nome: "Rota 03 - R. Dom João - Parque 10",
    caminho: "R. Dom João - Parque 10, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1Ljgv0JKc77Hn4rTmW0kz-ktfnmVDs9I&ehbc=2E312F",
  },
  {
    id: "04",
    nome: "Rota 04 - Lírio do Vale",
    caminho: "Rua Jequié, Manaus - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1isZ0Dv3C61z5nI8NrUDyyuRm_lQjxqM&ehbc=2E312F",
  },
  {
    id: "05",
    nome: "Rota 05 - Viver Melhor",
    caminho: "Av. Comendador José Cruz - AM",
    googleLink:
      "https://www.google.com/maps/d/embed?mid=1MZ0IUlukpe4G5JISXl8vI9q8a_bkkLM&ehbc=2E312F",
  },
];

function renderRotas(filtro = "") {
  const c = document.getElementById("rotas-container");
  c.innerHTML = "";

  const filtradas = rotas.filter(
    (r) =>
      r.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      r.caminho.toLowerCase().includes(filtro.toLowerCase())
  );

  if (filtradas.length === 0) {
    c.innerHTML = `<p class="muted">Nenhuma rota encontrada.</p>`;
    return;
  }

  filtradas.forEach((r) => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `
      <strong>${r.nome}</strong>
      <br><span class="muted">${r.caminho}</span><br>
      <button class="btn" data-map="${r.googleLink}">Ver rota no mapa</button>
    `;
    c.appendChild(div);
  });

  c.querySelectorAll("button[data-map]").forEach((btn) =>
    btn.addEventListener("click", (ev) => {
      document.getElementById("map-frame").src = ev.target.dataset.map;
      document.getElementById("map-container").classList.remove("hidden");
    })
  );
}

renderRotas();

document
  .getElementById("rota-search")
  .addEventListener("input", (e) => renderRotas(e.target.value));

rotas.forEach((r) => {
  const opt = document.createElement("option");
  opt.value = r.nome;
  opt.textContent = r.nome;
  document.getElementById("rota-selecao").appendChild(opt);
});

// ===========================================
// NOVA SOLICITAÇÃO
// ===========================================

const modal = document.getElementById("request-modal");

document.getElementById("open-request-modal").addEventListener("click", () => {
  modal.classList.remove("hidden");
});

document.getElementById("fechar-modal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("enviar-solicitacao").addEventListener("click", () => {
  const matricula = document.getElementById("matricula").value.trim();
  const email = document.getElementById("email-solicitacao").value.trim();
  const motivo = document.getElementById("motivo").value.trim();
  const rota = document.getElementById("rota-selecao").value;
  const tipo = document.getElementById("tipo-autorizacao").value;
  const data = document.getElementById("data-autorizacao").value;

  const comprovante = document.getElementById("comprovante").files[0];
  if (tipo === "consulta" && !comprovante)
    return alert(
      "Para solicitações de consulta, é obrigatório anexar o comprovante."
    );

  if (!matricula || !email || !motivo || !rota || !tipo || !data)
    return alert("Preencha todos os campos!");

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];

  solicitacoes.push({
    matricula,
    email,
    motivo,
    rota,
    tipo,
    data,
    comprovante: comprovante ? comprovante.name : null,
    status: "Em análise",
  });

  localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));

  alert("Solicitação enviada com sucesso!");

  modal.classList.add("hidden");

  renderSolicitacoes("Em análise");
  renderPainelGestor("Em análise");
});

// MOSTRAR CAMPO DE ANEXO PARA CONSULTA
const tipoAutorizacao = document.getElementById("tipo-autorizacao");
const boxComprovante = document.getElementById("box-comprovante");
const inputComprovante = document.getElementById("comprovante");

tipoAutorizacao.addEventListener("change", () => {
  if (tipoAutorizacao.value === "consulta") {
    boxComprovante.classList.remove("hidden");
  } else {
    boxComprovante.classList.add("hidden");
    inputComprovante.value = "";
  }
});

// ===========================================
// LISTAR SOLICITAÇÕES
// ===========================================
function renderSolicitacoes(filtro = "Em análise") {
  const lista = document.getElementById("lista-solicitacoes");
  lista.innerHTML = "";

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  const filtradas = solicitacoes.filter((s) => s.status === filtro);

  if (filtradas.length === 0) {
    lista.innerHTML = `<p class="muted">Nenhuma solicitação encontrada.</p>`;
    return;
  }

  filtradas.forEach((s) => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `
      <p><strong>Matrícula:</strong> ${s.matricula}</p>
      <p><strong>E-mail:</strong> ${s.email}</p>
      <p><strong>Rota:</strong> ${s.rota}</p>
      <p><strong>Tipo:</strong> ${s.tipo}</p>
      <p><strong>Motivo:</strong> ${s.motivo}</p>
      <p><strong>Data:</strong> ${new Date(s.data).toLocaleDateString()}</p>
      <p><strong>Status:</strong> <span class="status">${s.status}</span></p>
    `;
    lista.appendChild(div);
  });
}

// ===========================================
// PAINEL DO GESTOR
// ===========================================
function renderPainelGestor(filtro = "Em análise") {
  const lista = document.getElementById("lista-pendencias");
  lista.innerHTML = "";

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  const filtradas = solicitacoes.filter((s) => s.status === filtro);

  if (filtradas.length === 0) {
    lista.innerHTML = `<p class="muted">Nenhuma solicitação encontrada.</p>`;
    return;
  }

  filtradas.forEach((s, index) => {
    const div = document.createElement("div");
    div.className = "card small";

    div.innerHTML = `
      <p><strong>Matrícula:</strong> ${s.matricula}</p>
      <p><strong>E-mail:</strong> ${s.email}</p>
      <p><strong>Rota:</strong> ${s.rota}</p>
      <p><strong>Tipo:</strong> ${s.tipo}</p>
      <p><strong>Motivo:</strong> ${s.motivo}</p>
      <p><strong>Data:</strong> ${new Date(s.data).toLocaleDateString()}</p>
      <p><strong>Status:</strong> <span class="status">${s.status}</span></p>
      ${
        s.status === "Em análise"
          ? `<div class="row buttons">
              <button class="btn" onclick="aprovarSolicitacao(${index})">Aprovar</button>
              <button class="btn alt" onclick="recusarSolicitacao(${index})">Recusar</button>
            </div>`
          : ""
      }
    `;

    lista.appendChild(div);
  });
}

// ===========================================
// BOTÕES DE AÇÃO DO GESTOR
// ===========================================
function aprovarSolicitacao(i) {
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  solicitacoes[i].status = "Aprovado ✅";
  localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));

  renderPainelGestor("Em análise");
  renderSolicitacoes("Aprovado ✅");
}

function recusarSolicitacao(i) {
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  solicitacoes[i].status = "Recusado ❌";
  localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));

  renderPainelGestor("Em análise");
  renderSolicitacoes("Recusado ❌");
}

// ===========================================
// TUTORIAL PRINCIPAL v2 (com versionamento)
// ==========================================

// ⬅️ ALTERE AQUI QUANDO QUISER MOSTRAR O TUTORIAL DE NOVO
const TUTORIAL_VERSION = 2;

const tutorialOverlay = document.getElementById("tutorial-overlay");
const tutorialText = document.getElementById("tutorial-text");
const tutorialNext = document.getElementById("tutorial-next");
const tutorialSkip = document.getElementById("tutorial-skip");
const tutorialHighlight = document.getElementById("tutorial-highlight");

let tutorialStep = 0;
let tutorialSteps = [];

function highlightElement(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const r = el.getBoundingClientRect();

  tutorialHighlight.style.width = r.width + "px";
  tutorialHighlight.style.height = r.height + "px";
  tutorialHighlight.style.top = r.top + "px";
  tutorialHighlight.style.left = r.left + "px";
}

function showTutorialStep() {
  const step = tutorialSteps[tutorialStep];
  tutorialText.textContent = step.texto;
  highlightElement(step.highlight);
}

function startTutorial(usuario) {
  const key = `tutorialVisto_${usuario.matricula}_v${TUTORIAL_VERSION}`;

  if (localStorage.getItem(key) === "sim") return;

  tutorialSteps = [
    {
      texto: "Bem-vindo(a)! Este é o menu inicial.",
      highlight: ".grid",
    },
    {
      texto: "Aqui você acessa o módulo de Transporte.",
      highlight: '[data-screen="transporte"]',
    },
    {
      texto: "E aqui você acompanha suas solicitações.",
      highlight: '[data-screen="solicitacoes"]',
    },
  ];

  if (usuario.tipo === "gestor") {
    tutorialSteps.push({
      texto: "Gestores possuem este painel especial.",
      highlight: "#card-painel-gestor",
    });
  }

  tutorialSteps.push({
    texto: "Pronto! Agora você já sabe usar o KaizenGO.",
    highlight: ".header-logo",
  });

  tutorialStep = 0;
  tutorialOverlay.classList.remove("hidden");
  showTutorialStep();

  tutorialNext.onclick = () => {
    tutorialStep++;
    if (tutorialStep >= tutorialSteps.length) {
      tutorialOverlay.classList.add("hidden");
      localStorage.setItem(key, "sim");
    } else {
      showTutorialStep();
    }
  };

  tutorialSkip.onclick = () => {
    tutorialOverlay.classList.add("hidden");
    localStorage.setItem(key, "sim");
  };
}

loginBtn.addEventListener("click", () => {
  setTimeout(() => {
    const u = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (u) startTutorial(u);
  }, 700);
});

// ===========================================
// TUTORIAL TRANSPORTE v2 (com versionamento)
// ===========================================

const TT_VERSION = 2;

const ttOverlay = document.getElementById("tutorial-transporte");
const ttText = document.getElementById("tutorial-transporte-text");
const ttNext = document.getElementById("tutorial-transporte-next");
const ttSkip = document.getElementById("tutorial-transporte-skip");
const ttHighlight = document.getElementById("tutorial-transporte-highlight");

let ttStep = 0;
let ttSteps = [];

function ttHighlightElement(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const r = el.getBoundingClientRect();

  ttHighlight.style.width = r.width + "px";
  ttHighlight.style.height = r.height + "px";
  ttHighlight.style.top = r.top + "px";
  ttHighlight.style.left = r.left + "px";
}

function showTTStep() {
  const step = ttSteps[ttStep];
  ttText.textContent = step.texto;
  ttHighlightElement(step.highlight);
}

function startTutorialTransporte() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const key = `tutorialTransporteVisto_${usuario.matricula}_v${TT_VERSION}`;

  if (localStorage.getItem(key) === "sim") return;

  ttSteps = [
    {
      texto: "Busque rotas digitando parte do nome.",
      highlight: "#rota-search",
    },
    {
      texto: "Estas são as rotas disponíveis.",
      highlight: "#rotas-container",
    },
    {
      texto: "Aqui aparece o mapa da rota selecionada.",
      highlight: "#map-container",
    },
    {
      texto: "Clique aqui para solicitar uma autorização.",
      highlight: "#open-request-modal",
    },
    {
      texto: "Tutorial concluído!",
      highlight: "#transporte h2",
    },
  ];

  ttStep = 0;
  ttOverlay.classList.remove("hidden");
  showTTStep();

  ttNext.onclick = () => {
    ttStep++;
    if (ttStep >= ttSteps.length) {
      ttOverlay.classList.add("hidden");
      localStorage.setItem(key, "sim");
    } else {
      showTTStep();
    }
  };

  ttSkip.onclick = () => {
    ttOverlay.classList.add("hidden");
    localStorage.setItem(key, "sim");
  };
}

document
  .querySelector('[data-screen="transporte"]')
  .addEventListener("click", () => {
    setTimeout(() => startTutorialTransporte(), 600);
  });
