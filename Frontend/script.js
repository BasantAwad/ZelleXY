
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


