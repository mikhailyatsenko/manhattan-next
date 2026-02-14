import { useState, useRef, useEffect } from "react";

const Map = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
        }
      },
      { rootMargin: '600px' }
    );

    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mapRef} style={{ minHeight: '400px' }}>
      {isLoaded && (
        <iframe
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=236195866043"
          width="100%"
          height="400"
          frameBorder="0"
          title="Яндекс Карта"
        />
      )}
    </div>
  );
};

export default Map;