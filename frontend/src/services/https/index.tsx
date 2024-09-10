import { UsersInterface } from "../../interfaces/IUser";

import { SignInInterface } from "../../interfaces/SignIn";

import { SignUpInterface } from "../../interfaces/SignUp";

import { CarInterface } from "../../interfaces/ICar";


const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


async function SignIn(data: SignInInterface) {

 const requestOptions = {

   method: "POST",

   headers: { "Content-Type": "application/json" },

   body: JSON.stringify(data),

 };


 let res = await fetch(`${apiUrl}/signin`, requestOptions).then((response) =>

   response.json()

 );

 return res;

}


async function SignUp(data: SignUpInterface) {

 const requestOptions = {

   method: "POST",

   headers: { "Content-Type": "application/json" },

   body: JSON.stringify(data),

 };


 let res = await fetch(`${apiUrl}/signup`, requestOptions).then((response) =>

   response.json()

 );

 return res;

}


// async function GetUsers() {

//  const requestOptions = {

//    method: "GET",

//    headers: {

//      "Content-Type": "application/json",

//      Authorization: `${Bearer} ${Authorization}`,

//    },

//  };


//  let res = await fetch(`${apiUrl}/users`, requestOptions).then((response) =>

//    response.json()

//  );

//  return res;

// }


// async function GetUsersById(id: string) {

//  const requestOptions = {

//    method: "GET",

//    headers: {

//      "Content-Type": "application/json",

//      Authorization: `${Bearer} ${Authorization}`,

//    },

//  };


//  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions).then(

//    (response) => response.json()

//  );

//  return res;

// }


// async function UpdateUsersById(id: string, data: UsersInterface) {

//  const requestOptions = {

//    method: "PUT",

//    headers: {

//      "Content-Type": "application/json",

//      Authorization: `${Bearer} ${Authorization}`,

//    },

//    body: JSON.stringify(data),

//  };


//  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions).then(

//    (response) => response.json()

//  );

//  return res;

// }


// async function DeleteUsersById(id: string) {

//  const requestOptions = {

//    method: "DELETE",

//    headers: {

//      "Content-Type": "application/json",

//      Authorization: `${Bearer} ${Authorization}`,

//    },

//  };


//  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions).then(

//    (response) => response.json()

//  );

//  return res;

// }


async function CreateUser(data: UsersInterface) {

 const requestOptions = {

   method: "POST",

   headers: {

     "Content-Type": "application/json",

     Authorization: `${Bearer} ${Authorization}`,

   },

   body: JSON.stringify(data),

 };


 let res = await fetch(`${apiUrl}/signup`, requestOptions).then((response) =>

   response.json()

 );

  return res;

}

async function CreateCar(data: CarInterface) {

    const requestOptions = {
   
      method: "POST",
   
      headers: {
   
        "Content-Type": "application/json",
   
        Authorization: `${Bearer} ${Authorization}`,
   
      },
   
      body: JSON.stringify(data),
   
    };
   
   
    let res = await fetch(`${apiUrl}/addcar`, requestOptions).then((response) =>
   
      response.json()
   
    );
   
     return res;
   
   }

   async function GetCars() {

    const requestOptions = {
   
      method: "GET",
   
      headers: {
   
        "Content-Type": "application/json",
   
        Authorization: `${Bearer} ${Authorization}`,
   
      },
   
    };
   
   
    let res = await fetch(`${apiUrl}/cars`, requestOptions).then((response) =>
   
      response.json()
   
    );
   
    return res;
   
   }

   async function GetCarById(id: string) {

    const requestOptions = {
   
      method: "GET",
   
      headers: {
   
        "Content-Type": "application/json",
   
        Authorization: `${Bearer} ${Authorization}`,
   
      },
   
    };
   
   
    let res = await fetch(`${apiUrl}/cars/${id}`, requestOptions).then(
   
      (response) => response.json()
   
    );
   
    return res;
   
   }

   async function UpdateCarById(id: string, data: CarInterface) {

    const requestOptions = {
   
      method: "PUT",
   
      headers: {
   
        "Content-Type": "application/json",
   
        Authorization: `${Bearer} ${Authorization}`,
   
      },
   
      body: JSON.stringify(data),
   
    };
   
   
    let res = await fetch(`${apiUrl}/cars/${id}`, requestOptions).then(
   
      (response) => response.json()
   
    );
   
    return res;
   
   }
   
   async function DeleteCarById(id: string) {

    const requestOptions = {
   
      method: "DELETE",
   
      headers: {
   
        "Content-Type": "application/json",
   
        Authorization: `${Bearer} ${Authorization}`,
   
      },
   
    };
   
   
    let res = await fetch(`${apiUrl}/cars/${id}`, requestOptions).then(
   
      (response) => response.json()
   
    );
   
    return res;
   
   }


export {

 SignIn,

 SignUp,

 //GetUsers,

 //GetUsersById,

 //UpdateUsersById,

 //DeleteUsersById,

 CreateUser,

 CreateCar,

 GetCars,

 GetCarById,

 UpdateCarById,

 DeleteCarById,

};