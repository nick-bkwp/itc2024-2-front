# О задаче

Перед нами стояла задача реализовать редактор дорожных сетей. Каждая дорожная сеть может представлять из себя набор ломанных, который содержит в себе определенную паспортную информацию. Помимо этого, на дорогах можно выделять отдельные участки, объявлять их ремонтными, вносить данные ремонтных работ, осуществлять планирование.

Стек на фронтенде:

![image]({https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D})
![image]({https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white})
![image]({https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=OpenStreetMap&logoColor=white})

## Страницы

- [Карта](http://localhost:9000/#/map)

основная страница. объединяет в себе вышеперечисленный функционал

- Stages.vue. Редактор процессов.

Позволяет создавать и редактировать процессы, разбивая их на глобальные и локальные этапы. В будущем произвоство любой строительной/ремонтной дороги будет соответствовать одному из созданных процессов

## Компоненты

- Popup.vue. Попап.

 Показывает краткую информацию о дороге или ремонтном мероприятии, позволяет открыть диалог для редактирования

- CreateEventDialog.vue / CreateRoadDialog.vue. Диалоги

Создание / редактирование дороги (паспортная информация), либо строительства / ремонтного мероприятия

- Sidebar.vue

Краткая информация о дороге в сайдбаре

- Chat.vue. Чат

В приложение встроена RAG-система, позволяющая быстро получить консультацию по терминологии, ГОСТам и проч.

## Хуки

- useMap

инициализирует и фокусирует карту по id контейнера

- usePoint

создает точку

- useDrawing

режим рисования (выделение отрезков на дороге, создание новых дорог)
