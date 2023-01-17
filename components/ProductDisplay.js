app.component('product-display',{
    props:{
        premium:{
            type:Boolean,
            required:true
        }
      },
    template:
      /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">

             <!-- Binding an Image -->
            <img :src="image" alt="" srcset="">

          </div>

          <div class="product-info">
            <h1>{{ title }}</h1>

            <!-- Conditional Rendering -->
            <p v-if="InStock">In Stock</p>
            <p v-else>Out Of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <!-- List Rendering -->
            <ul>
              <li v-for="detail in details" :key="detail.id">{{detail}}</li>
            </ul>

            <!-- Class And Style Binding -->
            <ul>
              <li v-for="(variant,index) in variants" 
              :key="index" 
              @mouseover="updateImage(index)"
              class="color-circle"
              :style="{backgroundColor: variant.color}"
              ></li>
            </ul>

            <!-- Event Handling -->
            <button class="button" @click="addToCart"
            :class="{disabledButton:!InStock}"
            :disabled="!InStock"
            >Add to Cart</button>

            <button class="button" @click="removeFromCart">Remove Item</button>
            
            <review-list :reviews="reviews"></review-list>
            <review-form  w-form @review-submitted="addReview" ></review-form>

          </div>

        </div>
      </div>`,

     
      data: function () {
        return {
          product: "Socks",
          selectedVariant: 0,
          brand: 'Vue Mastery',
          details: ["50% cotton", "30% wool", "20% polyester"],
          variants: [
            { id: 2234, color: "green", image: "./assets/images/socks_green.jpg" , quantity: 50 },
            { id: 2235, color: "blue", image: "./assets/images/socks_blue.jpg" ,quantity: 0 },
          ],
          reviews:[]
        };
      },
      methods: {
        // Add Item In Cart
        addToCart() {
            console.log('clicked');
          this.$emit('add-to-cart',this.variants[this.selectedVariant].id);
        },
        // UpdateImage
        updateImage(index){
            this.selectedVariant=index
            console.log(this.selectedVariant); 
        },
        // Remove Item
        removeFromCart(){
            this.$emit('remove-Item',this.variants[this.selectedVariant].id)
        },
        // Add Review
        addReview(review) {
          this.reviews.push(review)
        }
      },
      computed: {
        title(){
            return this.brand + ' ' + this.product
        }
        ,
        image(){
            return this.variants[this.selectedVariant].image
        },
        InStock(){
           return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if(this.premium){
                return 'Free-Shipping'
            }
            return 2.99
        }
      },
})