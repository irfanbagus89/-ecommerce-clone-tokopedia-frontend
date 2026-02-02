"use client";

import ProfileTab from "./components/ProfilTab";
import AddressTab from "./components/AddressTab";
import ShippingTab from "./components/ShippingTab";
import NotificationTab from "./components/NotificationTab";
import BankTab from "./components/BankTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { label: "Profil Toko", value: "profile" },
  { label: "Alamat", value: "address" },
  { label: "Pengiriman", value: "shipping" },
  { label: "Rekening", value: "bank" },
  { label: "Notifikasi", value: "notification" },
];

const SettingPage = () => {

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pengaturan Toko</h1>
        <p className="text-sm text-gray-500">
          Kelola informasi dan preferensi tokomu
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="address">
          <AddressTab />
        </TabsContent>

        <TabsContent value="shipping">
          <ShippingTab />
        </TabsContent>

        <TabsContent value="bank">
          <BankTab />
        </TabsContent>

        <TabsContent value="notification">
          <NotificationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
