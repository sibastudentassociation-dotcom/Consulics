import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import FloatingButton from '../components/FloatingButton';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Chatbot />
      <FloatingButton />
    </>
  );
}
