(() => {
  const STORAGE_KEY = "haxvetor_services_v1";
  const list = document.querySelector("#serviceList");
  const template = document.querySelector("#serviceTemplate");
  const dialog = document.querySelector("#serviceDialog");
  const form = document.querySelector("#serviceForm");
  const search = document.querySelector("#searchInput");
  const filter = document.querySelector("#statusFilter");

  let services = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : window.HAXVETOR_INITIAL_DATA;
    } catch {
      return window.HAXVETOR_INITIAL_DATA;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    render();
  }

  function formatDate(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("pt-BR").format(new Date(value + "T12:00:00"));
  }

  function render() {
    const term = search.value.trim().toLowerCase();
    const status = filter.value;
    list.innerHTML = "";

    const filtered = services
      .filter(item => !status || item.status === status)
      .filter(item => [item.client, item.service, item.team, item.notes]
        .join(" ").toLowerCase().includes(term))
      .sort((a,b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

    if (!filtered.length) {
      list.innerHTML = '<div class="empty">Nenhum serviço encontrado.</div>';
    }

    filtered.forEach(item => {
      const node = template.content.cloneNode(true);
      const card = node.querySelector(".service-card");
      card.dataset.status = item.status;

      node.querySelector(".time").textContent = item.time;
      node.querySelector(".date").textContent = formatDate(item.date);
      node.querySelector(".client").textContent = item.client;
      node.querySelector(".service").textContent = item.service;
      node.querySelector(".team").textContent = item.team ? `👥 ${item.team}` : "";
      node.querySelector(".notes").textContent = item.notes || "";

      const map = node.querySelector(".map");
      if (item.map) map.href = item.map;
      else map.hidden = true;

      const statusSelect = node.querySelector(".status");
      statusSelect.value = item.status;
      statusSelect.addEventListener("change", () => {
        item.status = statusSelect.value;
        save();
      });

      node.querySelector(".edit").addEventListener("click", () => openForm(item));
      node.querySelector(".delete").addEventListener("click", () => {
        if (confirm(`Excluir o serviço de ${item.client}?`)) {
          services = services.filter(s => s.id !== item.id);
          save();
        }
      });

      list.appendChild(node);
    });

    document.querySelector("#totalCount").textContent = services.length;
    document.querySelector("#waitingCount").textContent = services.filter(s => s.status === "Aguardando").length;
    document.querySelector("#progressCount").textContent = services.filter(s => s.status === "Em andamento").length;
    document.querySelector("#doneCount").textContent = services.filter(s => s.status === "Concluído").length;
  }

  function openForm(item = null) {
    form.reset();
    document.querySelector("#serviceId").value = item?.id || "";
    document.querySelector("#date").value = item?.date || new Date().toISOString().slice(0,10);
    document.querySelector("#time").value = item?.time || "08:00";
    document.querySelector("#client").value = item?.client || "";
    document.querySelector("#service").value = item?.service || "";
    document.querySelector("#team").value = item?.team || "";
    document.querySelector("#map").value = item?.map || "";
    document.querySelector("#notes").value = item?.notes || "";
    dialog.showModal();
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const id = document.querySelector("#serviceId").value;
    const existing = services.find(s => s.id === id);
    const payload = {
      id: id || crypto.randomUUID(),
      date: document.querySelector("#date").value,
      time: document.querySelector("#time").value,
      client: document.querySelector("#client").value.trim(),
      service: document.querySelector("#service").value.trim(),
      team: document.querySelector("#team").value.trim(),
      map: document.querySelector("#map").value.trim(),
      notes: document.querySelector("#notes").value.trim(),
      status: existing?.status || "Aguardando"
    };
    if (existing) Object.assign(existing, payload);
    else services.push(payload);
    dialog.close();
    save();
  });

  document.querySelector("#newServiceBtn").addEventListener("click", () => openForm());
  document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
  document.querySelector("#cancelBtn").addEventListener("click", () => dialog.close());
  search.addEventListener("input", render);
  filter.addEventListener("change", render);

  render();
})();
