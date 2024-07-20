document.addEventListener('DOMContentLoaded', function() {
 

    // alert("fetching")
    fetch('https://jijiapibackend.onrender.com/jiji/cart/', {
        method: 'GET',
       
    })
    .then(response => {
    // alert("responding")
        if (!response.ok) {
          
          console.log("An error occured ")
        }
        return response.json();
    })
    .then(data => {
    //   alert('JSONed')
       console.log(data)
        updateCartHome(data); 
        
      
        
    })
    .catch(error => {
        // alert("alerted")
        console.error('An error occured:', error);
    });
}
)

function updateCartHome(data){
    // products = data.product_id;
    // stock_quantity = data.products.stock_quantity;
    // quantity =data.quantity;
   
 
    let productsContainer = document.getElementById('cart_container');
   
    
  
      
        for (let i = 0;  data.length > i; i++) {
            let product =  data[i]
    
            // console.log( message);
            // console.log(messageContainer)
    
            let row =
             `
             <div style="width: 30rem; height: 25rem; margin-right: 1.7rem; margin-bottom: 1.7rem;" class="relative rounded-md bg-white ">
              <div class="h-[70%] rounded-t-lg" style="background-image: url('${product.product_id.product_url}'); background-position: center; background-size: cover;">
        </div> 
            <div class="text-[14px] py-2 px-2 ">
                <h1 style="font-size: 1.2rem;">${product.product_id.name}</h1>
                <h2 class="text-green-600">GHC ${product.product_id.price}</h2>
            </div>
            <hr>
            <div style="color: blue; margin:1.2rem;">
                <h1 class="text-blue-600">${product.product_id.description}.</h1>
            </div>
            <hr>

            <div style="margin-top: 2rem;" class="range">
              <label for="">Available quantity</label> 
              <input type="number" name="" id="available_quantity" value="${product.product_id.stock_quantity}" disabled>
              <span>-</span>
              <label for="">Order quantity</label> 
              <input type="number" name="" id="order_quantity">
            </div>
             
            <div style="display:flex; width:100%; margin-top:2rem;" id="flexeddiv">

            <div onClick="deleteItem(${product.id})" style="left:1rem; background-color:red;color:white; padding:0.5rem; border-radius:0.3rem" class="absolute  bg-white p-2 top-[90%] shadow-md ]">
                <i  class='bx hover:shadow-lg cursor-pointer text-xl '>Delete item </i>
            </div>

            <div style=" border-radius:0.5rem, padding:2rem;"  onClick="orderItem(${product.id},${product.product_id.stock_quantity})" class="absolute right-3 bg-white p-2 top-[90%] shadow-md ">
                <i class='bx bx-bookmark hover:shadow-lg cursor-pointer text-xl text-green-600'> Order </i>
            </div>

            </div>
           
            

        </div>
            
            `
            productsContainer.innerHTML += row;
  
        }
  
    
       
  
  
  }

  function deleteItem(id){

    alert("Item  will be removed from cart");

    fetch(`https://jijiapibackend.onrender.com/jiji/cart/${id}/`, {
        method: 'DELETE',
       
    })
    .then(response => {
    // alert("responding")
        if (!response.ok) {
          
          console.log("An error occured ")
        }
        return response.json();
    })
    .then(data => {
    //   alert('JSONed')
    //    console.log(data)
        
       window.location.href="/FRONTEND/jiji/src/cart.html"
        
      
        
    })
    .catch(error => {
        // alert("alerted")
        // console.error('An error occured:', error);
        window.location.href="/FRONTEND/jiji/src/cart.html"

    });

  }

  function orderItem(id,quant){
    const item =id;
    const order  = document.getElementById('order_quantity').value;

    console.log(quant)

    if (order > quant){
        alert("Youre ordering more than the available quantity")
        window.location.href="/FRONTEND/jiji/src/cart.html"

        return
    }
    else if (order < 1){
        alert("Enter an amount to order")
        window.location.href="/FRONTEND/jiji/src/cart.html"

        return
    }
 
    fetch(`https://jijiapibackend.onrender.com/jiji/cart/${item}/`,{
        method: 'PATCH',
        headers:{
          'content-Type':'application/json'
        },
        body: JSON.stringify({
          quantity: order,
           
        })
    })
    .then(response => {
        if (!response.ok) {
          
          console.log("An error occured ")
        }
        return response.json();
    })
    .then(data => {
      // alert('JSONed')
       console.log(data)
    
   
    
        alert("Your order was successful")

        const flexed = document.getElementById('flexeddiv');
        flexed.remove();
    
      //   updateHome(data);            
        
    })
    .catch(error => {
        // alert("alerted")
        console.error('An error occured:', error);
    });

 
    
  }
