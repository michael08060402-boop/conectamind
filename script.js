/* ================== NAVBAR ACTIVO (INDEX Y SERVICIOS) ================== */

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-link");

    // Detectar secciones (index o servicios)
    let sections = [];
    if (document.querySelectorAll(".servicio-section").length > 0) {
        sections = document.querySelectorAll(".servicio-section");
    } else {
        sections = document.querySelectorAll("section[id]");
    }

    const OFFSET = 200; // altura aproximada del navbar

    function activarLink() {
        let currentId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - OFFSET;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
            }
        });
    }

    // Scroll
    window.addEventListener("scroll", activarLink);

    // Click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Hash al cargar
    if (window.location.hash) {
        navLinks.forEach(link => {
            if (link.getAttribute("href") === window.location.hash) {
                link.classList.add("active");
            }
        });
    }

    activarLink();
});


/* ================== ACORDEÓN ================== */

document.querySelectorAll(".accordion-item").forEach(item => {
    item.addEventListener("click", () => {
        const content = item.querySelector(".accordion-content");

        document.querySelectorAll(".accordion-content").forEach(c => {
            if (c !== content) {
                c.style.maxHeight = null;
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});


/* ================== MODAL PDF (INDEX Y SERVICIOS) ================== */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-pdf");
    const cerrar = document.querySelector(".close-modal");

    const abrirModalBtns = document.querySelectorAll(
        ".btn-sobre-mi, .creadora-alanis"
    );

    abrirModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (modal) modal.style.display = "flex";
        });
    });

    if (cerrar) {
        cerrar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

});
