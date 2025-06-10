"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, ShoppingBag, Menu, Heart, User, ChevronRight, ChevronDown, SlidersHorizontal } from "lucide-react"
import Footer from "@/components/footer-component"
import PlantProductCard from "@/components/public/plant-product-card"
import Image from "next/image"
import Link from "next/link"
 // Importa la configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig"

// Re-declare or import Header structure if needed for this page specifically
// For simplicity, assuming the existing header from app/page.tsx is globally available via layout.
// If not, the header component needs to be explicitly imported and used here.
interface Product {
  nombre: string;
  descripcion: string;
  imagen: string[];  // Asumí que "imagen" es un array de strings
  precio: number;
  originalPrice?: number;  // Es opcional si existe
  destacado: boolean;
  categoria_principal: string;
}

export default function PlantasPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  const [plantProducts, setPlantProducts] = useState<Product[]>([]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Obtener productos de Firebase
  useEffect(() => {
    const fetchData = async () => {
      const collections = ["arboles", "macetas", "plantas", "semillas", "decoracion", "fertilizantes", "herramientas"];
      let allProducts: Product[]= [];

      // Hacer una consulta para cada colección principal
      for (const collectionName of collections) {
        // Acceder primero a la colección principal "productos", luego a la subcolección
        const querySnapshot = await getDocs(collection(db, "productos", collectionName, "tipos"));
        querySnapshot.forEach((doc) => {
          
          console.log(`Documento obtenido de ${collectionName}:`, doc.id, doc.data());
          const data = doc.data();
          const product: Product = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen || [], // Asegúrate de que "imagen" es un array
            precio: data.precio,
            originalPrice: data.originalPrice,
            destacado: data.destacado,
            categoria_principal: data.categoria_principal,
          };
          allProducts.push(product);  // Agregar los datos de cada documento
        });
      }
      setPlantProducts(allProducts); // Establecer los productos obtenidos
    };
    console.log(plantProducts)
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Estado de plantProducts actualizado:", plantProducts);
  }, [plantProducts]);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Existing Header (assuming it's in layout or imported) */}
      {/* This is a placeholder for where the existing header would be rendered */}
      {/* You would typically have a <Header /> component here if not in a layout */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
        <div
          className={`bg-green-600 text-white text-xs text-center py-2 transition-opacity duration-300 ${headerScrolled ? "opacity-100" : "opacity-100"}`}
        >
          <a href="#" className="hover:underline">
            Oferta Plantas: ¡15% en todas las Macetas! <ChevronRight className="inline h-3 w-3" />
          </a>
        </div>
        <div className="h-16 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-lg">
          <nav className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-gray-800">
            <div className="flex items-center space-x-4">
              <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="md:hidden hover:text-green-600">
                <Menu className="h-6 w-6" />
              </button>
              <a href="/" className="text-2xl font-bold tracking-tight">
                Green<span className="text-green-600">Hub</span>
              </a>
              <div className="hidden md:flex items-center rounded-md px-3 py-1.5 bg-gray-100">
                <Search className="h-4 w-4 mr-2 text-gray-500" />
                <input
                  type="search"
                  placeholder="Buscar flores, plantas..."
                  className="bg-transparent text-sm focus:outline-none w-64 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {["Productos", "Plantas", "Flores", "Blog"].map((item) => (
                <Link
                key={item}
                href={
                  item === "Productos" ? "/products" :  
                  item === "Plantas" ? "/products?categoria=plantas" :
                  item === "Flores" ? "/products?categoria=flores" :
                  item === "Blog" ? "/blog" : "/home"
                }
                className={`transition-colors ${item === "Productos" ? "text-green-600 font-semibold hover:text-green-700" : "text-gray-700 hover:text-green-600"}`}
              >
                {item}
              </Link>
              ))}
               
              {[User, Heart, ShoppingBag].map((Icon, idx) => (
                <button key={idx} aria-label="User action" className={`hover:text-green-600 transition-colors`}>
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
            <div className="md:hidden flex items-center space-x-3">
              {[Search, User, ShoppingBag].map((Icon, idx) => (
                <button key={idx} aria-label="User action" className={`hover:text-green-600 transition-colors`}>
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(1.75rem+4rem)] z-40 bg-white/95 text-gray-800 p-6 space-y-4 backdrop-blur-md shadow-xl">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
            <Search className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Buscar flores..."
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          {["Productos", "Plantas", "Flores", "Blog", "Mi Cuenta", "Favoritos"].map((item) => (
            <Link
              key={item}
              href={
                item === "Productos" ? "/products" :  
                item === "Plantas" ? "/products?categoria=plantas" :
                item === "Flores" ? "/products?categoria=flores" :
                item === "Blog" ? "/blog" : "/home"
              }
              className="block py-2 hover:text-green-600 transition-colors text-lg"
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="pt-[calc(1.75rem+4rem)]">
        {" "}
        {/* Adjust top padding to account for fixed header + banner */}
        {/* Hero Section */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src="/plant-hero-background.png"
            alt="Fondo de plantas exuberantes"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 p-4">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              Tu Oasis Verde Comienza Aquí
            </h1>
            <p
              className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              Descubre nuestra selección de productos para dar vida a cada rincón.
            </p>
          </div>
        </section>
        {/* Product Listing Area */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter and Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 hover:bg-gray-50 mb-4 sm:mb-0 w-full sm:w-auto"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtrar
                <ChevronRight className="h-4 w-4 ml-1 text-gray-400" />
              </Button>
              <div className="flex items-center">
                <label htmlFor="sort-by" className="text-sm text-gray-600 mr-2">
                  Ordenar por:
                </label>
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 pr-2">
                  Destacados
                  <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {plantProducts.map((product) => (
                <PlantProductCard
                  key={product.nombre}
                  imageUrl={product.imagen[0] || product.imagen[1] || null}  // Tomar la primera imagen del array
                  name={product.nombre}
                  description={product.descripcion}
                  price={product.precio}
                  originalPrice={product.originalPrice} // Si existe el precio original
                  isNew={product.destacado}
                  href={product.categoria_principal}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
