//htmlربط الفانكشن بزرار ال
let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let productDescriptionInput = document.getElementById("productDescriptionInput");
let updateBtn = document.getElementById("updateBtn");
let addItem = document.getElementById("addItem");
let tableBody = document.getElementById("tableBody");

var currentIndex;
var products; //array for memory input
//browserعشان اعمل تخزين في
if (localStorage.getItem("productsContainer") != null) {
  products = JSON.parse(localStorage.getItem("productsContainer"));
  displayProduct(products);
} else {
  products = [];
}

function addProduct() {
  //object
    let product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      cate: productCategoryInput.value,
      desc: productDescriptionInput.value,
    };
    products.push(product);
    console.log(product);
    localStorage.setItem("productsContainer", JSON.stringify(products)); //set لازم الاول
    clearform(); //function تنظف المدخلات بعد متتكتب
    displayProduct(products); //فانكشن عرض المنتجات

  } 

addItem.addEventListener("click", addProduct);
updateBtn.addEventListener("click", updateData);
function clearform() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

// لو عندي اكتر من داله عاوز اعرضها بداله واحده فقط
function displayProduct(productList) {
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    cartona += `  <tr>
    <td>${i + 1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].cate}</td>
    <td>${productList[i].desc}</td>
    <td>
        <button onclick="updateProduct(${i})" class="btn btn-sm btn-outline-danger">update</button>
    </td>
    <td>
       <button onclick="deleteProduct(${i})" class="btn btn-sm btn-outline-info">delete</button>
    </td>
  </tr> `;
  }

  tableBody.innerHTML = cartona;
}

function searchProducts(searchTerm) {
  let searchResult = [];
  for (var i = 0; i < products.length; i++) {
    if ( products[i].name.toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) == true
    ) {
      searchResult.push(products[i]);
      //console.log(products[i].name);
    }
  }
  displayProduct(searchResult);
}
//  searchProducts("o")
//console.log("Nokia".toLocaleLowerCase().includes("NokIa".toLocaleLowerCase()));

// Delete function
function deleteProduct(deleteIndex) {
  products.splice(deleteIndex, 1);
  localStorage.setItem("productsContainer", JSON.stringify(products));
  displayProduct(products);
}

function updateProduct(updateIndex) {
  currentIndex = updateIndex;

  productNameInput.value = products[updateIndex].name;
  productPriceInput.value = products[updateIndex].price;
  productCategoryInput.value = products[updateIndex].cate;
  productDescriptionInput.value = products[updateIndex].desc;

  updateBtn.classList.replace("d-none", "d-inline-block");
  addItem.classList.add("d-none");
}

function updateData() {
  products[currentIndex].name = productNameInput.value;
  products[currentIndex].price = productPriceInput.value;
  products[currentIndex].cate = productCategoryInput.value;
  products[currentIndex].desc = productDescriptionInput.value;

  localStorage.setItem("productsContainer", JSON.stringify(products));

  displayProduct(products);
  clearform();

  updateBtn.classList.replace("d-inline-block", "d-none");
  addItem.classList.remove("d-none");
}

// regular Expresssion
// function validateProduct() {
//   var regex = /^[A-Z][a-z]{3,8}$/;
//   if (regex.test(productNameInput.value) == true) {
//     productNameInput.classList.add("is-valid");
//     return true;
//   } else {
//     productNameInput.classList.add("is-invalid");
//     return false;
//   }
// }
