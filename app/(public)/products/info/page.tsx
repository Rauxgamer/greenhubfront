"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Heart,
  ShoppingCart,
  ChevronRight,
  Truck,
  Package,
  Scan,
  Plus,
  Minus,
  Search,
  Menu,
  User,
  ShoppingBagIcon,
} from "lucide-react"
import Footer from "@/components/footer-component"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/services/firebaseConfig"; // Firebase configuration
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { useAuth } from "@/context/AuthContext"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoria = searchParams.get("categoria");
  const producto = searchParams.get("producto");

  const [productData, setProductData] = useState<any>(null);
  const [quantity, setQuantity] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)


  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);


  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  useEffect(() => {
    const fetchProduct = async () => {
      if (categoria && producto) {
        console.log("Fetching product", categoria, producto); // Verifica si estos valores son correctos
        const productRef = doc(db, "productos", categoria, "tipos", producto);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
          setProductData(docSnap.data());
        } else {
          console.log("No such document!");
        }
        
      }
    };

    fetchProduct();
  }, [categoria, producto]);

  useEffect(() => {
    if (productData) {
      console.log("Product data fetched", productData); // Aquí ya verás el valor actualizado
    }
  }, [productData]);

  useEffect(() => {
    const fetchCart = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const cartRef = collection(userRef, "carrito");
        const cartSnap = await getDocs(cartRef);
        const cartItemsList = cartSnap.docs.map((doc) => doc.data());
        setCartItems(cartItemsList);
      }
    };

    fetchCart();
  }, []);


  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // const handleAddToCart = async () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
    
  //   if (!user) {
  //     // If the user is not logged in, redirect to login
  //     router.push("/login");
  //     return;
  //   }

  //   // If logged in, add product to the cart
  //   const userRef = doc(db, "users", user.uid);
  //   const cartRef = doc(userRef, "carrito", producto); // Unique document for each product in the cart

  //   try {
  //     await setDoc(cartRef, {
  //       cantidad: quantity,
  //       productoId: doc(db, "productos", categoria, "tipos", producto),
  //       updatedAt: new Date(),
  //       nombre: productData.nombre,
  //       precio: productData.precio,
  //       imagen: productData.imagen[0], // You can add more details here as needed
  //     });

  //     alert("Producto añadido al carrito");
  //   } catch (error) {
  //     console.error("Error al añadir al carrito: ", error);
  //   }
  // }

  // if (!productData) {
  //   // ... (product not found rendering - keeping it concise for this update)
  //   return (
  //     <div className="min-h-screen flex flex-col">
  //       <main className="flex-grow flex items-center justify-center text-center px-4">
  //         <div>
  //           <h1 className="text-2xl font-semibold mb-4">Producto no encontrado</h1>
  //           <Link href="/products">
  //             <Button>Volver a productos</Button>
  //           </Link>
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   )
  // }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[calc(1.75rem+4rem+2rem)] sm:pt-[calc(1.75rem+4rem+3rem)]">
        {/* Breadcrumbs */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-8 flex items-center space-x-1.5">
          <Link href="/products" className="hover:text-green-600">
            Productos
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-green-600">
            {productData.categoria}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-700">{productData.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: Image Gallery (7/12 width on lg screens) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1 relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={productData.imagen[0] || "/placeholder.svg"}
                  alt={productData.imagen[0]}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="col-span-2 sm:col-span-1 relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={productData.imagen[1] || "/placeholder.svg"}
                  alt={productData.imagen[1]}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Product Info (5/12 width on lg screens) */}
          <div className="lg:col-span-5 py-2">
            <div className="flex justify-between items-start mb-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{productData.nombre}</h1>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-pink-500 -mt-1 -mr-2">
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            <p className="text-gray-600 mb-4 text-base">{productData.descripcion}</p>

            <p className="text-3xl font-semibold text-gray-800 mb-1">
              {productData.precio} €
            </p>
            {productData.originalPrice && (
              <p className="text-sm text-gray-400 line-through mb-4">
                Precio original: {productData.precio} €
              </p>
            )}
            <p className="text-xs text-gray-500 mb-6">
              IVA incluido.{" "}
              <Link href="#" className="underline hover:text-green-600">
                Gastos de envío
              </Link>{" "}
              no incluidos.
            </p>

            <div className="border rounded-md p-3 mb-6 flex items-center justify-between text-sm hover:border-gray-400 transition">
              <span>{productData.descripcion}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            <p className="text-sm text-gray-700 mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2 text-green-600" />
              Compra ahora y recíbelo <span className="font-semibold mx-1">entre el 17/06 y el 19/06</span>
            </p>

            <div className="flex items-center space-x-3 mb-6">
              <p className="text-sm text-gray-700 font-medium">Cantidad:</p>
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  className="h-10 w-10 text-gray-600 hover:bg-gray-100 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-12 h-10 text-center border-y-0 border-x-0 focus:outline-none focus:ring-0 font-medium"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="h-10 w-10 text-gray-600 hover:bg-gray-100 rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 text-base font-semibold mb-6 rounded-md"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Añadir al Carrito
            </Button>

            <p className="text-sm text-green-600 mb-6 font-medium">
              <Package className="inline h-4 w-4 mr-1.5" />
              {productData.disponible}
            </p>

            <Accordion type="single" collapsible className="w-full space-y-1">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="text-base font-medium hover:no-underline py-3.5 flex justify-between items-center w-full text-gray-700 hover:text-gray-900">
                  <span>Detalles del Producto</span>
                  <Plus className="h-5 w-5 text-gray-400 group-data-[state=open]:hidden" />
                  <Minus className="h-5 w-5 text-gray-400 group-data-[state=closed]:hidden" />
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pt-2 pb-4 pl-1 pr-1">
                  <div dangerouslySetInnerHTML={{ __html: productData.descripcion }} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="text-base font-medium hover:no-underline py-3.5 flex justify-between items-center w-full text-gray-700 hover:text-gray-900">
                  <span>Envío y Devoluciones</span>
                  <Plus className="h-5 w-5 text-gray-400 group-data-[state=open]:hidden" />
                  <Minus className="h-5 w-5 text-gray-400 group-data-[state=closed]:hidden" />
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pt-2 pb-4 pl-1 pr-1">
                  <div dangerouslySetInnerHTML={{__html:"Sujeto a los termino y condiciones de nuestra página web"}} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
