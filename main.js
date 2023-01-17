const app = Vue.createApp({
  data() {
    return {
        cart: [],
        premium:true
    }
  },
  methods: {
    updateCart(id){
        this.cart.push(id)
        console.log(this.cart);
    },
    removeCart(id){
        if(this.cart.length>0){
            console.log(id)
            this.cart.pop(id)
        }
    }
  },
});
