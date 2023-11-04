document.addEventListener("DOMContentLoaded", function() {
  renderInfo();
});

function renderInfo(){
  let listInfo = localStorage.getItem("list-Info") ? JSON.parse(localStorage.getItem("list-Info")): []
  let info = `<tr>
  <th scope="col">No</th>
  <th scope="col">ID</th>
  <th scope="col">Name of sender</th>
  <th scope="col">Phone</th>
  <th scope="col">Send address</th>
  <th scope="col">Receiving address</th>
  <th scope="col">Price</th>
  <th scope="col">Action</th>
</tr>`

  listInfo.map((value, index) => {
    info += `<tr>
    <th scope="row">${index+1}</th>
    <td>${value.id}</td>
    <td>${value.SFName +' '+ value.SLName}</td>
    <td>${value.SPhone}</td>
    <td>${value.SState}</td>
    <td>${value.RState}</td>
    <td>$${value.price}</td>
    <td>
      <button onclick="editInfo(${index})">Detail</button>
      <button onclick="deleteInfo(${index})">Delete</button>
    </td>
  </tr>`
  })

  document.getElementById('table').innerHTML = info
}

function editInfo(index){
  const inputFields = document.querySelectorAll("input[type='text']");
// Iterate over each input field and add readonly attribute
  inputFields.forEach((input) => {
    input.setAttribute("readonly", "true");
  });
  let listInfo = localStorage.getItem("list-Info") ? JSON.parse(localStorage.getItem("list-Info")): []
  document.getElementById("idorder").innerText = listInfo[index].id
  document.getElementById("idorder-1").innerText = listInfo[index].id
  document.getElementById("idorder-2").innerText = listInfo[index].id
  document.getElementById("SenderFName").value = listInfo[index].SFName
  document.getElementById("SenderLName").value = listInfo[index].SLName
  document.getElementById("SenderNPhone").value = listInfo[index].SPhone
  document.getElementById("SenderState").value = listInfo[index].SState
  document.getElementById("SenderDistrict").value = listInfo[index].SDistrict
  document.getElementById("SenderAddress").value = listInfo[index].SAddress
  document.getElementById("ReceiverFName").value = listInfo[index].RFName
  document.getElementById("ReceiverLName").value = listInfo[index].RFName
  document.getElementById("ReceiverNPhone").value = listInfo[index].RPhone
  document.getElementById("ReceiverState").value = listInfo[index].RState
  document.getElementById("ReceiverDistrict").value = listInfo[index].RDistrict
  document.getElementById("ReceiverAddress").value = listInfo[index].RAddress
  document.getElementById("length").value = listInfo[index].length
  document.getElementById("width").value = listInfo[index].width
  document.getElementById("height").value = listInfo[index].height
  document.getElementById("SelectShip").value = listInfo[index].type
  document.getElementById("price").innerText = listInfo[index].price
  document.getElementById("index").value = index

  document.getElementById("detail").style.display = "inline-block"
}

function updateInfo(e){
  event.preventDefault()
  let listInfo = localStorage.getItem("list-Info") ? JSON.parse(localStorage.getItem("list-Info")): []
  let index = document.getElementById("index").value
  listInfo[index]={
    id: document.getElementById("idorder").innerHTML,
    SFName: document.getElementById("SenderFName").value,
    SLName: document.getElementById("SenderLName").value,
    SPhone: document.getElementById("SenderNPhone").value,
    SState : document.getElementById("SenderState").value,
    SDistrict: document.getElementById("SenderDistrict").value,
    SAddress: document.getElementById("SenderAddress").value,
    RFName: document.getElementById("ReceiverFName").value,
    RLName: document.getElementById("ReceiverLName").value,
    RPhone: document.getElementById("ReceiverNPhone").value,
    RState : document.getElementById("ReceiverState").value,
    RDistrict: document.getElementById("ReceiverDistrict").value,
    RAddress: document.getElementById("ReceiverAddress").value,
    length: document.getElementById("length").value,
    width: document.getElementById("width").value,
    height: document.getElementById("height").value,
    type: document.getElementById("SelectShip").value,
    price: document.getElementById("price").innerHTML
  }
  
  localStorage.setItem('list-Info', JSON.stringify(listInfo))
  alert("Update Information Success")
  document.getElementById("detail").style.display = "none"
  renderInfo()
}

function closeEdit(){
  document.getElementById("detail").style.display = "none"
}

function showPrice() {

  let SenderState = document.getElementById('SenderState').value;
  let ReceiverState = document.getElementById('ReceiverState').value;

  let type = document.getElementById('SelectShip').value;
  let length = parseFloat(document.getElementById('length').value);
  let width = parseFloat(document.getElementById('width').value);
  let height = parseFloat(document.getElementById('height').value);

  let weight = (length * width * height) / 6000;
  let eco, normal, fast;

  if ((SenderState == "Hanoi" && ReceiverState == "HCM") || (SenderState == "HCM" && ReceiverState == "Hanoi")) {
      eco = 20;
      normal = 25;
      fast = 30;
  } else if ((SenderState == "Hanoi" && ReceiverState == "DaNang") || (SenderState == "DaNang" && ReceiverState == "Hanoi")) {
      eco = 15;
      normal = 20;
      fast = 25;
  } else if ((SenderState == "HCM" && ReceiverState == "DaNang") || (SenderState == "DaNang" && ReceiverState == "HCM")) {
      eco = 10;
      normal = 15;
      fast = 20;
  } else {
      eco = 10;
      normal = 10;
      fast = 15;
  }

  if (type == "normal") {
      price = weight * normal;
  } else if (type == "fast") {
      price = weight * fast;
  } else if (type == "eco") {
      price = weight * eco;
  }
  
  price = price.toFixed(2);

    if (price < 30) {
        price = 30;
    }

    console.log(price);
    document.getElementById("price").innerText = price;
}


function deleteInfo(index){
  let listInfo = localStorage.getItem("list-Info") ? JSON.parse(localStorage.getItem("list-Info")): []
  const adminPassword = prompt("Please enter the admin password:");
  if (adminPassword === "1234") {
    if (confirm("Are you sure you want to delete?")) {
        listInfo.splice(index, 1);
    } else {
        // The user did not confirm the deletion
    }
  } else {
    // incorrect password
    alert("Incorrect admin password. Deletion canceled.");
  }
  localStorage.setItem('list-Info', JSON.stringify(listInfo))
  renderInfo()
}






