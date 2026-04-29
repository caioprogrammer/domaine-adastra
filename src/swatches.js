export const initSwatchListener = () => {

    document.addEventListener('click', (e) => {
        const swatch = e.target.closest('.swatch-item');
        if (!swatch) return;

        e.preventDefault();

        const card = swatch.closest('[data-product-card]');
        if (!card) return;

        card.querySelectorAll('.swatch-item').forEach(
            s => s.classList.remove('ring-1', 'ring-domaineBlue', 'active-swatch')
        );
        swatch.classList.add('ring-1', 'ring-domaineBlue', 'active-swatch');

        const elements = {
            mainImg: card.querySelector('[data-main-image]'),
            hoverImg: card.querySelector('[data-hover-image]'),
            priceReg: card.querySelector('.price-regular'),
            priceComp: card.querySelector('.price-compare'),
            badge: card.querySelector('.on_sale'),
            link: card.querySelector('.product-card-link')
        };

        if (elements.mainImg && swatch.dataset.mainImg) elements.mainImg.src = swatch.dataset.mainImg;
        if (elements.hoverImg && swatch.dataset.hoverImg) elements.hoverImg.src = swatch.dataset.hoverImg;

        if (elements.priceReg) elements.priceReg.innerText = swatch.dataset.price;
        if (elements.link) elements.link.href = swatch.dataset.variantUrl;

        const isSale = swatch.dataset.onSale === 'true';
        if (elements.priceComp) {
            elements.priceComp.innerText = swatch.dataset.compare;
            elements.priceComp.classList.toggle('hidden', !isSale);
        }
        if (elements.badge) elements.badge.classList.toggle('hidden', !isSale);
    })
}