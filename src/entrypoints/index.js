import ProductForm from '../product-form'
import { initSwatchListener } from '../swatches'
import Alpine from 'alpinejs'

window.customElements.define('product-form', ProductForm);
Alpine.start();
initSwatchListener();