'use client';

import { useEffect } from 'react';

type YMFunction = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a?: any[];
  l?: number;
};

declare global {
  interface Window {
    ym?: (counterId: number, method: string, params?: Record<string, unknown>) => void;
  }
}

export default function YandexMetrika() {
  useEffect(() => {
    // Функция загрузки метрики
    function loadMetrika() {
      (function (m: Window, e: Document, t: string, r: string, i: string) {
        const ymKey = i as keyof Window;
        
        // Создаем функцию метрики
        if (!m[ymKey]) {
          (m[ymKey] as unknown as YMFunction) = function (...args: unknown[]) {
            const ym = m[ymKey] as unknown as YMFunction;
            ym.a = ym.a || [];
            ym.a.push(args);
          };
          (m[ymKey] as unknown as YMFunction).l = new Date().getTime();
        }

        // Проверяем, не загружен ли уже скрипт
        for (let j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }

        // Добавляем скрипт на страницу
        const scriptElement = e.createElement(t) as HTMLScriptElement;
        const firstScript = e.getElementsByTagName(t)[0];
        scriptElement.async = true;
        scriptElement.src = r;
        firstScript.parentNode?.insertBefore(scriptElement, firstScript);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      // Инициализация метрики
      window.ym?.(89871929, 'init', {
        clickmap: true,
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true,
        webvisor: true,
      });
    }

    // Загружаем при первом взаимодействии пользователя
    let metrikaLoaded = false;
    function onUserInteraction() {
      if (metrikaLoaded) return;
      metrikaLoaded = true;
      loadMetrika();
    }

    const events = ['mousemove', 'scroll', 'touchstart', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, onUserInteraction, { once: true });
    });

    // Резервный запуск через 4 секунды, если пользователь ничего не делает
    const timeout = setTimeout(onUserInteraction, 4000);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      events.forEach((event) => {
        document.removeEventListener(event, onUserInteraction);
      });
    };
  }, []);

  return (
    <noscript>
      <div>
        <img
          src="https://mc.yandex.ru/watch/89871929"
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}
