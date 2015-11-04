import {loaderImg} from './base.js';
import IScroll from './iscroll.js';  // iscroll
import members from './../mock/members.js';

let loaderMem = function(){
	let	backBtn = document.querySelector('.back-btn'),
		memberList = document.querySelector('.member-list'),
		memberBox = document.querySelector('#memberBox'),
		mDetailBox = document.querySelector('#viewport'),
		mDetailWpapper = document.querySelector('#wrapper'),
		mDetailScroll = document.querySelector('#scroller'),
		introBox = document.querySelector('#intro'),
		introName = introBox.querySelector('.intro-name'),
		introText = introBox.querySelector('.intro-text'),
		introLink = introBox.querySelector('.intro-link');

		//所有members的滑动实例
	  let membersScroll = new IScroll('.member-list',{
			scrollX: false,
			scrollY: true,
			momentum: false,
			snap: true,
			click:true
		});

		// memebers detail 的滑动实例
		let detailScroll = new IScroll('#wrapper', {
			scrollX: false,
			scrollY: true,
			momentum: false,
			snap: true,
			snapSpeed: 400,
			keyBindings: true,
			click:true
		});

		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	/*
	* showIntro 显示相应id的用户数据
	* @param {Number}   使用在members数组中的索引值
	 */
	let showIntro = (id)=>{
		introName.textContent = members[id].name;
		introText.textContent = members[id].intro;
		let github = introLink.firstElementChild;
		let blog = introLink.lastElementChild
		if(members[id].github.indexOf('http')!==-1){
			// github is not empty
			github.setAttribute('href',members[id].github);
			github.style.display = 'inline-block';
		}else{
			github.style.display = 'none';
		}
		if(members[id].blog.indexOf('http')!==-1){
			blog.setAttribute('href',members[id].blog);
			blog.style.display = 'inline-block';
		}else{
			blog.style.display = 'none';
		}
	}

	/*
	* nextFilter 下一个用户显示模糊
	* @param {Object}   scroll的盒子
	* @param {Number}  当前用户索引值
	* @Param {string}  添加模糊样式的类名
	 */

	let nextFilter = (p,id,cn)=>{
		let curLi = p.children[id],
		  nextLi = curLi.nextElementSibling,
		  nextSrc;
		if(nextLi){
			nextSrc = nextLi.getAttribute('data-src');
			nextLi.classList.add(cn);
		}
	}

	/*
	* crearFilter 清除css模式的样式
	* @param {Object}   scroll盒子
	* @param {Number}  当前用户索引值
	* @Param {string}  要删除的样式的classname
	* @Param {string}  重新添加的classname，可空。
	 */

	let crearFilter = (p,id,cn,addcn)=>{
		let curLi = p.children[id];
		if(curLi.className.indexOf(cn)!==-1){
			curLi.classList.remove(cn)
			if(addcn!==undefined){
				curLi.classList.add(addcn);
			}
		}
	}


	/*
	* replace 替换className
	* @param {Object}  操作classname的盒子
	* @param {string}  要删除的classname
	* @Param {string}  要添加的classname
	 */

	let replaceClass = (p,rmcn,addcn)=>{
		if(rmcn !== undefined && addcn !== undefined){
			p.classList.remove(rmcn);
			p.classList.add(addcn);
		}
	}
	//  显示 详情的 页面
	let memberDetail = (e)=>{
		e.preventDefault();
		let imgHeight = 800,
		 	target = e.target.parentNode,
	    userId = Number(target.getAttribute('data-i')),
		  curSrc = target.getAttribute('data-src');
		//下一张图片模糊
		nextFilter(mDetailScroll,userId,'css-filter');
		mDetailBox.classList.add('show-detail-box');
		mDetailBox.style.zIndex=233;
		mDetailScroll.style.heaight = imgHeight*members.length+'px';
		mDetailScroll.style.transform='translateY(-'+imgHeight*userId+'px)';
		// 显示当前用户信息
		showIntro(userId);

		let startTop;
		mDetailBox.addEventListener('touchstart',function(e){
			e.preventDefault();
			let rect = mDetailScroll.getBoundingClientRect();
			let startTop = rect.top;
			//隐藏介绍
			replaceClass(introBox,'show-intro','hide-intro');
			detailScroll.scrollTo(0, startTop);
		},false);

		mDetailBox.addEventListener('touchend',function(e){
			e.preventDefault();
			detailScroll.scrollBy(0, 0);
			setTimeout(()=>{
				let rect = mDetailScroll.getBoundingClientRect();
				let endTop = rect.top;
				// 当前用户id
				let theId = Math.abs(parseInt(Number(endTop/imgHeight),10));
				// console.log(theId);
				// 添加下一张图片的模糊
				nextFilter(mDetailScroll,theId,'css-filter');
				//  清除当前id的css模糊
				crearFilter(mDetailScroll,theId,'css-filter','cur-header');
				//  显示介绍
				showIntro(theId);
				replaceClass(introBox,'hide-intro','show-intro');
			},600);
			// crearFilter(mDetailScroll,theId,'cur-header');
		},false)
	};

	/*
	* createMemberList 创建用户list的函数
	* @param {array}   资源数据数组
	* @param {string}  要dom添加到的盒子
	* @Param {string}  创建的list item 的classname
	 */
	let createMemberList = (arr,box,classname)=>{
		let docfrag = document.createDocumentFragment();
		arr.forEach((item,index)=>{
			let li = document.createElement('li');
			li.className = classname;
			li.setAttribute('data-i',index);
			li.setAttribute('data-src',item.imgsrc);
			/*
			========================================
							    需要 优化 图片 懒加载
			========================================
			 */
			if(box == memberBox){
				loaderImg(li,require(`./../img/${item.imgsrc}`),'member-img member-detail-img');
			}
			li.addEventListener('click',memberDetail,false);
			docfrag.appendChild(li);
		});
		box.appendChild(docfrag);
		docfrag = null;
	};

	//创建 滑动的 img list
	createMemberList(members,memberBox,'member-item');
	//创建detail 滚动的list
	createMemberList(members,mDetailScroll,'slide');

	// 渲染back 按钮
 	if(backBtn){
		loaderImg(backBtn,require('./../img/iconfont-back.png'),'back-btn-img');
	};

	// 获得所有的detail页面的list item
  let slide = document.querySelectorAll('.slide');
	[].slice.call(slide).forEach((item)=>{
		var src = item.getAttribute('data-src');
		loaderImg(item,require(`./../img/${src}`));
	});

	// 点击 detail 滚动页面 退出
	if(mDetailBox){
		mDetailBox.addEventListener('click',function(e){
			e.preventDefault();
			mDetailBox.classList.remove('show-detail-box');
			mDetailBox.style.zIndex=-233;
		},false);
	}

};

export default loaderMem;
