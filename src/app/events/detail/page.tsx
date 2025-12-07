import React from "react";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  location: string;
  description: string;
  price: number;
};

 const EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "Tech Conference 2025",
    date: "2025-12-12",
    image: "/tc.jpg",
    category: "Technology",
    location: "Jakarta",
    description: "Konferensi teknologi terbesar dengan pembicara internasional.",
    price: 150000,
  },
  {
    id: "e2",
    title: "Music Festival Summerwave",
    date: "2025-08-20",
    image: "/sf.webp",
    category: "Music",
    location: "Bali",
    description: "Festival musik pantai dengan banyak artis terkenal.",
    price: 250000,
  },
  {
    id: "e3",
    title: "Business Leadership Summit",
    date: "2025-09-05",
    image: "/ls.jpg",
    category: "Business",
    location: "Bandung",
    description: "Acara networking dan seminar untuk para pemimpin bisnis.",
    price: 300000,
  },
  {
    id: "e4",
    title: "Marathon Nusantara Run",
    date: "2025-07-15",
    image: "/run.jpg",
    category: "Sports",
    location: "Surabaya",
    description: "Lomba lari marathon tahunan berskala nasional.",
    price: 100000,
  },
  {
    id: "e5",
    title: "Sound Fest",
    date: "2025-07-15",
    image: "/sf.jpeg",
    category: "Music",
    location: "Jakarta",
    description: "Festival music terbesar di Indonesia.",
    price: 200000,
  },
  {
    id: "e6",
    title: "Bojue Championship",
    date: "2025-07-15",
    image: "/bl.jpg",
    category: "Sports",
    location: "Tanggerang",
    description: "Lomba lari marathon tahunan berskala nasional.",
    price: 150000,
  },
];


export default EVENTS;