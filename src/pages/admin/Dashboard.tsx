
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { RentalManagement } from "@/components/admin/RentalManagement";
import { CouponManagement } from "@/components/admin/CouponManagement";
import { BookingManagement } from "@/components/admin/BookingManagement";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="services">
              <TabsList className="w-full">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="rentals">Rental Vehicles</TabsTrigger>
                <TabsTrigger value="coupons">Coupons</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              </TabsList>
              <TabsContent value="services">
                <ServiceManagement />
              </TabsContent>
              <TabsContent value="rentals">
                <RentalManagement />
              </TabsContent>
              <TabsContent value="coupons">
                <CouponManagement />
              </TabsContent>
              <TabsContent value="bookings">
                <BookingManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
