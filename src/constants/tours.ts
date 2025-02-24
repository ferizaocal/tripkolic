export interface Tour {
    id: string;
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    originalPrice: number;
    discountedPrice?: number;
    discount?: number;
    imageUrl: string;
    theme: string;
    activities: string[];
    startTime: string;
    groupSize: number;
    vehicle: string;
    features: string[];
}

export const tours: Tour[] = [
    {
        id: '1',
        title: "Phi Phi & Khai Islands Tour with Speedboat Full Day",
        location: "Bassada Pier/Rassa",
        rating: 4.8,
        reviewCount: 156,
        originalPrice: 2500,
        discountedPrice: 1750,
        discount: 30,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Island Tour",
        activities: ["Swimming", "Snorkelling"],
        startTime: "08:00",
        groupSize: 15,
        vehicle: "Speedboat",
        features: ["Transfer", "Halal Food"]
    },
    {
        id: '2',
        title: "Elephant Sanctuary & Jungle Safari Adventure",
        location: "Phuket Elephant Park",
        rating: 4.9,
        reviewCount: 203,
        originalPrice: 3000,
        discountedPrice: 2400,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Safari",
        activities: ["Elephant care", "Jungle trekking"],
        startTime: "09:00",
        groupSize: 10,
        vehicle: "Safari Truck",
        features: ["Transfer", "Vegetarian food"]
    },
    {
        id: '3',
        title: "James Bond Island & Phang Nga Bay Tour",
        location: "Phang Nga Bay",
        rating: 4.7,
        reviewCount: 178,
        originalPrice: 2800,
        discountedPrice: 2240,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Island Tour",
        activities: ["Kayaking", "Swimming"],
        startTime: "07:30",
        groupSize: 20,
        vehicle: "Speedboat",
        features: ["Transfer", "Halal Food"]
    },
    {
        id: '4',
        title: "Luxury Yacht Sunset Cruise",
        location: "Royal Phuket Marina",
        rating: 4.9,
        reviewCount: 89,
        originalPrice: 5000,
        discountedPrice: 4250,
        discount: 15,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Island Tour",
        activities: ["Swimming", "Sunset viewing"],
        startTime: "15:00",
        groupSize: 12,
        vehicle: "Yacht",
        features: ["Transfer", "Halal Food", "Vegetarian food"]
    },
    {
        id: '5',
        title: "Similan Islands Scuba Diving Adventure",
        location: "Similan Islands",
        rating: 4.8,
        reviewCount: 145,
        originalPrice: 4500,
        discountedPrice: 3825,
        discount: 15,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Island Tour",
        activities: ["Scuba diving", "Snorkelling"],
        startTime: "06:30",
        groupSize: 8,
        vehicle: "Speedboat",
        features: ["Transfer", "Equipment provided"]
    },
    {
        id: '6',
        title: "Chiang Mai Temple & City Tour",
        location: "Chiang Mai Old City",
        rating: 4.6,
        reviewCount: 234,
        originalPrice: 1800,
        discountedPrice: 1440,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Land tour",
        activities: ["Temple visit", "City exploration"],
        startTime: "09:00",
        groupSize: 15,
        vehicle: "Minivan",
        features: ["Transfer", "Local guide"]
    },
    {
        id: '7',
        title: "Bangkok Food & Night Market Tour",
        location: "Bangkok",
        rating: 4.7,
        reviewCount: 167,
        originalPrice: 2000,
        discountedPrice: 1600,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Land tour",
        activities: ["Food tasting", "Shopping"],
        startTime: "17:00",
        groupSize: 10,
        vehicle: "Tuk Tuk",
        features: ["Transfer", "Food included", "Halal Food"]
    },
    {
        id: '8',
        title: "Khao Yai National Park Wildlife Safari",
        location: "Khao Yai",
        rating: 4.8,
        reviewCount: 123,
        originalPrice: 3500,
        discountedPrice: 2975,
        discount: 15,
        imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        theme: "Safari",
        activities: ["Wildlife spotting", "Hiking"],
        startTime: "05:30",
        groupSize: 8,
        vehicle: "Safari Truck",
        features: ["Transfer", "Breakfast included"]
    }
]; 