import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api"
import Head from "next/head";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Tier {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

const tierList: Tier[] = [
  {
    'name' : 'Silver Pack',
    'price' : 10,
    'quantity' : 5,
    'description' : 'Get Started with SkillShow!'
  },
  {
    'name' : 'Golden Pack',
    'price' : 50,
    'quantity' : 30,
    'description' : 'Perfect mid-sized pack'
  },
  {
    'name' : 'Platinum Pack',
    'price' : 100,
    'quantity' : 70,
    'description' : 'A pack fit for kings'
  }
];

interface CartItem {
  tier: Tier;
  quantity: number;
}

export default function BuyKarma() {
  const user = useUser(); // clerk user
  const addKarma = api.users.addKarma.useMutation({
    onSuccess: () => {
        toast.success("SkillCoins Added Succesfully!");
    },
  });
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (tier: Tier) => {
    const existingItem = cart.find(item => item.tier === tier);
    if (existingItem) {
      setCart(cart.map(item => item.tier === tier ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { tier, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (tier: Tier) => {
    const existingItem = cart.find(item => item.tier === tier);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => item.tier === tier ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter(item => item.tier !== tier));
    }
  };

  const handleBuyCart = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
        totalPrice += item.tier.price * item.quantity;
        totalQuantity += item.tier.quantity * item.quantity;
    });
    if (!user.user?.id) return null;
    addKarma.mutate({ userId: user.user.id, karmaToAdd: totalQuantity }); 
    setCart([]);
  };

  return (
    <>
      <Head>
        <title>SkillShow</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex justify-center h-full">
        <div className="w-full flex flex-col lg:flex lg:flex-row h-full bg-gray-300 rounded-md">
          <div className="lg:w-1/2 w-full flex flex-col">
            {!!user.isSignedIn &&
              tierList.map((tier, index) => {
                const cartItem = cart.find(item => item.tier === tier);
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                  <div className="container mx-auto max-w-sm w-full p-4 sm:w-1/2" key={index}>
                    <div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
                      <div className="prod-title">
                        <p className="text-2xl uppercase text-gray-900 font-bold">{tier.name}</p>
                        <p className="uppercase text-sm text-gray-400">{tier.description}</p>
                      </div>
                      <div className="prod-info grid gap-10">
                        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                          <p className="font-bold text-md">{tier.price} $</p>
                          <p className="font-bold text-md">{tier.quantity} SC</p>
                          <div className="flex items-center">
                            <button
                              className="px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                              onClick={() => handleRemoveFromCart(tier)}
                            >
                              -
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button
                              className="px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                              onClick={() => handleAddToCart(tier)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className='lg:w-1/2 w-full flex justify-center items-center m-2'>
            {!!cart.length && (
              <div className="left-0 p-4 bg-transparent border-t border-gray-300 w-full">
                <p className="text-3xl text-black font-bold">Cart</p>
                {cart.map((item, index) => (
                  <div className="flex text-black justify-start items-center py-1" key={index}>
                    <p className='mr-4'>{item.tier.name}</p>
                    <p className="font-bold">Quantity: {item.quantity}</p>
                  </div>
                ))}
                <button
                  className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold"
                  onClick={handleBuyCart}
                  >
                  Buy Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
