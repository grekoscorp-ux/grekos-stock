// URL de la Web App de Google Apps Script
const url = "https://script.google.com/macros/s/AKfycbxdEv1MSkpEqXzn2tqyj__FDNAuNI9_JUxt2vmyVELzNKOVWUEo_9fUNIchUmeOF7LP/exec";


// Función para consultar el inventario
async function consultarInventario() {
  // Obtener los valores de producto y talla desde el formulario
  const producto = document.getElementById("producto").value;
  const talla = document.getElementById("talla").value.toUpperCase(); // Convertir a mayúsculas


  if (!producto || !talla) {
    alert("Por favor ingrese un producto y una talla.");
    return;
  }


  // Construir la URL con los parámetros producto y talla
  const consultaUrl = `${url}?producto=${encodeURIComponent(producto)}&talla=${encodeURIComponent(talla)}`;


  try {
    // Realizar la solicitud GET
    const response = await fetch(consultaUrl);
    const data = await response.json();


    // Mostrar los resultados
    if (data) {
      document.getElementById("resultado").innerHTML = `
        <p><strong>Producto:</strong> ${data.producto}</p>
        <p><strong>Talla:</strong> ${data.talla}</p>
        <p><strong>Cantidad disponible:</strong> ${data.cantidad}</p>
        <p><strong>Categoría:</strong> ${data.categoria}</p>
        <p><strong>Ubicación:</strong> ${data.ubicacion}</p>
      `;
    } else {
      document.getElementById("resultado").innerHTML = "No se encontró el producto o la talla.";
    }
  } catch (error) {
    console.error("Error al consultar el inventario:", error);
    document.getElementById("resultado").innerHTML = "Ocurrió un error al consultar el inventario.";
  }
}