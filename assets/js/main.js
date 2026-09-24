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

    const navbar = document.querySelector(".navbar");

    function activarLink() {
        let currentId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }

    // Scroll
    window.addEventListener("scroll", activarLink, { passive: true });
    window.addEventListener("resize", activarLink);

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
            if (modal) {
                modal.style.display = "flex";
                document.body.classList.add("modal-open");
                cerrar.focus();
                loadMobilePdf();
            }
        });
    });

    let pdfViewer;
    function loadMobilePdf() {
        if (!window.matchMedia("(max-width: 1100px)").matches) return;
        pdfViewer ??= import("./pdf-viewer.mjs");
        pdfViewer.then(({ showPdf }) => showPdf(modal.querySelector(".pdf-pages"))).catch(() => {
            pdfViewer = null;
            modal.querySelector(".pdf-status").textContent = "No se pudo cargar el visor. Usa el enlace Abrir PDF original.";
        });
    }
    window.matchMedia("(max-width: 1100px)").addEventListener("change", () => {
        if (modal?.style.display === "flex") loadMobilePdf();
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        abrirModalBtns[0]?.focus();
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal?.style.display === "flex") closeModal();
        if (event.key === "Tab" && modal?.style.display === "flex") {
            const focusable = [...modal.querySelectorAll('button, a[href], [tabindex="0"], iframe')]
                .filter(element => element.getClientRects().length);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    if (cerrar) {
        cerrar.addEventListener("click", () => {
            closeModal();
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

});

/* Compact navigation, shared by the home and service pages. */
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const toggle = navbar.querySelector(".nav-toggle");
    const setOpen = (open) => {
        navbar.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Cerrar men\u00fa" : "Abrir men\u00fa");
        toggle.querySelector("span").textContent = "\u2630";
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    navbar.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
        setOpen(false);
        if (window.matchMedia("(max-width: 1200px)").matches) toggle.focus({ preventScroll: true });
    }));
    document.addEventListener("click", event => { if (!navbar.contains(event.target)) setOpen(false); });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            toggle.focus();
        }
    });
    window.matchMedia("(max-width: 1200px)").addEventListener("change", () => setOpen(false));
});
