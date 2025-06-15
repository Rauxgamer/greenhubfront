"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  User,
  ShoppingBag,
  ChevronRight,
  X,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export interface CartItem {
  productId: string;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface HeaderProps {
  collapsed: boolean;
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  collapsed,
  isSidebarOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // referencia al doc único carrito
  const carritoDocRef = isAuthenticated && user
    ? doc(db, "users", user.uid, "carrito", "carrito")
    : null;

  // 1) Suscripción/lectura
  useEffect(() => {
    if (carritoDocRef) {
      const unsub = onSnapshot(carritoDocRef, async (snap) => {
        if (!snap.exists()) {
          setCartItems([]);
          setLoading(false);
          return;
        }
        const data = snap.data();
        const arr: any[] = Array.isArray(data.productos) ? data.productos : [];
        // por cada entrada, traigo detalles del producto
        const detalles = await Promise.all(
          arr.map(async entry => {
            const prodSnap = await getDoc(entry.productoId);
            const pd = prodSnap.data() as any;
            return {
              productId: entry.productoId.path,
              nombre: pd.nombre,
              imagen: Array.isArray(pd.imagen) ? pd.imagen[0] : pd.imagen,
              precio: pd.precio,
              cantidad: entry.cantidad,
              total: entry.cantidad * pd.precio,
            } as CartItem;
          })
        );
        setCartItems(detalles);
        setLoading(false);
      });
      return () => unsub();
    } else {
      // fallback a localStorage
      const ls = localStorage.getItem("cart");
      setCartItems(ls ? JSON.parse(ls) : []);
      setLoading(false);
    }
  }, [carritoDocRef]);

  // 2) Si no está autenticado, guardo en localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  // helpers para operar el carrito
  const cartTotal = cartItems.reduce((s, i) => s + i.total, 0);

  const updateQty = async (pid: string, delta: number) => {
    if (carritoDocRef) {
      // leo snapshot
      const snap = await getDoc(carritoDocRef);
      if (!snap.exists()) return;
      const { productos = [] } = snap.data() as any;
      const idx = productos.findIndex((e: any) => e.productoId.path === pid);
      if (idx < 0) return;
      const prev = productos[idx];
      const nuevaQty = Math.max(0, prev.cantidad + delta);
      // nuevo array
      const next = [...productos];
      next.splice(idx, 1);
      if (nuevaQty > 0) {
        next.splice(idx, 0, { productoId: prev.productoId, cantidad: nuevaQty });
      }
      // recalculo total
      const totalNuevo = cartItems
        .map(i => i.productId === pid
          ? (i.cantidad + delta) * i.precio
          : i.total
        )
        .reduce((s, x) => s + x, 0);

      await setDoc(carritoDocRef, {
        productos: next,
        total: totalNuevo,
        updatedAt: Timestamp.now(),
      }, { merge: true });
    } else {
      // local
      const updated = cartItems
        .map(i =>
          i.productId === pid
            ? { ...i, cantidad: Math.max(0, i.cantidad + delta), total: Math.max(0, i.cantidad + delta) * i.precio }
            : i
        )
        .filter(i => i.cantidad > 0);
      setCartItems(updated);
    }
  };

  const removeItem = async (pid: string) => {
    if (carritoDocRef) {
      const snap = await getDoc(carritoDocRef);
      if (!snap.exists()) return;
      const { productos = [] } = snap.data() as any;
      const next = productos.filter((e: any) => e.productoId.path !== pid);
      const totalNuevo = cartItems.filter(i => i.productId !== pid).reduce((s, i) => s + i.total, 0);
      await setDoc(carritoDocRef, {
        productos: next,
        total: totalNuevo,
        updatedAt: Timestamp.now(),
      }, { merge: true });
    } else {
      setCartItems(cartItems.filter(i => i.productId !== pid));
    }
  };

  const headerLeft = isSidebarOpen
    ? collapsed
      ? "left-20"
      : "left-64"
    : "left-0";

  return (
    <header className={`fixed top-0 ${headerLeft} right-0 z-50 transition-all duration-300`}>
      {/* Promo bar */}
      <div className="bg-green-600 text-white text-xs text-center py-2">
        <a href="#" className="hover:underline">
          Oferta Especial: ¡20% en Orquídeas esta Semana!{" "}
          <ChevronRight className="inline h-3 w-3" />
        </a>
      </div>

      {/* Main nav */}
      <div className="h-16 bg-white/90 backdrop-blur-md shadow-lg">
        <nav className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-gray-800">
          {/* Left */}
          <div className="flex items-center space-x-4">
            <button
              aria-label="Toggle menu"
              className="md:hidden hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/home" className="text-2xl font-bold tracking-tight">
              Green<span className="text-green-600">Hub</span>
            </Link>
            <div className="hidden md:flex items-center rounded-md px-3 py-1.5 bg-gray-100">
              <Search className="h-4 w-4 mr-2 text-gray-500" />
              <input
                type="search"
                placeholder="Buscar flores, plantas..."
                className="bg-transparent text-sm focus:outline-none w-64 text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/products" className="hover:text-green-600">Productos</Link>
            <Link href="/blog" className="hover:text-green-600">Blog</Link>
            <button
              className="relative hover:text-green-600"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingBag className="h-5 w-5" />
              {!loading && cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button className="relative hover:text-green-600">
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile icons */}
          <div className="md:hidden flex items-center space-x-3">
            <Search className="h-5 w-5 text-gray-600" />
            <User className="h-5 w-5 text-gray-600" />
            <button onClick={() => setCartOpen(!cartOpen)} className="relative">
              <ShoppingBag className="h-5 w-5 text-gray-600" />
              {!loading && cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden fixed inset-0 top-[calc(1.75rem+4rem)] z-40 bg-white/95 text-gray-800 p-6 space-y-4 backdrop-blur-md shadow-xl ${collapsed ? "ml-20" : "ml-64"}`}>
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
              <Search className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="search"
                placeholder="Buscar..."
                className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
              />
            </div>
            {["Productos","Blog","Mi Cuenta","Favoritos"].map(item => (
              <Link
                key={item}
                href={ item==="Productos"?"/products": item==="Blog"?"/blog":"/" }
                className="block py-2 hover:text-green-600 transition-colors text-lg"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Cart panel */}
      {cartOpen && (
        <div className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-96 sm:max-w-sm flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">Tu Carrito</h2>
            <button onClick={() => setCartOpen(false)} className="p-2 rounded-full bg-green-50 hover:bg-green-100">
              <X className="h-5 w-5 text-green-600" />
            </button>
          </div>

          {/* Items */}
          <div className="p-4 flex-1 overflow-auto space-y-3">
            {loading ? (
              <p>Cargando…</p>
            ) : cartItems.length === 0 ? (
              <p className="text-gray-500">Sin productos para tu jardín</p>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.productId}
                  className="flex items-center border border-gray-200 rounded-lg p-3 hover:shadow-md transition-transform duration-150 transform hover:-translate-y-0.5"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="h-12 w-12 rounded mr-3 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.nombre}</p>
                    <p className="text-xs text-gray-500">€{item.precio.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1 mr-2">
                    <button onClick={() => updateQty(item.productId, -1)}>
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => updateQty(item.productId, +1)}>
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.productId)}>
                    <X className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-green-50">
            <div className="flex justify-between mb-4 text-gray-800">
              <span>Total:</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push("/checkout")}
            >
              Comprar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
