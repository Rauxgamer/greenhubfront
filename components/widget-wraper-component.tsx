// components/WidgetManagerWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import WidgetManager from "./ia-component";

export default function WidgetManagerWrapper() {
  const pathname = usePathname();
  // Al cambiar `key`, React desmonta y vuelve a montar WidgetManager
  return <WidgetManager key={pathname} />;
}
