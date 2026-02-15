# Примеры использования Slider

## Базовое использование

```tsx
import Slider from "@/components/Slider/Slider";

export default function HomePage() {
  return (
    <div>
      <Slider />
    </div>
  );
}
```

## Добавление нового слайда

Откройте `components/Slider/config/slides.tsx`:

```tsx
export const slides: SlideConfig[] = [
  // ... существующие слайды
  {
    id: "new-promotion",
    desktopImage: "img/my-promo-desktop.webp",
    mobileImage: "img/my-promo-mobile.webp", // Отдельная картинка для мобильных
    content: (
      <>
        <h1 className="2xl:text-7xl xl:text-6xl text-4xl text-lightbrown drop-shadow-sm font-normal">
          Новая акция
        </h1>
        <h2 className="text-3xl text-white">
          Описание вашей акции
        </h2>
      </>
    ),
  },
];
```

## Настройка оверлея

Измените прозрачность оверлея в `components/Slider/components/SlideItem/SlideItem.module.scss`:

```scss
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25); // ← Измените значение (0.0 - 1.0)
  z-index: 1;
}
```

### Варианты затемнения:
- `0.15` - Очень легкое затемнение
- `0.25` - Легкое затемнение (текущее)
- `0.35` - Среднее затемнение
- `0.50` - Сильное затемнение

## Настройка времени автопрокрутки

В `components/Slider/Slider.tsx`:

```tsx
const { resetAutoScrollTimer, isAutoScrollingRef } = useAutoScroll({
  sliderRef,
  intervalMs: 1000,  // Как часто проверять (в миллисекундах)
  delayMs: 5000,     // Задержка перед автопрокруткой после взаимодействия
});
```

### Примеры:
- `delayMs: 3000` - 3 секунды
- `delayMs: 5000` - 5 секунд (текущее)
- `delayMs: 10000` - 10 секунд

## Использование одинаковой картинки для всех устройств

Если не нужна отдельная мобильная версия:

```tsx
{
  id: "birthday",
  desktopImage: "img/slide-2.webp",
  mobileImage: "img/slide-2.webp",  // Та же картинка
  content: <...>
}
```

## Кастомизация стилей текста

Используйте Tailwind классы прямо в `content`:

```tsx
content: (
  <div>
    <h1 className="text-6xl font-bold text-white mb-4">
      Заголовок
    </h1>
    <p className="text-2xl text-gray-200 max-w-2xl">
      Описание с ограничением ширины
    </p>
  </div>
)
```

## Выравнивание контента

В `components/Slider/components/SlideItem/SlideItem.module.scss` уже есть варианты:

```scss
// По центру
.first-visit {
  text-align: center;
  justify-content: center;
}

// Слева на десктопе, по центру на мобильных
.friends,
.birthday {
  text-align: left;
  justify-content: flex-start;

  @media (max-width: 767px) {
    justify-content: center;
    text-align: center;
  }
}
```

Добавьте новый класс для вашего слайда с нужным id.

## Отключение автопрокрутки

Закомментируйте хук в `Slider.tsx`:

```tsx
// const { resetAutoScrollTimer, isAutoScrollingRef } = useAutoScroll({
//   sliderRef,
//   intervalMs: 1000,
//   delayMs: 5000,
// });

// И используйте пустую функцию
const resetAutoScrollTimer = () => {};
const isAutoScrollingRef = useRef(false);
```

## Использование компонентов отдельно

Все подкомпоненты можно использовать независимо:

```tsx
import { SlideItem } from "@/components/Slider/components/SlideItem/SlideItem";
import { useMediaQuery } from "@/components/Slider/hooks/useMediaQuery";

export default function CustomSlider() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <SlideItem
      id="custom-slide"
      desktopImage="img/custom.webp"
      mobileImage="img/custom-mobile.webp"
      content={<h1>Кастомный контент</h1>}
      isMobile={isMobile}
    />
  );
}
```
