import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="es">
        <body>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
