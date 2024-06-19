let currentLanguage = 'es';

function toggleLanguage() {
    // Cambiar el idioma
    currentLanguage = (currentLanguage === 'es') ? 'en' : 'es';

    // Actualizar todos los elementos según el idioma actual
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const lang = element.getAttribute('data-lang');
        if (lang === currentLanguage) {
            element.style.display = 'inline';
        } else {
            element.style.display = 'none';
        }
    });

    // Actualizar el botón de cambio de idioma
    const languageSwitch = document.getElementById('language-switch');
    if (currentLanguage === 'es') {
        languageSwitch.innerHTML = '<span class="flag-icon flag-icon-es"><img style="width: 30px;" src="https://imgs.search.brave.com/FWxH_GeVGAGDqcgglEHnm1XTCRCjWfOjdQDypVYZk-o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi84Lzg5L0Jh/bmRlcmFfZGVfRXNw/YSVDMyVCMWEuc3Zn/LzUxMnB4LUJhbmRl/cmFfZGVfRXNwYSVD/MyVCMWEuc3ZnLnBu/Zw" alt="Spain Flag"> Español</span>';
    } else {
        languageSwitch.innerHTML = '<span class="flag-icon flag-icon-en"><img style="width: 30px;" src="https://imgs.search.brave.com/GNJiNGT0hr_Q61evrFp6sDdKmAMfL5fDqypKxPVDz40/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E1L0Zs/YWdfb2ZfdGhlX1Vu/aXRlZF9LaW5nZG9t/XyUyODEtMiUyOS5z/dmcvNTEycHgtRmxh/Z19vZl90aGVfVW5p/dGVkX0tpbmdkb21f/JTI4MS0yJTI5LnN2/Zy5wbmc" alt="Spain Flag"> English</span>';
    }
}

function funcionDobleIdioma(textoEs, textoEn) {
    return `
        <span data-lang="es">${textoEs}</span>
        <span data-lang="en" style="display: none;">${textoEn}</span>
    `;
}