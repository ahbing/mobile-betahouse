import './../main.scss';    // sass 文件入口
import './init.js';     //屏幕初始化
import {loaderImg,loaderVideo} from './base.js';
import IScroll from './iscroll.js';  // iscroll

function loaderIndex(){
		// we create things img
		let createImgs = ['create1.jpg','create2.jpg','create3.jpg'];
		let IndexScreen, // index主页的垂直滚动
			  createImg;  // create 板块的横向滚动
		  	// videoSrc;  // 视频的src
		let header = document.querySelector('.header'),
				nav = document.querySelector('nav'),
				unflodBtn = document.querySelectorAll('.unflod-btn'),
				aboutBtn = document.querySelector('.about-us'),
				cBox = document.querySelector('.c-box'),
				createBoxs = document.querySelectorAll('.c-img-item'),
				createList = document.querySelector('#createList'),
				prevBtn = document.querySelector('.prev-img'),
				nextBtn = document.querySelector('.next-img'),
				videoImgs = document.querySelectorAll('.video-img');


		IndexScreen = new IScroll('.sliderBox', {
			scrollX: false,
			scrollY: true,
			momentum: false,
			snap: true,
			click:true
		});

		createImg = new IScroll('.c-img-box',{
			scrollX:true,
			scrollY:false,
			momentum:false,
			snap:true,
			snapSpeed: 400
		})

		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

		if(unflodBtn){
			[].slice.call(unflodBtn).forEach(item=>{
				loaderImg(item,require('./../img/iconfont-unfold.png'),'unflod');
			});
		}

		if(aboutBtn){
			aboutBtn.addEventListener('touchend',toAbout,false)
			let toAbout = ()=>{
				console.log(e)
			}
			loaderImg(aboutBtn,require('./../img/iconfont-alignjustify.png'));
		}
		// index header
		if(header){
			loaderImg(header,require('./../img/logo.png'),'logo');
		}

		// index create
		if(createBoxs){
			let curIndex;
			// 懒加载函数
			let loadCreateImg = (willIndex)=>{
			 let src = 	createBoxs[willIndex].getAttribute('data-src');
			 //图片加载完毕 不在加载
			 if(createBoxs[willIndex] &&createBoxs[willIndex].firstElementChild){
				 return false;
			 }
			 loaderImg(createBoxs[willIndex],require(`./../img/${src}`),'create-img-item');
			};
			let leftWidth = 484/2*dpr;
			let createTransform = (willIndex)=>{
				createList.style.transform = 'translateX(-'+willIndex*leftWidth+'px)';
				createList.style.transition = 'all .5s ease-in .1s'
			}

			let changeCreateImg = (e)=>{
				e.preventDefault();
				let target = e.target,src,willIndex,nextIndex;
				curIndex = curIndex==undefined?0:curIndex;

				if(target.tagName == 'IMG'){
					src = target.parentNode.getAttribute('data-src');
					if( target.parentNode && target.parentNode.nextElementSibling){
						nextIndex = target.parentNode.nextElementSibling.getAttribute('data-index');
					}else{
						nextIndex = target.parentNode.getAttribute('data-index')
					}
					loadCreateImg(nextIndex)
				}else{
					// 下面按钮
					if(target.className === 'next-img'){
						// 下一张 图片
						willIndex = curIndex >=createImgs.length-1 ? createImgs.length-1 : curIndex+1;
						curIndex = willIndex;
						// 懒加载图片
						loadCreateImg(willIndex)
					}else{
						// 上一张
						// console.log(curIndex)
						willIndex = curIndex<=0? 0: curIndex-1;
						curIndex = willIndex;
					}
					//  图片过场
					createTransform(willIndex);
				}
			};


			let ImgW = 484/2*dpr;
			createList.style.width = ImgW * createImgs.length+'px';
			createImgs.forEach((item,index)=>{
					createBoxs[index].style.width = ImgW+'px';
					createBoxs[index].setAttribute('data-src',item);
					createBoxs[index].setAttribute('data-index',index);
					prevBtn.setAttribute('data-index',-1);
					nextBtn.setAttribute('data-index',1);
					// 只先加载第一张图
					if(index == 0){
						loaderImg(createBoxs[index],require(`./../img/${item}`),'create-img-item')
					}
					//转换create图片的监听
					cBox.addEventListener('touchend',changeCreateImg,false)
			});
		}

		if(videoImgs){
			let playVideo = (e)=>{
				e.preventDefault();
				let video = document.querySelector('.video');
				if(video.firstElementChild){
					return
				}
				let videoSrc = e.target.getAttribute('data-src');
				video.style.display = 'block';
				nav.style.display ='none';
				loaderVideo(video,require(`./../video/${videoSrc}`),'all-screen',require('./../img/create1.jpg'));

				// 清空监听
				[].slice.call(videoImgs).forEach((item)=>{
					item.removeEventListener('click',playVideo,false)
				});

				video.addEventListener('touchend',()=>{
					let mTop = video.getBoundingClientRect().top;
					if(mTop>=0){
						video.style.display='none';
						nav.style.display ='block';
					}
					if(video && video.firstElementChild){
						video.removeChild(video.firstElementChild);
					}
					video.style.display='none';
					nav.style.display ='block';
					//增加监听
					[].slice.call(videoImgs).forEach((item)=>{
						item.addEventListener('click',playVideo,false)
					});
				},false)
			};

			[].slice.call(videoImgs).forEach((item)=>{
				item.addEventListener('click',playVideo,false)
			});
		}
}
// build
loaderIndex()
// dev
// export default loaderIndex;
