"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useSession } from "next-auth/react";
import Loaderr from "@/components/ui/Loaderr";

export default function ProductPage() {
  const { data: session, status } = useSession();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Call the API
        const response = await fetch("/api/get_products", {
          method: "POST", // As per your requirement
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        // Parse the JSON response
        const data = await response.json();
        setRelatedProducts(data); // Update state with fetched products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        if (status != "loading") {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [session]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-serif mb-6">Products</h2>
      {loading ? (
        <div className="content-center flex justify-center text-gray-500 mt-8 py-24">
          <Loaderr sizee={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              user_id={session?.user?.uid}
            />
          ))}
        </div>
      )}
    </div>
  );
}
