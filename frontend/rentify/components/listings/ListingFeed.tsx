import React from "react";
import ListingCard, { Listing } from "./ListingCard";

const dummyListings: Listing[] = [
  {
    id: "1",
    title: "Power washer available this weekend",
    description:
      "Perfect for driveways and patios. Located a few minutes away. Daily and weekend rates available.",
    imageUrl:
      "https://images.pexels.com/photos/5854188/pexels-photo-5854188.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/1",
    price: "$18 / day",
    distance: "2 houses away",
    sellerName: "Alex Martinez",
    sellerAvatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.9,
  },
  {
    id: "2",
    title: "Folding tables for parties & events",
    description:
      "Set of two 6 ft folding tables. Great for birthdays, garage sales, and neighborhood events.",
    imageUrl:
      "https://images.pexels.com/photos/5877416/pexels-photo-5877416.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/2",
    price: "$12 / day",
    distance: "0.4 miles away",
    sellerName: "Priya Shah",
    sellerAvatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.7,
  },
  {
    id: "3",
    title: "Extension ladder - 24 feet",
    description:
      "Heavy-duty aluminum extension ladder. Perfect for painting, cleaning gutters, or roof access.",
    imageUrl:
      "https://images.pexels.com/photos/162553/keys-to-success-ladder-lock-key-162553.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/3",
    price: "$15 / day",
    distance: "1.2 miles away",
    sellerName: "Mike Johnson",
    sellerAvatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.8,
  },
  {
    id: "4",
    title: "Generator - 3000W portable",
    description:
      "Quiet portable generator perfect for camping, outdoor events, or emergency power backup.",
    imageUrl:
      "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/4",
    price: "$35 / day",
    distance: "0.8 miles away",
    sellerName: "Sarah Chen",
    sellerAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 5.0,
  },
  {
    id: "5",
    title: "Wheelbarrow with steel tray",
    description:
      "Heavy-duty wheelbarrow perfect for gardening, construction, or moving heavy materials.",
    imageUrl:
      "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/5",
    price: "$10 / day",
    distance: "3 houses away",
    sellerName: "David Wilson",
    sellerAvatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.6,
  },
  {
    id: "6",
    title: "Circular saw with extra blades",
    description:
      "Professional 7-1/4 inch circular saw with laser guide. Includes 10 extra blades and safety gear.",
    imageUrl:
      "https://images.pexels.com/photos/569947/pexels-photo-569947.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/6",
    price: "$20 / day",
    distance: "1.5 miles away",
    sellerName: "Jennifer Lee",
    sellerAvatar:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.9,
  },
  {
    id: "7",
    title: "Garden tiller - rear tine",
    description:
      "Powerful rear-tine garden tiller perfect for breaking up soil and preparing garden beds.",
    imageUrl:
      "https://images.pexels.com/photos/1267246/pexels-photo-1267246.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/7",
    price: "$25 / day",
    distance: "2.1 miles away",
    sellerName: "Robert Garcia",
    sellerAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.7,
  },
  {
    id: "8",
    title: "Moving dolly and straps",
    description:
      "Heavy-duty furniture moving dolly with ratchet straps. Perfect for moving appliances and heavy furniture.",
    imageUrl:
      "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/8",
    price: "$8 / day",
    distance: "0.6 miles away",
    sellerName: "Lisa Thompson",
    sellerAvatar:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.8,
  },
];

const ListingFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-green-600">
        Today in your neighborhood
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingFeed;