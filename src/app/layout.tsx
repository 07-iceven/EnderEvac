import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ender Evac',
  description: 'Minecraft server automated shutdown and open-source tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* 引入 MiSans 字体资源 */}
        <link href="https://font.sec.miui.com/font/css?family=MiSans:400,500,600,700:Chinese_Simplify" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">{children}</body>
    </html>
  );
}