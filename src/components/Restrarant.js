import { useState, useRef } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import foodVideo from "../assets/food.mp4";
import restaurants from "../assets/restaurantData";
import FoodGrid from "./Foodgrid";

library.add(faClock, faStar, faFilter);

const FilterPanel = ({
  filters,
  onFilterChange,
  onApply,
  onClear,
  isVisible,
  toggleVisibility,
}) =>
  isVisible && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Apply Filters</h3>
        {/* Delivery Time Filter */}
        <div className="mb-4">
          <label className="block text-gray-700">Delivery Time</label>
          <select
            name="sortByDeliveryTime"
            value={filters.sortByDeliveryTime}
            onChange={onFilterChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Delivery Time</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <select
            name="sortByRating"
            value={filters.sortByRating}
            onChange={onFilterChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Rating</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {/* Apply and Clear Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onApply}
            className="px-6 py-2 bg-green-500 text-white rounded-full"
          >
            Apply
          </button>
          <button
            onClick={onClear}
            className="px-6 py-2 bg-gray-500 text-white rounded-full"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );

const RestaurantCard = ({ restaurant }) => (
  <Link
    to={`/restaurant/${restaurant.id}`}
    key={restaurant.id}
    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
  >
    <div className="relative">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
        {restaurant.rating}<FontAwesomeIcon icon="star" className="ml-1" /> (
        {restaurant.people})
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
        <div className="flex items-center">
          <FontAwesomeIcon icon="clock" className="mr-2" />
          <p>{restaurant.deliveryTime}</p>
        </div>
        <p>{restaurant.distance}</p>
      </div>
      <h3 className="text-lg font-semibold">{restaurant.name}</h3>
      <h3 className="text-base font-normal">{restaurant.address}</h3>
    </div>
  </Link>
);

const Restrarant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortByDeliveryTime: "",
    sortByRating: "",
  });
  const categoryRefs = useRef({});

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleToggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleApplyFilters = () => setIsFilterOpen(false);
  const handleClearFilters = () =>
    setFilters({ sortByDeliveryTime: "", sortByRating: "" });

  const scrollToCategory = (category) => {
    const targetRef = categoryRefs.current[category];
    if (targetRef) targetRef.scrollIntoView({ behavior: "smooth" });
  };

  // Apply filters
  const filteredRestaurants = restaurants
    .filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filters.sortByDeliveryTime === "lowToHigh") {
        return a.deliveryTime - b.deliveryTime;
      } else if (filters.sortByDeliveryTime === "highToLow") {
        return b.deliveryTime - a.deliveryTime;
      }
      return 0;
    })
    .sort((a, b) => {
      if (filters.sortByRating === "lowToHigh") {
        return a.rating - b.rating;
      } else if (filters.sortByRating === "highToLow") {
        return b.rating - a.rating;
      }
      return 0;
    });

  // Group filtered restaurants by category
  const groupedRestaurants = filteredRestaurants.reduce((acc, restaurant) => {
    const category = restaurant.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(restaurant);
    return acc;
  }, {});

  return (
    <div>
      <section className="relative h-[400px] bg-gray-500">
        <video
          src={foodVideo}
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-2/3 md:w-1/2 py-3 px-5 bg-white rounded-full outline-none text-black placeholder-gray-500"
          />
        </div>
      </section>

      <div>
        <FoodGrid onFoodItemClick={(category) => scrollToCategory(category)} />
      </div>

      <section className="py-8">
        <div className="container mx-auto px-2">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleToggleFilter}
              className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600"
            >
              <FontAwesomeIcon icon="filter" />
              <span>Filter</span>
            </button>
          </div>
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            isVisible={isFilterOpen}
            toggleVisibility={handleToggleFilter}
          />
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-2">
          {Object.keys(groupedRestaurants).map((category) => (
            <div
              key={category}
              ref={(el) => (categoryRefs.current[category] = el)}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {groupedRestaurants[category].map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Restrarant;
