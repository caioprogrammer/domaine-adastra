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

    // 1. UI Update
    card.querySelectorAll('.swatch-item').forEach(s => s.classList.remove('ring-1', 'ring-domaineBlue', 'active-swatch'));
    swatch.classList.add('ring-1', 'ring-domaineBlue', 'active-swatch');

    // 2. Elementos com Fallback Seguro
    const elements = {
        mainImg: card.querySelector('[data-main-image]'),
        hoverImg: card.querySelector('[data-hover-image]'),
        priceReg: card.querySelector('.price-regular'),
        priceComp: card.querySelector('.price-compare'),
        badge: card.querySelector('.on_sale'),
        link: card.querySelector('.product-card-link')
    };

    // 3. Update Imagens (Verifica se a imagem existe no produto antes de trocar)
    if (elements.mainImg && swatch.dataset.mainImg) elements.mainImg.src = swatch.dataset.mainImg;
    if (elements.hoverImg && swatch.dataset.hoverImg) elements.hoverImg.src = swatch.dataset.hoverImg;

    // 4. Update Conteúdo
    if (elements.priceReg) elements.priceReg.innerText = swatch.dataset.price;
    if (elements.link) elements.link.href = swatch.dataset.variantUrl;

    // 5. Lógica de Sale
    const isSale = swatch.dataset.onSale === 'true';
    if (elements.priceComp) {
        elements.priceComp.innerText = swatch.dataset.compare;
        elements.priceComp.classList.toggle('hidden', !isSale);
    }
    if (elements.badge) elements.badge.classList.toggle('hidden', !isSale);
});