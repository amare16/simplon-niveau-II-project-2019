
export function AuthService(userData) {
    
    
    return new Promise((resolve, reject) =>{
    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(userData)
    })
   .then((response) => response.json())
   .then((res) => {
    console.log(resolve(res));
   })
   .catch((error) => {
    reject(error);
   });
   });
   }