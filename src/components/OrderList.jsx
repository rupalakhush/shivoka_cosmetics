import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CreditCard, Package, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function OrderList({ orders }) {
  const [copiedId, setCopiedId] = useState(null);
  const copyTrackingId = (trackingId) => {
    navigator.clipboard.writeText(trackingId);
    setCopiedId(trackingId);
    toast.success("Tracking ID copied");
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-6">
      {orders.length >= 1 ? (
        orders?.map((order) => (
          <Card key={order.orderitemid} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  <Image
                    src={order.image}
                    alt={order.productName}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </div>
                <div className="w-full md:w-3/4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {order.productName}
                    </h3>
                    <p className="text-gray-500">
                      Product ID: {order.productId}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                      <span>
                        Ordered on{" "}
                        {new Date(order.orderedDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Quantity: {order.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Price per unit</p>
                      <p className="font-semibold">
                        ${order.pricePerUnit.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total amount paid</p>
                      <p className="font-semibold">${order.amountPaid}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Shipping Information</h4>
                    {order.trackingId ||
                    order.trackingLink ||
                    order.expectedDeliveryDate ? (
                      <div className="space-y-2">
                        {order.trackingId && (
                          <div className="flex items-center space-x-2">
                            <p>Tracking ID: {order.trackingId}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyTrackingId(order.trackingId)}
                            >
                              {copiedId === order.trackingId ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        )}
                        {order.trackingLink && (
                          <Link
                            href={order.trackingLink || "#"}
                            className="text-blue-500 hover:underline flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Truck className="w-4 h-4 mr-1" />
                            Track your package
                          </Link>
                        )}
                        {order.expectedDeliveryDate && (
                          <p>
                            Expected delivery:{" "}
                            {new Date(
                              order.expectedDeliveryDate
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-300"
                      >
                        Tracking information will be available soon
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <span className="relative mt-20 mb-32 text-center font-bold text-gray-500 pl-0">
          Loading orders...
        </span>
      )}
    </div>
  );
}
