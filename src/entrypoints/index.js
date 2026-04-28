import ProductForm from '../product-form'
import Alpine from 'alpinejs'

window.customElements.define('product-form', ProductForm)
Alpine.start()


document.addEventListener('click', (e) => {
    const swatch = e.target.closest('.swatch-item');
    if (!swatch) return;

    e.preventDefault();

    const card = swatch.closest('[data-product-card]');
    if (!card) return;

    // Atualiza classes visuais
    card.querySelectorAll('.swatch-item').forEach(s => {
        s.classList.remove('ring-1', 'ring-domaineBlue', 'active-swatch');
    });
    swatch.classList.add('ring-1', 'ring-domaineBlue', 'active-swatch');

    // Seletores de Imagem
    const mainImg = card.querySelector('[data-main-image]');
    const hoverImg = card.querySelector('[data-hover-image]'); // O seletor da segunda imagem

    // Lógica de troca de imagens baseada nos datasets
    if (mainImg && swatch.dataset.mainImg) {
        mainImg.src = swatch.dataset.mainImg;
    }
    
    // Recupera a função de "position" através do hover-img processado no Liquid
    if (hoverImg && swatch.dataset.hoverImg) {
        hoverImg.src = swatch.dataset.hoverImg;
    }

    // Restante da lógica (Preços e Badge)
    const priceReg = card.querySelector('.price-regular');
    const priceComp = card.querySelector('.price-compare');
    const badge = card.querySelector('.on_sale');
    const link = card.querySelector('.product-card-link');

    if (priceReg) priceReg.innerText = swatch.dataset.price;
    if (link) link.href = swatch.dataset.variantUrl;

    const isSale = swatch.dataset.onSale === 'true';
    if (priceComp) {
        priceComp.innerText = swatch.dataset.compare;
        priceComp.classList.toggle('hidden', !isSale);
    }
    if (badge) badge.classList.toggle('hidden', !isSale);
});