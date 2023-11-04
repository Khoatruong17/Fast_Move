
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  
    // Sample data for cities and districts
    var cityData = {
      Hanoi: ["Ba Dinh", "Hoan Kiem", "Cau Giay","Dong Da","Ha Dong"],
      HCM: ["District 1", "District 3", "District 4", "District 5", "District 6"
                , "District 7 ", "District 8", "District 10","District 11", "District 12","Tan Binh","Tan Phu"],
      DaNang: ["Hai Chau", "Cam Le", "Thanh Khe", "Lien Chieu"],
    };
  
  // Get references to the select elements
  var citySelect = document.getElementById('SenderState');
  var districtSelect = document.getElementById('SenderDistrict');
  var citySelect1 = document.getElementById('ReceiverState');
  var districtSelect1 = document.getElementById('ReceiverDistrict');
  
  // Add change event listener to the city select
  citySelect.addEventListener('change', function () {
    var selectedCity = citySelect.value;
    var districts = cityData[selectedCity];
  
    // Clear the current options in the district select
    districtSelect.innerHTML = '<option selected disabled value="">Choose...</option>';
  
    // Populate the district select with options
    districts.forEach(function (district) {
      var option = document.createElement('option');
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  });

  citySelect1.addEventListener('change', function () {
    var selectedCity = citySelect1.value;
    var districts = cityData[selectedCity];
  
    // Clear the current options in the district select
    districtSelect1.innerHTML = '<option selected disabled value="">Choose...</option>';
  
    // Populate the district select with options
    districts.forEach(function (district) {
      var option = document.createElement('option');
      option.value = district;
      option.textContent = district;
      districtSelect1.appendChild(option);
    });
  }); 
})();

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


function addInfo(e) {
  event.preventDefault();
  var forms = document.querySelectorAll('.needs-validation');
  var form = forms[0]; 
  if (form.checkValidity()) {
    // Save information of sender
    let SenderFName = document.getElementById('SenderFName').value;
    let SenderLName = document.getElementById('SenderLName').value;
    let SenderPhone = document.getElementById('SenderNPhone').value;
    let SenderState = document.getElementById('SenderState').value;
    let SenderDistrict = document.getElementById('SenderDistrict').value;
    let SenderAddress = document.getElementById('SenderAddress').value;
    // Save information of receiver
    let ReceiverFName = document.getElementById('ReceiverFName').value;
    let ReceiverLName = document.getElementById('ReceiverLName').value;
    let ReceiverPhone = document.getElementById('ReceiverNPhone').value;
    let ReceiverState = document.getElementById('ReceiverState').value;
    let ReceiverDistrict = document.getElementById('ReceiverDistrict').value;
    let ReceiverAddress = document.getElementById('ReceiverAddress').value;
    // Save information of cargo
    let length = parseFloat(document.getElementById('length').value);
    let width = parseFloat(document.getElementById('width').value);
    let height = parseFloat(document.getElementById('height').value);
    let type = document.getElementById('SelectShip').value;
    let weight = (length*width*height)/6000;

  
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


    let idRandom;
    // Crate list to save information
    let listInfo = localStorage.getItem("list-Info") ? JSON.parse(localStorage.getItem("list-Info")): []
    
    // Function to generate a random 5-digit ID
    function generateRandomID() {
      return Math.floor(10000 + Math.random() * 90000).toString();
    }
    // Check if the generated ID is unique
    do {
      idRandom = generateRandomID();
    } while (listInfo.some(info => info.id === idRandom));
    listInfo.push({
      id: idRandom,
      SFName: SenderFName,
      SLName: SenderLName,
      SPhone: SenderPhone,
      SState : SenderState,
      SDistrict: SenderDistrict,
      SAddress: SenderAddress,
      RFName: ReceiverFName,
      RLName: ReceiverLName,
      RPhone: ReceiverPhone,
      RState : ReceiverState,
      RDistrict: ReceiverDistrict,
      RAddress: ReceiverAddress,
      length: length,
      width: width,
      height: height,
      type: type,
      weight: weight,
      price: price,
    });
    localStorage.setItem('list-Info', JSON.stringify(listInfo));
    alert(`Order #${idRandom} successfully. Your order has a shipping fee of $${price}. Please wait, we will contact you soon!!!`);
    window.location.replace('index.html');
  }
}