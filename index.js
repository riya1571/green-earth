const manageSpinner=(status)=>{
    if(status){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('all-plants-container').classList.add('hidden');

    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('all-plants-container').classList.remove('hidden');
    }
}


const loadCategories=()=>{
    
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res=>res.json())
    .then(json=>displayCategories(json.categories));
}
let totalPrice=0;
const displayCategories=(data)=>{
    const categoriesContainer=document.getElementById("categories");
// category_name
    data.forEach(element => {
        // console.log(element);
        const newElement=document.createElement('div');
        newElement.innerHTML=`
        <button onclick="loadCategoriesDetails(${element.id})" class="hover:bg-[#15803D] hover:text-white text-black text-[20px] hover:cursor-pointer font-light py-[8px] px-[10px] rounded-[4px] w-[100%] mb-[10px]">${element.category_name}</button>
        `;
        newElement.id=`category-${element.id}`;
        categoriesContainer.appendChild(newElement);

    });
    
   
}
loadCategories();

// category
// : 
// "Fruit Tree"
// description
// : 
// "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
// id
// : 
// 1
// image
// : 
// "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
// name
// : 
// "Mango Tree"
// price
// : 
// 500
const allPlants=()=>{
    manageSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res=>res.json())
    .then(json=>displayAllPlants(json.plants))
}
const displayAllPlants=(data)=>{
    // console.log(data);
    const allPlantsContainer=document.getElementById('all-plants-container');
    data.forEach(element=>{
        
        const newEl=document.createElement('div');
        newEl.innerHTML=`
            <div  class="bg-white p-[16px] w-[300px] rounded-[8px] shadow-sm">
                    <img class="w-[330px] h-[290px]" src="${element.image}" alt="">
                    <h2 class="text-[14px] font-semibold mt-[12px]">${element.name}</h2>
                    <p class="text-[12px] mt-[8px]">${element.description}</p>
                    <div class="flex justify-between items-center mt-[8px]">
                        <button onclick="loadModalDetails(${element.id})" class="text-[12px] font-medium text-[#15803D] bg-[#DCFCE7] rounded-xl py-[4px] px-[12px]">${element.category}</button><button class="text-[14px] font-semibold">৳ ${element.price}</button>
                    </div>
                    <button onclick="loadCart(${element.id})" type="button" class="btn btn-outline-primary mt-[12px] bg-[#15803D] text-white rounded-4xl w-[100%] ">Add to Cart</button>
                </div>
        `;
        allPlantsContainer.appendChild(newEl);
    });
    manageSpinner(false);
}
allPlants();


const loadCategoriesDetails=(id)=>{
    const dd= document.getElementById('alltrees');
    dd.classList.remove('active');
    manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(json=>{
        const clickBtn=document.getElementById(`category-${id}`);
        const activeButton=document.querySelectorAll('.active');
        activeButton.forEach(res=>{
            res.classList.remove('active');
        });
        console.log(clickBtn)
        // clickBtn.classList.add('bg-[#15803D]');
        // clickBtn.classList.remove('text-black');
        clickBtn.classList.add('active');
        displayCategoriesDetails(json.plants)
    });
    
}
const displayCategoriesDetails=(data)=>{
    const allPlantsContainer=document.getElementById('all-plants-container');
    allPlantsContainer.innerHTML='';
    data.forEach(element=>{
        // console.log(element);
        const newEl=document.createElement('div');
        newEl.innerHTML=`
            <div  class="bg-white  p-[16px] w-[300px]  rounded-[8px] shadow-sm">
                    <img class="w-[330px] h-[290px]" src="${element.image}" alt="">
                    <h2 class="text-[14px] font-semibold mt-[12px]">${element.name}</h2>
                    <p class="text-[12px] mt-[8px]">${element.description}</p>
                    <div class="flex justify-between items-center mt-[8px]">
                        <button onclick="loadModalDetails(${element.id})" class="text-[12px] font-medium text-[#15803D] bg-[#DCFCE7] rounded-xl py-[4px] px-[12px]">${element.category}</button><button class="text-[14px] font-semibold">৳ ${element.price}</button>
                    </div>
                    <button onclick="loadCart(${element.id})" type="button" class="btn btn-outline-primary mt-[12px] bg-[#15803D] text-white rounded-4xl w-[100%] ">Add to Cart</button>
                </div>
        `;
        allPlantsContainer.appendChild(newEl);
    });
    manageSpinner(false);
}

const loadModalDetails=(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(json=>displayModalDetails(json.plants));
}

// category
// : 
// "Fruit Tree"
// description
// : 
// "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
// id
// : 
// 1
// image
// : 
// "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
// name
// : 
// "Mango Tree"
// price
// : 
// 500

const displayModalDetails=(data)=>{
    const container=document.getElementById('modal-box-container');
    container.innerHTML=`
    <h3 class="text-[25px] font-bold mb-[10px]">${data.name}</h3>
                <img class='rounded-[10px] mb-[10px]' src="${data.image}" alt="">
                <p class='mb-[5px]'><span class="font-bold text-[16px]">Category:</span> ${data.category}</p>
                <p class='mb-[5px]'><span class="font-bold text-[16px]">Price:</span> ৳ ${data.price}</p>
                <p class='mb-[5px]'><span class="font-bold text-[16px]">Description:</span> ${data.description}</p>
    `;
    document.getElementById('my_modal_1').showModal();
}

const loadCart=(id)=>{
    
    const url=`https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(json=>{

    alert(`${json.plants.name} has been added to the cart.`);

    const newEl=document.createElement('div');
    totalPrice+=json.plants.price;
    document.getElementById('total-price').innerText=totalPrice;
    newEl.innerHTML=`
        <div id='cart-box-${id}' class="flex items-center justify-between bg-[#F0FDF4] p-[8px] rounded-[8px] mb-[8px]">
                <div>
                    <h2>${json.plants.name}</h2>
                    <p>৳ ${json.plants.price}</p>
                </div>
                <button onclick='priceCross(${json.plants.price},${id})' class="hover:cursor-pointer"><i class="fa-solid fa-xmark"></i></button>
                </div>
    `;
    const container=document.getElementById('cart-container');
    container.appendChild(newEl);
    });

}
const priceCross=(price,id)=>{
    totalPrice-=price;
     const val=document.getElementById(`cart-box-${id}`);
    //  val.innerHTML=``;
    val.remove();
    
    document.getElementById('total-price').innerText=totalPrice;
}