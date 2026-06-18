import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  image: string
  caption?: string
  alt?: string
}

interface GalleryProps {
  sectionTitle: string
  sectionSubtitle?: string
  images: GalleryImage[]
}

export default function Gallery({ sectionTitle, sectionSubtitle, images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md"
              onClick={() => setSelected(index)}
            >
              <img
                src={item.image}
                alt={item.alt || item.caption || `Gallery image ${index + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/600x400/9ca3af/ffffff?text=Gallery+${index + 1}`
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                {item.caption && (
                  <p className="text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium">
                    {item.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl"
              aria-label="Close"
            >
              &times;
            </button>
            <motion.img
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={images[selected].image}
              alt={images[selected].alt || images[selected].caption || ''}
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/3b82f6/ffffff?text=Gallery+${selected + 1}`
              }}
            />
            {images[selected].caption && (
              <p className="absolute bottom-4 text-white text-center text-lg font-medium">
                {images[selected].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
