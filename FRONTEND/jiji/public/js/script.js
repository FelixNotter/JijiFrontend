const left_side = document.querySelector('.left-side')
const section1 = document.querySelector('.section1')
const footer = document.querySelector('.section1')
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
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
document.addEventListener('DOMContentLoaded', function() {
      fetch('https://jijiapibackend-1.onrender.com/jiji/products/', {
          method: 'GET',
      })
      .then(response => {
          if (!response.ok) {
            console.log("An error occured ")
          }
          return response.json();
      })
      .then(data => {
         console.log(data)
          updateHome(data); 
      })
      .catch(error => {
          console.error('An error occured:', error);
      });
  }
)
function updateHome(data){
  products = data.products;
  categories =data.categories;
  regions = data.regions;
  let productsContainer = document.getElementById('products_container');
  let hiddenContainer = document.getElementById('hidden_container');
  let categoryContainer = document.getElementById('category_container');
  let categoryhidden = document.getElementById('hidden_category');
  let regionContainer = document.getElementById('region_container');
      for (let i = 0;  products.length > i; i++) {
          let product =  products[i]
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
}
function categoryStore(id){
  localStorage.setItem('catId', id);
  console.log(id)
  categoryFilter(id)
}
function categoryFilter(categoryId){
  const catId  = categoryId;
  console.log(catId)
  fetch(`https://jijiapibackend-1.onrender.com/jiji/products/?category_id=${categoryId}`, {
    method: 'GET',
})
.then(response => {
    if (!response.ok) {
      console.log("An error occured ")
    }
    return response.json();
})
.then(data => {
  let productsContainer = document.getElementById('products_container');
      productsContainer.innerHTML = '';
  let categoryContainer = document.getElementById('category_container');
  categoryContainer.innerHTML = '';
    updateHome(data);            
})
.catch(error => {
    console.error('An error occured:', error);
});
}
function rangeFilter(){
const categoryId = localStorage.getItem('catId');
  console.log(categoryId)
  const minRange = document.getElementById('minimum').value;
  const maxRange = document.getElementById('maximum').value;
  console.log(minRange)
  console.log(maxRange)
  if (parseInt(maxRange)<parseInt(minRange)){
    alert("The max range  should be greater than the min range")
     return 
  }
  fetch(`https://jijiapibackend-1.onrender.com/jiji/products/?&min_price=${minRange}&max_price=${maxRange}`, {
    method: 'GET',
})
.then(response => {
    if (!response.ok) {
      console.log("An error occured ")
    }
    return response.json();
})
.then(data => {
   console.log(data)
  let productsContainer = document.getElementById('products_container');
      productsContainer.innerHTML = '';
  let categoryContainer = document.getElementById('category_container');
  categoryContainer.innerHTML = '';
    updateHome(data);            
})
.catch(error => {
    console.error('An error occured:', error);
});
}
function regionStore(id){
  localStorage.setItem('RegId', id);
  console.log(id)
  regionFilter(id)
}
function regionFilter(regionId){
  fetch(`https://jijiapibackend-1.onrender.com/jiji/products/?category_id=${regionId}`, {
    method: 'GET',
})
.then(response => {
    if (!response.ok) {
      console.log("An error occured ")
    }
    return response.json();
})
.then(data => {
  let productsContainer = document.getElementById('products_container');
      productsContainer.innerHTML = '';
  let categoryContainer = document.getElementById('category_container');
  categoryContainer.innerHTML = '';
    updateHome(data);            
})
.catch(error => {
    console.error('An error occured:', error);
});
}
function addToCart(cartId){
  const cartItem  = cartId;
  console.log(cartItem)
  fetch('https://jijiapibackend-1.onrender.com/jiji/cart/',{
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
   console.log(data)
    alert("Your product has been successfully added to cart")
})
.catch(error => {
    console.error('An error occured:', error);
});
}
