// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'importer FontAwesome
// import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import {
//   faGasPump,
//   faCreditCard,
//   faCar,
//   faCoffee,
//   faWifi,
//   faUtensils,
//   faTools,
//   faShower,
//   faBaby,
//   faCouch,
//   faStore,
//   faGauge,
//   faToilet,
//   faTruck,
//   faHome,
//   faHandsBubbles,
//   faOilCan,
//   faPlug,
//   faBox,
//   faSoap,
//   faCaravan,
// } from '@fortawesome/free-solid-svg-icons'; // Exemple d'icônes à utiliser
//
// interface ServiceIconProps {
//   service: string;
// }
//
// export const ServiceIcon: React.FC<ServiceIconProps> = ({ service }) => {
//   const getServiceIcon = (serviceName: string): IconDefinition | null => {
//     console.log('serviceName', serviceName);
//     switch (serviceName.toLowerCase()) {
//       case 'vente de gaz domestique (butane, propane)':
//         return faGasPump;
//       case 'station de gonflage':
//         return faGauge;
//       case 'dab (distributeur automatique de billets)':
//         return faCreditCard;
//       case 'automate cb 24/24':
//         return faCar;
//       case 'boutique alimentaire':
//         return faCoffee;
//       case 'boutique non alimentaire':
//         return faStore;
//       case 'piste poids lourds':
//         return faTruck;
//       case 'carburant additivé':
//         return faOilCan;
//       case 'lavage automatique':
//         return faCar;
//       case 'toilettes publiques':
//         return faToilet;
//       case 'lavage manuel':
//         return faHandsBubbles;
//       case 'restauration à emporter':
//         return faUtensils;
//       case 'location de véhicule':
//         return faCar;
//       case 'relais colis':
//         return faBox;
//       case 'laverie':
//         return faSoap;
//       case "vente d'additifs carburants":
//         return faOilCan;
//       case 'services réparation / entretien':
//         return faTools;
//       case 'restauration sur place':
//         return faHome;
//       case 'wifi':
//         return faWifi;
//       case 'vente de fioul domestique':
//         return faGasPump;
//       case 'vente de pétrole lampant':
//         return faGasPump;
//       case 'bornes électriques':
//         return faPlug;
//       case 'bar':
//         return faCouch;
//       case 'espace bébé':
//         return faBaby;
//       case 'douches':
//         return faShower;
//       case 'aire de camping-cars':
//         return faCaravan;
//       default:
//         return null;
//     }
//   };
//
//   const icon = getServiceIcon(service);
//
//   return icon ? <FontAwesomeIcon icon={icon} /> : null;
// };
