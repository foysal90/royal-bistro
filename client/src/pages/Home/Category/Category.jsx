import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
const Category = () => {
    return (
       <section>
        <SectionTitle subHeading={"From 11.00am to 10.00pm"} heading={'Order Online'}>
            
        </SectionTitle>
        <Swiper
  slidesPerView={4}
  spaceBetween={30}
  centeredSlides={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination, Autoplay]}
  className="mySwiper my-5"
>
<SwiperSlide >
<img className='relative' src={slide1} alt="" />
<h1 className='text-3xl text-center uppercase bottom-2 left-24 absolute text-white '>salads</h1>
</SwiperSlide>
<SwiperSlide>
<img src={slide2} alt="" />
<h1 className='text-3xl text-center uppercase bottom-2 left-24 absolute text-white'>pizzas</h1>
</SwiperSlide>
<SwiperSlide>
<img src={slide3} alt="" />
<h1 className='text-3xl text-center uppercase bottom-2 left-24 absolute text-white'>soups</h1>
</SwiperSlide>
<SwiperSlide>
<img src={slide4} alt="" />
<h1 className='text-3xl text-center uppercase  bottom-2 left-24 absolute text-white'>desserts</h1>
</SwiperSlide>
<SwiperSlide>
<img src={slide5} alt="" />
<h1 className='text-3xl text-center uppercase bottom-2 left-24 absolute text-white'>salads</h1>
</SwiperSlide>
</Swiper>
       </section>
    );
};

export default Category;
