
	/*
	* loaderImg 加载图片
	* @param {object}  添加的父级元素
	* @param {string}  src 添加的图片的src
	* @Param {string}  img标签的className,可以忽略
	 */
	let loaderImg = (p,src,classname)=>{
		// let loadingImg =  require(src);
		let loadingImg =  src;
		// console.log(loadingImg)
		let img = document.createElement('img');
		img.className = classname ?classname:'';
		p.appendChild(img);
		img.src = loadingImg;
	};
	/*
	* loaderImg 加载视频
	* @param {object}  添加的父级元素
	* @param {string}  src 添加的视频的src
	* @Param {string}  video标签的className,可以忽略
	* @Param {string}  video的封面图片
	 */
	let loaderVideo = (p,src,classname,poster)=>{
		let loadingVideo = src;
		let video = document.createElement('video');
		video.className = classname?classname:'';
		video.poster = poster?poster:'';
		video.autoplay = 'autoplay';
		video.controls = 'controls';
		p.appendChild(video);
		video.src = loadingVideo;
	};

	export default {loaderImg,loaderVideo}
