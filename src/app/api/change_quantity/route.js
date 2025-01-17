import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    // Parse the request body to get `id` (cart product ID) and `quantity`
    const { id, quantity } = await request.json();

    if (!id || quantity === undefined) {
      return new Response(
        JSON.stringify({ error: 'Both id and quantity are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (quantity <= 0) {
      return new Response(
        JSON.stringify({ error: 'Quantity must be greater than zero.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update the quantity in the cart
    const { error: updateError } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating quantity:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update quantity.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Quantity updated successfully.' }),
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
