import { configureStore, createSlice } from "@reduxjs/toolkit";

// slice for products
const productsSlice = createSlice({
    name : 'products',
    initialState :{
        veg:[
            {name: 'Tomato', price:200.5},
            {name: 'Potato', price:300.8},
            {name: 'Onion' , price:400.3},
            {name: 'Carrot', price:200.5},
            {name: 'Bringal', price:350.0}
        ],
        nonVeg:[
            {name: 'Chicken' , price:800.0},
            {name: 'Fish', price: 1000.00},
            {name: 'France', price: 500.00},
            {name: 'Mutton', price: 700.2}
        ]
    },
    reducers:{}
});


 const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const item = state.find(item=>item.name === action.payload.name);
            if(item){
                item.quantity+=1;
            }
            else{
                state.push({...action.payload,quantity:1})
            }

        },
        increment:(state,action) => {
            const item = state.find(item => item.name === action.payload.name);
            if(item){
                item.quantity+=1;
            }
        },
        decrement:(state, action) => {
            const  item = state.find(item => item.name === action.payload.name);
            if(item && item.quantity>1)
            {
                item.quantity-=1; 
            }
            else{
                return state.filter(item =>item.name !== action.payload.name);
            }

        },
        remove:(state,action) => {
            const item = state.find(item => item.name === action.payload.name);
            if(item){
                return state.filter(item => item.name !== action.payload.name);
            }
        }
    }  
})


export const {addToCart,decrement,increment,remove} = cartSlice.actions;

const store = configureStore({
    reducer:{
        products : productsSlice.reducer,
        cart: cartSlice.reducer,
    }
})

export default store;