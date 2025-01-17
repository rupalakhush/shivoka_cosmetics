"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrderList from "@/components/OrderList";
import Loaderr from "@/components/ui/Loaderr";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signup");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = session?.user?.uid;
      if (userId) {
        try {
          const response = await fetch("/api/track_order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }

          const orders = await response.json();
          setOrders(orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="content-center flex justify-center text-gray-500 mt-8 py-24">
        <Loaderr sizee={40} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={session?.user?.image || "/placeholder.svg"}
              alt={session?.user?.name || "Your Name"}
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "Y"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">
              {session?.user?.name || "Your Name"}
            </h2>
            <p className="text-gray-500">
              {session?.user?.email || "yourmail@gmail.com"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
        </CardHeader>
        {loading ? (
          <CardContent className="relative content-center flex justify-center text-center pl-0 mt-20 mb-32">
            <Loaderr sizee={25} />
          </CardContent>
        ) : orders?.length >= 1 ? (
          <CardContent>
            <OrderList orders={orders} />
          </CardContent>
        ) : (
          <CardContent className="relative text-center font-bold text-gray-500 pl-0 mt-20 mb-32">
            <span>No Current Orders.</span>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
