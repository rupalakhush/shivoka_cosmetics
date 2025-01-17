import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    // Fetch all products from the Supabase `products` table
    const { data: products, error } = await supabase
      .from("products")
      .select(
        "id, name, image, price, discounted_price, description, category, rating"
      );

    if (error) {
      console.error("Error fetching products:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch products." }),
        { status: 500 }
      );
    }

    // Format the data to match the required structure
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image || "/placeholder.svg", // Default image if null
      price: product.price,
      discountedPrice: product.discounted_price,
      description: product.description,
      category: product.category,
      rating: product.rating,
    }));

    // Return the formatted data
    return new Response(JSON.stringify(formattedProducts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
}
