import React from 'react';
import Slider from "react-slick";

 const HeroSlider = () => {

    var settings = {
        dots: true,
        infinite: true,
        fade: true,
        autoplay: true,
        speed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section className="py-[6rem]">
            <div className={"container mx-auto"}>
                <Slider {...settings}>
                    <div>
                        <div className="grid grid-cols-12 gap-[3.123rem]">
                            <div className="col-span-6">
                                <div className="flex items-center justify-center h-full">
                                    <h1 className="font-bold text-[4rem] px-5">This is Official picsart</h1>
                                </div>
                            </div>
                            <div className="col-span-6 p-[4rem]">
                                <img src="/img/imgSlider 1.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-12 gap-[3.123rem]">
                            <div className="col-span-6">
                                <div className="flex items-center justify-center h-full">
                                    <h1 className="font-bold text-[3rem] px-[3rem]">Illustration of office workers sitting at desks</h1>
                                </div>
                            </div>
                            <div className="col-span-6 p-[4rem]">
                                <img src="/img/imgSlider%202.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-12 gap-[3.123rem]">
                            <div className="col-span-6">
                                <div className="flex items-center justify-center h-full">
                                    <h1 className="font-bold text-[4rem] px-[3rem]"> Business colleagues illustration</h1>
                                </div>
                            </div>
                            <div className="col-span-6 p-[4rem]">
                                <img src="/img/imgSlider%203.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
)

};

export default HeroSlider;

