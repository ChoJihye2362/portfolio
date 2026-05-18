var App = App || {};

$(document).ready(function(){
	gsap.registerPlugin(ScrollTrigger);
	AOS.init({
		offset: window.innerWidth <= 1024 ? 40 : 60,
		duration: 800,
		easing: 'ease',
		delay: 100,
	});
	// 메인비주얼 타이핑텍스트
	App.typyingText.init();
	// 메인비주얼 GSAP 스크롤
	App.mainVisualGsap.init();
	// 프로필 이미지 GSAP
	App.profileImgGsap.init();
	// 프로젝트 2개 플로우
	App.projectFlow.init();
	// 프로젝트 리스트 호버 시 이미지
	App.projectHover.init();
	// 프로젝트에서 컨택트로 덮이는 효과
	App.projectContactCover.init();
	// 플로우 텍스트 박스
	App.flowTxtBox.init();
});
//======================================================================
// 메인비주얼 타이핑텍스트
//======================================================================
App.typyingText = function () {
	var self;
	return {
		init: function () {
	const typingItems = document.querySelectorAll('.main-visual-txt-box .main-txt-big');
	const subTxtItems = document.querySelectorAll('.main-visual-txt-box .main-txt');

	function wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	function getTypingUnits(node) {
		const units = [];
		node.childNodes.forEach(child => {
			if (child.nodeType === Node.TEXT_NODE) {
				child.textContent.split('').forEach(char => {
					units.push({
						type: 'text',
						value: char
					});
				});
			}
			if (child.nodeType === Node.ELEMENT_NODE) {
				child.textContent.split('').forEach(char => {
					units.push({
						type: 'element',
						tag: child.tagName.toLowerCase(),
						className: child.className,
						value: char
					});
				});
			}
		});
		return units;
	}
	async function typeText(element, speed) {
		const temp = document.createElement('div');
		temp.innerHTML = element.innerHTML;
		const units = getTypingUnits(temp);
		element.innerHTML = '';
		element.classList.add('is-typing');
		const cursor = document.createElement('span');
		cursor.className = 'typing-cursor';
		element.appendChild(cursor);
		for (const unit of units) {
			if (unit.type === 'text') {
				cursor.insertAdjacentText('beforebegin', unit.value);
			}
			if (unit.type === 'element') {
				let target = element.querySelector(`.${unit.className}`);

				if (!target) {
					target = document.createElement(unit.tag);
					target.className = unit.className;
					cursor.before(target);
				}
				target.textContent += unit.value;
			}
			await wait(speed);
		}
		cursor.remove();
	}
	async function startMainVisualTyping() {
		for (const item of typingItems) {
			await typeText(item, 80);
			await wait(250);
		}
		subTxtItems.forEach((item, index) => {
			setTimeout(() => {
				item.classList.add('is-show');
			}, index * 180);
		});
	}
	startMainVisualTyping();
		},
	}
}();
//======================================================================
// 메인비주얼 GSAP 스크롤
//======================================================================
App.mainVisualGsap = function () {
	var self;

	return {
		init: function () {
			self = this;

			gsap.registerPlugin(ScrollTrigger);

			$('.main-visual-line').each(function () {
				var $this = $(this);
				var moveX = $this.hasClass('gsap-left') ? '-35vw' : '35vw';

				gsap.to(this, {
					x: moveX,
					opacity: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: '.main-visual-box',
						start: 'top top',
						end: 'bottom top',
						scrub: 1
					}
				});
			});
		}
	}
}();
//======================================================================
// 프로필 이미지 GSAP
//======================================================================
App.profileImgGsap = function () {
	var self;
	return {
		init: function () {
			self = this;
			gsap.registerPlugin(ScrollTrigger);
			$('.profile-img-wrap').each(function () {
				var wrap = this;
				var img = $(wrap).find('img')[0];

				var tl = gsap.timeline({
					scrollTrigger: {
						trigger: wrap,
						start: 'top 80%',
						end: 'top 35%',
						scrub: 1.2
					}
				});
				tl.fromTo(wrap,
					{
						scale: 0.78,
						y: 100,
						opacity: 0.3
					},
					{
						scale: 1,
						y: 0,
						opacity: 1,
						ease: 'power3.out'
					}
				);
				tl.fromTo(img,
					{
						scale: 1.25
					},
					{
						scale: 1,
						ease: 'power3.out'
					},
					'<'
				);
			});
		}
	}
}();
//======================================================================
// 프로젝트 2개 플로우
//======================================================================
App.projectFlow = function () {
    return {
        init: function () {
            const section = document.querySelector('.page-project');
            const stickyArea = document.querySelector('.project-sticky-area');
            const flowItems = gsap.utils.toArray('.project-flow-box');

            if (!section || !stickyArea || flowItems.length === 0) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stickyArea,
                    start: 'top top',
                    end: '+=260%', // 조금 더 여유 주기
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    // markers: true,
                }
            });

            // 처음 상태
            gsap.set(flowItems, {
                yPercent: 100,
                opacity: 0
            });

            // 1번째 박스 등장
            tl.to(flowItems[0], {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'none'
            })

            // 잠깐 유지
            .to(flowItems[0], {
                yPercent: -30,
                opacity: 1,
                duration: 0.8,
                ease: 'none'
            }, '+=0.2')

            // 위로 사라짐
            .to(flowItems[0], {
                yPercent: -120,
                opacity: 0,
                duration: 1,
                ease: 'none'
            })

            // 2번째 박스 등장
            .to(flowItems[1], {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'none'
            }, '-=0.2')

            // 잠깐 유지
            .to(flowItems[1], {
                yPercent: -30,
                opacity: 1,
                duration: 0.8,
                ease: 'none'
            }, '+=0.2')

            // 위로 사라짐
            .to(flowItems[1], {
                yPercent: -120,
                opacity: 0,
                duration: 1,
                ease: 'none'
            });
        }
    }
}();
//======================================================================
// 프로젝트 리스트 호버 시 이미지
//======================================================================
App.projectHover = function () {
	var self;
	return {
		init: function () {
			self = this;

			$('.mini-tit').each(function () {

				let $tit = $(this);
				let $li = $tit.closest('li');
				let $imgBox = $tit.find('.project-img-box');

				if ($imgBox.length === 0) return;

				$tit.on('mouseenter', function () {
					$li.addClass('is-hover');

					$imgBox.css({
						opacity: 1,
						display: 'block'
					});
				});

				$tit.on('mousemove', function (e) {
					let parentOffset = $tit.offset().top;
					let mouseY = e.pageY - parentOffset;

					$imgBox.css({
						top: mouseY + 'px'
					});
				});

				$tit.on('mouseleave', function () {
					$li.removeClass('is-hover');

					$imgBox.css({
						opacity: 0,
						top: '50%',
						display: 'none'
					});
				});

			});
		},
	}
}();
//======================================================================
// 플로우 텍스트 박스
//======================================================================
App.flowTxtBox = function () {
	var self;
	return {
		init: function () {
			self = this;

			$('.flow-txt-box.clone').remove();
			$('.flow-box').each(function() {
				if ($(this).has('.flow-txt-box.clone').length <= 0) {
					// .flow-txt-box을 복제하여 clone 클래스 추가
					var imgBoxClone = $(this).find('.flow-txt-box').clone().addClass('clone');
					$(this).find('.flow-txt-box').after(imgBoxClone);
				}
			});
		},
	}
}();