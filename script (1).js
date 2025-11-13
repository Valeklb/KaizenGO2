// ==============================
// KAIZENGO v3.5 - Abas de Status
// ==============================

// ======= LOGIN =======
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

    if (found.tipo === "gestor") {
      badgeRH.classList.remove("hidden");
      cardPainelGestor.classList.remove("hidden");
    } else {
      badgeRH.classList.add("hidden");
      cardPainelGestor.classList.add("hidden");
    }
  } else {
    loginError.style.display = "block";
  }
});

// ======= PRIMEIRO ACESSO =======
document.getElementById("first-access").addEventListener("click", () => {
  toggleScreens("login-screen", "register-screen");
});
document.getElementById("voltar-login").addEventListener("click", () => {
  toggleScreens("register-screen", "login-screen");
});

// ======= CADASTRO RESTRITO =======
const matriculasGestores = ["3081270", "3080943", "3081492"];

document.getElementById("register-btn").addEventListener("click", () => {
  const matricula = document.getElementById("reg-matricula").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const senha = document.getElementById("reg-senha").value.trim();
  const confirma = document.getElementById("reg-confirma").value.trim();

  if (!matricula || !email || !senha || !confirma) {
    alert("Preencha todos os campos!");
    return;
  }
  if (senha !== confirma) {
    alert("As senhas não conferem!");
    return;
  }
  if (!matriculasGestores.includes(matricula)) {
    alert(
      "Apenas matrículas de gestores Yamaha podem realizar o acesso nesta versão."
    );
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.some((u) => u.matricula === matricula)) {
    alert("Essa matrícula já possui cadastro.");
    return;
  }

  usuarios.push({ matricula, email, senha, tipo: "gestor" });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro de gestor realizado com sucesso!");
  toggleScreens("register-screen", "login-screen");
});

// ======= REDEFINIÇÃO DE SENHA =======
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

  if (!matricula || !nova || !confirma) {
    alert("Preencha todos os campos!");
    return;
  }
  if (nova !== confirma) {
    alert("As senhas não conferem!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex((u) => u.matricula === matricula);
  if (index === -1) {
    alert("Matrícula não encontrada!");
    return;
  }

  usuarios[index].senha = nova;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Senha redefinida com sucesso!");
  toggleScreens("reset-screen", "login-screen");
});

// ======= LOGOUT =======
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  showScreen("login-screen");
  logoutBtn.classList.add("hidden");
  badgeRH.classList.add("hidden");
  cardPainelGestor.classList.add("hidden");
  document
    .querySelectorAll(".login-screen")
    .forEach((s) => s.classList.add("hidden"));
  document.getElementById("login-screen").classList.remove("hidden");
});

// ======= NAVEGAÇÃO =======
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
}

// ======= TROCA DE TELAS =======
function toggleScreens(from, to) {
  const fromEl = document.getElementById(from);
  const toEl = document.getElementById(to);
  fromEl.classList.remove("active");
  fromEl.classList.add("hidden");
  toEl.classList.remove("hidden");
  toEl.classList.add("active");
  window.scrollTo(0, 0);
}

// ======= ROTAS =======
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
  const container = document.getElementById("rotas-container");
  container.innerHTML = "";
  const rotasFiltradas = rotas.filter(
    (r) =>
      r.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      r.caminho.toLowerCase().includes(filtro.toLowerCase())
  );
  if (rotasFiltradas.length === 0) {
    container.innerHTML = '<p class="muted">Nenhuma rota encontrada.</p>';
    return;
  }
  rotasFiltradas.forEach((r) => {
    const div = document.createElement("div");
    div.className = "card small";
    div.innerHTML = `
      <strong>${r.nome}</strong><br>
      <span class="muted">${r.caminho}</span><br>
      <button class="btn" data-map="${r.googleLink}">Ver rota no mapa</button>`;
    container.appendChild(div);
  });
  container.querySelectorAll("button[data-map]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const link = ev.target.dataset.map;
      document.getElementById("map-frame").src = link;
      document.getElementById("map-container").classList.remove("hidden");
    });
  });
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

// ======= MODAL SOLICITAÇÃO =======
const modal = document.getElementById("request-modal");
document
  .getElementById("open-request-modal")
  .addEventListener("click", () => modal.classList.remove("hidden"));
document
  .getElementById("fechar-modal")
  .addEventListener("click", () => modal.classList.add("hidden"));

document.getElementById("enviar-solicitacao").addEventListener("click", () => {
  const matricula = document.getElementById("matricula").value.trim();
  const email = document.getElementById("email-solicitacao").value.trim();
  const motivo = document.getElementById("motivo").value.trim();
  const rota = document.getElementById("rota-selecao").value;
  const tipo = document.getElementById("tipo-autorizacao").value;
  const data = document.getElementById("data-autorizacao").value;

  if (!matricula || !email || !motivo || !rota || !tipo || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  solicitacoes.push({
    matricula,
    email,
    motivo,
    rota,
    tipo,
    data,
    status: "Em análise",
  });
  localStorage.setItem("solicitacoes", JSON.stringify(solicitacoes));

  alert("Solicitação enviada com sucesso!");
  modal.classList.add("hidden");
  renderSolicitacoes("Em análise");
  renderPainelGestor("Em análise");
});

// ======= LISTA DE SOLICITAÇÕES =======
function renderSolicitacoes(filtro = "Em análise") {
  const lista = document.getElementById("lista-solicitacoes");
  lista.innerHTML = "";
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  const filtradas = solicitacoes.filter((s) => s.status === filtro);

  if (filtradas.length === 0) {
    lista.innerHTML = "<p class='muted'>Nenhuma solicitação encontrada.</p>";
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
      <p><strong>Status:</strong> <span class="status">${s.status}</span></p>`;
    lista.appendChild(div);
  });
}

// ======= PAINEL DO GESTOR =======
function renderPainelGestor(filtro = "Em análise") {
  const lista = document.getElementById("lista-pendencias");
  lista.innerHTML = "";
  const solicitacoes = JSON.parse(localStorage.getItem("solicitacoes")) || [];
  const filtradas = solicitacoes.filter((s) => s.status === filtro);

  if (filtradas.length === 0) {
    lista.innerHTML = "<p class='muted'>Nenhuma solicitação encontrada.</p>";
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
      }`;
    lista.appendChild(div);
  });
}

// ======= FILTROS INSTANTÂNEOS =======
document.querySelectorAll("#solicitacoes .tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("#solicitacoes .tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderSolicitacoes(btn.dataset.status);
  });
});

document.querySelectorAll("#painel-gestor .tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("#painel-gestor .tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPainelGestor(btn.dataset.status);
  });
});

// ======= AÇÕES DO GESTOR =======
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
