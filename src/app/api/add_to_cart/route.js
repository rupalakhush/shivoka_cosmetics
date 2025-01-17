import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    // Parse the request body to get `product_id` and `user_id`
    const { product_id, user_id } = await request.json();

    if (!product_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Both product_id and user_id are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the product already exists in the cart for this user
    const { data: existingCartItem, error: cartError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', user_id)
      .eq('product_id', product_id)
      .single();

    if (cartError && cartError.code !== 'PGRST116') {
      // PGRST116 indicates no row found, so we ignore it for this case
      console.error('Error checking cart:', cartError);
      return new Response(
        JSON.stringify({ error: 'Failed to check cart.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (existingCartItem) {
      // Update the existing cart item: Increment the quantity
      const { error: updateError } = await supabase
        .from('cart')
        .update({
          quantity: 1, // Increment quantity
        })
        .eq('id', existingCartItem.id);

      if (updateError) {
        console.error('Error updating cart item:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update cart item.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Fetch product details from the `products` table
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('id, price, discounted_price')
        .eq('id', product_id)
        .single();

      if (productError || !product) {
        console.error('Error fetching product details:', productError);
        return new Response(
          JSON.stringify({ error: 'Product not found.' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Insert new product into the cart table
      const { error: insertError } = await supabase.from('cart').insert({
        user_id,
        product_id: product.id,
        quantity: 1, // Default quantity is 1
        price: product.price,
        discounted_price: product.discounted_price || null,
      });

      if (insertError) {
        console.error('Error adding product to cart:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to add product to cart.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Cart updated successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
