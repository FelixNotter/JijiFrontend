const left_side = document.querySelector('.left-side')
const section1 = document.querySelector('.section1')
const footer = document.querySelector('.section1')


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function positionContainer(){
  const { scrollHeight} = document.documentElement;
  const scrollTop = document.body.scrollTop;

  const scrollPercent = scrollHeight - scrollTop;

  if(scrollTop >= (section1.offsetTop-60)){
      left_side.classList.add('become_fixed')
  }else{
     left_side.classList.remove('become_fixed')
  }
  if(scrollTop >= (footer.offsetTop+500)){
    left_side.classList.remove('become_fixed')
  } 

  console.log(footer.offsetTop)
  console.log(scrollTop)
}





// Home 
document.addEventListener('DOMContentLoaded', function() {
 

      // alert("fetching")
      fetch('https://jiji-twg0.onrender.com/jiji/products/', {
          method: 'GET',
         
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
          updateHome(data); 
          
        
          
      })
      .catch(error => {
          // alert("alerted")
          console.error('An error occured:', error);
      });
  }
)

// update the home Dom
function updateHome(data){
  products = data.products;
  categories =data.categories;
  regions = data.regions;
  // participants = data.room.participants;
  // console.log(messages)
  // const hostuserName= document.getElementById('host_userName');
  // const hostfullName= document.getElementById('host_fullName');
  // const roomName= document.getElementById('room_name');
  let productsContainer = document.getElementById('products_container');
  let hiddenContainer = document.getElementById('hidden_container');
  let categoryContainer = document.getElementById('category_container');
  let categoryhidden = document.getElementById('hidden_category');
  let regionContainer = document.getElementById('region_container');
  // let roomiesContainer = document.getElementById('roomies');


      // if (hostuserName) {
      //     hostuserName.textContent = room.host.user_name;
      // } else {
      //     // console.error('No username.');
      // }
      // if (hostfullName) {
      //     hostfullName.textContent = room.host.full_name;
      // } else {
      //     // console.error('No username.');
      // }
      // if (roomName) {
      //     roomName.textContent = room.name;
      // } else {
      //     // console.error('No username.');
      // }

    
      for (let i = 0;  products.length > i; i++) {
          let product =  products[i]
  
          // console.log( message);
          // console.log(messageContainer)
  
          let row =
           `
           <div onClick="addToCart(${product.id})" class="relative w-[11rem] rounded-md bg-white ">
           <a href="#">
               <div>
               <!--./FRONTEND/jiji/public/img/fruit.jpg-->

                  <img src="${product.product_url}" class="h-[8rem] w-[11rem] object-cover rounded-t-md">
               </div>
               <div class=" py-4 px-2">
                   <h1>${product.name}</h1>
                   <h2 class="text-green-600">GHC ${product.price}</h2>
               </div>
               <div class="absolute right-3 bg-white p-2 top-[52%] shadow-md rounded-[50%]">
                   <i class='bx bx-bookmark hover:shadow-lg cursor-pointer text-xl text-green-600'></i>
               </div>
              
               <div class="absolute left-0 top-[52%] text-center text-white px-1 text-sm rounded-tr-lg bg-[#0000007c]">
                   ${product.stock_quantity}
               </div>
           </a>
       </div>
          
          `

          let row1=
          `          
          <div onClick="addtoCart(${product.id})" class="relative rounded-md bg-white h-[16rem]">
         
          <div class="h-[75%] rounded-t-lg" style="background-image: url('${product.prduct_url}'); background-position: center; background-size: cover;">
          </div>
          <div class="text-[14px] py-2 px-2 ">
              <h1>${product.name}</h1>
              <h2 class="text-green-600">GHC ${product.price}</h2>
          </div>
          <div class="absolute right-3 bg-white p-2 top-[68%] shadow-md rounded-[50%]">
              <i class='bx bx-bookmark hover:shadow-lg cursor-pointer text-xl text-green-600'></i>
          </div>
         
          <div class="absolute left-0 top-[67%] text-center text-white px-1 text-sm rounded-tr-lg bg-[#0000007c]">
              ${product.stock_quantity}
          </div>
      </div>
          `
        
  
  
          productsContainer.innerHTML += row;

          hiddenContainer.innerHTML += row1;
  
          
      }

      for (let i = 0;  categories.length > i; i++) {
          let  category =   categories[i]

          // console.log(category)
  
          // console.log(  participant);
          // console.log(categoryContainer)
  
          let row2=
          ` <li onClick="categoryStore(${category.id})" class="flex justify-between group items-center hover:bg-[#cadbec93] p-2 cursor-pointer">
          <div class="flex">
              <img src="./FRONTEND/jiji/public/img/vehicles.png" class="h-8 w-8 mt-2">
              <div class="px-2">
                  <h2 class="text-gray-500 text-sm font-medium">${category.name}</h2>
              </div>   
          </div>
          <i class='bx bxs-chevron-right text-xl font-thin text-gray-700'></i>
         
      </li>
          
          `
          let row3=
          `
          <div onClick="categoryStore(${category.id})" class="bg-[#fff] py-2 px-2 lg:px-8 text-white">
                        <div class="flex justify-center my-3">
                            <img src="./FRONTEND/jiji/public/img/vehicles.png">
                        </div>
                        <h1 class="text-center text-gray-900 text-sm">${category.name}</h1>
                    </div>
          `
  
          categoryContainer.innerHTML += row2;
          categoryhidden.innerHTML += row3;

  
          
      }

      for (let i = 0;  regions.length > i; i++) {
        let  region =   regions[i]

        // console.log(region)

        // console.log(  participant);
        // console.log(categoryContainer)

        let row5=
        ` <li onClick="regionStore(${region.id})" class="flex justify-between group items-center hover:bg-[#cadbec93] p-2 cursor-pointer">
        <div class="flex">
            <img src="./FRONTEND/jiji/public/img/vehicles.png" class="h-8 w-8 mt-2">
            <div class="px-2">
                <h2 class="text-gray-500 text-sm font-medium">${region.name}</h2>
            </div>   
        </div>
        <i class='bx bxs-chevron-right text-xl font-thin text-gray-700'></i>
       
    </li>
        
        `
      

        regionContainer.innerHTML += row5;


        
    }

      
      
      
      // for (let i = 0;  participants.length > i; i++) {
      //     let  participant =   participants[i]
  
      //     // console.log(  participant);
      //     // console.log(roomiesContainer)
  
      //     let row =
      //      `
      //      <a class="quality__item js-popup-open" href="#popup-user" data-effect="mfp-zoom-in">
      //      <div class="quality__preview bg-pink-opacity"><img class="quality__pic" src="img/figure-1.png" alt=""></div>
      //      <div class="quality__details">
      //        <div class="quality__category title">${participant.user_name}<svg class="icon icon-arrow-right">
      //            <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
      //          </svg></div>
      //        <div class="quality__info caption-sm">${participant.full_name}</div>
      //      </div>
      //    </a>
          
      //     `
  
      //     roomiesContainer.innerHTML += row;
  
          
      // }
     


}

function categoryStore(id){
  localStorage.setItem('catId', id);
  console.log(id)
  categoryFilter(id)
}

// filter by category 
function categoryFilter(categoryId){

  const catId  = categoryId;
  console.log(catId)

  fetch(`https://jiji-twg0.onrender.com/jiji/products/?category_id=${categoryId}`, {
    method: 'GET',
   
})
.then(response => {
    if (!response.ok) {
      
      console.log("An error occured ")
    }
    return response.json();
})
.then(data => {
  // alert('JSONed')
  //  console.log(data)

  let productsContainer = document.getElementById('products_container');
      productsContainer.innerHTML = '';
  
  let categoryContainer = document.getElementById('category_container');
  categoryContainer.innerHTML = '';



    updateHome(data);            
    
})
.catch(error => {
    // alert("alerted")
    console.error('An error occured:', error);
});

}

//filter by range
function rangeFilter(){

const categoryId = localStorage.getItem('catId');

  // const catId  = categoryId;
  console.log(categoryId)

  const minRange = document.getElementById('minimum').value;
  const maxRange = document.getElementById('maximum').value;

  console.log(minRange)
  console.log(maxRange)

  if (parseInt(maxRange)<parseInt(minRange)){
    alert("The max range  should be greater than the min range")
     return 
  }
// alert("fetching")
  fetch(`https://jiji-twg0.onrender.com/jiji/products/?&min_price=${minRange}&max_price=${maxRange}`, {
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
  // alert('JSONed')
   console.log(data)

  let productsContainer = document.getElementById('products_container');
      productsContainer.innerHTML = '';
  
  let categoryContainer = document.getElementById('category_container');
  categoryContainer.innerHTML = '';



    updateHome(data);            
    
})
.catch(error => {
    // alert("alerted")
    console.error('An error occured:', error);
});

}


// Filter by region
function regionStore(id){
  localStorage.setItem('RegId', id);
  console.log(id)
  regionFilter(id)
}

// filter by category 
function regionFilter(regionId){

  // const catId  = categoryId;
  // console.log(catId)

  fetch(`https://jiji-twg0.onrender.com/jiji/products/?category_id=${regionId}`, {
    method: 'GET',
   
})
.then(response => {
    if (!response.ok) {
      
      console.log("An error occured ")
    }
    return response.json();
})
.then(data => {
  // alert('JSONed')
  //  console.log(data)

  let productsContainer = document.getElementById('products_container');
      productsContainer.innerHTML = '';
  
  let categoryContainer = document.getElementById('category_container');
  categoryContainer.innerHTML = '';



    updateHome(data);            
    
})
.catch(error => {
    // alert("alerted")
    console.error('An error occured:', error);
});

}



// Adding a product to cart
function addToCart(cartId){

  const cartItem  = cartId;
  console.log(cartItem)
// alert("fetching")
  fetch('https://jiji-twg0.onrender.com/jiji/addcart/',{
    method: 'POST',
    headers:{
      'content-Type':'application/json'
    },
    body: JSON.stringify({
      product_id: cartItem,
       
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

  // let productsContainer = document.getElementById('products_container');
  //     productsContainer.innerHTML = '';
  
  // let categoryContainer = document.getElementById('category_container');
  // categoryContainer.innerHTML = '';

    alert("Your product has been successfully added to cart")

  //   updateHome(data);            
    
})
.catch(error => {
    // alert("alerted")
    console.error('An error occured:', error);
});

}