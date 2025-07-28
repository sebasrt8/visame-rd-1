export const metadata = {
    title: 'VisameRD',
    description: 'Asistencia para tu visa',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="es">
        <body>{children}</body>
      </html>
    );
  }
  