(() => {
  "use strict";

  const STORAGE_KEY = "empleados";
  const RATE_KEY = "porcentajeComision";
  const DEFAULT_RATE = 15;
  const splash = document.getElementById("splash");
  const content = document.getElementById("content");
  const form = document.getElementById("employee-form");
  const rateInput = document.getElementById("comisionPorcentaje");
  const message = document.getElementById("form-message");

  function readRate() {
    const saved = Number(localStorage.getItem(RATE_KEY));
    return Number.isFinite(saved) && saved >= 0 && saved <= 100 ? saved : DEFAULT_RATE;
  }

  function readEmployees() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("No se pudieron leer los registros guardados.", error);
      return [];
    }
  }

  function showContent() {
    if (splash) splash.classList.add("splash-hidden");
    if (content) content.hidden = false;
    document.body.classList.remove("home-page");
  }

  rateInput.value = String(readRate());
  rateInput.addEventListener("change", () => {
    const rate = Number(rateInput.value);
    if (rateInput.value.trim() === "" || !Number.isFinite(rate) || rate < 0 || rate > 100) {
      message.textContent = "Ingresá un porcentaje entre 0 y 100.";
      rateInput.setAttribute("aria-invalid", "true");
      return;
    }
    rateInput.removeAttribute("aria-invalid");
    localStorage.setItem(RATE_KEY, String(rate));
    message.textContent = `Comisión configurada en ${rate}% para los próximos registros.`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dia = document.getElementById("dia").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const ventaRaw = document.getElementById("venta").value;
    const venta = Number(ventaRaw);
    const rateRaw = rateInput.value;
    const rate = Number(rateRaw);

    if (!dia || !nombre || ventaRaw === "" || !Number.isFinite(venta) || venta < 0) {
      message.textContent = "Completá el día, el nombre y una venta válida (igual o mayor a cero).";
      return;
    }
    if (rateRaw.trim() === "" || !Number.isFinite(rate) || rate < 0 || rate > 100) {
      message.textContent = "La comisión debe ser un porcentaje entre 0 y 100.";
      rateInput.focus();
      return;
    }

    const empleados = readEmployees();
    empleados.push({
      dia,
      nombre,
      venta,
      porcentajeComision: rate,
      comision: Math.round((venta * rate / 100 + Number.EPSILON) * 100) / 100,
      creadoEn: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(empleados));
    localStorage.setItem(RATE_KEY, String(rate));
    form.reset();
    rateInput.value = String(rate);
    message.textContent = `Registro guardado. Comisión: ${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(venta * rate / 100)}.`;
    document.getElementById("dia").focus();
  });

  document.getElementById("view-data").addEventListener("click", () => {
    window.location.href = "datos.html";
  });
  document.getElementById("skip-splash").addEventListener("click", showContent);

  // La bienvenida se muestra brevemente; el botón permite entrar antes.
  window.setTimeout(showContent, 2800);
})();
