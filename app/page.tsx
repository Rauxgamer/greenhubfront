// app/page.tsx
import { redirect } from 'next/navigation';

export default function HomeRedirect() {
  redirect('/home');  // o '/home' o la ruta que prefieras
}
