import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useSiteConfig } from '../hooks/useSiteConfig';

export default function Home() {
  const { config } = useSiteConfig();

  return (
    <>
      <Navbar />
      <Hero siteConfig={config} />
      <Portfolio />
      <About siteConfig={config} />
      <Contact siteConfig={config} />
      <Footer siteConfig={config} />
    </>
  );
}
