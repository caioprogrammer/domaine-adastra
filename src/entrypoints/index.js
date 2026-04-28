import ProductForm from '../product-form'

window.customElements.define('product-form', ProductForm)

document.addEventListener('DOMContentLoaded', () => {
        const swatches = document.querySelectorAll('.swatch-item');

        swatches.forEach(swatch => {
          swatch.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');

            card.querySelectorAll('.swatch-item').forEach(s => {
              s.classList.remove('ring-1', 'ring-domaineBlue', 'active-swatch');
            });
            this.classList.add('ring-1', 'ring-domaineBlue', 'active-swatch');

            const newUrl = this.getAttribute('data-variant-url');
            card.querySelector('.product-card-link').setAttribute('href', newUrl);

            const mainImg = this.getAttribute('data-main-img');
            const hoverImg = this.getAttribute('data-hover-img');
            
            if (mainImg) card.querySelector('[data-main-image]').src = mainImg;
            if (hoverImg) card.querySelector('[data-hover-image]').src = hoverImg;

            card.querySelector('.product-title').innerText = this.getAttribute('data-title');
            card.querySelector('.price-regular').innerText = this.getAttribute('data-price');
            
            const comparePrice = this.getAttribute('data-compare');
            const price = this.getAttribute('data-price');
            const compareElem = card.querySelector('.price-compare');
            
            if (comparePrice && comparePrice.trim() !== '' && !comparePrice.includes('0,00') && price < comparePrice) {
              compareElem.innerText = comparePrice;
              compareElem.classList.remove('hidden');
              card.querySelector('.on_sale').classList.remove('hidden')
            } else {
              compareElem.classList.add('hidden');
              card.querySelector('.on_sale').classList.add('hidden')
            }
          });
        });
      });