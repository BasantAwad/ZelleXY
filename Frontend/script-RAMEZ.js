const cart = document.getElementById('cartLogo');


function cartOpacity(){
        const cartContainer = document.querySelector('.cart-container');
        const logo = document.querySelector('#cartLogo');
        const logo1 = document.querySelector('#cartLogoIn')

        console.log(cartContainer)
        if (window.innerWidth > 858){
        if(cartContainer.style.display=='block'){
                cartContainer.style.display='none'
                console.log('done')
        }
        else{
                logo1.style.opacity= '100%'
                console.log(logo)
cartContainer.style.display='block'
logo.style.zIndex=999999;

        cartContainer.style.zIndex =' 1000';
        cartContainer.style.opacity = '90%'
        }
}
else{
        window.location.href ='cart.html'
}

}




function dosomething(){
        const name=document.getElementById('name');
        const email=document.getElementById('email');
        const country=document.getElementById('country');
        const address=document.getElementById('address');
        const phone=document.getElementById('phone');
        const edit=document.getElementById('edit');
        const done=document.getElementById('done');
        const profbutton=document.getElementById('profile-button');
        const elements = [name, email, country, address, phone];
     
elements.forEach(element =>{
        element.contentEditable=true;
        element.style.borderBlockColor='yellow';
        element.style.lineHeight=1.4;
        console.log('done');
        console.log(0.1+0.2);
});   

        edit.hidden=true;
        done.hidden=false;  
        profbutton.hidden=false;     
}

function dosomething2(){
        const name=document.getElementById('name');
        const email=document.getElementById('email');
        const country=document.getElementById('country');
        const address=document.getElementById('address');
        const phone=document.getElementById('phone');
        const edit=document.getElementById('edit');
        const done=document.getElementById('done');
        const profbutton=document.getElementById('profile-button');
        const elements = [name, email, country, address, phone];
     const namecontent=name.textContent;
        elements.forEach(element => {
                element.contentEditable=false;
                console.log('done');
        });  
        
        edit.hidden=false;
        done.hidden=true; 
        profbutton.hidden=true;  
        console.log(namecontent);
      const customerName = document.getElementById('prof-title');
      customerName.textContent=namecontent;
}

function previewImage(event,inputID) {
        const fileInput = event.target; // Get the file input element
        const file = fileInput.files[0]; // Get the first file selected (assuming single file selection)
        const IMGelement = document.getElementById(inputID);
        if (file) {
          const reader = new FileReader(); // Create a new FileReader object
      
          reader.onload = function(e) {
            // Get the img element
            IMGelement.src = e.target.result; // Set the src attribute of the img element to the loaded image data
          };
      
          reader.readAsDataURL(file); // Read the file as a data URL (base64 encoded string)
        }
}


function uploadProduct(){
        const productNameInput = document.querySelector(".product-name");
const productPriceInput = document.querySelector(".product-price");
const productCategoryInput = document.querySelector(".product-category");
const productQuantityInput = document.querySelector(".product-quantity");
const productDescInput = document.querySelector(".product-description");

const myFileInput = document.querySelector(".new-product-image");

// Event listener for form submission

  // Create a FormData object to collect form data
  const Product = new FormData();
  Product.append("productName", productNameInput.value);
  Product.append("productPrice", productPriceInput.value);
  Product.append("productCategory",productCategoryInput.value);
  Product.append("productQuantity",productQuantityInput.value);
  Product.append("productDescription",productDescInput.value);

  Product.append("productImage", myFileInput.files[0]); // Assuming you want to upload an image

     
    fetch('http://localhost:3000/Product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Product)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
 
  



}
