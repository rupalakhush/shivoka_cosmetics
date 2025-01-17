import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    // Parse the request body to get `uid`
    const { uid } = await request.json()

    if (!uid) {
      return new Response(
        JSON.stringify({ error: 'User ID (uid) is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fetch cart items for the given `uid` and join with `products` table
    const { data: cartItems, error: cartError } = await supabase
      .from('cart')
      .select(`
        id,
        quantity,
        price,
        discounted_price,
        products (
          name,
          image
        )
      `)
      .eq('user_id', uid)

    if (cartError) {
      console.error('Error fetching cart items:', cartError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch cart items.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Format the cart items into the required structure
    const formattedCartItems = cartItems.map(cartItem => ({
      id: cartItem.id,
      name: cartItem.products?.name || 'Unknown Product',
      price: cartItem.price,
      image: cartItem.products?.image || '/placeholder.svg',
      quantity: cartItem.quantity
    }))

    // Return the formatted cart items
    return new Response(JSON.stringify(formattedCartItems), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
