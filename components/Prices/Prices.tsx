"use client";

import { useState, useEffect } from "react";
import type { PriceCategory, PriceItem } from "../../types/prices";
import { useInView } from "../../lib/hooks/useInView";

import pricesDataFallback from "../../prices_json/prices.json";

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
          <h5 className="text-base">
            {item.service.split('\n').map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </h5>
          {item.additionalInfo && (
            <p className="text-sm text-gray-600 mt-1">{item.additionalInfo}</p>
          )}
        </div>
        <div className="price-dots"></div>
        <div className="price-number">
          <h5 className="text-base">{formatPrice(item.price, item.prefix)}</h5>
        </div>
      </div>
    </li>
  );
};

const Prices = () => {
  const { ref, isInView } = useInView();
  const [prices, setPrices] = useState<PriceCategory>(pricesDataFallback as PriceCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Получаем список категорий из ключей объекта
  const categories = Object.keys(prices);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  // Fetch prices from API
  useEffect(() => {
    async function fetchPrices() {
      try {
        setLoading(true);
        const response = await fetch('/api/prices');
        
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        
        const data = await response.json();
        setPrices(data as PriceCategory);
        setError(null);
      } catch (err) {
        console.error('Error fetching prices:', err);
        setError('Не удалось загрузить цены. Показываем локальные данные.');
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return (
    <section
      ref={ref}
      id="price"
      className={`price-section animate-in animate-fade-in ${isInView ? "is-visible" : ""}`}
    >
      <div className="px-2 py-20 mx-auto">
        <h1 className="sm:text-5xl text-4xl font-medium mb-4 text-center">
          Наши цены
        </h1>
        {error && (
          <div className="text-center text-sm text-red-600 mb-2">
            {error}
          </div>
        )}
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-darkbrown inline-flex"></div>
        </div>
        <div className="text-center text-base font-bold mt-4">
          Выберите категорию услуг:
        </div>

        <div className="masters-tabs border border-darkbrown rounded">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`master-tab transition-all cursor-pointer hover:bg-mediumbrown hover:text-lightbrown ${
                activeCategory === category ? "bg-darkbrown text-lightbrown" : ""
              }`}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-start price price-active">
          <div className="text-center w-full text-3xl">
            {activeCategory}
          </div>
          <div className="p-4 w-full flex flex-col text-center items-center">
            <ul className="w-full max-w-4xl">
              {prices[activeCategory]?.map((item, index) => (
                <PriceItemComponent key={index} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prices;
