import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

import homeData from '../content/home.json'
import servicesData from '../content/services.json'
import galleryData from '../content/gallery.json'
import contactData from '../content/contact.json'

export default function Home() {
  return (
    <>
      <Hero
        heroTitle={homeData.heroTitle}
        heroSubtitle={homeData.heroSubtitle}
        heroImage={homeData.heroImage}
        ctaText={homeData.ctaText}
        ctaLink={homeData.ctaLink}
      />
      <About
        title={homeData.about.title}
        description={homeData.about.description}
        image={homeData.about.image}
      />
      <Services
        sectionTitle={servicesData.sectionTitle}
        sectionSubtitle={servicesData.sectionSubtitle}
        services={servicesData.services}
      />
      <Gallery
        sectionTitle={galleryData.sectionTitle}
        sectionSubtitle={galleryData.sectionSubtitle}
        images={galleryData.images}
      />
      <Testimonials
        title={homeData.testimonials.title}
        items={homeData.testimonials.items}
      />
      <Contact
        sectionTitle={contactData.sectionTitle}
        sectionSubtitle={contactData.sectionSubtitle}
        company={contactData.company}
        social={contactData.social}
      />
    </>
  )
}
