import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/style.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const tourOptions = {
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true, // 현재 index 이미지 중앙배치
    centerPadding: '0', // 안하면 왼쪽에 이전 이미지 테두리보임
    dots: true,
    Infinity: true, //반복
    pauseOnHover : true, // hover시 autoplay 정지
    slidesToShow:3, // 보여줄 slide 수
    responsive: [ 
		{  
			breakpoint: 992, 
			settings: {
				slidesToShow:3 
			} 
		},
		{ 
			breakpoint: 768, 
			settings: {	
				slidesToShow:2 
			} 
		},
        { 
			breakpoint: 0, 
			settings: {	
				slidesToShow:1
			} 
		}
	]
};

function TourImg(props) {
    const [imgSource, setImgSource] = useState([
        {id:'', img:''},
        {id:'', img:''},
        {id:'', img:''},
        {id:'', img:''}
    ]);
    
    const reqUrl = '/tour/random';
    
    const getImg = async () => {
        await axios
            .get(reqUrl)
            .then((res) => setImgSource(res.data)); 
    }; 

    useEffect(() => {
        getImg()
    }, [])

    const tourImgRender = () => {
        const result = [];
        console.log(imgSource)
        for (let i = 0; i < 4; i++) {
            result.push(
                <Fragment>
                <div class="testimonial-item bg-light rounded p-4">
                    <img class="img-fluid-tour" src={imgSource[i].img} onClick={(e) => window.location.href = "/jeju/TouristAttractionInfo?tourSpot=" + imgSource[i].id}/>
                </div>
                </Fragment>
        );}    
    return result;
    };

    return (
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5">제주 관광지 사진</h1>
                <Slider className='testimonial-carousel' {...tourOptions}>
                    {tourImgRender()}
                    <div class="testimonial-item bg-light rounded p-4">
                        <img class="img-fluid-tour" src='https://image.fmkorea.com/files/attach/new2/20210728/3674493/3731487823/3787216388/37dbf32737fa8f62174e3764bae950ab.jpg' onClick={(e) => alert("슈슉 슈숙. 슉. 하르방은 못참지  -박태준")} />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default TourImg;