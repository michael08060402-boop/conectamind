// Local PDF.js keeps the viewer independent of third-party services.
import { getDocument, GlobalWorkerOptions } from './vendor/pdfjs/pdf.min.mjs';

GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;
const loading = new WeakMap();

export function showPdf(container) {
    if (!loading.has(container)) {
        loading.set(container, renderDocument(container));
    }
    return loading.get(container);
}

async function renderDocument(container) {
    const status = container.querySelector('.pdf-status');
    container.setAttribute('aria-busy', 'true');
    try {
        const pdf = await getDocument(container.dataset.pdf).promise;
        for (let number = 1; number <= pdf.numPages; number++) {
            const page = await pdf.getPage(number);
            const original = page.getViewport({ scale: 1 });
            // Render sharply enough for rotation and pinch zoom, without oversized canvases.
            const scale = Math.min(1600 / original.width, Math.sqrt(2400000 / (original.width * original.height)));
            const viewport = page.getViewport({ scale });
            const figure = document.createElement('figure');
            figure.className = 'pdf-page';
            const canvas = document.createElement('canvas');
            canvas.width = Math.ceil(viewport.width);
            canvas.height = Math.ceil(viewport.height);
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', `P\u00e1gina ${number} de ${pdf.numPages}. Documento accesible mediante Abrir PDF original.`);
            await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
            const caption = document.createElement('figcaption');
            caption.textContent = `P\u00e1gina ${number} de ${pdf.numPages}`;
            figure.append(canvas, caption);
            container.append(figure);
            status.textContent = `Cargando ${number} de ${pdf.numPages} p\u00e1ginas...`;
            page.cleanup();
        }
        status.hidden = true;
        await pdf.destroy();
    } catch (error) {
        status.textContent = 'No se pudo mostrar el documento completo. Usa el enlace Abrir PDF original.';
        console.error('PDF viewer:', error);
    } finally {
        container.setAttribute('aria-busy', 'false');
    }
}
