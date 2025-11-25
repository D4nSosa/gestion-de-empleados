document.addEventListener("DOMContentLoaded", () => {
    mostrarDatos();
    document.getElementById("vaciarBtn").addEventListener("click", vaciarLista);
});

function mostrarDatos() {
    const employeeTable = document.getElementById("employee-table");
    let empleados = obtenerEmpleados();

    // Limpiamos la tabla antes de agregar datos
    employeeTable.innerHTML = "";

    // Agregamos encabezados
    const encabezados = employeeTable.createTHead();
    const encabezadoFila = encabezados.insertRow();
    const cellDiaEncabezado = encabezadoFila.insertCell(0);
    const cellNombreEncabezado = encabezadoFila.insertCell(1);
    const cellVentasEncabezado = encabezadoFila.insertCell(2);
    const cellComisionEncabezado = encabezadoFila.insertCell(3);

    cellDiaEncabezado.textContent = "Día";
    cellNombreEncabezado.textContent = "Nombre";
    cellVentasEncabezado.textContent = "Venta en $";
    cellComisionEncabezado.textContent = "Comisión en $";

    // Organizamos los empleados por día
    const empleadosPorDia = {};

    empleados.forEach((empleado) => {
        if (!empleadosPorDia[empleado.dia]) {
            empleadosPorDia[empleado.dia] = [];
        }
        empleadosPorDia[empleado.dia].push(empleado);
    });

    // Iteramos sobre los días y los empleados y agregamos filas a la tabla
    for (const dia in empleadosPorDia) {
        const empleadosDelDia = empleadosPorDia[dia];

        empleadosDelDia.forEach((empleado) => {
            const row = employeeTable.insertRow();
            const cellDia = row.insertCell(0);
            const cellNombre = row.insertCell(1);
            const cellVentas = row.insertCell(2);
            const cellComision = row.insertCell(3);

            cellDia.textContent = empleado.dia;
            cellNombre.textContent = empleado.nombre;
            cellVentas.textContent = empleado.venta;
            cellComision.textContent = empleado.comision ? empleado.comision.toFixed(2) : "N/A";
        });

        // Mostramos el total por empleado en una fila adicional
        const totalesPorEmpleado = {};
        empleadosDelDia.forEach((empleado) => {
            if (!totalesPorEmpleado[empleado.nombre]) {
                totalesPorEmpleado[empleado.nombre] = { ventas: 0, comisiones: 0 };
            }
            totalesPorEmpleado[empleado.nombre].ventas += empleado.venta;
            totalesPorEmpleado[empleado.nombre].comisiones += empleado.comision || 0;
        });

        for (const nombre in totalesPorEmpleado) {
            const totalRow = employeeTable.insertRow();
            const cellTotalDiaLabel = totalRow.insertCell(0);
            const cellTotalVentas = totalRow.insertCell(1);
            const cellTotalComisiones = totalRow.insertCell(2);

            cellTotalDiaLabel.textContent = `Total ${dia} - ${nombre}`;
            cellTotalVentas.textContent = totalesPorEmpleado[nombre].ventas;
            cellTotalComisiones.textContent = totalesPorEmpleado[nombre].comisiones.toFixed(2);
        }
    }
}

        // Actualizamos el total de ventas y comisiones por empleado
        if (!totalesPorEmpleado[empleado.nombre]) {
            totalesPorEmpleado[empleado.nombre] = { ventas: 0, comisiones: 0 };
        }

        totalesPorEmpleado[empleado.nombre].ventas += empleado.venta;
        totalesPorEmpleado[empleado.nombre].comisiones += empleado.comision || 0;

    // Mostramos el total por empleado en una fila adicional
    for (const nombre in totalesPorEmpleado) {
        const totalRow = employeeTable.insertRow();
        const cellTotalLabel = totalRow.insertCell(0);
        const cellTotalVentas = totalRow.insertCell(1);
        const cellTotalComisiones = totalRow.insertCell(2);

        cellTotalLabel.textContent = `Total ${nombre}`;
        cellTotalVentas.textContent = totalesPorEmpleado[nombre].ventas;
        cellTotalComisiones.textContent = totalesPorEmpleado[nombre].comisiones.toFixed(2);
    }

function guardarEnHistorial() {
    let empleados = obtenerEmpleados();

    // Obtenemos la fecha actual
    const fechaActual = new Date();
    
    // Formateamos la fecha como "DD/MM/AAAA"
    const dia = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

    // Agregamos un nuevo empleado con la información del día
    const nuevoEmpleado = {
        nombre: "",
        venta: 0,
        comision: 0.15 * 1000, // Ejemplo de calcular comisión del 15%
        dia: dia,
    };

    empleados.push(nuevoEmpleado);

    // Actualizamos la lista en localStorage
    localStorage.setItem("empleados", JSON.stringify(empleados));

    // Volvemos a mostrar los datos actualizados
    mostrarDatos();
}

function obtenerEmpleados() {
    return JSON.parse(localStorage.getItem("empleados")) || [];
}

function regresarAIndex() {
    window.location.href = "index.html";
}

function vaciarLista() {
    localStorage.removeItem("empleados");
    mostrarDatos();
}
