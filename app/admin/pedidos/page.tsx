"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
  DocumentReference
} from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import AdminSidebar from "@/components/admin/adminSidebar";
import Header from "@/components/header-component";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

interface Order {
  id: string;
  estado: string;
  fechaPedido: string;
  metodoPago: string;
  productos: any[];
  total: number;
  uuid: string;
}

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [filterEstado, setFilterEstado] = useState<string>("all");
  const [filterPago, setFilterPago] = useState<string>("all");

  // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // delete dialog
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // formatea fecha, acepta strings o ISO
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleString();
  };

  // carga todas las órdenes
  async function fetchOrders() {
    setLoading(true);
    const snap = await getDocs(collection(db, "pedidos"));
    const data = snap.docs.map(d => {
      const raw = d.data() as any;

      // fechaPedido: Timestamp ➔ ISO
      const fecha = raw.fechaPedido instanceof Timestamp
        ? raw.fechaPedido.toDate().toISOString()
        : raw.fechaPedido;

      // productos: mapa ➔ array
      let items: any[] = [];
      if (Array.isArray(raw.productos)) {
        items = raw.productos;
      } else if (raw.productos && typeof raw.productos === "object") {
        items = Object.values(raw.productos);
      }

      // uuid: DocumentReference ➔ string
      let uuidStr: string;
      const uuidRef = raw.uuid;
      if (
        uuidRef &&
        typeof uuidRef === "object" &&
        "id" in uuidRef
      ) {
        // si es DocumentReference
        uuidStr = (uuidRef as DocumentReference).id;
      } else {
        uuidStr = String(uuidRef);
      }

      return {
        id: d.id,
        estado: raw.estado,
        fechaPedido: fecha,
        metodoPago: raw.metodoPago,
        productos: items,
        total: raw.total,
        uuid: uuidStr
      } as Order;
    });

    setOrders(data);
    setLoading(false);
  }

  // aplica filtros en memoria
  useEffect(() => {
    let f = orders;
    if (filterEstado !== "all") {
      f = f.filter(o => o.estado === filterEstado);
    }
    if (filterPago !== "all") {
      f = f.filter(o => o.metodoPago === filterPago);
    }
    setFilteredOrders(f);
  }, [orders, filterEstado, filterPago]);

  // reset página cuando cambian los resultados
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredOrders]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // abre diálogo de borrado
  function openDelete(id: string) {
    setDeletingId(id);
    setDeleteOpen(true);
  }

  // confirma y borra
  async function handleConfirmDelete() {
    if (!deletingId) return;
    await deleteDoc(doc(db, "pedidos", deletingId));
    setDeleteOpen(false);
    fetchOrders();
  }

  // items de la página actual
  const paginated = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // valores únicos para selects
  const estados = Array.from(new Set(orders.map(o => o.estado)));
  const pagos   = Array.from(new Set(orders.map(o => o.metodoPago)));

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        open={true}
        variant="permanent"
        collapsed={false}
        setCollapsed={() => {}}
        onClose={() => {}}
      />
      <div className="flex-1 ml-64 transition-all duration-300">
        <Header
          collapsed={false}
          isSidebarOpen={true}
          isMobileMenuOpen={false}
          setIsMobileMenuOpen={() => {}}
        />
        <div className="p-6 pt-28">
          {/* filtros */}
          <div className="flex space-x-4 mb-4">
            <div>
              <Label>Estado</Label>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-40">
                  {filterEstado === "all" ? "Todos" : filterEstado}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {estados.map(e => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Método Pago</Label>
              <Select value={filterPago} onValueChange={setFilterPago}>
                <SelectTrigger className="w-40">
                  {filterPago === "all" ? "Todos" : filterPago}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {pagos.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* tabla */}
          {loading ? (
            <p>Cargando pedidos...</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {[
                      "Estado",
                      "Fecha",
                      "Pago",
                      "Usuario",
                      "Total",
                      "#Items",
                      "Acciones"
                    ].map(h => (
                      <th key={h} className="p-2 border-b text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(o => (
                    <tr key={o.id} className="odd:bg-green-50 hover:bg-gray-100">
                      <td className="p-2">{o.estado}</td>
                      <td className="p-2">{formatDate(o.fechaPedido)}</td>
                      <td className="p-2">{o.metodoPago}</td>
                      <td className="p-2">{o.uuid}</td>
                      <td className="p-2">€{o.total.toFixed(2)}</td>
                      <td className="p-2">{o.productos.length}</td>
                      <td className="p-2 flex space-x-2">
                        <button
                          onClick={() => openDelete(o.id)}
                          className="p-1 hover:text-red-600"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* paginación */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline" size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(c => Math.max(c - 1, 1))}
                  >
                    Anterior
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`px-3 py-1 rounded ${
                        p === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <Button
                    variant="outline" size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(c => Math.min(c + 1, totalPages))}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* diálogo borrar */}
          <Dialog
            open={isDeleteOpen}
            onOpenChange={open => {
              if (!open) setDeletingId(null);
              setDeleteOpen(open);
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Eliminar pedido?</DialogTitle>
              </DialogHeader>
              <p className="py-2">Esto no se puede deshacer. ¿Seguro?</p>
              <DialogFooter className="space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  Borrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
