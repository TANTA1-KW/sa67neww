import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Loadable from '../components/third-patry/Loadable';
import FullLayout from '../layout/FullLayout';

// Lazy load the components
const MainPages = Loadable(lazy(() => import('../pages/authentication/Login')));
const Dashboard = Loadable(lazy(() => import('../pages/home')));
const Vehiclemanage = Loadable(lazy(() => import('../pages/vehiclemanage')));
const ProfilePage = Loadable(lazy(() => import('../pages/profile')));
const CreateCar = Loadable(lazy(() => import('../pages/vehiclemanage/create')));
const CarEdit = Loadable(lazy(() => import('../pages/vehiclemanage/edit')));
const Rent = Loadable(lazy(() => import('../pages/carsearch')));
const CarDetails = Loadable(lazy(() => import('../pages/carsearch/cartype')));
const Booking = Loadable(lazy(() => import('../pages/carsearch/booking')));
const Payment = Loadable(lazy(() => import('../pages/carsearch/payment')));
const ManageRentPage = Loadable(lazy(() => import('../pages/rentmanage'))); // Ensure this is correctly loaded

const EmployeePage = Loadable(lazy(() => import("../pages/employee")));
const CreateEmployee = Loadable(lazy(() => import("../pages/employee/create")));
const EditEmployee = Loadable(lazy(() => import("../pages/employee/edit")));

const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  return {
    path: '/',
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/vehiclemanage',
        children: [
          {
            path: '',
            element: <Vehiclemanage />,
          },
          {
            path: 'create',
            element: <CreateCar />,
          },
          {
            path: 'edit/:id',
            element: <CarEdit />,
          },
        ],
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/employee', // Base route for employee-related views
        children: [
          {
            path: '', // Default child route
            element: <EmployeePage />,
          },
          {
            path: "create",
            element: <CreateEmployee />,
          },
          {
            path: "edit/:id", // Dynamic route for editing specific employee
            element: <EditEmployee />,
          },
        ],
      },
      {
        path: '/rent',
        children: [
          {
            path: '',
            element: <Rent />,
          },
          {
            path: 'type/:type',
            element: <CarDetails />,
          },
          {
            path: 'booking/:carId',
            element: <Booking />,
          },
          {
            path: 'payment/:bookingId',
            element: <Payment />,
          },
        ],
      },
      {
        path: '/rentmanager',
        element: <ManageRentPage />,
      },
    ],
  };
};

export default AdminRoutes;
