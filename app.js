const API = "https://pokeapi.co/api/v2/pokemon";

const grid = document.getElementById("grid");
const statusEl = document.getElementById("status");
const q = document.getElementById("q");
const clearBtn = document.getElementById("clear");
const loadMoreBtn = document.getElementById("loadMore");
const loadAllBtn = document.getElementById("loadAll");
const tpl = document.getElementById("cardTpl");

let allList = [];
let nextUrl = `${API}?limit=100&offset=0`;
let loading = false;

function setStatus(text) {
  statusEl.textContent = text || "";
}

function idFromUrl(url) {
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  return m ? Number(m[1]) : null;
}

function spriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function render(list) {
  grid.innerHTML = "";
  const frag = document.createDocumentFragment();

  for (const p of list) {
    const id = idFromUrl(p.url);
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector(".card");
    const img = node.querySelector("img");
    const name = node.querySelector(".name");
    const sub = node.querySelector(".sub");

    name.textContent = p.name;
    sub.textContent = id ? `#${String(id).padStart(4, "0")}` : "";
    if (id) {
      img.src = spriteUrl(id);
      img.alt = `Sprite de ${p.name}`;
    } else {
      img.alt = p.name;
    }

    card.addEventListener("click", () => {
      window.open(p.url, "_blank", "noopener,noreferrer");
    });

    frag.appendChild(node);
  }

  grid.appendChild(frag);
}

function applyFilter() {
  const term = q.value.trim().toLowerCase();
  const filtered = term
    ? allList.filter((p) => p.name.includes(term))
    : allList;

  render(filtered);
  setStatus(
    term
      ? `Mostrando ${filtered.length} de ${allList.length} (filtro: "${term}")`
      : `Mostrando ${allList.length}`
  );
}

async function fetchPage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function loadNextPage() {
  if (!nextUrl || loading) return;
  loading = true;
  loadMoreBtn.disabled = true;
  loadAllBtn.disabled = true;
  setStatus("Cargando...");

  try {
    const data = await fetchPage(nextUrl);
    allList = allList.concat(data.results);
    nextUrl = data.next;
    applyFilter();
    loadMoreBtn.disabled = !nextUrl;
  } catch (e) {
    setStatus(`Error cargando datos: ${e.message}`);
  } finally {
    loadAllBtn.disabled = false;
    loading = false;
  }
}

async function loadAll() {
  if (loading) return;
  loading = true;
  loadMoreBtn.disabled = true;
  loadAllBtn.disabled = true;
  setStatus("Cargando todos los Pokémon...");

  try {
    const data = await fetchPage(`${API}?limit=100000&offset=0`);
    allList = data.results;
    nextUrl = data.next;
    applyFilter();
    loadMoreBtn.disabled = true;
  } catch (e) {
    setStatus(`Error cargando todos: ${e.message}`);
  } finally {
    loadAllBtn.disabled = false;
    loading = false;
  }
}

q.addEventListener("input", applyFilter);
clearBtn.addEventListener("click", () => {
  q.value = "";
  q.focus();
  applyFilter();
});

loadMoreBtn.addEventListener("click", loadNextPage);
loadAllBtn.addEventListener("click", loadAll);

loadNextPage();
