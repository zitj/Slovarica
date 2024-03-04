(() => {
	'use strict';
	const e = [
			{ wordCounter: 0, words: ['Авион', 'Ауто', 'Астронаут'] },
			{ wordCounter: 0, words: ['Банана', 'Балон', 'Буре'] },
			{ wordCounter: 0, words: ['Веверица', 'Вук', 'Воће'] },
			{ wordCounter: 0, words: ['Грожђе', 'Гром', 'Гитара'] },
			{ wordCounter: 0, words: ['Домине', 'Дрво', 'Диносаурус'] },
			{ wordCounter: 0, words: ['Ђумбирко', 'Ђеврек'] },
			{ wordCounter: 0, words: ['Ексери'] },
			{ wordCounter: 0, words: ['Жирафа', 'Жир', 'Жаба'] },
			{ wordCounter: 0, words: ['Зомби', 'Зец', 'Звезда'] },
			{ wordCounter: 0, words: ['Играчке', 'Игла', 'Индијанaц'] },
			{ wordCounter: 0, words: ['Јабука', 'Јастук', 'Јаје'] },
			{ wordCounter: 0, words: ['Крокодил', 'Компас', 'Корњача'] },
			{ wordCounter: 0, words: ['Лубеница', 'Лизалица', 'Ловац'] },
			{ wordCounter: 0, words: ['Љуљашка', 'Људи'] },
			{ wordCounter: 0, words: ['Миш', 'Магнет', 'Микрофон'] },
			{ wordCounter: 0, words: ['Нож', 'Ној', 'Наранџа'] },
			{ wordCounter: 0, words: ['Њива', 'Њушка'] },
			{ wordCounter: 0, words: ['Око', 'Октопод', 'Ован'] },
			{ wordCounter: 0, words: ['Пица', 'Паприка', 'Папагај'] },
			{ wordCounter: 0, words: ['Ранац', 'Ракета', 'Риба'] },
			{ wordCounter: 0, words: ['Сат', 'Слон'] },
			{ wordCounter: 0, words: ['Трактор', 'Телевизор', 'Труба'] },
			{ wordCounter: 0, words: ['Ћурка', 'Ћуп'] },
			{ wordCounter: 0, words: ['Уво', 'Удица'] },
			{ wordCounter: 0, words: ['Фрула', 'Фењер', 'Фијакер'] },
			{ wordCounter: 0, words: ['Хлеб', 'Храм', 'Хармоника'] },
			{ wordCounter: 0, words: ['Цвекла', 'Цуцла', 'Цигле'] },
			{ wordCounter: 0, words: ['Чарапе', 'Чизме', 'Чесма'] },
			{ wordCounter: 0, words: ['Џак', 'Џемпер'] },
			{ wordCounter: 0, words: ['Шешир', 'Шишарка'] },
		],
		t = document.querySelector('.loadImagesContainer'),
		o = ['inout', 'open', 'click', 'randomClick', 'sectionClick', 'shuffle', 'success'],
		s = (e) => {
			let t = new Audio(`../../assets/audio/${e}.mp3`);
			return (t.volume = 0), t.play();
		},
		r = (e) => {
			e.forEach((e) => {
				e.words.forEach((e) => {
					(e = {
						name: e,
						playAudio: function () {
							s(this.name);
						},
					}).playAudio();
				});
			}),
				o.forEach((e) => {
					(e = {
						name: e,
						playAudio: function () {
							s(this.name);
						},
					}).playAudio();
				});
		},
		n = (e, t, o) => {
			let s = [e, t, o];
			for (let e of s)
				e.classList.add('animate'),
					e.addEventListener('animationend', () => {
						e.classList.remove('animate');
					});
		},
		a = document.getElementById('my_audio'),
		d = (e, t) => {
			(a.src = `assets/audio/${e}.mp3`), (a.loop = t);
			let o = a.play();
			void 0 !== o && o.then((e) => {}).catch((e) => {});
		},
		l = (e) => {
			new Audio(`assets/audio/${e}.mp3`).play();
		},
		c = document.querySelector('.arrowButtons'),
		i = c.querySelector('.arrowLeft'),
		u = c.querySelector('.arrowRight'),
		w = document.querySelector('nav'),
		m = document.querySelector('.logo'),
		y = w.querySelectorAll('a'),
		p = document.querySelector('.start'),
		L = document.querySelector('.loadingScreen'),
		C = document.getElementById('loadingTitle'),
		f = C.textContent.split('');
	C.textContent = '';
	for (let e = 0; e < f.length; e++) C.innerHTML += '<span>' + f[e] + '</span>';
	let v = 0,
		g = setInterval(() => {
			if ((C.querySelectorAll('span')[v].classList.add('fadeIn'), v++, v === f.length)) return clearInterval(g), void (g = null);
		}, 30);
	const h = document.querySelector('h3'),
		q = document.querySelector('h1'),
		S = 'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ'.split(''),
		T = document.querySelector('img'),
		k = document.querySelector('.wrapper'),
		$ = document.querySelector('.letterSection'),
		E = document.querySelector('.illustration');
	let M = 0,
		A = 0,
		H = 0,
		x = '';
	const I = () => {
		(q.innerHTML = S[M] + `<span>${S[M].toLowerCase()}</span>`), (h.innerHTML = e[M].words[0]), (T.src = `assets/img/${e[M].words[0]}.png`), M++, M === S.length && (M = 0);
	};
	let b = 0;
	const B = (e, t, o) => {
			e[t].wordCounter > e[t].words.length - 1 ? ((e[t].wordCounter = 0), (o = 0)) : (o = e[t].wordCounter),
				(q.innerHTML = S[t] + `<span>${S[t].toLowerCase()}</span>`),
				(h.innerHTML = e[t].words[o]),
				(T.src = `assets/img/${e[t].words[o]}.png`),
				(T.alt = e[t].words[o]),
				l('click'),
				d(e[t].words[o]),
				n(q, T, h);
		},
		R = (e) => {
			(b = 0),
				(q.innerHTML = S[b] + `<span>${S[b].toLowerCase()}</span>`),
				(h.innerHTML = e[b].words[0]),
				(T.src = `assets/img/${e[b].words[0]}.png`),
				(T.alt = e[b].words[0]),
				d(e[b].words[0]),
				e.forEach((e) => {
					e.wordCounter = 0;
				}),
				n(q, T, h);
		},
		z = () => {
			if (!y[2].classList.contains('active') && !y[1].classList.contains('active')) {
				if ((b++, b === S.length)) {
					b = 0;
					for (let t of e) t.wordCounter++;
				}
				B(e, b, 0);
			}
		},
		G = () => {
			y[2].classList.contains('active') || y[1].classList.contains('active') || (b--, -1 == b && (b = S.length - 1), B(e, b, 0));
		},
		V = document.querySelector('.progressBar'),
		_ = document.querySelector('.progressValue');
	let j = 0,
		D = 5;
	const F = document.querySelector('.memoryGame'),
		J = new Audio('assets/audio/inout.mp3');
	let K = [],
		N = null,
		O = [],
		P = [],
		Q = [],
		U = 0,
		W = 0;
	const X = () => {
			U = e[W].wordCounter;
			let t = e[W + 1].wordCounter,
				o = e[W + 2].wordCounter;
			for (let s = 0; O.length < 6; s++) O.push(e[W].words[U]), O.push(e[W + 1].words[t]), O.push(e[W + 2].words[o]);
			P = O.map((e) => ({ sort: Math.random(), value: e }))
				.sort((e, t) => e.sort - t.sort)
				.map((e) => e.value);
		},
		Y = () => {
			let e = '';
			P.forEach((t) => {
				e += `\n        <div class="box" data-val="${t}" >\n        <div class="front square">\n            <h2>${
					t[0]
				}<span>${t[0].toLowerCase()}</span></h2>\n            <p class="boxTitle">${t}</p>\n            <img src="assets/img/${t}.png" alt="${t}" />\n            </div>\n            <div class="back square">\n            <img src="assets/gif/questionMark.gif" alt="question mark gif" />\n         </div>\n        </div>\n        `;
			}),
				(F.innerHTML = e),
				(K = document.querySelectorAll('.box')),
				(N = document.querySelectorAll('.boxTitle')),
				K.length > 0 && Z();
		},
		Z = () => {
			for (let t of K)
				t.classList.add('active'),
					J.play(),
					setTimeout(() => {
						t.classList.remove('active');
					}, 450),
					t.addEventListener('click', (o) => {
						if (!t.classList.contains('correct')) {
							if ((t.classList.toggle('active'), l('open'), t.classList.contains('active') ? Q.push(t.dataset.val) : (Q = []), 2 == Q.length))
								if (Q[0] === Q[1]) {
									for (let e of K) e.dataset.val == Q[0] && (e.classList.add('correct'), e.children[0].classList.add('correct'), d('success'));
									(Q = []),
										(j += 2),
										(D += 33.3),
										D >= 99 &&
											((_.style.width = '100%'),
											setTimeout(() => {
												(_.style.width = '5%'), (D = 5);
											}, 550)),
										(_.style.width = `${D}%`),
										V.classList.add('correct'),
										setTimeout(() => {
											V.classList.remove('correct');
										}, 250);
								} else
									setTimeout(() => {
										for (let e of K) e.classList.contains('active') && (e.classList.remove('active'), (Q = []));
									}, 400);
							if (6 == j) {
								if (((j = 0), (W += 3), W > 27)) {
									W = 0;
									for (let t of e) t.wordCounter++, t.words.length <= t.wordCounter && (t.wordCounter = 0);
								}
								(O = []),
									X(),
									setTimeout(() => {
										for (let e of K) e.remove();
										Y();
									}, 700);
							}
						}
					});
		};
	document.querySelector('span'), (p.style.display = 'none');
	const ee = { a: !1 };
	(q.innerHTML = S[0] + `<span>${S[0].toLowerCase()}</span>`), (T.src = `assets/img/${e[0].words[0]}.png`), (T.alt = e[0].words[0]);
	let te = 0;
	const oe = () => {
		for (let e of y) e.classList.remove('active');
	};
	for (let t of y)
		t.addEventListener('click', () => {
			l('sectionClick'),
				oe(),
				t.classList.add('active'),
				y[1].classList.contains('active')
					? ((p.style.display = 'block'), (c.style.display = 'none'), R(e))
					: ((p.style.display = 'none'), clearInterval(A), (p.innerHTML = 'КРЕНИ'), p.classList.add('start'), (a.src = '')),
				y[0].classList.contains('active') && (R(e), (c.style.display = 'flex')),
				y[2].classList.contains('active')
					? (($.style.display = 'none'),
					  (E.style.display = 'none'),
					  F.classList.add('active'),
					  V.classList.add('active'),
					  e.forEach((e) => (e.wordCounter = 0)),
					  (te = 0),
					  (_.style.width = '5%'),
					  k.classList.add('game'),
					  X(),
					  Y())
					: (($.style.display = 'flex'), (E.style.display = 'flex'), F.classList.remove('active'), V.classList.remove('active'), k.classList.remove('game'));
		});
	p.addEventListener('click', () => {
		if ((p.classList.toggle('start'), l('randomClick'), p.classList.contains('start'))) {
			(p.innerHTML = 'КРЕНИ'), clearInterval(A), (x = q.textContent[0]), n(q, T, h);
			for (let t of e)
				t.wordCounter > t.words.length - 1 && (t.wordCounter = 0),
					t.words[0].charAt(0) == x && ((H = t.wordCounter), (T.src = `assets/img/${t.words[H]}.png`), (T.alt = t.words[H]), (h.innerHTML = t.words[H]), d(t.words[H]), t.wordCounter++);
		} else p.classList.contains('start') || (d('shuffle', !0), (A = setInterval(I, 80)), (p.innerHTML = 'СТАНИ'));
	}),
		i.addEventListener('click', G),
		u.addEventListener('click', z),
		m.addEventListener('click', () => {
			location.reload();
		}),
		(document.body.onkeyup = function (e) {
			e.keyCode;
		}),
		(document.onkeydown = (e) => {
			(ee[e.key] = !0), 'ArrowLeft' == e.key && G(), 'ArrowRight' == e.key && z();
		}),
		n(q, T, h),
		r(e),
		((e) => {
			let o = '';
			e.forEach((e) => {
				e.words.forEach((e) => {
					o += `\n                <img src="assets/img/${e}.png">\n            `;
				}),
					(t.innerHTML = o);
			});
		})(e),
		R(e),
		(k.style.opacity = 0),
		setTimeout(() => {
			(L.style.opacity = 0), (L.style.zIndex = -10), (k.style.opacity = 1);
		}, 2600);
})();
