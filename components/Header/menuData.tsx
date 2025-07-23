import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    newTab: false,
    path: "/",
  },
  {
    id: 3,
    title: "Productos",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Termómetro Migratorio",
        newTab: false,
        path: "/termometro",
      },
      {
        id: 34,
        title: "Calculadora Migratoría",
        newTab: false,
        path: "/calculadora",
      },
      {
        id: 35,
        title: "Métricas Embajadas",
        newTab: false,
        path: "/metricasembajadas",
      },
    ],
  },
  {
    id: 2,
    title: "Preguntas Frecuentes",
    newTab: false,
    path: "/preguntasfrecuentes",
  },
  {
    id: 2.1,
    title: "Blog",
    newTab: false,
    path: "/blog",
  },

  {
    id: 4,
    title: "Contactanos",
    newTab: false,
    path: "/contactanos",
  },
];

export default menuData;
