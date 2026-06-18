import { motion } from 'framer-motion'

interface AboutProps {
  title: string
  description: string
  image: string
}

export default function About({ title, description, image }: AboutProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <div className="text-gray-600 text-lg leading-relaxed space-y-4">
              {description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">10+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">200+</div>
                <div className="text-sm text-gray-500">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt="About us"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x600/3b82f6/ffffff?text=About+Us`
                }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-4xl font-bold">2024</div>
              <div className="text-sm opacity-90">Founded</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
