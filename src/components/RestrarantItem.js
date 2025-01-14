import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import foodCategories from "../assets/restaurantData";
import { useParams } from "react-router-dom";

// Add FontAwesome icons to the library
library.add(faClock);

const RestrarantItem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    price: "",
    type: "",
    sortByPrice: "",
    sortByRating: "",
    sortByTime: "",
  });

   // Handle search input change
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  // Add item to cart
  const handleAddToCart = (itemId, restaurantId) => {
    setCart((prevCart) => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || {
        items: {},
        restaurantId: null,
      };
      if (savedCart.restaurantId && savedCart.restaurantId !== restaurantId) {
        return prevCart; 
      }

      const newCart = { ...prevCart, [itemId]: (prevCart[itemId] || 0) + 1 };

      localStorage.setItem(
        "cart",
        JSON.stringify({ items: newCart, restaurantId })
      );
      setCurrentRestaurant(restaurantId);
      return newCart;
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      // Decrease item quantity or remove from cart
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }

      // Update cart in local storage
      if (Object.keys(updatedCart).length === 0) {
        localStorage.removeItem("cart");
        setCurrentRestaurant(null);
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: updatedCart,
            restaurantId: currentRestaurant,
          })
        );
      }

      return updatedCart;
    });
  };

  // Fetch saved cart on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (savedCart) {
      setCart(savedCart.items || {});
      setCurrentRestaurant(savedCart.restaurantId || null);
    }
  }, []);

  // Toggle filter panel visibility
  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Apply selected filters
  const handleApplyFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "type") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked ? value : "",
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  // Get the current restaurant based on the route parameter
  const { id } = useParams();
  const selectedRestaurant = foodCategories.find(
    (restaurant) => restaurant.id === parseInt(id, 10)
  );

  // Display error if restaurant not found
  if (!selectedRestaurant) {
    return <p className="text-center">Restaurant not found!</p>;
  }

  // Sort menu items based on selected filters
  const sortItems = (items) => {
    if (filters.sortByPrice === "lowToHigh") {
      return items.sort(
        (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
      );
    } else if (filters.sortByPrice === "highToLow") {
      return items.sort(
        (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
      );
    } else if (filters.sortByTime === "lowToHigh") {
      return items.sort((a, b) => parseInt(a.time) - parseInt(b.time));
    } else if (filters.sortByTime === "highToLow") {
      return items.sort((a, b) => parseInt(b.time) - parseInt(a.time));
    }
    return items;
  };

  return (
    <div>
      {/* Video Section with Search Bar */}
      <section className="relative h-[400px] bg-gray-500">
        <img
          src={selectedRestaurant.image}
          alt={selectedRestaurant.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <input
            type="text"
            placeholder={`Search in ${selectedRestaurant.name}...`}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-2/3 md:w-1/2 py-3 px-5 bg-white rounded-full outline-none text-black placeholder-gray-500 shadow-lg"
          />
        </div>

        <div className="absolute bottom-5 left-5 flex items-center text-white space-x-2 bg-black bg-opacity-75 py-2 px-4 rounded-lg">
          <FontAwesomeIcon icon="clock" className="mr-2" />
          <span>{selectedRestaurant.deliveryTime}</span>
        </div>

        <div className="absolute bottom-5 right-5 bg-yellow-500 text-black py-2 px-4 rounded-lg font-semibold">
           {selectedRestaurant.rating}⭐ ({selectedRestaurant.people})
        </div>
      </section>

      {/* Menu Category Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-[44%] h-[1px] bg-black"></div>
            <h1 className="mx-4 text-2xl font-bold text-center">Our Menu</h1>
            <div className="w-[44%] h-[1px] bg-black"></div>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={handleToggleFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center justify-center gap-2 hover:bg-blue-600"
            >
              <FontAwesomeIcon icon="filter" className="text-white" />
              <span>Filter</span>
            </button>
          </div>

          {/* Food Categories */}
          {selectedRestaurant.menu.map((category, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                {category.category}
              </h3>

              {/* Food Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortItems(category.items)
                  .filter(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      (!filters.price ||
                        parseFloat(item.price.slice(1)) <=
                          parseFloat(filters.price)) &&
                      (!filters.type || item.type === filters.type)
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white shadow-lg rounded-lg p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-600">
                          <FontAwesomeIcon icon="clock" className="mr-2" />
                          <p>{item.time}</p>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.name}
                        </h3>
                        <p>{item.quantity}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-lg font-semibold text-orange-500">
                            {item.price}
                          </span>

                          {/* Cart Button */}
                          {cart[item.id] > 0 ? (
                            <div className="flex items-center gap-2">
                              <button
                                className="px-3 py-1 bg-red-500 text-white rounded-full"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                -
                              </button>
                              <span>{cart[item.id]}</span>
                              <button
                                className="px-3 py-1 bg-green-500 text-white rounded-full"
                                onClick={() => handleAddToCart(item.id)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                              onClick={() => handleAddToCart(item.id)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Apply Filters</h3>

            {/* Price Filter */}
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <select
                name="sortByPrice"
                value={filters.sortByPrice}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Price</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>

            {/* Time Filter */}
            <div className="mb-4">
              <label className="block text-gray-700">Delivery Time</label>
              <select
                name="sortByTime"
                value={filters.sortByTime}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Delivery Time</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>

            {/* Apply and Clear Button */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-green-500 text-white rounded-full"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setFilters({
                    price: "",
                    type: "",
                    sortByPrice: "",
                    sortByRating: "",
                    sortByTime: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-full"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestrarantItem;
