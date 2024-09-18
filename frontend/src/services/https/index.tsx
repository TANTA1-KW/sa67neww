import { UsersInterface } from "../../interfaces/IUser";
import { SignInInterface } from "../../interfaces/SignIn";
import { SignUpInterface } from "../../interfaces/SignUp";
import { CarInterface } from "../../interfaces/ICar";
import { RentInterface } from "../../interfaces/IRent";
import axios from "axios";


const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

async function fetchData(url: string, options: RequestInit) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error; // Rethrow to handle it in calling code if needed
    }
}


async function SignIn(data: SignInInterface) {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    return fetchData(`${apiUrl}/signin`, requestOptions);
}

async function SignUp(data: SignUpInterface) {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    return fetchData(`${apiUrl}/signup`, requestOptions);
}

async function CreateUser(data: UsersInterface) {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
        body: JSON.stringify(data),
    };
    return fetchData(`${apiUrl}/signup`, requestOptions);
}

async function GetUsers() {
    const requestOptions = {   
      method: "GET",  
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Bearer} ${Authorization}`,
      },
    };
    let res = await fetch(`${apiUrl}/users`, requestOptions).then((response) =>
        response.json()
    );
    return res;
}

async function GetUsersById(id: string) {
    const requestOptions = {   
        method: "GET",  
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Bearer} ${Authorization}`,
        },
      };
      let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
        .then((response) => response.json()
      );
      return res;
  }


// service.ts
async function UpdateUsersById(id: number, data: { status: string }) {
    const requestOptions: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Authorization}`,
        },
        body: JSON.stringify(data),
    };
    return fetchData(`${apiUrl}/user/${id}`, requestOptions);
  }
  
  // service.ts
  
  // service.ts
  
  async function DeleteUsersById(id: number) {
    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Authorization}`,
        },
    };
    return fetchData(`${apiUrl}/user/${id}`, requestOptions);
}



async function CreateCar(data: CarInterface) {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
        body: JSON.stringify(data),
    };
    return fetchData(`${apiUrl}/addcar`, requestOptions);
}

async function GetCars() {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
    };
    return fetchData(`${apiUrl}/cars`, requestOptions);
}

async function GetCarById(id: string) {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
    };
    return fetchData(`${apiUrl}/cars/${id}`, requestOptions);
}

async function UpdateCarById(id: string, data: CarInterface) {
    const requestOptions: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
        body: JSON.stringify(data),
    };
    return fetchData(`${apiUrl}/cars/${id}`, requestOptions);
}

async function DeleteCarById(id: string) {
    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
    };
    return fetchData(`${apiUrl}/cars/${id}`, requestOptions);
}

async function GetRents() {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
    };
    return fetchData(`${apiUrl}/rent`, requestOptions);
}

async function GetRentById(id: number) {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${Bearer} ${Authorization}`,
        },
    };
    return fetchData(`${apiUrl}/rent/${id}`, requestOptions);
}

async function CreateRent (data: RentInterface)  {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Authorization}`,
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(`${apiUrl}/addrent`, requestOptions);
    return response.json();  // Ensure this correctly parses JSON response
};

// service.ts
async function UpdateRentById(id: number, data: { status: string }) {
  const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Authorization}`,
      },
      body: JSON.stringify(data),
  };
  return fetchData(`${apiUrl}/rent/${id}/status`, requestOptions);
}

// service.ts

// service.ts

async function DeleteRentById(id: number) {
  const requestOptions: RequestInit = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Authorization}`,
      },
  };
  return fetchData(`${apiUrl}/rent/${id}`, requestOptions);
}




export {
    SignIn,
    SignUp,

    CreateCar,
    GetCars,
    GetCarById,
    UpdateCarById,
    DeleteCarById,

    GetRents,
    GetRentById,
    CreateRent,
    UpdateRentById,
    DeleteRentById,

    CreateUser,
    GetUsers,
    GetUsersById,
    UpdateUsersById,
    DeleteUsersById,

};
