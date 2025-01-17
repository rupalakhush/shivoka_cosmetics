"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ProductCard = ({
  id,
  name,
  image,
  price,
  discountedPrice,
  description,
  user_id,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const discount = Math.round((1 - discountedPrice / price) * 100);

  const addToCart = async () => {
    if (!user_id) {
      toast("You have to login first!", {
        icon: "⚠️",
      });
    } else {
      setIsAdding(true);
      try {
        // Prepare the request body
        const body = JSON.stringify({
          product_id: id,
          user_id,
        });

        // Call the /add_to_cart API
        const response = await fetch("/api/add_to_cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Added to Cart");
        } else {
          toast.error("Error Adding to Cart");
          console.error(data.error);
        }
      } catch (error) {
        toast.error("Error Adding to Cart");
        setError("Something went wrong. Please try again later.");
        console.error("Error adding product to cart:", error);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {discount}% OFF
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-bold text-pink-500">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ${price.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-green-600 font-semibold">
            Save ${(price - discountedPrice).toFixed(2)}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={addToCart}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300"
            disabled={isAdding}
          >
            {isAdding ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          {/* <Link href={`/checkout?product=${id}`} passHref>
            <Button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white transition-colors duration-300">
              <CreditCard className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
