class Auth {
    constructor({baseUrl,headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers
    }

    register(email, password)  {
      return fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({email, password})
      })
      .then((response) => {
        if (response.status === 201){
          return response.json();
        }  else {
          return Promise.reject(`Error: ${response.status}`);
        }
      })
      .then((res) => {
        return res;
      })
    }; 

    signin(email, password){
      return fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({email, password})
      })
      .then((response) => {
        if (response.status === 200){
          return response.json();
        } else {
          return Promise.reject(`Error: ${response.status}`);
        }
      })
      .then((res) => {
        if (res.token) {
          return res;
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })     
    }; 

    getContent(token){
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {...this.headers, "Authorization" : `Bearer ${token}`} 
      })
      .then((response) => {
          if (response.status === 200){
            return response.json();
          } else {
            return Promise.reject(`Error: ${response.status}`);
          }
      })
      .then((res) => {
        return res;     
      })
    }; 
  }

  export const auth = new Auth({
    baseUrl: "https://register.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    }
  });
  