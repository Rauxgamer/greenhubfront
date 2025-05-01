export interface Product {
    id: string;
    tipo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    destacado: boolean;
  }
  
  export const getPlants = async (): Promise<Product[]> => {
    const res = await fetch('/data/plants.json');
    if (!res.ok) throw new Error('No se pudo cargar los productos');
    return res.json();
  };
  
  export const getFeaturedPlants = async (): Promise<Product[]> => {
    const plants = await getPlants();
    return plants.filter((plant) => plant.destacado);
  };
  