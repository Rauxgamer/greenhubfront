// // insertData.js
// import { writeBatch, doc, collection, getFirestore } from 'firebase/firestore';
// import { app } from './firebaseConfig'; // Asegúrate de que Firebase esté configurado correctamente

// const db = getFirestore(app); // Inicializa Firestore

// const data = {
//   "maceta_de_barro": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta de barro artesanal ideal para interiores y exteriores.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-barro-28451210-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-barro-28451210-2.jpg"
//     ],
//     "nombre": "maceta_de_barro",
//     "precio": 25,
//     "stock": 120,
//     "destacado": true
//   },
//   "maceta_de_plastico": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta de plástico resistente, ideal para plantas de interior.",
//     "disponible": true,
//     "imagen": [
//       "https://www.ikea.com/es/es/images/products/maceta-de-plastico-axelsta__0936395_pe791526_s5.jpg",
//       "https://www.ikea.com/es/es/images/products/maceta-de-plastico-axelsta__0936396_pe791527_s5.jpg"
//     ],
//     "nombre": "maceta_de_plastico",
//     "precio": 8,
//     "stock": 150,
//     "destacado": false
//   },
//   "maceta_colgante": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta colgante de diseño moderno, perfecta para decorar terrazas o balcones.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-colgante-24498310-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-colgante-24498310-2.jpg"
//     ],
//     "nombre": "maceta_colgante",
//     "precio": 20,
//     "stock": 90,
//     "destacado": true
//   },
//   "maceta_de_cemento": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta de cemento, ideal para darle un toque industrial a tu decoración.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-cemento-24499021-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-cemento-24499021-2.jpg"
//     ],
//     "nombre": "maceta_de_cemento",
//     "precio": 18,
//     "stock": 50,
//     "destacado": false
//   },
//   "maceta_autorriego": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta con sistema de autorriego, ideal para mantener tus plantas siempre saludables.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-autorriego-24497320-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-autorriego-24497320-2.jpg"
//     ],
//     "nombre": "maceta_autorriego",
//     "precio": 30,
//     "stock": 80,
//     "destacado": true
//   },
//   "maceta_grande": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta grande para plantas de exterior, ideal para plantas de gran tamaño.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-grande-24497333-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-grande-24497333-2.jpg"
//     ],
//     "nombre": "maceta_grande",
//     "precio": 40,
//     "stock": 60,
//     "destacado": false
//   },
//   "maceta_redonda": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta redonda de cerámica, adecuada para plantas de interior.",
//     "disponible": true,
//     "imagen": [
//       "https://www.ikea.com/es/es/images/products/maceta-redonda-axelsta__0936402_pe791532_s5.jpg",
//       "https://www.ikea.com/es/es/images/products/maceta-redonda-axelsta__0936403_pe791533_s5.jpg"
//     ],
//     "nombre": "maceta_redonda",
//     "precio": 15,
//     "stock": 110,
//     "destacado": true
//   },
//   "maceta_de_madera": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta de madera reciclada, ideal para un estilo natural y ecológico.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-madera-24497088-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-madera-24497088-2.jpg"
//     ],
//     "nombre": "maceta_de_madera",
//     "precio": 28,
//     "stock": 70,
//     "destacado": false
//   },
//   "maceta_para_suculentas": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta pequeña ideal para suculentas y cactus, perfecta para decoración de interiores.",
//     "disponible": true,
//     "imagen": [
//       "https://www.ikea.com/es/es/images/products/maceta-para-suculentas-axelsta__0936408_pe791539_s5.jpg",
//       "https://www.ikea.com/es/es/images/products/maceta-para-suculentas-axelsta__0936409_pe791540_s5.jpg"
//     ],
//     "nombre": "maceta_para_suculentas",
//     "precio": 12,
//     "stock": 150,
//     "destacado": true
//   },
//   "maceta_de_metal": {
//     "categoria": "macetas",
//     "categoria_principal": "/productos/macetas",
//     "descripcion": "Maceta de metal decorativa, adecuada para plantas grandes de interior o exterior.",
//     "disponible": true,
//     "imagen": [
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-metal-24497380-1.jpg",
//       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-metal-24497380-2.jpg"
//     ],
//     "nombre": "maceta_de_metal",
//     "precio": 35,
//     "stock": 50,
//     "destacado": false
//   }
// };

// export async function insertarDatos() {
//   try {
//     const batch = writeBatch(db);
//     const productosRef = collection(db, 'productos/macetas/tipos');

//     Object.entries(data).forEach(([nombre, contenido]) => {
//       const docRef = doc(productosRef, nombre);
//       batch.set(docRef, contenido);
//     });

//     await batch.commit();
//     console.log('Datos insertados exitosamente');
//     return { success: true };
//   } catch (error) {
//     console.error('Error al insertar los datos:', error);
//     return { success: false, error: error.message };
//   }
// }

// //Cambiar permisos en las colecciones firebase

// /************************************************             Arboles                          *************************************/
// //   manzano: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol frutal de tamaño medio que requiere riego frecuente.',
// //     disponible: true,
// //     imagen: [
// //       'https://tienda.grupomundoverde.mx/wp-content/uploads/2020/07/Manzano-1.jpg',
// //       'https://tienda.grupomundoverde.mx/wp-content/uploads/2020/07/Manzano-2.jpg',
// //     ],
// //     nombre: 'manzano',
// //     precio: 45,
// //     stock: 80,
// //     destacado: true,
// //   },
// //   peral: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol frutal que produce peras de sabor dulce.',
// //     disponible: true,
// //     imagen: [
// //       'https://nuestraflora.com/wp-content/uploads/2019/03/peral.jpg',
// //       'https://nuestraflora.com/wp-content/uploads/2019/03/peral2.jpg',
// //     ],
// //     nombre: 'peral',
// //     precio: 50,
// //     stock: 100,
// //     destacado: false,
// //   },
// //   cerezo: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol de floración temprana con frutas pequeñas y dulces.',
// //     disponible: true,
// //     imagen: [
// //       'https://pxhere.com/photos/7e/1e/cherry_blossom_tree_spring_blossom-750341.jpg',
// //       'https://pxhere.com/photos/7e/1e/cherry_blossom_tree_spring_blossom-750342.jpg',
// //     ],
// //     nombre: 'cerezo',
// //     precio: 55,
// //     stock: 120,
// //     destacado: false,
// //   },
// //   naranjo: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol que da naranjas jugosas ideales para zumo.',
// //     disponible: true,
// //     imagen: [
// //       'https://www.frutamare.com/wp-content/uploads/2019/03/naranjo.jpg',
// //       'https://www.frutamare.com/wp-content/uploads/2019/03/naranjo2.jpg',
// //     ],
// //     nombre: 'naranjo',
// //     precio: 60,
// //     stock: 50,
// //     destacado: true,
// //   },
// //   olivo: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol robusto, ideal para zonas áridas, produce aceitunas.',
// //     disponible: true,
// //     imagen: [
// //       'https://agrospray.com.ar/wp-content/uploads/2020/03/plantacion-de-olivo.jpg',
// //       'https://agrospray.com.ar/wp-content/uploads/2020/03/plantacion-de-olivo2.jpg',
// //     ],
// //     nombre: 'olivo',
// //     precio: 70,
// //     stock: 40,
// //     destacado: false,
// //   },
// //   limonero: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol de tamaño pequeño que produce limones con alto contenido ácido.',
// //     disponible: true,
// //     imagen: [
// //       'https://curiosfera-recetas.com/wp-content/uploads/2017/03/limonero.jpg',
// //       'https://curiosfera-recetas.com/wp-content/uploads/2017/03/limonero2.jpg',
// //     ],
// //     nombre: 'limonero',
// //     precio: 65,
// //     stock: 30,
// //     destacado: false,
// //   },
// //   mango: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol tropical que produce mangos dulces y jugosos.',
// //     disponible: true,
// //     imagen: [
// //       'https://www.vecteezy.com/png/22825532-mango-fruit-png-mango-on-transparent-background',
// //       'https://www.vecteezy.com/png/22825532-mango-fruit-png-mango-on-transparent-background2',
// //     ],
// //     nombre: 'mango',
// //     precio: 75,
// //     stock: 25,
// //     destacado: true,
// //   },
// //   aguacate: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol que produce aguacates cremosos y nutritivos.',
// //     disponible: true,
// //     imagen: [
// //       'https://primiciadiario.com/wp-content/uploads/2019/07/aguacate.jpg',
// //       'https://primiciadiario.com/wp-content/uploads/2019/07/aguacate2.jpg',
// //     ],
// //     nombre: 'aguacate',
// //     precio: 80,
// //     stock: 60,
// //     destacado: false,
// //   },
// //   castaño: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol de tamaño grande que da frutos comestibles, como las castañas.',
// //     disponible: true,
// //     imagen: [
// //       'https://www.gardencultura.com/wp-content/uploads/2017/10/castano.jpg',
// //       'https://www.gardencultura.com/wp-content/uploads/2017/10/castano2.jpg',
// //     ],
// //     nombre: 'castaño',
// //     precio: 90,
// //     stock: 70,
// //     destacado: false,
// //   },
// //   higueras: {
// //     categoria: 'arboles',
// //     categoria_principal: '/productos/arboles',
// //     descripcion: 'Árbol que da higos dulces y nutritivos.',
// //     disponible: true,
// //     imagen: [
// //       'https://www.jardineriaon.com/wp-content/uploads/2017/02/higuera.jpg',
// //       'https://www.jardineriaon.com/wp-content/uploads/2017/02/higuera2.jpg',
// //     ],
// //     nombre: 'higueras',
// //     precio: 85,
// //     stock: 55,
// //     destacado: false,
// //   },

// /************************************************             Herramientas                          *************************************/
// // "martillo": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Martillo de acero forjado, ideal para trabajos de carpintería y construcción.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.martillos.com/images/martillo.jpg",
// //       "https://www.martillos.com/images/martillo2.jpg"
// //     ],
// //     "nombre": "martillo",
// //     "precio": 15,
// //     "stock": 100,
// //     "destacado": true
// //   },
// //   "destornillador": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Destornillador ergonómico con punta magnética para mayor precisión.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/destornillador.jpg",
// //       "https://www.herramientas.com/images/destornillador2.jpg"
// //     ],
// //     "nombre": "destornillador",
// //     "precio": 10,
// //     "stock": 150,
// //     "destacado": false
// //   },
// //   "sierra": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Sierra de mano de alta resistencia, ideal para cortar madera y otros materiales.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/sierra.jpg",
// //       "https://www.herramientas.com/images/sierra2.jpg"
// //     ],
// //     "nombre": "sierra",
// //     "precio": 25,
// //     "stock": 80,
// //     "destacado": true
// //   },
// //   "taladro": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Taladro eléctrico con múltiples velocidades, perfecto para perforar madera y metal.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/taladro.jpg",
// //       "https://www.herramientas.com/images/taladro2.jpg"
// //     ],
// //     "nombre": "taladro",
// //     "precio": 50,
// //     "stock": 60,
// //     "destacado": false
// //   },
// //   "cinta_metrica": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Cinta métrica flexible y resistente, ideal para medir distancias en proyectos de construcción.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/cinta_metrica.jpg",
// //       "https://www.herramientas.com/images/cinta_metrica2.jpg"
// //     ],
// //     "nombre": "cinta métrica",
// //     "precio": 8,
// //     "stock": 200,
// //     "destacado": false
// //   },
// //   "alicate": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Alicates multifuncionales con mangos antideslizantes, perfectos para trabajar con cables y piezas pequeñas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/alicate.jpg",
// //       "https://www.herramientas.com/images/alicate2.jpg"
// //     ],
// //     "nombre": "alicate",
// //     "precio": 12,
// //     "stock": 120,
// //     "destacado": true
// //   },
// //   "llave_inglesa": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Llave inglesa ajustable para apretar o aflojar tuercas de diferentes tamaños.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/llave_inglesa.jpg",
// //       "https://www.herramientas.com/images/llave_inglesa2.jpg"
// //     ],
// //     "nombre": "llave inglesa",
// //     "precio": 20,
// //     "stock": 90,
// //     "destacado": false
// //   },
// //   "cortadora": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Cortadora manual de alta precisión para cortar materiales duros como plástico y metal.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/cortadora.jpg",
// //       "https://www.herramientas.com/images/cortadora2.jpg"
// //     ],
// //     "nombre": "cortadora",
// //     "precio": 30,
// //     "stock": 75,
// //     "destacado": true
// //   },
// //   "pico": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Pico de acero forjado, utilizado para abrir terrenos duros o romper piedras.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/pico.jpg",
// //       "https://www.herramientas.com/images/pico2.jpg"
// //     ],
// //     "nombre": "pico",
// //     "precio": 35,
// //     "stock": 40,
// //     "destacado": false
// //   },
// //   "cepillo_madera": {
// //     "categoria": "herramientas",
// //     "categoria_principal": "/productos/herramientas",
// //     "descripcion": "Cepillo manual de alta calidad para trabajar la madera, dejándola suave y lista para ser barnizada.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.herramientas.com/images/cepillo_madera.jpg",
// //       "https://www.herramientas.com/images/cepillo_madera2.jpg"
// //     ],
// //     "nombre": "cepillo de madera",
// //     "precio": 18,
// //     "stock": 50,
// //     "destacado": true
// //   }

// /************************************************             Plantas                          *************************************/
// // "roja_gerbera": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Planta de interior, con flores rojas muy decorativas, fácil de cuidar.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/gerbera_roja.jpg",
// //       "https://www.plantas.com/images/gerbera_roja2.jpg"
// //     ],
// //     "nombre": "gerbera roja",
// //     "precio": 10,
// //     "stock": 50,
// //     "destacado": true
// //   },
// //   "rosa_blanca": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Rosa blanca para jardín o interior, con flores fragantes y hermosas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/rosa_blanca.jpg",
// //       "https://www.plantas.com/images/rosa_blanca2.jpg"
// //     ],
// //     "nombre": "rosa blanca",
// //     "precio": 15,
// //     "stock": 100,
// //     "destacado": false
// //   },
// //   "palo_de_agua": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Palo de agua, planta fácil de mantener que purifica el aire en interiores.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/palo_agua.jpg",
// //       "https://www.plantas.com/images/palo_agua2.jpg"
// //     ],
// //     "nombre": "palo de agua",
// //     "precio": 12,
// //     "stock": 75,
// //     "destacado": true
// //   },
// //   "aloe_vera": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Planta medicinal que es famosa por sus propiedades curativas para la piel.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/aloe_vera.jpg",
// //       "https://www.plantas.com/images/aloe_vera2.jpg"
// //     ],
// //     "nombre": "aloe vera",
// //     "precio": 8,
// //     "stock": 150,
// //     "destacado": false
// //   },
// //   "bambú": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Bambú ornamental ideal para interiores, fácil de cuidar y resistente.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/bambu.jpg",
// //       "https://www.plantas.com/images/bambu2.jpg"
// //     ],
// //     "nombre": "bambú",
// //     "precio": 20,
// //     "stock": 60,
// //     "destacado": true
// //   },
// //   "orquidea": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Orquídea exótica que florece durante todo el año, ideal para decoración de interiores.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/orquidea.jpg",
// //       "https://www.plantas.com/images/orquidea2.jpg"
// //     ],
// //     "nombre": "orquídea",
// //     "precio": 25,
// //     "stock": 40,
// //     "destacado": false
// //   },
// //   "lavanda": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Planta aromática que también tiene propiedades medicinales y es resistente al sol.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/lavanda.jpg",
// //       "https://www.plantas.com/images/lavanda2.jpg"
// //     ],
// //     "nombre": "lavanda",
// //     "precio": 18,
// //     "stock": 80,
// //     "destacado": true
// //   },
// //   "menta": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Planta aromática ideal para jardinería y para preparar infusiones.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/menta.jpg",
// //       "https://www.plantas.com/images/menta2.jpg"
// //     ],
// //     "nombre": "menta",
// //     "precio": 5,
// //     "stock": 200,
// //     "destacado": false
// //   },
// //   "cactus": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Cactus de interior resistente, fácil de cuidar y de bajo mantenimiento.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/cactus.jpg",
// //       "https://www.plantas.com/images/cactus2.jpg"
// //     ],
// //     "nombre": "cactus",
// //     "precio": 7,
// //     "stock": 90,
// //     "destacado": false
// //   },
// //   "ficus": {
// //     "categoria": "plantas",
// //     "categoria_principal": "/productos/plantas",
// //     "descripcion": "Ficus de interior de gran tamaño, ideal para oficinas o casas con espacios amplios.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.plantas.com/images/ficus.jpg",
// //       "https://www.plantas.com/images/ficus2.jpg"
// //     ],
// //     "nombre": "ficus",
// //     "precio": 30,
// //     "stock": 40,
// //     "destacado": true
// //   }


// /************************************************             Semillas                          *************************************/
// //  "semilla_tomate": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de tomate, ideales para cultivo en huertos domésticos, con frutos jugosos.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/tomate.jpg",
// //       "https://www.semillas.com/images/tomate2.jpg"
// //     ],
// //     "nombre": "semilla de tomate",
// //     "precio": 3,
// //     "stock": 200,
// //     "destacado": true
// //   },
// //   "semilla_pimiento": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de pimiento dulce, ideal para cultivos de huertos urbanos y jardines.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/pimiento.jpg",
// //       "https://www.semillas.com/images/pimiento2.jpg"
// //     ],
// //     "nombre": "semilla de pimiento",
// //     "precio": 4,
// //     "stock": 180,
// //     "destacado": false
// //   },
// //   "semilla_lechuga": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de lechuga de hojas crujientes, fáciles de cultivar y mantener.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/lechuga.jpg",
// //       "https://www.semillas.com/images/lechuga2.jpg"
// //     ],
// //     "nombre": "semilla de lechuga",
// //     "precio": 2.5,
// //     "stock": 220,
// //     "destacado": true
// //   },
// //   "semilla_cilantro": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de cilantro, perfecto para cultivos en huertos urbanos y macetas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/cilantro.jpg",
// //       "https://www.semillas.com/images/cilantro2.jpg"
// //     ],
// //     "nombre": "semilla de cilantro",
// //     "precio": 2,
// //     "stock": 150,
// //     "destacado": false
// //   },
// //   "semilla_espinaca": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de espinaca, de fácil cultivo, perfectas para huertos caseros.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/espinaca.jpg",
// //       "https://www.semillas.com/images/espinaca2.jpg"
// //     ],
// //     "nombre": "semilla de espinaca",
// //     "precio": 3.5,
// //     "stock": 160,
// //     "destacado": false
// //   },
// //   "semilla_calabaza": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de calabaza orgánicas para cultivar frutas grandes y saludables.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/calabaza.jpg",
// //       "https://www.semillas.com/images/calabaza2.jpg"
// //     ],
// //     "nombre": "semilla de calabaza",
// //     "precio": 5,
// //     "stock": 120,
// //     "destacado": true
// //   },
// //   "semilla_girasol": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de girasol, perfectas para jardines o para cultivo de aceites.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/girasol.jpg",
// //       "https://www.semillas.com/images/girasol2.jpg"
// //     ],
// //     "nombre": "semilla de girasol",
// //     "precio": 6,
// //     "stock": 90,
// //     "destacado": false
// //   },
// //   "semilla_fresa": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de fresa orgánicas para cultivo en macetas o huertos pequeños.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/fresa.jpg",
// //       "https://www.semillas.com/images/fresa2.jpg"
// //     ],
// //     "nombre": "semilla de fresa",
// //     "precio": 7,
// //     "stock": 110,
// //     "destacado": true
// //   },
// //   "semilla_albahaca": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de albahaca, perfectas para la cocina y el cultivo en casa.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/albahaca.jpg",
// //       "https://www.semillas.com/images/albahaca2.jpg"
// //     ],
// //     "nombre": "semilla de albahaca",
// //     "precio": 3,
// //     "stock": 140,
// //     "destacado": false
// //   },
// //   "semilla_perejil": {
// //     "categoria": "semillas",
// //     "categoria_principal": "/productos/semillas",
// //     "descripcion": "Semillas de perejil, fáciles de cultivar en cualquier jardín o huerto.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.semillas.com/images/perejil.jpg",
// //       "https://www.semillas.com/images/perejil2.jpg"
// //     ],
// //     "nombre": "semilla de perejil",
// //     "precio": 4,
// //     "stock": 180,
// //     "destacado": true
// //   }



// /************************************************             Decoracion                          *************************************/
// // "fuente": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Fuente de agua decorativa para jardines y patios, con luces LED integradas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fuentes-de-jardin/fuente-jardin-aluminio-23292790-56158645-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fuentes-de-jardin/fuente-jardin-aluminio-23292790-56158645-2.jpg"
// //     ],
// //     "nombre": "fuente",
// //     "precio": 120,
// //     "stock": 50,
// //     "destacado": true
// //   },
// //   "banco_de_jardin": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Banco de jardín de madera, ideal para colocar en el patio o en el jardín.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.ikea.com/es/es/images/products/banco-de-jardin-hemnes__0735879_pe740670_s5.jpg",
// //       "https://www.ikea.com/es/es/images/products/banco-de-jardin-hemnes__0735880_pe740671_s5.jpg"
// //     ],
// //     "nombre": "banco_de_jardin",
// //     "precio": 90,
// //     "stock": 30,
// //     "destacado": false
// //   },
// //   "escultura_de_jardin": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Escultura moderna de jardín en material resistente a la intemperie.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/decoracion-de-jardin/escultura-de-jardin/escultura-de-jardin-animal-24495188-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/decoracion-de-jardin/escultura-de-jardin/escultura-de-jardin-animal-24495188-2.jpg"
// //     ],
// //     "nombre": "escultura_de_jardin",
// //     "precio": 150,
// //     "stock": 20,
// //     "destacado": true
// //   },
// //   "lampara_solar": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Lámpara solar para jardín, carga durante el día y proporciona luz cálida durante la noche.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/iluminacion-de-jardin/lamparas-solares/lampara-solar-led-para-jardin-15523106-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/iluminacion-de-jardin/lamparas-solares/lampara-solar-led-para-jardin-15523106-2.jpg"
// //     ],
// //     "nombre": "lampara_solar",
// //     "precio": 35,
// //     "stock": 80,
// //     "destacado": false
// //   },
// //   "jardinera_de_madera": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Jardinera de madera para plantar flores o plantas pequeñas en exteriores.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/jardineras/jardinera-de-madera-de-pino-28429530-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/jardineras/jardinera-de-madera-de-pino-28429530-2.jpg"
// //     ],
// //     "nombre": "jardinera_de_madera",
// //     "precio": 45,
// //     "stock": 40,
// //     "destacado": false
// //   },
// //   "macetero_de_barro": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Macetero artesanal de barro, perfecto para plantas pequeñas o suculentas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.ikea.com/es/es/images/products/maceta-de-barro-terracota-axelsta__0904679_pe688170_s5.jpg",
// //       "https://www.ikea.com/es/es/images/products/maceta-de-barro-terracota-axelsta__0904680_pe688171_s5.jpg"
// //     ],
// //     "nombre": "macetero_de_barro",
// //     "precio": 25,
// //     "stock": 100,
// //     "destacado": false
// //   },
// //   "caminos_de_jardin": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Camino decorativo para jardines, ideal para crear senderos naturales.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/caminos-de-jardin/caminos-de-piedra-para-jardin-14442657-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/caminos-de-jardin/caminos-de-piedra-para-jardin-14442657-2.jpg"
// //     ],
// //     "nombre": "caminos_de_jardin",
// //     "precio": 50,
// //     "stock": 70,
// //     "destacado": false
// //   },
// //   "macetas_de_piedra": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Macetas de piedra naturales, perfectas para exteriores con un toque rústico.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-piedra-natural-28429553-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/macetas/maceta-de-piedra-natural-28429553-2.jpg"
// //     ],
// //     "nombre": "macetas_de_piedra",
// //     "precio": 60,
// //     "stock": 30,
// //     "destacado": true
// //   },
// //   "pared_de_flor_de_jardin": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Pared de flores decorativa para jardín, con plantas que trepan por la estructura.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/paredes-de-jardin/pared-jardin-de-flores-23292763-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/paredes-de-jardin/pared-jardin-de-flores-23292763-2.jpg"
// //     ],
// //     "nombre": "pared_de_flor_de_jardin",
// //     "precio": 130,
// //     "stock": 10,
// //     "destacado": false
// //   },
// //   "pergola_de_madera": {
// //     "categoria": "decoracion",
// //     "categoria_principal": "/productos/decoracion",
// //     "descripcion": "Pérgola de madera para jardines, perfecta para plantas trepadoras.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/pergolas/pergola-de-madera-14432468-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/pergolas/pergola-de-madera-14432468-2.jpg"
// //     ],
// //     "nombre": "pergola_de_madera",
// //     "precio": 250,
// //     "stock": 15,
// //     "destacado": true
// //   }


// /************************************************             fertilizantes                          *************************************/
// //  "fertilizante_organico": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante orgánico para enriquecer el suelo y promover el crecimiento saludable de las plantas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-organico-24497102-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-organico-24497102-2.jpg"
// //     ],
// //     "nombre": "fertilizante_organico",
// //     "precio": 15,
// //     "stock": 100,
// //     "destacado": true
// //   },
// //   "fertilizante_liquido": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante líquido ideal para una rápida absorción de nutrientes por las plantas.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.ikea.com/es/es/images/products/fertilizante-liquido-para-planta-axelsta__0936395_pe791526_s5.jpg",
// //       "https://www.ikea.com/es/es/images/products/fertilizante-liquido-para-planta-axelsta__0936396_pe791527_s5.jpg"
// //     ],
// //     "nombre": "fertilizante_liquido",
// //     "precio": 8,
// //     "stock": 200,
// //     "destacado": false
// //   },
// //   "fertilizante_mineral": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante mineral adecuado para todo tipo de suelos, ideal para cultivos en exterior.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-mineral-24498021-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-mineral-24498021-2.jpg"
// //     ],
// //     "nombre": "fertilizante_mineral",
// //     "precio": 12,
// //     "stock": 150,
// //     "destacado": true
// //   },
// //   "fertilizante_floracion": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante especialmente diseñado para promover la floración de plantas y flores.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-floracion-24499000-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-floracion-24499000-2.jpg"
// //     ],
// //     "nombre": "fertilizante_floracion",
// //     "precio": 18,
// //     "stock": 80,
// //     "destacado": false
// //   },
// //   "fertilizante_riego": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante en polvo para riego, ideal para mantener el crecimiento de las plantas durante todo el año.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-para-riego-24498232-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-para-riego-24498232-2.jpg"
// //     ],
// //     "nombre": "fertilizante_riego",
// //     "precio": 10,
// //     "stock": 120,
// //     "destacado": false
// //   },
// //   "fertilizante_para_hojas": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante para plantas de hojas, ideal para mantener su color verde y fomentar su crecimiento.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-hojas-verde-24497380-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-hojas-verde-24497380-2.jpg"
// //     ],
// //     "nombre": "fertilizante_para_hojas",
// //     "precio": 14,
// //     "stock": 90,
// //     "destacado": false
// //   },
// //   "fertilizante_vegetal": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante vegetal ecológico, ideal para la agricultura sostenible y ecológica.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-vegetal-24498312-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-vegetal-24498312-2.jpg"
// //     ],
// //     "nombre": "fertilizante_vegetal",
// //     "precio": 22,
// //     "stock": 50,
// //     "destacado": true
// //   },
// //   "fertilizante_foliar": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante foliar, para rociar directamente sobre las hojas para mejorar la nutrición de la planta.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-foliar-24498100-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-foliar-24498100-2.jpg"
// //     ],
// //     "nombre": "fertilizante_foliar",
// //     "precio": 16,
// //     "stock": 60,
// //     "destacado": false
// //   },
// //   "fertilizante_bio": {
// //     "categoria": "fertilizantes",
// //     "categoria_principal": "/productos/fertilizantes",
// //     "descripcion": "Fertilizante biológico completamente natural, sin productos químicos.",
// //     "disponible": true,
// //     "imagen": [
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-bio-24498250-1.jpg",
// //       "https://www.leroymerlin.es/productos/jardin-y-terraza/fertilizantes/fertilizante-bio-24498250-2.jpg"
// //     ],
// //     "nombre": "fertilizante_bio",
// //     "precio": 20,
// //     "stock": 40,
// //     "destacado": true
// //   }