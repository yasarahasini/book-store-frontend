import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice:totalPrice ,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: 'Confirmed Order',
        text: 'Your order placed successfully!',
        icon:"warning",
        showCancelButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText: "Yes, It's Okay!",
      });
      navigate('/orders');
    } catch (error) {
      console.error('Error placing an order', error);
      alert('Failed to place an order');
    }
  };

  if (isLoading) return <div>Loading....</div>;

  return (
    <section>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="mb-2 text-xl font-semibold text-gray-600">Cash On Delivery</h2>
              <p className="mb-2 text-gray-500">Total Price: ${totalPrice}</p>
              <p className="mb-6 text-gray-500">Items: {cartItems.length}</p>
            </div>

            <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 my-8 text-sm gap-y-2 lg:grid-cols-3"
              >
                <div className="text-gray-600">
                  <p className="text-lg font-medium">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register('name', { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        disabled
                        defaultValue={currentUser?.email}
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register('phone', { required: true })}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="+123 456 7890"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register('address', { required: true })}
                        type="text"
                        name="address"
                        id="address"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register('city', { required: true })}
                        type="text"
                        name="city"
                        id="city"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        {...register('country', { required: true })}
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / Province</label>
                      <input
                        {...register('state', { required: true })}
                        name="state"
                        id="state"
                        placeholder="State"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register('zipcode', { required: true })}
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="mt-3 md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{' '}
                          <Link className="text-blue-600 underline">Terms & Conditions</Link> and{' '}
                          <Link className="text-blue-600 underline">Shopping Policy</Link>.
                        </label>
                      </div>
                    </div>

                    <div className="text-right md:col-span-5">
                      <div className="inline-flex items-end">
                        <button
                          disabled={!isChecked}
                          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          Place an Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
