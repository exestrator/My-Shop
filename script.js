let products = [
    {id:1,title:"mini points",price:0.01,category:"currency",stock:true,image:"images/image_part_001.JPG"},
    {id:2,title:"mini Beans",price:1,category:"currency",stock:true,image:"images/image_part_002.JPG"},
    {id:3,title:"mini Coins",price:10,category:"currency",stock:true,image:"images/image_part_003.JPG"},
   
    {id:4,title:"minigun: phantom",price:150,category:"skins",stock:true,image:"images/image_part_004.JPG"},
    {id:5,title:"minigun: dragon",price:100,category:"skins",stock:true,image:"images/image_part_005.JPG"},
    {id:6,title:"minigun: gold",price:100,category:"skins",stock:false,image:"images/image_part_006.JPG"},
   
    {id:7,title:"pistol: star crasher",price:120,category:"skins",stock:true,image:"images/image_part_007.JPG"},
    {id:8,title:"pistol: neon rider",price:80,category:"skins",stock:true,image:"images/image_part_008.JPG"},
    {id:9,title:"pistol: classic",price:50,category:"skins",stock:true,image:"images/image_part_009.JPG"},
   
    {id:10,title:"rifle: thunder",price:180,category:"skins",stock:true,image:"images/image_part_010.JPG"},
    {id:11,title:"rifle: shadow",price:130,category:"skins",stock:true,image:"images/image_part_011.JPG"},
    {id:12,title:"rifle: blaze",price:90,category:"skins",stock:true,image:"images/image_part_012.JPG"},
   
    {id:13,title:"sniper: eagle eye",price:200,category:"skins",stock:true,image:"images/image_part_013.JPG"},
    {id:14,title:"sniper: ghost",price:160,category:"skins",stock:true,image:"images/image_part_014.JPG"},
    {id:15,title:"sniper: frost",price:110,category:"skins",stock:true,image:"images/image_part_015.JPG"}
   ];
   
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   let favorites = JSON.parse(localStorage.getItem("fav")) || [];
   let promoActive = false;
   
   const pc = document.getElementById("product-container");
   const cartInfo = document.getElementById("cart-info");
   
   const searchInput = document.getElementById("search-input");
   const categorySelect = document.getElementById("category-select");
   const minPriceInput = document.getElementById("min-price-input");
   const sortSelect = document.getElementById("sort-select");
   
   const cartModal = document.getElementById("cart-modal");
   const cartList = document.getElementById("cart-list");
   const cartTotal = document.getElementById("cart-total");
   const promoInput = document.getElementById("promo-input");
   
   const productsContainer = document.getElementById("products");


  

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = product.price + " $";

    card.append(img, title, price);
    productsContainer.appendChild(card);
  });
}

renderProducts();



   function save(){ localStorage.setItem("cart",JSON.stringify(cart)); }
   
   function grouped(){
    let m={};
    cart.forEach(p=>m[p.id]?m[p.id].qty++:m[p.id]={...p,qty:1});
    return Object.values(m);
   }
   
   function updateTop(){
    let g=grouped();
    let items=g.reduce((s,p)=>s+p.qty,0);
    cartInfo.textContent=items;
   }
   
   function renderProducts(){
    pc.innerHTML="";
    let list=[...products];
   
    if(searchInput.value) list=list.filter(p=>p.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    if(categorySelect.value) list=list.filter(p=>p.category===categorySelect.value);
    if(minPriceInput.value) list=list.filter(p=>p.price>=minPriceInput.value);
    if(sortSelect.value==="asc") list.sort((a,b)=>a.price-b.price);
    if(sortSelect.value==="desc") list.sort((a,b)=>b.price-a.price);
   
    list.forEach(p=>{
     let c=document.createElement("div");
     c.className="product-card";
   
     c.innerHTML=`
      <img src="${p.image}">
      <h3>${p.title}</h3>
      <div>$${p.price}</div>
      <div class="stock" style="color:${p.stock?"green":"red"}">${p.stock?"In stock":"Out of stock"}</div>
     `;
   
     let fav=document.createElement("button");
     fav.className="fav";
     fav.textContent=favorites.includes(p.id)?"❤️":"🤍";
     fav.onclick=()=>{favorites.includes(p.id)?favorites=favorites.filter(i=>i!==p.id):favorites.push(p.id);
      localStorage.setItem("fav",JSON.stringify(favorites)); renderProducts();};
   
     let counter=document.createElement("div");
     counter.className="counter";
   
     let minus=document.createElement("button");
     minus.textContent="−";
     minus.onclick=()=>{let i=cart.findIndex(x=>x.id===p.id);if(i!=-1)cart.splice(i,1);save();updateTop();renderProducts();};
   
     let plus=document.createElement("button");
     plus.textContent="+";
     plus.disabled=!p.stock;
     plus.onclick=()=>{cart.push(p);save();updateTop();renderProducts();};
   
     counter.append(minus,plus);
     c.append(fav,counter);
     pc.appendChild(c);
    });
   }
   
   function renderCart(){
    cartList.innerHTML="";
    let g=grouped(),sub=0;
   
    g.forEach(i=>{
     sub+=i.price*i.qty;
     let r=document.createElement("div");
     r.className="cart-row";
     r.textContent=`${i.title} x ${i.qty}`;
     cartList.appendChild(r);
    });
   
    let d=0;
    if(sub>300) d+=sub*0.1;
    if(promoActive) d+=sub*0.1;
   
    cartTotal.innerHTML=`Subtotal: $${sub}<br>Discount: $${d.toFixed(2)}<br><b>Total: $${(sub-d).toFixed(2)}</b>`;
   }
   
   /* EVENTS */
   document.getElementById("open-cart").onclick=()=>{renderCart();cartModal.classList.remove("hidden");};
   document.getElementById("close-cart").onclick=()=>cartModal.classList.add("hidden");
   
   document.getElementById("apply-promo").onclick=()=>{promoActive=promoInput.value==="CODE10";renderCart();};
   document.getElementById("clear-cart-modal").onclick=()=>{cart=[];save();updateTop();renderProducts();renderCart();};
   document.getElementById("checkout-btn").onclick=()=>{alert("Paid 😎");cart=[];save();location.reload();};
   
   document.getElementById("theme-btn").onclick=()=>{document.body.classList.toggle("dark");};
   
   [searchInput,categorySelect,minPriceInput,sortSelect].forEach(e=>e.addEventListener("input",renderProducts));
   
   updateTop();
   renderProducts();
   