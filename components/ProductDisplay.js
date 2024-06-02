app.component('product-display', {
    props: {
         premium: {
            type: Boolean,
            required: true
         }
    },
    template:
        /*html*/
        `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping}}</p>
            <product-details></product-details>
            <div class="color-circle" v-for="(variant, index) in variants" :key="variant.id"
              @mouseover="updateVariant(index)" :style="{ backgroundColor: variant.color }"></div>
            <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart">Add
              to Cart</button>
          </div>
        </div>
      </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false },
            ]
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            if (this.variants[this.selectedVariant].onSale) {
                return this.brand + ' ' + this.product + ' is on sale!'
            } else {
                return this.brand + ' ' + this.product
            }
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if(this.premium){
                return 'Free'
            } else {
                return 2.99 
            }
        }
    }
})