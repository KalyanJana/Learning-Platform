import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}