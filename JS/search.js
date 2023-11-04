function findOrder(){
    let searchValue = document.getElementById("search").value.trim();
    console.log(searchValue);
    findOrderByPhoneOrId(searchValue);
  }
  
  function findOrderByPhoneOrId(searchValue) {
    let listInfo = localStorage.getItem("list-Info") ? JSON.parse(localStorage.getItem("list-Info")) : [];
    let info = `<tr>
    <th scope="col">ID</th>
    <th scope="col">Name of sender</th>
    <th scope="col">Phone</th>
    <th scope="col">Send address</th>
    <th scope="col">Receiving address</th>
    <th scope="col">Price</th>
    </tr>`;
  
    listInfo.map((value, index) => {
        if (value.SPhone === searchValue || value.id === searchValue) {
            info += `<tr>
            <td>${value.id}</td>
            <td>${value.SFName + ' ' + value.SLName}</td>
            <td>${value.SPhone}</td>
            <td>${value.SState}</td>
            <td>${value.RState}</td>
            <td>$${value.price}</td>
            </tr>`;
        }
    });
  
    document.getElementById('table').innerHTML = info;
  }

function viewInfo(index) {
    selectedOrderIndex = index;
    displayOrderDetails();
}

function displayOrderDetails() {
    if (selectedOrderIndex >= 0) {
        let selectedOrder = listInfo[selectedOrderIndex];
        alert(`Order ID: ${selectedOrder.id}\nSender Name: ${selectedOrder.SFName} ${selectedOrder.SLName}\nSender Phone: ${selectedOrder.SPhone}\n...`); // Thay thế bằng các thông tin cụ thể bạn muốn hiển thị
    } else {
        alert("No order selected.");
    }
}