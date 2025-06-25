if (!localStorage.getItem('privacyAccepted')) {
    // Crear el contenedor del banner
    const banner = document.createElement('div');
    banner.id = 'privacyBanner';
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.width = '100%';
    banner.style.background = 'rgba(0, 0, 0, 0.8)';
    banner.style.color = 'white';
    banner.style.padding = '10px';
    banner.style.textAlign = 'center';
    banner.style.fontSize = '14px';
    banner.style.zIndex = '1000';
  
    // Crear el texto
    const text = document.createElement('span');
    text.textContent = 'Esta web usa almacenamiento local para mejorar tu experiencia. Al continuar aceptas esta política.';
  
    // Crear el botón
    const button = document.createElement('button');
    button.textContent = 'Aceptar';
    button.style.marginLeft = '10px';
    button.style.padding = '5px 10px';
    button.style.cursor = 'pointer';
  
    // Al hacer clic, guardar y ocultar
    button.addEventListener('click', () => {
      localStorage.setItem('privacyAccepted', 'true');
      banner.remove();
    });
  
    // Añadir todo al banner y luego al body
    banner.appendChild(text);
    banner.appendChild(button);
    document.body.appendChild(banner);
  }
  