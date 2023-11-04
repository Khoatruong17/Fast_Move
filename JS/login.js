function showNotification(message) {
  document.getElementById('Contentnotification').innerText = message;
}


function login(e) {
  event.preventDefault();
  const user = [
    {
      username: 'truong',
      password: '1111',
    },
    {
      username: 'truong123',
      password: '1234',
    }
  ];
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if(username && password) {
    const checkLogin = user.some(value => value.username === username && value.password === password);
    if (checkLogin) {
      window.location.replace('admin.html');
      localStorage.setItem('tokenLogin', username);
    }
    else {
      showNotification('Wrong username or password, please try again');
    }
  }
  else{
    showNotification('Please enter username or password');
  }
}


function checkLogin() {
  const isLogin = localStorage.getItem('tokenLogin') 
  if(!isLogin){
    window.location.replace('login.html')
  }
  else{
    window.location.replace('admin.html')
  }
}

function showAccountName(){
  const isLogin = localStorage.getItem('tokenLogin') 
  if(isLogin){
    document.getElementById('AccountName').innerText = isLogin;
  }
  else{
    window.location.replace('login.html')
  }
  
}

function logout() {
  localStorage.removeItem('tokenLogin');
  window.location.replace('index.html');  
}



