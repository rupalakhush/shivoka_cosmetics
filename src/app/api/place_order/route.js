import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, orderData, totalAmount } = body;

    if (!userId || !orderData || !totalAmount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      city,
      zipCode,
      country,
      paymentMethod,
      items,
    } = orderData;

    // Validate the order data
    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !addressLine1 ||
      !city ||
      !zipCode ||
      !country ||
      !paymentMethod ||
      !items?.length
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid or incomplete order data" }),
        { status: 400 }
      );
    }

    // Insert the order into the Orders table
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          addressline1: addressLine1,
          addressline2: addressLine2,
          city,
          zipcode: zipCode,
          country,
          paymentmethod: paymentMethod,
          totalamount: totalAmount,
          orderplaced: true,
          paid: false,
        },
      ])
      .select("orderid")
      .single();

    if (orderError) {
      console.error("Error inserting into Orders:", orderError.message);
      return new Response(JSON.stringify({ error: "Failed to create order" }), {
        status: 500,
      });
    }

    const { orderid } = order;

    // Prepare items for insertion into OrderItems table
    const orderItems = items.map((item) => ({
      orderid,
      itemid: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    // Insert items into the OrderItems table
    const { error: itemsError } = await supabase
      .from("orderitems")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error inserting into OrderItems:", itemsError);
      return new Response(
        JSON.stringify({ error: "Failed to add order items" }),
        { status: 500 }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "Order placed successfully", orderid }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
