"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, Heart, User, ChevronRight, ChevronDown } from "lucide-react";
import Footer from "@/components/footer-component";
import PlantProductCard from "@/components/public/plant-product-card";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Slider } from "@radix-ui/react-slider"; // Slider component for price range
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/header-component";
import AdminSidebar from "@/components/admin/adminSidebar";

interface Product {
  nombre: string;
  descripcion: string;
  imagen: string[];
  precio: number;
  originalPrice?: number;
  destacado: boolean;
  categoria_principal: string;
  stock: number;
}

export default function PlantasPage() {
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [plantProducts, setPlantProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoria, setCategoria] = useState<string | undefined>(undefined); // Category filter
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | undefined>(undefined); // Stock filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Price range (min, max)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const collections = ["arboles", "macetas", "plantas", "semillas", "decoracion", "fertilizantes", "herramientas"];
      let allProducts: Product[] = [];

      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(db, "productos", collectionName, "tipos"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const product: Product = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen || [],
            precio: data.precio,
            originalPrice: data.originalPrice,
            destacado: data.destacado,
            categoria_principal: data.categoria_principal,
            stock: data.stock || 0,
          };
          allProducts.push(product);
        });
      }
      setPlantProducts(allProducts);
    };
    fetchData();
  }, []);

  // Handle the category filter and product display
  // useEffect(() => {
  //   const categoryParam = searchParams?.get("category");
  //   if (categoryParam) {
  //     setCategoria(categoryParam);  // Set the category from the URL if available
  //   }
  // }, [searchParams]);

  // Filter products based on selected filters (category, stock, price range)
  useEffect(() => {
    let filtered = plantProducts;

    // Filter by category if a category is selected
    if (categoria) {
      filtered = filtered.filter((product) => {
        const catg = product.categoria_principal;
        if (typeof catg === 'string' && catg.split("/").length > 2) {
          return catg.split("/")[2] === categoria.toLowerCase();
        }
        return false;
      });
    }
    // Filter by stock availability (greater than 0 for available, 0 for out of stock)
    if (availabilityFilter !== undefined) {
      filtered = filtered.filter((product) => {
        return availabilityFilter ? product.stock > 0 : product.stock === 0;
      });
    }

    // Filter by price range (min and max price)
    filtered = filtered.filter(
      (product) => product.precio >= priceRange[0] && product.precio <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [categoria, plantProducts, availabilityFilter, priceRange]);

  const filtrarCategoria= (categoria:string )=>{
    if (typeof categoria === 'string' && categoria.split("/").length > 2) {
      return categoria.split("/")[2];
    }
    return false;
}
  // Handle filter changes
  const handleFilterChange = (category: string) => {
    setCategoria(category); // Update the selected category
  };

  const handleAvailabilityChange = (available: boolean) => {
    setAvailabilityFilter(available); // Update the availability filter (in-stock or out-of-stock)
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]); // Update the price range
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const { isAuthenticated, isAdmin } = useAuth(); // Accede al contexto de autenticación
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
  
     const contentClass = !isSidebarOpen
      ? "w-full" // Full width if sidebar is not present
      : collapsed
      ? "ml-20" // Sidebar collapsed (small width)
      : "ml-64";

       useEffect(() => {
        if(isAuthenticated && isAdmin){
          setIsSidebarOpen(true)
        }
      }, [isAuthenticated, isAdmin]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Sidebar */}
              <AdminSidebar
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="permanent"
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
       <div className={`flex-1 ${contentClass} transition-all duration-300`}>
        <Header
        collapsed={collapsed}
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen} // Pasa la función para cambiar el estado
      />
      <main className="pt-[calc(1.75rem+4rem)]">
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image src="/plant-hero-background.png" alt="Fondo de plantas exuberantes" fill className="object-cover z-0" priority />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 p-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              Tu Oasis Verde Comienza Aquí
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
              Descubre nuestra selección de productos para dar vida a cada rincón.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-12">
              <div className="flex flex-col space-y-4">
                <Label htmlFor="filter" className="text-sm text-gray-600">Filtrar por categoría:</Label>
                <Select value={categoria || ""} onValueChange={handleFilterChange} className="border border-gray-300 rounded-md py-2 px-4 w-full">
                  <SelectTrigger id="filter">
                    <span>{categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : 'Selecciona una categoría'}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placeholder" disabled>Selecciona una categoría</SelectItem>
                    {["herramientas", "arboles", "decoracion", "fertilizantes", "macetas", "plantas", "semillas"].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-4">
                <Label htmlFor="availability" className="text-sm text-gray-600">Disponibilidad:</Label>
                <Select value={availabilityFilter ? 'con-stock' : availabilityFilter === false ? 'sin-stock' : ''} onValueChange={(value) => handleAvailabilityChange(value === 'con-stock')} className="border border-gray-300 rounded-md py-2 px-4 w-full">
                  <SelectTrigger id="availability">
                    <span>{availabilityFilter === undefined ? 'Selecciona disponibilidad' : availabilityFilter ? 'Con stock' : 'Sin stock'}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="con-stock">Con stock</SelectItem>
                    <SelectItem value="sin-stock">Sin stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <Label htmlFor="price-range" className="text-sm text-gray-600 mb-2">Rango de precios</Label>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={500}
                step={10}
                className="w-full"
              >
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </Slider>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center text-lg text-gray-300 ">
                ¡Ups! Hemos quemado nuestras plantas, busca unas nuevas.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <PlantProductCard
                    key={product.nombre}
                    imageUrl={product.imagen[0] || product.imagen[1] || null}  // Tomar la primera imagen del array
                    name={product.nombre}
                    description={product.descripcion}
                    price={product.precio}
                    originalPrice={product.originalPrice} // Si existe el precio original
                    isNew={product.destacado}
                    href={`/products/info?categoria=${filtrarCategoria(product.categoria_principal)}&producto=${product.nombre}`} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </div>
  );
}














