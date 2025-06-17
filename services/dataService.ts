// services/dataService.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface OrderStatusCount {
  status: string;
  quantity: number;
}

/**
 * Recupera todos los documentos de la colección "pedidos"
 * y devuelve un array con el conteo de pedidos por estado (campo "estado").
 */
export async function fetchOrdersData(): Promise<OrderStatusCount[]> {
  const snap = await getDocs(collection(db, 'pedidos'));

  // Agrupamos por estado
  const counts: Record<string, number> = {};
  snap.docs.forEach(doc => {
    const data = doc.data();
    // Aquí leemos `data.estado` (no data.status)
    const estado = (data.estado as string) || 'desconocido';
    counts[estado] = (counts[estado] || 0) + 1;
  });

  // Devolvemos un array que Recharts entienda (status == estado)
  return Object.entries(counts).map(([status, quantity]) => ({
    status,
    quantity
  }));
}

export interface ProductStats {
  name: string;
  sold: number;
}

export async function fetchStatsData(): Promise<ProductStats[]> {
  const snap = await getDocs(collection(db, "pedidos"));
  const counts: Record<string, number> = {};

  snap.docs.forEach(doc => {
    const data = doc.data();
    const productosField = data.productos;

    // Si está guardado como array de items
    if (Array.isArray(productosField)) {
      productosField.forEach((item: any) => {
        const ref = item.productoId as { path: string };
        const path = ref.path;
        const qty  = (item.cantidad as number) || 0;
        counts[path] = (counts[path] || 0) + qty;
      });

    // Si está guardado como objeto/map de claves dinámicas
    } else if (productosField && typeof productosField === "object") {
      Object.values(productosField).forEach((item: any) => {
        const ref = item.productoId as { path: string };
        const path = ref.path;
        const qty  = (item.cantidad as number) || 0;
        counts[path] = (counts[path] || 0) + qty;
      });
    }
  });

  // Convertimos a array y extraemos el nombre final de la ruta
  const arr: ProductStats[] = Object.entries(counts).map(([path, sold]) => {
    const segments = path.split("/");
    const name = segments[segments.length - 1] || path;
    return { name, sold };
  });

  // Top 10 más vendidos
  return arr
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);
}


  