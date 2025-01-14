const restaurantData = [
  {
    id: 1,
    name: "Pizza Palace",
    category: "Fast Food",
    deliveryTime: "30 mins",
    distance: "3.2 km",
    rating: 4.2,
    people: 292,
    address: "24b Street Chowk Nehru Nagar Nashik",
    image: "https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_960_720.jpg",
    menu: [
      {
        category: "Fast Food",
        items: [  
          {
            id: 1,
            name: "Cheeseburger",
            image: "https://media.istockphoto.com/id/474263000/photo/hamburger-on-white-background.jpg?s=1024x1024&w=is&k=20&c=VAcqkV5vnF5wPq3PSy_vdPapNH99ODb79PQtdhPov6s=",
            time: "10 mins",
            quantity: "1pc",
            price: "$5",
            type: "Non-Veg",
          },
          {
            id: 2,
            name: "Fries",
            image: "https://media.istockphoto.com/id/1292619402/photo/mix-herb-french-fries-served-in-a-plate-over-a-rustic-wooden-background-indian-cusine.jpg?s=1024x1024&w=is&k=20&c=YINO5N226R5P1FESOpiTnIwD_a1QO9CXv5sQW9IMDbY=",
            time: "5 mins",
            quantity: "100gm",
            price: "$3",
            type: "Veg",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Biryani House",
    category: "Non-Veg",
    deliveryTime: "40 mins",
    distance: "5 km",
    rating: 4.5,
    people: 541,
    address: "12A MG Road Pune",
    image: "https://cdn.pixabay.com/photo/2021/09/25/18/54/dish-6655595_960_720.jpg",
    menu: [
      {
        category: "Biryani",
        items: [
          {
            id: 3,
            name: "Chicken Biryani",
            image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.jpg?s=1024x1024&w=is&k=20&c=bvTAMlq5A8Z5EhVjBn6D8eYOQS-rsuKmT9ToLkCc2Y4=",
            time: "20 mins",
            quantity: "1kg",
            price: "$12",
            type: "Non-Veg",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Healthy Bowls",
    category: "Salad",
    deliveryTime: "25 mins",
    distance: "2.8 km",
    rating: 4.7,
    people: 186,
    address: "32 Greenway Lane, Bangalore",
    image: "https://cdn.pixabay.com/photo/2021/04/01/15/39/copyright-6142611_960_720.jpg",
    menu: [
      {
        category: "Salads",
        items: [
          {
            id: 4,
            name: "Greek Salad",
            image: "https://cdn.pixabay.com/photo/2021/01/10/04/37/salad-5904093_1280.jpg",
            time: "10 mins",
            quantity: "1 bowl",
            price: "$8",
            type: "Veg",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Juicy Beverages",
    category: "Soft Drink",
    deliveryTime: "20 mins",
    distance: "3.0 km",
    rating: 4.6,
    people: 312,
    address: "45 Refresh Lane, Mumbai",
    image: "https://cdn.pixabay.com/photo/2016/08/23/15/52/fresh-orange-juice-1614822_1280.jpg",
    menu: [
      {
        category: "Cold Drinks",
        items: [
          {
            id: 5,
            name: "Lemonade",
            image: "https://media.istockphoto.com/id/537228258/photo/mason-jar-glasses-of-homemade-lemonade-on-rustic-wood.jpg?s=1024x1024&w=is&k=20&c=eOY9IrSITgu2_V-yKASKkmDZZBF2bXcq40cRLvIIq50=",
            time: "5 mins",
            quantity: "500ml",
            price: "$4",
            type: "Veg",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Tandoor Treats",
    category: ["Veg", "Non-Veg"],
    deliveryTime: "50 mins",
    distance: "6.5 km",
    rating: 4.3,
    people: 120,
    address: "88 Flame Street, Delhi",
    image: "https://cdn.pixabay.com/photo/2015/04/10/00/41/food-715542_1280.jpg",
    menu: [
      {
        category: "Tandoori",
        items: [
          {
            id: 6,
            name: "Paneer Tikka",
            image: "https://media.istockphoto.com/id/1186759773/photo/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-tikka-is-an-indian.jpg?s=1024x1024&w=is&k=20&c=g1JrV0qs3jOzVCNd1_hECHAwXn7DzC7DdaG1_h7rYrg=",
            time: "20 mins",
            quantity: "6pcs",
            price: "$6",
            type: "Veg",
          },
          {
            id: 7,
            name: "Chicken Tandoori",
            image: "https://media.istockphoto.com/id/1396604313/photo/roasted-whole-chicken-legs-with-condiment-directly-above-photo.jpg?s=1024x1024&w=is&k=20&c=4SN9A2WAm8wDLeh0p4-DOZW4EHyn0I57GPtAhYMzo9Q=",
            time: "30 mins",
            quantity: "4pcs",
            price: "$10",
            type: "Non-Veg",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Dragon Wok",
    category: "Chinese",
    deliveryTime: "35 mins",
    distance: "4.0 km",
    rating: 4.4,
    people: 230,
    address: "56 Silk Road, Hyderabad",
    image: "https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=1024x1024&w=is&k=20&c=KxgiUigzYxtMqahfVpGMM6SHfLOHCZb4Mby0At2UbFQ=",
    menu: [
      {
        category: "Chinese",
        items: [
          {
            id: 8,
            name: "Veg Noodles",
            image: "https://media.istockphoto.com/id/1292637257/photo/veg-hakka-noodles-a-popular-oriental-dish-made-with-noodles-and-vegetables-served-over-a.jpg?s=1024x1024&w=is&k=20&c=0RM7yJSu5IRjWLEOD2CO_9GOkNiNy_sEH0lGCAwduQ8=",
            time: "15 mins",
            quantity: "1 plate",
            price: "$7",
            type: "Veg",
          },
          {
            id: 9,
            name: "Kung Pao Chicken",
            image: "https://media.istockphoto.com/id/507124607/photo/homemade-kung-pao-chicken.jpg?s=1024x1024&w=is&k=20&c=nOnX9vKQoP8_WlfOd_gVb0YZLG5kx_zSUz4_RS397B4=",
            time: "20 mins",
            quantity: "1 bowl",
            price: "$10",
            type: "Non-Veg",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Chilled Cola",
    category: "Soft Drink",
    deliveryTime: "30 mins",
    distance: "5.0 km",
    rating: 3.6,
    people: 362,
    address: "34 Gandhi Lane, Pune",
    image: "https://media.istockphoto.com/id/1393991948/photo/cola-with-crushed-ice-in-glass-and-there-is-water-droplets-around-cool-black-fresh-drink.jpg?s=1024x1024&w=is&k=20&c=NrhXNG0NGUaSK3twfES4VSXt8RnWFNpqHejBy_gWtcI=",
    menu: [
      {
        category: "Cold Drinks",
        items: [
          {
            id: 10,
            name: "Coca Cola",
            image: "https://media.istockphoto.com/id/157726102/photo/classical-coca-cola-bottle.jpg?s=1024x1024&w=is&k=20&c=rTqTP2dYyI2QdORWZAWxGVmlsm20FJLOnxYIhcf2ifY=",
            time: "5 mins",
            quantity: "1ml",
            price: "$8",
            type: "Veg",
          },
        ],
      },
    ],
  },
];

export default restaurantData;

  