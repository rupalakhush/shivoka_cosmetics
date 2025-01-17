import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
      });
    }

    // Fetch orders with related order items where "delivered" is false
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select(
        `
          orderid,
          createdat,
          paymentmethod,
          totalamount,
          orderitems(orderitemid, itemid, name, image, price, quantity, trackingid, trackinglink, expecteddate)
        `
      )
      .eq("user_id", userId)
      .filter("orderitems.delivered", "eq", false);

    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
        status: 500,
      });
    }

    // Transform the data into the required format
    const formattedOrders = orders.flatMap((order) =>
      order.orderitems.map((item) => ({
        id: order.orderid,
        orderitemid: item.orderitemid,
        productName: item.name,
        image: item.image,
        productId: item.itemid,
        orderedDate: order.createdat,
        quantity: item.quantity,
        pricePerUnit: item.price,
        paymentMethod: order.paymentmethod,
        amountPaid: (item.price * item.quantity).toFixed(2),
        trackingId: item.trackingid || null,
        trackingLink: item.trackinglink || null,
        expectedDeliveryDate: item.expecteddate || null,
      }))
    );

    // Return the formatted orders
    return new Response(JSON.stringify(formattedOrders), { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
