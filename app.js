function crearEmpleado() {
    const dia = document.getElementById("dia").value;
    const nombre = document.getElementById("nombre").value;
    const venta = parseFloat(document.getElementById("venta").value);

    // Validar que se haya ingresado un día
    if (!dia) {
        alert("Por favor, selecciona un día.");
        return;
    }

    // Validar que se haya ingresado un nombre y una venta válida
    if (!nombre || isNaN(venta)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    const empleado = {
        dia: dia,
        nombre: nombre,
        venta: venta,
        comision: venta * 0.15, // Ejemplo de calcular comisión del 15%
    };

    let empleados = obtenerEmpleados();
    empleados.push(empleado);

    localStorage.setItem("empleados", JSON.stringify(empleados));

    // Volvemos a mostrar los datos actualizados
    mostrarDatos();
}

function obtenerEmpleados() {
    return JSON.parse(localStorage.getItem("empleados")) || [];
}

function mostrarEmpleados() {
    const employeeList = document.getElementById("employee-list");
    let empleados = obtenerEmpleados();

    employeeList.innerHTML = "";

    empleados.forEach((empleado) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${empleado.nombre} - Venta: ${empleado.venta} - Comisión: ${empleado.comision.toFixed(2)}`;
        employeeList.appendChild(listItem);
    });
}

function irADatos() {
    window.location.href = "datos.html";
}

function regresarAIndex() {
    window.location.href = "index.html";
}

function mostrarEmpleados() {
    const employeeList = document.getElementById("employee-list");
    let empleados = obtenerEmpleados();

    employeeList.innerHTML = "";

    empleados.forEach((empleado) => {
        const listItem = document.createElement("li");
        const comisionText = empleado.comision !== undefined ? empleado.comision.toFixed(2) : "N/A";
        listItem.textContent = `${empleado.nombre} - Venta: ${empleado.venta} - Comisión: ${comisionText}`;
        employeeList.appendChild(listItem);
    });
}

