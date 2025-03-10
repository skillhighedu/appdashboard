import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const reviews = [
  { id: 1, name: "John Doe", text: "Absolutely amazing service!" },
  { id: 2, name: "Jane Smith", text: "The best experience ever!" },
  { id: 3, name: "David Brown", text: "Loved the quality and support!" },
  { id: 4, name: "Emily Johnson", text: "Smooth and efficient!" },
  { id: 5, name: "Michael Lee", text: "Highly recommend to everyone!" },
];

export default function Testimonials() {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          What Our Clients Say
        </h2>
      </div>

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        effect="fade"
        className="max-w-xl mx-auto"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                "{review.text}"
              </p>
              <h4 className="mt-4 text-primary font-semibold">{review.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
