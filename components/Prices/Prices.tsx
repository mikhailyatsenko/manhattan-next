"use client";

import { useState, useEffect } from "react";
import type { PriceCategory, PriceItem } from "../../types/prices";
import { useInView } from "../../lib/hooks/useInView";
import { Link } from "react-scroll";

interface PriceItemProps {
  item: PriceItem;
}

const PriceItemComponent = ({ item }: PriceItemProps) => {
  const formatPrice = (price: string | number, prefix?: string) => {
    if (prefix) {
      return `${prefix}${price}₽`;
    }
    return `${price}₽`;
  };

  return (
    <li>
      <div className="detail-price">
        <div className="price-name">
          <div className="text-base">
            <span>{item.service}</span>
          </div>
          {item.additionalInfo && (
            <p className="text-sm text-gray-600 mt-1">{item.additionalInfo}</p>
          )}
        </div>
        <div className="price-dots"></div>
        <div className="price-number">
          <div className="text-base font-normal">
            {formatPrice(item.price, item.prefix)}
          </div>
        </div>
      </div>
    </li>
  );
};

const Prices = () => {
  const { ref, isInView } = useInView();
  const [prices, setPrices] = useState<PriceCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем список категорий из ключей объекта
  const categories = prices ? Object.keys(prices) : [];
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch prices from static JSON file
  useEffect(() => {
    async function loadPrices() {
      try {
        setLoading(true);
        const response = await fetch("/prices/prices.json");

        if (!response.ok) {
          throw new Error("Failed to fetch prices");
        }

        const data = await response.json();
        setPrices(data as PriceCategory);
        // Set first category as active after data is loaded
        const firstCategory = Object.keys(data)[0];
        if (firstCategory) {
          setActiveCategory(firstCategory);
        }
        setError(null);
      } catch (err) {
        console.error("Error loading prices:", err);
        setError("Не удалось загрузить цены. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    }

    loadPrices();
  }, []);

  return (
    <section ref={ref} id="price" className="price-section">
      <div className="px-2 py-20 mx-auto">
        <h1 className="sm:text-5xl text-4xl font-normal mb-4 text-center">
          Наши цены
        </h1>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-darkbrown inline-flex"></div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-darkbrown mb-4"></div>
            <p className="text-lg text-gray-600">Загружаем цены...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <div className="text-red-600 text-lg mb-4">⚠️ {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-darkbrown text-white rounded hover:bg-mediumbrown transition-all duration-300 ease-in-out"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && prices && (
          <>
            <div className="text-center text-base font-semibold mt-4">
              Выберите категорию услуг:
            </div>

            <div className="masters-tabs border border-darkbrown rounded">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`master-tab transition-all duration-300 ease-in-out cursor-pointer hover:bg-mediumbrown hover:text-lightbrown ${
                    activeCategory === category
                      ? "bg-darkbrown text-lightbrown"
                      : ""
                  }`}
                  aria-pressed={activeCategory === category}
                  aria-label={`Показать категорию ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div
              className={`flex flex-wrap justify-center items-start price price-active animate-in animate-from-bottom ${
                isInView ? "is-visible" : ""
              }`}
            >
              <h2 className="text-center w-full text-3xl font-normal">
                {activeCategory}
              </h2>
              <div className="p-4 w-full flex flex-col text-center items-center">
                <ul className="w-full max-w-4xl">
                  {prices[activeCategory]?.map((item, index) => (
                    <PriceItemComponent key={index} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
        <div
          className={`animate-in animate-from-bottom animate-delay-500 w-full text-center ${
            isInView ? "is-visible" : ""
          }`}
        >
          <Link
            to="contacts"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            href="#contacts"
            className="mx-auto text-darkbrown hover:text-lightbrown border border-darkbrown hover:bg-darkbrown focus:ring-4 focus:outline-none focus:ring-lightbrown font-normal rounded-sm text-2xl px-5 py-2.5 text-center my-5 transition-all duration-300 ease-in-out inline-block"
          >
            Записаться
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Prices;
