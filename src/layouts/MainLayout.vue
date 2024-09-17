<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Y-Ologie 😳😳😳 </q-toolbar-title>

        <div>Личный кабинет 😵‍💫😵‍💫😵‍💫</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Типа меню 😆😆😆 </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Создать событие на карте',
    caption: 'Выберите элемент дороги чтобы создать событие ремонта',
    icon: 'design_services',
    // TODO: вместо ссылок добавить некий флаг в стор, который отображает режим текущего редактирования
  },
  {
    title: 'Создать дорогу',
    caption: 'Создание новой дороги на карте',
    icon: 'add_road',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
