(() => {
  "use strict";

  const STORAGE_KEY = "empleados";
  const table = document.getElementById("employee-table");
  const tbody = table.querySelector("tbody");
  const tfoot = table.querySelector("tfoot");
  const message = document.getElementById("records-message");
  const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });

  function obtenerEmpleados() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.error("No se pudieron leer los registros guardados.", error);
      return [];
    }
  }

  function formatoNumero(value) {
    return Number(value || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function mostrarDatos() {
    const empleados = obtenerEmpleados();
    tbody.replaceChildren();
    tfoot.replaceChildren();

    if (empleados.length === 0) {
      const row = tbody.insertRow();
      const cell = row.insertCell();
      cell.colSpan = 5;
      cell.className = "empty-state";
      cell.textContent = "Todavía no hay registros. Volvé al formulario para agregar el primero.";
      return;
    }

    let totalVentas = 0;
    let totalComisiones = 0;
    empleados.forEach((empleado) => {
      const venta = Number(empleado.venta) || 0;
      const rate = Number(empleado.porcentajeComision);
      const comision = Number.isFinite(Number(empleado.comision))
        ? Number(empleado.comision)
        : venta * (Number.isFinite(rate) ? rate : 15) / 100;
      totalVentas += venta;
      totalComisiones += comision;

      const row = tbody.insertRow();
      [empleado.dia || "—", empleado.nombre || "—", money.format(venta),
        `${formatoNumero(Number.isFinite(rate) ? rate : 15)}%`, money.format(comision)]
        .forEach((value) => { row.insertCell().textContent = value; });
    });

    const totalRow = tfoot.insertRow();
    const label = totalRow.insertCell();
    label.colSpan = 2;
    label.textContent = `Total (${empleados.length} registros)`;
    totalRow.insertCell().textContent = money.format(totalVentas);
    totalRow.insertCell().textContent = "—";
    totalRow.insertCell().textContent = money.format(totalComisiones);
  }

  document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "index.html";
  });
  document.getElementById("clear-button").addEventListener("click", () => {
    if (!obtenerEmpleados().length) {
      message.textContent = "No hay registros para borrar.";
      return;
    }
    if (window.confirm("¿Seguro que querés borrar todos los registros guardados en este navegador? Esta acción no se puede deshacer.")) {
      localStorage.removeItem(STORAGE_KEY);
      mostrarDatos();
      message.textContent = "Se borraron los registros de este navegador.";
    }
  });

  mostrarDatos();
})();
