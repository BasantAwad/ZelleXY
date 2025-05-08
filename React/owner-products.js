
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productQuantityInput = document.getElementById("productQuantity");

const myFileInput = document.getElementById("myFile");
const submitButton = document.getElementById("submitProduct");

// Event listener for form submission
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Create a FormData object to collect form data
  const formData = new FormData();
  formData.append("productName", productNameInput.value);
  formData.append("productPrice", productPriceInput.value);
  formData.append("productCategory",productCategoryInput.value);
  formData.append("productQuantity",productQuantityInput.value);
  formData.append("productImage", myFileInput.files[0]); // Assuming you want to upload an image

     
    fetch('http://localhost:3000/Product', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
 
  
});

