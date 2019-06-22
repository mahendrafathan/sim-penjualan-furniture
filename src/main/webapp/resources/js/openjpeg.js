/* global eval */

var H = void 0,
	I = !0,
	W = null,
	Y = !1;
this.openjpeg = function (ei, xb) {
	function Na() {}
	var Tb, Ub, ka, fa, bb, Fa, cb, Vb, db, eb, Wb, Qc, Rc, Sc;

	function fi(a) {
		eval.call(W, a)
	}

	function yb(a) {
		Na(a + ":\n" + Error().stack);
		throw "Assertion: " + a;
	}

	function D(a, d) {
		a || yb("Assertion failed: " + d)
	}

	function Tc(c, d, e) {
		e = e || "i8";
		e[e.length - 1] === "*" && (e = "i32");
		switch (e) {
			case "i1":
				p[c] = d;
				break;
			case "i8":
				p[c] = d;
				break;
			case "i16":
				q[c >> 1] = d;
				break;
			case "i32":
				a[c >> 2] = d;
				break;
			case "i64":
				a[c >> 2] = d[0];
				a[c + 4 >> 2] = d[1];
				break;
			case "float":
				u[c >> 2] = d;
				break;
			case "double":
				ha[0] = d;
				a[c >>
					2] = P[0];
				a[c + 4 >> 2] = P[1];
				break;
			default:
				yb("invalid type for setValue: " + e)
		}
	}

	function Xb(c, d) {
		d = d || "i8";
		d[d.length - 1] === "*" && (d = "i32");
		switch (d) {
			case "i1":
				return p[c];
			case "i8":
				return p[c];
			case "i16":
				return q[c >> 1];
			case "i32":
				return a[c >> 2];
			case "i64":
				return [T[c >> 2], T[c + 4 >> 2]];
			case "float":
				return u[c >> 2];
			case "double":
				return P[0] = a[c >> 2], P[1] = a[c + 4 >> 2], ha[0];
			default:
				yb("invalid type for setValue: " + d)
		}
		return W
	}

	function h(a, d, e) {
		var b, f;
		typeof a === "number" ? (b = I, f = a) : (b = Y, f = a.length);
		for (var e = [z, K.va,
				K.J
			][e === H ? k : e](Math.max(f, 1)), g = typeof d === "string" ? d : W, j = 0, l; j < f;) {
			var v = b ? 0 : a[j];
			typeof v === "function" && (v = K.Ga(v));
			l = g || d[j];
			l === 0 ? j++ : (D(l, "Must know what type to store in allocate!"), l == "i64" && (l = "i32"), Tc(e + j, v, l), j += K.H(l))
		}
		return e
	}

	function Ga(a) {
		for (var d = "", e = 0, b, f = String.fromCharCode(0);;) {
			b = String.fromCharCode(U[a + e]);
			if (b == f) break;
			d += b;
			e += 1
		}
		return d
	}

	function Uc(a, d) {
		return Array.prototype.slice.call(p.subarray(a, a + d))
	}

	function xa(a) {
		for (var d = 0; p[a + d];) d++;
		return d
	}

	function Vc(a, d) {
		var e =
			xa(a);
		d && e++;
		var b = Uc(a, e);
		d && (b[e - 1] = 0);
		return b
	}

	function qa(a, d) {
		for (var e = [], b = 0; b < a.length;) {
			var f = a.charCodeAt(b);
			f > 255 && (D(Y, "Character code " + f + " (" + a[b] + ")  at offset " + b + " not in 0x00-0xFF."), f &= 255);
			e.push(f);
			b += 1
		}
		d || e.push(0);
		return e
	}

	function zb(a, d) {
		return a >= 0 ? a : d <= 32 ? 2 * Math.abs(1 << d - 1) + a : Math.pow(2, d) + a
	}

	function Wc(a, d) {
		if (a <= 0) return a;
		var e = d <= 32 ? Math.abs(1 << d - 1) : Math.pow(2, d - 1);
		if (a >= e && (d <= 32 || a > e)) a = -2 * e + a;
		return a
	}

	function Yb(c, d, e) {
		a[c >> 2] = d;
		a[c + 4 >> 2] = d + e;
		a[c + 8 >> 2] = d;
		a[c + 12 >>
			2] = 0;
		a[c + 16 >> 2] = 0
	}

	function Xc(c) {
		var d, e;
		a[c + 12 >> 2] = a[c + 12 >> 2] << 8 & 65535;
		a[c + 16 >> 2] = (a[c + 12 >> 2] | 0) == 65280 ? 7 : 8;
		d = T[c + 8 >> 2] >>> 0 >= T[c + 4 >> 2] >>> 0 ? 1 : 2;
		d == 1 ? e = 1 : d == 2 && (d = a[c + 8 >> 2], a[c + 8 >> 2] = d + 1, a[c + 12 >> 2] |= U[d] & 255, e = 0);
		return e
	}

	function R(c) {
		return a[c + 24 >> 2] - a[c + 16 >> 2]
	}

	function ya(c, d) {
		a[c + 24 >> 2] = a[c + 16 >> 2] + d
	}

	function Ha(c) {
		return a[c + 20 >> 2] - a[c + 24 >> 2]
	}

	function ra(c, d) {
		a[c + 24 >> 2] += d
	}

	function ma(c, d) {
		var e, b;
		b = 0;
		e = d - 1;
		a: for (;;) {
			if (!((e | 0) >= 0)) break a;
			var f = c;
			((a[f + 16 >> 2] | 0) == 0 ? 1 : 2) == 1 && Xc(f);
			a[f + 16 >> 2] -=
				1;
			b += (T[f + 12 >> 2] >>> (T[f + 16 >> 2] >>> 0) & 1) << e;
			e -= 1
		}
		return b
	}

	function Yc(c) {
		var d, e;
		a[c + 16 >> 2] = 0;
		d = (a[c + 12 >> 2] & 255 | 0) == 255 ? 1 : 4;
		a: do
				if (d == 1) {
					d = (Xc(c) | 0) != 0 ? 2 : 3;
					do
						if (d == 2) {
							e = 1;
							d = 5;
							break a
						} else if (d == 3) {
						a[c + 16 >> 2] = 0;
						d = 4;
						break a
					} while (0)
				}
			while (0);
		d == 4 && (e = 0);
		return e
	}

	function Ab(c, d, e) {
		var b, f, g, j;
		g = 0;
		j = z(28);
		b = (j | 0) != 0 ? 2 : 1;
		a: do
				if (b == 2) {
					a[j >> 2] = c;
					b = (d | 0) != 0 ? 3 : 5;
					b: do
							if (b == 3) {
								if ((e | 0) == 0) {
									b = 5;
									break b
								}
								a[j + 4 >> 2] = 1;
								a[j + 8 >> 2] = d;
								a[j + 12 >> 2] = e;
								b = 17;
								break b
							}
						while (0);
					b: do
							if (b == 5) {
								b = (d | 0) != 0 ? 15 : 6;
								c: do
										if (b == 6) {
											if ((e |
													0) != 0) break c;
											if ((c | 0) == 0) break c;
											a[j + 4 >> 2] = 2;
											b = a[c + 12 >> 2];
											b = b == 0 ? 9 : b == 2 ? 10 : 11;
											do
												if (b == 11) {
													f = 0;
													break a
												} else b == 9 ? g = a[a[c + 16 >> 2] + 64 >> 2] : b == 10 && (g = a[a[a[c + 20 >> 2] + 4 >> 2] + 64 >> 2]); while (0);
											a[j + 12 >> 2] = Math.floor((a[g + 8 >> 2] | 0) * 0.1625 + 2E3);
											b = z(a[j + 12 >> 2]);
											a[j + 8 >> 2] = b;
											b = (a[j + 8 >> 2] | 0) != 0 ? 14 : 13;
											do
												if (b == 14) {
													b = 17;
													break b
												} else if (b == 13) {
												F(a[j >> 2], 1, Zc, h(1, "i32", n));
												f = 0;
												break a
											} while (0)
										}
									while (0);
								f = 0;
								break a
							}
						while (0);
					a[j + 16 >> 2] = a[j + 8 >> 2];
					a[j + 20 >> 2] = a[j + 8 >> 2] + a[j + 12 >> 2];
					a[j + 24 >> 2] = a[j + 8 >> 2];
					f = j
				} else b == 1 && (f = 0);
			while (0);
		return f
	}

	function r(c, d) {
		var e, b;
		b = 0;
		e = d - 1;
		a: for (;;) {
			if (!((e | 0) >= 0)) break a;
			var f = c,
				g = H,
				j = H,
				g = T[f + 24 >> 2] >>> 0 >= T[f + 20 >> 2] >>> 0 ? 1 : 2;
			g == 1 ? (F(a[f >> 2], 1, $c, h([a[f + 16 >> 2], 0, 0, 0, a[f + 24 >> 2], 0, 0, 0, a[f + 20 >> 2], 0, 0, 0], ["i8*", 0, 0, 0, "i8*", 0, 0, 0, "i8*", 0, 0, 0], n)), j = 0) : g == 2 && (g = a[f + 24 >> 2], a[f + 24 >> 2] = g + 1, j = p[g]);
			b += (j & 255) << (e << 3);
			e -= 1
		}
		return b
	}

	function ad(c, d, e) {
		var b = t;
		t += 32;
		D(t < X);
		var f = b + 16,
			g, j, l, v, h, E, m;
		g = a[c + 20 >> 2];
		j = a[g + 8 >> 2] - a[g >> 2];
		l = a[g + 12 >> 2] - a[g + 4 >> 2];
		v = a[c + 8 >> 2] - a[c >> 2];
		h = fb(bd(g, d) << 2);
		a[b >> 2] =
			h;
		a[f >> 2] = a[b >> 2];
		a: for (;;) {
			d = h = d - 1;
			if ((h | 0) == 0) break a;
			h = a[c + 24 >> 2];
			g += 124;
			a[b + 8 >> 2] = j;
			a[f + 8 >> 2] = l;
			j = a[g + 8 >> 2] - a[g >> 2];
			l = a[g + 12 >> 2] - a[g + 4 >> 2];
			a[b + 4 >> 2] = j - a[b + 8 >> 2];
			a[b + 12 >> 2] = (a[g >> 2] | 0) % 2;
			E = 0;
			b: for (;;) {
				if (!((E | 0) < (l | 0))) break b;
				cd(b, h + (E * v << 2));
				za[e](b);
				var i = h + (E * v << 2),
					k = a[b >> 2];
				m = j << 2;
				D(m % 1 === 0, "memcpy given " + m + " bytes to copy. Problem with quantum=1 corrections perhaps?");
				var n;
				n = k + m;
				if (i % 4 == k % 4 && m > 8) {
					for (; k % 4 !== 0 && k < n;) p[i++] = p[k++];
					k >>= 2;
					i >>= 2;
					for (m = n >> 2; k < m;) a[i++] = a[k++];
					k <<= 2;
					i <<= 2
				}
				for (; k <
					n;) p[i++] = p[k++];
				E += 1
			}
			a[f + 4 >> 2] = l - a[f + 8 >> 2];
			a[f + 12 >> 2] = (a[g + 4 >> 2] | 0) % 2;
			E = 0;
			b: for (;;) {
				if (!((E | 0) < (j | 0))) break b;
				dd(f, h + (E << 2), v);
				za[e](f);
				m = 0;
				c: for (;;) {
					if (!((m | 0) < (l | 0))) break c;
					a[h + (m * v + E << 2) >> 2] = a[a[f >> 2] + (m << 2) >> 2];
					m += 1
				}
				E += 1
			}
		}
		t = b
	}

	function bd(c, d) {
		var e, b, f, g, j;
		b = c;
		f = d;
		g = 1;
		a: for (;;) {
			f = e = f - 1;
			if ((e | 0) == 0) break a;
			b += 124;
			j = a[b + 8 >> 2] - a[b >> 2];
			e = (g | 0) < (a[b + 8 >> 2] - a[b >> 2] | 0) ? 3 : 4;
			e == 3 && (g = j);
			j = a[b + 12 >> 2] - a[b + 4 >> 2];
			e = (g | 0) < (a[b + 12 >> 2] - a[b + 4 >> 2] | 0) ? 5 : 6;
			e == 5 && (g = j)
		}
		return g
	}

	function ed(c, d) {
		var e = t;
		t += 32;
		D(t <
			X);
		var b, f, g = e + 16,
			j, l, v, h, E, m, i, k;
		f = d;
		j = a[c + 20 >> 2];
		l = a[j + 8 >> 2] - a[j >> 2];
		v = a[j + 12 >> 2] - a[j + 4 >> 2];
		h = a[c + 8 >> 2] - a[c >> 2];
		E = fb(bd(j, f) + 5 << 4);
		a[e >> 2] = E;
		a[g >> 2] = a[e >> 2];
		a: for (;;) {
			f = E = f - 1;
			if ((E | 0) == 0) break a;
			E = a[c + 24 >> 2];
			m = (a[c + 8 >> 2] - a[c >> 2]) * (a[c + 12 >> 2] - a[c + 4 >> 2]);
			a[e + 8 >> 2] = l;
			a[g + 8 >> 2] = v;
			j += 124;
			l = a[j + 8 >> 2] - a[j >> 2];
			v = a[j + 12 >> 2] - a[j + 4 >> 2];
			a[e + 4 >> 2] = l - a[e + 8 >> 2];
			a[e + 12 >> 2] = (a[j >> 2] | 0) % 2;
			i = v;
			b: for (;;) {
				if (!((i | 0) > 3)) break b;
				Zb(e, E, h, m);
				hb(e);
				b = l;
				c: for (;;) {
					b = k = b - 1;
					if (!((k | 0) >= 0)) break c;
					u[E + (b << 2) >> 2] = u[a[e >> 2] + (b <<
						4) >> 2];
					u[E + (b + h << 2) >> 2] = u[a[e >> 2] + (b << 4) + 4 >> 2];
					u[E + (b + (h << 1) << 2) >> 2] = u[a[e >> 2] + (b << 4) + 8 >> 2];
					u[E + (b + h * 3 << 2) >> 2] = u[a[e >> 2] + (b << 4) + 12 >> 2]
				}
				E += h << 2 << 2;
				m -= h << 2;
				i -= 4
			}
			b = (v & 3 | 0) != 0 ? 10 : 18;
			do
				if (b == 10) {
					i = v & 3;
					Zb(e, E, h, m);
					hb(e);
					k = l;
					c: for (;;) {
						k = b = k - 1;
						if (!((b | 0) >= 0)) {
							b = 17;
							break c
						}
						b = i == 3 ? 13 : i == 2 ? 14 : i == 1 ? 15 : 16;
						d: do
								if (b == 13) {
									u[E + (k + (h << 1) << 2) >> 2] = u[a[e >> 2] + (k << 4) + 8 >> 2];
									b = 14;
									break d
								}
							while (0);
						d: do
								if (b == 14) {
									u[E + (k + h << 2) >> 2] = u[a[e >> 2] + (k << 4) + 4 >> 2];
									b = 15;
									break d
								}
							while (0);
						b == 15 && (u[E + (k << 2) >> 2] = u[a[e >> 2] + (k << 4) >> 2])
					}
				}
			while (0);
			a[g + 4 >> 2] = v - a[g + 8 >> 2];
			a[g + 12 >> 2] = (a[j + 4 >> 2] | 0) % 2;
			E = a[c + 24 >> 2];
			i = l;
			b: for (;;) {
				if (!((i | 0) > 3)) break b;
				$b(g, E, h);
				hb(g);
				b = 0;
				c: for (;;) {
					if (!((b | 0) < (v | 0))) break c;
					k = E + (b * h << 2);
					m = a[g >> 2] + (b << 4);
					D(I, "memcpy given 16 bytes to copy. Problem with quantum=1 corrections perhaps?");
					var n, o, y;
					n = k;
					o = m + 16;
					if (n % 4 == m % 4) {
						for (; m % 4 !== 0 && m < o;) p[n++] = p[m++];
						m >>= 2;
						n >>= 2;
						for (y = o >> 2; m < y;) a[n++] = a[m++];
						m <<= 2;
						n <<= 2
					}
					for (; m < o;) p[n++] = p[m++];
					b += 1
				}
				E += 16;
				i -= 4
			}
			b = (l & 3 | 0) != 0 ? 27 : 32;
			do
				if (b == 27) {
					i = l & 3;
					$b(g, E, h);
					hb(g);
					k = 0;
					c: for (;;) {
						if (!((k |
								0) < (v | 0))) {
							b = 31;
							break c
						}
						n = E + (k * h << 2);
						m = a[g >> 2] + (k << 4);
						y = i << 2;
						D(y % 1 === 0, "memcpy given " + y + " bytes to copy. Problem with quantum=1 corrections perhaps?");
						o = m + y;
						if (n % 4 == m % 4 && y > 8) {
							for (; m % 4 !== 0 && m < o;) p[n++] = p[m++];
							m >>= 2;
							n >>= 2;
							for (y = o >> 2; m < y;) a[n++] = a[m++];
							m <<= 2;
							n <<= 2
						}
						for (; m < o;) p[n++] = p[m++];
						k += 1
					}
				}
			while (0)
		}
		t = e
	}

	function Bb(a, d) {
		var e;
		e = (a | 0) < (d | 0) ? 1 : 2;
		if (e == 1) var b = a;
		else e == 2 && (b = d);
		return b
	}

	function Zb(c, d, e, b) {
		var f, g, j, l, v, h;
		g = a[c >> 2] + (a[c + 12 >> 2] << 4);
		j = a[c + 8 >> 2];
		v = 0;
		a: for (;;) {
			if (!((v | 0) < 2)) break a;
			f =
				(j + e * 3 | 0) < (b | 0) ? 3 : 11;
			b: do
					if (f == 3) {
						if ((d & 15 | 0) != 0) {
							f = 11;
							break b
						}
						if ((g & 15 | 0) != 0) {
							f = 11;
							break b
						}
						if ((e & 15 | 0) != 0) {
							f = 11;
							break b
						}
						l = 0;
						c: for (;;) {
							if (!((l | 0) < (j | 0))) break c;
							f = l;
							u[g + (l << 3 << 2) >> 2] = u[d + (f << 2) >> 2];
							f += e;
							u[g + ((l << 3) + 1 << 2) >> 2] = u[d + (f << 2) >> 2];
							f += e;
							u[g + ((l << 3) + 2 << 2) >> 2] = u[d + (f << 2) >> 2];
							f += e;
							u[g + ((l << 3) + 3 << 2) >> 2] = u[d + (f << 2) >> 2];
							l += 1
						}
						f = 22;
						break b
					}
				while (0);
			do
				if (f == 11) {
					l = 0;
					c: for (;;) {
						if (!((l | 0) < (j | 0))) {
							f = 21;
							break c
						}
						h = l;
						u[g + (l << 3 << 2) >> 2] = u[d + (h << 2) >> 2];
						h += e;
						f = (h | 0) > (b | 0) ? 14 : 15;
						f != 14 && f == 15 && (u[g + ((l << 3) + 1 <<
							2) >> 2] = u[d + (h << 2) >> 2], h += e, f = (h | 0) > (b | 0) ? 16 : 17, f != 16 && f == 17 && (u[g + ((l << 3) + 2 << 2) >> 2] = u[d + (h << 2) >> 2], h += e, f = (h | 0) > (b | 0) ? 18 : 19, f != 18 && f == 19 && (u[g + ((l << 3) + 3 << 2) >> 2] = u[d + (h << 2) >> 2])));
						l += 1
					}
				}
			while (0);
			g = a[c >> 2] + 16 + (-a[c + 12 >> 2] << 4);
			d += a[c + 8 >> 2] << 2;
			b -= a[c + 8 >> 2];
			j = a[c + 4 >> 2];
			v += 1
		}
	}

	function $b(c, d, e) {
		var b, f;
		b = a[c >> 2] + (a[c + 12 >> 2] << 4);
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (a[c + 8 >> 2] | 0))) break a;
			var g = b + (f << 1 << 4),
				j = d + (f * e << 2);
			D(I, "memcpy given 16 bytes to copy. Problem with quantum=1 corrections perhaps?");
			var l, v;
			l = j + 16;
			if (g %
				4 == j % 4) {
				for (; j % 4 !== 0 && j < l;) p[g++] = p[j++];
				j >>= 2;
				g >>= 2;
				for (v = l >> 2; j < v;) a[g++] = a[j++];
				j <<= 2;
				g <<= 2
			}
			for (; j < l;) p[g++] = p[j++];
			f += 1
		}
		d += a[c + 8 >> 2] * e << 2;
		b = a[c >> 2] + 16 + (-a[c + 12 >> 2] << 4);
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (a[c + 4 >> 2] | 0))) break a;
			g = b + (f << 1 << 4);
			j = d + (f * e << 2);
			D(I, "memcpy given 16 bytes to copy. Problem with quantum=1 corrections perhaps?");
			l = j + 16;
			if (g % 4 == j % 4) {
				for (; j % 4 !== 0 && j < l;) p[g++] = p[j++];
				j >>= 2;
				g >>= 2;
				for (v = l >> 2; j < v;) a[g++] = a[j++];
				j <<= 2;
				g <<= 2
			}
			for (; j < l;) p[g++] = p[j++];
			f += 1
		}
	}

	function ac(a, d, e) {
		var b, f, g, j, l;
		b =
			0;
		a: for (;;) {
			if (!((b | 0) < (d | 0))) break a;
			f = u[a + (b << 3 << 2) >> 2];
			g = u[a + ((b << 3) + 1 << 2) >> 2];
			j = u[a + ((b << 3) + 2 << 2) >> 2];
			l = u[a + ((b << 3) + 3 << 2) >> 2];
			u[a + (b << 3 << 2) >> 2] = f * e;
			u[a + ((b << 3) + 1 << 2) >> 2] = g * e;
			u[a + ((b << 3) + 2 << 2) >> 2] = j * e;
			u[a + ((b << 3) + 3 << 2) >> 2] = l * e;
			b += 1
		}
	}

	function ib(a, d, e, b, f) {
		var g, j, l, v, h, E, m, i, k, n, p, o;
		g = 0;
		a: for (;;) {
			if (!((g | 0) < (b | 0))) break a;
			j = u[a >> 2];
			l = u[a + 4 >> 2];
			v = u[a + 8 >> 2];
			a = u[a + 12 >> 2];
			h = u[d - 16 >> 2];
			E = u[d - 12 >> 2];
			m = u[d - 8 >> 2];
			i = u[d - 4 >> 2];
			k = u[d >> 2];
			n = u[d + 4 >> 2];
			p = u[d + 8 >> 2];
			o = u[d + 12 >> 2];
			u[d - 16 >> 2] = h + (j + k) * f;
			u[d - 12 >> 2] =
				E + (l + n) * f;
			u[d - 8 >> 2] = m + (v + p) * f;
			u[d - 4 >> 2] = i + (a + o) * f;
			a = d;
			d += 32;
			g += 1
		}
		g = (b | 0) < (e | 0) ? 5 : 10;
		do
			if (g == 5) {
				f += f;
				j = u[a >> 2] * f;
				l = u[a + 4 >> 2] * f;
				v = u[a + 8 >> 2] * f;
				h = u[a + 12 >> 2] * f;
				b: for (;;) {
					if (!((b | 0) < (e | 0))) {
						g = 9;
						break b
					}
					E = u[d - 16 >> 2];
					m = u[d - 12 >> 2];
					i = u[d - 8 >> 2];
					k = u[d - 4 >> 2];
					u[d - 16 >> 2] = E + j;
					u[d - 12 >> 2] = m + l;
					u[d - 8 >> 2] = i + v;
					u[d - 4 >> 2] = k + h;
					d += 32;
					b += 1
				}
			}
		while (0)
	}

	function hb(c) {
		var d, e, b;
		d = (a[c + 12 >> 2] | 0) == 0 ? 1 : 5;
		a: do
				if (d == 1) {
					d = (a[c + 4 >> 2] | 0) > 0 ? 4 : 2;
					b: do
							if (d == 2) {
								if ((a[c + 8 >> 2] | 0) > 1) break b;
								d = 10;
								break a
							}
						while (0);
					e = 0;
					b = 1;
					d = 9;
					break a
				} else
			if (d ==
				5) {
				d = (a[c + 8 >> 2] | 0) > 0 ? 8 : 6;
				b: do
						if (d == 6) {
							if ((a[c + 4 >> 2] | 0) > 1) break b;
							d = 10;
							break a
						}
					while (0);
				e = 1;
				b = 0;
				d = 9;
				break a
			}
		while (0);
		d == 9 && (ac(a[c >> 2] + (e << 4), a[c + 8 >> 2], 1.2301740646362305), ac(a[c >> 2] + (b << 4), a[c + 4 >> 2], 1.625732421875), ib(a[c >> 2] + (b << 4), a[c >> 2] + (e << 4) + 16, a[c + 8 >> 2], Bb(a[c + 8 >> 2], a[c + 4 >> 2] - e), -0.4435068666934967), ib(a[c >> 2] + (e << 4), a[c >> 2] + (b << 4) + 16, a[c + 4 >> 2], Bb(a[c + 4 >> 2], a[c + 8 >> 2] - b), -0.8829110860824585), ib(a[c >> 2] + (b << 4), a[c >> 2] + (e << 4) + 16, a[c + 8 >> 2], Bb(a[c + 8 >> 2], a[c + 4 >> 2] - e), 0.05298011749982834), ib(a[c >>
			2] + (e << 4), a[c >> 2] + (b << 4) + 16, a[c + 4 >> 2], Bb(a[c + 4 >> 2], a[c + 8 >> 2] - b), 1.5861343145370483))
	}

	function cd(c, d) {
		var e, b, f;
		e = d;
		b = a[c >> 2] + (a[c + 12 >> 2] << 2);
		f = a[c + 8 >> 2];
		a: for (;;) {
			var g = f;
			f = g - 1;
			if ((g | 0) == 0) break a;
			g = e;
			e = g + 4;
			a[b >> 2] = a[g >> 2];
			b += 8
		}
		e = d + (a[c + 8 >> 2] << 2);
		b = a[c >> 2] + 4 + (-a[c + 12 >> 2] << 2);
		f = a[c + 4 >> 2];
		a: for (;;) {
			g = f;
			f = g - 1;
			if ((g | 0) == 0) break a;
			g = e;
			e = g + 4;
			a[b >> 2] = a[g >> 2];
			b += 8
		}
	}

	function dd(c, d, e) {
		var b, f, g;
		b = d;
		f = a[c >> 2] + (a[c + 12 >> 2] << 2);
		g = a[c + 8 >> 2];
		a: for (;;) {
			var j = g;
			g = j - 1;
			if ((j | 0) == 0) break a;
			a[f >> 2] = a[b >> 2];
			f += 8;
			b += e <<
				2
		}
		b = d + (a[c + 8 >> 2] * e << 2);
		f = a[c >> 2] + 4 + (-a[c + 12 >> 2] << 2);
		g = a[c + 4 >> 2];
		a: for (;;) {
			c = g;
			g = c - 1;
			if ((c | 0) == 0) break a;
			a[f >> 2] = a[b >> 2];
			f += 8;
			b += e << 2
		}
	}

	function fd(c, d, e, b) {
		var f, b = (b | 0) != 0 ? 37 : 1;
		do
			if (b == 37) {
				b = (e | 0) != 0 ? 40 : 38;
				b: do
						if (b == 38) {
							if ((d | 0) != 1) {
								b = 40;
								break b
							}
							a[c >> 2] = (a[c >> 2] | 0) / 2 | 0;
							b = 73;
							break b
						}
					while (0);
				do
					if (b == 40) {
						f = 0;
						c: for (;;) {
							if (!((f | 0) < (e | 0))) {
								b = 56;
								break c
							}
							b = (f | 0) < 0 ? 43 : 44;
							if (b == 43) var g = a[c >> 2];
							else if (b == 44) {
								b = (f | 0) >= (d | 0) ? 45 : 46;
								if (b == 45) var j = a[c + (d - 1 << 1 << 2) >> 2];
								else b == 46 && (j = a[c + (f << 1 << 2) >> 2]);
								g = j
							}
							b =
								(f + 1 | 0) < 0 ? 49 : 50;
							if (b == 49) var l = a[c >> 2];
							else if (b == 50) {
								b = (f + 1 | 0) >= (d | 0) ? 51 : 52;
								if (b == 51) var v = a[c + (d - 1 << 1 << 2) >> 2];
								else b == 52 && (v = a[c + (f + 1 << 1 << 2) >> 2]);
								l = v
							}
							a[c + ((f << 1) + 1 << 2) >> 2] -= l + (g + 2) >> 2;
							f += 1
						}
						f = 0;
						c: for (;;) {
							if (!((f | 0) < (d | 0))) {
								b = 72;
								break c
							}
							b = (f | 0) < 0 ? 59 : 60;
							if (b == 59) var h = a[c + 4 >> 2];
							else if (b == 60) {
								b = (f | 0) >= (e | 0) ? 61 : 62;
								if (b == 61) var E = a[c + ((e - 1 << 1) + 1 << 2) >> 2];
								else b == 62 && (E = a[c + ((f << 1) + 1 << 2) >> 2]);
								h = E
							}
							b = (f - 1 | 0) < 0 ? 65 : 66;
							if (b == 65) var m = a[c + 4 >> 2];
							else if (b == 66) {
								b = (f - 1 | 0) >= (e | 0) ? 67 : 68;
								if (b == 67) var i = a[c + ((e - 1 <<
									1) + 1 << 2) >> 2];
								else b == 68 && (i = a[c + ((f - 1 << 1) + 1 << 2) >> 2]);
								m = i
							}
							a[c + (f << 1 << 2) >> 2] += h + m >> 1;
							f += 1
						}
					}
				while (0)
			} else if (b == 1) {
			b = (d | 0) > 0 ? 3 : 2;
			b: do
					if (b == 2) {
						b = (e | 0) > 1 ? 3 : 36;
						break b
					}
				while (0);
			do
				if (b == 3) {
					f = 0;
					c: for (;;) {
						if (!((f | 0) < (e | 0))) {
							b = 19;
							break c
						}
						b = (f - 1 | 0) < 0 ? 6 : 7;
						if (b == 6) var k = a[c + 4 >> 2];
						else if (b == 7) {
							b = (f - 1 | 0) >= (d | 0) ? 8 : 9;
							if (b == 8) var n = a[c + ((d - 1 << 1) + 1 << 2) >> 2];
							else b == 9 && (n = a[c + ((f - 1 << 1) + 1 << 2) >> 2]);
							k = n
						}
						b = (f | 0) < 0 ? 12 : 13;
						if (b == 12) var p = a[c + 4 >> 2];
						else if (b == 13) {
							b = (f | 0) >= (d | 0) ? 14 : 15;
							if (b == 14) var o = a[c + ((d - 1 << 1) + 1 << 2) >> 2];
							else b == 15 && (o = a[c + ((f << 1) + 1 << 2) >> 2]);
							p = o
						}
						a[c + (f << 1 << 2) >> 2] -= p + (k + 2) >> 2;
						f += 1
					}
					f = 0;
					c: for (;;) {
						if (!((f | 0) < (d | 0))) {
							b = 35;
							break c
						}
						b = (f | 0) < 0 ? 22 : 23;
						if (b == 22) var L = a[c >> 2];
						else if (b == 23) {
							b = (f | 0) >= (e | 0) ? 24 : 25;
							if (b == 24) var w = a[c + (e - 1 << 1 << 2) >> 2];
							else b == 25 && (w = a[c + (f << 1 << 2) >> 2]);
							L = w
						}
						b = (f + 1 | 0) < 0 ? 28 : 29;
						if (b == 28) var r = a[c >> 2];
						else if (b == 29) {
							b = (f + 1 | 0) >= (e | 0) ? 30 : 31;
							if (b == 30) var x = a[c + (e - 1 << 1 << 2) >> 2];
							else b == 31 && (x = a[c + (f + 1 << 1 << 2) >> 2]);
							r = x
						}
						a[c + ((f << 1) + 1 << 2) >> 2] += L + r >> 1;
						f += 1
					}
				}
			while (0)
		} while (0)
	}

	function bc(c, d, e) {
		if (((c |
				0) != 0 ? 1 : 2) == 1) a[c >> 2] = d, a[c + 4 >> 2] = e
	}

	function F(c, d, e) {
		var b = t;
		t += 516;
		D(t < X);
		var f, g, j, l, v = b + 4;
		j = 0;
		l = a[c >> 2];
		f = (l | 0) != 0 ? 1 : 9;
		do
			if (f == 1) {
				f = d == 1 ? 2 : d == 2 ? 3 : d == 4 ? 4 : 5;
				f != 5 && (f == 2 ? j = a[l >> 2] : f == 3 ? j = a[l + 4 >> 2] : f == 4 && (j = a[l + 8 >> 2]));
				f = (j | 0) == 0 ? 7 : 8;
				do
					if (f == 7) g = 0;
					else if (f == 8) {
					f = (e | 0) != 0 ? 11 : 16;
					c: do
							if (f == 11) {
								if ((l | 0) == 0) {
									f = 16;
									break c
								}
								var h, i;
								f = v;
								g = f + 512;
								i = 0;
								i < 0 && (i += 256);
								for (i = i + (i << 8) + (i << 16) + i * 16777216; f % 4 !== 0 && f < g;) p[f++] = 0;
								f >>= 2;
								for (h = g >> 2; f < h;) a[f++] = i;
								for (f <<= 2; f < g;) p[f++] = 0;
								a[b >> 2] = arguments[F.length];
								f =
									xa(e) >>> 0 > 512 ? 13 : 14;
								gi(v, e, a[b >> 2]);
								za[j](v, a[c + 4 >> 2])
							}
						while (0);
					g = 1
				} while (0)
			} else f == 9 && (g = 0); while (0);
		t = b;
		return g
	}

	function gd(c) {
		var d, e, b, f, g, j, l, v;
		j = 0;
		l = a[c + 64 >> 2];
		v = a[c + 72 >> 2];
		r(v, 2);
		e = r(v, 2);
		d = (a[l + 80 >> 2] | 0) == 0 ? 1 : 2;
		do
			if (d == 1) a[a[l + 76 >> 2] + (a[l + 80 >> 2] << 2) >> 2] = e, a[l + 80 >> 2] += 1;
			else if (d == 2) {
			b = 0;
			b: for (;;) {
				(b | 0) < (a[l + 80 >> 2] | 0) ? d = 4: (f = 0, d = 5);
				d == 4 && (f = (j << 24 >> 24 | 0) == 0);
				if (!f) break b;
				j = ((a[a[l + 76 >> 2] + (b << 2) >> 2] | 0) == (e | 0) ? 1 : 0) & 255;
				b += 1
			}
			d = (j << 24 >> 24 | 0) == 0 ? 8 : 9;
			d == 8 && (a[a[l + 76 >> 2] + (a[l + 80 >> 2] << 2) >> 2] = e,
				a[l + 80 >> 2] += 1)
		} while (0);
		b = r(v, 4);
		((b | 0) != 0 ? 12 : 11) == 11 && (b = Ha(v) + 8);
		f = r(v, 1);
		g = r(v, 1);
		a[c + 8 >> 2] = e;
		a[c + 16 >> 2] = f;
		a[c + 32 >> 2] = a[v + 24 >> 2] - 12 + b;
		a[c + 4 >> 2] = 16;
		j = a[l + 108 >> 2] + a[c + 8 >> 2] * 5588;
		d = (a[c + 68 >> 2] | 0) != 0 ? 13 : 22;
		d == 13 && (d = (a[j >> 2] | 0) != 0 ? 14 : 20, d == 14 ? (((e | 0) == 0 ? 15 : 16) == 15 && (a[a[c + 68 >> 2] + 80 >> 2] = R(v) - 13), a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 4 >> 2] = e, a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 8 >> 2] = R(v) - 12, a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 16 >> 2] = a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 8 >> 2] + b - 1, a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 564 >> 2] = g, d = (g | 0) != 0 ? 17 : 18,
			d == 17 ? (d = z(g * 20), a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 568 >> 2] = d) : d == 18 && (d = z(200), a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 568 >> 2] = d)) : d == 20 && (a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 16 >> 2] += b), a[a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 568 >> 2] + f * 20 >> 2] = R(v) - 12, a[a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 568 >> 2] + f * 20 + 8 >> 2] = a[a[a[a[c + 68 >> 2] + 88 >> 2] + e * 572 + 568 >> 2] + f * 20 >> 2] + b - 1);
		d = (a[j >> 2] | 0) == 1 ? 23 : 28;
		do
			if (d == 23) {
				b = a[j + 5584 >> 2];
				v = j;
				e = a[c + 56 >> 2];
				D(I, "memcpy given 5588 bytes to copy. Problem with quantum=1 corrections perhaps?");
				f = e + 5588;
				if (v % 4 == e % 4) {
					for (; e % 4 !==
						0 && e < f;) p[v++] = p[e++];
					e >>= 2;
					v >>= 2;
					for (g = f >> 2; e < g;) a[v++] = a[e++];
					e <<= 2;
					v <<= 2
				}
				for (; e < f;) p[v++] = p[e++];
				a[j + 5172 >> 2] = 0;
				a[j + 5164 >> 2] = 0;
				a[j + 5168 >> 2] = 0;
				a[j + 5584 >> 2] = b;
				b = 0;
				b: for (;;) {
					if (!((b | 0) < (a[a[c + 60 >> 2] + 16 >> 2] | 0))) {
						d = 27;
						break b
					}
					v = a[j + 5584 >> 2] + b * 1076;
					e = a[a[c + 56 >> 2] + 5584 >> 2] + b * 1076;
					D(I, "memcpy given 1076 bytes to copy. Problem with quantum=1 corrections perhaps?");
					f = e + 1076;
					if (v % 4 == e % 4) {
						for (; e % 4 !== 0 && e < f;) p[v++] = p[e++];
						e >>= 2;
						v >>= 2;
						for (g = f >> 2; e < g;) a[v++] = a[e++];
						e <<= 2;
						v <<= 2
					}
					for (; e < f;) p[v++] = p[e++];
					b += 1
				}
				a[a[l +
					108 >> 2] + a[c + 8 >> 2] * 5588 >> 2] = 0
			}
		while (0)
	}

	function hd(c) {
		var d, e, b, f, g, j, l;
		b = 0;
		j = a[c + 72 >> 2];
		l = a[c + 8 >> 2];
		d = (a[c + 68 >> 2] | 0) != 0 ? 1 : 4;
		d == 1 && (a[a[a[a[c + 68 >> 2] + 88 >> 2] + a[c + 8 >> 2] * 572 + 568 >> 2] + a[c + 16 >> 2] * 20 + 4 >> 2] = R(j) + a[c + 44 >> 2] - 1, d = (a[c + 16 >> 2] | 0) == 0 ? 2 : 3, d == 2 && (a[a[a[c + 68 >> 2] + 88 >> 2] + a[c + 8 >> 2] * 572 + 12 >> 2] = R(j) + a[c + 44 >> 2] - 1), a[a[c + 68 >> 2] + 8 >> 2] = 0);
		e = id(a[c + 32 >> 2] - a[j + 24 >> 2], Ha(j) + 1);
		d = (e | 0) == (Ha(j) + 1 | 0) ? 5 : 6;
		d == 5 && (b = 1);
		f = a[a[c + 48 >> 2] + (l << 2) >> 2];
		f = jb(f, a[a[c + 52 >> 2] + (l << 2) >> 2] + e);
		g = f + a[a[c + 52 >> 2] + (l << 2) >> 2];
		d = 0;
		a: for (;;) {
			if (!((d |
					0) < (e | 0))) break a;
			var v = r(j, 1);
			p[g + d] = v & 255;
			d += 1
		}
		a[a[c + 52 >> 2] + (l << 2) >> 2] += e;
		a[a[c + 48 >> 2] + (l << 2) >> 2] = f;
		d = (b | 0) != 0 ? 12 : 11;
		d == 12 ? a[c + 4 >> 2] = 64 : d == 11 && (a[c + 4 >> 2] = 8);
		a[c + 16 >> 2] += 1
	}

	function kb(c) {
		var d, e, b, f, g;
		d = (a[a[c + 64 >> 2] + 44 >> 2] | 0) != 2 ? 1 : 8;
		do
			if (d == 1) {
				f = a[c >> 2];
				b = e = g = H;
				b = z(56);
				g = (b | 0) != 0 ? 2 : 1;
				g == 2 ? (a[b + 20 >> 2] = f, f = z(12), a[b + 24 >> 2] = f, g = (a[b + 24 >> 2] | 0) != 0 ? 4 : 3, g == 4 ? e = b : g == 3 && (e = 0)) : g == 1 && (e = 0);
				g = e;
				jd(g, a[c + 60 >> 2], a[c + 64 >> 2]);
				e = 0;
				b: for (;;) {
					if (!((e | 0) < (a[a[c + 64 >> 2] + 80 >> 2] | 0))) {
						d = 7;
						break b
					}
					kd(g, a[c + 60 >> 2], a[c +
						64 >> 2], e);
					b = a[a[a[c + 64 >> 2] + 76 >> 2] + (e << 2) >> 2];
					f = ld(g, a[a[c + 48 >> 2] + (b << 2) >> 2], a[a[c + 52 >> 2] + (b << 2) >> 2], b, a[c + 68 >> 2]);
					a[a[c + 48 >> 2] + (b << 2) >> 2] = 0;
					if ((f | 0) == 0) {
						d = 4;
						break b
					}
					e += 1
				}
				d == 4 && (a[c + 4 >> 2] |= 128)
			} else if (d == 8) {
			e = 0;
			b: for (;;) {
				if (!((e | 0) < (a[a[c + 64 >> 2] + 80 >> 2] | 0))) {
					d = 12;
					break b
				}
				b = a[a[a[c + 64 >> 2] + 76 >> 2] + (e << 2) >> 2];
				a[a[c + 48 >> 2] + (b << 2) >> 2] = 0;
				e += 1
			}
		} while (0);
		d = (a[c + 4 >> 2] & 128 | 0) != 0 ? 14 : 15;
		d == 14 ? a[c + 4 >> 2] = 160 : d == 15 && (a[c + 4 >> 2] = 32)
	}

	function md(c) {
		var d, e, b, f, g;
		e = a[c + 72 >> 2];
		b = a[c + 60 >> 2];
		f = a[c + 64 >> 2];
		r(e, 2);
		r(e, 2);
		d =
			r(e, 4);
		a[b + 8 >> 2] = d;
		d = r(e, 4);
		a[b + 12 >> 2] = d;
		d = r(e, 4);
		a[b >> 2] = d;
		d = r(e, 4);
		a[b + 4 >> 2] = d;
		d = r(e, 4);
		a[f + 56 >> 2] = d;
		d = r(e, 4);
		a[f + 60 >> 2] = d;
		d = r(e, 4);
		a[f + 48 >> 2] = d;
		d = r(e, 4);
		a[f + 52 >> 2] = d;
		d = (a[b >> 2] | 0) < 0 ? 4 : 1;
		a: do
				if (d == 1) {
					if ((a[b + 8 >> 2] | 0) < 0) {
						d = 4;
						break a
					}
					if ((a[b + 4 >> 2] | 0) < 0) {
						d = 4;
						break a
					}
					if ((a[b + 12 >> 2] | 0) < 0) {
						d = 4;
						break a
					}
					d = r(e, 2);
					a[b + 16 >> 2] = d;
					d = ba(a[b + 16 >> 2], 48);
					a[b + 24 >> 2] = d;
					d = 0;
					b: for (;;) {
						if (!((d | 0) < (a[b + 16 >> 2] | 0))) break b;
						g = r(e, 1);
						a[a[b + 24 >> 2] + d * 48 + 24 >> 2] = (g & 127) + 1;
						a[a[b + 24 >> 2] + d * 48 + 32 >> 2] = g >> 7;
						g = r(e, 1);
						a[a[b + 24 >> 2] + d *
							48 >> 2] = g;
						g = r(e, 1);
						a[a[b + 24 >> 2] + d * 48 + 4 >> 2] = g;
						a[a[b + 24 >> 2] + d * 48 + 36 >> 2] = 0;
						a[a[b + 24 >> 2] + d * 48 + 40 >> 2] = a[f + 36 >> 2];
						d += 1
					}
					a[f + 68 >> 2] = (a[b + 8 >> 2] - a[f + 48 >> 2] + a[f + 56 >> 2] - 1 | 0) / (a[f + 56 >> 2] | 0) | 0;
					a[f + 72 >> 2] = (a[b + 12 >> 2] - a[f + 52 >> 2] + a[f + 60 >> 2] - 1 | 0) / (a[f + 60 >> 2] | 0) | 0;
					e = ba(a[f + 68 >> 2] * a[f + 72 >> 2], 5588);
					a[f + 108 >> 2] = e;
					e = z(a[f + 68 >> 2] * a[f + 72 >> 2] << 2);
					a[f + 76 >> 2] = e;
					d = a[f + 80 >> 2] = 0;
					b: for (;;) {
						if (!((d | 0) < (a[f + 68 >> 2] * a[f + 72 >> 2] | 0))) break b;
						a[a[f + 108 >> 2] + d * 5588 + 424 >> 2] = 0;
						a[a[f + 108 >> 2] + d * 5588 + 420 >> 2] = 0;
						a[a[f + 108 >> 2] + d * 5588 >> 2] = 1;
						d += 1
					}
					a[f +
						92 >> 2] = 0;
					a[f + 84 >> 2] = 0;
					a[f + 88 >> 2] = 0;
					a[f + 100 >> 2] = 0;
					a[f + 96 >> 2] = 0;
					e = ba(a[b + 16 >> 2], 1076);
					a[a[c + 56 >> 2] + 5584 >> 2] = e;
					d = 0;
					b: for (;;) {
						if (!((d | 0) < (a[f + 68 >> 2] * a[f + 72 >> 2] | 0))) break b;
						e = z(a[b + 16 >> 2] * 1076);
						a[a[f + 108 >> 2] + d * 5588 + 5584 >> 2] = e;
						d += 1
					}
					e = ba(a[f + 68 >> 2] * a[f + 72 >> 2], 4);
					a[c + 48 >> 2] = e;
					e = ba(a[f + 68 >> 2] * a[f + 72 >> 2], 4);
					a[c + 52 >> 2] = e;
					a[c + 4 >> 2] = 4;
					if ((a[c + 68 >> 2] | 0) == 0) {
						d = 19;
						break a
					}
					e = a[c + 68 >> 2];
					a[e + 16 >> 2] = a[b + 8 >> 2] - a[b >> 2];
					a[e + 20 >> 2] = a[b + 12 >> 2] - a[b + 4 >> 2];
					a[e + 52 >> 2] = a[b + 16 >> 2];
					a[e + 44 >> 2] = a[f + 68 >> 2];
					a[e + 48 >> 2] = a[f + 72 >> 2];
					a[e +
						28 >> 2] = a[f + 56 >> 2];
					a[e + 32 >> 2] = a[f + 60 >> 2];
					a[e + 36 >> 2] = a[f + 48 >> 2];
					a[e + 40 >> 2] = a[f + 52 >> 2];
					f = ba(a[f + 68 >> 2] * a[f + 72 >> 2], 572);
					a[e + 88 >> 2] = f;
					d = 19;
					break a
				}
			while (0);
		d == 4 && F(a[c >> 2], 1, nd, h([a[b >> 2], 0, 0, 0, a[b + 8 >> 2], 0, 0, 0, a[b + 4 >> 2], 0, 0, 0, a[b + 12 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n))
	}

	function od(c) {
		var d, e, b, f, g;
		b = a[c + 72 >> 2];
		f = a[c + 64 >> 2];
		d = (a[c + 4 >> 2] | 0) == 16 ? 1 : 2;
		d == 1 ? g = a[f + 108 >> 2] + a[c + 8 >> 2] * 5588 : d == 2 && (g = a[c + 56 >> 2]);
		f = g;
		g = a[c + 60 >> 2];
		r(b, 2);
		d = r(b, 1);
		a[f + 4 >> 2] = d;
		d = r(b, 1);
		a[f + 8 >> 2] = d;
		d = r(b, 2);
		a[f + 12 >> 2] = d;
		d = r(b, 1);
		a[f + 16 >> 2] = d;
		d = R(b);
		e = 0;
		a: for (;;) {
			if (!((e | 0) < (a[g + 16 >> 2] | 0))) break a;
			a[a[f + 5584 >> 2] + e * 1076 >> 2] = a[f + 4 >> 2] & 1;
			ya(b, d);
			cc(c, e);
			e += 1
		}
		d = (a[c + 68 >> 2] | 0) != 0 ? 8 : 13;
		do
			if (d == 8) {
				b = a[c + 68 >> 2];
				a[b + 24 >> 2] = a[f + 8 >> 2];
				a[b + 56 >> 2] = a[f + 12 >> 2];
				e = z(a[g + 16 >> 2] << 2);
				a[b + 60 >> 2] = e;
				e = 0;
				b: for (;;) {
					if (!((e | 0) < (a[g + 16 >> 2] | 0))) {
						d = 12;
						break b
					}
					a[a[b + 60 >> 2] + (e << 2) >> 2] = a[a[f + 5584 >> 2] + e * 1076 + 4 >> 2] - 1;
					e += 1
				}
			}
		while (0)
	}

	function pd(c) {
		var d, e, b;
		e = a[c + 64 >> 2];
		d = (a[c + 4 >> 2] | 0) == 16 ? 1 : 2;
		d == 1 ? b = a[e + 108 >> 2] + a[c + 8 >> 2] * 5588 : d == 2 &&
			(b = a[c + 56 >> 2]);
		d = b;
		e = a[c + 60 >> 2];
		b = a[c + 72 >> 2];
		r(b, 2);
		e = r(b, (a[e + 16 >> 2] | 0) <= 256 ? 1 : 2);
		b = r(b, 1);
		a[a[d + 5584 >> 2] + e * 1076 >> 2] = b;
		cc(c, e)
	}

	function qd(c) {
		var d, e;
		e = a[c + 64 >> 2];
		d = (a[c + 4 >> 2] | 0) == 16 ? 1 : 2;
		if (d == 1) var b = a[e + 108 >> 2] + a[c + 8 >> 2] * 5588;
		else d == 2 && (b = a[c + 56 >> 2]);
		d = b;
		e = a[c + 72 >> 2];
		c = a[a[c + 60 >> 2] + 16 >> 2];
		r(e, 2);
		c = r(e, (c | 0) <= 256 ? 1 : 2);
		r(e, 1);
		e = r(e, 1);
		a[a[d + 5584 >> 2] + c * 1076 + 808 >> 2] = e
	}

	function rd(c) {
		var d, e, b, f, g, j;
		f = a[a[c + 60 >> 2] + 16 >> 2];
		g = a[c + 64 >> 2];
		d = (a[c + 4 >> 2] | 0) == 16 ? 1 : 2;
		d == 1 ? b = a[g + 108 >> 2] + a[c + 8 >> 2] * 5588 : d == 2 &&
			(b = a[c + 56 >> 2]);
		g = b;
		c = a[c + 72 >> 2];
		d = (a[g + 424 >> 2] | 0) != 0 ? 4 : 5;
		d == 4 ? e = a[g + 420 >> 2] + 1 : d == 5 && (e = 0);
		b = e;
		a[g + 424 >> 2] = 1;
		d = (r(c, 2) - 2 | 0) / ((((f | 0) <= 256 ? 1 : 2) << 1) + 5 | 0) | 0;
		e = b;
		a: for (;;) {
			if (!((e | 0) < (d + b | 0))) break a;
			j = g + 428 + e * 148;
			var l = r(c, 1);
			a[j >> 2] = l;
			l = r(c, (f | 0) <= 256 ? 1 : 2);
			a[j + 4 >> 2] = l;
			l = r(c, 2);
			a[j + 8 >> 2] = l;
			l = r(c, 1);
			a[j + 12 >> 2] = l;
			l = r(c, (f | 0) <= 256 ? 1 : 2);
			a[j + 16 >> 2] = id(l, f);
			l = r(c, 1);
			a[j + 36 >> 2] = l;
			e += 1
		}
		a[g + 420 >> 2] = d + b - 1
	}

	function sd(c) {
		var d, e, b, f;
		f = a[c + 72 >> 2];
		d = r(f, 2);
		r(f, 1);
		e = r(f, 1);
		c = (e >> 4 & 1) + (e >> 4 & 2);
		e = e >> 6 & 1;
		d = (d - 4 | 0) / ((e +
			1 << 1) + c | 0) | 0;
		b = 0;
		a: for (;;) {
			if (!((b | 0) < (d | 0))) break a;
			r(f, c);
			r(f, (e | 0) != 0 ? 4 : 2);
			b += 1
		}
	}

	function td(c) {
		var d, e;
		e = a[c + 72 >> 2];
		c = r(e, 2);
		r(e, 1);
		c -= 3;
		a: for (;;) {
			if (!((c | 0) > 0)) break a;
			d = r(e, 4);
			c -= 4;
			b: for (;;) {
				if (!((d | 0) > 0)) break b;
				r(e, 1);
				c -= 1;
				if ((c | 0) <= 0) break b;
				d -= 1
			}
		}
	}

	function ud(c) {
		var d, e, b, f, g, j;
		g = a[c + 64 >> 2];
		j = a[c + 72 >> 2];
		c = r(j, 2);
		a[g + 92 >> 2] = 1;
		e = r(j, 1);
		c -= 3;
		a: for (;;) {
			if (!((c | 0) > 0)) break a;
			d = (a[g + 100 >> 2] | 0) == 0 ? 3 : 4;
			d == 3 ? (f = r(j, 4), c -= 4) : d == 4 && (f = a[g + 100 >> 2]);
			b = a[g + 96 >> 2];
			d = (e | 0) == 0 ? 6 : 7;
			d == 6 ? (d = z(f), a[g + 84 >> 2] =
				d, a[g + 88 >> 2] = a[g + 84 >> 2], a[g + 104 >> 2] = f) : d == 7 && (d = jb(a[g + 84 >> 2], f + a[g + 96 >> 2]), a[g + 84 >> 2] = d, a[g + 88 >> 2] = a[g + 84 >> 2], a[g + 104 >> 2] = f + a[g + 96 >> 2]);
			d = f;
			b: for (;;) {
				if (!((d | 0) > 0)) break b;
				var l = r(j, 1);
				p[a[g + 84 >> 2] + b] = l & 255;
				b += 1;
				c -= 1;
				if ((c | 0) == 0) break b;
				d -= 1
			}
			a[g + 100 >> 2] = d - 1;
			a[g + 96 >> 2] = b
		}
	}

	function vd(c) {
		var d, e, b;
		b = a[a[c + 64 >> 2] + 108 >> 2] + a[c + 8 >> 2] * 5588;
		c = a[c + 72 >> 2];
		e = r(c, 2);
		d = r(c, 1);
		a[b + 5172 >> 2] = 1;
		d = (d | 0) == 0 ? 1 : 2;
		d == 1 ? (d = z(e - 3), a[b + 5164 >> 2] = d, a[b + 5168 >> 2] = a[b + 5164 >> 2], a[b + 5176 >> 2] = 0, a[b + 5180 >> 2] = e - 3) : d == 2 && (d = jb(a[b +
			5164 >> 2], e - 3 + a[b + 5176 >> 2]), a[b + 5164 >> 2] = d, a[b + 5168 >> 2] = a[b + 5164 >> 2], a[b + 5180 >> 2] = e - 3 + a[b + 5176 >> 2]);
		d = a[b + 5176 >> 2];
		e -= 3;
		a: for (;;) {
			if (!((e | 0) > 0)) break a;
			var f = r(c, 1);
			p[a[b + 5164 >> 2] + d] = f & 255;
			d += 1;
			e -= 1
		}
		a[b + 5176 >> 2] = d
	}

	function wd(c) {
		var d, e, b;
		b = ba(1, 76);
		d = (b | 0) != 0 ? 2 : 1;
		d == 2 ? (d = ba(1, 5588), a[b + 56 >> 2] = d, d = (a[b + 56 >> 2] | 0) != 0 ? 4 : 3, d == 4 ? (a[b >> 2] = c, a[b + 48 >> 2] = 0, e = b) : d == 3 && (e = 0)) : d == 1 && (e = 0);
		return e
	}

	function xd(c) {
		var d;
		d = yd;
		a: for (;;) {
			if ((a[d >> 2] | 0) == 0) break a;
			if ((a[d >> 2] | 0) == (c | 0)) break a;
			d += 12
		}
		return d
	}

	function zd(c,
		d) {
		var e, b;
		e = (c | 0) != 0 ? 1 : 3;
		a: do
				if (e == 1) {
					if ((d | 0) == 0) break a;
					b = ba(1, 116);
					a[b + 36 >> 2] = a[d >> 2];
					a[b + 40 >> 2] = a[d + 4 >> 2];
					a[b + 44 >> 2] = a[d + 8220 >> 2];
					a[c + 64 >> 2] = b
				}
			while (0)
	}

	function dc(c, d, e) {
		var b, f, g, j, l;
		g = a[c >> 2];
		a[c + 72 >> 2] = d;
		a[c + 68 >> 2] = e;
		b = (e | 0) != 0 ? 1 : 2;
		if (b == 1) {
			var v, Z;
			j = e + 92;
			Z = 0;
			Z < 0 && (Z += 256);
			for (Z = Z + (Z << 8) + (Z << 16) + Z * 16777216; e % 4 !== 0 && e < j;) p[e++] = 0;
			e >>= 2;
			for (v = j >> 2; e < v;) a[e++] = Z;
			for (e <<= 2; e < j;) p[e++] = 0
		}
		e = ba(1, 36);
		a[c + 60 >> 2] = e;
		a[c + 4 >> 2] = 1;
		a: for (;;) {
			l = r(d, 2);
			if ((l >> 8 | 0) != 255) {
				b = 4;
				break a
			}
			j = xd(l);
			if ((a[c + 4 >> 2] &
					a[j + 4 >> 2] | 0) == 0) {
				b = 6;
				break a
			}
			b = (a[j >> 2] | 0) == 65424 ? 8 : 10;
			do
				if (b == 8 && (a[a[c + 64 >> 2] + 44 >> 2] | 0) == 1) {
					b = 9;
					break a
				}
			while (0);
			b = (a[j + 8 >> 2] | 0) != 0 ? 11 : 12;
			if (b == 11) za[a[j + 8 >> 2]](c);
			if ((a[c + 4 >> 2] & 128 | 0) != 0) {
				b = 13;
				break a
			}
			if ((a[c + 4 >> 2] | 0) == 32) {
				b = 15;
				break a
			}
			if ((a[c + 4 >> 2] | 0) == 64) {
				b = 17;
				break a
			}
		}
		a: do
				if (b == 4) {
					F(g, 1, ec, h([R(d) - 2, 0, 0, 0, l, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
					f = 0;
					b = 24;
					break a
				} else
			if (b == 6) {
				F(g, 1, fc, h([R(d) - 2, 0, 0, 0, l, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
				f = 0;
				b = 24;
				break a
			} else
		if (b == 9) {
			F(g, 4, Ad, h(1, "i32", n));
			f = e;
			b = 24;
			break a
		} else if (b == 13) {
			f = 0;
			b = 24;
			break a
		} else if (b == 15) {
			b = 19;
			break a
		} else if (b == 17) {
			b = 19;
			break a
		}
		while (0);
		b == 19 && (b = (a[c + 4 >> 2] | 0) == 64 ? 20 : 21, b == 20 && kb(c), b = (a[c + 4 >> 2] | 0) != 32 ? 22 : 23, b == 22 && F(g, 2, gc, h(1, "i32", n)), f = e);
		return f
	}

	function Bd(c, d) {
		var e = t;
		t += 28;
		D(t < X);
		var b, f, g, j, l, v;
		l = a[c >> 2];
		a[c + 72 >> 2] = d;
		g = ba(1, 36);
		a[c + 60 >> 2] = g;
		a[c + 4 >> 2] = 1;
		a[e >> 2] = 0;
		a[e + 4 >> 2] = 0;
		a[e + 8 >> 2] = 0;
		a[e + 12 >> 2] = 0;
		a[e + 16 >> 2] = 0;
		a[e + 20 >> 2] = 0;
		a[e + 24 >> 2] = 0;
		hc(l, d, e);
		j = R(d);
		b = (a[e + 8 >> 2] | 0) != 6 ? 1 : 2;
		a: do
				if (b == 1) F(l, 1, Cd, h([a[e + 8 >>
					2], 0, 0, 0], ["i32", 0, 0, 0], n)), f = 0;
				else
			if (b == 2) {
				b: for (;;) {
					if ((Ha(d) | 0) == 0) {
						b = 4;
						break b
					}
					b = (R(d) - j | 0) == (a[e + 20 >> 2] | 0) ? 6 : 9;
					do
						if (b == 6 && (hc(l, d, e), j = R(d), (a[e + 8 >> 2] | 0) != 4)) {
							b = 7;
							break b
						}
					while (0);
					v = r(d, 2);
					if ((v >> 8 | 0) != 255) {
						b = 10;
						break b
					}
					f = xd(v);
					if ((a[c + 4 >> 2] & a[f + 4 >> 2] | 0) == 0) {
						b = 12;
						break b
					}
					b = (a[f + 8 >> 2] | 0) != 0 ? 14 : 15;
					if (b == 14) za[a[f + 8 >> 2]](c);
					if ((a[c + 4 >> 2] | 0) == 32) {
						b = 16;
						break b
					}
					if ((a[c + 4 >> 2] | 0) == 64) {
						b = 18;
						break b
					}
				}
				do
					if (b == 4) {
						kb(c);
						f = g;
						break a
					} else if (b == 7) {
					F(l, 1, Dd, h(1, "i32", n));
					f = 0;
					break a
				} else if (b == 10) {
					F(l, 1,
						ec, h([R(d) - 2, 0, 0, 0, v, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
					f = 0;
					break a
				} else if (b == 12) {
					F(l, 1, fc, h([R(d) - 2, 0, 0, 0, v, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
					f = 0;
					break a
				}
				while (0);b = (a[c + 4 >> 2] | 0) == 64 ? 21 : 22;b == 21 && kb(c);b = (a[c + 4 >> 2] | 0) != 32 ? 23 : 24;b == 23 && F(l, 2, gc, h(1, "i32", n));f = g
			}
		while (0);
		t = e;
		return f
	}

	function id(a, d) {
		var e;
		e = (a | 0) < (d | 0) ? 1 : 2;
		if (e == 1) var b = a;
		else e == 2 && (b = d);
		return b
	}

	function ic(c, d, e) {
		var b, f, g, j, l;
		g = a[c + 64 >> 2];
		b = (a[c + 4 >> 2] | 0) == 16 ? 1 : 2;
		if (b == 1) var v = a[g + 108 >> 2] + a[c + 8 >> 2] * 5588;
		else b == 2 && (v = a[c +
			56 >> 2]);
		d = a[v + 5584 >> 2] + d * 1076;
		c = a[c + 72 >> 2];
		b = r(c, 1);
		a[d + 24 >> 2] = b & 31;
		a[d + 804 >> 2] = b >> 5;
		b = (a[d + 24 >> 2] | 0) == 1 ? 4 : 5;
		if (b == 4) f = 1;
		else if (b == 5) {
			b = (a[d + 24 >> 2] | 0) == 0 ? 6 : 7;
			if (b == 6) var h = e - 1;
			else b == 7 && (h = (e - 1 | 0) / 2 | 0);
			f = h
		}
		e = 0;
		a: for (;;) {
			if (!((e | 0) < (f | 0))) break a;
			b = (a[d + 24 >> 2] | 0) == 0 ? 12 : 13;
			b == 12 ? (j = r(c, 1) >>> 3, l = 0) : b == 13 && (b = r(c, 2), j = b >> 11, l = b & 2047);
			a[d + 28 + (e << 3) >> 2] = j;
			a[d + 28 + (e << 3) + 4 >> 2] = l;
			e += 1
		}
		b = (a[d + 24 >> 2] | 0) == 1 ? 17 : 25;
		do
			if (b == 17) {
				e = 1;
				b: for (;;) {
					if (!((e | 0) < 97)) {
						b = 24;
						break b
					}
					b = (a[d + 28 >> 2] - ((e - 1 | 0) / 3 | 0) | 0) > 0 ? 20 : 21;
					if (b == 20) var i = a[d + 28 >> 2] - ((e - 1 | 0) / 3 | 0);
					else b == 21 && (i = 0);
					a[d + 28 + (e << 3) >> 2] = i;
					a[d + 28 + (e << 3) + 4 >> 2] = a[d + 32 >> 2];
					e += 1
				}
			}
		while (0)
	}

	function cc(c, d) {
		var e, b, f, g, j;
		b = a[c + 64 >> 2];
		e = (a[c + 4 >> 2] | 0) == 16 ? 1 : 2;
		e == 1 ? f = a[b + 108 >> 2] + a[c + 8 >> 2] * 5588 : e == 2 && (f = a[c + 56 >> 2]);
		f = a[f + 5584 >> 2] + d * 1076;
		g = a[c + 72 >> 2];
		e = r(g, 1);
		a[f + 4 >> 2] = e + 1;
		e = (a[b + 36 >> 2] | 0) >= (a[f + 4 >> 2] | 0) ? 4 : 5;
		e == 4 && (F(a[c >> 2], 1, Ed, h([d, 0, 0, 0], ["i32", 0, 0, 0], n)), a[c + 4 >> 2] |= 128);
		e = r(g, 1);
		a[f + 8 >> 2] = e + 2;
		e = r(g, 1);
		a[f + 12 >> 2] = e + 2;
		e = r(g, 1);
		a[f + 16 >> 2] = e;
		e = r(g, 1);
		a[f + 20 >> 2] = e;
		e =
			(a[f >> 2] & 1 | 0) != 0 ? 6 : 11;
		do
			if (e == 6) {
				b = 0;
				b: for (;;) {
					if (!((b | 0) < (a[f + 4 >> 2] | 0))) {
						e = 10;
						break b
					}
					j = r(g, 1);
					a[f + 812 + (b << 2) >> 2] = j & 15;
					a[f + 944 + (b << 2) >> 2] = j >> 4;
					b += 1
				}
			}
		while (0);
		e = (a[c + 68 >> 2] | 0) != 0 ? 12 : 21;
		a: do
				if (e == 12) {
					if ((d | 0) != 0) break a;
					b = 0;
					b: for (;;) {
						if (!((b | 0) < (a[f + 4 >> 2] | 0))) {
							e = 20;
							break b
						}
						e = (a[f >> 2] & 1 | 0) != 0 ? 16 : 17;
						e == 16 ? (a[a[a[c + 68 >> 2] + 88 >> 2] + a[c + 8 >> 2] * 572 + 284 + (b << 2) >> 2] = a[f + 812 + (b << 2) >> 2], a[a[a[c + 68 >> 2] + 88 >> 2] + a[c + 8 >> 2] * 572 + 416 + (b << 2) >> 2] = a[f + 944 + (b << 2) >> 2]) : e == 17 && (a[a[a[c + 68 >> 2] + 88 >> 2] + a[c + 8 >> 2] * 572 + 284 + (b << 2) >>
							2] = 15, a[a[a[c + 68 >> 2] + 88 >> 2] + a[c + 8 >> 2] * 572 + 284 + (b << 2) >> 2] = 15);
						b += 1
					}
				}
			while (0)
	}

	function Oa() {
		var c = t;
		t += 20;
		D(t < X);
		var d = K.L({
			z: ["i32", "i32"]
		});
		a[c + Tb + d[0] >> 2] = 1;
		a[c + Tb + d[1] >> 2] = 2;
		a[c + Ub + d[0] >> 2] = 3;
		a[c + Ub + d[1] >> 2] = 4;
		d = (a[c >> 2] + a[c + 8 >> 2] | 0) + (a[c + 4 >> 2] + a[c + 12 >> 2] | 0) * 1.0E-6;
		t = c;
		return d
	}

	function Fd(c, d, e) {
		var b = t;
		t += 12;
		D(t < X);
		var f, g, j;
		j = a[c >> 2];
		da(j, d, b);
		a: for (;;) {
			f = 1785737832 != (a[b + 4 >> 2] | 0) ? 2 : 7;
			do
				if (f == 2) {
					if ((a[b + 4 >> 2] | 0) == 1785737827) {
						f = 3;
						break a
					}
					ra(d, a[b >> 2] - 8);
					if (T[d + 24 >> 2] >>> 0 >= T[d + 20 >> 2] >>> 0) {
						f = 5;
						break a
					}
					da(j, d, b)
				}
			while (0);
			if (1785737832 == (a[b + 4 >> 2] | 0)) {
				f = 9;
				break a
			}
		}
		a: do
				if (f == 3) F(j, 1, Gd, h(1, "i32", n)), g = 0;
				else
			if (f == 5) g = 0;
			else
		if (f == 9) {
			f = (Hd(c, d) | 0) != 0 ? 11 : 10;
			do
				if (f == 11) {
					g = a[b + 8 >> 2] + a[b >> 2];
					f = (a[c + 20 >> 2] | 0) == 255 ? 12 : 15;
					do
						if (f == 12) {
							f = (Id(c, d) | 0) != 0 ? 14 : 13;
							do
								if (f != 14 && f == 13) {
									g = 0;
									break a
								}
							while (0)
						}
					while (0);
					da(j, d, b);
					c: for (;;) {
						if (!(R(d) >>> 0 < g >>> 0)) {
							f = 34;
							break c
						}
						f = (a[b + 4 >> 2] | 0) == 1668246642 ? 18 : 21;
						f == 18 ? (f = (Jd(c, d, b, e) | 0) != 0 ? 20 : 19, f == 19 && (ya(d, a[b + 8 >> 2] + 8), ra(d, a[b >> 2] - 8)), da(j, d, b)) : f == 21 && (f = (a[b +
							4 >> 2] | 0) == 1667523942 ? 22 : 25, f == 22 ? (f = (Kd(0, d, 0, e) | 0) != 0 ? 24 : 23, f == 23 && (ya(d, a[b + 8 >> 2] + 8), ra(d, a[b >> 2] - 8)), da(j, d, b)) : f == 25 && (f = (a[b + 4 >> 2] | 0) == 1885564018 ? 26 : 29, f == 26 ? (f = (Ld(0, d, 0, e) | 0) != 0 ? 28 : 27, f == 27 && (ya(d, a[b + 8 >> 2] + 8), ra(d, a[b >> 2] - 8)), da(j, d, b)) : f == 29 && (f = (a[b + 4 >> 2] | 0) == 1668112752 ? 30 : 33, f == 30 ? (f = (Md(0, d, 0, e) | 0) != 0 ? 32 : 31, f == 31 && (ya(d, a[b + 8 >> 2] + 8), ra(d, a[b >> 2] - 8)), da(j, d, b)) : f == 33 && (ya(d, a[b + 8 >> 2] + 8), ra(d, a[b >> 2] - 8), da(j, d, b)))))
					}
					ya(d, g);
					g = (U[e + 16] & 255 | 0) == 1 & 1
				} else f == 10 && (g = 0); while (0)
		}
		while (0);
		t = b;
		return g
	}

	function da(c, d, e) {
		var b, f;
		a[e + 8 >> 2] = R(d);
		b = r(d, 4);
		a[e >> 2] = b;
		b = r(d, 4);
		a[e + 4 >> 2] = b;
		b = (a[e >> 2] | 0) == 1 ? 1 : 6;
		a: do
				if (b == 1) {
					b = (r(d, 4) | 0) != 0 ? 2 : 3;
					do
						if (b == 2) {
							F(c, 1, Nd, h(1, "i32", n));
							f = 0;
							b = 10;
							break a
						} else if (b == 3) {
						c = r(d, 4);
						a[e >> 2] = c;
						b = (a[e >> 2] | 0) == 0 ? 4 : 5;
						b == 4 && (a[e >> 2] = Ha(d) + 12);
						b = 9;
						break a
					} while (0)
				} else
			if (b == 6) {
				b = (a[e >> 2] | 0) == 0 ? 7 : 8;
				b == 7 && (a[e >> 2] = Ha(d) + 8);
				b = 9;
				break a
			}
		while (0);
		b == 9 && (f = 1);
		return f
	}

	function Hd(c, d) {
		var e = t;
		t += 12;
		D(t < X);
		var b, f, g;
		g = a[c >> 2];
		da(g, d, e);
		b = 1768449138 != (a[e + 4 >> 2] | 0) ? 1 : 2;
		b ==
			1 ? (F(g, 1, Od, h(1, "i32", n)), f = 0) : b == 2 && (b = r(d, 4), a[c + 12 >> 2] = b, b = r(d, 4), a[c + 8 >> 2] = b, b = r(d, 2), a[c + 16 >> 2] = b, b = z(a[c + 16 >> 2] * 12), a[c + 68 >> 2] = b, b = r(d, 1), a[c + 20 >> 2] = b, b = r(d, 1), a[c + 24 >> 2] = b, b = r(d, 1), a[c + 28 >> 2] = b, b = r(d, 1), a[c + 32 >> 2] = b, b = (R(d) - a[e + 8 >> 2] | 0) != (a[e >> 2] | 0) ? 3 : 4, b == 3 ? (F(g, 1, Pd, h(1, "i32", n)), f = 0) : b == 4 && (f = 1));
		t = e;
		return f
	}

	function Id(c, d) {
		var e = t;
		t += 12;
		D(t < X);
		var b, f, g;
		g = a[c >> 2];
		da(g, d, e);
		b = 1651532643 != (a[e + 4 >> 2] | 0) ? 1 : 2;
		do
			if (b == 1) F(g, 1, Qd, h(1, "i32", n)), f = 0;
			else if (b == 2) {
			b = 0;
			b: for (;;) {
				if (!(b >>> 0 < T[c +
						16 >> 2] >>> 0)) break b;
				var j = r(d, 1);
				a[a[c + 68 >> 2] + b * 12 + 8 >> 2] = j;
				b += 1
			}
			b = (R(d) - a[e + 8 >> 2] | 0) != (a[e >> 2] | 0) ? 7 : 8;
			b == 7 ? (F(g, 1, Rd, h(1, "i32", n)), f = 0) : b == 8 && (f = 1)
		} while (0);
		t = e;
		return f
	}

	function Sd(c) {
		var d;
		d = (a[c + 12 >> 2] | 0) != 0 ? 1 : 2;
		d == 1 && jc(c);
		d = (a[c + 8 >> 2] | 0) != 0 ? 3 : 6
	}

	function Jd(c, d, e, b) {
		var f, g, j, l, v;
		f = p[b + 16] << 24 >> 24 != 0 ? 1 : 2;
		a: do
				if (f == 1) g = 0;
				else
			if (f == 2) {
				l = a[c >> 2];
				f = r(d, 1);
				a[c + 36 >> 2] = f;
				f = r(d, 1);
				a[c + 48 >> 2] = f;
				f = r(d, 1);
				a[c + 40 >> 2] = f;
				f = (a[c + 36 >> 2] | 0) == 1 ? 3 : 4;
				do
					if (f == 3) j = r(d, 4), a[c + 44 >> 2] = j;
					else if (f == 4) {
					j = a[e + 8 >> 2] + a[e >>
						2] - R(d);
					f = (j | 0) < 0 ? 5 : 6;
					do
						if (f == 5) {
							F(l, 1, Td, h(1, "i32", n));
							g = 0;
							break a
						} else if (f == 6 && (f = (j | 0) > 0 ? 7 : 8, f == 7)) {
						v = a[d + 24 >> 2];
						var Z = z(j);
						a[b >> 2] = Z;
						a[b + 4 >> 2] = j;
						ra(d, a[e + 8 >> 2] + a[e >> 2] - R(d));
						var i = a[b >> 2],
							Z = v;
						v = j;
						D(v % 1 === 0, "memcpy given " + v + " bytes to copy. Problem with quantum=1 corrections perhaps?");
						var m;
						m = Z + v;
						if (i % 4 == Z % 4 && v > 8) {
							for (; Z % 4 !== 0 && Z < m;) p[i++] = p[Z++];
							Z >>= 2;
							i >>= 2;
							for (v = m >> 2; Z < v;) a[i++] = a[Z++];
							Z <<= 2;
							i <<= 2
						}
						for (; Z < m;) p[i++] = p[Z++]
					} while (0)
				} while (0);
				f = (R(d) - a[e + 8 >> 2] | 0) != (a[e >> 2] | 0) ? 10 : 11;
				f == 10 ? (F(l,
					1, Ud, h(1, "i32", n)), g = 0) : f == 11 && (g = p[b + 16] = 1)
			}
		while (0);
		return g
	}

	function Kd(c, d, e, b) {
		var f, g, e = (a[b + 8 >> 2] | 0) != 0 ? 1 : 2;
		do
			if (e == 1) f = 0;
			else if (e == 2) {
			e = r(d, 2);
			c = e & 65535;
			e = (e & 65535 | 0) == 0 ? 3 : 4;
			do
				if (e == 3) f = 0;
				else if (e == 4) {
				f = z((c & 65535) * 6);
				g = z(8);
				a[b + 8 >> 2] = g;
				a[a[b + 8 >> 2] >> 2] = f;
				q[a[b + 8 >> 2] + 4 >> 1] = c;
				g = 0;
				c: for (;;) {
					if (!((g & 65535 | 0) < (c & 65535 | 0))) {
						e = 8;
						break c
					}
					var j = r(d, 2);
					q[f + (g & 65535) * 6 >> 1] = j & 65535;
					j = r(d, 2);
					q[f + (g & 65535) * 6 + 2 >> 1] = j & 65535;
					j = r(d, 2);
					q[f + (g & 65535) * 6 + 4 >> 1] = j & 65535;
					g += 1
				}
				f = 1
			} while (0)
		} while (0);
		return f
	}

	function Ld(c,
		d, e, b) {
		var f, g, j, l, v, h, c = (a[b + 12 >> 2] | 0) != 0 ? 1 : 2;
		do
			if (c == 1) f = 0;
			else if (c == 2) {
			l = r(d, 2) & 65535;
			v = r(d, 1) & 65535;
			e = z((v & 65535) * (l & 65535) << 2);
			f = z(v & 65535);
			j = z(v & 65535);
			g = z(20);
			a[g + 4 >> 2] = j;
			a[g + 8 >> 2] = f;
			a[g >> 2] = e;
			q[g + 16 >> 1] = l;
			q[g + 18 >> 1] = v;
			a[g + 12 >> 2] = 0;
			a[b + 12 >> 2] = g;
			g = 0;
			b: for (;;) {
				if (!((g & 65535 | 0) < (v & 65535 | 0))) {
					c = 6;
					break b
				}
				h = r(d, 1) & 255;
				p[f + (g & 65535)] = (h & 127) + 1 & 255;
				p[j + (g & 65535)] = ((h & 128 | 0) != 0 ? 1 : 0) & 255;
				g += 1
			}
			j = 0;
			b: for (;;) {
				if (!((j & 65535 | 0) < (l & 65535 | 0))) {
					c = 14;
					break b
				}
				g = 0;
				c: for (;;) {
					if (!((g & 65535 | 0) < (v & 65535 | 0))) {
						c =
							12;
						break c
					}
					h = r(d, (U[f + (g & 65535)] & 255) >> 3);
					var i = e,
						e = i + 4;
					a[i >> 2] = h;
					g += 1
				}
				j += 1
			}
			f = 1
		} while (0);
		return f
	}

	function Md(c, d, e, b) {
		var f, g, c = (a[b + 12 >> 2] | 0) == 0 ? 1 : 2;
		do
			if (c == 1) f = 0;
			else if (c == 2) {
			c = (a[a[b + 12 >> 2] + 12 >> 2] | 0) != 0 ? 3 : 4;
			do
				if (c == 3) f = 0;
				else if (c == 4) {
				g = q[a[b + 12 >> 2] + 18 >> 1];
				f = z((g & 65535) << 2);
				e = 0;
				c: for (;;) {
					if (!((e & 65535 | 0) < (g & 65535 | 0))) {
						c = 8;
						break c
					}
					var j = r(d, 2);
					q[f + ((e & 65535) << 2) >> 1] = j & 65535;
					j = r(d, 1);
					p[f + ((e & 65535) << 2) + 2] = j & 255;
					j = r(d, 1);
					p[f + ((e & 65535) << 2) + 3] = j & 255;
					e += 1
				}
				a[a[b + 12 >> 2] + 12 >> 2] = f;
				f = 1
			} while (0)
		} while (0);
		return f
	}

	function Vd(c, d, e) {
		var b = t;
		t += 20;
		D(t < X);
		var f, g, j, l;
		f = (c | 0) != 0 ? 1 : 2;
		a: do
				if (f == 1) {
					if ((d | 0) == 0) {
						f = 2;
						break a
					}
					var v;
					j = b;
					f = j + 20;
					v = 0;
					v < 0 && (v += 256);
					for (v = v + (v << 8) + (v << 16) + v * 16777216; j % 4 !== 0 && j < f;) p[j++] = 0;
					j >>= 2;
					for (l = f >> 2; j < l;) a[j++] = v;
					for (j <<= 2; j < f;) p[j++] = 0;
					j = a[c >> 2];
					l = c;
					v = d;
					var Z = b,
						i = H;
					f = H;
					var m = l,
						k = v,
						i = t;
					t += 12;
					D(t < X);
					var O = H,
						o = H,
						A = H,
						A = a[m >> 2];
					da(A, k, i);
					O = 1783636E3 != (a[i + 4 >> 2] | 0) ? 1 : 2;
					O == 1 ? (F(A, 1, Wd, h(1, "i32", n)), o = 0) : O == 2 && (O = 218793738 != (r(k, 4) | 0) ? 3 : 4, O == 3 ? (F(A, 1, Xd, h(1, "i32", n)), o = 0) : O == 4 &&
						(O = (R(k) - a[i + 8 >> 2] | 0) != (a[i >> 2] | 0) ? 5 : 6, O == 5 ? (F(A, 1, Yd, h(1, "i32", n)), o = 0) : O == 6 && (o = 1)));
					m = o;
					t = i;
					i = (m | 0) != 0 ? 2 : 1;
					if (i == 2)
						if (i = (Zd(l, v) | 0) != 0 ? 4 : 3, i == 4)
							if (i = (Fd(l, v, Z) | 0) != 0 ? 6 : 5, i == 6) {
								Z = l;
								i = l + 76;
								l += 72;
								m = t;
								t += 12;
								D(t < X);
								O = k = H;
								O = a[Z >> 2];
								da(O, v, m);
								e: for (;;)
									if (k = 1785737827 != (a[m + 4 >> 2] | 0) ? 2 : 3, k == 2 && (ra(v, a[m >> 2] - 8), da(O, v, m)), 1785737827 == (a[m + 4 >> 2] | 0)) break e;
								a[l >> 2] = R(v);
								a[i >> 2] = a[m >> 2] - 8;
								t = m;
								i = 8;
								i == 8 ? f = 1 : i == 7 && (f = 0)
							} else i == 5 && (f = 0);
					else i == 3 && (f = 0);
					else i == 1 && (f = 0);
					f = (f | 0) != 0 ? 5 : 4;
					do
						if (f == 5) {
							l = dc(a[c + 4 >>
								2], d, e);
							f = (l | 0) != 0 ? 7 : 6;
							do
								if (f == 7) {
									f = (a[c + 44 >> 2] | 0) == 16 ? 8 : 9;
									f == 8 ? a[l + 20 >> 2] = 1 : f == 9 && (f = (a[c + 44 >> 2] | 0) == 17 ? 10 : 11, f == 10 ? a[l + 20 >> 2] = 2 : f == 11 && (f = (a[c + 44 >> 2] | 0) == 18 ? 12 : 13, f == 12 ? a[l + 20 >> 2] = 3 : f == 13 && (a[l + 20 >> 2] = -1)));
									f = (a[b + 8 >> 2] | 0) != 0 ? 17 : 18;
									f == 17 && $d(l, b);
									f = (a[b + 12 >> 2] | 0) != 0 ? 19 : 23;
									f == 19 && (f = (a[a[b + 12 >> 2] + 12 >> 2] | 0) != 0 ? 21 : 20, f == 21 ? ae(b, l) : f == 20 && jc(b));
									f = (a[b >> 2] | 0) != 0 ? 24 : 25;
									f == 24 && (a[l + 28 >> 2] = a[b >> 2], a[b >> 2] = 0, a[l + 32 >> 2] = a[b + 4 >> 2]);
									g = l;
									f = 26;
									break a
								} else if (f == 6) {
								Sd(b);
								F(j, 1, be, h(1, "i32", n));
								g = 0;
								f = 26;
								break a
							} while (0)
						} else if (f ==
						4) {
						Sd(b);
						F(j, 1, ce, h(1, "i32", n));
						g = 0;
						f = 26;
						break a
					} while (0)
				}
			while (0);
		f == 2 && (g = 0);
		t = b;
		return g
	}

	function $d(c, d) {
		var e = t;
		t += 48;
		D(t < X);
		var b, f, g, j, l, v;
		f = a[a[d + 8 >> 2] >> 2];
		j = q[a[d + 8 >> 2] + 4 >> 1];
		g = 0;
		a: for (;;) {
			if (!((g & 65535 | 0) < (j & 65535 | 0))) break a;
			v = Aa[f + (g & 65535) * 6 + 4 >> 1];
			b = (Aa[f + (g & 65535) * 6 + 4 >> 1] & 65535 | 0) == 0 ? 3 : 4;
			if (b != 3 && b == 4 && (l = q[f + (g & 65535) * 6 >> 1], v = (v & 65535) - 1 & 65535, b = (l & 65535 | 0) != (v & 65535 | 0) ? 5 : 6, b == 5)) {
				var h = e;
				b = a[c + 24 >> 2] + (l & 65535) * 48;
				D(I, "memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");
				var i, m;
				i = b + 48;
				if (h % 4 == b % 4) {
					for (; b % 4 !== 0 && b < i;) p[h++] = p[b++];
					b >>= 2;
					h >>= 2;
					for (m = i >> 2; b < m;) a[h++] = a[b++];
					b <<= 2;
					h <<= 2
				}
				for (; b < i;) p[h++] = p[b++];
				h = a[c + 24 >> 2] + (l & 65535) * 48;
				b = a[c + 24 >> 2] + (v & 65535) * 48;
				D(I, "memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");
				i = b + 48;
				if (h % 4 == b % 4) {
					for (; b % 4 !== 0 && b < i;) p[h++] = p[b++];
					b >>= 2;
					h >>= 2;
					for (m = i >> 2; b < m;) a[h++] = a[b++];
					b <<= 2;
					h <<= 2
				}
				for (; b < i;) p[h++] = p[b++];
				h = a[c + 24 >> 2] + (v & 65535) * 48;
				b = e;
				D(I, "memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");
				i = b + 48;
				if (h % 4 == b % 4) {
					for (; b % 4 !== 0 && b < i;) p[h++] = p[b++];
					b >>= 2;
					h >>= 2;
					for (m = i >> 2; b < m;) a[h++] = a[b++];
					b <<= 2;
					h <<= 2
				}
				for (; b < i;) p[h++] = p[b++];
				q[f + (g & 65535) * 6 + 4 >> 1] = (l & 65535) + 1 & 65535;
				q[f + (v & 65535) * 6 + 4 >> 1] = (Aa[f + (v & 65535) * 6 >> 1] & 65535) + 1 & 65535
			}
			g += 1
		}
		a[d + 8 >> 2] = 0;
		t = e
	}

	function jc(c) {
		a[c + 12 >> 2] = 0
	}

	function ae(c, d) {
		var e, b, f, g, j, l, v, h, i, m, k, n, o, A;
		g = a[a[c + 12 >> 2] + 8 >> 2];
		j = a[a[c + 12 >> 2] + 4 >> 2];
		l = a[a[c + 12 >> 2] >> 2];
		v = a[a[c + 12 >> 2] + 12 >> 2];
		n = q[a[c + 12 >> 2] + 18 >> 1];
		b = a[d + 24 >> 2];
		f = z((n & 65535) * 48);
		k = 0;
		a: for (;;) {
			if (!((k & 65535 | 0) < (n & 65535 |
					0))) break a;
			o = U[v + ((k & 65535) << 2) + 3] & 255;
			h = q[v + ((k & 65535) << 2) >> 1];
			i = f + (o & 65535) * 48;
			e = b + (h & 65535) * 48;
			D(I, "memcpy given 48 bytes to copy. Problem with quantum=1 corrections perhaps?");
			m = e + 48;
			if (i % 4 == e % 4) {
				for (; e % 4 !== 0 && e < m;) p[i++] = p[e++];
				e >>= 2;
				i >>= 2;
				for (A = m >> 2; e < A;) a[i++] = a[e++];
				e <<= 2;
				i <<= 2
			}
			for (; e < m;) p[i++] = p[e++];
			e = (U[v + ((k & 65535) << 2) + 2] & 255 | 0) == 0 ? 3 : 4;
			e == 3 ? a[b + (h & 65535) * 48 + 44 >> 2] = 0 : e == 4 && (h = z(a[b + (h & 65535) * 48 + 8 >> 2] * a[b + (h & 65535) * 48 + 12 >> 2] << 2), a[f + (o & 65535) * 48 + 44 >> 2] = h, a[f + (o & 65535) * 48 + 24 >> 2] = U[g + (k &
				65535)] & 255, a[f + (o & 65535) * 48 + 32 >> 2] = U[j + (k & 65535)] & 255);
			k += 1
		}
		g = (Aa[a[c + 12 >> 2] + 16 >> 1] & 65535) - 1;
		k = 0;
		a: for (;;) {
			if (!((k & 65535 | 0) < (n & 65535 | 0))) break a;
			e = (U[v + ((k & 65535) << 2) + 2] & 255 | 0) == 0 ? 9 : 10;
			do
				if (e != 9 && e == 10) {
					h = q[v + ((k & 65535) << 2) >> 1];
					o = U[v + ((k & 65535) << 2) + 3] & 255;
					j = a[b + (h & 65535) * 48 + 44 >> 2];
					h = a[f + (o & 65535) * 48 + 44 >> 2];
					m = a[f + (o & 65535) * 48 + 8 >> 2] * a[f + (o & 65535) * 48 + 12 >> 2];
					i = 0;
					c: for (;;) {
						if (!(i >>> 0 < m >>> 0)) {
							e = 19;
							break c
						}
						A = a[j + (i << 2) >> 2];
						e = (a[j + (i << 2) >> 2] | 0) < 0 ? 13 : 14;
						e == 13 ? A = 0 : e == 14 && (e = (A | 0) > (g | 0) ? 15 : 16, e == 15 && (A = g));
						a[h + (i << 2) >> 2] = a[l + (A * (n & 65535) + (o & 65535) << 2) >> 2];
						i += 1
					}
				}
			while (0);
			k += 1
		}
		m = a[d + 16 >> 2];
		k = 0;
		a: for (;;) {
			if (!((k & 65535) >>> 0 < m >>> 0)) break a;
			k += 1
		}
		a[d + 24 >> 2] = f;
		a[d + 16 >> 2] = n & 65535;
		jc(c)
	}

	function Zd(c, d) {
		var e = t;
		t += 12;
		D(t < X);
		var b, f, g;
		g = a[c >> 2];
		da(g, d, e);
		b = 1718909296 != (a[e + 4 >> 2] | 0) ? 1 : 2;
		do
			if (b == 1) F(g, 1, de, h(1, "i32", n)), f = 0;
			else if (b == 2) {
			b = r(d, 4);
			a[c + 52 >> 2] = b;
			b = r(d, 4);
			a[c + 56 >> 2] = b;
			a[c + 60 >> 2] = (a[e >> 2] - 16 | 0) / 4 | 0;
			b = z(a[c + 60 >> 2] << 2);
			a[c + 64 >> 2] = b;
			b = 0;
			b: for (;;) {
				if (!((b | 0) < (a[c + 60 >> 2] | 0))) break b;
				var j = r(d, 4);
				a[a[c + 64 >>
					2] + (b << 2) >> 2] = j;
				b += 1
			}
			b = (R(d) - a[e + 8 >> 2] | 0) != (a[e >> 2] | 0) ? 7 : 8;
			b == 7 ? (F(g, 1, ee, h(1, "i32", n)), f = 0) : b == 8 && (f = 1)
		} while (0);
		t = e;
		return f
	}

	function fe(c, d, e, b) {
		var f, g, j, l;
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (b | 0))) break a;
			g = a[c + (f << 2) >> 2];
			j = a[d + (f << 2) >> 2];
			l = a[e + (f << 2) >> 2];
			g -= j + l >> 2;
			l += g;
			j += g;
			a[c + (f << 2) >> 2] = l;
			a[d + (f << 2) >> 2] = g;
			a[e + (f << 2) >> 2] = j;
			f += 1
		}
	}

	function ge(a, d, e, b) {
		var f, g, j, l, v;
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (b | 0))) break a;
			g = u[a + (f << 2) >> 2];
			j = u[d + (f << 2) >> 2];
			l = u[e + (f << 2) >> 2];
			v = g + l * 1.4019999504089355;
			l = g - j * 0.3441300094127655 -
				l * 0.714139997959137;
			g += j * 1.7719999551773071;
			u[a + (f << 2) >> 2] = v;
			u[d + (f << 2) >> 2] = l;
			u[e + (f << 2) >> 2] = g;
			f += 1
		}
	}

	function Pa(a, d) {
		var e, b;
		e = d;
		b = r(a, 1) & 255;
		a: for (;;) {
			if (((b & 255) >> 7 | 0) != 1) break a;
			e <<= 7;
			e |= b & 127;
			b = r(a, 1) & 255
		}
		e <<= 7;
		e |= b & 127;
		return e
	}

	function hc(c, d, e) {
		var b, f, g, j;
		j = g = 0;
		a[e >> 2] = 0;
		a[e + 4 >> 2] = 0;
		a[e + 16 >> 2] = 0;
		a[e + 20 >> 2] = 0;
		f = r(d, 1) & 255;
		b = (f & 255) >> 5 & 3;
		b = b == 0 ? 1 : b == 1 ? 2 : b == 2 ? 3 : b == 3 ? 4 : 5;
		b != 5 && (b == 1 ? F(c, 1, he, h(1, "i32", n)) : b == 2 ? j = g = 0 : b == 3 ? (g = 1, j = 0) : b == 4 && (j = g = 1));
		(((f & 255) >> 4 & 1 | 0) == 1 ? 7 : 8) == 7 && (a[e + 4 >> 2] = 1);
		a[e >>
			2] |= f & 15;
		if ((((f & 255) >> 7 | 0) == 1 ? 9 : 10) == 9) c = Pa(d, a[e >> 2]), a[e >> 2] = c;
		if (((g & 255 | 0) == 1 ? 11 : 12) == 11) a[e + 8 >> 2] = 0, g = Pa(d, a[e + 8 >> 2]), a[e + 8 >> 2] = g;
		if (((j & 255 | 0) == 1 ? 13 : 14) == 13) a[e + 12 >> 2] = 0, j = Pa(d, a[e + 12 >> 2]), a[e + 12 >> 2] = j;
		j = Pa(d, a[e + 16 >> 2]);
		a[e + 16 >> 2] = j;
		j = Pa(d, a[e + 20 >> 2]);
		a[e + 20 >> 2] = j;
		b = (a[e + 8 >> 2] & 1 | 0) == 1 ? 15 : 16;
		b == 15 && (a[e + 24 >> 2] = 0, d = Pa(d, a[e + 24 >> 2]), a[e + 24 >> 2] = d)
	}

	function ie(c) {
		var d;
		d = 0;
		a: for (;;) {
			if (!((d | 0) < 19)) break a;
			a[c + 24 + (d << 2) >> 2] = i;
			d += 1
		}
	}

	function Qa(c, d, e) {
		a[c + 24 + (d << 2) >> 2] = i + (0 + (e << 1) << 4)
	}

	function je(c,
		d, e) {
		a[c + 100 >> 2] = c + 24;
		a[c + 16 >> 2] = d;
		a[c + 20 >> 2] = d + e;
		a[c + 12 >> 2] = d;
		d = (e | 0) == 0 ? 1 : 2;
		d == 1 ? a[c >> 2] = 16711680 : d == 2 && (a[c >> 2] = (U[a[c + 12 >> 2]] & 255) << 16);
		kc(c);
		a[c >> 2] <<= 7;
		a[c + 8 >> 2] -= 7;
		a[c + 4 >> 2] = 32768
	}

	function kc(c) {
		var d, e;
		d = (a[c + 12 >> 2] | 0) != (a[c + 20 >> 2] | 0) ? 1 : 11;
		d == 1 ? (d = (a[c + 12 >> 2] + 1 | 0) != (a[c + 20 >> 2] | 0) ? 2 : 3, d == 2 ? e = U[a[c + 12 >> 2] + 1] & 255 : d == 3 && (e = 255), d = (U[a[c + 12 >> 2]] & 255 | 0) == 255 ? 5 : 9, d == 5 ? (d = e >>> 0 > 143 ? 6 : 7, d == 6 ? (a[c >> 2] += 65280, a[c + 8 >> 2] = 8) : d == 7 && (a[c + 12 >> 2] += 1, a[c >> 2] += e << 9, a[c + 8 >> 2] = 7)) : d == 9 && (a[c + 12 >> 2] += 1, a[c >> 2] +=
			e << 8, a[c + 8 >> 2] = 8)) : d == 11 && (a[c >> 2] += 65280, a[c + 8 >> 2] = 8)
	}

	function ke(c) {
		var d, e;
		d = T[c + 4 >> 2] >>> 0 < T[a[a[c + 100 >> 2] >> 2] >> 2] >>> 0 ? 1 : 2;
		d == 1 ? (a[c + 4 >> 2] = a[a[a[c + 100 >> 2] >> 2] >> 2], e = a[a[a[c + 100 >> 2] >> 2] + 4 >> 2], a[a[c + 100 >> 2] >> 2] = a[a[a[c + 100 >> 2] >> 2] + 8 >> 2]) : d == 2 && (a[c + 4 >> 2] = a[a[a[c + 100 >> 2] >> 2] >> 2], e = 1 - a[a[a[c + 100 >> 2] >> 2] + 4 >> 2], a[a[c + 100 >> 2] >> 2] = a[a[a[c + 100 >> 2] >> 2] + 12 >> 2]);
		return e
	}

	function le(c) {
		var d;
		a: for (;;)
			if (d = (a[c + 8 >> 2] | 0) == 0 ? 2 : 3, d == 2 && kc(c), a[c + 4 >> 2] <<= 1, a[c >> 2] <<= 1, a[c + 8 >> 2] -= 1, !(T[c + 4 >> 2] >>> 0 < 32768)) break a
	}

	function me(c) {
		var d, e;
		d = T[c + 4 >> 2] >>> 0 < T[a[a[c + 100 >> 2] >> 2] >> 2] >>> 0 ? 1 : 2;
		d == 1 ? (e = 1 - a[a[a[c + 100 >> 2] >> 2] + 4 >> 2], a[a[c + 100 >> 2] >> 2] = a[a[a[c + 100 >> 2] >> 2] + 12 >> 2]) : d == 2 && (e = a[a[a[c + 100 >> 2] >> 2] + 4 >> 2], a[a[c + 100 >> 2] >> 2] = a[a[a[c + 100 >> 2] >> 2] + 8 >> 2]);
		return e
	}

	function lc(c, d) {
		var e;
		e = (c | 0) != 0 ? 1 : 8;
		a: do
				if (e == 1) {
					if ((d | 0) == 0) break a;
					e = a[c + 12 >> 2];
					e = e == 0 ? 3 : e == 1 ? 3 : e == 2 ? 4 : e == -1 ? 5 : 6;
					b: do
							if (e == 3) {
								zd(a[c + 16 >> 2], d);
								e = 7;
								break b
							} else
						if (e == 4) {
							zd(a[a[c + 20 >> 2] + 4 >> 2], d);
							e = 7;
							break b
						} else
					if (e == 5) {
						e = 6;
						break b
					}
					while (0)
				}
			while (0)
	}

	function V(c) {
		var d,
			e;
		a[c + 4 >> 2] -= a[a[a[c + 100 >> 2] >> 2] >> 2];
		d = T[c >> 2] >>> 16 >>> 0 < T[a[a[c + 100 >> 2] >> 2] >> 2] >>> 0 ? 1 : 2;
		d == 1 ? (e = ke(c), le(c)) : d == 2 && (a[c >> 2] -= a[a[a[c + 100 >> 2] >> 2] >> 2] << 16, d = (a[c + 4 >> 2] & 32768 | 0) == 0 ? 3 : 4, d == 3 ? (e = me(c), le(c)) : d == 4 && (e = a[a[a[c + 100 >> 2] >> 2] + 4 >> 2]));
		return e
	}

	function Cb(c) {
		var d, e, b;
		b = ba(1, 28);
		d = (b | 0) != 0 ? 2 : 1;
		a: do
			if (d == 2) {
				a[b + 8 >> 2] = 1;
				d = c;
				d = d == 0 ? 3 : d == 1 ? 3 : d == 2 ? 6 : d == -1 ? 9 : 10;
				b: do
						if (d == 3) {
							d = wd(b);
							a[b + 16 >> 2] = d;
							d = (a[b + 16 >> 2] | 0) != 0 ? 5 : 4;
							do
								if (d == 5) {
									d = 11;
									break b
								} else if (d == 4) {
								e = 0;
								break a
							} while (0)
						} else
					if (d == 6) {
						d = b;
						var f = H,
							g = H,
							j = H,
							j = ba(1, 80),
							f = (j | 0) != 0 ? 1 : 4;
						c: do
								if (f == 1) {
									a[j >> 2] = d;
									f = wd(d);
									a[j + 4 >> 2] = f;
									f = (a[j + 4 >> 2] | 0) == 0 ? 2 : 3;
									do
										if (f == 2) {
											g = 0;
											f = 5;
											break c
										} else if (f == 3) {
										f = 4;
										break c
									} while (0)
								}
							while (0);
						f == 4 && (g = j);
						a[b + 20 >> 2] = g;
						d = (a[b + 20 >> 2] | 0) != 0 ? 8 : 7;
						do
							if (d == 8) {
								d = 11;
								break b
							} else if (d == 7) {
							e = 0;
							break a
						} while (0)
					} else
				if (d == 9) {
					d = 10;
					break b
				}
				while (0);
				d == 10 ? e = 0 : d == 11 && (a[b + 12 >> 2] = c, e = b)
			} else d == 1 && (e = 0); while (0);
		return e
	}

	function Ia(c, d, e) {
		var b, f;
		b = (c | 0) != 0 ? 1 : 9;
		a: do
				if (b == 1) {
					if ((d | 0) == 0) {
						b = 9;
						break a
					}
					b = a[c + 12 >> 2];
					b = b == 0 ? 3 : b ==
						1 ? 4 : b == 2 ? 5 : b == -1 ? 6 : 7;
					do
						if (b == 3) {
							f = dc(a[c + 16 >> 2], d, e);
							b = 10;
							break a
						} else if (b == 4) {
						f = Bd(a[c + 16 >> 2], d);
						b = 10;
						break a
					} else if (b == 5) {
						f = Vd(a[c + 20 >> 2], d, e);
						b = 10;
						break a
					}
					while (0);
					b = 9;
					break a
				}
			while (0);
		b == 9 && (f = 0);
		return f
	}

	function ne(a, d) {
		var e;
		e = (a | 0) > (d | 0) ? 1 : 2;
		if (e == 1) var b = a;
		else e == 2 && (b = d);
		return b
	}

	function na(a, d) {
		var e;
		e = (a | 0) < (d | 0) ? 1 : 2;
		if (e == 1) var b = a;
		else e == 2 && (b = d);
		return b
	}

	function oe(c, d, e) {
		var b, f, g, j, l, v, h, i, m, k, n, p, o, y, L, w, r, x, t, q, s, u, z;
		i = a[d + 108 >> 2] + e * 5588;
		h = ba(a[i + 420 >> 2] + 1, 232);
		b = (h | 0) !=
			0 ? 2 : 1;
		do
			if (b == 2) {
				v = 0;
				b: for (;;) {
					if (!((v | 0) < (a[i + 420 >> 2] + 1 | 0))) {
						b = 39;
						break b
					}
					k = m = 0;
					g = (e | 0) % (a[d + 68 >> 2] | 0);
					j = (e | 0) / (a[d + 68 >> 2] | 0) | 0;
					a[h + v * 232 + 200 >> 2] = ne(a[d + 48 >> 2] + g * a[d + 56 >> 2], a[c >> 2]);
					a[h + v * 232 + 204 >> 2] = ne(a[d + 52 >> 2] + j * a[d + 60 >> 2], a[c + 4 >> 2]);
					a[h + v * 232 + 208 >> 2] = na(a[d + 48 >> 2] + (g + 1) * a[d + 56 >> 2], a[c + 8 >> 2]);
					a[h + v * 232 + 212 >> 2] = na(a[d + 52 >> 2] + (j + 1) * a[d + 60 >> 2], a[c + 12 >> 2]);
					a[h + v * 232 + 192 >> 2] = a[c + 16 >> 2];
					g = ba(a[c + 16 >> 2], 16);
					a[h + v * 232 + 196 >> 2] = g;
					if ((a[h + v * 232 + 196 >> 2] | 0) == 0) {
						b = 5;
						break b
					}
					g = 0;
					c: for (;;) {
						if (!((g | 0) < (a[h +
								192 >> 2] | 0))) break c;
						L = a[h + v * 232 + 196 >> 2] + (g << 4);
						j = a[i + 5584 >> 2] + g * 1076;
						a[L >> 2] = a[a[c + 24 >> 2] + g * 48 >> 2];
						a[L + 4 >> 2] = a[a[c + 24 >> 2] + g * 48 + 4 >> 2];
						a[L + 8 >> 2] = a[j + 4 >> 2];
						l = ba(a[L + 8 >> 2], 16);
						a[L + 12 >> 2] = l;
						if ((a[L + 12 >> 2] | 0) == 0) {
							b = 9;
							break b
						}
						n = S(a[h + 200 >> 2], a[L >> 2]);
						p = S(a[h + 204 >> 2], a[L + 4 >> 2]);
						o = S(a[h + 208 >> 2], a[L >> 2]);
						y = S(a[h + 212 >> 2], a[L + 4 >> 2]);
						b = (a[L + 8 >> 2] | 0) > (m | 0) ? 11 : 12;
						b == 11 && (m = a[L + 8 >> 2]);
						l = 0;
						d: for (;;) {
							if (!((l | 0) < (a[L + 8 >> 2] | 0))) break d;
							z = a[L + 12 >> 2] + (l << 4);
							b = (a[j >> 2] & 1 | 0) != 0 ? 15 : 16;
							b == 15 ? (a[z >> 2] = a[j + 812 + (l << 2) >> 2], a[z +
								4 >> 2] = a[j + 944 + (l << 2) >> 2]) : b == 16 && (a[z >> 2] = 15, a[z + 4 >> 2] = 15);
							w = a[L + 8 >> 2] - 1 - l;
							b = Ra(n, w);
							r = Ra(p, w);
							x = Ra(o, w);
							w = Ra(y, w);
							t = b >> (a[z >> 2] | 0) << a[z >> 2];
							q = r >> (a[z + 4 >> 2] | 0) << a[z + 4 >> 2];
							s = Ra(x, a[z >> 2]) << a[z >> 2];
							u = Ra(w, a[z + 4 >> 2]) << a[z + 4 >> 2];
							b = (b | 0) == (x | 0) ? 18 : 19;
							if (b == 18) var C = 0;
							else b == 19 && (C = s - t >> (a[z >> 2] | 0));
							a[z + 8 >> 2] = C;
							b = (r | 0) == (w | 0) ? 21 : 22;
							if (b == 21) var D = 0;
							else b == 22 && (D = u - q >> (a[z + 4 >> 2] | 0));
							a[z + 12 >> 2] = D;
							b = (a[z + 8 >> 2] * a[z + 12 >> 2] | 0) > (k | 0) ? 24 : 25;
							b == 24 && (k = a[z + 8 >> 2] * a[z + 12 >> 2]);
							l += 1
						}
						g += 1
					}
					a[h + v * 232 + 20 >> 2] = 1;
					a[h + v * 232 +
						16 >> 2] = k * a[h + v * 232 + 20 >> 2];
					a[h + v * 232 + 12 >> 2] = a[c + 16 >> 2] * a[h + v * 232 + 16 >> 2];
					a[h + v * 232 + 8 >> 2] = m * a[h + v * 232 + 12 >> 2];
					b = (v | 0) == 0 ? 30 : 33;
					do
						if (b == 30) {
							if (g = ba(a[c + 16 >> 2] * m * a[i + 12 >> 2] * k, 2), a[h + v * 232 + 4 >> 2] = g, (a[h + v * 232 + 4 >> 2] | 0) == 0) {
								b = 31;
								break b
							}
						} else b == 33 && (a[h + v * 232 + 4 >> 2] = a[h + (v - 1) * 232 + 4 >> 2]); while (0);
					b = (a[i + 424 >> 2] | 0) == 0 ? 35 : 36;
					b == 35 ? (a[h + v * 232 + 40 >> 2] = 1, a[h + v * 232 + 44 >> 2] = 0, a[h + v * 232 + 44 + 4 >> 2] = 0, a[h + v * 232 + 44 + 8 >> 2] = a[i + 12 >> 2], a[h + v * 232 + 44 + 12 >> 2] = m, a[h + v * 232 + 44 + 16 >> 2] = a[c + 16 >> 2], a[h + v * 232 + 44 + 36 >> 2] = a[i + 8 >> 2]) : b == 36 &&
						(a[h + v * 232 + 40 >> 2] = 1, a[h + v * 232 + 44 >> 2] = a[i + 428 + v * 148 >> 2], a[h + v * 232 + 44 + 4 >> 2] = a[i + 428 + v * 148 + 4 >> 2], a[h + v * 232 + 44 + 8 >> 2] = a[i + 428 + v * 148 + 8 >> 2], a[h + v * 232 + 44 + 12 >> 2] = a[i + 428 + v * 148 + 12 >> 2], a[h + v * 232 + 44 + 16 >> 2] = a[i + 428 + v * 148 + 16 >> 2], a[h + v * 232 + 44 + 36 >> 2] = a[i + 428 + v * 148 + 36 >> 2]);
					a[h + v * 232 + 44 + 20 >> 2] = 0;
					a[h + v * 232 + 44 + 24 >> 2] = 0;
					a[h + v * 232 + 44 + 28 >> 2] = k;
					v += 1
				}
				b == 39 ? f = h : b == 5 ? f = 0 : b == 9 ? f = 0 : b == 31 && (f = 0)
			} else b == 1 && (f = 0); while (0);
		return f
	}

	function S(a, d) {
		return (a + d - 1 | 0) / (d | 0) | 0
	}

	function Ra(a, d) {
		return a + (1 << d) - 1 >> (d | 0)
	}

	function pe(c) {
		var d,
			e, b, f, g;
		g = b = 0;
		d = (a[c + 40 >> 2] | 0) != 0 ? 2 : 1;
		a: do
				if (d == 2) {
					a[c + 40 >> 2] = 0;
					a[c + 36 >> 2] = a[c + 64 >> 2];
					d = 4;
					break a
				} else
			if (d == 1) {
				b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
				d = 18;
				break a
			}
		while (0);
		a: for (;;) {
			b: do
				if (d == 4) {
					if (!((a[c + 36 >> 2] | 0) < (a[c + 52 >> 2] | 0))) {
						d = 26;
						break a
					}
					a[c + 28 >> 2] = a[c + 44 >> 2];
					d = 6;
					break b
				}else if(d == 18) {
				a[c + 32 >> 2] += 1;
				d = 14;
				break b
			}
			while (0);b: for (;;) {
				c: do
					if (d == 6) {
						if (!((a[c + 28 >> 2] | 0) < (a[c + 56 >> 2] | 0))) {
							d = 24;
							break b
						}
						a[c + 24 >> 2] = a[c + 48 >> 2];
						d = 8;
						break c
					}else if(d == 14) {
					if ((a[c + 32 >> 2] | 0) < (a[c + 72 >> 2] | 0)) {
						d = 15;
						break b
					}
					d = 21;
					break c
				}
				while (0);
				c: for (;;) {
					do
						if (d == 8) {
							if (!((a[c + 24 >> 2] | 0) < (a[c + 60 >> 2] | 0))) {
								d = 22;
								break c
							}
							b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
							if (!((a[c + 28 >> 2] | 0) >= (a[b + 8 >> 2] | 0))) {
								d = 11;
								break c
							}
							d = 21;
							continue c
						} else if (d == 21) {
						a[c + 24 >> 2] += 1;
						d = 8;
						continue c
					} while (0)
				}
				do
					if (d == 22) {
						a[c + 28 >> 2] += 1;
						d = 6;
						continue b
					} else if (d == 11) {
					f = a[b + 12 >> 2] + (a[c + 28 >> 2] << 4);
					d = p[c] << 24 >> 24 != 0 ? 13 : 12;
					d == 12 && (a[c + 72 >> 2] = a[f + 8 >> 2] * a[f + 12 >> 2]);
					a[c + 32 >> 2] = a[c + 68 >> 2];
					d = 14;
					continue b
				} while (0)
			}
			do
				if (d == 24) {
					a[c + 36 >> 2] += 1;
					d = 4;
					continue a
				} else if (d == 15) {
				g = a[c + 36 >> 2] * a[c + 8 >> 2] + a[c +
					28 >> 2] * a[c + 12 >> 2] + a[c + 24 >> 2] * a[c + 16 >> 2] + a[c + 32 >> 2] * a[c + 20 >> 2];
				if (q[a[c + 4 >> 2] + (g << 1) >> 1] << 16 >> 16 == 0) {
					d = 16;
					break a
				}
				d = 18;
				continue a
			} while (0)
		}
		d == 26 ? e = 0 : d == 16 && (e = q[a[c + 4 >> 2] + (g << 1) >> 1] = 1);
		return e
	}

	function qe(c) {
		var d, e, b, f, g;
		g = b = 0;
		d = (a[c + 40 >> 2] | 0) != 0 ? 2 : 1;
		a: do
				if (d == 2) {
					a[c + 40 >> 2] = 0;
					a[c + 28 >> 2] = a[c + 44 >> 2];
					d = 4;
					break a
				} else
			if (d == 1) {
				b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
				d = 18;
				break a
			}
		while (0);
		a: for (;;) {
			b: do
				if (d == 4) {
					if (!((a[c + 28 >> 2] | 0) < (a[c + 56 >> 2] | 0))) {
						d = 26;
						break a
					}
					a[c + 36 >> 2] = a[c + 64 >> 2];
					d = 6;
					break b
				}else if(d == 18) {
				a[c +
					32 >> 2] += 1;
				d = 14;
				break b
			}
			while (0);b: for (;;) {
				c: do
					if (d == 6) {
						if (!((a[c + 36 >> 2] | 0) < (a[c + 52 >> 2] | 0))) {
							d = 24;
							break b
						}
						a[c + 24 >> 2] = a[c + 48 >> 2];
						d = 8;
						break c
					}else if(d == 14) {
					if ((a[c + 32 >> 2] | 0) < (a[c + 72 >> 2] | 0)) {
						d = 15;
						break b
					}
					d = 21;
					break c
				}
				while (0);c: for (;;) {
					do
						if (d == 8) {
							if (!((a[c + 24 >> 2] | 0) < (a[c + 60 >> 2] | 0))) {
								d = 22;
								break c
							}
							b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
							if (!((a[c + 28 >> 2] | 0) >= (a[b + 8 >> 2] | 0))) {
								d = 11;
								break c
							}
							d = 21;
							continue c
						} else if (d == 21) {
						a[c + 24 >> 2] += 1;
						d = 8;
						continue c
					} while (0)
				}
				do
					if (d == 22) {
						a[c + 36 >> 2] += 1;
						d = 6;
						continue b
					} else if (d == 11) {
					f =
						a[b + 12 >> 2] + (a[c + 28 >> 2] << 4);
					d = p[c] << 24 >> 24 != 0 ? 13 : 12;
					d == 12 && (a[c + 72 >> 2] = a[f + 8 >> 2] * a[f + 12 >> 2]);
					a[c + 32 >> 2] = a[c + 68 >> 2];
					d = 14;
					continue b
				} while (0)
			}
			do
				if (d == 24) {
					a[c + 28 >> 2] += 1;
					d = 4;
					continue a
				} else if (d == 15) {
				g = a[c + 36 >> 2] * a[c + 8 >> 2] + a[c + 28 >> 2] * a[c + 12 >> 2] + a[c + 24 >> 2] * a[c + 16 >> 2] + a[c + 32 >> 2] * a[c + 20 >> 2];
				if (q[a[c + 4 >> 2] + (g << 1) >> 1] << 16 >> 16 == 0) {
					d = 16;
					break a
				}
				d = 18;
				continue a
			} while (0)
		}
		d == 26 ? e = 0 : d == 16 && (e = q[a[c + 4 >> 2] + (g << 1) >> 1] = 1);
		return e
	}

	function re(c) {
		var d, e, b, f, g, j, l, h, i, k, m, n;
		g = f = b = 0;
		d = (a[c + 40 >> 2] | 0) != 0 ? 2 : 1;
		a: do
				if (d ==
					2) {
					a[c + 40 >> 2] = 0;
					a[c + 224 >> 2] = 0;
					j = a[c + 228 >> 2] = 0;
					b: for (;;) {
						if (!((j | 0) < (a[c + 192 >> 2] | 0))) break b;
						b = a[c + 196 >> 2] + (j << 4);
						l = 0;
						c: for (;;) {
							if (!((l | 0) < (a[b + 8 >> 2] | 0))) break c;
							f = a[b + 12 >> 2] + (l << 4);
							h = a[b >> 2] * (1 << a[f >> 2] + a[b + 8 >> 2] - 1 - l);
							i = a[b + 4 >> 2] * (1 << a[f + 4 >> 2] + a[b + 8 >> 2] - 1 - l);
							d = (a[c + 224 >> 2] | 0) != 0 ? 8 : 7;
							if (d == 8) var o = na(a[c + 224 >> 2], h);
							else d == 7 && (o = h);
							a[c + 224 >> 2] = o;
							d = (a[c + 228 >> 2] | 0) != 0 ? 11 : 10;
							if (d == 11) var ia = na(a[c + 228 >> 2], i);
							else d == 10 && (ia = i);
							a[c + 228 >> 2] = ia;
							l += 1
						}
						j += 1
					}
					d = p[c] << 24 >> 24 != 0 ? 19 : 18;
					d == 18 && (a[c + 104 >> 2] = a[c + 204 >>
						2], a[c + 96 >> 2] = a[c + 200 >> 2], a[c + 108 >> 2] = a[c + 212 >> 2], a[c + 100 >> 2] = a[c + 208 >> 2]);
					a[c + 28 >> 2] = a[c + 44 >> 2];
					d = 20;
					break a
				} else
			if (d == 1) {
				d = 48;
				break a
			}
		while (0);
		a: for (;;) {
			b: do
				if (d == 20) {
					if (!((a[c + 28 >> 2] | 0) < (a[c + 56 >> 2] | 0))) {
						d = 58;
						break a
					}
					a[c + 220 >> 2] = a[c + 104 >> 2];
					d = 22;
					break b
				}else if(d == 48) {
				a[c + 36 >> 2] += 1;
				d = 44;
				break b
			}
			while (0);b: for (;;) {
				c: do
					if (d == 22) {
						if (!((a[c + 220 >> 2] | 0) < (a[c + 108 >> 2] | 0))) {
							d = 56;
							break b
						}
						a[c + 216 >> 2] = a[c + 96 >> 2];
						d = 24;
						break c
					}else if(d == 44) {
					if ((a[c + 36 >> 2] | 0) < (a[c + 52 >> 2] | 0)) {
						d = 45;
						break b
					}
					d = 51;
					break c
				}
				while (0);
				c: for (;;) {
					do
						if (d == 24) {
							if (!((a[c + 216 >> 2] | 0) < (a[c + 100 >> 2] | 0))) {
								d = 54;
								break c
							}
							a[c + 24 >> 2] = a[c + 48 >> 2]
						} else d == 51 && (a[c + 24 >> 2] += 1); while (0);
					d = (a[c + 24 >> 2] | 0) < (a[c + 60 >> 2] | 0) ? 27 : 52;
					do
						if (d == 27) {
							b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
							d = (a[c + 28 >> 2] | 0) >= (a[b + 8 >> 2] | 0) ? 28 : 29;
							do
								if (d == 28) {
									d = 51;
									continue c
								} else if (d == 29) {
								f = a[b + 12 >> 2] + (a[c + 28 >> 2] << 4);
								k = a[b + 8 >> 2] - 1 - a[c + 28 >> 2];
								m = S(a[c + 200 >> 2], a[b >> 2] << k);
								n = S(a[c + 204 >> 2], a[b + 4 >> 2] << k);
								j = S(a[c + 208 >> 2], a[b >> 2] << k);
								l = S(a[c + 212 >> 2], a[b + 4 >> 2] << k);
								h = a[f >> 2] + k;
								i = a[f + 4 >> 2] + k;
								d = ((a[c +
									220 >> 2] | 0) % (a[b + 4 >> 2] << i | 0) | 0) == 0 ? 33 : 30;
								f: do
										if (d == 30) {
											d = (a[c + 220 >> 2] | 0) == (a[c + 204 >> 2] | 0) ? 31 : 32;
											do
												if (d == 31 && ((n << k | 0) % (1 << i | 0) | 0) != 0) break f; while (0);
											d = 51;
											continue c
										}
									while (0);
								d = ((a[c + 216 >> 2] | 0) % (a[b >> 2] << h | 0) | 0) == 0 ? 37 : 34;
								f: do
										if (d == 34) {
											d = (a[c + 216 >> 2] | 0) == (a[c + 200 >> 2] | 0) ? 35 : 36;
											do
												if (d == 35 && ((m << k | 0) % (1 << h | 0) | 0) != 0) break f; while (0);
											d = 51;
											continue c
										}
									while (0);
								d = (a[f + 8 >> 2] | 0) == 0 ? 39 : 38;
								f: do
										if (d == 38) {
											if ((a[f + 12 >> 2] | 0) == 0) break f;
											d = (m | 0) == (j | 0) ? 42 : 41;
											do
												if (d == 41 && (n | 0) != (l | 0)) {
													d = 43;
													break c
												}
											while (0);
											d = 51;
											continue c
										}
									while (0);
								d = 51;
								continue c
							} while (0)
						} else if (d == 52) {
						a[c + 216 >> 2] += a[c + 224 >> 2] - (a[c + 216 >> 2] | 0) % (a[c + 224 >> 2] | 0);
						d = 24;
						continue c
					} while (0)
				}
				do
					if (d == 54) {
						a[c + 220 >> 2] += a[c + 228 >> 2] - (a[c + 220 >> 2] | 0) % (a[c + 228 >> 2] | 0);
						d = 22;
						continue b
					} else if (d == 43) {
					d = (S(a[c + 216 >> 2], a[b >> 2] << k) >> (a[f >> 2] | 0)) - (m >> (a[f >> 2] | 0));
					j = (S(a[c + 220 >> 2], a[b + 4 >> 2] << k) >> (a[f + 4 >> 2] | 0)) - (n >> (a[f + 4 >> 2] | 0));
					a[c + 32 >> 2] = d + j * a[f + 8 >> 2];
					a[c + 36 >> 2] = a[c + 64 >> 2];
					d = 44;
					continue b
				} while (0)
			}
			do
				if (d == 56) {
					a[c + 28 >> 2] += 1;
					d = 20;
					continue a
				} else if (d == 45) {
				g =
					a[c + 36 >> 2] * a[c + 8 >> 2] + a[c + 28 >> 2] * a[c + 12 >> 2] + a[c + 24 >> 2] * a[c + 16 >> 2] + a[c + 32 >> 2] * a[c + 20 >> 2];
				if (q[a[c + 4 >> 2] + (g << 1) >> 1] << 16 >> 16 == 0) {
					d = 46;
					break a
				}
				d = 48;
				continue a
			} while (0)
		}
		d == 58 ? e = 0 : d == 46 && (e = q[a[c + 4 >> 2] + (g << 1) >> 1] = 1);
		return e
	}

	function se(c) {
		var d, e, b, f, g, j, l, h, i, k, m, n;
		g = f = b = 0;
		d = (a[c + 40 >> 2] | 0) != 0 ? 2 : 1;
		a: do
				if (d == 2) {
					a[c + 40 >> 2] = 0;
					a[c + 224 >> 2] = 0;
					j = a[c + 228 >> 2] = 0;
					b: for (;;) {
						if (!((j | 0) < (a[c + 192 >> 2] | 0))) break b;
						b = a[c + 196 >> 2] + (j << 4);
						l = 0;
						c: for (;;) {
							if (!((l | 0) < (a[b + 8 >> 2] | 0))) break c;
							f = a[b + 12 >> 2] + (l << 4);
							h = a[b >> 2] * (1 << a[f >>
								2] + a[b + 8 >> 2] - 1 - l);
							i = a[b + 4 >> 2] * (1 << a[f + 4 >> 2] + a[b + 8 >> 2] - 1 - l);
							d = (a[c + 224 >> 2] | 0) != 0 ? 8 : 7;
							if (d == 8) var o = na(a[c + 224 >> 2], h);
							else d == 7 && (o = h);
							a[c + 224 >> 2] = o;
							d = (a[c + 228 >> 2] | 0) != 0 ? 11 : 10;
							if (d == 11) var ia = na(a[c + 228 >> 2], i);
							else d == 10 && (ia = i);
							a[c + 228 >> 2] = ia;
							l += 1
						}
						j += 1
					}
					d = p[c] << 24 >> 24 != 0 ? 19 : 18;
					d == 18 && (a[c + 104 >> 2] = a[c + 204 >> 2], a[c + 96 >> 2] = a[c + 200 >> 2], a[c + 108 >> 2] = a[c + 212 >> 2], a[c + 100 >> 2] = a[c + 208 >> 2]);
					a[c + 220 >> 2] = a[c + 104 >> 2];
					d = 20;
					break a
				} else
			if (d == 1) {
				b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
				d = 46;
				break a
			}
		while (0);
		a: for (;;) {
			b: do
				if (d ==
					20) {
					if (!((a[c + 220 >> 2] | 0) < (a[c + 108 >> 2] | 0))) {
						d = 56;
						break a
					}
					a[c + 216 >> 2] = a[c + 96 >> 2];
					d = 22;
					break b
				}else if(d == 46) {
				a[c + 36 >> 2] += 1;
				d = 42;
				break b
			}
			while (0);b: for (;;) {
				c: do
					if (d == 22) {
						if (!((a[c + 216 >> 2] | 0) < (a[c + 100 >> 2] | 0))) {
							d = 54;
							break b
						}
						a[c + 24 >> 2] = a[c + 48 >> 2];
						d = 24;
						break c
					}else if(d == 42) {
					if ((a[c + 36 >> 2] | 0) < (a[c + 52 >> 2] | 0)) {
						d = 43;
						break b
					}
					d = 49;
					break c
				}
				while (0);c: for (;;) {
					do
						if (d == 24) {
							if (!((a[c + 24 >> 2] | 0) < (a[c + 60 >> 2] | 0))) {
								d = 52;
								break c
							}
							b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
							a[c + 28 >> 2] = a[c + 44 >> 2]
						} else d == 49 && (a[c + 28 >> 2] += 1); while (0);
					d = (a[c + 28 >> 2] | 0) < (na(a[c + 56 >> 2], a[b + 8 >> 2]) | 0) ? 27 : 50;
					do
						if (d == 27) {
							f = a[b + 12 >> 2] + (a[c + 28 >> 2] << 4);
							k = a[b + 8 >> 2] - 1 - a[c + 28 >> 2];
							m = S(a[c + 200 >> 2], a[b >> 2] << k);
							n = S(a[c + 204 >> 2], a[b + 4 >> 2] << k);
							j = S(a[c + 208 >> 2], a[b >> 2] << k);
							l = S(a[c + 212 >> 2], a[b + 4 >> 2] << k);
							h = a[f >> 2] + k;
							i = a[f + 4 >> 2] + k;
							d = ((a[c + 220 >> 2] | 0) % (a[b + 4 >> 2] << i | 0) | 0) == 0 ? 31 : 28;
							e: do
									if (d == 28) {
										d = (a[c + 220 >> 2] | 0) == (a[c + 204 >> 2] | 0) ? 29 : 30;
										do
											if (d == 29 && ((n << k | 0) % (1 << i | 0) | 0) != 0) break e; while (0);
										d = 49;
										continue c
									}
								while (0);
							d = ((a[c + 216 >> 2] | 0) % (a[b >> 2] << h | 0) | 0) == 0 ? 35 : 32;
							e: do
									if (d ==
										32) {
										d = (a[c + 216 >> 2] | 0) == (a[c + 200 >> 2] | 0) ? 33 : 34;
										do
											if (d == 33 && ((m << k | 0) % (1 << h | 0) | 0) != 0) break e; while (0);
										d = 49;
										continue c
									}
								while (0);
							d = (a[f + 8 >> 2] | 0) == 0 ? 37 : 36;
							e: do
									if (d == 36) {
										if ((a[f + 12 >> 2] | 0) == 0) break e;
										d = (m | 0) == (j | 0) ? 40 : 39;
										do
											if (d == 39 && (n | 0) != (l | 0)) {
												d = 41;
												break c
											}
										while (0);
										d = 49;
										continue c
									}
								while (0);
							d = 49;
							continue c
						} else if (d == 50) {
						a[c + 24 >> 2] += 1;
						d = 24;
						continue c
					} while (0)
				}
				do
					if (d == 52) {
						a[c + 216 >> 2] += a[c + 224 >> 2] - (a[c + 216 >> 2] | 0) % (a[c + 224 >> 2] | 0);
						d = 22;
						continue b
					} else if (d == 41) {
					d = (S(a[c + 216 >> 2], a[b >> 2] << k) >> (a[f >> 2] | 0)) -
						(m >> (a[f >> 2] | 0));
					j = (S(a[c + 220 >> 2], a[b + 4 >> 2] << k) >> (a[f + 4 >> 2] | 0)) - (n >> (a[f + 4 >> 2] | 0));
					a[c + 32 >> 2] = d + j * a[f + 8 >> 2];
					a[c + 36 >> 2] = a[c + 64 >> 2];
					d = 42;
					continue b
				} while (0)
			}
			do
				if (d == 54) {
					a[c + 220 >> 2] += a[c + 228 >> 2] - (a[c + 220 >> 2] | 0) % (a[c + 228 >> 2] | 0);
					d = 20;
					continue a
				} else if (d == 43) {
				g = a[c + 36 >> 2] * a[c + 8 >> 2] + a[c + 28 >> 2] * a[c + 12 >> 2] + a[c + 24 >> 2] * a[c + 16 >> 2] + a[c + 32 >> 2] * a[c + 20 >> 2];
				if (q[a[c + 4 >> 2] + (g << 1) >> 1] << 16 >> 16 == 0) {
					d = 44;
					break a
				}
				d = 46;
				continue a
			} while (0)
		}
		d == 56 ? e = 0 : d == 44 && (e = q[a[c + 4 >> 2] + (g << 1) >> 1] = 1);
		return e
	}

	function te(c) {
		var d, e, b,
			f, g, j, l, h, i, k, m, n;
		g = f = b = 0;
		d = (a[c + 40 >> 2] | 0) != 0 ? 2 : 1;
		a: do
				if (d == 2) {
					a[c + 40 >> 2] = 0;
					a[c + 24 >> 2] = a[c + 48 >> 2];
					d = 4;
					break a
				} else
			if (d == 1) {
				b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
				d = 42;
				break a
			}
		while (0);
		a: for (;;) {
			b: do
				if (d == 4) {
					if (!((a[c + 24 >> 2] | 0) < (a[c + 60 >> 2] | 0))) {
						d = 52;
						break a
					}
					b = a[c + 196 >> 2] + (a[c + 24 >> 2] << 4);
					a[c + 224 >> 2] = 0;
					j = a[c + 228 >> 2] = 0;
					c: for (;;) {
						if (!((j | 0) < (a[b + 8 >> 2] | 0))) break c;
						f = a[b + 12 >> 2] + (j << 4);
						l = a[b >> 2] * (1 << a[f >> 2] + a[b + 8 >> 2] - 1 - j);
						h = a[b + 4 >> 2] * (1 << a[f + 4 >> 2] + a[b + 8 >> 2] - 1 - j);
						d = (a[c + 224 >> 2] | 0) != 0 ? 9 : 8;
						if (d == 9) var o = na(a[c + 224 >>
							2], l);
						else d == 8 && (o = l);
						a[c + 224 >> 2] = o;
						d = (a[c + 228 >> 2] | 0) != 0 ? 12 : 11;
						if (d == 12) var ia = na(a[c + 228 >> 2], h);
						else d == 11 && (ia = h);
						a[c + 228 >> 2] = ia;
						j += 1
					}
					d = p[c] << 24 >> 24 != 0 ? 17 : 16;
					d == 16 && (a[c + 104 >> 2] = a[c + 204 >> 2], a[c + 96 >> 2] = a[c + 200 >> 2], a[c + 108 >> 2] = a[c + 212 >> 2], a[c + 100 >> 2] = a[c + 208 >> 2]);
					a[c + 220 >> 2] = a[c + 104 >> 2];
					d = 18;
					break b
				}else if(d == 42) {
				a[c + 36 >> 2] += 1;
				d = 38;
				break b
			}
			while (0);b: for (;;) {
				c: do
					if (d == 18) {
						if (!((a[c + 220 >> 2] | 0) < (a[c + 108 >> 2] | 0))) {
							d = 50;
							break b
						}
						a[c + 216 >> 2] = a[c + 96 >> 2];
						d = 20;
						break c
					}else if(d == 38) {
					if ((a[c + 36 >> 2] | 0) < (a[c +
							52 >> 2] | 0)) {
						d = 39;
						break b
					}
					d = 45;
					break c
				}
				while (0);c: for (;;) {
					do
						if (d == 20) {
							if (!((a[c + 216 >> 2] | 0) < (a[c + 100 >> 2] | 0))) {
								d = 48;
								break c
							}
							a[c + 28 >> 2] = a[c + 44 >> 2]
						} else d == 45 && (a[c + 28 >> 2] += 1); while (0);
					d = (a[c + 28 >> 2] | 0) < (na(a[c + 56 >> 2], a[b + 8 >> 2]) | 0) ? 23 : 46;
					do
						if (d == 23) {
							f = a[b + 12 >> 2] + (a[c + 28 >> 2] << 4);
							i = a[b + 8 >> 2] - 1 - a[c + 28 >> 2];
							k = S(a[c + 200 >> 2], a[b >> 2] << i);
							m = S(a[c + 204 >> 2], a[b + 4 >> 2] << i);
							j = S(a[c + 208 >> 2], a[b >> 2] << i);
							l = S(a[c + 212 >> 2], a[b + 4 >> 2] << i);
							h = a[f >> 2] + i;
							n = a[f + 4 >> 2] + i;
							d = ((a[c + 220 >> 2] | 0) % (a[b + 4 >> 2] << n | 0) | 0) == 0 ? 27 : 24;
							e: do
									if (d == 24) {
										d =
											(a[c + 220 >> 2] | 0) == (a[c + 204 >> 2] | 0) ? 25 : 26;
										do
											if (d == 25 && ((m << i | 0) % (1 << n | 0) | 0) != 0) break e; while (0);
										d = 45;
										continue c
									}
								while (0);
							d = ((a[c + 216 >> 2] | 0) % (a[b >> 2] << h | 0) | 0) == 0 ? 31 : 28;
							e: do
									if (d == 28) {
										d = (a[c + 216 >> 2] | 0) == (a[c + 200 >> 2] | 0) ? 29 : 30;
										do
											if (d == 29 && ((k << i | 0) % (1 << h | 0) | 0) != 0) break e; while (0);
										d = 45;
										continue c
									}
								while (0);
							d = (a[f + 8 >> 2] | 0) == 0 ? 33 : 32;
							e: do
									if (d == 32) {
										if ((a[f + 12 >> 2] | 0) == 0) break e;
										d = (k | 0) == (j | 0) ? 36 : 35;
										do
											if (d == 35 && (m | 0) != (l | 0)) {
												d = 37;
												break c
											}
										while (0);
										d = 45;
										continue c
									}
								while (0);
							d = 45;
							continue c
						} else if (d == 46) {
						a[c + 216 >>
							2] += a[c + 224 >> 2] - (a[c + 216 >> 2] | 0) % (a[c + 224 >> 2] | 0);
						d = 20;
						continue c
					} while (0)
				}
				do
					if (d == 48) {
						a[c + 220 >> 2] += a[c + 228 >> 2] - (a[c + 220 >> 2] | 0) % (a[c + 228 >> 2] | 0);
						d = 18;
						continue b
					} else if (d == 37) {
					d = (S(a[c + 216 >> 2], a[b >> 2] << i) >> (a[f >> 2] | 0)) - (k >> (a[f >> 2] | 0));
					j = (S(a[c + 220 >> 2], a[b + 4 >> 2] << i) >> (a[f + 4 >> 2] | 0)) - (m >> (a[f + 4 >> 2] | 0));
					a[c + 32 >> 2] = d + j * a[f + 8 >> 2];
					a[c + 36 >> 2] = a[c + 64 >> 2];
					d = 38;
					continue b
				} while (0)
			}
			do
				if (d == 50) {
					a[c + 24 >> 2] += 1;
					d = 4;
					continue a
				} else if (d == 39) {
				g = a[c + 36 >> 2] * a[c + 8 >> 2] + a[c + 28 >> 2] * a[c + 12 >> 2] + a[c + 24 >> 2] * a[c + 16 >> 2] + a[c + 32 >>
					2] * a[c + 20 >> 2];
				if (q[a[c + 4 >> 2] + (g << 1) >> 1] << 16 >> 16 == 0) {
					d = 40;
					break a
				}
				d = 42;
				continue a
			} while (0)
		}
		d == 52 ? e = 0 : d == 40 && (e = q[a[c + 4 >> 2] + (g << 1) >> 1] = 1);
		return e
	}

	function Db(c) {
		var d;
		d = (a[c + 4 >> 2] | 0) == 0 ? 1 : 7;
		d == 1 && (a[c + 4 >> 2] = 8, d = (a[c + 12 >> 2] | 0) == (a[c + 8 >> 2] | 0) ? 2 : 3, d == 2 ? p[c] = -1 : d == 3 && (d = (U[c] & 255 | 0) == 255 ? 4 : 5, d == 4 && (a[c + 4 >> 2] = 7), p[c] = p[a[c + 20 >> 2] + a[c + 12 >> 2]], a[c + 12 >> 2] += 1));
		a[c + 4 >> 2] -= 1;
		return (U[c] & 255) >> (a[c + 4 >> 2] | 0) & 1
	}

	function ue(c, d, e) {
		var b, f, g, j;
		g = d * e;
		b = (g | 0) > (a[c + 28 >> 2] | 0) ? 1 : 4;
		a: do
				if (b == 1) {
					b = fb(g << 2);
					a[c + 12 >> 2] =
						b;
					b = (a[c + 12 >> 2] | 0) != 0 ? 3 : 2;
					do
						if (b == 3) {
							a[c + 28 >> 2] = g;
							b = 4;
							break a
						} else if (b == 2) {
						f = 0;
						b = 9;
						break a
					} while (0)
				}
			while (0);
		a: do
				if (b == 4) {
					var l, h;
					f = a[c + 12 >> 2];
					j = f + (g << 2);
					h = 0;
					h < 0 && (h += 256);
					for (h = h + (h << 8) + (h << 16) + h * 16777216; f % 4 !== 0 && f < j;) p[f++] = 0;
					f >>= 2;
					for (l = j >> 2; f < l;) a[f++] = h;
					for (f <<= 2; f < j;) p[f++] = 0;
					a[c + 36 >> 2] = d + 2;
					j = a[c + 36 >> 2] * (e + 2);
					b = (j | 0) > (a[c + 32 >> 2] | 0) ? 5 : 8;
					do
						if (b == 5) {
							b = fb(j << 1);
							a[c + 16 >> 2] = b;
							b = (a[c + 16 >> 2] | 0) != 0 ? 7 : 6;
							do
								if (b == 7) a[c + 32 >> 2] = j;
								else if (b == 6) {
								f = 0;
								break a
							} while (0)
						}
					while (0);
					f = a[c + 16 >> 2];
					j = f + (j << 1);
					h =
						0;
					h < 0 && (h += 256);
					for (h = h + (h << 8) + (h << 16) + h * 16777216; f % 4 !== 0 && f < j;) p[f++] = 0;
					f >>= 2;
					for (l = j >> 2; f < l;) a[f++] = h;
					for (f <<= 2; f < j;) p[f++] = 0;
					a[c + 20 >> 2] = d;
					a[c + 24 >> 2] = e;
					f = 1
				}
			while (0);
		return f
	}

	function ve(c, d, e) {
		var b, f, g, j, l, h, i, k, m, n, p, o, A, y, L, w, r, x, t;
		h = a[d + 8 >> 2] - a[d >> 2];
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (a[d + 16 >> 2] | 0))) break a;
			i = a[d + 20 >> 2] + f * 124;
			g = 0;
			b: for (;;) {
				if (!((g | 0) < (a[i + 24 >> 2] | 0))) break b;
				k = i + 28 + (g << 5);
				j = 0;
				c: for (;;) {
					if (!((j | 0) < (a[i + 16 >> 2] * a[i + 20 >> 2] | 0))) break c;
					m = a[k + 20 >> 2] + j * 36;
					l = 0;
					d: for (;;) {
						if (!((l | 0) < (a[m + 16 >> 2] *
								a[m + 20 >> 2] | 0))) break d;
						n = a[m + 24 >> 2] + l * 44;
						we(c, n, a[k + 16 >> 2], a[e + 808 >> 2], a[e + 16 >> 2]);
						y = a[n + 8 >> 2] - a[k >> 2];
						n = a[n + 12 >> 2] - a[k + 4 >> 2];
						b = (a[k + 16 >> 2] & 1 | 0) != 0 ? 9 : 10;
						b == 9 && (b = a[d + 20 >> 2] + (f - 1) * 124, y += a[b + 8 >> 2] - a[b >> 2]);
						b = (a[k + 16 >> 2] & 2 | 0) != 0 ? 11 : 12;
						b == 11 && (b = a[d + 20 >> 2] + (f - 1) * 124, n += a[b + 12 >> 2] - a[b + 4 >> 2]);
						p = a[c + 12 >> 2];
						o = a[c + 20 >> 2];
						A = a[c + 24 >> 2];
						b = (a[e + 808 >> 2] | 0) != 0 ? 13 : 27;
						do
							if (b == 13) {
								r = 1 << a[e + 808 >> 2];
								w = 0;
								f: for (;;) {
									if (!((w | 0) < (A | 0))) {
										b = 26;
										break f
									}
									L = 0;
									g: for (;;) {
										if (!((L | 0) < (o | 0))) {
											b = 24;
											break g
										}
										x = a[p + (w * o + L << 2) >> 2];
										t = hi(x);
										b = (t | 0) >= (r | 0) ? 18 : 22;
										if (b == 18) {
											t >>= a[e + 808 >> 2] | 0;
											b = (x | 0) < 0 ? 19 : 20;
											if (b == 19) var q = -t;
											else b == 20 && (q = t);
											a[p + (w * o + L << 2) >> 2] = q
										}
										L += 1
									}
									w += 1
								}
							}
						while (0);
						b = (a[e + 20 >> 2] | 0) == 1 ? 28 : 37;
						do
							if (b == 28) {
								r = a[d + 24 >> 2] + (n * h + y << 2);
								w = 0;
								f: for (;;) {
									if (!((w | 0) < (A | 0))) {
										b = 36;
										break f
									}
									L = 0;
									g: for (;;) {
										if (!((L | 0) < (o | 0))) {
											b = 34;
											break g
										}
										x = a[p + (w * o + L << 2) >> 2];
										a[r + (w * h + L << 2) >> 2] = (x | 0) / 2 | 0;
										L += 1
									}
									w += 1
								}
							} else if (b == 37) {
							r = a[d + 24 >> 2] + (n * h + y << 2);
							w = 0;
							f: for (;;) {
								if (!((w | 0) < (A | 0))) {
									b = 45;
									break f
								}
								x = r;
								L = 0;
								g: for (;;) {
									if (!((L | 0) < (o | 0))) {
										b = 43;
										break g
									}
									t = (a[p >>
										2] | 0) * u[k + 28 >> 2];
									u[x >> 2] = t;
									p += 4;
									x += 4;
									L += 1
								}
								r += h << 2;
								w += 1
							}
						} while (0);
						l += 1
					}
					j += 1
				}
				g += 1
			}
			f += 1
		}
	}

	function we(c, d, e, b, f) {
		var g, j, l, h, i, k, m, n, o;
		j = a[c + 8 >> 2];
		l = a[c + 4 >> 2];
		g = (ue(c, a[d + 16 >> 2] - a[d + 8 >> 2], a[d + 20 >> 2] - a[d + 12 >> 2]) | 0) != 0 ? 2 : 1;
		a: do
				if (g == 2) {
					h = b + a[d + 24 >> 2] - 1;
					i = 2;
					ie(l);
					Qa(l, 18, 46);
					Qa(l, 17, 3);
					Qa(l, 0, 4);
					k = 0;
					for (;;) {
						if (!((k | 0) < (a[d + 40 >> 2] | 0))) break a;
						o = a[d + 4 >> 2] + k * 28;
						if ((h | 0) <= (a[d + 24 >> 2] - 1 - 4 | 0)) g = 5;
						else {
							var ia = 0;
							g = 7
						}
						c: do
								if (g == 5) {
									if (!((i | 0) < 2)) {
										ia = 0;
										break c
									}
									ia = (f & 1 | 0) != 0
								}
							while (0);
						n = (ia ? 1 : 0) & 255;
						g = (a[o >> 2] | 0) ==
							0 ? 8 : 9;
						do
							if (g != 8 && g == 9) {
								g = (n << 24 >> 24 | 0) == 1 ? 10 : 11;
								if (g == 10) {
									m = j;
									var A = a[o + 12 >> 2];
									a[m + 20 >> 2] = a[a[o >> 2] >> 2] + a[o + 4 >> 2];
									a[m + 8 >> 2] = A;
									a[m + 12 >> 2] = 0;
									p[m] = 0;
									a[m + 4 >> 2] = 0
								} else g == 11 && je(l, a[a[o >> 2] >> 2] + a[o + 4 >> 2], a[o + 12 >> 2]);
								m = 0;
								d: for (;;) {
									if (!((m | 0) < (a[o + 8 >> 2] | 0))) {
										g = 37;
										break d
									}
									g = i == 0 ? 15 : i == 1 ? 22 : i == 2 ? 29 : 30;
									g == 15 ? (g = (n << 24 >> 24 | 0) == 1 ? 16 : 17, g == 16 ? xe(c, h + 1, 0, f) : g == 17 && (g = (f & 8 | 0) != 0 ? 18 : 19, g == 18 ? ye(c, h + 1, e) : g == 19 && ze(c, h + 1, e))) : g == 22 ? (g = (n << 24 >> 24 | 0) == 1 ? 23 : 24, g == 23 ? Ae(c, h + 1, f) : g == 24 && (g = (f & 8 | 0) != 0 ? 25 : 26, g == 25 ? Be(c,
										h + 1) : g == 26 && Ce(c, h + 1))) : g == 29 && De(c, h + 1, e, f);
									g = (f & 2 | 0) != 0 ? 31 : 33;
									e: do
											if (g == 31) {
												if ((n << 24 >> 24 | 0) != 0) break e;
												ie(l);
												Qa(l, 18, 46);
												Qa(l, 17, 3);
												Qa(l, 0, 4)
											}
										while (0);
									i = g = i + 1;
									g = (g | 0) == 3 ? 34 : 35;
									g == 34 && (i = 0, h -= 1);
									m += 1
								}
							}
						while (0);
						k += 1
					}
				}
			while (0)
	}

	function xe(c, d, e, b) {
		var f, g, j, d = 1 << d;
		j = d | d >> 1;
		g = 0;
		a: for (;;) {
			if (!((g | 0) < (a[c + 24 >> 2] | 0))) break a;
			d = 0;
			b: for (;;) {
				if (!((d | 0) < (a[c + 20 >> 2] | 0))) break b;
				e = g;
				c: for (;;) {
					if ((e | 0) < (g + 4 | 0)) f = 6;
					else {
						var l = 0;
						f = 7
					}
					f == 6 && (l = (e | 0) < (a[c + 24 >> 2] | 0));
					if (!l) break c;
					if ((b & 8 | 0) != 0) f = 9;
					else {
						var h = 0;
						f = 12
					}
					if (f == 9) {
						if ((e | 0) == (g + 3 | 0)) {
							var i = 1;
							f = 11
						} else f = 10;
						f == 10 && (i = (e | 0) == (a[c + 24 >> 2] - 1 | 0));
						h = i
					}
					f = h ? 1 : 0;
					Ee(c, a[c + 16 >> 2] + ((e + 1) * a[c + 36 >> 2] + d + 1 << 1), a[c + 12 >> 2] + (e * a[c + 20 >> 2] + d << 2), 0, j, f);
					e += 1
				}
				d += 1
			}
			g += 4
		}
	}

	function ye(c, d, e) {
		var b, f, g, j, d = 1 << d;
		j = d | d >> 1;
		g = 0;
		a: for (;;) {
			if (!((g | 0) < (a[c + 24 >> 2] | 0))) break a;
			d = 0;
			b: for (;;) {
				if (!((d | 0) < (a[c + 20 >> 2] | 0))) break b;
				f = g;
				c: for (;;) {
					if ((f | 0) < (g + 4 | 0)) b = 6;
					else {
						var l = 0;
						b = 7
					}
					b == 6 && (l = (f | 0) < (a[c + 24 >> 2] | 0));
					if (!l) break c;
					if ((f | 0) == (g + 3 | 0)) {
						var h = 1;
						b = 10
					} else b = 9;
					b == 9 && (h = (f | 0) == (a[c +
						24 >> 2] - 1 | 0));
					b = h ? 1 : 0;
					Fe(c, a[c + 16 >> 2] + ((f + 1) * a[c + 36 >> 2] + d + 1 << 1), a[c + 12 >> 2] + (f * a[c + 20 >> 2] + d << 2), e, j, b);
					f += 1
				}
				d += 1
			}
			g += 4
		}
	}

	function ze(c, d, e) {
		var b, f, g, j, l, h, i;
		j = a[c + 12 >> 2];
		l = a[c + 16 >> 2] + 2;
		d = 1 << d;
		g = d | d >> 1;
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (a[c + 24 >> 2] & -4 | 0))) break a;
			d = 0;
			b: for (;;) {
				if (!((d | 0) < (a[c + 20 >> 2] | 0))) break b;
				b = j + (d << 2);
				h = l + (d << 1);
				h += a[c + 36 >> 2] << 1;
				Sa(c, h, b, e, g);
				b += a[c + 20 >> 2] << 2;
				h += a[c + 36 >> 2] << 1;
				Sa(c, h, b, e, g);
				b += a[c + 20 >> 2] << 2;
				h += a[c + 36 >> 2] << 1;
				Sa(c, h, b, e, g);
				b += a[c + 20 >> 2] << 2;
				h += a[c + 36 >> 2] << 1;
				Sa(c, h, b, e, g);
				d += 1
			}
			j +=
				a[c + 20 >> 2] << 2 << 2;
			l += a[c + 36 >> 2] << 2 << 1;
			f += 4
		}
		d = 0;
		a: for (;;) {
			if (!((d | 0) < (a[c + 20 >> 2] | 0))) break a;
			h = j + (d << 2);
			i = l + (d << 1);
			b = f;
			b: for (;;) {
				if (!((b | 0) < (a[c + 24 >> 2] | 0))) break b;
				i += a[c + 36 >> 2] << 1;
				Sa(c, i, h, e, g);
				h += a[c + 20 >> 2] << 2;
				b += 1
			}
			d += 1
		}
	}

	function Ae(c, d, e) {
		var b, f, g, j, l;
		j = 1 << d >> 1;
		d = (d | 0) > 0 ? 1 : 2;
		d == 1 ? b = -j : d == 2 && (b = -1);
		l = b;
		g = 0;
		a: for (;;) {
			if (!((g | 0) < (a[c + 24 >> 2] | 0))) break a;
			b = 0;
			b: for (;;) {
				if (!((b | 0) < (a[c + 20 >> 2] | 0))) break b;
				f = g;
				c: for (;;) {
					if ((f | 0) < (g + 4 | 0)) d = 9;
					else var h = 0,
						d = 10;
					d == 9 && (h = (f | 0) < (a[c + 24 >> 2] | 0));
					if (!h) break c;
					if ((e & 8 | 0) != 0) d = 12;
					else var i = 0,
						d = 15;
					if (d == 12) {
						if ((f | 0) == (g + 3 | 0)) var k = 1,
							d = 14;
						else d = 13;
						d == 13 && (k = (f | 0) == (a[c + 24 >> 2] - 1 | 0));
						i = k
					}
					d = i ? 1 : 0;
					Ge(c, a[c + 16 >> 2] + ((f + 1) * a[c + 36 >> 2] + b + 1 << 1), a[c + 12 >> 2] + (f * a[c + 20 >> 2] + b << 2), j, l, d);
					f += 1
				}
				b += 1
			}
			g += 4
		}
	}

	function Be(c, d) {
		var e, b, f, g, j, l;
		j = 1 << d >> 1;
		e = (d | 0) > 0 ? 1 : 2;
		e == 1 ? b = -j : e == 2 && (b = -1);
		l = b;
		g = 0;
		a: for (;;) {
			if (!((g | 0) < (a[c + 24 >> 2] | 0))) break a;
			b = 0;
			b: for (;;) {
				if (!((b | 0) < (a[c + 20 >> 2] | 0))) break b;
				f = g;
				c: for (;;) {
					if ((f | 0) < (g + 4 | 0)) e = 9;
					else {
						var h = 0;
						e = 10
					}
					e == 9 && (h = (f | 0) < (a[c + 24 >> 2] | 0));
					if (!h) break c;
					if ((f | 0) == (g + 3 | 0)) {
						var i = 1;
						e = 13
					} else e = 12;
					e == 12 && (i = (f | 0) == (a[c + 24 >> 2] - 1 | 0));
					e = i ? 1 : 0;
					He(c, a[c + 16 >> 2] + ((f + 1) * a[c + 36 >> 2] + b + 1 << 1), a[c + 12 >> 2] + (f * a[c + 20 >> 2] + b << 2), j, l, e);
					f += 1
				}
				b += 1
			}
			g += 4
		}
	}

	function Ce(c, d) {
		var e, b, f, g, j, l, h, i, k;
		l = a[c + 12 >> 2];
		h = a[c + 16 >> 2] + 2;
		g = 1 << d >> 1;
		e = (d | 0) > 0 ? 1 : 2;
		e == 1 ? f = -g : e == 2 && (f = -1);
		j = f;
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (a[c + 24 >> 2] & -4 | 0))) break a;
			e = 0;
			b: for (;;) {
				if (!((e | 0) < (a[c + 20 >> 2] | 0))) break b;
				b = l + (e << 2);
				i = h + (e << 1);
				i += a[c + 36 >> 2] << 1;
				Ta(c, i, b, g, j);
				b += a[c + 20 >> 2] << 2;
				i += a[c + 36 >> 2] << 1;
				Ta(c, i, b, g, j);
				b += a[c + 20 >> 2] << 2;
				i += a[c + 36 >> 2] << 1;
				Ta(c, i, b, g, j);
				b += a[c + 20 >> 2] << 2;
				i += a[c + 36 >> 2] << 1;
				Ta(c, i, b, g, j);
				e += 1
			}
			l += a[c + 20 >> 2] << 2 << 2;
			h += a[c + 36 >> 2] << 2 << 1;
			f += 4
		}
		e = 0;
		a: for (;;) {
			if (!((e | 0) < (a[c + 20 >> 2] | 0))) break a;
			i = l + (e << 2);
			k = h + (e << 1);
			b = f;
			b: for (;;) {
				if (!((b | 0) < (a[c + 24 >> 2] | 0))) break b;
				k += a[c + 36 >> 2] << 1;
				Ta(c, k, i, g, j);
				i += a[c + 20 >> 2] << 2;
				b += 1
			}
			e += 1
		}
	}

	function De(c, d, e, b) {
		var f, g, j, l, h, i, k, m, n, o, p;
		k = b & 32;
		m = a[c + 4 >> 2];
		d = 1 << d;
		d |= d >> 1;
		f = (b & 8 | 0) != 0 ? 1 : 32;
		do
			if (f == 1) {
				j = 0;
				b: for (;;) {
					if (!((j | 0) < (a[c + 24 >> 2] | 0))) {
						f = 31;
						break b
					}
					b = 0;
					c: for (;;) {
						if (!((b |
								0) < (a[c + 20 >> 2] | 0))) {
							f = 29;
							break c
						}
						f = (j + 3 | 0) < (a[c + 24 >> 2] | 0) ? 6 : 11;
						do
							if (f == 6) {
								if ((q[a[c + 16 >> 2] + ((j + 1) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20735 | 0) != 0) {
									var A = 1;
									f = 10
								} else f = 7;
								e: do
										if (f == 7) {
											if ((q[a[c + 16 >> 2] + ((j + 2) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20735 | 0) != 0) {
												A = 1;
												f = 10;
												break e
											}
											if ((q[a[c + 16 >> 2] + ((j + 3) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20735 | 0) != 0) {
												A = 1;
												f = 10;
												break e
											}
											A = (q[a[c + 16 >> 2] + ((j + 4) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20665 | 0) != 0
										}
									while (0);
								l = (A ^ 1) & 1
							} else f == 11 && (l = 0); while (0);
						f = (l | 0) != 0 ? 13 : 16;
						d: do
								if (f == 13) {
									a[m +
										100 >> 2] = m + 92;
									f = (V(m) | 0) != 0 ? 15 : 14;
									do
										if (f == 15) {
											a[m + 100 >> 2] = m + 96;
											h = V(m);
											h <<= 1;
											f = V(m);
											h |= f;
											f = 17;
											break d
										} else if (f == 14) {
										f = 28;
										break d
									} while (0)
								} else
							if (f == 16) {
								h = 0;
								f = 17;
								break d
							}
						while (0);
						do
							if (f == 17) {
								g = j + h;
								e: for (;;) {
									if ((g | 0) < (j + 4 | 0)) f = 19;
									else {
										var y = 0;
										f = 20
									}
									f == 19 && (y = (g | 0) < (a[c + 24 >> 2] | 0));
									if (!y) {
										f = 27;
										break e
									}
									if ((g | 0) == (j + 3 | 0)) {
										var r = 1;
										f = 23
									} else f = 22;
									f == 22 && (r = (g | 0) == (a[c + 24 >> 2] - 1 | 0));
									i = r ? 1 : 0;
									n = c;
									o = a[c + 16 >> 2] + ((g + 1) * a[c + 36 >> 2] + b + 1 << 1);
									p = a[c + 12 >> 2] + (g * a[c + 20 >> 2] + b << 2);
									var w = e,
										x = d;
									if ((l | 0) != 0) f = 24;
									else {
										var t =
											0;
										f = 25
									}
									f == 24 && (t = (g | 0) == (j + h | 0));
									Ie(n, o, p, w, x, t & 1, i);
									g += 1
								}
							}
						while (0);
						b += 1
					}
					j += 4
				}
			} else if (f == 32) {
			i = a[c + 12 >> 2];
			n = a[c + 16 >> 2] + 2;
			j = 0;
			b: for (;;) {
				if (!((j | 0) < (a[c + 24 >> 2] & -4 | 0))) {
					f = 59;
					break b
				}
				b = 0;
				c: for (;;) {
					if (!((b | 0) < (a[c + 20 >> 2] | 0))) {
						f = 57;
						break c
					}
					o = i + (b << 2);
					p = n + (b << 1);
					if ((q[a[c + 16 >> 2] + ((j + 1) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20735 | 0) != 0) {
						var s = 1;
						f = 40
					} else f = 37;
					d: do
							if (f == 37) {
								if ((q[a[c + 16 >> 2] + ((j + 2) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20735 | 0) != 0) {
									s = 1;
									break d
								}
								if ((q[a[c + 16 >> 2] + ((j + 3) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >>
										16 & 20735 | 0) != 0) {
									s = 1;
									break d
								}
								s = (q[a[c + 16 >> 2] + ((j + 4) * a[c + 36 >> 2] + (b + 1) << 1) >> 1] << 16 >> 16 & 20735 | 0) != 0
							}
						while (0);
					l = (s ^ 1) & 1;
					f = (l | 0) != 0 ? 41 : 54;
					d: do
							if (f == 41) {
								a[m + 100 >> 2] = m + 92;
								f = (V(m) | 0) != 0 ? 43 : 42;
								do
									if (f == 43) {
										a[m + 100 >> 2] = m + 96;
										h = V(m);
										h <<= 1;
										f = V(m);
										h |= f;
										p += h * a[c + 36 >> 2] << 1;
										o += h * a[c + 20 >> 2] << 2;
										g = j + h;
										f: for (;;) {
											if ((g | 0) < (j + 4 | 0)) f = 45;
											else {
												var B = 0;
												f = 46
											}
											f == 45 && (B = (g | 0) < (a[c + 24 >> 2] | 0));
											if (!B) break f;
											p += a[c + 36 >> 2] << 1;
											f = (l | 0) != 0 ? 48 : 50;
											g: do
													if (f == 48) {
														if ((g | 0) != (j + h | 0)) {
															f = 50;
															break g
														}
														Je(c, p, o, 0, d);
														f = 51;
														break g
													}
												while (0);
											f == 50 &&
												Ja(c, p, o, e, d);
											o += a[c + 20 >> 2] << 2;
											g += 1
										}
										f = 55;
										break d
									} else if (f == 42) {
									f = 56;
									break d
								} while (0)
							} else
						if (f == 54) {
							p += a[c + 36 >> 2] << 1;
							Ja(c, p, o, e, d);
							o += a[c + 20 >> 2] << 2;
							p += a[c + 36 >> 2] << 1;
							Ja(c, p, o, e, d);
							o += a[c + 20 >> 2] << 2;
							p += a[c + 36 >> 2] << 1;
							Ja(c, p, o, e, d);
							o += a[c + 20 >> 2] << 2;
							p += a[c + 36 >> 2] << 1;
							Ja(c, p, o, e, d);
							f = 55;
							break d
						}
					while (0);
					b += 1
				}
				i += a[c + 20 >> 2] << 2 << 2;
				n += a[c + 36 >> 2] << 2 << 1;
				j += 4
			}
			b = 0;
			b: for (;;) {
				if (!((b | 0) < (a[c + 20 >> 2] | 0))) {
					f = 67;
					break b
				}
				o = i + (b << 2);
				p = n + (b << 1);
				g = j;
				c: for (;;) {
					if (!((g | 0) < (a[c + 24 >> 2] | 0))) {
						f = 65;
						break c
					}
					p += a[c + 36 >> 2] << 1;
					Ja(c,
						p, o, e, d);
					o += a[c + 20 >> 2] << 2;
					g += 1
				}
				b += 1
			}
		} while (0);
		if (((k | 0) != 0 ? 69 : 70) == 69) a[m + 100 >> 2] = m + 96, V(m), V(m), V(m), V(m)
	}

	function Ie(c, d, e, b, f, g, j) {
		var h, i;
		i = a[c + 4 >> 2];
		j = (j | 0) != 0 ? 1 : 2;
		j == 1 ? h = q[d >> 1] << 16 >> 16 & -1095 : j == 2 && (h = q[d >> 1] << 16 >> 16);
		j = (g | 0) != 0 ? 4 : 5;
		a: do
				if (j == 4) {
					j = 8;
					break a
				} else
			if (j == 5) {
				if ((h & 20480 | 0) != 0) {
					j = 13;
					break a
				}
				a[i + 100 >> 2] = i + 24 + (p[lb + (b << 8 | h & 255)] << 24 >> 24 << 2);
				if ((V(i) | 0) == 0) {
					j = 12;
					break a
				}
				j = 8;
				break a
			}
		while (0);
		a: do
				if (j == 8) {
					a[i + 100 >> 2] = i + 24 + (mb(h) << 24 >> 24 << 2);
					b = V(i) ^ nb(h) << 24 >> 24;
					j = (b | 0) != 0 ? 9 : 10;
					if (j ==
						9) var k = -f;
					else j == 10 && (k = f);
					a[e >> 2] = k;
					Ka(d, b, a[c + 36 >> 2]);
					break a
				}
			while (0);
		q[d >> 1] = q[d >> 1] << 16 >> 16 & 49151
	}

	function Ke(a) {
		var d;
		d = (a & 8192 | 0) != 0 ? 1 : 2;
		if (d == 1) var e = 16;
		else d == 2 && (e = (a & 255 | 0) != 0 ? 15 : 14);
		return e
	}

	function mb(a) {
		return p[Le + ((a & 4080) >> 4)]
	}

	function nb(a) {
		return p[Me + ((a & 4080) >> 4)]
	}

	function Ka(a, d, e) {
		var b;
		b = a + (-e << 1);
		e = a + (e << 1);
		q[b - 2 >> 1] = (q[b - 2 >> 1] << 16 >> 16 | 2) & 65535;
		q[b >> 1] = (q[b >> 1] << 16 >> 16 | q[ob + (d << 1) >> 1] << 16 >> 16) & 65535;
		q[b + 2 >> 1] = (q[b + 2 >> 1] << 16 >> 16 | 4) & 65535;
		q[a - 2 >> 1] = (q[a - 2 >> 1] << 16 >> 16 | q[ob +
			(d + 2 << 1) >> 1] << 16 >> 16) & 65535;
		q[a >> 1] = (q[a >> 1] << 16 >> 16 | 4096) & 65535;
		q[a + 2 >> 1] = (q[a + 2 >> 1] << 16 >> 16 | q[ob + (d + 4 << 1) >> 1] << 16 >> 16) & 65535;
		q[e - 2 >> 1] = (q[e - 2 >> 1] << 16 >> 16 | 1) & 65535;
		q[e >> 1] = (q[e >> 1] << 16 >> 16 | q[ob + (d + 6 << 1) >> 1] << 16 >> 16) & 65535;
		q[e + 2 >> 1] = (q[e + 2 >> 1] << 16 >> 16 | 8) & 65535
	}

	function Je(c, d, e, b, f) {
		var g;
		g = a[c + 4 >> 2];
		b = q[d >> 1] << 16 >> 16;
		a[g + 100 >> 2] = g + 24 + (mb(b) << 24 >> 24 << 2);
		g = V(g) ^ nb(b) << 24 >> 24;
		b = (g | 0) != 0 ? 1 : 2;
		if (b == 1) var j = -f;
		else b == 2 && (j = f);
		a[e >> 2] = j;
		Ka(d, g, a[c + 36 >> 2]);
		q[d >> 1] = q[d >> 1] << 16 >> 16 & 49151
	}

	function Ja(c, d,
		e, b, f) {
		var g, j;
		j = a[c + 4 >> 2];
		g = q[d >> 1] << 16 >> 16;
		if (((g & 20480 | 0) != 0 ? 7 : 1) == 1)
			if (a[j + 100 >> 2] = j + 24 + (p[lb + (b << 8 | g & 255)] << 24 >> 24 << 2), b = (V(j) | 0) != 0 ? 2 : 6, b == 2) {
				a[j + 100 >> 2] = j + 24 + (mb(g) << 24 >> 24 << 2);
				g = V(j) ^ nb(g) << 24 >> 24;
				b = (g | 0) != 0 ? 3 : 4;
				if (b == 3) var h = -f;
				else b == 4 && (h = f);
				a[e >> 2] = h;
				Ka(d, g, a[c + 36 >> 2])
			}
		q[d >> 1] = q[d >> 1] << 16 >> 16 & 49151
	}

	function Ta(c, d, e, b, f) {
		var g;
		g = a[c + 4 >> 2];
		c = q[d >> 1] << 16 >> 16;
		if (((c & 20480 | 0) == 4096 ? 1 : 8) == 1) {
			a[g + 100 >> 2] = g + 24 + (Ke(c) << 2);
			c = V(g);
			c = (c | 0) != 0 ? 2 : 3;
			if (c == 2) var j = b;
			else c == 3 && (j = f);
			b = j;
			c = (a[e >> 2] |
				0) < 0 ? 5 : 6;
			if (c == 5) var h = -b;
			else c == 6 && (h = b);
			a[e >> 2] += h;
			q[d >> 1] = (q[d >> 1] << 16 >> 16 | 8192) & 65535
		}
	}

	function He(c, d, e, b, f, g) {
		var j, c = a[c + 4 >> 2],
			g = (g | 0) != 0 ? 1 : 2;
		g == 1 ? j = q[d >> 1] << 16 >> 16 & -1095 : g == 2 && (j = q[d >> 1] << 16 >> 16);
		if (((j & 20480 | 0) == 4096 ? 4 : 11) == 4) {
			a[c + 100 >> 2] = c + 24 + (Ke(j) << 2);
			c = V(c);
			g = (c | 0) != 0 ? 5 : 6;
			if (g == 5) var h = b;
			else g == 6 && (h = f);
			b = h;
			g = (a[e >> 2] | 0) < 0 ? 8 : 9;
			if (g == 8) var i = -b;
			else g == 9 && (i = b);
			a[e >> 2] += i;
			q[d >> 1] = (q[d >> 1] << 16 >> 16 | 8192) & 65535
		}
	}

	function Ge(c, d, e, b, f, g) {
		var j, c = a[c + 8 >> 2],
			g = (g | 0) != 0 ? 1 : 2;
		g == 1 ? j = q[d >> 1] <<
			16 >> 16 & -1095 : g == 2 && (j = q[d >> 1] << 16 >> 16);
		if (((j & 20480 | 0) == 4096 ? 4 : 11) == 4) {
			j = Db(c);
			g = (j | 0) != 0 ? 5 : 6;
			if (g == 5) var h = b;
			else g == 6 && (h = f);
			b = h;
			g = (a[e >> 2] | 0) < 0 ? 8 : 9;
			if (g == 8) var i = -b;
			else g == 9 && (i = b);
			a[e >> 2] += i;
			q[d >> 1] = (q[d >> 1] << 16 >> 16 | 8192) & 65535
		}
	}

	function Sa(c, d, e, b, f) {
		var g, j, h, i;
		i = a[c + 4 >> 2];
		h = q[d >> 1] << 16 >> 16;
		g = (h & 255 | 0) != 0 ? 1 : 8;
		a: do
				if (g == 1) {
					if ((h & 20480 | 0) != 0) break a;
					a[i + 100 >> 2] = i + 24 + (p[lb + (b << 8 | h & 255)] << 24 >> 24 << 2);
					g = (V(i) | 0) != 0 ? 3 : 7;
					if (g == 3) {
						a[i + 100 >> 2] = i + 24 + (mb(h) << 24 >> 24 << 2);
						j = V(i) ^ nb(h) << 24 >> 24;
						g = (j | 0) != 0 ?
							4 : 5;
						if (g == 4) var k = -f;
						else g == 5 && (k = f);
						a[e >> 2] = k;
						Ka(d, j, a[c + 36 >> 2])
					}
					q[d >> 1] = (q[d >> 1] << 16 >> 16 | 16384) & 65535
				}
			while (0)
	}

	function Fe(c, d, e, b, f, g) {
		var j, h, i;
		i = a[c + 4 >> 2];
		g = (g | 0) != 0 ? 1 : 2;
		g == 1 ? j = q[d >> 1] << 16 >> 16 & -1095 : g == 2 && (j = q[d >> 1] << 16 >> 16);
		h = j;
		g = (h & 255 | 0) != 0 ? 4 : 11;
		a: do
				if (g == 4) {
					if ((h & 20480 | 0) != 0) break a;
					a[i + 100 >> 2] = i + 24 + (p[lb + (b << 8 | h & 255)] << 24 >> 24 << 2);
					g = (V(i) | 0) != 0 ? 6 : 10;
					if (g == 6) {
						a[i + 100 >> 2] = i + 24 + (mb(h) << 24 >> 24 << 2);
						j = V(i) ^ nb(h) << 24 >> 24;
						g = (j | 0) != 0 ? 7 : 8;
						if (g == 7) var k = -f;
						else g == 8 && (k = f);
						a[e >> 2] = k;
						Ka(d, j, a[c + 36 >>
							2])
					}
					q[d >> 1] = (q[d >> 1] << 16 >> 16 | 16384) & 65535
				}
			while (0)
	}

	function Ee(c, d, e, b, f, g) {
		var j, h, b = a[c + 8 >> 2],
			g = (g | 0) != 0 ? 1 : 2;
		g == 1 ? j = q[d >> 1] << 16 >> 16 & -1095 : g == 2 && (j = q[d >> 1] << 16 >> 16);
		h = j;
		g = (h & 255 | 0) != 0 ? 4 : 11;
		a: do
				if (g == 4) {
					if ((h & 20480 | 0) != 0) break a;
					g = (Db(b) | 0) != 0 ? 6 : 10;
					if (g == 6) {
						j = Db(b);
						g = (j | 0) != 0 ? 7 : 8;
						if (g == 7) var i = -f;
						else g == 8 && (i = f);
						a[e >> 2] = i;
						Ka(d, j, a[c + 36 >> 2])
					}
					q[d >> 1] = (q[d >> 1] << 16 >> 16 | 16384) & 65535
				}
			while (0)
	}

	function Ne(c, d, e, b, f, g) {
		var j, h, i, k, n, m, o, O, r, A, y, x, w, t;
		i = d;
		O = o = m = 0;
		A = a[c + 4 >> 2];
		y = a[c + 8 >> 2];
		k = oe(A, y, b);
		j = (k |
			0) != 0 ? 2 : 1;
		do
			if (j == 2) {
				n = r = 0;
				b: for (;;) {
					if (!((n | 0) <= (a[a[y + 108 >> 2] + b * 5588 + 420 >> 2] | 0))) {
						j = 36;
						break b
					}
					c: for (;;) {
						j = k + n * 232;
						w = t = H;
						t = a[j + 80 >> 2];
						t = t == 0 ? 1 : t == 1 ? 2 : t == 2 ? 3 : t == 3 ? 4 : t == 4 ? 5 : t == -1 ? 6 : 7;
						t == 7 ? w = 0 : t == 1 ? w = pe(j) : t == 2 ? w = qe(j) : t == 3 ? w = re(j) : t == 4 ? w = se(j) : t == 5 ? w = te(j) : t == 6 && (w = 0);
						if ((w | 0) == 0) {
							j = 34;
							break c
						}
						j = (a[y + 40 >> 2] | 0) == 0 ? 8 : 7;
						d: do
								if (j == 7) {
									if ((a[y + 40 >> 2] | 0) >= (a[k + n * 232 + 36 >> 2] + 1 | 0)) {
										j = 8;
										break d
									}
									m = 0;
									j = 13;
									break d
								}
							while (0);
						j == 8 && (j = (g | 0) != 0 ? 9 : 10, j == 9 ? x = a[a[g + 88 >> 2] + b * 572 + 548 >> 2] + a[g + 8 >> 2] * 20 : j == 10 && (x = 0), m = Oe(c,
							i, d + e - i, f, a[y + 108 >> 2] + b * 5588, k + n * 232, x));
						if ((m | 0) == -999) {
							j = 14;
							break b
						}
						j = (m | 0) > 0 ? 16 : 17;
						if (j == 16) {
							var q;
							q = a[k + n * 232 + 28 >> 2];
							j = a[a[A + 24 >> 2] + a[k + n * 232 + 24 >> 2] * 48 + 36 >> 2];
							w = H;
							w = (q | 0) > (j | 0) ? 1 : 2;
							if (w == 1) var s = q;
							else w == 2 && (s = j);
							q = s
						} else j == 17 && (q = a[a[A + 24 >> 2] + a[k + n * 232 + 24 >> 2] * 48 + 36 >> 2]);
						a[a[A + 24 >> 2] + a[k + n * 232 + 24 >> 2] * 48 + 36 >> 2] = q;
						o += 1;
						j = (g | 0) != 0 ? 19 : 30;
						do
							if (j == 19) {
								w = a[g + 88 >> 2] + b * 572;
								t = a[w + 548 >> 2] + a[g + 8 >> 2] * 20;
								j = (a[g + 8 >> 2] | 0) != 0 ? 21 : 20;
								do
									if (j == 21) {
										j = (a[a[w + 548 >> 2] + (a[g + 8 >> 2] - 1) * 20 + 8 >> 2] | 0) >= (a[a[a[g + 88 >> 2] + b *
											572 + 568 >> 2] + O * 20 + 8 >> 2] | 0) ? 22 : 23;
										do
											if (j == 22) a[a[w + 568 >> 2] + O * 20 + 16 >> 2] = a[g + 8 >> 2] - r, r = a[g + 8 >> 2], O += 1, a[t >> 2] = a[a[a[g + 88 >> 2] + b * 572 + 568 >> 2] + O * 20 + 4 >> 2] + 1;
											else if (j == 23) {
											j = (p[y + 16] << 24 >> 24 | 0) != 0 ? 24 : 26;
											g: do
													if (j == 24) {
														if ((a[t >> 2] | 0) == 0) {
															j = 26;
															break g
														}
														var B = a[t >> 2];
														j = 27;
														break g
													}
												while (0);
											j == 26 && (B = a[a[w + 548 >> 2] + (a[g + 8 >> 2] - 1) * 20 + 8 >> 2] + 1);
											a[t >> 2] = B
										} while (0)
									} else j == 20 && (a[t >> 2] = a[w + 12 >> 2] + 1); while (0);
								a[t + 8 >> 2] = a[t >> 2] + m - 1;
								a[t + 4 >> 2] += a[t >> 2] - 1;
								a[g + 8 >> 2] += 1
							}
						while (0);
						if ((m | 0) == -999) {
							j = 31;
							break c
						}
						i += m
					}
					n += 1
				}
				j == 36 ?
					(j = (g | 0) != 0 ? 37 : 38, j == 37 && (a[a[a[g + 88 >> 2] + b * 572 + 568 >> 2] + O * 20 + 16 >> 2] = a[g + 8 >> 2] - r), j = (m | 0) == -999 ? 39 : 40, j == 39 ? h = m : j == 40 && (h = i - d)) : j == 14 && (h = -999)
			} else j == 1 && (h = -999); while (0);
		return h
	}

	function Oe(c, d, e, b, f, g, j) {
		var l, i, k, o, m, gb, O, t, A, y, r, w, x, q, s, B;
		o = d;
		m = a[c + 8 >> 2];
		gb = a[g + 24 >> 2];
		O = a[g + 28 >> 2];
		t = a[g + 32 >> 2];
		g = a[g + 36 >> 2];
		O = a[a[b + 20 >> 2] + (gb << 5) + 20 >> 2] + O * 124;
		A = 0;
		l = (g | 0) == 0 ? 1 : 13;
		do
			if (l == 1) {
				b = 0;
				b: for (;;) {
					if (!((b | 0) < (a[O + 24 >> 2] | 0))) {
						l = 12;
						break b
					}
					k = O + 28 + (b << 5);
					y = a[k + 20 >> 2] + t * 36;
					l = (a[k + 8 >> 2] - a[k >> 2] | 0) == 0 ? 5 : 4;
					c: do
							if (l ==
								4) {
								if ((a[k + 12 >> 2] - a[k + 4 >> 2] | 0) == 0) {
									l = 5;
									break c
								}
								mc(a[y + 28 >> 2]);
								mc(a[y + 32 >> 2]);
								k = 0;
								d: for (;;) {
									if (!((k | 0) < (a[y + 16 >> 2] * a[y + 20 >> 2] | 0))) break d;
									r = a[y + 24 >> 2] + k * 44;
									a[r + 40 >> 2] = 0;
									k += 1
								}
								l = 11;
								break c
							}
						while (0);
					b += 1
				}
			}
		while (0);
		l = (a[f + 4 >> 2] & 2 | 0) != 0 ? 14 : 19;
		do
			if (l == 14) {
				l = (U[o] & 255 | 0) != 255 ? 16 : 15;
				b: do
						if (l == 15) {
							if ((U[o + 1] & 255 | 0) != 145) {
								l = 16;
								break b
							}
							o += 6;
							l = 18;
							break b
						}
					while (0);
				l == 16 && F(a[c >> 2], 2, Pe, h(1, "i32", n))
			}
		while (0);
		y = z(20);
		l = (a[m + 92 >> 2] | 0) == 1 ? 20 : 21;
		l == 20 ? (A = a[m + 84 >> 2], Yb(y, A, a[m + 104 >> 2])) : l == 21 && (l = (a[f + 5172 >> 2] | 0) ==
			1 ? 22 : 23, l == 22 ? (A = a[f + 5164 >> 2], Yb(y, A, a[f + 5180 >> 2])) : l == 23 && (A = o, Yb(y, A, d + e - A)));
		l = (ma(y, 1) | 0) != 0 ? 39 : 26;
		a: do
				if (l == 39) {
					b = 0;
					b: for (;;) {
						if (!((b | 0) < (a[O + 24 >> 2] | 0))) break b;
						r = O + 28 + (b << 5);
						w = a[r + 20 >> 2] + t * 36;
						l = (a[r + 8 >> 2] - a[r >> 2] | 0) == 0 ? 43 : 42;
						c: do
								if (l == 42) {
									if ((a[r + 12 >> 2] - a[r + 4 >> 2] | 0) == 0) break c;
									k = 0;
									d: for (;;) {
										if (!((k | 0) < (a[w + 16 >> 2] * a[w + 20 >> 2] | 0))) break d;
										B = a[w + 24 >> 2] + k * 44;
										l = (a[B + 40 >> 2] | 0) != 0 ? 48 : 47;
										l == 48 ? x = ma(y, 1) : l == 47 && (x = nc(y, a[w + 28 >> 2], k, g + 1));
										l = (x | 0) != 0 ? 51 : 50;
										do
											if (l == 51) {
												l = (a[B + 40 >> 2] | 0) != 0 ? 57 : 52;
												do
													if (l ==
														52) {
														q = 0;
														g: for (;;) {
															if (!((nc(y, a[w + 32 >> 2], k, q) | 0) != 0 ^ 1)) {
																l = 56;
																break g
															}
															q += 1
														}
														q -= 1;
														a[B + 24 >> 2] = a[r + 24 >> 2] - q;
														a[B + 28 >> 2] = 3
													}
												while (0);
												l = y;
												var u = H;
												s = q = H;
												u = (ma(l, 1) | 0) != 0 ? 2 : 1;
												u == 2 ? (u = (ma(l, 1) | 0) != 0 ? 4 : 3, u == 4 ? (s = u = ma(l, 2), u = (u | 0) != 3 ? 5 : 6, u == 5 ? q = s + 3 : u == 6 && (s = u = ma(l, 5), u = (u | 0) != 31 ? 7 : 8, u == 7 ? q = s + 6 : u == 8 && (q = ma(l, 7) + 37))) : u == 3 && (q = 2)) : u == 1 && (q = 1);
												a[B + 36 >> 2] = q;
												l = y;
												q = H;
												q = 0;
												f: for (;;) {
													if ((ma(l, 1) | 0) == 0) break f;
													q += 1
												}
												l = q;
												a[B + 28 >> 2] += l;
												s = 0;
												l = (a[B + 40 >> 2] | 0) != 0 ? 59 : 58;
												l == 59 ? (s = a[B + 40 >> 2] - 1, l = (a[a[B + 4 >> 2] + s * 28 + 8 >> 2] | 0) == (a[a[B +
													4 >> 2] + s * 28 + 16 >> 2] | 0) ? 60 : 61, l == 60 && (s += 1, Eb(B, s, a[a[f + 5584 >> 2] + gb * 1076 + 16 >> 2], 0))) : l == 58 && Eb(B, s, a[a[f + 5584 >> 2] + gb * 1076 + 16 >> 2], 1);
												q = a[B + 36 >> 2];
												f: for (;;) {
													l = a[a[B + 4 >> 2] + s * 28 + 16 >> 2] - a[a[B + 4 >> 2] + s * 28 + 8 >> 2];
													u = H;
													u = (l | 0) < (q | 0) ? 1 : 2;
													if (u == 1) var C = l;
													else u == 2 && (C = q);
													a[a[B + 4 >> 2] + s * 28 + 20 >> 2] = C;
													u = l = H;
													l = a[a[B + 4 >> 2] + s * 28 + 20 >> 2];
													u = 0;
													g: for (;;) {
														if (!((l | 0) > 1)) break g;
														l >>= 1;
														u += 1
													}
													l = ma(y, a[B + 28 >> 2] + u);
													a[a[B + 4 >> 2] + s * 28 + 24 >> 2] = l;
													q -= a[a[B + 4 >> 2] + s * 28 + 20 >> 2];
													l = (q | 0) > 0 ? 64 : 65;
													l == 64 && (s += 1, Eb(B, s, a[a[f + 5584 >> 2] + gb * 1076 + 16 >> 2],
														0));
													if (!((q | 0) > 0)) {
														l = 67;
														break f
													}
												}
											} else l == 50 && (a[B + 36 >> 2] = 0); while (0);
										k += 1
									}
									break c
								}
							while (0);
						b += 1
					}
					l = (Yc(y) | 0) != 0 ? 72 : 73;
					do
						if (l == 72) i = -999;
						else if (l == 73) {
						A += a[y + 8 >> 2] - a[y >> 2];
						l = (a[f + 4 >> 2] & 4 | 0) != 0 ? 74 : 79;
						c: do
								if (l == 74) {
									l = (U[A] & 255 | 0) != 255 ? 76 : 75;
									d: do
											if (l == 75) {
												if ((U[A + 1] & 255 | 0) != 146) break d;
												A += 2;
												break c
											}
										while (0);
									F(a[c >> 2], 1, Qe, h(1, "i32", n));
									i = -999;
									break a
								}
							while (0);
						l = (j | 0) != 0 ? 80 : 81;
						l == 80 && (a[j + 4 >> 2] = A - d);
						l = (a[m + 92 >> 2] | 0) == 1 ? 82 : 83;
						l == 82 ? (a[m + 104 >> 2] += a[m + 84 >> 2] - A, a[m + 84 >> 2] = A) : l == 83 && (l = (a[f + 5172 >> 2] | 0) ==
							1 ? 84 : 85, l == 84 ? (a[f + 5180 >> 2] += a[f + 5164 >> 2] - A, a[f + 5164 >> 2] = A) : l == 85 && (o = A));
						b = 0;
						c: for (;;) {
							if (!((b | 0) < (a[O + 24 >> 2] | 0))) {
								l = 114;
								break c
							}
							k = O + 28 + (b << 5);
							r = a[k + 20 >> 2] + t * 36;
							l = (a[k + 8 >> 2] - a[k >> 2] | 0) == 0 ? 91 : 90;
							d: do
									if (l == 90) {
										if ((a[k + 12 >> 2] - a[k + 4 >> 2] | 0) == 0) {
											l = 91;
											break d
										}
										k = 0;
										e: for (;;) {
											if (!((k | 0) < (a[r + 16 >> 2] * a[r + 20 >> 2] | 0))) break e;
											w = a[r + 24 >> 2] + k * 44;
											B = 0;
											l = (a[w + 36 >> 2] | 0) != 0 ? 96 : 95;
											do
												if (l == 96) {
													l = (a[w + 40 >> 2] | 0) != 0 ? 98 : 97;
													l == 98 ? (B = a[w + 4 >> 2] + (a[w + 40 >> 2] - 1) * 28, l = (a[B + 8 >> 2] | 0) == (a[B + 16 >> 2] | 0) ? 99 : 100, l == 99 && (B += 28, a[w + 40 >> 2] +=
														1)) : l == 97 && (B = a[w + 4 >> 2], a[w + 40 >> 2] += 1, a[w + 32 >> 2] = 0);
													g: for (;;) {
														if (o + a[B + 24 >> 2] >>> 0 > d + e >>> 0) {
															l = 103;
															break c
														}
														l = jb(a[w >> 2], a[w + 32 >> 2] + a[B + 24 >> 2] << 2);
														a[w >> 2] = l;
														s = a[w >> 2] + a[w + 32 >> 2];
														q = o;
														l = a[B + 24 >> 2];
														D(l % 1 === 0, "memcpy given " + l + " bytes to copy. Problem with quantum=1 corrections perhaps?");
														u = q + l;
														if (s % 4 == q % 4 && l > 8) {
															for (; q % 4 !== 0 && q < u;) p[s++] = p[q++];
															q >>= 2;
															s >>= 2;
															for (l = u >> 2; q < l;) a[s++] = a[q++];
															q <<= 2;
															s <<= 2
														}
														for (; q < u;) p[s++] = p[q++];
														l = (a[B + 8 >> 2] | 0) == 0 ? 105 : 106;
														l == 105 && (a[B >> 2] = w, a[B + 4 >> 2] = a[w + 32 >> 2]);
														o += a[B + 24 >> 2];
														a[w +
															32 >> 2] += a[B + 24 >> 2];
														a[B + 12 >> 2] += a[B + 24 >> 2];
														a[B + 8 >> 2] += a[B + 20 >> 2];
														a[w + 36 >> 2] -= a[B + 20 >> 2];
														l = (a[w + 36 >> 2] | 0) > 0 ? 107 : 108;
														l == 107 && (B += 28, a[w + 40 >> 2] += 1);
														if (!((a[w + 36 >> 2] | 0) > 0)) {
															l = 110;
															break g
														}
													}
												}
											while (0);
											k += 1
										}
										l = 113;
										break d
									}
								while (0);
							b += 1
						}
						l == 114 ? i = o - d : l == 103 && (i = -999)
					} while (0)
				} else
			if (l == 26) {
				Yc(y);
				A += a[y + 8 >> 2] - a[y >> 2];
				l = (a[f + 4 >> 2] & 4 | 0) != 0 ? 27 : 32;
				do
					if (l == 27) {
						l = (U[A] & 255 | 0) != 255 ? 29 : 28;
						c: do
								if (l == 28) {
									if ((U[A + 1] & 255 | 0) != 146) {
										l = 29;
										break c
									}
									A += 2;
									l = 31;
									break c
								}
							while (0);
						l == 29 && sa(Re, h(1, "i32", n))
					}
				while (0);
				l = (j | 0) != 0 ? 33 :
					34;
				l == 33 && (a[j + 4 >> 2] = o - d);
				l = (a[m + 92 >> 2] | 0) == 1 ? 35 : 36;
				l == 35 ? (a[m + 104 >> 2] += a[m + 84 >> 2] - A, a[m + 84 >> 2] = A, i = o - d) : l == 36 && (l = (a[f + 5172 >> 2] | 0) == 1 ? 37 : 38, l == 37 ? (a[f + 5180 >> 2] += a[f + 5164 >> 2] - A, a[f + 5164 >> 2] = A, i = o - d) : l == 38 && (i = A - d))
			}
		while (0);
		return i
	}

	function Eb(c, d, e, b) {
		var f = jb(a[c + 4 >> 2], (d + 1) * 28);
		a[c + 4 >> 2] = f;
		d = a[c + 4 >> 2] + d * 28;
		a[d >> 2] = 0;
		a[d + 4 >> 2] = 0;
		a[d + 8 >> 2] = 0;
		a[d + 12 >> 2] = 0;
		c = (e & 4 | 0) != 0 ? 1 : 2;
		if (c == 1) a[d + 16 >> 2] = 1;
		else if (c == 2)
			if (c = (e & 1 | 0) != 0 ? 3 : 9, c == 3)
				if (c = (b | 0) != 0 ? 4 : 5, c == 4) a[d + 16 >> 2] = 10;
				else {
					if (c == 5) {
						if ((a[d - 28 + 16 >>
								2] | 0) == 1) var g = 1,
							c = 7;
						else c = 6;
						c == 6 && (g = (a[d - 28 + 16 >> 2] | 0) == 10);
						a[d + 16 >> 2] = g ? 2 : 1
					}
				}
		else c == 9 && (a[d + 16 >> 2] = 109)
	}

	function Ba(a, d) {
		var e;
		e = (a | 0) > (d | 0) ? 1 : 2;
		if (e == 1) var b = a;
		else e == 2 && (b = d);
		return b
	}

	function oa(a, d) {
		var e;
		e = (a | 0) < (d | 0) ? 1 : 2;
		if (e == 1) var b = a;
		else e == 2 && (b = d);
		return b
	}

	function Ca(a, d) {
		return (a + d - 1 | 0) / (d | 0) | 0
	}

	function N(a, d) {
		return a + (1 << d) - 1 >> (d | 0)
	}

	function jd(c, d, e) {
		var b, f, g, j, h, i, k, n, m, o;
		n = k = i = h = 0;
		a[c + 28 >> 2] = d;
		a[a[c + 24 >> 2] >> 2] = a[e + 68 >> 2];
		a[a[c + 24 >> 2] + 4 >> 2] = a[e + 72 >> 2];
		f = z(a[e + 68 >> 2] * a[e + 72 >>
			2] * 840);
		a[a[c + 24 >> 2] + 8 >> 2] = f;
		g = 0;
		a: for (;;) {
			if (!((g | 0) < (a[e + 80 >> 2] | 0))) break a;
			j = a[a[e + 76 >> 2] + (g << 2) >> 2];
			f = a[a[c + 24 >> 2] + 8 >> 2] + a[a[e + 76 >> 2] + (j << 2) >> 2] * 840;
			a[f + 16 >> 2] = a[d + 16 >> 2];
			m = ba(a[d + 16 >> 2], 32);
			a[f + 20 >> 2] = m;
			g += 1
		}
		f = 0;
		a: for (;;) {
			if (!((f | 0) < (a[d + 16 >> 2] | 0))) break a;
			g = 0;
			b: for (;;) {
				if (!((g | 0) < (a[e + 80 >> 2] | 0))) break b;
				j = a[a[e + 76 >> 2] + (g << 2) >> 2];
				o = a[a[c + 24 >> 2] + 8 >> 2] + a[a[e + 76 >> 2] + (j << 2) >> 2] * 840;
				m = a[o + 20 >> 2] + (f << 5);
				b = (j | 0) % (a[e + 68 >> 2] | 0);
				j = (j | 0) / (a[e + 68 >> 2] | 0) | 0;
				a[o >> 2] = Ba(a[e + 48 >> 2] + b * a[e + 56 >> 2], a[d >> 2]);
				a[o +
					4 >> 2] = Ba(a[e + 52 >> 2] + j * a[e + 60 >> 2], a[d + 4 >> 2]);
				a[o + 8 >> 2] = oa(a[e + 48 >> 2] + (b + 1) * a[e + 56 >> 2], a[d + 8 >> 2]);
				a[o + 12 >> 2] = oa(a[e + 52 >> 2] + (j + 1) * a[e + 60 >> 2], a[d + 12 >> 2]);
				a[m >> 2] = Ca(a[o >> 2], a[a[d + 24 >> 2] + f * 48 >> 2]);
				a[m + 4 >> 2] = Ca(a[o + 4 >> 2], a[a[d + 24 >> 2] + f * 48 + 4 >> 2]);
				a[m + 8 >> 2] = Ca(a[o + 8 >> 2], a[a[d + 24 >> 2] + f * 48 >> 2]);
				a[m + 12 >> 2] = Ca(a[o + 12 >> 2], a[a[d + 24 >> 2] + f * 48 + 4 >> 2]);
				b = (g | 0) == 0 ? 9 : 10;
				if (b == 9) var p = a[m >> 2];
				else b == 10 && (p = oa(h, a[m >> 2]));
				h = p;
				b = (g | 0) == 0 ? 12 : 13;
				if (b == 12) var t = a[m + 4 >> 2];
				else b == 13 && (t = oa(i, a[m >> 2]));
				i = t;
				b = (g | 0) == 0 ? 15 : 16;
				if (b == 15) var A = a[m + 8 >> 2];
				else b == 16 && (A = Ba(k, a[m + 8 >> 2]));
				k = A;
				b = (g | 0) == 0 ? 18 : 19;
				if (b == 18) var y = a[m + 12 >> 2];
				else b == 19 && (y = Ba(n, a[m + 12 >> 2]));
				n = y;
				g += 1
			}
			g = N(k - h, a[a[d + 24 >> 2] + f * 48 + 40 >> 2]);
			m = N(n - i, a[a[d + 24 >> 2] + f * 48 + 40 >> 2]);
			a[a[d + 24 >> 2] + f * 48 + 8 >> 2] = g;
			a[a[d + 24 >> 2] + f * 48 + 12 >> 2] = m;
			a[a[d + 24 >> 2] + f * 48 + 16 >> 2] = h;
			a[a[d + 24 >> 2] + f * 48 + 20 >> 2] = i;
			f += 1
		}
	}

	function kd(c, d, e, b) {
		var f, g, j, h, i, k, n, m, o, p, t, A, y, r, w, q, x, s, B, C, D, F, G, J, K;
		a[c + 32 >> 2] = e;
		k = a[e + 108 >> 2] + a[a[e + 76 >> 2] + (b << 2) >> 2] * 5588;
		e = a[a[c + 24 >> 2] + 8 >> 2] + a[a[e + 76 >> 2] + (b << 2) >> 2] *
			840;
		c = 0;
		a: for (;;) {
			if (!((c | 0) < (a[e + 16 >> 2] | 0))) break a;
			b = a[k + 5584 >> 2] + c * 1076;
			n = a[e + 20 >> 2] + (c << 5);
			a[n >> 2] = Ca(a[e >> 2], a[a[d + 24 >> 2] + c * 48 >> 2]);
			a[n + 4 >> 2] = Ca(a[e + 4 >> 2], a[a[d + 24 >> 2] + c * 48 + 4 >> 2]);
			a[n + 8 >> 2] = Ca(a[e + 8 >> 2], a[a[d + 24 >> 2] + c * 48 >> 2]);
			a[n + 12 >> 2] = Ca(a[e + 12 >> 2], a[a[d + 24 >> 2] + c * 48 + 4 >> 2]);
			a[n + 16 >> 2] = a[b + 4 >> 2];
			g = z(a[n + 16 >> 2] * 124);
			a[n + 20 >> 2] = g;
			g = 0;
			b: for (;;) {
				if (!((g | 0) < (a[n + 16 >> 2] | 0))) break b;
				p = a[n + 16 >> 2] - 1 - g;
				s = a[n + 20 >> 2] + g * 124;
				a[s >> 2] = N(a[n >> 2], p);
				a[s + 4 >> 2] = N(a[n + 4 >> 2], p);
				a[s + 8 >> 2] = N(a[n + 8 >> 2], p);
				a[s + 12 >> 2] =
					N(a[n + 12 >> 2], p);
				a[s + 24 >> 2] = (g | 0) == 0 ? 1 : 3;
				f = (a[b >> 2] & 1 | 0) != 0 ? 5 : 6;
				f == 5 ? (m = a[b + 812 + (g << 2) >> 2], o = a[b + 944 + (g << 2) >> 2]) : f == 6 && (o = m = 15);
				j = a[s >> 2] >> (m | 0) << m;
				t = a[s + 4 >> 2] >> (o | 0) << o;
				A = N(a[s + 8 >> 2], m) << m;
				y = N(a[s + 12 >> 2], o) << o;
				f = (a[s >> 2] | 0) == (a[s + 8 >> 2] | 0) ? 8 : 9;
				if (f == 8) var U = 0;
				else f == 9 && (U = A - j >> (m | 0));
				a[s + 16 >> 2] = U;
				f = (a[s + 4 >> 2] | 0) == (a[s + 12 >> 2] | 0) ? 11 : 12;
				if (f == 11) var X = 0;
				else f == 12 && (X = y - t >> (o | 0));
				a[s + 20 >> 2] = X;
				f = (g | 0) == 0 ? 14 : 15;
				f == 14 ? (r = j, w = t, q = m, x = o) : f == 15 && (r = N(j, 1), w = N(t, 1), q = m - 1, x = o - 1);
				t = oa(a[b + 8 >> 2], q);
				A = oa(a[b + 12 >>
					2], x);
				j = 0;
				c: for (;;) {
					if (!((j | 0) < (a[s + 24 >> 2] | 0))) break c;
					y = s + 28 + (j << 5);
					f = (g | 0) == 0 ? 19 : 20;
					if (f == 19) var Q = 0;
					else f == 20 && (Q = j + 1);
					a[y + 16 >> 2] = Q;
					if ((a[y + 16 >> 2] | 0) == 1) {
						var M = 1;
						f = 23
					} else f = 22;
					f == 22 && (M = (a[y + 16 >> 2] | 0) == 3);
					h = M ? 1 : 0;
					if ((a[y + 16 >> 2] | 0) == 2) {
						var R = 1;
						f = 25
					} else f = 24;
					f == 24 && (R = (a[y + 16 >> 2] | 0) == 3);
					B = R ? 1 : 0;
					f = (a[y + 16 >> 2] | 0) == 0 ? 26 : 27;
					f == 26 ? (a[y >> 2] = N(a[n >> 2], p), a[y + 4 >> 2] = N(a[n + 4 >> 2], p), a[y + 8 >> 2] = N(a[n + 8 >> 2], p), a[y + 12 >> 2] = N(a[n + 12 >> 2], p)) : f == 27 && (a[y >> 2] = N(a[n >> 2] - (1 << p) * h, p + 1), a[y + 4 >> 2] = N(a[n + 4 >> 2] - (1 << p) *
						B, p + 1), a[y + 8 >> 2] = N(a[n + 8 >> 2] - (1 << p) * h, p + 1), a[y + 12 >> 2] = N(a[n + 12 >> 2] - (1 << p) * B, p + 1));
					f = (g | 0) == 0 ? 29 : 30;
					if (f == 29) var P = 0;
					else f == 30 && (P = (g - 1) * 3 + j + 1);
					h = b + 28 + (P << 3);
					f = (a[b + 20 >> 2] | 0) == 0 ? 32 : 33;
					if (f == 32) var T = 0;
					else if (f == 33) {
						T = a[y + 16 >> 2];
						B = f = H;
						f = (T | 0) == 0 ? 1 : 2;
						e: do
								if (f == 1) B = 0;
								else
							if (f == 2) {
								f = (T | 0) == 1 ? 4 : 3;
								f: do
										if (f == 3) {
											if ((T | 0) == 2) {
												f = 4;
												break f
											}
											B = 2;
											break e
										}
									while (0);
								B = 1
							}
						while (0);
						T = B
					}
					f = T;
					B = a[a[d + 24 >> 2] + c * 48 + 24 >> 2] + f;
					f = (a[h + 4 >> 2] | 0) / 2048 + 1;
					B = La(2, B - a[h >> 2] | 0);
					u[y + 28 >> 2] = f * B * 0.5;
					a[y + 24 >> 2] = a[h >> 2] + a[b + 804 >> 2] - 1;
					h = z(a[s + 16 >> 2] * a[s + 20 >> 2] * 36);
					a[y + 20 >> 2] = h;
					h = 0;
					d: for (;;) {
						if (!((h | 0) < (a[s + 16 >> 2] * a[s + 20 >> 2] | 0))) break d;
						B = r + (h | 0) % (a[s + 16 >> 2] | 0) * (1 << q);
						C = w + ((h | 0) / (a[s + 16 >> 2] | 0) | 0) * (1 << x);
						i = B + (1 << q);
						D = C + (1 << x);
						f = a[y + 20 >> 2] + h * 36;
						a[f >> 2] = Ba(B, a[y >> 2]);
						a[f + 4 >> 2] = Ba(C, a[y + 4 >> 2]);
						a[f + 8 >> 2] = oa(i, a[y + 8 >> 2]);
						a[f + 12 >> 2] = oa(D, a[y + 12 >> 2]);
						B = a[f >> 2] >> (t | 0) << t;
						C = a[f + 4 >> 2] >> (A | 0) << A;
						i = N(a[f + 8 >> 2], t) << t;
						D = N(a[f + 12 >> 2], A) << A;
						a[f + 16 >> 2] = i - B >> (t | 0);
						a[f + 20 >> 2] = D - C >> (A | 0);
						i = z(a[f + 16 >> 2] * a[f + 20 >> 2] * 44);
						a[f + 24 >> 2] = i;
						i = oc(a[f + 16 >> 2], a[f +
							20 >> 2]);
						a[f + 28 >> 2] = i;
						i = oc(a[f + 16 >> 2], a[f + 20 >> 2]);
						a[f + 32 >> 2] = i;
						i = 0;
						e: for (;;) {
							if (!((i | 0) < (a[f + 16 >> 2] * a[f + 20 >> 2] | 0))) break e;
							D = B + (i | 0) % (a[f + 16 >> 2] | 0) * (1 << t);
							F = C + ((i | 0) / (a[f + 16 >> 2] | 0) | 0) * (1 << A);
							G = D + (1 << t);
							J = F + (1 << A);
							K = a[f + 24 >> 2] + i * 44;
							a[K >> 2] = 0;
							a[K + 4 >> 2] = 0;
							a[K + 8 >> 2] = Ba(D, a[f >> 2]);
							a[K + 12 >> 2] = Ba(F, a[f + 4 >> 2]);
							a[K + 16 >> 2] = oa(G, a[f + 8 >> 2]);
							a[K + 20 >> 2] = oa(J, a[f + 12 >> 2]);
							a[K + 40 >> 2] = 0;
							i += 1
						}
						h += 1
					}
					j += 1
				}
				g += 1
			}
			c += 1
		}
	}

	function ld(c, d, e, b, f) {
		var g, j, l, i, k, o, m, p, t, s, A, y, r, w, q, x;
		i = 0;
		a[c + 44 >> 2] = b;
		a[c + 36 >> 2] = a[a[c + 24 >> 2] + 8 >> 2] +
			b * 840;
		a[c + 40 >> 2] = a[a[c + 32 >> 2] + 108 >> 2] + b * 5588;
		o = a[c + 36 >> 2];
		k = Oa();
		F(a[c + 20 >> 2], 4, Se, h([b + 1, 0, 0, 0, a[a[c + 32 >> 2] + 68 >> 2] * a[a[c + 32 >> 2] + 72 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
		g = (f | 0) != 0 ? 1 : 13;
		do
			if (g == 1) {
				p = t = 0;
				b: for (;;) {
					if (!((p | 0) < (a[f + 52 >> 2] | 0))) {
						g = 12;
						break b
					}
					m = a[a[c + 32 >> 2] + 108 >> 2];
					s = a[m + 5584 >> 2] + p * 1076;
					A = a[o + 20 >> 2] + (p << 5);
					m = 0;
					c: for (;;) {
						if (!((m | 0) < (a[A + 16 >> 2] | 0))) {
							g = 10;
							break c
						}
						g = a[A + 20 >> 2] + m * 124;
						a[a[f + 88 >> 2] + b * 572 + 20 + (m << 2) >> 2] = a[g + 16 >> 2];
						a[a[f + 88 >> 2] + b * 572 + 152 + (m << 2) >> 2] = a[g + 20 >> 2];
						t += a[g + 16 >> 2] * a[g +
							20 >> 2];
						g = (a[s >> 2] & 1 | 0) != 0 ? 6 : 7;
						g == 6 ? (a[a[f + 88 >> 2] + b * 572 + 284 + (m << 2) >> 2] = a[s + 812 + (m << 2) >> 2], a[a[f + 88 >> 2] + b * 572 + 416 + (m << 2) >> 2] = a[s + 944 + (m << 2) >> 2]) : g == 7 && (a[a[f + 88 >> 2] + b * 572 + 284 + (m << 2) >> 2] = 15, a[a[f + 88 >> 2] + b * 572 + 284 + (m << 2) >> 2] = 15);
						m += 1
					}
					p += 1
				}
				p = z(a[f + 56 >> 2] * t * 20);
				a[a[f + 88 >> 2] + b * 572 + 548 >> 2] = p;
				a[f + 8 >> 2] = 0
			}
		while (0);
		g = a[c + 20 >> 2];
		p = a[c + 28 >> 2];
		t = a[c + 32 >> 2];
		s = z(12);
		m = (s | 0) != 0 ? 2 : 1;
		m == 2 ? (a[s >> 2] = g, a[s + 4 >> 2] = p, a[s + 8 >> 2] = t, y = s) : m == 1 && (y = 0);
		g = (Ne(y, d, e, b, o, f) | 0) == -999 ? 14 : 15;
		g == 14 && (i = 1, F(a[c + 20 >> 2], 1, Te, h(1, "i32", n)));
		d = Oa();
		b = a[c + 20 >> 2];
		e = z(40);
		f = (e | 0) != 0 ? 2 : 1;
		f == 2 ? (a[e >> 2] = b, l = z(104), a[e + 4 >> 2] = l, l = z(28), a[e + 8 >> 2] = l, a[e + 12 >> 2] = 0, a[e + 16 >> 2] = 0, a[e + 28 >> 2] = 0, a[e + 32 >> 2] = 0, l = e) : f == 1 && (l = 0);
		e = l;
		l = 0;
		a: for (;;) {
			if (!((l | 0) < (a[o + 16 >> 2] | 0))) {
				g = 19;
				break a
			}
			b = a[o + 20 >> 2] + (l << 5);
			f = fb((a[b + 8 >> 2] - a[b >> 2]) * (a[b + 12 >> 2] - a[b + 4 >> 2]) + 3 << 2);
			a[b + 24 >> 2] = f;
			ve(e, b, a[a[c + 40 >> 2] + 5584 >> 2] + l * 1076);
			l += 1
		}
		d = Oa() - d;
		F(a[c + 20 >> 2], 4, Ue, h([d, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
		d = Oa();
		l = 0;
		a: for (;;) {
			if (!((l | 0) < (a[o + 16 >> 2] | 0))) {
				g = 32;
				break a
			}
			e = a[o +
				20 >> 2] + (l << 5);
			g = (a[a[c + 32 >> 2] + 36 >> 2] | 0) != 0 ? 22 : 25;
			do
				if (g == 22 && (a[a[a[c + 28 >> 2] + 24 >> 2] + l * 48 + 36 >> 2] = a[a[o + 20 >> 2] + (l << 5) + 16 >> 2] - a[a[c + 32 >> 2] + 36 >> 2] - 1, (a[a[a[c + 28 >> 2] + 24 >> 2] + l * 48 + 36 >> 2] | 0) < 0)) {
					g = 23;
					break a
				}
			while (0);
			b = a[a[a[c + 28 >> 2] + 24 >> 2] + l * 48 + 36 >> 2] + 1;
			g = (b | 0) > 0 ? 26 : 30;
			g == 26 && (g = (a[a[a[c + 40 >> 2] + 5584 >> 2] + l * 1076 + 20 >> 2] | 0) == 1 ? 27 : 28, g == 27 ? ad(e, b, 2) : g == 28 && ed(e, b));
			l += 1
		}
		do
			if (g == 32) {
				d = Oa() - d;
				F(a[c + 20 >> 2], 4, Ve, h([d, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
				g = (a[a[c + 40 >> 2] + 16 >> 2] | 0) != 0 ? 33 : 37;
				g == 33 && (l = (a[a[o +
					20 >> 2] + 8 >> 2] - a[a[o + 20 >> 2] >> 2]) * (a[a[o + 20 >> 2] + 12 >> 2] - a[a[o + 20 >> 2] + 4 >> 2]), g = (a[a[a[c + 40 >> 2] + 5584 >> 2] + 20 >> 2] | 0) == 1 ? 34 : 35, g == 34 ? fe(a[a[o + 20 >> 2] + 24 >> 2], a[a[o + 20 >> 2] + 32 + 24 >> 2], a[a[o + 20 >> 2] + 64 + 24 >> 2], l) : g == 35 && ge(a[a[o + 20 >> 2] + 24 >> 2], a[a[o + 20 >> 2] + 32 + 24 >> 2], a[a[o + 20 >> 2] + 64 + 24 >> 2], l));
				l = 0;
				b: for (;;) {
					if (!((l | 0) < (a[o + 16 >> 2] | 0))) break b;
					e = a[o + 20 >> 2] + (l << 5);
					b = a[a[c + 28 >> 2] + 24 >> 2] + l * 48;
					f = a[e + 20 >> 2] + a[b + 36 >> 2] * 124;
					g = (a[b + 32 >> 2] | 0) != 0 ? 40 : 41;
					if (g == 40) var C = 0;
					else g == 41 && (C = 1 << a[b + 24 >> 2] - 1);
					y = C;
					g = (a[b + 32 >> 2] | 0) != 0 ? 43 :
						44;
					if (g == 43) var B = -(1 << a[b + 24 >> 2] - 1);
					else g == 44 && (B = 0);
					p = B;
					g = (a[b + 32 >> 2] | 0) != 0 ? 46 : 47;
					if (g == 46) var D = (1 << a[b + 24 >> 2] - 1) - 1;
					else g == 47 && (D = (1 << a[b + 24 >> 2]) - 1);
					t = D;
					m = a[e + 8 >> 2] - a[e >> 2];
					s = a[b + 8 >> 2];
					A = N(a[b + 16 >> 2], a[b + 40 >> 2]);
					r = N(a[b + 20 >> 2], a[b + 40 >> 2]);
					g = (a[b + 44 >> 2] | 0) != 0 ? 50 : 49;
					g == 49 && (g = z(a[b + 8 >> 2] * a[b + 12 >> 2] << 2), a[b + 44 >> 2] = g);
					g = (a[a[a[c + 40 >> 2] + 5584 >> 2] + l * 1076 + 20 >> 2] | 0) == 1 ? 51 : 60;
					do
						if (g == 51) {
							q = a[f + 4 >> 2];
							d: for (;;) {
								if (!((q | 0) < (a[f + 12 >> 2] | 0))) {
									g = 59;
									break d
								}
								w = a[f >> 2];
								e: for (;;) {
									if (!((w | 0) < (a[f + 8 >> 2] | 0))) {
										g = 57;
										break e
									}
									x = a[a[e + 24 >> 2] + (w - a[f >> 2] + (q - a[f + 4 >> 2]) * m << 2) >> 2];
									x += y;
									a[a[b + 44 >> 2] + (w - A + (q - r) * s << 2) >> 2] = We(x, p, t);
									w += 1
								}
								q += 1
							}
						} else if (g == 60) {
						q = a[f + 4 >> 2];
						d: for (;;) {
							if (!((q | 0) < (a[f + 12 >> 2] | 0))) {
								g = 68;
								break d
							}
							w = a[f >> 2];
							e: for (;;) {
								if (!((w | 0) < (a[f + 8 >> 2] | 0))) {
									g = 66;
									break e
								}
								x = u[a[e + 24 >> 2] + (w - a[f >> 2] + (q - a[f + 4 >> 2]) * m << 2) >> 2];
								x = x > 0 ? -Math.round(-x) : Math.round(x);
								x += y;
								a[a[b + 44 >> 2] + (w - A + (q - r) * s << 2) >> 2] = We(x, p, t);
								w += 1
							}
							q += 1
						}
					} while (0);
					l += 1
				}
				k = Oa() - k;
				F(a[c + 20 >> 2], 4, Xe, h([k, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
				g = (i | 0) !=
					0 ? 72 : 73;
				g == 72 ? j = 0 : g == 73 && (j = 1)
			} else g == 23 && (F(a[c + 20 >> 2], 1, Ye, h([a[a[c + 32 >> 2] + 36 >> 2], 0, 0, 0, a[a[o + 20 >> 2] + (l << 5) + 16 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n)), j = 0); while (0);
		return j
	}

	function We(a, d, e) {
		var b, f;
		b = (a | 0) < (d | 0) ? 1 : 2;
		b == 1 ? f = d : b == 2 && (b = (a | 0) > (e | 0) ? 3 : 4, b == 3 ? f = e : b == 4 && (f = a));
		return f
	}

	function mc(c) {
		var d, e;
		d = 0 == (c | 0) ? 1 : 2;
		a: do
				if (d != 1 && d == 2) {
					e = 0;
					for (;;) {
						if (!((e | 0) < (a[c + 8 >> 2] | 0))) break a;
						a[a[c + 12 >> 2] + (e << 4) + 4 >> 2] = 999;
						a[a[c + 12 >> 2] + (e << 4) + 8 >> 2] = 0;
						a[a[c + 12 >> 2] + (e << 4) + 12 >> 2] = 0;
						e += 1
					}
				}
			while (0)
	}

	function oc(c,
		d) {
		var e = t;
		t += 256;
		D(t < X);
		var b, f, g = e + 128,
			j, h, i, k, n, m, o;
		i = z(16);
		b = (i | 0) != 0 ? 2 : 1;
		do
			if (b == 2) {
				a[i >> 2] = c;
				a[i + 4 >> 2] = d;
				o = 0;
				a[e >> 2] = c;
				a[g >> 2] = d;
				a[i + 8 >> 2] = 0;
				b: for (;;)
					if (j = a[e + (o << 2) >> 2] * a[g + (o << 2) >> 2], a[e + (o + 1 << 2) >> 2] = (a[e + (o << 2) >> 2] + 1 | 0) / 2 | 0, a[g + (o + 1 << 2) >> 2] = (a[g + (o << 2) >> 2] + 1 | 0) / 2 | 0, a[i + 8 >> 2] += j, o += 1, !((j | 0) > 1)) break b;
				b = (a[i + 8 >> 2] | 0) == 0 ? 6 : 7;
				do
					if (b == 6) f = 0;
					else if (b == 7) {
					j = ba(a[i + 8 >> 2], 16);
					a[i + 12 >> 2] = j;
					b = (a[i + 12 >> 2] | 0) != 0 ? 9 : 8;
					do
						if (b == 9) {
							f = a[i + 12 >> 2];
							h = j = a[i + 12 >> 2] + (a[i >> 2] * a[i + 4 >> 2] << 4);
							k = 0;
							d: for (;;) {
								if (!((k |
										0) < (o - 1 | 0))) {
									b = 26;
									break d
								}
								n = 0;
								e: for (;;) {
									if (!((n | 0) < (a[g + (k << 2) >> 2] | 0))) {
										b = 24;
										break e
									}
									m = a[e + (k << 2) >> 2];
									f: for (;;) {
										m = b = m - 1;
										if (!((b | 0) >= 0)) break f;
										a[f >> 2] = j;
										f += 16;
										m = b = m - 1;
										b = (b | 0) >= 0 ? 16 : 17;
										b == 16 && (a[f >> 2] = j, f += 16);
										j += 16
									}
									b = (n & 1 | 0) != 0 ? 20 : 19;
									f: do
											if (b == 19) {
												if ((n | 0) == (a[g + (k << 2) >> 2] - 1 | 0)) {
													b = 20;
													break f
												}
												j = h;
												h += a[e + (k << 2) >> 2] << 4;
												b = 22;
												break f
											}
										while (0);
									b == 20 && (h = j);
									n += 1
								}
								k += 1
							}
							a[f >> 2] = 0;
							mc(i);
							f = i
						} else b == 8 && (f = 0); while (0)
				} while (0)
			} else b == 1 && (f = 0); while (0);
		t = e;
		return f
	}

	function nc(c, d, e, b) {
		var f = t;
		t += 124;
		D(t < X);
		var g, j;
		j = f;
		d = a[d + 12 >> 2] + (e << 4);
		a: for (;;) {
			if ((a[d >> 2] | 0) == 0) break a;
			e = j;
			j = e + 4;
			a[e >> 2] = d;
			d = a[d >> 2]
		}
		e = 0;
		a: for (;;) {
			g = (e | 0) > (a[d + 8 >> 2] | 0) ? 5 : 6;
			g == 5 ? a[d + 8 >> 2] = e : g == 6 && (e = a[d + 8 >> 2]);
			b: for (;;) {
				if ((e | 0) < (b | 0)) g = 9;
				else {
					var h = 0;
					g = 10
				}
				g == 9 && (h = (e | 0) < (a[d + 4 >> 2] | 0));
				if (!h) break b;
				g = (ma(c, 1) | 0) != 0 ? 12 : 13;
				g == 12 ? a[d + 4 >> 2] = e : g == 13 && (e += 1)
			}
			a[d + 8 >> 2] = e;
			if ((j | 0) == (f | 0)) break a;
			j = d = j - 4;
			d = a[d >> 2]
		}
		c = (a[d + 4 >> 2] | 0) < (b | 0) ? 1 : 0;
		t = f;
		return c
	}

	function Ze() {
		o(a[a[x >> 2] + 8 >> 2], $e, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], af, h(1, "i32", n));
		o(a[a[x >>
			2] + 8 >> 2], bf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Ua, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Ua, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], cf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], df, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], ef, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], ff, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], gf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], hf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], jf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], kf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], lf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], mf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], nf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], of ,
			h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], pf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], qf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], rf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], sf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], tf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], uf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], vf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], wf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], xf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], yf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], zf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Af, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Bf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Cf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Df, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Ef, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Ff, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Gf, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Ua, h(1, "i32", n));
		o(a[a[x >> 2] + 8 >> 2], Ua, h(1, "i32", n))
	}

	function Hf(c, d) {
		var e, b, f, g;
		g = 0;
		f = If(d);
		e = (f | 0) != 0 ? 2 : 1;
		do
			if (e == 2) {
				o(a[a[x >> 2] + 12 >> 2], Jf, h(1, "i32", n));
				b: for (;;) {
					b = e = Va(f);
					if ((e | 0) == 0) {
						e = 9;
						break b
					}
					e = (pb(qb, b + 4) | 0) == 0 ? 7 : 6;
					c: do
							if (e == 6) {
								if ((pb(pc, b + 4) | 0) == 0) {
									e = 7;
									break c
								}
								rb(a[a[c + 4 >> 2] + (g << 2) >> 2], b + 4);
								g += 1;
								e = 4;
								continue b
							}
						while (0)
				}
				b = 0
			} else e ==
				1 && (o(a[a[x >> 2] + 12 >> 2], qc, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n)), b = 1); while (0);
		return b
	}

	function Fb(c) {
		var d, e;
		a: {
			e = c + xa(c);do {
				if (p[e] == 46) break a;
				e--
			} while (e >= c);e = 0
		}
		c = (e | 0) == 0 ? 1 : 2;
		a: do
				if (c == 1) d = -1;
				else
			if (c == 2) {
				e += 1;
				c = (e | 0) != 0 ? 3 : 10;
				do
					if (c == 3) {
						d = 0;
						c: for (;;) {
							if (!(d >>> 0 < 14)) {
								c = 9;
								break c
							}
							if ((ii(e, a[ca + (d << 2) >> 2]) | 0) == 0) {
								c = 6;
								break c
							}
							d += 1
						}
						do
							if (c != 9 && c == 6) {
								d = a[Kf + (d << 2) >> 2];
								break a
							}
						while (0)
					}
				while (0);
				d = -1
			}
		while (0);
		return d
	}

	function Lf(c, d, e, b) {
		var f = t;
		t += 20480;
		D(t < X);
		var g, j = f + 4096,
			l = f + 8192,
			i = f + 12288,
			k = f + 16384,
			E, m, s, q;
		E = k;
		m = E + 4096;
		q = 0;
		q < 0 && (q += 256);
		for (q = q + (q << 8) + (q << 16) + q * 16777216; E % 4 !== 0 && E < m;) p[E++] = 0;
		E >>= 2;
		for (s = m >> 2; E < s;) a[E++] = q;
		for (E <<= 2; E < m;) p[E++] = 0;
		rb(f, a[a[d + 4 >> 2] + (c << 2) >> 2]);
		o(a[a[x >> 2] + 12 >> 2], Mf, h([c, 0, 0, 0, f, 0, 0, 0], ["i32", 0, 0, 0, "i8*", 0, 0, 0], n));
		a[b + 8200 >> 2] = Fb(f);
		c = (a[b + 8200 >> 2] | 0) == -1 ? 1 : 2;
		do
			if (c == 1) g = 1;
			else if (c == 2) {
			Da(j, Nf, h([a[e >> 2], 0, 0, 0, f, 0, 0, 0], ["i8*", 0, 0, 0, "i8*", 0, 0, 0], n));
			Wa(b + 8, j, 4096);
			g = i;
			c = Of(f, qb);
			rb(g, c);
			b: for (;;) {
				g = c = Of(0, qb);
				if ((c | 0) == 0) break b;
				c = i;
				d = k;
				E = xa(c);
				m = 0;
				do {
					var r;
					s = d + m;
					q = c + E + m;
					for (r = s + 1; s < r;) p[q++] = p[s++];
					m++
				} while (p[d + m - 1] != 0);
				Da(k, rc, h([g, 0, 0, 0], ["i8*", 0, 0, 0], n))
			}
			c = (p[e + 9] << 24 >> 24 | 0) == 1 ? 6 : 7;
			c == 6 && (Da(l, Pf, h([a[e >> 2], 0, 0, 0, i, 0, 0, 0, a[e + 4 >> 2], 0, 0, 0], ["i8*", 0, 0, 0, "i8*", 0, 0, 0, "i8*", 0, 0, 0], n)), Wa(b + 4104, l, 4096));
			g = 0
		} while (0);
		t = f;
		return g
	}

	function Qf(c, d, e, b, f) {
		var g = t;
		t += 84;
		D(t < X);
		var j, l, i, k, E, m = g + 32,
			s;
		D(I, "memcpy given 32 bytes to copy. Problem with quantum=1 corrections perhaps?");
		var q, r;
		i = Gb;
		s = g;
		q = i + 32;
		if (s % 4 == i % 4) {
			for (; i % 4 !== 0 && i < q;) p[s++] = p[i++];
			i >>= 2;
			s >>= 2;
			for (r = q >> 2; i < r;) a[s++] = a[i++];
			i <<= 2;
			s <<= 2
		}
		for (; i < q;) p[s++] = p[i++];
		p[b + 9] = 0;
		a: for (;;) {
			i = Rf(c, d, Sf, g, 32);
			if ((i | 0) == -1) {
				j = 2;
				break a
			}
			j = i;
			if (j == 105) j = 4;
			else if (j == 111) j = 8;
			else if (j == 79) j = 12;
			else if (j == 114) j = 22;
			else if (j == 108) j = 23;
			else if (j == 104) {
				j = 24;
				break a
			} else j = j == 121 ? 25 : j == 120 ? 26 : 27;
			do
				if (j == 27) o(a[a[x >> 2] + 12 >> 2], Tf, h([i, 0, 0, 0, a[aa >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i8*", 0, 0, 0], n));
				else if (j == 4) {
				k = a[aa >> 2];
				a[e + 8200 >> 2] = Fb(k);
				if (a[e + 8200 >> 2] != 0 && a[e + 8200 >> 2] != 1 && a[e + 8200 >> 2] != 2) {
					j = 6;
					break a
				}
				Wa(e + 8, k, 4095)
			} else if (j ==
				8) {
				E = a[aa >> 2];
				a[e + 8204 >> 2] = Fb(E);
				s = a[e + 8204 >> 2];
				if (s != 11 && s != 10 && s != 12 && s != 14 && s != 15 && s != 16 && s != 17) {
					j = 10;
					break a
				}
				Wa(e + 4104, E, 4095)
			} else if (j == 12) {
				j = a[aa >> 2];
				Da(m, rc, h([j, 0, 0, 0], ["i8*", 0, 0, 0], n));
				p[b + 9] = 1;
				a[e + 8204 >> 2] = Fb(m);
				j = a[e + 8204 >> 2];
				if (j == 11) j = 13;
				else if (j == 10) j = 14;
				else if (j == 12) j = 15;
				else if (j == 14) j = 16;
				else if (j == 15) j = 17;
				else if (j == 16) j = 18;
				else if (j == 17) j = 19;
				else {
					j = 20;
					break a
				}
				j == 13 ? a[b + 4 >> 2] = sc : j == 14 ? a[b + 4 >> 2] = tc : j == 15 ? a[b + 4 >> 2] = uc : j == 16 ? a[b + 4 >> 2] = vc : j == 17 ? a[b + 4 >> 2] = Hb : j == 18 ? a[b + 4 >> 2] = Hb : j ==
					19 && (a[b + 4 >> 2] = wc)
			} else j == 22 ? Uf(a[aa >> 2], xc, h([e, 0, 0, 0], ["i32*", 0, 0, 0], n)) : j == 23 ? Uf(a[aa >> 2], xc, h([e + 4, 0, 0, 0], ["i32*", 0, 0, 0], n)) : j == 25 ? (s = z(xa(a[aa >> 2]) + 1), a[b >> 2] = s, rb(a[b >> 2], a[aa >> 2]), p[b + 8] = 1) : j == 26 && (s = a[aa >> 2], Wa(f, s, 4096));
			while (0)
		}
		a: do
			if (j == 2) {
				j = (p[b + 8] << 24 >> 24 | 0) == 1 ? 30 : 37;
				b: do
						if (j == 30) {
							j = (p[e + 8] << 24 >> 24 | 0) == 0 ? 32 : 31;
							do
								if (j == 32) {
									j = (p[b + 9] << 24 >> 24 | 0) == 0 ? 33 : 34;
									do
										if (j == 33) {
											o(a[a[x >> 2] + 12 >> 2], Vf, h(1, "i32", n));
											o(a[a[x >> 2] + 12 >> 2], Wf, h(1, "i32", n));
											l = 1;
											break a
										} else if (j == 34) {
										j = (p[e + 4104] << 24 >>
											24 | 0) == 0 ? 36 : 35;
										do
											if (j != 36 && j == 35) {
												o(a[a[x >> 2] + 12 >> 2], Xf, h(1, "i32", n));
												l = 1;
												break a
											}
										while (0)
									} while (0)
								} else if (j == 31) {
								o(a[a[x >> 2] + 12 >> 2], Yf, h(1, "i32", n));
								l = 1;
								break a
							} while (0)
						} else
					if (j == 37) {
						j = (p[e + 8] << 24 >> 24 | 0) == 0 ? 39 : 38;
						c: do
								if (j == 38) {
									if ((p[e + 4104] << 24 >> 24 | 0) == 0) break c;
									j = 41;
									break b
								}
							while (0);
						o(a[a[x >> 2] + 12 >> 2], Zf, h([a[d >> 2], 0, 0, 0], ["i8*", 0, 0, 0], n));
						o(a[a[x >> 2] + 12 >> 2], $f, h([a[d >> 2], 0, 0, 0], ["i8*", 0, 0, 0], n));
						l = 1;
						break a
					}
				while (0);
				l = 0
			} else j == 24 ? (Ze(), l = 1) : j == 6 ? (o(a[a[x >> 2] + 12 >> 2], ag, h([k, 0, 0, 0], ["i8*",
				0, 0, 0
			], n)), l = 1) : j == 10 ? (o(a[a[x >> 2] + 12 >> 2], yc, h([E, 0, 0, 0], ["i8*", 0, 0, 0], n)), l = 1) : j == 20 && (o(a[a[x >> 2] + 12 >> 2], yc, h([m, 0, 0, 0], ["i8*", 0, 0, 0], n)), l = 1); while (0);
		t = g;
		return l
	}

	function zc(c, d) {
		var e = t;
		t += 12436;
		D(t < X);
		var b, f, g = e + 8224,
			j = e + 8236,
			l, i, k, E, m, q, r, u, A = e + 8248,
			y = e + 8340;
		f = 0;
		l = j;
		m = l + 12;
		k = 0;
		k < 0 && (k += 256);
		for (k = k + (k << 8) + (k << 16) + k * 16777216; l % 4 !== 0 && l < m;) p[l++] = 0;
		l >>= 2;
		for (i = m >> 2; l < i;) a[l++] = k;
		for (l <<= 2; l < m;) p[l++] = 0;
		a[j >> 2] = 4;
		a[j + 4 >> 2] = 6;
		a[j + 8 >> 2] = 8;
		if (((e | 0) != 0 ? 1 : 2) == 1) {
			l = e;
			m = l + 8224;
			k = 0;
			k < 0 && (k += 256);
			for (k =
				k + (k << 8) + (k << 16) + k * 16777216; l % 4 !== 0 && l < m;) p[l++] = 0;
			l >>= 2;
			for (i = m >> 2; l < i;) a[l++] = k;
			for (l <<= 2; l < m;) p[l++] = 0;
			a[e + 4 >> 2] = 0;
			a[e >> 2] = 0;
			a[e + 8220 >> 2] = 0;
			a[e + 8200 >> 2] = -1;
			a[e + 8204 >> 2] = -1
		}
		p[y] = 0;
		l = g;
		m = l + 12;
		k = 0;
		k < 0 && (k += 256);
		for (k = k + (k << 8) + (k << 16) + k * 16777216; l % 4 !== 0 && l < m;) p[l++] = 0;
		l >>= 2;
		for (i = m >> 2; l < i;) a[l++] = k;
		for (l <<= 2; l < m;) p[l++] = 0;
		b = (Qf(c, d, e, g, y) | 0) == 1 ? 1 : 2;
		a: do
				if (b == 1) f = 1;
				else
			if (b == 2) {
				b = (p[g + 8] << 24 >> 24 | 0) == 1 ? 3 : 16;
				do
					if (b == 3) {
						E = a[g >> 2];
						m = l = q = k = i = H;
						m = 0;
						q = If(E);
						i = (q | 0) != 0 ? 2 : 1;
						do
							if (i == 2) {
								d: for (;;) {
									l = i = Va(q);
									if ((i | 0) == 0) {
										i = 8;
										break d
									}
									i = (pb(qb, l + 4) | 0) == 0 ? 6 : 5;
									e: do
											if (i == 5) {
												if ((pb(pc, l + 4) | 0) == 0) {
													i = 6;
													break e
												}
												m += 1;
												i = 3;
												continue d
											}
										while (0)
								}
								k = m
							}
						else i == 1 && (o(a[a[x >> 2] + 12 >> 2], qc, h([E, 0, 0, 0], ["i8*", 0, 0, 0], n)), k = 0);
						while (0);
						E = k;
						q = z(8);
						b = (q | 0) != 0 ? 4 : 11;
						do
							if (b == 4) {
								l = z(E << 12);
								a[q >> 2] = l;
								l = z(E << 2);
								a[q + 4 >> 2] = l;
								b = (a[q >> 2] | 0) != 0 ? 6 : 5;
								do
									if (b == 6) {
										l = 0;
										e: for (;;) {
											if (!((l | 0) < (E | 0))) {
												b = 10;
												break e
											}
											a[a[q + 4 >> 2] + (l << 2) >> 2] = a[q >> 2] + (l << 12);
											l += 1
										}
									} else if (b == 5) {
									f = 1;
									break a
								} while (0)
							}
						while (0);
						b = (Hf(q, a[g >> 2]) | 0) == 1 ? 12 : 13;
						do
							if (b == 12) {
								f =
									1;
								break a
							} else if (b == 13) {
							b = (E | 0) == 0 ? 14 : 15;
							do
								if (b == 14) {
									o(a[a[x >> 2] + 8 >> 2], bg, h(1, "i32", n));
									f = 1;
									break a
								}
							while (0)
						} while (0)
					} else b == 16 && (E = 1); while (0);
				m = 0;
				b: for (;;) {
					if (!((m | 0) < (E | 0))) {
						b = 93;
						break b
					}
					l = 0;
					o(a[a[x >> 2] + 12 >> 2], Ua, h(1, "i32", n));
					b = (p[g + 8] << 24 >> 24 | 0) == 1 ? 20 : 23;
					c: do
							if (b == 20) {
								b = Lf(m, q, g, e) << 24 >> 24 != 0 ? 21 : 22;
								do
									if (b == 21) {
										o(a[a[x >> 2] + 12 >> 2], cg, h(1, "i32", n));
										b = 92;
										break c
									} else if (b == 22) {
									b = 23;
									break c
								} while (0)
							}
						while (0);
					c: do
							if (b == 23) {
								b = pa(e + 8, dg);
								if ((b | 0) == 0) {
									b = 24;
									break b
								}
								eg(b, 2);
								k = ji(b);
								eg(b, 0);
								i = z(k);
								var L = b;
								r = k * 1;
								if (r != 0)
									if (u = fg(L, i, r), L = s.a[L], u == -1) {
										if (L) L.error = I
									} else if (u < r) L.f = I;
								ta(b);
								b = a[e + 8200 >> 2];
								b = b == 0 ? 26 : b == 1 ? 36 : b == 2 ? 46 : 56;
								do
									if (b == 56) {
										o(a[a[x >> 2] + 12 >> 2], gg, h(1, "i32", n));
										b = 92;
										break c
									} else if (b == 26) {
									r = Cb(0);
									bc(r, j, a[a[x >> 2] + 12 >> 2]);
									lc(r, e);
									u = Ab(r, i, k);
									b = p[y] << 24 >> 24 != 0 ? 27 : 28;
									b == 27 ? l = Ia(r, u, A) : b == 28 && (l = Ia(r, u, 0));
									if ((l | 0) == 0) {
										b = 30;
										break b
									}
									b = p[y] << 24 >> 24 != 0 ? 32 : 35;
									b == 32 && (b = Ib(A, y) & 255, b = b << 24 >> 24 != 0 ? 33 : 34, b == 33 && o(a[a[x >> 2] + 12 >> 2], Jb, h(1, "i32", n)))
								} else if (b == 36) {
									r = Cb(2);
									bc(r, j, a[a[x >>
										2] + 12 >> 2]);
									lc(r, e);
									u = Ab(r, i, k);
									b = p[y] << 24 >> 24 != 0 ? 37 : 38;
									b == 37 ? l = Ia(r, u, A) : b == 38 && (l = Ia(r, u, 0));
									if ((l | 0) == 0) {
										b = 40;
										break b
									}
									b = p[y] << 24 >> 24 != 0 ? 42 : 45;
									b == 42 && (b = Ib(A, y) & 255, b = b << 24 >> 24 != 0 ? 43 : 44, b == 43 && o(a[a[x >> 2] + 12 >> 2], Jb, h(1, "i32", n)))
								} else if (b == 46) {
									r = Cb(1);
									bc(r, j, a[a[x >> 2] + 12 >> 2]);
									lc(r, e);
									u = Ab(r, i, k);
									b = p[y] << 24 >> 24 != 0 ? 47 : 48;
									b == 47 ? l = Ia(r, u, A) : b == 48 && (l = Ia(r, u, 0));
									if ((l | 0) == 0) {
										b = 50;
										break b
									}
									b = p[y] << 24 >> 24 != 0 ? 52 : 55;
									b == 52 && (b = Ib(A, y) & 255, b = b << 24 >> 24 != 0 ? 53 : 54, b == 53 && o(a[a[x >> 2] + 12 >> 2], Jb, h(1, "i32", n)))
								}
								while (0);
								b = (a[l + 20 >> 2] | 0) == 3 ? 58 : 59;
								b == 58 && hg(l);
								b = (a[l + 28 >> 2] | 0) != 0 ? 60 : 61;
								b == 60 && (a[l + 28 >> 2] = 0, a[l + 32 >> 2] = 0);
								i = a[e + 8204 >> 2];
								b = i == 10 ? 62 : i == 11 ? 66 : i == 12 ? 70 : i == 15 ? 74 : i == 16 ? 78 : i == 17 ? 82 : 86;
								b == 86 ? o(a[a[x >> 2] + 12 >> 2], sb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)) : b == 62 ? (b = (ig(l, e + 4104) | 0) != 0 ? 63 : 64, b == 63 ? o(a[a[x >> 2] + 8 >> 2], sb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)) : b == 64 && o(a[a[x >> 2] + 8 >> 2], Kb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n))) : b == 66 ? (b = (jg(l, e + 4104) | 0) != 0 ? 67 : 68, b == 67 ? o(a[a[x >> 2] + 8 >> 2], sb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)) : b == 68 &&
									o(a[a[x >> 2] + 8 >> 2], Kb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n))) : b == 70 ? (b = (kg(l, e + 4104) | 0) != 0 ? 71 : 72, b == 71 ? o(a[a[x >> 2] + 8 >> 2], sb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)) : b == 72 && o(a[a[x >> 2] + 8 >> 2], Kb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n))) : b == 74 ? (a[Ac >> 2] = a[l + 8 >> 2] - a[l >> 2], a[Bc >> 2] = a[l + 12 >> 2] - a[l + 4 >> 2], b = (lg(l, e + 4104) | 0) != 0 ? 75 : 76, b == 75 ? o(a[a[x >> 2] + 8 >> 2], mg, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)) : b == 76 && o(a[a[x >> 2] + 8 >> 2], Lb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n))) : b == 78 ? (b = (ng(l, e + 4104) | 0) != 0 ? 79 : 80, b == 79 ? o(a[a[x >> 2] + 8 >> 2], og, h([e +
									4104, 0, 0, 0
								], ["i8*", 0, 0, 0], n)) : b == 80 && o(a[a[x >> 2] + 8 >> 2], Lb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n))) : b == 82 && (b = (pg(l, e + 4104) | 0) != 0 ? 83 : 84, b == 83 ? o(a[a[x >> 2] + 8 >> 2], qg, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)) : b == 84 && o(a[a[x >> 2] + 8 >> 2], Lb, h([e + 4104, 0, 0, 0], ["i8*", 0, 0, 0], n)));
								b = p[y] << 24 >> 24 != 0 ? 90 : 91
							}
						while (0);
					m += 1
				}
				b == 93 ? f = 0 : b == 24 ? (o(a[a[x >> 2] + 12 >> 2], rg, h([e + 8, 0, 0, 0], ["i8*", 0, 0, 0], n)), f = 1) : b == 30 ? (o(a[a[x >> 2] + 12 >> 2], Mb, h(1, "i32", n)), f = 1) : b == 40 ? (o(a[a[x >> 2] + 12 >> 2], Mb, h(1, "i32", n)), f = 1) : b == 50 && (o(a[a[x >> 2] + 12 >> 2], Mb, h(1, "i32",
					n)), f = 1)
			}
		while (0);
		t = e;
		return f
	}

	function sg(c, d, e, b, f) {
		var g = t;
		t += 20;
		D(t < X);
		var j, h;
		j = (d | 0) != 0 ? 1 : 3;
		a: do
				if (j == 1) {
					if ((e | 0) == 0) {
						j = 3;
						break a
					}
					if ((b | 0) == 0) {
						j = 3;
						break a
					}
					var i, k;
					j = g;
					h = j + 18;
					k = 0;
					k < 0 && (k += 256);
					for (k = k + (k << 8) + (k << 16) + k * 16777216; j % 4 !== 0 && j < h;) p[j++] = 0;
					j >>= 2;
					for (i = h >> 2; j < i;) a[j++] = k;
					for (j <<= 2; j < h;) p[j++] = 0;
					p[g + 16] = d & 255;
					q[g + 12 >> 1] = e & 65535;
					q[g + 14 >> 1] = b & 65535;
					p[g + 2] = 2;
					p[g + 17] = 8;
					j = (f | 0) != 0 ? 5 : 6;
					j == 5 && (p[g + 17] = (U[g + 17] & 255 | 32) & 255);
					ga(g, 18, 1, c);
					h = 1;
					j = 7;
					break a
				}
			while (0);
		j == 3 && (h = 0);
		t = g;
		return h
	}

	function ng(c,
		d) {
		var e = t;
		t += 4;
		D(t < X);
		var b, f, g, j, i, k, s, q, m, r, u, z, A;
		z = pa(d, ua);
		b = (z | 0) != 0 ? 2 : 1;
		do
			if (b == 2) {
				g = 0;
				b: for (;;) {
					if (!((g | 0) < (a[c + 16 >> 2] - 1 | 0))) {
						b = 10;
						break b
					}
					if ((a[a[c + 24 >> 2] >> 2] | 0) != (a[a[c + 24 >> 2] + (g + 1) * 48 >> 2] | 0)) {
						b = 7;
						break b
					}
					if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + (g + 1) * 48 + 4 >> 2] | 0)) {
						b = 7;
						break b
					}
					if ((a[a[c + 24 >> 2] + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + (g + 1) * 48 + 24 >> 2] | 0)) {
						b = 7;
						break b
					}
					g += 1
				}
				do
					if (b == 10) {
						g = a[a[c + 24 >> 2] + 8 >> 2];
						j = a[a[c + 24 >> 2] + 12 >> 2];
						if ((a[c + 16 >> 2] | 0) == 2) {
							var y = 1;
							b = 12
						} else b = 11;
						b == 11 && (y = (a[c + 16 >> 2] | 0) == 4);
						k = y &
							1;
						b = (k | 0) != 0 ? 32 : 24;
						b = (sg(z, b, g, j, 1) | 0) != 0 ? 14 : 13;
						do
							if (b == 14) {
								s = a[c + 16 >> 2] - 1;
								u = 255 / ((1 << a[a[c + 24 >> 2] + 24 >> 2]) - 1 | 0);
								i = 0;
								d: for (;;) {
									if (!((i | 0) < (j | 0))) {
										b = 27;
										break d
									}
									A = i * g;
									f = 0;
									e: for (;;) {
										if (!((f | 0) < (g | 0))) {
											b = 25;
											break e
										}
										q = a[a[a[c + 24 >> 2] + 44 >> 2] + (A << 2) >> 2] | 0;
										b = (a[c + 16 >> 2] | 0) > 2 ? 19 : 20;
										b == 19 ? (m = a[a[a[c + 24 >> 2] + 48 + 44 >> 2] + (A << 2) >> 2] | 0, r = a[a[a[c + 24 >> 2] + 96 + 44 >> 2] + (A << 2) >> 2] | 0) : b == 20 && (r = m = q);
										p[e] = Math.floor(r * u);
										ga(e, 1, 1, z);
										p[e] = Math.floor(m * u);
										ga(e, 1, 1, z);
										p[e] = Math.floor(q * u);
										ga(e, 1, 1, z);
										b = (k | 0) != 0 ? 22 : 23;
										b == 22 && (q =
											a[a[a[c + 24 >> 2] + s * 48 + 44 >> 2] + (A << 2) >> 2] | 0, p[e] = Math.floor(q * u), ga(e, 1, 1, z));
										f += 1;
										A += 1
									}
									i += 1
								}
								f = 0
							} else b == 13 && (f = 1); while (0)
					} else b == 7 && (o(a[a[x >> 2] + 12 >> 2], tg, h(1, "i32", n)), f = 1); while (0)
			} else b == 1 && (o(a[a[x >> 2] + 12 >> 2], Xa, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n)), f = 1); while (0);
		t = e;
		return f
	}

	function kg(c, d) {
		var e, b, f, g, j, i, k, p, s, m, q, r;
		e = (a[c + 16 >> 2] | 0) == 3 ? 1 : 41;
		a: do
				if (e == 1) {
					if ((a[a[c + 24 >> 2] >> 2] | 0) != (a[a[c + 24 >> 2] + 48 >> 2] | 0)) {
						e = 41;
						break a
					}
					if ((a[a[c + 24 >> 2] + 48 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 >> 2] | 0)) {
						e = 41;
						break a
					}
					if ((a[a[c + 24 >> 2] +
							4 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0)) {
						e = 41;
						break a
					}
					if ((a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 + 4 >> 2] | 0)) {
						e = 41;
						break a
					}
					if ((a[a[c + 24 >> 2] + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0)) {
						e = 41;
						break a
					}
					if ((a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 + 24 >> 2] | 0)) {
						e = 41;
						break a
					}
					k = pa(d, ua);
					e = (k | 0) != 0 ? 9 : 8;
					do
						if (e == 9) {
							f = a[a[c + 24 >> 2] + 8 >> 2];
							g = a[a[c + 24 >> 2] + 12 >> 2];
							o(k, Cc, h(1, "i32", n));
							o(k, M, h([g * f * 3 + g * 3 * ((f | 0) % 2) + 54 & 255, 0, 0, 0, g * f * 3 + g * 3 * ((f | 0) % 2) + 54 >> 8 & 255, 0, 0, 0, g * f * 3 + g * 3 * ((f | 0) % 2) + 54 >> 16 & 255, 0, 0, 0, g * f * 3 + g * 3 * ((f | 0) % 2) + 54 >>
								24 & 255, 0, 0, 0
							], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h(16, "i32", n));
							o(k, M, h([54, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h([40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h([f & 255, 0, 0, 0, f >> 8 & 255, 0, 0, 0, f >> 16 & 255, 0, 0, 0, f >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h([g & 255, 0, 0, 0, g >> 8 & 255, 0, 0, 0, g >> 16 & 255, 0, 0, 0, g >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32",
								0, 0, 0, "i32", 0, 0, 0
							], n));
							o(k, tb, h([1, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, tb, h([24, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h(16, "i32", n));
							o(k, M, h([g * 3 * f + g * 3 * ((f | 0) % 2) & 255, 0, 0, 0, g * f * 3 + g * 3 * ((f | 0) % 2) >> 8 & 255, 0, 0, 0, g * f * 3 + g * 3 * ((f | 0) % 2) >> 16 & 255, 0, 0, 0, g * f * 3 + g * 3 * ((f | 0) % 2) >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h([154, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							o(k, M, h([154, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32",
								0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0
							], n));
							o(k, M, h(16, "i32", n));
							o(k, M, h(16, "i32", n));
							e = (a[a[c + 24 >> 2] + 24 >> 2] | 0) > 8 ? 10 : 11;
							e == 10 ? (p = a[a[c + 24 >> 2] + 24 >> 2] - 8, sa(Dc, h([a[a[c + 24 >> 2] + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : e == 11 && (p = 0);
							e = (a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0) > 8 ? 13 : 14;
							e == 13 ? (s = a[a[c + 24 >> 2] + 48 + 24 >> 2] - 8, sa(ug, h([a[a[c + 24 >> 2] + 48 + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : e == 14 && (s = 0);
							e = (a[a[c + 24 >> 2] + 96 + 24 >> 2] | 0) > 8 ? 16 : 17;
							e == 16 ? (m = a[a[c + 24 >> 2] + 96 + 24 >> 2] - 8, sa(vg, h([a[a[c + 24 >> 2] + 96 + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : e == 17 && (m =
								0);
							j = 0;
							c: for (;;) {
								if (!((j | 0) < (f * g | 0))) break c;
								i = a[a[a[c + 24 >> 2] + 44 >> 2] + (f * g - (((j | 0) / (f | 0) | 0) + 1) * f + (j | 0) % (f | 0) << 2) >> 2];
								e = (a[a[c + 24 >> 2] + 32 >> 2] | 0) != 0 ? 21 : 22;
								if (e == 21) var t = 1 << a[a[c + 24 >> 2] + 24 >> 2] - 1;
								else e == 22 && (t = 0);
								i += t;
								i = (i >> (p | 0)) + (i >> (p - 1 | 0) | 0) % 2 & 255;
								q = a[a[a[c + 24 >> 2] + 48 + 44 >> 2] + (f * g - (((j | 0) / (f | 0) | 0) + 1) * f + (j | 0) % (f | 0) << 2) >> 2];
								e = (a[a[c + 24 >> 2] + 48 + 32 >> 2] | 0) != 0 ? 24 : 25;
								if (e == 24) var A = 1 << a[a[c + 24 >> 2] + 48 + 24 >> 2] - 1;
								else e == 25 && (A = 0);
								q += A;
								q = (q >> (s | 0)) + (q >> (s - 1 | 0) | 0) % 2 & 255;
								r = a[a[a[c + 24 >> 2] + 96 + 44 >> 2] + (f * g - (((j | 0) / (f |
									0) | 0) + 1) * f + (j | 0) % (f | 0) << 2) >> 2];
								e = (a[a[c + 24 >> 2] + 96 + 32 >> 2] | 0) != 0 ? 27 : 28;
								if (e == 27) var y = 1 << a[a[c + 24 >> 2] + 96 + 24 >> 2] - 1;
								else e == 28 && (y = 0);
								r += y;
								e = (r >> (m | 0)) + (r >> (m - 1 | 0) | 0) % 2 & 255;
								o(k, Ec, h([e & 255, 0, 0, 0, q & 255, 0, 0, 0, i & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
								e = ((j + 1 | 0) % (f | 0) | 0) == 0 ? 30 : 38;
								do
									if (e == 30) {
										e = ((f * 3 | 0) % 4 | 0) != 0 ? 31 : 32;
										if (e == 31) var u = 4 - (f * 3 | 0) % 4;
										else e == 32 && (u = 0);
										i = u;
										e: for (;;) {
											if (!((i | 0) > 0)) {
												e = 37;
												break e
											}
											o(k, ub, h(4, "i32", n));
											i -= 1
										}
									}
								while (0);
								j += 1
							}
							ta(k);
							e = 65;
							break a
						} else if (e == 8) {
						o(a[a[x >> 2] + 12 >>
							2], Xa, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n));
						b = 1;
						e = 66;
						break a
					} while (0)
				}
			while (0);
		a: do
				if (e == 41) {
					k = pa(d, ua);
					f = a[a[c + 24 >> 2] + 8 >> 2];
					g = a[a[c + 24 >> 2] + 12 >> 2];
					o(k, Cc, h(1, "i32", n));
					o(k, M, h([g * f + 1078 + g * ((f | 0) % 2) & 255, 0, 0, 0, g * f + 1078 + g * ((f | 0) % 2) >> 8 & 255, 0, 0, 0, g * f + 1078 + g * ((f | 0) % 2) >> 16 & 255, 0, 0, 0, g * f + 1078 + f * ((f | 0) % 2) >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h(16, "i32", n));
					o(k, M, h([54, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([40, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0, 0
					], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([f & 255, 0, 0, 0, f >> 8 & 255, 0, 0, 0, f >> 16 & 255, 0, 0, 0, f >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([g & 255, 0, 0, 0, g >> 8 & 255, 0, 0, 0, g >> 16 & 255, 0, 0, 0, g >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, tb, h([1, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, tb, h([8, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h(16, "i32", n));
					o(k, M, h([g * f + g * ((f | 0) % 2) & 255, 0, 0, 0, g * f + g * ((f | 0) %
						2) >> 8 & 255, 0, 0, 0, g * f + g * ((f | 0) % 2) >> 16 & 255, 0, 0, 0, g * f + g * ((f | 0) % 2) >> 24 & 255, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([154, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([154, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
					o(k, M, h([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0,
						0, "i32", 0, 0, 0
					], n));
					e = (a[a[c + 24 >> 2] + 24 >> 2] | 0) > 8 ? 42 : 43;
					e == 42 ? (p = a[a[c + 24 >> 2] + 24 >> 2] - 8, sa(Dc, h([a[a[c + 24 >> 2] + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : e == 43 && (p = 0);
					j = 0;
					b: for (;;) {
						if (!((j | 0) < 256)) break b;
						o(k, M, h([j, 0, 0, 0, j, 0, 0, 0, j, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
						j += 1
					}
					j = 0;
					b: for (;;) {
						if (!((j | 0) < (f * g | 0))) break b;
						s = a[a[a[c + 24 >> 2] + 44 >> 2] + (f * g - (((j | 0) / (f | 0) | 0) + 1) * f + (j | 0) % (f | 0) << 2) >> 2];
						e = (a[a[c + 24 >> 2] + 32 >> 2] | 0) != 0 ? 51 : 52;
						if (e == 51) var w = 1 << a[a[c + 24 >> 2] + 24 >> 2] - 1;
						else e == 52 && (w = 0);
						s += w;
						e = (s >> (p | 0)) + (s >> (p - 1 | 0) | 0) % 2 & 255;
						o(k, ub, h([e & 255, 0, 0, 0], ["i32", 0, 0, 0], n));
						e = ((j + 1 | 0) % (f | 0) | 0) == 0 ? 54 : 62;
						do
							if (e == 54) {
								e = ((f | 0) % 4 | 0) != 0 ? 55 : 56;
								if (e == 55) var z = 4 - (f | 0) % 4;
								else e == 56 && (z = 0);
								i = z;
								d: for (;;) {
									if (!((i | 0) > 0)) {
										e = 61;
										break d
									}
									o(k, ub, h(4, "i32", n));
									i -= 1
								}
							}
						while (0);
						j += 1
					}
					ta(k);
					e = 65;
					break a
				}
			while (0);
		e == 65 && (b = 0);
		return b
	}

	function jg(c, d) {
		var e = t;
		t += 260;
		D(t < X);
		var b, f, g, j, i, k, s, q, m, r, u, C = e + 256;
		s = 0;
		a: for (;;) {
			if (!((s | 0) < (a[c + 16 >> 2] | 0))) {
				b = 29;
				break a
			}
			i = a[c + 24 >> 2] + s * 48;
			m = e;
			r = 0;
			b = xa(d);
			g = b - 4;
			j = g + 6;
			if ((p[d + g] <<
					24 >> 24 | 0) != 46) {
				b = 3;
				break a
			}
			b = j >>> 0 > 256 ? 5 : 6;
			b == 5 && (m = z(j + 1));
			Wa(m, d, g);
			b = (a[c + 16 >> 2] | 0) > 1 ? 7 : 8;
			b == 7 ? Da(m + g, wg, h([s, 0, 0, 0], ["i32", 0, 0, 0], n)) : b == 8 && rb(m + g, xg);
			q = pa(m, ua);
			if ((q | 0) == 0) {
				b = 10;
				break a
			}
			g = a[a[c + 24 >> 2] + s * 48 + 8 >> 2];
			j = a[a[c + 24 >> 2] + s * 48 + 12 >> 2];
			o(q, yg, h([(a[i + 32 >> 2] | 0) != 0 ? 45 : 43, 0, 0, 0, a[i + 24 >> 2], 0, 0, 0, g, 0, 0, 0, j, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
			b = (a[i + 24 >> 2] | 0) <= 8 ? 14 : 15;
			b == 14 ? r = 1 : b == 15 && (b = (a[i + 24 >> 2] | 0) <= 16 ? 16 : 17, b == 16 ? r = 2 : b == 17 && (r = 4));
			i = 0;
			b: for (;;) {
				if (!((i | 0) < (g * j | 0))) {
					b =
						27;
					break b
				}
				u = a[a[a[c + 24 >> 2] + s * 48 + 44 >> 2] + (i << 2) >> 2];
				k = r - 1;
				c: for (;;) {
					if (!((k | 0) >= 0)) {
						b = 25;
						break c
					}
					p[C] = u >> (k << 3 | 0) & 255;
					ga(C, 1, 1, q);
					k -= 1
				}
				i += 1
			}
			ta(q);
			s += 1
		}
		b == 29 ? f = 0 : b == 3 ? (o(a[a[x >> 2] + 12 >> 2], zg, h(1, "i32", n)), f = 1) : b == 10 && (o(a[a[x >> 2] + 12 >> 2], Xa, h([m, 0, 0, 0], ["i8*", 0, 0, 0], n)), f = 1);
		t = e;
		return f
	}

	function ig(c, d) {
		var e = t;
		t += 256;
		D(t < X);
		var b, f, g, j, i, k, s, q, m, r, u, z, A, y;
		g = d;
		a: for (;;) {
			if (p[g] << 24 >> 24 == 0) break a;
			g += 1
		}
		g -= 1;
		g -= 1;
		u = p[g];
		b = (a[c + 16 >> 2] | 0) == 3 ? 4 : 40;
		a: do
				if (b == 4) {
					if ((a[a[c + 24 >> 2] >> 2] | 0) != (a[a[c + 24 >> 2] + 48 >>
							2] | 0)) {
						b = 40;
						break a
					}
					if ((a[a[c + 24 >> 2] + 48 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 >> 2] | 0)) {
						b = 40;
						break a
					}
					if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0)) {
						b = 40;
						break a
					}
					if ((a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 + 4 >> 2] | 0)) {
						b = 40;
						break a
					}
					if ((a[a[c + 24 >> 2] + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0)) {
						b = 40;
						break a
					}
					if ((a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 + 24 >> 2] | 0)) {
						b = 40;
						break a
					}
					if ((u << 24 >> 24 | 0) == 103) {
						b = 40;
						break a
					}
					if ((u << 24 >> 24 | 0) == 71) {
						b = 40;
						break a
					}
					r = pa(d, ua);
					b = (r | 0) != 0 ? 14 : 13;
					do
						if (b == 14) {
							g = a[a[c + 24 >> 2] + 8 >> 2];
							j = a[a[c +
								24 >> 2] + 12 >> 2];
							b = (a[a[c + 24 >> 2] + 24 >> 2] | 0) > 8 ? 15 : 16;
							b == 15 ? i = 255 : b == 16 && (i = (1 << a[a[c + 24 >> 2] + 24 >> 2]) - 1);
							b = i;
							a[a[c + 24 >> 2] + 16 >> 2] = a[a[c + 24 >> 2] + 16 >> 2] - ((a[c >> 2] + a[a[c + 24 >> 2] >> 2] - 1 | 0) / (a[a[c + 24 >> 2] >> 2] | 0) | 0) + (1 << a[a[c + 24 >> 2] + 40 >> 2]) - 1 >> (a[a[c + 24 >> 2] + 40 >> 2] | 0);
							a[a[c + 24 >> 2] + 20 >> 2] = a[a[c + 24 >> 2] + 20 >> 2] - ((a[c + 4 >> 2] + a[a[c + 24 >> 2] + 4 >> 2] - 1 | 0) / (a[a[c + 24 >> 2] + 4 >> 2] | 0) | 0) + (1 << a[a[c + 24 >> 2] + 40 >> 2]) - 1 >> (a[a[c + 24 >> 2] + 40 >> 2] | 0);
							o(r, Ag, h([g, 0, 0, 0, j, 0, 0, 0, b, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							b = (a[a[c + 24 >> 2] + 24 >>
								2] | 0) > 8 ? 18 : 19;
							b == 18 ? (k = a[a[c + 24 >> 2] + 24 >> 2] - 8, sa(Bg, h([a[a[c + 24 >> 2] + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : b == 19 && (k = 0);
							b = (a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0) > 8 ? 21 : 22;
							b == 21 ? (s = a[a[c + 24 >> 2] + 48 + 24 >> 2] - 8, sa(Cg, h([a[a[c + 24 >> 2] + 48 + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : b == 22 && (s = 0);
							b = (a[a[c + 24 >> 2] + 96 + 24 >> 2] | 0) > 8 ? 24 : 25;
							b == 24 ? (q = a[a[c + 24 >> 2] + 96 + 24 >> 2] - 8, sa(Dg, h([a[a[c + 24 >> 2] + 96 + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n))) : b == 25 && (q = 0);
							i = 0;
							c: for (;;) {
								if (!((i | 0) < (g * j | 0))) break c;
								z = a[a[a[c + 24 >> 2] + 44 >> 2] + (i << 2) >> 2];
								b = (a[a[c + 24 >> 2] + 32 >> 2] | 0) !=
									0 ? 29 : 30;
								if (b == 29) var L = 1 << a[a[c + 24 >> 2] + 24 >> 2] - 1;
								else b == 30 && (L = 0);
								z += L;
								z = (z >> (k | 0)) + (z >> (k - 1 | 0) | 0) % 2 & 255;
								A = a[a[a[c + 24 >> 2] + 48 + 44 >> 2] + (i << 2) >> 2];
								b = (a[a[c + 24 >> 2] + 48 + 32 >> 2] | 0) != 0 ? 32 : 33;
								if (b == 32) var w = 1 << a[a[c + 24 >> 2] + 48 + 24 >> 2] - 1;
								else b == 33 && (w = 0);
								A += w;
								A = (A >> (s | 0)) + (A >> (s - 1 | 0) | 0) % 2 & 255;
								y = a[a[a[c + 24 >> 2] + 96 + 44 >> 2] + (i << 2) >> 2];
								b = (a[a[c + 24 >> 2] + 96 + 32 >> 2] | 0) != 0 ? 35 : 36;
								if (b == 35) var C = 1 << a[a[c + 24 >> 2] + 96 + 24 >> 2] - 1;
								else b == 36 && (C = 0);
								y += C;
								b = (y >> (q | 0)) + (y >> (q - 1 | 0) | 0) % 2 & 255;
								o(r, Ec, h([z & 255, 0, 0, 0, A & 255, 0, 0, 0, b & 255, 0, 0,
									0
								], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
								i += 1
							}
							ta(r);
							b = 69;
							break a
						} else if (b == 13) {
						o(a[a[x >> 2] + 12 >> 2], Xa, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n));
						f = 1;
						b = 70;
						break a
					} while (0)
				}
			while (0);
		a: do
				if (b == 40) {
					b = (u << 24 >> 24 | 0) == 103 ? 42 : 41;
					b: do
							if (b == 41) {
								if ((u << 24 >> 24 | 0) == 71) {
									b = 42;
									break b
								}
								var F = a[c + 16 >> 2];
								b = 44;
								break b
							}
						while (0);
					b == 42 && (F = 1);
					s = F;
					b = (a[c + 16 >> 2] | 0) > (s | 0) ? 45 : 46;
					b == 45 && (o(a[a[x >> 2] + 12 >> 2], Eg, h(1, "i32", n)), o(a[a[x >> 2] + 12 >> 2], Fg, h(1, "i32", n)));
					k = 0;
					b: for (;;) {
						if (!((k | 0) < (s | 0))) {
							b = 68;
							break b
						}
						b = (s | 0) > 1 ? 49 : 50;
						b == 49 ? Da(e,
							Gg, h([k, 0, 0, 0, d, 0, 0, 0], ["i32", 0, 0, 0, "i8*", 0, 0, 0], n)) : b == 50 && Da(e, Hg, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n));
						r = pa(e, ua);
						if ((r | 0) == 0) {
							b = 52;
							break b
						}
						g = a[a[c + 24 >> 2] + k * 48 + 8 >> 2];
						j = a[a[c + 24 >> 2] + k * 48 + 12 >> 2];
						b = (a[a[c + 24 >> 2] + k * 48 + 24 >> 2] | 0) > 8 ? 54 : 55;
						if (b == 54) var K = 255;
						else b == 55 && (K = (1 << a[a[c + 24 >> 2] + k * 48 + 24 >> 2]) - 1);
						b = K;
						a[a[c + 24 >> 2] + k * 48 + 16 >> 2] = a[a[c + 24 >> 2] + k * 48 + 16 >> 2] - ((a[c >> 2] + a[a[c + 24 >> 2] + k * 48 >> 2] - 1 | 0) / (a[a[c + 24 >> 2] + k * 48 >> 2] | 0) | 0) + (1 << a[a[c + 24 >> 2] + k * 48 + 40 >> 2]) - 1 >> (a[a[c + 24 >> 2] + k * 48 + 40 >> 2] | 0);
						a[a[c + 24 >> 2] + k * 48 + 20 >> 2] =
							a[a[c + 24 >> 2] + k * 48 + 20 >> 2] - ((a[c + 4 >> 2] + a[a[c + 24 >> 2] + k * 48 + 4 >> 2] - 1 | 0) / (a[a[c + 24 >> 2] + k * 48 + 4 >> 2] | 0) | 0) + (1 << a[a[c + 24 >> 2] + k * 48 + 40 >> 2]) - 1 >> (a[a[c + 24 >> 2] + k * 48 + 40 >> 2] | 0);
						o(r, Ig, h([g, 0, 0, 0, j, 0, 0, 0, b, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
						b = (a[a[c + 24 >> 2] + k * 48 + 24 >> 2] | 0) > 8 ? 57 : 58;
						b == 57 ? (m = a[a[c + 24 >> 2] + 24 >> 2] - 8, sa(Jg, h([k, 0, 0, 0, a[a[c + 24 >> 2] + k * 48 + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n))) : b == 58 && (m = 0);
						i = 0;
						c: for (;;) {
							if (!((i | 0) < (g * j | 0))) {
								b = 66;
								break c
							}
							q = a[a[a[c + 24 >> 2] + k * 48 + 44 >> 2] + (i << 2) >> 2];
							b = (a[a[c + 24 >> 2] +
								k * 48 + 32 >> 2] | 0) != 0 ? 62 : 63;
							if (b == 62) var B = 1 << a[a[c + 24 >> 2] + k * 48 + 24 >> 2] - 1;
							else b == 63 && (B = 0);
							q += B;
							q = (q >> (m | 0)) + (q >> (m - 1 | 0) | 0) % 2 & 255;
							o(r, ub, h([q & 255, 0, 0, 0], ["i32", 0, 0, 0], n));
							i += 1
						}
						ta(r);
						k += 1
					}
					do
						if (b == 68) {
							b = 69;
							break a
						} else if (b == 52) {
						o(a[a[x >> 2] + 12 >> 2], Xa, h([e, 0, 0, 0], ["i8*", 0, 0, 0], n));
						f = 1;
						b = 70;
						break a
					} while (0)
				}
			while (0);
		b == 69 && (f = 0);
		t = e;
		return f
	}

	function lg(c, d) {
		var e = t;
		t += 16;
		D(t < X);
		var b, f, g, j, i, k, s, q, m, r, u = e + 4,
			z, A = e + 8,
			y = e + 12;
		b = (a[c + 16 >> 2] * a[c + 8 >> 2] * a[c + 12 >> 2] | 0) == 0 ? 1 : 2;
		do
			if (b == 1) o(a[a[x >> 2] + 12 >> 2], Kg, h(1,
				"i32", n)), f = 1;
			else if (b == 2) {
			g = pa(d, ua);
			b = (g | 0) != 0 ? 4 : 3;
			do
				if (b == 4) {
					o(a[a[x >> 2] + 8 >> 2], Lg, h([a[c + 16 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
					j = 0;
					c: for (;;) {
						if (!((j | 0) < (a[c + 16 >> 2] | 0))) {
							b = 58;
							break c
						}
						o(a[a[x >> 2] + 8 >> 2], Mg, h([j, 0, 0, 0, a[a[c + 24 >> 2] + j * 48 + 8 >> 2], 0, 0, 0, a[a[c + 24 >> 2] + j * 48 + 12 >> 2], 0, 0, 0, a[a[c + 24 >> 2] + j * 48 + 24 >> 2], 0, 0, 0, (a[a[c + 24 >> 2] + j * 48 + 32 >> 2] | 0) == 1 ? Ng : Og, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i8*", 0, 0, 0], n));
						i = a[a[c + 24 >> 2] + j * 48 + 8 >> 2];
						k = a[a[c + 24 >> 2] + j * 48 + 12 >> 2];
						b = (a[a[c + 24 >> 2] + j * 48 + 24 >> 2] | 0) <=
							8 ? 7 : 29;
						do
							if (b == 7) {
								b = (a[a[c + 24 >> 2] + j * 48 + 32 >> 2] | 0) == 1 ? 8 : 17;
								do
									if (b == 8) {
										r = (1 << a[a[c + 24 >> 2] + j * 48 + 24 >> 2]) - 1;
										m = a[a[c + 24 >> 2] + j * 48 + 44 >> 2];
										s = 0;
										f: for (;;) {
											if (!((s | 0) < (k | 0))) {
												b = 16;
												break f
											}
											q = 0;
											g: for (;;) {
												if (!((q | 0) < (i | 0))) {
													b = 14;
													break g
												}
												p[e] = a[m >> 2] & r & 255;
												ga(e, 1, 1, g);
												m += 4;
												q += 1
											}
											s += 1
										}
									} else if (b == 17) {
									b = (a[a[c + 24 >> 2] + j * 48 + 32 >> 2] | 0) == 0 ? 18 : 27;
									do
										if (b == 18) {
											r = (1 << a[a[c + 24 >> 2] + j * 48 + 24 >> 2]) - 1;
											m = a[a[c + 24 >> 2] + j * 48 + 44 >> 2];
											s = 0;
											g: for (;;) {
												if (!((s | 0) < (k | 0))) {
													b = 26;
													break g
												}
												q = 0;
												h: for (;;) {
													if (!((q | 0) < (i | 0))) {
														b = 24;
														break h
													}
													p[u] = a[m >>
														2] & r & 255;
													ga(u, 1, 1, g);
													m += 4;
													q += 1
												}
												s += 1
											}
										}
									while (0)
								} while (0)
							} else if (b == 29) {
							if (!((a[a[c + 24 >> 2] + j * 48 + 24 >> 2] | 0) <= 16)) {
								b = 52;
								break c
							}
							b = (a[a[c + 24 >> 2] + j * 48 + 32 >> 2] | 0) == 1 ? 31 : 40;
							do
								if (b == 31) {
									z = (1 << a[a[c + 24 >> 2] + j * 48 + 24 >> 2]) - 1;
									m = a[a[c + 24 >> 2] + j * 48 + 44 >> 2];
									s = 0;
									f: for (;;) {
										if (!((s | 0) < (k | 0))) {
											b = 39;
											break f
										}
										q = 0;
										g: for (;;) {
											if (!((q | 0) < (i | 0))) {
												b = 37;
												break g
											}
											r = a[m >> 2] & z & 65535;
											p[A] = r << 16 >> 16 >> 8 & 255;
											ga(A, 1, 1, g);
											p[A] = r & 255;
											ga(A, 1, 1, g);
											m += 4;
											q += 1
										}
										s += 1
									}
								} else if (b == 40) {
								b = (a[a[c + 24 >> 2] + j * 48 + 32 >> 2] | 0) == 0 ? 41 : 50;
								do
									if (b == 41) {
										z = (1 << a[a[c + 24 >>
											2] + j * 48 + 24 >> 2]) - 1;
										m = a[a[c + 24 >> 2] + j * 48 + 44 >> 2];
										s = 0;
										g: for (;;) {
											if (!((s | 0) < (k | 0))) {
												b = 49;
												break g
											}
											q = 0;
											h: for (;;) {
												if (!((q | 0) < (i | 0))) {
													b = 47;
													break h
												}
												r = a[m >> 2] & z & 65535;
												p[y] = (r & 65535) >> 8 & 255;
												ga(y, 1, 1, g);
												p[y] = r & 255;
												ga(y, 1, 1, g);
												m += 4;
												q += 1
											}
											s += 1
										}
									}
								while (0)
							} while (0)
						} while (0);
						j += 1
					}
					b == 58 ? (ta(g), f = 0) : b == 52 && (b = (a[a[c + 24 >> 2] + j * 48 + 24 >> 2] | 0) <= 32 ? 53 : 54, b == 53 ? (o(a[a[x >> 2] + 12 >> 2], Pg, h(1, "i32", n)), f = 1) : b == 54 && (o(a[a[x >> 2] + 12 >> 2], Qg, h([a[a[c + 24 >> 2] + j * 48 + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n)), f = 1))
				} else b == 3 && (o(a[a[x >> 2] + 12 >> 2], Rg, h([d,
					0, 0, 0
				], ["i8*", 0, 0, 0], n)), f = 1); while (0)
		} while (0);
		t = e;
		return f
	}

	function pg(c, d) {
		var e = t;
		t += 16;
		D(t < X);
		var b, f, g, j = e + 4,
			i, k, q, r, m, u, O, F, A, y, L, w, K, G, J, B, T, M, R, $, P, V, S, N = e + 8,
			Q;
		S = -1;
		M = P = V = 0;
		B = 1;
		R = a[a[c + 24 >> 2] + 24 >> 2];
		$ = a[a[c + 24 >> 2] + 24 >> 2];
		b = ($ | 0) > 8 ? 1 : 3;
		a: do
				if (b == 1) {
					if (!(($ | 0) < 16)) break a;
					$ = 16;
					M = 1
				}
			while (0);
		b = ($ | 0) != 1 ? 4 : 9;
		a: do
				if (b == 4) {
					if (($ | 0) == 2) {
						b = 9;
						break a
					}
					if (($ | 0) == 4) {
						b = 9;
						break a
					}
					if (($ | 0) == 8) {
						b = 9;
						break a
					}
					if (($ | 0) == 16) {
						b = 9;
						break a
					}
					o(a[a[x >> 2] + 12 >> 2], Sg, h([d, 0, 0, 0, $, 0, 0, 0], ["i8*", 0, 0, 0, "i32", 0, 0, 0], n));
					f = B;
					b = 127;
					break a
				}
			while (0);
		do
			if (b == 9) {
				g = pa(d, ua);
				b = (g | 0) == 0 ? 10 : 11;
				do
					if (b == 10) f = B;
					else if (b == 11) {
					f = a[j >> 2] = 0;
					i = ki(Tg, 0, 0, 0);
					a[e >> 2] = i;
					b = (a[e >> 2] | 0) == 0 ? 12 : 13;
					c: do
							if (b != 12 && b == 13) {
								i = li(a[e >> 2]);
								a[j >> 2] = i;
								b = (a[j >> 2] | 0) == 0 ? 14 : 15;
								do
									if (b != 14 && b == 15) {
										b = 17;
										do
											if (b != 16 && b == 17) {
												mi(a[e >> 2], g);
												ni(a[e >> 2], 9);
												b = ($ | 0) == 16 ? 18 : 19;
												b == 18 ? S = -1 : b == 19 && (b = ($ | 0) == 8 ? 20 : 21, b == 20 ? S = 255 : b == 21 && (b = ($ | 0) == 4 ? 22 : 23, b == 22 ? S = 15 : b == 23 && (b = ($ | 0) == 2 ? 24 : 25, b == 24 ? S = 3 : b == 25 && (b = ($ | 0) == 1 ? 26 : 27, b == 26 && (S = 1)))));
												A = a[c + 16 >> 2];
												b = (A | 0) >=
													3 ? 32 : 77;
												f: do
														if (b == 32) {
															if ((a[a[c + 24 >> 2] >> 2] | 0) != (a[a[c + 24 >> 2] + 48 >> 2] | 0)) {
																b = 77;
																break f
															}
															if ((a[a[c + 24 >> 2] + 48 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 >> 2] | 0)) {
																b = 77;
																break f
															}
															if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0)) {
																b = 77;
																break f
															}
															if ((a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 + 4 >> 2] | 0)) {
																b = 77;
																break f
															}
															if ((a[a[c + 24 >> 2] + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0)) {
																b = 77;
																break f
															}
															if ((a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0) != (a[a[c + 24 >> 2] + 96 + 24 >> 2] | 0)) {
																b = 77;
																break f
															}
															f = (A | 0) > 3 & 1;
															T = ($ | 0) == 16 & 1;
															O = a[a[c + 24 >> 2] + 8 >> 2];
															F = a[a[c + 24 >> 2] + 12 >> 2];
															i =
																a[a[c + 24 >> 2] + 44 >> 2];
															k = a[a[c + 24 >> 2] + 48 + 44 >> 2];
															q = a[a[c + 24 >> 2] + 96 + 44 >> 2];
															p[N + 2] = $ & 255;
															p[N + 1] = $ & 255;
															p[N] = $ & 255;
															b = (f | 0) != 0 ? 39 : 40;
															b == 39 ? (p[N + 4] = $ & 255, r = a[a[c + 24 >> 2] + 144 + 44 >> 2], y = 6) : b == 40 && (r = p[N + 4] = 0, y = 2);
															Ug(a[e >> 2], a[j >> 2], N);
															Vg(a[e >> 2], a[j >> 2], O, F, $, y, 0, 0, 0);
															Wg(a[e >> 2], a[j >> 2]);
															b = (R | 0) < 8 ? 42 : 43;
															b == 42 && Xg(a[e >> 2]);
															b = (M | 0) != 0 ? 44 : 45;
															b == 44 && (P = 16 - R, V = R - P);
															b = (a[a[c + 24 >> 2] + 32 >> 2] | 0) != 0 ? 46 : 47;
															if (b == 46) var aa = 1 << a[a[c + 24 >> 2] + 24 >> 2] - 1;
															else b == 47 && (aa = 0);
															L = aa;
															b = (a[a[c + 24 >> 2] + 48 + 32 >> 2] | 0) != 0 ? 49 : 50;
															if (b == 49) var ca =
																1 << a[a[c + 24 >> 2] + 48 + 24 >> 2] - 1;
															else b == 50 && (ca = 0);
															w = ca;
															b = (a[a[c + 24 >> 2] + 96 + 32 >> 2] | 0) != 0 ? 52 : 53;
															if (b == 52) var da = 1 << a[a[c + 24 >> 2] + 96 + 24 >> 2] - 1;
															else b == 53 && (da = 0);
															K = da;
															m = z(O * A << 1);
															J = 0;
															g: for (;;) {
																if (!((J | 0) < (F | 0))) break g;
																u = m;
																G = 0;
																h: for (;;) {
																	if (!((G | 0) < (O | 0))) break h;
																	b = (T | 0) != 0 ? 59 : 70;
																	b == 59 ? (Q = a[i >> 2] + L, i += 4, b = (M | 0) != 0 ? 60 : 61, b == 60 && (Q = (Q << P) + (Q >> (V | 0))), b = u, u = b + 1, p[b] = Q >> 8 & 255, b = u, u = b + 1, p[b] = Q & 255, Q = a[k >> 2] + w, k += 4, b = (M | 0) != 0 ? 62 : 63, b == 62 && (Q = (Q << P) + (Q >> (V | 0))), b = u, u = b + 1, p[b] = Q >> 8 & 255, b = u, u = b + 1, p[b] = Q & 255, Q = a[q >>
																		2] + K, q += 4, b = (M | 0) != 0 ? 64 : 65, b == 64 && (Q = (Q << P) + (Q >> (V | 0))), b = u, u = b + 1, p[b] = Q >> 8 & 255, b = u, u = b + 1, p[b] = Q & 255, b = (f | 0) != 0 ? 66 : 69, b == 66 && (b = r, r = b + 4, Q = a[b >> 2], b = (M | 0) != 0 ? 67 : 68, b == 67 && (Q = (Q << P) + (Q >> (V | 0))), b = u, u = b + 1, p[b] = Q >> 8 & 255, b = u, u = b + 1, p[b] = Q & 255)) : b == 70 && (b = a[i >> 2] + L & S & 65535 & 255, Q = u, u = Q + 1, p[Q] = b, i += 4, b = a[k >> 2] + w & S & 65535 & 255, Q = u, u = Q + 1, p[Q] = b, k += 4, b = a[q >> 2] + K & S & 65535 & 255, Q = u, u = Q + 1, p[Q] = b, q += 4, b = (f | 0) != 0 ? 71 : 72, b == 71 && (b = a[r >> 2] & S & 65535 & 255, Q = u, u = Q + 1, p[Q] = b, r += 4));
																	G += 1
																}
																Fc(a[e >> 2], m);
																J += 1
															}
															b = 121;
															break f
														}
													while (0);
												do
													if (b == 77) {
														b = (A | 0) == 1 ? 82 : 78;
														g: do
																if (b == 78) {
																	b = (A | 0) == 2 ? 79 : 119;
																	h: do
																			if (b == 79) {
																				if ((a[a[c + 24 >> 2] >> 2] | 0) != (a[a[c + 24 >> 2] + 48 >> 2] | 0)) break h;
																				if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != (a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0)) break h;
																				if ((a[a[c + 24 >> 2] + 24 >> 2] | 0) == (a[a[c + 24 >> 2] + 48 + 24 >> 2] | 0)) break g
																			}
																		while (0);
																	o(a[a[x >> 2] + 12 >> 2], Yg, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n));
																	break c
																}
															while (0);
														i = a[a[c + 24 >> 2] + 44 >> 2];
														b = (M | 0) != 0 ? 83 : 84;
														b == 83 && (P = 16 - R, V = R - P);
														p[N + 3] = $ & 255;
														p[N + 4] = 0;
														p[N + 2] = 0;
														p[N + 1] = 0;
														y = r = p[N] = 0;
														b = (A | 0) == 2 ? 85 : 86;
														b == 85 && (f = 1, p[N + 4] = $ & 255, r = a[a[c + 24 >>
															2] + 48 + 44 >> 2], y = 4);
														O = a[a[c + 24 >> 2] + 8 >> 2];
														F = a[a[c + 24 >> 2] + 12 >> 2];
														Vg(a[e >> 2], a[j >> 2], O, F, U[N + 3] & 255, y, 0, 0, 0);
														Ug(a[e >> 2], a[j >> 2], N);
														Wg(a[e >> 2], a[j >> 2]);
														b = (a[a[c + 24 >> 2] + 32 >> 2] | 0) != 0 ? 87 : 88;
														if (b == 87) var ea = 1 << a[a[c + 24 >> 2] + 24 >> 2] - 1;
														else b == 88 && (ea = 0);
														L = ea;
														b = (R | 0) < 8 ? 90 : 91;
														b == 90 && Xg(a[e >> 2]);
														b = ($ | 0) > 8 ? 92 : 107;
														do
															if (b == 92) {
																m = z(O * A << 1);
																J = 0;
																h: for (;;) {
																	if (!((J | 0) < (F | 0))) {
																		b = 106;
																		break h
																	}
																	u = m;
																	G = 0;
																	i: for (;;) {
																		if (!((G | 0) < (O | 0))) {
																			b = 104;
																			break i
																		}
																		k = a[i >> 2] + L;
																		i += 4;
																		b = (M | 0) != 0 ? 97 : 98;
																		b == 97 && (k = (k << P) + (k >> (V | 0)));
																		q = u;
																		u = q + 1;
																		p[q] = k >>
																			8 & 255;
																		q = u;
																		u = q + 1;
																		p[q] = k & 255;
																		b = (f | 0) != 0 ? 99 : 102;
																		b == 99 && (k = r, r = k + 4, k = a[k >> 2], b = (M | 0) != 0 ? 100 : 101, b == 100 && (k = (k << P) + (k >> (V | 0))), q = u, u = q + 1, p[q] = k >> 8 & 255, q = u, u = q + 1, p[q] = k & 255);
																		G += 1
																	}
																	Fc(a[e >> 2], m);
																	J += 1
																}
															} else if (b == 107) {
															m = ba(O, A << 1);
															J = 0;
															h: for (;;) {
																if (!((J | 0) < (F | 0))) {
																	b = 117;
																	break h
																}
																u = m;
																G = 0;
																i: for (;;) {
																	if (!((G | 0) < (O | 0))) {
																		b = 115;
																		break i
																	}
																	k = a[i >> 2] + L & S & 65535 & 255;
																	q = u;
																	u = q + 1;
																	p[q] = k;
																	i += 4;
																	b = (f | 0) != 0 ? 112 : 113;
																	b == 112 && (k = a[r >> 2] & S & 65535 & 255, q = u, u = q + 1, p[q] = k, r += 4);
																	G += 1
																}
																Fc(a[e >> 2], m);
																J += 1
															}
														} while (0)
													}
												while (0);
												oi(a[e >> 2], a[j >> 2]);
												B = 0
											}
										while (0)
									}
								while (0)
							}
						while (0);
					b = (a[e >> 2] | 0) != 0 ? 123 : 124;
					b == 123 && pi(e, j);
					ta(g);
					b = (B | 0) != 0 ? 125 : 126;
					if (b == 125 && (f = d, qi(f) == -1)) d: if (f = s.m(Ga(f)), !f.q || !f.n) C(f.error);
						else if (!f.object.write || f.Z) C(fa);
					else if (f.object.c) {
						i = H;
						for (i in f.object.b) {
							C(Rc);
							break d
						}
						f.path == s.P ? C(Sc) : delete f.k.b[f.name]
					} else C(eb);
					f = B
				} while (0)
			}
		while (0);
		t = e;
		return f
	}

	function Ib(c, d) {
		var e, b, f, g, j, i, k, p, q, m, s, r, u, t, y, z, w, C, D, F, B, G, J, K, M, N;
		s = 0;
		e = (c | 0) != 0 ? 2 : 1;
		do
			if (e == 2) {
				m = pa(d, Zg);
				e = (m | 0) != 0 ? 4 : 3;
				do
					if (e == 4) {
						e = (P[0] = T[a[c + 88 >>
							2] + 556 >> 2], P[1] = T[a[c + 88 >> 2] + 556 + 4 >> 2], ha[0]) != 0 ? 5 : 6;
						e == 5 ? r = 1 : e == 6 && (r = 0);
						e = (a[a[c + 88 >> 2] + 552 >> 2] | 0) != 0 ? 8 : 9;
						e == 8 ? u = 1 : e == 9 && (u = 0);
						o(m, Nb, h([a[c + 16 >> 2], 0, 0, 0, a[c + 20 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
						o(m, va, h([a[c + 24 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						o(m, Nb, h([a[c + 28 >> 2], 0, 0, 0, a[c + 32 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
						o(m, Nb, h([a[c + 44 >> 2], 0, 0, 0, a[c + 48 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
						o(m, va, h([a[c + 52 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						o(m, va, h([a[c + 56 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						o(m, va, h([a[a[c +
							60 >> 2] >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						j = a[a[c + 60 >> 2] >> 2];
						c: for (;;) {
							if (!((j | 0) >= 0)) break c;
							o(m, $g, h([1 << a[a[c + 88 >> 2] + 284 + (j << 2) >> 2], 0, 0, 0, 1 << a[a[c + 88 >> 2] + 284 + (j << 2) >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0], n));
							j -= 1
						}
						o(m, ea, h(1, "i32", n));
						o(m, va, h([a[c + 76 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						o(m, va, h([a[c + 80 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						o(m, va, h([a[c + 84 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
						o(m, ah, h(1, "i32", n));
						o(m, bh, h(1, "i32", n));
						e = r << 24 >> 24 != 0 ? 15 : 16;
						e == 15 && o(m, ch, h(1, "i32", n));
						e = u << 24 >> 24 != 0 ? 17 : 18;
						e == 17 && o(m, dh, h(1, "i32",
							n));
						e = (r << 24 >> 24 | 0) != 0 ? 19 : 21;
						c: do
								if (e == 19) {
									if ((u << 24 >> 24 | 0) == 0) break c;
									o(m, eh, h(1, "i32", n))
								}
							while (0);
						o(m, ea, h(1, "i32", n));
						b = 0;
						c: for (;;) {
							if (!((b | 0) < (a[c + 44 >> 2] * a[c + 48 >> 2] | 0))) break c;
							o(m, fh, h([a[a[c + 88 >> 2] + b * 572 + 4 >> 2], 0, 0, 0, a[a[c + 88 >> 2] + b * 572 + 8 >> 2], 0, 0, 0, a[a[c + 88 >> 2] + b * 572 + 12 >> 2], 0, 0, 0, a[a[c + 88 >> 2] + b * 572 + 16 >> 2], 0, 0, 0, a[a[c + 88 >> 2] + b * 572 + 564 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
							e = r << 24 >> 24 != 0 ? 24 : 25;
							e == 24 && (k = (P[0] = a[a[c + 88 >> 2] + b * 572 + 556 >> 2], P[1] = a[a[c + 88 >> 2] +
								b * 572 + 556 + 4 >> 2], ha[0]), o(m, Gc, h([k, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n)));
							e = u << 24 >> 24 != 0 ? 26 : 27;
							e == 26 && o(m, gh, h([a[a[c + 88 >> 2] + b * 572 + 552 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
							e = (r << 24 >> 24 | 0) != 0 ? 28 : 30;
							d: do
									if (e == 28) {
										if ((u << 24 >> 24 | 0) == 0) break d;
										k = (P[0] = a[a[c + 88 >> 2] + b * 572 + 556 >> 2], P[1] = a[a[c + 88 >> 2] + b * 572 + 556 + 4 >> 2], ha[0]) / (a[a[c + 88 >> 2] + b * 572 + 552 >> 2] | 0);
										o(m, Gc, h([k, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n))
									}
								while (0);
							o(m, ea, h(1, "i32", n));
							b += 1
						}
						b = 0;
						c: for (;;) {
							if (!((b | 0) < (a[c + 44 >> 2] * a[c + 48 >> 2] | 0))) break c;
							f = k = w =
								0;
							d: for (;;) {
								if (!((f | 0) < (a[c + 52 >> 2] | 0))) break d;
								e = (w | 0) < (a[a[c + 60 >> 2] + (f << 2) >> 2] | 0) ? 37 : 38;
								e == 37 && (w = a[a[c + 60 >> 2] + (f << 2) >> 2]);
								f += 1
							}
							o(m, hh, h([b, 0, 0, 0], ["i32", 0, 0, 0], n));
							o(m, ih, h(1, "i32", n));
							j = 0;
							d: for (;;) {
								if (!((j | 0) < (a[a[c + 88 >> 2] + b * 572 + 564 >> 2] | 0))) break d;
								o(m, jh, h([j, 0, 0, 0, b, 0, 0, 0, a[a[a[c + 88 >> 2] + b * 572 + 568 >> 2] + j * 20 + 12 >> 2], 0, 0, 0, a[a[a[c + 88 >> 2] + b * 572 + 568 >> 2] + j * 20 + 16 >> 2], 0, 0, 0, a[a[a[c + 88 >> 2] + b * 572 + 568 >> 2] + j * 20 >> 2], 0, 0, 0, a[a[a[c + 88 >> 2] + b * 572 + 568 >> 2] + j * 20 + 4 >> 2], 0, 0, 0, a[a[a[c + 88 >> 2] + b * 572 + 568 >> 2] + j * 20 + 8 >> 2],
									0, 0, 0
								], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
								j += 1
							}
							e = (a[c + 24 >> 2] | 0) == 0 ? 45 : 68;
							do
								if (e == 45) {
									o(m, kh, h(1, "i32", n));
									e = r << 24 >> 24 != 0 ? 46 : 47;
									e == 46 && o(m, Ya, h(1, "i32", n));
									o(m, ea, h(1, "i32", n));
									g = 0;
									e: for (;;) {
										if (!((g | 0) < (a[c + 56 >> 2] | 0))) {
											e = 67;
											break e
										}
										j = 0;
										f: for (;;) {
											if (!((j | 0) < (w + 1 | 0))) {
												e = 65;
												break f
											}
											f = 0;
											g: for (;;) {
												if (!((f | 0) < (a[c + 52 >> 2] | 0))) {
													e = 63;
													break g
												}
												if ((j | 0) > (a[a[c + 60 >> 2] + (f << 2) >> 2] | 0)) {
													e = 54;
													break g
												}
												p = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] * a[a[c + 88 >> 2] + b * 572 + 152 + (j <<
													2) >> 2];
												i = 0;
												h: for (;;) {
													if (!((i | 0) < (p | 0))) {
														e = 61;
														break h
													}
													e = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 >> 2];
													t = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 4 >> 2];
													y = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 8 >> 2];
													z = (P[0] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 >> 2], P[1] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 + 4 >> 2], ha[0]);
													o(m, lh, h([k, 0, 0, 0, b, 0, 0, 0, g, 0, 0, 0, j, 0, 0, 0, f, 0, 0, 0, i, 0, 0, 0, e, 0, 0, 0, t, 0, 0, 0, y, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
													e = r << 24 >> 24 != 0 ? 58 : 59;
													e ==
														58 && o(m, Za, h([z, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
													o(m, ea, h(1, "i32", n));
													s += z;
													k += 1;
													i += 1
												}
												f += 1
											}
											j += 1
										}
										g += 1
									}
								} else if (e == 68) {
								e = (a[c + 24 >> 2] | 0) == 1 ? 69 : 92;
								do
									if (e == 69) {
										o(m, mh, h(1, "i32", n));
										e = r << 24 >> 24 != 0 ? 70 : 71;
										e == 70 && o(m, Ya, h(1, "i32", n));
										o(m, ea, h(1, "i32", n));
										j = 0;
										f: for (;;) {
											if (!((j | 0) < (w + 1 | 0))) {
												e = 91;
												break f
											}
											g = 0;
											g: for (;;) {
												if (!((g | 0) < (a[c + 56 >> 2] | 0))) {
													e = 89;
													break g
												}
												f = 0;
												h: for (;;) {
													if (!((f | 0) < (a[c + 52 >> 2] | 0))) {
														e = 87;
														break h
													}
													if ((j | 0) > (a[a[c + 60 >> 2] + (f << 2) >> 2] | 0)) {
														e = 78;
														break h
													}
													p = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] *
														a[a[c + 88 >> 2] + b * 572 + 152 + (j << 2) >> 2];
													i = 0;
													i: for (;;) {
														if (!((i | 0) < (p | 0))) {
															e = 85;
															break i
														}
														e = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 >> 2];
														t = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 4 >> 2];
														y = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 8 >> 2];
														z = (P[0] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 >> 2], P[1] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 + 4 >> 2], ha[0]);
														o(m, nh, h([k, 0, 0, 0, b, 0, 0, 0, j, 0, 0, 0, g, 0, 0, 0, f, 0, 0, 0, i, 0, 0, 0, e, 0, 0, 0, t, 0, 0, 0, y, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0],
															n));
														e = r << 24 >> 24 != 0 ? 82 : 83;
														e == 82 && o(m, Za, h([z, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
														o(m, ea, h(1, "i32", n));
														s += z;
														k += 1;
														i += 1
													}
													f += 1
												}
												g += 1
											}
											j += 1
										}
									} else if (e == 92) {
									e = (a[c + 24 >> 2] | 0) == 2 ? 93 : 128;
									do
										if (e == 93) {
											o(m, oh, h(1, "i32", n));
											e = r << 24 >> 24 != 0 ? 94 : 95;
											e == 94 && o(m, Ya, h(1, "i32", n));
											o(m, ea, h(1, "i32", n));
											j = 0;
											g: for (;;) {
												if (!((j | 0) < (w + 1 | 0))) {
													e = 127;
													break g
												}
												C = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] * a[a[c + 88 >> 2] + b * 572 + 152 + (j << 2) >> 2];
												i = 0;
												h: for (;;) {
													if (!((i | 0) < (C | 0))) {
														e = 125;
														break h
													}
													f = a[c + 36 >> 2] + b;
													g = ja((b | 0) / (a[c + 44 >> 2] | 0));
													D = f - (g | 0) *
														a[c + 44 >> 2] * a[c + 28 >> 2];
													f = a[c + 36 >> 2];
													g = ja((b | 0) / (a[c + 44 >> 2] | 0));
													F = f + (g | 0) * a[c + 32 >> 2];
													B = D + a[c + 28 >> 2];
													G = F + a[c + 32 >> 2];
													f = 0;
													i: for (;;) {
														if (!((f | 0) < (a[c + 52 >> 2] | 0))) {
															e = 123;
															break i
														}
														g = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2];
														J = La(2, a[a[c + 88 >> 2] + b * 572 + 284 + (j << 2) >> 2] + a[a[c + 60 >> 2] + (f << 2) >> 2] - j | 0) | 0;
														K = La(2, a[a[c + 88 >> 2] + b * 572 + 416 + (j << 2) >> 2] + a[a[c + 60 >> 2] + (f << 2) >> 2] - j | 0) | 0;
														z = i;
														t = ja((i | 0) / (g | 0));
														M = z - (t | 0) * g;
														N = ja((i | 0) / (g | 0)) | 0;
														if ((j | 0) > (a[a[c + 60 >> 2] + (f << 2) >> 2] | 0)) {
															e = 102;
															break i
														}
														q = F;
														j: for (;;) {
															if (!((q | 0) < (G | 0))) {
																e = 121;
																break j
															}
															e =
																(N * K | 0) == (q | 0) ? 106 : 119;
															do
																if (e == 106) {
																	p = D;
																	l: for (;;) {
																		if (!((p | 0) < (B | 0))) {
																			e = 118;
																			break l
																		}
																		e = (M * J | 0) == (p | 0) ? 109 : 116;
																		do
																			if (e == 109) {
																				g = 0;
																				n: for (;;) {
																					if (!((g | 0) < (a[c + 56 >> 2] | 0))) {
																						e = 115;
																						break n
																					}
																					e = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 >> 2];
																					t = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 4 >> 2];
																					y = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 8 >> 2];
																					z = (P[0] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 >> 2], P[1] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 + 4 >> 2], ha[0]);
																					o(m, ph, h([k, 0, 0, 0, b, 0, 0, 0, j, 0, 0, 0, i, 0, 0, 0, f, 0, 0, 0, g, 0, 0, 0, e, 0, 0, 0, t, 0, 0, 0, y, 0, 0, 0], ["i32", 0, 0,
																						0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0
																					], n));
																					e = r << 24 >> 24 != 0 ? 112 : 113;
																					e == 112 && o(m, Za, h([z, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
																					o(m, ea, h(1, "i32", n));
																					s += z;
																					k += 1;
																					g += 1
																				}
																			}
																		while (0);
																		p += 1
																	}
																}
															while (0);
															q += 1
														}
														f += 1
													}
													i += 1
												}
												j += 1
											}
										} else if (e == 128) {
										e = (a[c + 24 >> 2] | 0) == 3 ? 129 : 170;
										do
											if (e == 129) {
												j = a[c + 36 >> 2] + b;
												f = ja((b | 0) / (a[c + 44 >> 2] | 0));
												C = j - (f | 0) * a[c + 44 >> 2] * a[c + 28 >> 2];
												j = a[c + 36 >> 2];
												f = ja((b | 0) / (a[c + 44 >> 2] | 0));
												D = j + (f | 0) * a[c + 32 >> 2];
												F = C + a[c + 28 >> 2];
												B = D + a[c + 32 >> 2];
												j = G = 0;
												h: for (;;) {
													if (!((j | 0) < (w + 1 | 0))) break h;
													f = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] * a[a[c + 88 >> 2] + b * 572 + 152 + (j << 2) >> 2];
													e = (f | 0) > (G | 0) ? 132 : 133;
													e == 132 && (G = f);
													j += 1
												}
												o(m, qh, h(1, "i32", n));
												e = r << 24 >> 24 != 0 ? 136 : 137;
												e == 136 && o(m, Ya, h(1, "i32", n));
												o(m, ea, h(1, "i32", n));
												i = 0;
												h: for (;;) {
													if (!((i | 0) < (G | 0))) {
														e = 169;
														break h
													}
													f = 0;
													i: for (;;) {
														if (!((f | 0) < (a[c + 52 >> 2] | 0))) {
															e = 167;
															break i
														}
														j = 0;
														j: for (;;) {
															if (!((j | 0) < (a[a[c + 60 >> 2] + (f << 2) >> 2] + 1 | 0))) {
																e = 165;
																break j
															}
															e = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] * a[a[c + 88 >> 2] + b * 572 + 152 + (j << 2) >> 2];
															g = a[a[c + 88 >> 2] + b *
																572 + 20 + (j << 2) >> 2];
															J = La(2, a[a[c + 88 >> 2] + b * 572 + 284 + (j << 2) >> 2] + a[a[c + 60 >> 2] + (f << 2) >> 2] - j | 0) | 0;
															K = La(2, a[a[c + 88 >> 2] + b * 572 + 416 + (j << 2) >> 2] + a[a[c + 60 >> 2] + (f << 2) >> 2] - j | 0) | 0;
															z = i;
															t = ja((i | 0) / (g | 0));
															M = z - (t | 0) * g;
															N = ja((i | 0) / (g | 0)) | 0;
															e = (i | 0) >= (e | 0) ? 144 : 145;
															do
																if (e != 144 && e == 145) {
																	q = D;
																	l: for (;;) {
																		if (!((q | 0) < (B | 0))) {
																			e = 163;
																			break l
																		}
																		e = (N * K | 0) == (q | 0) ? 148 : 161;
																		do
																			if (e == 148) {
																				p = C;
																				n: for (;;) {
																					if (!((p | 0) < (F | 0))) {
																						e = 160;
																						break n
																					}
																					e = (M * J | 0) == (p | 0) ? 151 : 158;
																					do
																						if (e == 151) {
																							g = 0;
																							p: for (;;) {
																								if (!((g | 0) < (a[c + 56 >> 2] | 0))) {
																									e = 157;
																									break p
																								}
																								e = a[a[a[c + 88 >>
																									2] + b * 572 + 548 >> 2] + k * 20 >> 2];
																								t = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 4 >> 2];
																								y = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 8 >> 2];
																								z = (P[0] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 >> 2], P[1] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 + 4 >> 2], ha[0]);
																								o(m, Hc, h([k, 0, 0, 0, b, 0, 0, 0, i, 0, 0, 0, f, 0, 0, 0, j, 0, 0, 0, g, 0, 0, 0, e, 0, 0, 0, t, 0, 0, 0, y, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
																								e = r << 24 >> 24 != 0 ? 154 : 155;
																								e == 154 && o(m, Za, h([z, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
																								o(m,
																									ea, h(1, "i32", n));
																								s += z;
																								k += 1;
																								g += 1
																							}
																						}
																					while (0);
																					p += 1
																				}
																			}
																		while (0);
																		q += 1
																	}
																}
															while (0);
															j += 1
														}
														f += 1
													}
													i += 1
												}
											} else if (e == 170) {
											j = C = 0;
											h: for (;;) {
												if (!((j | 0) < (w + 1 | 0))) break h;
												f = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] * a[a[c + 88 >> 2] + b * 572 + 152 + (j << 2) >> 2];
												e = (f | 0) > (C | 0) ? 173 : 174;
												e == 173 && (C = f);
												j += 1
											}
											o(m, rh, h(1, "i32", n));
											e = r << 24 >> 24 != 0 ? 177 : 178;
											e == 177 && o(m, Ya, h(1, "i32", n));
											o(m, ea, h(1, "i32", n));
											f = 0;
											h: for (;;) {
												if (!((f | 0) < (a[c + 52 >> 2] | 0))) {
													e = 210;
													break h
												}
												j = a[c + 36 >> 2] + b;
												i = ja((b | 0) / (a[c + 44 >> 2] | 0));
												D = j - (i | 0) * a[c + 44 >> 2] * a[c + 28 >> 2];
												j = a[c + 36 >> 2];
												i = ja((b |
													0) / (a[c + 44 >> 2] | 0));
												F = j + (i | 0) * a[c + 32 >> 2];
												B = D + a[c + 28 >> 2];
												G = F + a[c + 32 >> 2];
												i = 0;
												i: for (;;) {
													if (!((i | 0) < (C | 0))) {
														e = 208;
														break i
													}
													j = 0;
													j: for (;;) {
														if (!((j | 0) < (a[a[c + 60 >> 2] + (f << 2) >> 2] + 1 | 0))) {
															e = 206;
															break j
														}
														e = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2] * a[a[c + 88 >> 2] + b * 572 + 152 + (j << 2) >> 2];
														g = a[a[c + 88 >> 2] + b * 572 + 20 + (j << 2) >> 2];
														J = La(2, a[a[c + 88 >> 2] + b * 572 + 284 + (j << 2) >> 2] + a[a[c + 60 >> 2] + (f << 2) >> 2] - j | 0) | 0;
														K = La(2, a[a[c + 88 >> 2] + b * 572 + 416 + (j << 2) >> 2] + a[a[c + 60 >> 2] + (f << 2) >> 2] - j | 0) | 0;
														z = i;
														t = ja((i | 0) / (g | 0));
														M = z - (t | 0) * g;
														N = ja((i | 0) / (g | 0)) | 0;
														e = (i | 0) >= (e |
															0) ? 185 : 186;
														do
															if (e != 185 && e == 186) {
																q = F;
																l: for (;;) {
																	if (!((q | 0) < (G | 0))) {
																		e = 204;
																		break l
																	}
																	e = (N * K | 0) == (q | 0) ? 189 : 202;
																	do
																		if (e == 189) {
																			p = D;
																			n: for (;;) {
																				if (!((p | 0) < (B | 0))) {
																					e = 201;
																					break n
																				}
																				e = (M * J | 0) == (p | 0) ? 192 : 199;
																				do
																					if (e == 192) {
																						g = 0;
																						p: for (;;) {
																							if (!((g | 0) < (a[c + 56 >> 2] | 0))) {
																								e = 198;
																								break p
																							}
																							e = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 >> 2];
																							t = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 4 >> 2];
																							y = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 8 >> 2];
																							z = (P[0] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 >> 2], P[1] = a[a[a[c + 88 >> 2] + b * 572 + 548 >> 2] + k * 20 + 12 + 4 >> 2], ha[0]);
																							o(m, Hc, h([k,
																								0, 0, 0, b, 0, 0, 0, f, 0, 0, 0, i, 0, 0, 0, j, 0, 0, 0, g, 0, 0, 0, e, 0, 0, 0, t, 0, 0, 0, y, 0, 0, 0
																							], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
																							e = r << 24 >> 24 != 0 ? 195 : 196;
																							e == 195 && o(m, Za, h([z, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n));
																							o(m, ea, h(1, "i32", n));
																							s += z;
																							k += 1;
																							g += 1
																						}
																					}
																				while (0);
																				p += 1
																			}
																		}
																	while (0);
																	q += 1
																}
															}
														while (0);
														j += 1
													}
													i += 1
												}
												f += 1
											}
										} while (0)
									} while (0)
								} while (0)
							} while (0);
							b += 1
						}
						e = r << 24 >> 24 != 0 ? 217 : 218;
						e == 217 && (b = (P[0] = a[c >> 2], P[1] = a[c + 4 >> 2], ha[0]), o(m, sh, h([b, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n)), o(m, th, h([s, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0], n)));
						e = (a[c + 64 >> 2] | 0) != 0 ? 219 : 224;
						do
							if (e == 219) {
								o(m, uh, h(1, "i32", n));
								o(m, va, h([a[c + 64 >> 2], 0, 0, 0], ["i32", 0, 0, 0], n));
								o(m, vh, h(1, "i32", n));
								p = 0;
								d: for (;;) {
									if (!((p | 0) < (a[c + 64 >> 2] | 0))) {
										e = 223;
										break d
									}
									o(m, wh, h([Aa[a[c + 68 >> 2] + p * 12 >> 1] & 65535, 0, 0, 0, a[a[c + 68 >> 2] + p * 12 + 4 >> 2], 0, 0, 0, a[a[c + 68 >> 2] + p * 12 + 8 >> 2], 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], n));
									p += 1
								}
							}
						while (0);
						ta(m);
						o(a[a[x >> 2] + 12 >> 2], xh, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n));
						b = 0
					} else e ==
						3 && (o(a[a[x >> 2] + 12 >> 2], yh, h([d, 0, 0, 0], ["i8*", 0, 0, 0], n)), b = 1); while (0)
			} else e == 1 && (b = 1); while (0);
		return b
	}

	function hg(c) {
		var d;
		d = (a[c + 16 >> 2] | 0) < 3 ? 1 : 2;
		a: do
				if (d == 1) a[c + 20 >> 2] = 2;
				else
			if (d == 2) {
				d = (a[a[c + 24 >> 2] >> 2] | 0) == 1 ? 3 : 9;
				b: do
						if (d == 3) {
							if ((a[a[c + 24 >> 2] + 48 >> 2] | 0) != 2) {
								d = 9;
								break b
							}
							if ((a[a[c + 24 >> 2] + 96 >> 2] | 0) != 2) {
								d = 9;
								break b
							}
							if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != 1) {
								d = 9;
								break b
							}
							if ((a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0) != 2) {
								d = 9;
								break b
							}
							if ((a[a[c + 24 >> 2] + 96 + 4 >> 2] | 0) != 2) {
								d = 9;
								break b
							}
							zh(c);
							d = 26;
							break b
						}
					while (0);
				do
					if (d == 9) {
						d = (a[a[c + 24 >>
							2] >> 2] | 0) == 1 ? 10 : 16;
						c: do
								if (d == 10) {
									if ((a[a[c + 24 >> 2] + 48 >> 2] | 0) != 2) {
										d = 16;
										break c
									}
									if ((a[a[c + 24 >> 2] + 96 >> 2] | 0) != 2) {
										d = 16;
										break c
									}
									if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != 1) {
										d = 16;
										break c
									}
									if ((a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0) != 1) {
										d = 16;
										break c
									}
									if ((a[a[c + 24 >> 2] + 96 + 4 >> 2] | 0) != 1) {
										d = 16;
										break c
									}
									Ah(c);
									d = 25;
									break c
								}
							while (0);
						c: do
								if (d == 16) {
									d = (a[a[c + 24 >> 2] >> 2] | 0) == 1 ? 17 : 23;
									d: do
											if (d == 17) {
												if ((a[a[c + 24 >> 2] + 48 >> 2] | 0) != 1) break d;
												if ((a[a[c + 24 >> 2] + 96 >> 2] | 0) != 1) break d;
												if ((a[a[c + 24 >> 2] + 4 >> 2] | 0) != 1) break d;
												if ((a[a[c + 24 >> 2] + 48 + 4 >> 2] | 0) != 1) break d;
												if ((a[a[c +
														24 >> 2] + 96 + 4 >> 2] | 0) != 1) break d;
												Bh(c);
												d = 25;
												break c
											}
										while (0);
									o(a[a[x >> 2] + 12 >> 2], Ch, h([Dh, 0, 0, 0, 256, 0, 0, 0], ["i8*", 0, 0, 0, "i32", 0, 0, 0], n));
									break a
								}
							while (0)
					}
				while (0);
				a[c + 20 >> 2] = 1
			}
		while (0)
	}

	function zh(c) {
		var d, e, b, f, g, j, h, i, k, n, m, o, p, q, r, s;
		r = a[a[c + 24 >> 2] + 24 >> 2];
		p = 1 << r - 1;
		q = (1 << r) - 1;
		m = a[a[c + 24 >> 2] + 8 >> 2];
		o = a[a[c + 24 >> 2] + 12 >> 2];
		b = m * o;
		h = a[a[c + 24 >> 2] + 44 >> 2];
		i = a[a[c + 24 >> 2] + 48 + 44 >> 2];
		k = a[a[c + 24 >> 2] + 96 + 44 >> 2];
		var t = z(b << 2);
		d = t;
		var u = z(b << 2);
		e = u;
		var x = z(b << 2);
		b = x;
		r = 0;
		a: for (;;) {
			if (!((r | 0) < (o | 0))) break a;
			n = h + (m << 2);
			f =
				d + (m << 2);
			g = e + (m << 2);
			j = b + (m << 2);
			s = 0;
			b: for (;;) {
				if (!((s | 0) < (m | 0))) break b;
				Ea(p, q, a[h >> 2], a[i >> 2], a[k >> 2], d, e, b);
				h += 4;
				d += 4;
				e += 4;
				b += 4;
				Ea(p, q, a[h >> 2], a[i >> 2], a[k >> 2], d, e, b);
				h += 4;
				d += 4;
				e += 4;
				b += 4;
				Ea(p, q, a[n >> 2], a[i >> 2], a[k >> 2], f, g, j);
				n += 4;
				f += 4;
				g += 4;
				j += 4;
				Ea(p, q, a[n >> 2], a[i >> 2], a[k >> 2], f, g, j);
				n += 4;
				f += 4;
				g += 4;
				j += 4;
				i += 4;
				k += 4;
				s += 2
			}
			h += m << 2;
			d += m << 2;
			e += m << 2;
			b += m << 2;
			r += 2
		}
		a[a[c + 24 >> 2] + 44 >> 2] = t;
		a[a[c + 24 >> 2] + 48 + 44 >> 2] = u;
		a[a[c + 24 >> 2] + 96 + 44 >> 2] = x;
		a[a[c + 24 >> 2] + 48 + 8 >> 2] = m;
		a[a[c + 24 >> 2] + 48 + 12 >> 2] = o;
		a[a[c + 24 >> 2] + 96 + 8 >> 2] = m;
		a[a[c +
			24 >> 2] + 96 + 12 >> 2] = o;
		a[a[c + 24 >> 2] + 48 >> 2] = a[a[c + 24 >> 2] >> 2];
		a[a[c + 24 >> 2] + 96 >> 2] = a[a[c + 24 >> 2] >> 2];
		a[a[c + 24 >> 2] + 48 + 4 >> 2] = a[a[c + 24 >> 2] + 4 >> 2];
		a[a[c + 24 >> 2] + 96 + 4 >> 2] = a[a[c + 24 >> 2] + 4 >> 2]
	}

	function Ah(c) {
		var d, e, b, f, g, j, h, i, k, n, m, o;
		m = a[a[c + 24 >> 2] + 24 >> 2];
		k = 1 << m - 1;
		n = (1 << m) - 1;
		h = a[a[c + 24 >> 2] + 8 >> 2];
		i = a[a[c + 24 >> 2] + 12 >> 2];
		b = h * i;
		f = a[a[c + 24 >> 2] + 44 >> 2];
		g = a[a[c + 24 >> 2] + 48 + 44 >> 2];
		j = a[a[c + 24 >> 2] + 96 + 44 >> 2];
		var p = z(b << 2);
		d = p;
		var q = z(b << 2);
		e = q;
		var r = z(b << 2);
		b = r;
		m = 0;
		a: for (;;) {
			if (!((m | 0) < (i | 0))) break a;
			o = 0;
			b: for (;;) {
				if (!((o | 0) < (h |
						0))) break b;
				Ea(k, n, a[f >> 2], a[g >> 2], a[j >> 2], d, e, b);
				f += 4;
				d += 4;
				e += 4;
				b += 4;
				Ea(k, n, a[f >> 2], a[g >> 2], a[j >> 2], d, e, b);
				f += 4;
				d += 4;
				e += 4;
				b += 4;
				g += 4;
				j += 4;
				o += 2
			}
			m += 1
		}
		a[a[c + 24 >> 2] + 44 >> 2] = p;
		a[a[c + 24 >> 2] + 48 + 44 >> 2] = q;
		a[a[c + 24 >> 2] + 96 + 44 >> 2] = r;
		a[a[c + 24 >> 2] + 48 + 8 >> 2] = h;
		a[a[c + 24 >> 2] + 48 + 12 >> 2] = i;
		a[a[c + 24 >> 2] + 96 + 8 >> 2] = h;
		a[a[c + 24 >> 2] + 96 + 12 >> 2] = i;
		a[a[c + 24 >> 2] + 48 >> 2] = a[a[c + 24 >> 2] >> 2];
		a[a[c + 24 >> 2] + 96 >> 2] = a[a[c + 24 >> 2] >> 2];
		a[a[c + 24 >> 2] + 48 + 4 >> 2] = a[a[c + 24 >> 2] + 4 >> 2];
		a[a[c + 24 >> 2] + 96 + 4 >> 2] = a[a[c + 24 >> 2] + 4 >> 2]
	}

	function Ea(c, d, e, b, f, g, j, h) {
		var i;
		b -= c;
		f -= c;
		i = e + ((f | 0) * 1.402 | 0);
		c = (i | 0) < 0 ? 1 : 2;
		c == 1 ? i = 0 : c == 2 && ((i | 0) > (d | 0) ? 3 : 4) == 3 && (i = d);
		a[g >> 2] = i;
		g = e - ((b | 0) * 0.344 + (f | 0) * 0.714 | 0);
		c = (g | 0) < 0 ? 6 : 7;
		c == 6 ? g = 0 : c == 7 && ((g | 0) > (d | 0) ? 8 : 9) == 8 && (g = d);
		a[j >> 2] = g;
		e += (b | 0) * 1.772 | 0;
		c = (e | 0) < 0 ? 11 : 12;
		c == 11 ? e = 0 : c == 12 && ((e | 0) > (d | 0) ? 13 : 14) == 13 && (e = d);
		a[h >> 2] = e
	}

	function Bh(c) {
		var d, e, b, f, g, j, h, i, k, n;
		i = a[a[c + 24 >> 2] + 24 >> 2];
		k = 1 << i - 1;
		n = (1 << i) - 1;
		h = a[a[c + 24 >> 2] + 8 >> 2] * a[a[c + 24 >> 2] + 12 >> 2];
		f = a[a[c + 24 >> 2] + 44 >> 2];
		g = a[a[c + 24 >> 2] + 48 + 44 >> 2];
		j = a[a[c + 24 >> 2] + 96 + 44 >> 2];
		var m = z(h << 2);
		d = m;
		var o =
			z(h << 2);
		e = o;
		var p = z(h << 2);
		b = p;
		i = 0;
		a: for (;;) {
			if (!((i | 0) < (h | 0))) break a;
			Ea(k, n, a[f >> 2], a[g >> 2], a[j >> 2], d, e, b);
			f += 4;
			g += 4;
			j += 4;
			d += 4;
			e += 4;
			b += 4;
			i += 1
		}
		a[a[c + 24 >> 2] + 44 >> 2] = m;
		a[a[c + 24 >> 2] + 48 + 44 >> 2] = o;
		a[a[c + 24 >> 2] + 96 + 44 >> 2] = p
	}

	function Rf(c, d, e, b, f) {
		var g, j, i, k, q, r, m;
		q = 1;
		a: for (;;) {
			if ((a[J >> 2] | 0) >= (c | 0)) {
				g = 4;
				break a
			}
			if ((a[d + (a[J >> 2] << 2) >> 2] | 0) == 0) {
				g = 4;
				break a
			}
			if ((p[a[d + (a[J >> 2] << 2) >> 2]] << 24 >> 24 | 0) != 45) {
				g = 4;
				break a
			}
			g = (p[a[d + (a[J >> 2] << 2) >> 2]] << 24 >> 24 | 0) == 45 ? 6 : 14;
			b: do
					if (g == 6) {
						if ((p[a[d + (a[J >> 2] << 2) >> 2] + 1] << 24 >>
								24 | 0) != 0) break b;
						g = (a[J >> 2] | 0) >= (c - 1 | 0) ? 8 : 9;
						g == 8 ? q = 0 : g == 9 && (g = (p[a[d + (a[J >> 2] + 1 << 2) >> 2]] << 24 >> 24 | 0) == 45 ? 10 : 11, g == 10 ? q = 0 : g == 11 && (q = 2))
					}
				while (0);
			if ((q << 24 >> 24 | 0) == 0) {
				g = 15;
				break a
			}
			if ((p[a[d + (a[J >> 2] << 2) >> 2]] << 24 >> 24 | 0) != 45) {
				g = 76;
				break a
			}
			r = a[d + (a[J >> 2] << 2) >> 2] + 1;
			m = b;
			k = 16;
			g = (q << 24 >> 24 | 0) > 1 ? 18 : 19;
			g == 18 ? (r = a[d + (a[J >> 2] + 1 << 2) >> 2], a[J >> 2] += 1) : g == 19 && (r = a[d + (a[J >> 2] << 2) >> 2] + 1);
			if (xa(r) >>> 0 > 1) {
				g = 21;
				break a
			}
			if ((p[e] << 24 >> 24 | 0) == 58) {
				g = 49;
				break a
			}
			g = (a[Ic >> 2] | 0) != (a[J >> 2] | 0) ? 51 : 52;
			g == 51 && (a[Ic >> 2] = a[J >> 2], a[$a >>
				2] = 0);
			a[vb >> 2] = p[a[d + (a[J >> 2] << 2) >> 2] + (a[$a >> 2] + 1)] << 24 >> 24;
			var s;
			b: {
				i = e;i--;do
					if (i++, s = p[i], s == a[vb >> 2]) {
						s = i;
						break b
					}
				while (s);
				s = 0
			}
			i = s;
			if ((s | 0) == 0) {
				g = 75;
				break a
			}
			if ((p[i] << 24 >> 24 | 0) != 0) {
				g = 55;
				break a
			}
			a[J >> 2] += 1
		}
		a: do
				if (g == 4) j = -1;
				else
			if (g == 15) a[J >> 2] += 1, j = 63;
			else
		if (g == 76) o(a[a[x >> 2] + 12 >> 2], Eh, h(1, "i32", n)), a[J >> 2] += 1, j = 63;
		else if (g == 21) {
			c = 0;
			b: for (;;) {
				if (!((c | 0) < (f | 0))) {
					g = 47;
					break b
				}
				if ((pb(a[m >> 2], r) | 0) == 0) {
					g = 24;
					break b
				}
				c += k;
				m += 16
			}
			do
				if (g == 47) o(a[a[x >> 2] + 12 >> 2], Jc, h([r, 0, 0, 0], ["i8*", 0, 0, 0], n)), a[J >>
					2] += 1, j = 63;
				else if (g == 24) {
				g = (a[m + 4 >> 2] | 0) == 0 ? 25 : 29;
				do
					if (g == 25) {
						g = (a[d + (a[J >> 2] + 1 << 2) >> 2] | 0) != 0 ? 26 : 28;
						d: do
								if (g == 26) {
									if ((p[a[d + (a[J >> 2] + 1 << 2) >> 2]] << 24 >> 24 | 0) == 45) {
										g = 28;
										break d
									}
									o(a[a[x >> 2] + 12 >> 2], Fh, h([r, 0, 0, 0, a[d + (a[J >> 2] + 1 << 2) >> 2], 0, 0, 0], ["i8*", 0, 0, 0, "i8*", 0, 0, 0], n));
									a[J >> 2] += 1
								}
							while (0)
					} else if (g == 29) {
					a[aa >> 2] = a[d + (a[J >> 2] + 1 << 2) >> 2];
					g = (a[aa >> 2] | 0) != 0 ? 30 : 35;
					do
						if (g == 30) {
							g = (p[a[aa >> 2]] << 24 >> 24 | 0) == 45 ? 31 : 34;
							do
								if (g == 31) {
									g = (a[wb >> 2] | 0) != 0 ? 32 : 33;
									do
										if (g == 32) {
											o(a[a[x >> 2] + 12 >> 2], Ob, h([r, 0, 0, 0], ["i8*", 0,
												0, 0
											], n));
											j = 63;
											break a
										}
									while (0)
								}
							while (0)
						}
					while (0);
					g = (a[aa >> 2] | 0) != 0 ? 40 : 36;
					d: do
							if (g == 36) {
								if ((a[m + 4 >> 2] | 0) != 1) {
									g = 40;
									break d
								}
								g = (a[wb >> 2] | 0) != 0 ? 38 : 39;
								do
									if (g == 38) {
										o(a[a[x >> 2] + 12 >> 2], Gh, h([r, 0, 0, 0], ["i8*", 0, 0, 0], n));
										j = 63;
										break a
									}
								while (0)
							}
						while (0);
					a[J >> 2] += 1
				} while (0);
				a[J >> 2] += 1;
				g = (a[m + 8 >> 2] | 0) != 0 ? 42 : 43;
				g == 42 ? (a[a[m + 8 >> 2] >> 2] = a[m + 12 >> 2], j = 0) : g == 43 && (j = a[m + 12 >> 2])
			} while (0)
		} else if (g == 49) j = 58;
		else if (g == 75) o(a[a[x >> 2] + 12 >> 2], Jc, h([r, 0, 0, 0], ["i8*", 0, 0, 0], n)), a[J >> 2] += 1, j = 63;
		else if (g == 55) {
			g = (p[i + 1] << 24 >> 24 |
				0) == 58 ? 56 : 72;
			do
				if (g == 56) {
					g = (p[i + 2] << 24 >> 24 | 0) == 58 ? 58 : 57;
					c: do
							if (g == 57) {
								if ((p[a[d + (a[J >> 2] << 2) >> 2] + (a[$a >> 2] + 2)] << 24 >> 24 | 0) != 0) {
									g = 58;
									break c
								}
								a[aa >> 2] = a[d + (a[J >> 2] + 1 << 2) >> 2];
								g = (a[aa >> 2] | 0) != 0 ? 62 : 67;
								do
									if (g == 62) {
										g = (p[a[aa >> 2]] << 24 >> 24 | 0) == 45 ? 63 : 66;
										do
											if (g == 63) {
												g = (a[wb >> 2] | 0) != 0 ? 64 : 65;
												do
													if (g == 64) {
														o(a[a[x >> 2] + 12 >> 2], Ob, h([r, 0, 0, 0], ["i8*", 0, 0, 0], n));
														j = 63;
														break a
													}
												while (0)
											}
										while (0)
									}
								while (0);
								g = (a[aa >> 2] | 0) != 0 ? 71 : 68;
								do
									if (g == 68) {
										g = (a[wb >> 2] | 0) != 0 ? 69 : 70;
										do
											if (g == 69) {
												o(a[a[x >> 2] + 12 >> 2], Ob, h([r, 0, 0, 0], ["i8*",
													0, 0, 0
												], n));
												j = 63;
												break a
											}
										while (0)
									}
								while (0);
								a[J >> 2] += 1;
								g = 74;
								break c
							}
						while (0);
					g == 58 && (g = a[d + (a[J >> 2] << 2) >> 2] + a[$a >> 2] + 2, a[aa >> 2] = g, g = p[g] << 24 >> 24 != 0 ? 60 : 59, g == 59 && (a[aa >> 2] = 0));
					a[J >> 2] += 1;
					j = a[vb >> 2]
				} else g == 72 && (a[$a >> 2] += 1, j = a[vb >> 2]); while (0)
		}
		while (0);
		return j
	}

	function z(a) {
		return K.J(a || 1)
	}

	function fb(a) {
		a = K.J(a + 16);
		return a + 16 - a % 16
	}

	function Hh(c, d) {
		function e(c) {
			var b;
			c === "float" || c === "double" ? b = (P[0] = a[d + f >> 2], P[1] = a[d + f + 4 >> 2], ha[0]) : c == "i64" ? (b = [a[d + f >> 2], a[d + f + 4 >> 2]], b = zb(b[0], 32) + zb(b[1], 32) *
				Math.pow(2, 32)) : b = a[d + f >> 2];
			f += K.U(c);
			return Number(b)
		}
		for (var b = c, f = 0, g = [], j, h;;) {
			var i = b;
			j = p[b];
			if (j === 0) break;
			h = p[b + 1];
			if (j == 37) {
				var k = Y,
					n = Y,
					m = Y,
					o = Y;
				a: for (;;) {
					switch (h) {
						case 43:
							k = I;
							break;
						case 45:
							n = I;
							break;
						case 35:
							m = I;
							break;
						case 48:
							if (o) break a;
							else {
								o = I;
								break
							}
						default:
							break a
					}
					b++;
					h = p[b + 1]
				}
				var q = 0;
				if (h == 42) q = e("i32"), b++, h = p[b + 1];
				else
					for (; h >= 48 && h <= 57;) q = q * 10 + (h - 48), b++, h = p[b + 1];
				var r = Y;
				if (h == 46) {
					var s = 0,
						r = I;
					b++;
					h = p[b + 1];
					if (h == 42) s = e("i32"), b++;
					else
						for (;;) {
							h = p[b + 1];
							if (h < 48 || h > 57) break;
							s = s * 10 + (h -
								48);
							b++
						}
					h = p[b + 1]
				} else s = 6;
				var t;
				switch (String.fromCharCode(h)) {
					case "h":
						h = p[b + 2];
						h == 104 ? (b++, t = 1) : t = 2;
						break;
					case "l":
						h = p[b + 2];
						h == 108 ? (b++, t = 8) : t = 4;
						break;
					case "L":
					case "q":
					case "j":
						t = 8;
						break;
					case "z":
					case "t":
					case "I":
						t = 4;
						break;
					default:
						t = W
				}
				t && b++;
				h = p[b + 1];
				if ("d,i,u,o,x,X,p".split(",").indexOf(String.fromCharCode(h)) != -1) {
					i = h == 100 || h == 105;
					t = t || 4;
					j = e("i" + t * 8);
					t <= 4 && (j = (i ? Wc : zb)(j & Math.pow(256, t) - 1, t * 8));
					var u = Math.abs(j),
						w, i = "";
					if (h == 100 || h == 105) w = Wc(j, 8 * t).toString(10);
					else if (h == 117) w = zb(j, 8 * t).toString(10),
						j = Math.abs(j);
					else if (h == 111) w = (m ? "0" : "") + u.toString(8);
					else if (h == 120 || h == 88) {
						i = m ? "0x" : "";
						if (j < 0) {
							j = -j;
							w = (u - 1).toString(16);
							m = [];
							for (u = 0; u < w.length; u++) m.push((15 - parseInt(w[u], 16)).toString(16));
							for (w = m.join(""); w.length < t * 2;) w = "f" + w
						} else w = u.toString(16);
						h == 88 && (i = i.toUpperCase(), w = w.toUpperCase())
					} else h == 112 && (u === 0 ? w = "(nil)" : (i = "0x", w = u.toString(16)));
					if (r)
						for (; w.length < s;) w = "0" + w;
					for (k && (i = j < 0 ? "-" + i : "+" + i); i.length + w.length < q;) n ? w += " " : o ? w = "0" + w : i = " " + i;
					w = i + w;
					w.split("").forEach(function (a) {
						g.push(a.charCodeAt(0))
					})
				} else if ("f,F,e,E,g,G".split(",").indexOf(String.fromCharCode(h)) !=
					-1) {
					j = e(t === 4 ? "float" : "double");
					if (isNaN(j)) w = "nan", o = Y;
					else if (isFinite(j)) {
						r = Y;
						t = Math.min(s, 20);
						if (h == 103 || h == 71) r = I, s = s || 1, t = parseInt(j.toExponential(t).split("e")[1], 10), s > t && t >= -4 ? (h = (h == 103 ? "f" : "F").charCodeAt(0), s -= t + 1) : (h = (h == 103 ? "e" : "E").charCodeAt(0), s--), t = Math.min(s, 20);
						if (h == 101 || h == 69) w = j.toExponential(t), /[eE][-+]\d$/.test(w) && (w = w.slice(0, -1) + "0" + w.slice(-1));
						else if (h == 102 || h == 70) w = j.toFixed(t);
						i = w.split("e");
						if (r && !m)
							for (; i[0].length > 1 && i[0].indexOf(".") != -1 && (i[0].slice(-1) == "0" ||
									i[0].slice(-1) == ".");) i[0] = i[0].slice(0, -1);
						else
							for (m && w.indexOf(".") == -1 && (i[0] += "."); s > t++;) i[0] += "0";
						w = i[0] + (i.length > 1 ? "e" + i[1] : "");
						h == 69 && (w = w.toUpperCase());
						k && j >= 0 && (w = "+" + w)
					} else w = (j < 0 ? "-" : "") + "inf", o = Y;
					for (; w.length < q;) n ? w += " " : w = o && (w[0] == "-" || w[0] == "+") ? w[0] + "0" + w.slice(1) : (o ? "0" : " ") + w;
					h < 97 && (w = w.toUpperCase());
					w.split("").forEach(function (a) {
						g.push(a.charCodeAt(0))
					})
				} else if (h == 115) {
					(k = e("i8*")) ? (k = Vc(k), r && k.length > s && (k = k.slice(0, s))) : k = qa("(null)", I);
					if (!n)
						for (; k.length < q--;) g.push(32);
					g = g.concat(k);
					if (n)
						for (; k.length < q--;) g.push(32)
				} else if (h == 99) {
					for (n && g.push(e("i8")); --q > 0;) g.push(32);
					n || g.push(e("i8"))
				} else if (h == 110) n = e("i32*"), a[n >> 2] = g.length;
				else if (h == 37) g.push(j);
				else
					for (u = i; u < b + 2; u++) g.push(p[u]);
				b += 2
			} else g.push(j), b += 1
		}
		return g
	}

	function Da(a, d, e) {
		for (var d = Hh(d, e), e = d.length, b = 0; b < e; b++) p[a + b] = d[b];
		p[a + b] = 0;
		return d.length
	}

	function ba(c, d) {
		var e = z(c * d),
			b = 0,
			f, g, h;
		f = e;
		g = f + c * d;
		b < 0 && (b += 256);
		for (b = b + (b << 8) + (b << 16) + b * 16777216; f % 4 !== 0 && f < g;) p[f++] = b;
		f >>= 2;
		for (h = g >> 2; f <
			h;) a[f++] = b;
		for (f <<= 2; f < g;) p[f++] = b;
		return e
	}

	function C(c) {
		if (!C.r) C.r = h([0], "i32", k);
		return a[C.r >> 2] = c
	}

	function ri(a, d, e) {
		var b = s.a[a];
		if (b) {
			if (b.i) {
				if (e < 0) return C(Fa), -1;
				if (b.object.d) {
					if (b.object.j) {
						for (var f = 0; f < e; f++) try {
							b.object.j(p[d + f])
						} catch (g) {
							return C(cb), -1
						}
						b.object.timestamp = Date.now();
						return f
					}
					C(Vb);
					return -1
				}
				f = b.position;
				a = s.a[a];
				if (!a || a.object.d) C(ka), d = -1;
				else if (a.i)
					if (a.object.c) C(bb), d = -1;
					else if (e < 0 || f < 0) C(Fa), d = -1;
				else {
					for (var h = a.object.b; h.length < f;) h.push(0);
					for (var i = 0; i <
						e; i++) h[f + i] = U[d + i];
					a.object.timestamp = Date.now();
					d = i
				} else C(fa), d = -1;
				d != -1 && (b.position += d);
				return d
			}
			C(fa);
			return -1
		}
		C(ka);
		return -1
	}

	function ga(a, d, e, b) {
		d *= e;
		if (d != 0 && ri(b, a, d) == -1 && s.a[b]) s.a[b].error = I
	}

	function o(a, d, e) {
		d = Hh(d, e);
		e = K.xa();
		ga(h(d, "i8", n), 1, d.length, a);
		K.wa(e)
	}

	function rb(a, d) {
		var e = 0;
		do {
			var b, f, g;
			b = d + e;
			f = a + e;
			for (g = b + 1; b < g;) p[f++] = p[b++];
			e++
		} while (p[d + e - 1] != 0)
	}

	function jb(c, d) {
		if (!d) return 0;
		var e = z(d);
		if (c) {
			var b = e,
				f = c;
			D(d % 1 === 0, "memcpy given " + d + " bytes to copy. Problem with quantum=1 corrections perhaps?");
			var g, h;
			g = f + d;
			if (b % 4 == f % 4 && d > 8) {
				for (; f % 4 !== 0 && f < g;) p[b++] = p[f++];
				f >>= 2;
				b >>= 2;
				for (h = g >> 2; f < h;) a[b++] = a[f++];
				f <<= 2;
				b <<= 2
			}
			for (; f < g;) p[b++] = p[f++]
		}
		return e
	}

	function Wa(a, d, e) {
		for (var b = Y, f, g = 0; g < e; g++) f = b ? 0 : p[d + g], p[a + g] = f, b = b || p[d + g] == 0
	}

	function sa(c, d) {
		o(a[Pb >> 2], c, d)
	}

	function If(a) {
		a = s.B(Ga(a));
		if (a === W) return C(db), 0;
		var d = s.G(a);
		if (d === W) return 0;
		if (d.c) {
			if (!d.A) return C(fa), 0
		} else return C(eb), 0;
		var e = s.a.length,
			b = [],
			f;
		for (f in d.b) b.push(f);
		s.a[e] = {
			path: a,
			object: d,
			position: -2,
			h: I,
			i: Y,
			p: Y,
			error: Y,
			f: Y,
			e: [],
			b: b,
			F: z(Qb.l)
		};
		return e
	}

	function Va(c) {
		if (!s.a[c] || !s.a[c].object.c) return C(ka), 0;
		if (!Va.result) Va.result = z(4);
		var d = s.a[c].F,
			e = Va.result;
		if (!s.a[c] || !s.a[c].object.c) C(ka);
		else {
			var b = s.a[c],
				f = b.position,
				g = 0,
				h;
			for (h in b.b) g++;
			if (f < -2 || f >= g) a[e >> 2] = 0;
			else {
				f === -2 ? (f = ".", h = 1) : f === -1 ? (f = "..", h = 1) : (f = b.b[f], h = b.object.b[f].Y);
				b.position++;
				g = Qb;
				a[d + g.fa >> 2] = h;
				a[d + g.ga >> 2] = b.position;
				a[d + g.ha >> 2] = f.length + 1;
				for (h = 0; h < f.length; h++) p[d + g.Q + h] = f.charCodeAt(h);
				p[d + g.Q + h] = 0;
				p[d + g.ia] = b.object.d ? 2 :
					b.object.c ? 4 : b.object.link !== H ? 10 : 8;
				a[e >> 2] = d
			}
		}
		return a[Va.result >> 2] === 0 ? 0 : s.a[c].F
	}

	function pb(a, d) {
		var e;
		a: {
			for (e = 0; e < la;) {
				var b = p[a + e],
					f = p[d + e];
				if (b == f && b == 0) break;
				if (b == 0) {
					e = -1;
					break a
				}
				if (f == 0) {
					e = 1;
					break a
				}
				if (b == f) e++;
				else {
					e = b > f ? 1 : -1;
					break a
				}
			}
			e = 0
		}
		return e
	}

	function ii(a, d) {
		for (var e = 0; e < 3;) {
			var b = p[a + e] >= 65 && p[a + e] <= 90 ? p[a + e] - 65 + 97 : p[a + e],
				f = p[d + e] >= 65 && p[d + e] <= 90 ? p[d + e] - 65 + 97 : p[d + e];
			if (b == f && b == 0) break;
			if (b == 0) return -1;
			if (f == 0) return 1;
			if (b == f) e++;
			else return b > f ? 1 : -1
		}
		return 0
	}

	function si(c, d,
		e, b) {
		for (var c = Ga(c), f = 0, g = 0, h = 0, f = 0; f < c.length; f++) {
			if (i <= 0) break;
			var i = d();
			if (i <= 0) break;
			if (c[f] === "%") {
				f++;
				for (var k = f; c[f].charCodeAt(0) >= 48 && c[f].charCodeAt(0) <= 57;) f++;
				var n;
				f != k && (n = parseInt(c.slice(k, f), 10));
				k = c[f];
				f++;
				for (var o = 0, m = [];
					(o < n || isNaN(n)) && i > 0;)
					if (k === "d" && i >= 48 && i <= 57 || k === "x" && (i >= 48 && i <= 57 || i >= 97 && i <= 102 || i >= 65 && i <= 70) || k === "s" && (f >= c.length || i !== c[f].charCodeAt(0))) m.push(String.fromCharCode(i)), i = d(), o++;
					else break;
				if (m.length === 0) break;
				m = m.join("");
				o = a[b + h >> 2];
				h += K.U("void*");
				switch (k) {
					case "d":
						a[o >> 2] = parseInt(m, 10);
						break;
					case "x":
						a[o >> 2] = parseInt(m, 16);
						break;
					case "s":
						k = qa(m);
						for (m = 0; m < k.length; m++) p[o + m] = k[m]
				}
				g++
			} else if (c[f].charCodeAt(0) !== i) {
				e(i);
				break
			}
		}
	}

	function Uf(a, d, e) {
		var b = 0;
		si(d, function () {
			return p[a + b++]
		}, function () {
			b--
		}, e)
	}

	function ti(c, d, e) {
		var b = a[e >> 2],
			f = d & 3,
			e = f != 0,
			f = f != 1,
			g = Boolean(d & 512),
			h = Boolean(d & 2048),
			i = Boolean(d & 1024),
			k = Boolean(d & 8),
			c = s.m(Ga(c));
		if (!c.q) return C(c.error), -1;
		if (d = c.object || W) {
			if (g && h) return C(Wb), -1;
			if ((e || g || i) && d.c) return C(bb), -1;
			if (f && !d.A || e && !d.write) return C(fa), -1;
			if (i && !d.d) d.b = [];
			else if (!s.la(d)) return C(cb), -1;
			c = c.path
		} else {
			if (!g) return C(db), -1;
			if (!c.k.write) return C(fa), -1;
			d = s.N(c.k, c.name, [], b & 256, b & 128);
			c = c.I + "/" + c.name
		}
		b = s.a.length;
		if (d.c) {
			e = 0;
			Qb && (e = z(Qb.l));
			var f = [],
				n;
			for (n in d.b) f.push(n);
			s.a[b] = {
				path: c,
				object: d,
				position: -2,
				h: I,
				i: Y,
				p: Y,
				error: Y,
				f: Y,
				e: [],
				b: f,
				F: e
			}
		} else s.a[b] = {
			path: c,
			object: d,
			position: 0,
			h: f,
			i: e,
			p: k,
			error: Y,
			f: Y,
			e: []
		};
		return b
	}

	function pa(a, d) {
		var e, d = Ga(d);
		if (d[0] == "r") e = d.indexOf("+") != -1 ?
			2 : 0;
		else if (d[0] == "w") e = d.indexOf("+") != -1 ? 2 : 1, e |= 512, e |= 1024;
		else if (d[0] == "a") e = d.indexOf("+") != -1 ? 2 : 1, e |= 512, e |= 8;
		else return C(Fa), 0;
		e = ti(a, e, h([511, 0, 0, 0], "i32", n));
		return e == -1 ? 0 : e
	}

	function eg(a, d) {
		var e;
		if (s.a[a] && !s.a[a].d) {
			e = s.a[a];
			var b = 0;
			d === 1 ? b += e.position : d === 2 && (b += e.object.b.length);
			b < 0 ? (C(Fa), e = -1) : (e.e = [], e = e.position = b)
		} else C(ka), e = -1;
		if (e != -1) s.a[a].f = Y
	}

	function ji(a) {
		if (a in s.a) {
			a = s.a[a];
			return a.object.d ? (C(Qc), -1) : a.position
		}
		C(ka);
		return -1
	}

	function ui(a, d, e, b) {
		var f = s.a[a];
		if (!f || f.object.d) return C(ka), -1;
		if (f.h) {
			if (f.object.c) return C(bb), -1;
			if (e < 0 || b < 0) return C(Fa), -1;
			for (a = 0; f.e.length && e > 0;) p[d++] = f.e.pop(), e--, a++;
			for (var f = f.object.b, e = Math.min(f.length - b, e), g = 0; g < e; g++) p[d + g] = f[b + g], a++;
			return a
		}
		C(fa);
		return -1
	}

	function fg(a, d, e) {
		var b = s.a[a];
		if (b) {
			if (b.h) {
				if (e < 0) return C(Fa), -1;
				if (b.object.d) {
					if (b.object.input) {
						for (a = 0; b.e.length && e > 0;) p[d++] = b.e.pop(), e--, a++;
						for (var f = 0; f < e; f++) {
							try {
								var g = b.object.input()
							} catch (h) {
								return C(cb), -1
							}
							if (g === W || g === H) break;
							a++;
							p[d + f] = g
						}
						return a
					}
					C(Vb);
					return -1
				}
				g = b.e.length;
				a = ui(a, d, e, b.position);
				a != -1 && (b.position += b.e.length - g + a);
				return a
			}
			C(fa);
			return -1
		}
		C(ka);
		return -1
	}

	function ta(a) {
		s.a[a] || C(ka);
		s.a[a] ? delete s.a[a] : C(ka)
	}

	function Kc(a) {
		if (!(a in s.a)) return -1;
		var d = s.a[a];
		if (d.f || d.error) return -1;
		a = fg(a, Kc.r, 1);
		if (a == 0) return d.f = I, -1;
		return a == -1 ? (d.error = I, -1) : p[Kc.r]
	}

	function qi(a) {
		a = s.m(Ga(a));
		if (!a.q || !a.n) return C(a.error), -1;
		if (a.object.c) return C(bb), -1;
		if (a.object.write) return delete a.k.b[a.name], 0;
		C(fa);
		return -1
	}

	function Lc(a) {
		var a = a || G.arguments,
			d = W;
		if (G._main) {
			for (d = G.ea(a); Mc.length > 0;) {
				var a = Mc.pop(),
					e = a.ma;
				typeof e === "number" && (e = za[e]);
				e(a.da === H ? W : a.da)
			}
			vi.print()
		}
		return d
	}
	var G = {
			arguments: []
		},
		Rb = [],
		Ih = typeof process === "object",
		Jh = typeof window === "object",
		Kh = typeof importScripts === "function",
		wi = !Jh && !Ih && !Kh;
	if (Ih) {
		Na = function (a) {
			process.stdout.write(a + "\n")
		};
		printErr = function (a) {
			process.stderr.write(a + "\n")
		};
		var Lh = require("fs");
		read = function (a) {
			var d = Lh.readFileSync(a).toString();
			!d && a[0] != "/" &&
				(a = __dirname.split("/").slice(0, -1).join("/") + "/src/" + a, d = Lh.readFileSync(a).toString());
			return d
		};
		Rb = process.argv.slice(2)
	} else if (wi) this.read || (read = function (a) {
		snarf(a)
	}), Rb = this.arguments ? arguments : scriptArgs;
	else if (Jh) printErr = function (a) {
		console.log(a)
	}, read = function (a) {
		var d = new XMLHttpRequest;
		d.open("GET", a, Y);
		d.send(W);
		return d.responseText
	}, this.arguments && (Rb = arguments);
	else if (Kh) load = importScripts;
	else throw "Unknown runtime environment. Where are we?";
	typeof load == "undefined" && typeof read !=
		"undefined" && (load = function (a) {
			fi(read(a))
		});
	typeof printErr === "undefined" && (printErr = function () {});
	typeof Na === "undefined" && (Na = printErr);
	try {
		this.Module = G
	} catch (yi) {
		this.Module = G = {}
	}
	if (!G.arguments) G.arguments = Rb;
	var K = {
			xa: function () {
				return t
			},
			wa: function (a) {
				t = a
			},
			Fa: function (a, d) {
				d = d || 4;
				return isNumber(a) && isNumber(d) ? Math.ceil(a / d) * d : "Math.ceil((" + a + ")/" + d + ")*" + d
			},
			oa: function (a) {
				return a in K.ba || a in K.aa
			},
			pa: function (a) {
				return a[a.length - 1] == "*"
			},
			qa: function (a) {
				return isPointerType(a) ? Y : /^\[\d+\ x\ (.*)\]/.test(a) ?
					I : /<?{ [^}]* }>?/.test(a) ? I : a[0] == "%"
			},
			ba: {
				i1: 0,
				i8: 0,
				i16: 0,
				i32: 0,
				i64: 0
			},
			aa: {
				"float": 0,
				"double": 0
			},
			Ja: function (a, d) {
				return (a | 0 | d | 0) + (Math.round(a / 4294967296) | Math.round(d / 4294967296)) * 4294967296
			},
			Ba: function (a, d) {
				return ((a | 0) & (d | 0)) + (Math.round(a / 4294967296) & Math.round(d / 4294967296)) * 4294967296
			},
			Oa: function (a, d) {
				return ((a | 0) ^ (d | 0)) + (Math.round(a / 4294967296) ^ Math.round(d / 4294967296)) * 4294967296
			},
			H: function (a) {
				if (K.t == 1) return 1;
				var d = {
					"%i1": 1,
					"%i8": 1,
					"%i16": 2,
					"%i32": 4,
					"%i64": 8,
					"%float": 4,
					"%double": 8
				}["%" +
					a
				];
				if (!d && a[a.length - 1] == "*") d = K.t;
				return d
			},
			U: function (a) {
				return Math.max(K.H(a), K.t)
			},
			ja: function (a, d) {
				var e = {};
				return d ? a.filter(function (a) {
					return e[a[d]] ? Y : e[a[d]] = I
				}) : a.filter(function (a) {
					return e[a] ? Y : e[a] = I
				})
			},
			set: function () {
				for (var a = typeof arguments[0] === "object" ? arguments[0] : arguments, d = {}, e = 0; e < a.length; e++) d[a[e]] = 0;
				return d
			},
			L: function (a) {
				a.g = 0;
				a.u = 0;
				var d = [],
					e = -1;
				a.T = a.z.map(function (b) {
					var f;
					if (K.oa(b) || K.pa(b)) b = f = K.H(b);
					else if (K.qa(b)) f = Types.types[b].g, b = Types.types[b].u;
					else throw "Unclear type in struct: " +
						b + ", in " + a.ra + " :: " + dump(Types.types[a.ra]);
					b = a.Ka ? 1 : Math.min(b, K.t);
					a.u = Math.max(a.u, b);
					b = K.K(a.g, b);
					a.g = b + f;
					e >= 0 && d.push(b - e);
					return e = b
				});
				a.g = K.K(a.g, a.u);
				if (d.length == 0) a.S = a.g;
				else if (K.ja(d).length == 1) a.S = d[0];
				a.Ha = a.S != 1;
				return a.T
			},
			na: function (a, d, e) {
				var b, f;
				if (d) {
					e = e || 0;
					b = (typeof Types === "undefined" ? K.Na : Types.types)[d];
					if (!b) return W;
					a || (a = (typeof Types === "undefined" ? K : Types).La[d.replace(/.*\./, "")]);
					if (!a) return W;
					D(b.z.length === a.length, "Number of named fields must match the type for " +
						d + ". Perhaps due to inheritance, which is not supported yet?");
					f = b.T
				} else b = {
					z: a.map(function (a) {
						return a[0]
					})
				}, f = K.L(b);
				var g = {
					l: b.g
				};
				d ? a.forEach(function (a, c) {
					if (typeof a === "string") g[a] = f[c] + e;
					else {
						var d, h;
						for (h in a) d = h;
						g[d] = K.na(a[d], b.z[c], f[c])
					}
				}) : a.forEach(function (a, b) {
					g[a[1]] = f[b]
				});
				return g
			},
			va: function (a) {
				var d = t;
				D(a > 0, "Trying to allocate 0");
				t += a;
				t = Math.ceil(t / 4) * 4;
				D(t < Nc + X, "Ran out of stack");
				return d
			},
			J: function (c) {
				var d = Mh = wa;
				D(c > 0, "Trying to allocate 0");
				wa += c;
				wa = Math.ceil(wa / 4) *
					4;
				if (wa >= la) {
					printErr("Warning: Enlarging memory arrays, this is not fast! " + [wa, la]);
					D(wa >= la && Mh < la);
					for (D(la > 4); la <= wa;) la = Math.ceil(la * 1.25 / ab) * ab;
					var c = p,
						e = new ArrayBuffer(la);
					p = new Int8Array(e);
					q = new Int16Array(e);
					a = new Int32Array(e);
					U = new Uint8Array(e);
					Aa = new Uint16Array(e);
					T = new Uint32Array(e);
					u = new Float32Array(e);
					p.set(c)
				}
				return d
			},
			K: function (a, d) {
				return Math.ceil(a / (d ? d : 4)) * (d ? d : 4)
			},
			t: 4,
			Aa: 0
		},
		vi = {
			ca: 0,
			M: 0,
			s: {},
			Ia: function (a, d) {
				d || (this.M++, this.M >= this.ca && yb("\n\nToo many corrections!"))
			},
			print: function () {
				var a = [],
					d;
				for (d in this.s) a.push({
					ua: d,
					ka: this.s[d][0],
					Ma: this.s[d][1],
					total: this.s[d][0] + this.s[d][1]
				});
				a.sort(function (a, c) {
					return c.total - a.total
				});
				for (d = 0; d < a.length; d++) {
					var e = a[d];
					Na(e.ua + " : " + e.total + " hits, %" + Math.ceil(100 * e.ka / e.total) + " failures")
				}
			}
		},
		Mc = [],
		Nh = new ArrayBuffer(8),
		P = new Int32Array(Nh),
		ha = new Float64Array(Nh);
	G.setValue = Tc;
	G.getValue = Xb;
	var n = 1,
		k = 2;
	G.ALLOC_NORMAL = 0;
	G.ALLOC_STACK = n;
	G.ALLOC_STATIC = k;
	G.allocate = h;
	G.Pointer_stringify = Ga;
	G.Array_stringify = function (a) {
		for (var d =
				"", e = 0; e < a.length; e++) d += String.fromCharCode(a[e]);
		return d
	};
	var za, ab = 4096,
		p, U, q, Aa, a, T, u, Nc, t, X, wa, Mh, la = G.TOTAL_MEMORY || 10485760;
	D(!!Int32Array && !!Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized");
	var Ma = new ArrayBuffer(la);
	p = new Int8Array(Ma);
	q = new Int16Array(Ma);
	a = new Int32Array(Ma);
	U = new Uint8Array(Ma);
	Aa = new Uint16Array(Ma);
	T = new Uint32Array(Ma);
	u = new Float32Array(Ma);
	a[0] = 255;
	D(U[0] === 255 && U[3] === 0, "Typed arrays 2 must be run on a little-endian system");
	for (var Oh = qa("(null)"), Sb = 0; Sb < Oh.length; Sb++) p[Sb] = Oh[Sb];
	G.HEAP = H;
	G.HEAP8 = p;
	G.HEAP16 = q;
	G.HEAP32 = a;
	G.HEAPU8 = U;
	G.HEAPU16 = Aa;
	G.HEAPU32 = T;
	G.HEAPF32 = u;
	Nc = t = Math.ceil(10 / ab) * ab;
	X = Nc + 1048576;
	wa = Math.ceil(X / ab) * ab;
	G.Array_copy = Uc;
	G.String_len = xa;
	G.String_copy = Vc;
	G.intArrayFromString = qa;
	G.intArrayToString = function (a) {
		for (var d = [], e = 0; e < a.length; e++) {
			var b = a[e];
			b > 255 && (D(Y, "Character code " + b + " (" + String.fromCharCode(b) + ")  at offset " + e + " not in 0x00-0xFF."), b &= 255);
			d.push(String.fromCharCode(b))
		}
		return d.join("")
	};
	Ab.X = 1;
	ad.X = 1;
	ed.X = 1;
	Zb.X = 1;
	$b.X = 1;
	ac.X = 1;
	ib.X = 1;
	hb.X = 1;
	cd.X = 1;
	dd.X = 1;
	fd.X = 1;
	F.X = 1;
	gd.X = 1;
	hd.X = 1;
	kb.X = 1;
	md.X = 1;
	od.X = 1;
	pd.X = 1;
	qd.X = 1;
	rd.X = 1;
	sd.X = 1;
	td.X = 1;
	ud.X = 1;
	vd.X = 1;
	dc.X = 1;
	Bd.X = 1;
	ic.X = 1;
	cc.X = 1;
	Fd.X = 1;
	da.X = 1;
	Hd.X = 1;
	Id.X = 1;
	Jd.X = 1;
	Kd.X = 1;
	Ld.X = 1;
	Md.X = 1;
	Vd.X = 1;
	$d.X = 1;
	ae.X = 1;
	Zd.X = 1;
	fe.X = 1;
	ge.X = 1;
	hc.X = 1;
	je.X = 1;
	kc.X = 1;
	ke.X = 1;
	me.X = 1;
	V.X = 1;
	Cb.X = 1;
	Ia.X = 1;
	oe.X = 1;
	pe.X = 1;
	qe.X = 1;
	re.X = 1;
	se.X = 1;
	te.X = 1;
	Db.X = 1;
	ue.X = 1;
	ve.X = 1;
	we.X = 1;
	xe.X = 1;
	ye.X = 1;
	ze.X = 1;
	Ae.X = 1;
	Be.X = 1;
	Ce.X = 1;
	De.X = 1;
	Ie.X = 1;
	Ka.X = 1;
	Je.X = 1;
	Ja.X = 1;
	Ta.X = 1;
	He.X = 1;
	Ge.X = 1;
	Sa.X = 1;
	Fe.X = 1;
	Ee.X = 1;
	Ne.X = 1;
	Oe.X = 1;
	Eb.X = 1;
	jd.X = 1;
	kd.X = 1;
	ld.X = 1;
	oc.X = 1;
	nc.X = 1;
	Ze.X = 1;
	Hf.X = 1;
	Lf.X = 1;
	Qf.X = 1;
	G._main = zc;
	zc.X = 1;
	sg.X = 1;
	ng.X = 1;
	kg.X = 1;
	jg.X = 1;
	ig.X = 1;
	lg.X = 1;
	pg.X = 1;
	Ib.X = 1;
	hg.X = 1;
	zh.X = 1;
	Ah.X = 1;
	Ea.X = 1;
	Bh.X = 1;
	Rf.X = 1;
	var ja = Math.floor,
		gi = Da;
	fa = 13;
	ka = 9;
	Sc = 16;
	Wb = 17;
	Fa = 22;
	cb = 5;
	bb = 21;
	db = 2;
	eb = 20;
	Rc = 39;
	Vb = 6;
	Qc = 29;
	var Oc = 0,
		Pb = 0,
		Pc = 0,
		x = 0,
		s = {
			P: "/",
			sa: 2,
			a: [W],
			V: I,
			B: function (a, d) {
				if (typeof a !== "string") return W;
				if (d === H) d = s.P;
				a && a[0] == "/" && (d = "");
				for (var e = (d + "/" + a).split("/").reverse(), b = [""]; e.length;) {
					var f = e.pop();
					f == "" || f == "." || (f == ".." ? b.length > 1 && b.pop() : b.push(f))
				}
				return b.length == 1 ? "/" : b.join("/")
			},
			m: function (a, d, e) {
				var b = {
						Z: Y,
						n: Y,
						error: 0,
						name: W,
						path: W,
						object: W,
						q: Y,
						I: W,
						k: W
					},
					a = s.B(a);
				if (a == "/") b.Z = I, b.n = b.q = I, b.name = "/", b.path = b.I = "/", b.object = b.k = s.root;
				else if (a !== W)
					for (var e = e || 0, a = a.slice(1).split("/"), f = s.root, g = [""]; a.length;) {
						if (a.length == 1 && f.c) b.q = I, b.I = g.length == 1 ? "/" : g.join("/"), b.k = f, b.name = a[0];
						var h = a.shift();
						if (f.c)
							if (f.A) {
								if (!f.b.hasOwnProperty(h)) {
									b.error =
										db;
									break
								}
							} else {
								b.error = fa;
								break
							}
						else {
							b.error = eb;
							break
						}
						f = f.b[h];
						if (f.link && !(d && a.length == 0)) {
							if (e > 40) {
								b.error = 40;
								break
							}
							b = s.B(f.link, g.join("/"));
							return s.m([b].concat(a).join("/"), d, e + 1)
						}
						g.push(h);
						if (a.length == 0) b.n = I, b.path = g.join("/"), b.object = f
					}
				return b
			},
			G: function (a, d) {
				s.R();
				var e = s.m(a, d);
				if (e.n) return e.object;
				C(e.error);
				return W
			},
			O: function (a, d, e, b, f) {
				a || (a = "/");
				typeof a === "string" && (a = s.G(a));
				if (!a) throw C(fa), Error("Parent path must exist.");
				if (!a.c) throw C(eb), Error("Parent must be a folder.");
				if (!a.write && !s.V) throw C(fa), Error("Parent folder must be writeable.");
				if (!d || d == "." || d == "..") throw C(db), Error("Name must not be empty.");
				if (a.b.hasOwnProperty(d)) throw C(Wb), Error("Can't overwrite object.");
				a.b[d] = {
					A: b === H ? I : b,
					write: f === H ? Y : f,
					timestamp: Date.now(),
					Y: s.sa++
				};
				for (var g in e) e.hasOwnProperty(g) && (a.b[d][g] = e[g]);
				return a.b[d]
			},
			D: function (a, d, e, b) {
				return s.O(a, d, {
					c: I,
					d: Y,
					b: {}
				}, e, b)
			},
			Ea: function (a, d, e, b) {
				a = s.G(a);
				if (a === W) throw Error("Invalid parent.");
				for (d = d.split("/").reverse(); d.length;) {
					var f =
						d.pop();
					f && (a.b.hasOwnProperty(f) || s.D(a, f, e, b), a = a.b[f])
				}
				return a
			},
			w: function (a, d, e, b, f) {
				e.c = Y;
				return s.O(a, d, e, b, f)
			},
			N: function (a, d, e, b, f) {
				if (typeof e === "string") {
					for (var g = [], h = 0; h < e.length; h++) g.push(e.charCodeAt(h));
					e = g
				}
				return s.w(a, d, {
					d: Y,
					b: e
				}, b, f)
			},
			Ca: function (a, d, e, b, f) {
				return s.w(a, d, {
					d: Y,
					url: e
				}, b, f)
			},
			Da: function (a, d, e, b, f) {
				return s.w(a, d, {
					d: Y,
					link: e
				}, b, f)
			},
			v: function (a, d, e, b) {
				if (!e && !b) throw Error("A device must have at least one callback defined.");
				return s.w(a, d, {
						d: I,
						input: e,
						j: b
					}, Boolean(e),
					Boolean(b))
			},
			la: function (a) {
				if (a.d || a.c || a.link || a.b) return I;
				var d = I;
				if (typeof XMLHttpRequest !== "undefined") {
					var e = new XMLHttpRequest;
					e.open("GET", a.url, Y);
					if (typeof Uint8Array != "undefined") e.responseType = "arraybuffer";
					e.overrideMimeType && e.overrideMimeType("text/plain; charset=x-user-defined");
					e.send(W);
					e.status != 200 && e.status != 0 && (d = Y);
					a.b = e.response !== H ? new Uint8Array(e.response || []) : qa(e.responseText || "", I);
				} else if (typeof read !== "undefined") try {
					a.b = qa(read(a.url), I)
				} catch (b) {
					d = Y
				} else throw Error("Cannot load without read() or XMLHttpRequest.");
				d || C(cb);
				return d
			},
			R: function () {
				if (!s.root) s.root = {
					A: I,
					write: Y,
					c: I,
					d: Y,
					timestamp: Date.now(),
					Y: 1,
					b: {}
				};
			},
			o: function (a, d, e) {
				if (!s.o.W) {
					s.o.W = I;
					s.R();
					a || (a = function () {
						if (!a.C || !a.C.length) {
							var b;
							typeof window != "undefined" && typeof window.prompt == "function" ? b = window.prompt("Input: ") : typeof readline == "function" && (b = readline());
							b || (b = "");
							a.C = qa(b + "\n", I)
						}
						return a.C.shift()
					});
					d || (d = function (a) {
						a === W || a === 10 ? (d.$(d.buffer.join("")), d.buffer = []) : d.buffer.push(String.fromCharCode(a))
					});
					if (!d.$) d.$ = Na;
					if (!d.buffer) d.buffer = [];
					e || (e = d);
					s.D("/", "tmp", I, I);
					var b = s.D("/", "dev", I, Y),
						f = s.v(b, "stdin", a),
						g = s.v(b, "stdout", W, d),
						e = s.v(b, "stderr", W, e);
					s.v(b, "tty", a, d);
					s.a[1] = {
						path: "/dev/stdin",
						object: f,
						position: 0,
						h: I,
						i: Y,
						p: Y,
						error: Y,
						f: Y,
						e: []
					};
					s.a[2] = {
						path: "/dev/stdout",
						object: g,
						position: 0,
						h: Y,
						i: I,
						p: Y,
						error: Y,
						f: Y,
						e: []
					};
					s.a[3] = {
						path: "/dev/stderr",
						object: e,
						position: 0,
						h: Y,
						i: I,
						p: Y,
						error: Y,
						f: Y,
						e: []
					};
					Oc = h([1], "void*", k);
					Pb = h([2], "void*", k);
					Pc = h([3], "void*", k);
					s.a[Oc] = s.a[1];
					s.a[Pb] = s.a[2];
					s.a[Pc] = s.a[3];
					x = h([h([0, 0, 0, 0, Oc, 0, 0, 0, Pb, 0,
						0, 0, Pc, 0, 0, 0
					], "void*", k)], "void*", k)
				}
			},
			ta: function () {
				s.o.W && (s.a[2].object.j.buffer.length > 0 && s.a[2].object.j(10), s.a[3].object.j.buffer.length > 0 && s.a[3].object.j(10))
			}
		};
	Tb = {
		l: 8,
		ya: 0,
		za: 4
	};
	Ub = {
		l: 8,
		ya: 8,
		za: 12
	};
	var hi = Math.abs,
		La = Math.pow,
		Qb = {
			l: 1040,
			fa: 0,
			Q: 4,
			ga: 1028,
			ha: 1032,
			ia: 1036
		},
		Of, li, mi, ki, ni, Ug, Vg, Wg, Xg, Fc, oi, pi;
	s.o();
	Mc.push({
		ma: function () {
			s.ta()
		}
	});
	C(0);
	Kc.r = h([0], "i8", k);
	G.ea = function (a) {
		function d() {
			for (var a = 0; a < 3; a++) b.push(0)
		}
		var e = a.length + 1,
			b = [h(qa("/bin/this.program"), "i8", k)];
		d();
		for (var f =
				0; f < e - 1; f += 1) b.push(h(qa(a[f]), "i8", k)), d();
		b.push(0);
		b = h(b, "i32", k);
		return zc(e, b)
	};
	var Zc, $c, yd, ec, fc, Ad, gc, Cd, Dd, Ph, Ed, nd, Gd, ce, be, de, ee, Wd, Xd, Yd, Td, Ud, Qd, Rd, Od, Pd, Nd, he, i, ob, Me, Le, lb, Pe, Re, Qe, Se, Te, Ue, Ye, Ve, Xe, $e, af, bf, Ua, cf, df, ef, ff, gf, hf, jf, kf, lf, mf, nf, of , pf, qf, rf, sf, tf, uf, vf, wf, xf, yf, zf, Af, Bf, Cf, Df, Ef, Ff, Gf, qc, qb, pc, Jf, ca, sc, Qh, Rh, tc, uc, vc, Hb, Sh, wc, Th, Uh, Vh, Wh, Xh, Kf, Mf, Nf, rc, Pf, Yh, Zh, Gb, Sf, ag, yc, xc, Tf, Yf, Vf, Wf, Xf, Zf, $f, $h, ai, bi, bg, cg, dg, rg, Mb, Jb, gg, sb, Kb, Ac, Bc, mg, Lb, og, qg, ua, Xa, tg, Cc, M, tb,
		Dc, ug, vg, Ec, ub, zg, wg, xg, yg, Ag, Bg, Cg, Dg, Eg, Fg, Gg, Hg, Ig, Jg, Kg, Rg, Lg, Mg, Ng, Og, Pg, Qg, Tg, Sg, Yg, Zg, yh, Nb, va, $g, ea, ah, bh, ch, dh, eh, fh, Gc, gh, hh, ih, jh, kh, Ya, lh, Za, mh, nh, oh, ph, qh, Hc, rh, sh, th, uh, vh, wh, xh, Ch, Dh, wb, J, ci, di, vb, aa, Ic, $a, Fh, Ob, Gh, Jc, Eh;
	Zc = h([69, 114, 114, 111, 114, 32, 97, 108, 108, 111, 99, 97, 116, 105, 110, 103, 32, 109, 101, 109, 111, 114, 121, 32, 102, 111, 114, 32, 99, 111, 109, 112, 114, 101, 115, 115, 101, 100, 32, 98, 105, 116, 115, 116, 114, 101, 97, 109, 10, 0], "i8", k);
	h([119, 114, 105, 116, 101, 32, 101, 114, 114, 111, 114, 10, 0], "i8", k);
	$c = h([114,
		101, 97, 100, 32, 101, 114, 114, 111, 114, 58, 32, 112, 97, 115, 115, 101, 100, 32, 116, 104, 101, 32, 101, 110, 100, 32, 111, 102, 32, 116, 104, 101, 32, 99, 111, 100, 101, 115, 116, 114, 101, 97, 109, 32, 40, 115, 116, 97, 114, 116, 32, 61, 32, 37, 100, 44, 32, 99, 117, 114, 114, 101, 110, 116, 32, 61, 32, 37, 100, 44, 32, 101, 110, 100, 32, 61, 32, 37, 100, 10, 0
	], "i8", k);
	h([1, 0, 0, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0, 0, 0, 2.75, 0, 0, 0, 0, 0, 0, 0, 5.375, 0, 0, 0, 0, 0, 0, 0, 10.68, 0, 0, 0, 0, 0, 0, 0, 21.34, 0, 0, 0, 0, 0, 0, 0, 42.67, 0, 0, 0, 0, 0, 0, 0, 85.33, 0, 0, 0, 0, 0, 0, 0, 170.7, 0, 0, 0, 0, 0, 0, 0, 341.3, 0, 0, 0, 0, 0, 0, 0, 1.038, 0,
		0, 0, 0, 0, 0, 0, 1.592, 0, 0, 0, 0, 0, 0, 0, 2.919, 0, 0, 0, 0, 0, 0, 0, 5.703, 0, 0, 0, 0, 0, 0, 0, 11.33, 0, 0, 0, 0, 0, 0, 0, 22.64, 0, 0, 0, 0, 0, 0, 0, 45.25, 0, 0, 0, 0, 0, 0, 0, 90.48, 0, 0, 0, 0, 0, 0, 0, 180.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.038, 0, 0, 0, 0, 0, 0, 0, 1.592, 0, 0, 0, 0, 0, 0, 0, 2.919, 0, 0, 0, 0, 0, 0, 0, 5.703, 0, 0, 0, 0, 0, 0, 0, 11.33, 0, 0, 0, 0, 0, 0, 0, 22.64, 0, 0, 0, 0, 0, 0, 0, 45.25, 0, 0, 0, 0, 0, 0, 0, 90.48, 0, 0, 0, 0, 0, 0, 0, 180.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7186, 0, 0, 0, 0, 0, 0, 0, 0.9218, 0, 0, 0, 0, 0, 0, 0, 1.586, 0, 0, 0, 0, 0, 0, 0, 3.043, 0, 0, 0, 0, 0, 0, 0, 6.019, 0, 0, 0, 0, 0, 0, 0, 12.01, 0, 0, 0, 0, 0,
		0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 47.97, 0, 0, 0, 0, 0, 0, 0, 95.93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	], ["double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double",
		0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0
	], k);
	h([1, 0, 0, 0, 0, 0, 0, 0, 1.965, 0, 0, 0, 0, 0, 0, 0, 4.177, 0, 0, 0, 0, 0, 0, 0, 8.403, 0, 0, 0, 0, 0, 0, 0, 16.9, 0, 0, 0, 0, 0, 0, 0, 33.84, 0, 0, 0, 0, 0, 0, 0, 67.69, 0, 0, 0, 0, 0, 0, 0, 135.3, 0, 0, 0, 0, 0, 0, 0, 270.6, 0, 0, 0, 0, 0, 0, 0, 540.9, 0, 0, 0, 0, 0, 0, 0, 2.022, 0, 0, 0, 0, 0, 0, 0, 3.989, 0, 0, 0, 0, 0, 0, 0, 8.355, 0, 0, 0, 0, 0, 0, 0, 17.04, 0, 0, 0, 0, 0, 0, 0, 34.27, 0, 0, 0, 0, 0, 0, 0, 68.63, 0, 0, 0, 0, 0, 0, 0, 137.3, 0, 0, 0, 0, 0, 0, 0, 274.6, 0, 0, 0, 0, 0, 0, 0, 549, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.022, 0, 0, 0, 0, 0, 0, 0, 3.989, 0, 0, 0, 0, 0, 0, 0, 8.355, 0, 0, 0, 0, 0, 0, 0, 17.04, 0, 0, 0, 0, 0, 0, 0, 34.27, 0, 0, 0, 0, 0, 0, 0, 68.63, 0, 0,
		0, 0, 0, 0, 0, 137.3, 0, 0, 0, 0, 0, 0, 0, 274.6, 0, 0, 0, 0, 0, 0, 0, 549, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.08, 0, 0, 0, 0, 0, 0, 0, 3.865, 0, 0, 0, 0, 0, 0, 0, 8.307, 0, 0, 0, 0, 0, 0, 0, 17.18, 0, 0, 0, 0, 0, 0, 0, 34.71, 0, 0, 0, 0, 0, 0, 0, 69.59, 0, 0, 0, 0, 0, 0, 0, 139.3, 0, 0, 0, 0, 0, 0, 0, 278.6, 0, 0, 0, 0, 0, 0, 0, 557.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	], ["double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0,
		0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double",
		0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0
	], k);
	h([85, 110, 97, 98, 108, 101, 32, 116, 111, 32, 97, 108, 108, 111, 99, 97, 116, 101, 32, 109, 101, 109, 111, 114, 121, 32, 102, 111, 114, 32, 105, 109, 97, 103, 101, 46, 10, 0], "i8", k);
	h([4, 0, 0, 0, 67, 80, 82, 76, 0, 0, 0, 0, 76, 82, 67, 80, 3, 0, 0, 0, 80, 67, 82, 76, 1, 0, 0, 0, 82, 76, 67, 80, 2, 0, 0, 0, 82, 80, 67, 76, -1, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i8", "i8", "i8", "i8",
		"i32", 0, 0, 0, "i8", "i8", "i8", "i8", "i32", 0, 0, 0, "i8", "i8", "i8", "i8", "i32", 0, 0, 0, "i8", "i8", "i8", "i8", "i32", 0, 0, 0, "i8", "i8", "i8", "i8", "i32", 0, 0, 0, "i8", "i8", "i8", "i8"
	], k);
	yd = h([65359, 0, 0, 0, 1, 0, 0, 0, 10, 0, 0, 0, 65424, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 65427, 0, 0, 0, 16, 0, 0, 0, 14, 0, 0, 0, 65497, 0, 0, 0, 8, 0, 0, 0, 16, 0, 0, 0, 65361, 0, 0, 0, 2, 0, 0, 0, 18, 0, 0, 0, 65362, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 65363, 0, 0, 0, 20, 0, 0, 0, 22, 0, 0, 0, 65374, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 65372, 0, 0, 0, 20, 0, 0, 0, 26, 0, 0, 0, 65373, 0, 0, 0, 20, 0, 0, 0, 28, 0, 0, 0, 65375, 0, 0, 0, 20, 0, 0, 0, 30, 0, 0, 0, 65365,
		0, 0, 0, 4, 0, 0, 0, 32, 0, 0, 0, 65367, 0, 0, 0, 4, 0, 0, 0, 34, 0, 0, 0, 65368, 0, 0, 0, 16, 0, 0, 0, 36, 0, 0, 0, 65376, 0, 0, 0, 4, 0, 0, 0, 38, 0, 0, 0, 65377, 0, 0, 0, 16, 0, 0, 0, 40, 0, 0, 0, 65425, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65379, 0, 0, 0, 4, 0, 0, 0, 42, 0, 0, 0, 65380, 0, 0, 0, 20, 0, 0, 0, 44, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 46, 0, 0, 0
	], ["i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32",
		0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*",
		0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "void (%struct.opj_j2k.22*)*", 0, 0, 0
	], k);
	ec = h([37, 46, 56, 120, 58, 32, 101, 120, 112, 101, 99, 116, 101, 100, 32, 97, 32, 109, 97,
		114, 107, 101, 114, 32, 105, 110, 115, 116, 101, 97, 100, 32, 111, 102, 32, 37, 120, 10, 0
	], "i8", k);
	fc = h([37, 46, 56, 120, 58, 32, 117, 110, 101, 120, 112, 101, 99, 116, 101, 100, 32, 109, 97, 114, 107, 101, 114, 32, 37, 120, 10, 0], "i8", k);
	Ad = h([77, 97, 105, 110, 32, 72, 101, 97, 100, 101, 114, 32, 100, 101, 99, 111, 100, 101, 100, 46, 10, 0], "i8", k);
	gc = h([73, 110, 99, 111, 109, 112, 108, 101, 116, 101, 32, 98, 105, 116, 115, 116, 114, 101, 97, 109, 10, 0], "i8", k);
	Cd = h([91, 74, 80, 84, 45, 115, 116, 114, 101, 97, 109, 93, 32, 58, 32, 69, 120, 112, 101, 99, 116, 105, 110, 103, 32, 77, 97, 105, 110, 32, 104, 101, 97,
		100, 101, 114, 32, 102, 105, 114, 115, 116, 32, 91, 99, 108, 97, 115, 115, 95, 73, 100, 32, 37, 100, 93, 32, 33, 10, 0
	], "i8", k);
	Dd = h([91, 74, 80, 84, 45, 115, 116, 114, 101, 97, 109, 93, 32, 58, 32, 69, 120, 112, 101, 99, 116, 105, 110, 103, 32, 84, 105, 108, 101, 32, 105, 110, 102, 111, 32, 33, 10, 0], "i8", k);
	h([116, 105, 108, 101, 32, 110, 117, 109, 98, 101, 114, 32, 37, 100, 32, 47, 32, 37, 100, 10, 0], "i8", k);
	Ph = h([85, 110, 107, 110, 111, 119, 110, 32, 109, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Ed = h([69, 114, 114, 111, 114, 32, 100, 101, 99, 111, 100, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116,
			32, 37, 100, 46, 10, 84, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 115, 32, 116, 111, 32, 114, 101, 109, 111, 118, 101, 32, 105, 115, 32, 104, 105, 103, 104, 101, 114, 32, 116, 104, 97, 110, 32, 116, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 115, 32, 111, 102, 32, 116, 104, 105, 115, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 10, 77, 111, 100, 105, 102, 121, 32, 116, 104, 101, 32, 99, 112, 95, 114, 101, 100, 117, 99, 101, 32, 112, 97, 114, 97, 109, 101, 116, 101, 114, 46, 10, 10, 0
		], "i8",
		k);
	nd = h([37, 115, 58, 32, 105, 110, 118, 97, 108, 105, 100, 32, 105, 109, 97, 103, 101, 32, 115, 105, 122, 101, 32, 40, 120, 48, 58, 37, 100, 44, 32, 120, 49, 58, 37, 100, 44, 32, 121, 48, 58, 37, 100, 44, 32, 121, 49, 58, 37, 100, 41, 10, 0], "i8", k);
	Gd = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 74, 80, 50, 72, 32, 77, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	ce = h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 100, 101, 99, 111, 100, 101, 32, 106, 112, 50, 32, 115, 116, 114, 117, 99, 116, 117, 114, 101, 10, 0], "i8", k);
	be = h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 100, 101, 99, 111, 100, 101, 32, 74, 50, 75, 32, 105,
		109, 97, 103, 101, 10, 0
	], "i8", k);
	h([73, 110, 118, 97, 108, 105, 100, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 32, 115, 112, 101, 99, 105, 102, 105, 101, 100, 32, 119, 104, 105, 108, 101, 32, 115, 101, 116, 116, 105, 110, 103, 32, 117, 112, 32, 74, 80, 50, 32, 101, 110, 99, 111, 100, 101, 114, 10, 0], "i8", k);
	h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 101, 110, 99, 111, 100, 101, 32, 105, 109, 97, 103, 101, 10, 0], "i8", k);
	de = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 70, 84, 89, 80, 32, 77, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	ee = h([69, 114, 114,
		111, 114, 32, 119, 105, 116, 104, 32, 70, 84, 89, 80, 32, 66, 111, 120, 10, 0
	], "i8", k);
	Wd = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 74, 80, 32, 77, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Xd = h([69, 114, 114, 111, 114, 32, 119, 105, 116, 104, 32, 74, 80, 32, 77, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Yd = h([69, 114, 114, 111, 114, 32, 119, 105, 116, 104, 32, 74, 80, 32, 66, 111, 120, 32, 115, 105, 122, 101, 10, 0], "i8", k);
	Td = h([69, 114, 114, 111, 114, 32, 119, 105, 116, 104, 32, 67, 79, 76, 82, 32, 98, 111, 120, 32, 115, 105, 122, 101, 10, 0], "i8", k);
	Ud = h([69, 114, 114, 111, 114, 32, 119, 105, 116, 104, 32, 67,
		79, 76, 82, 32, 66, 111, 120, 10, 0
	], "i8", k);
	Qd = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 66, 80, 67, 67, 32, 77, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Rd = h([69, 114, 114, 111, 114, 32, 119, 105, 116, 104, 32, 66, 80, 67, 67, 32, 66, 111, 120, 10, 0], "i8", k);
	Od = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 73, 72, 68, 82, 32, 77, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Pd = h([69, 114, 114, 111, 114, 32, 119, 105, 116, 104, 32, 73, 72, 68, 82, 32, 66, 111, 120, 10, 0], "i8", k);
	Nd = h([67, 97, 110, 110, 111, 116, 32, 104, 97, 110, 100, 108, 101, 32, 98, 111, 120, 32, 115, 105, 122, 101, 115, 32, 104, 105, 103, 104,
		101, 114, 32, 116, 104, 97, 110, 32, 50, 94, 51, 50, 10, 0
	], "i8", k);
	he = h([70, 111, 114, 98, 105, 100, 100, 101, 110, 32, 118, 97, 108, 117, 101, 32, 101, 110, 99, 111, 117, 110, 116, 101, 114, 32, 105, 110, 32, 109, 101, 115, 115, 97, 103, 101, 32, 104, 101, 97, 100, 101, 114, 32, 33, 33, 10, 0], "i8", k);
	h([1.732, 0, 0, 0, 0, 0, 0, 0, 0.8292, 0, 0, 0, 0, 0, 0, 0, 0.8292, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0], k);
	h([1.732, 0, 0, 0, 0, 0, 0, 0, 1.805, 0, 0, 0, 0, 0, 0, 0, 1.573, 0, 0, 0, 0, 0, 0, 0], ["double", 0, 0, 0, 0, 0, 0, 0, "double", 0, 0, 0, 0, 0, 0, 0, "double",
		0, 0, 0, 0, 0, 0, 0
	], k);
	i = h([22017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13313, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13313, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6145, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6145, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2753, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2753, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1313, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1313, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 545, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 545, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 21505, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21505, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18433, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18433, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14337, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14337, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12289, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12289, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9217, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9217, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7169, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5633, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5633, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21505, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21505, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20737, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20737, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18433, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18433, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14337, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14337, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13313, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13313, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12289, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12289, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 10241, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10241, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9217, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9217, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8705, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8705, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7169, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6145, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6145, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5633, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5633, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5121, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 4609, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4609, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4353, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4353, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2753, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2753, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2497, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2497, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2209, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2209, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1313, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1313, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1089, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1089, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 673, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 673, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 545, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 545, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 321, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 321, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 273, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 273, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22017, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	], ["i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*",
		0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0, "%struct.opj_mqc_state*", 0, 0, 0
	], k);
	h([49, 46, 52, 46, 48, 0], "i8", k);
	h([83, 101, 116, 32, 105, 110, 100, 101, 120, 32, 116, 111, 32, 78, 85, 76, 76, 32, 119, 104, 101, 110, 32, 99, 97, 108, 108, 105, 110, 103, 32, 116, 104, 101, 32, 111, 112, 106, 95, 101, 110, 99, 111, 100, 101, 32, 102, 117, 110, 99, 116, 105, 111, 110, 46, 10, 84, 111, 32, 101, 120, 116, 114, 97, 99, 116, 32, 116, 104, 101, 32, 105, 110, 100, 101, 120, 44, 32, 117, 115, 101, 32, 116, 104, 101, 32, 111, 112, 106, 95, 101, 110, 99, 111,
		100, 101, 95, 119, 105, 116, 104, 95, 105, 110, 102, 111, 40, 41, 32, 102, 117, 110, 99, 116, 105, 111, 110, 46, 10, 78, 111, 32, 105, 110, 100, 101, 120, 32, 119, 105, 108, 108, 32, 98, 101, 32, 103, 101, 110, 101, 114, 97, 116, 101, 100, 32, 100, 117, 114, 105, 110, 103, 32, 116, 104, 105, 115, 32, 101, 110, 99, 111, 100, 105, 110, 103, 10, 0
	], "i8", k);
	h([67, 80, 82, 76, 0], "i8", k);
	h([76, 82, 67, 80, 0], "i8", k);
	h([80, 67, 82, 76, 0], "i8", k);
	h([82, 76, 67, 80, 0], "i8", k);
	h([82, 80, 67, 76, 0], "i8", k);
	ob = h([64, 0, 1088, 0, 32, 0, 544, 0, 128, 0, 2176, 0, 16, 0, 272, 0], ["i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0
	], k);
	Me = h([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
	], "i8", k);
	Le = h([9, 10, 12, 13, 10, 10, 13, 13, 12, 13, 12, 13, 13, 13, 13, 13, 9, 10, 12, 11, 10, 9, 13, 12, 12, 11, 12, 11, 13, 12, 13, 12, 9, 10, 12, 11, 10, 10, 11, 11, 12, 13, 9, 10, 13, 13, 10, 10, 9, 10, 12, 13, 10, 9, 11, 12, 12, 11, 9, 10, 13, 12, 10, 9, 9, 10, 12, 13, 10, 9, 11, 12, 12, 13, 12, 13, 11, 12, 11, 12, 9, 10, 12, 11, 10, 10, 11, 11, 12, 11, 12, 11, 11, 11, 11, 11, 9, 10, 12, 11, 10, 9, 13, 12, 12, 13, 9, 10, 11, 12, 10, 9, 9, 10, 12, 13, 10, 10, 13, 13, 12, 11, 9, 10, 11, 11, 10, 10, 9, 10, 12, 13, 10, 10, 13, 13, 12, 11, 9, 10, 11, 11, 10, 10, 9, 10, 12, 11, 10, 9, 13, 12, 12, 13,
		9, 10, 11, 12, 10, 9, 9, 10, 12, 11, 10, 10, 11, 11, 12, 11, 12, 11, 11, 11, 11, 11, 9, 10, 12, 13, 10, 9, 11, 12, 12, 13, 12, 13, 11, 12, 11, 12, 9, 10, 12, 13, 10, 9, 11, 12, 12, 11, 9, 10, 13, 12, 10, 9, 9, 10, 12, 11, 10, 10, 11, 11, 12, 13, 9, 10, 13, 13, 10, 10, 9, 10, 12, 11, 10, 9, 13, 12, 12, 11, 12, 11, 13, 12, 13, 12, 9, 10, 12, 13, 10, 10, 13, 13, 12, 13, 12, 13, 13, 13, 13, 13
	], "i8", k);
	lb = h([0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7,
		7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
		8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4,
		4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 3, 3, 6, 3, 6, 6, 8, 3, 6, 6, 8, 6, 8, 8, 8, 1, 4, 4, 7, 4, 7, 7, 8, 4, 7, 7, 8, 7, 8, 8, 8, 1, 4, 4, 7, 4, 7, 7, 8, 4, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 1, 4, 4, 7, 4, 7, 7, 8, 4, 7, 7, 8, 7, 8, 8, 8, 2, 5,
		5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 1, 4, 4, 7, 4, 7, 7, 8, 4, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8, 2, 5, 5, 7, 5, 7, 7, 8, 5, 7, 7, 8, 7, 8, 8, 8
	], "i8", k);
	h([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 384, 0, 768, 0, 1152, 0, 1536, 0, 1920, 0, 2304, 0, 2688, 0, 3072, 0, 3456, 0, 3840, 0, 4224, 0, 4608, 0, 4992, 0, 5376, 0, 5760, 0, 6144, 0, 6528, 0, 6912, 0, 7296, 0, 7680, 0, 8064, 0, 8448, 0, 8832, 0, 9216, 0, 9600, 0, 9984, 0, 10368, 0, 10752, 0, 11136, 0, 11520, 0, 11904, 0, 12288, 0, 12672, 0, 13056, 0, 13440, 0, 13824, 0, 14208, 0, 14592, 0, 14976, 0, 15360, 0, 15744, 0, 16128, 0, 16512, 0, 16896, 0, 17280, 0, 17664, 0, 18048, 0, 18432, 0, 18816, 0, 19200, 0, 19584, 0, 19968, 0, 20352, 0, 20736, 0, 21120, 0, 21504, 0, 21888, 0, 22272, 0, 22656, 0, 23040,
		0, 23424, 0, 23808, 0, 24192, 0, 24576, 0, 24960, 0, 25344, 0, 25728, 0, 26112, 0, 26496, 0, 26880, 0, 27264, 0, 27648, 0, 28032, 0, 28416, 0, 28800, 0, 29184, 0, 29568, 0, 29952, 0, 30336, 0
	], ["i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0
	], k);
	h([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 128, 0, 128, 0, 128, 0, 256, 0, 256, 0, 256, 0, 384, 0, 384, 0, 512, 0, 512, 0, 640, 0, 640, 0, 768, 0, 768, 0, 896, 0, 1024, 0, 1024, 0, 1152, 0, 1280, 0, 1408, 0, 1408, 0, 1536, 0, 1664, 0, 1792, 0, 1920, 0, 2048, 0, 2176, 0, 2304, 0, 2432, 0, 2560, 0, 2688, 0, 2944, 0, 3072, 0, 3200, 0, 3328, 0, 3584, 0, 3712, 0, 3840, 0, 4096, 0, 4224, 0, 4480, 0, 4608, 0, 4864, 0, 4992, 0, 5248,
		0, 5376, 0, 5632, 0, 5888, 0, 6016, 0, 6272, 0, 6528, 0, 6784, 0, 6912, 0, 7168, 0, 7424, 0, 7680, 0, 7936, 0, 8192, 0, 8448, 0, 8704, 0, 8960, 0, 9216, 0, 9472, 0, 9856, 0, 10112, 0, 10368, 0, 10624, 0, 11008, 0, 11264, 0, 11520, 0, 11904, 0, 12160, 0, 12544, 0, 12800, 0, 13184, 0, 13440, 0, 13824, 0, 14080, 0, 14464, 0, 14848, 0, 15104, 0, 15488, 0, 15872, 0, 16256, 0, 16512, 0, 16896, 0, 17280, 0, 17664, 0, 18048, 0, 18432, 0, 18816, 0, 19200, 0, 19584, 0, 19968, 0, 20352, 0, 20864, 0, 21248, 0, 21632, 0, 22016, 0, 22528, 0, 22912, 0, 23296, 0, 23808, 0, 24192, 0, 24704, 0, 25088, 0, 25600, 0, 25984, 0, 26496, 0, 26880,
		0, 27392, 0, 27904, 0, 28288, 0, 28800, 0, 29312, 0, 29824, 0, 30208, 0, 30720, 0, 31232, 0, 31744, 0, 32256, 0
	], ["i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0
	], k);
	h([6144, 0, 6016, 0, 5888, 0, 5760, 0, 5632, 0, 5504, 0, 5376, 0, 5248, 0, 5120, 0, 4992, 0, 4864, 0, 4736, 0, 4608, 0, 4480, 0, 4352, 0, 4224, 0, 4096, 0, 3968, 0, 3840, 0, 3712, 0, 3584, 0, 3456, 0, 3328, 0, 3200, 0, 3072, 0, 2944, 0, 2816, 0, 2688, 0, 2560, 0, 2432, 0, 2304, 0, 2176, 0, 2048, 0, 1920, 0, 1792, 0, 1664, 0, 1536, 0, 1408, 0, 1280, 0, 1152, 0, 1024, 0, 896, 0, 768, 0, 640, 0, 512, 0, 384, 0, 256, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 256, 0, 384, 0, 512, 0, 640, 0, 768, 0, 896, 0, 1024, 0, 1152, 0, 1280, 0, 1408, 0, 1536, 0, 1664, 0, 1792, 0, 1920, 0, 2048, 0, 2176, 0, 2304, 0, 2432, 0, 2560, 0, 2688, 0, 2816, 0, 2944, 0, 3072, 0, 3200, 0, 3328, 0, 3456, 0, 3584, 0, 3712, 0, 3840, 0, 3968, 0, 4096, 0, 4224, 0, 4352, 0, 4480, 0, 4608, 0, 4736, 0, 4864, 0, 4992, 0, 5120, 0, 5248, 0, 5376, 0, 5504, 0, 5632, 0, 5760, 0, 5888, 0, 6016, 0
	], ["i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0
	], k);
	h([8192, 0, 7936, 0, 7680, 0, 7424, 0, 7168, 0, 6912, 0, 6784, 0, 6528, 0, 6272, 0, 6016, 0, 5888, 0, 5632, 0,
		5376, 0, 5248, 0, 4992, 0, 4864, 0, 4608, 0, 4480, 0, 4224, 0, 4096, 0, 3840, 0, 3712, 0, 3584, 0, 3328, 0, 3200, 0, 3072, 0, 2944, 0, 2688, 0, 2560, 0, 2432, 0, 2304, 0, 2176, 0, 2048, 0, 1920, 0, 1792, 0, 1664, 0, 1536, 0, 1408, 0, 1408, 0, 1280, 0, 1152, 0, 1024, 0, 1024, 0, 896, 0, 768, 0, 768, 0, 640, 0, 640, 0, 512, 0, 512, 0, 384, 0, 384, 0, 256, 0, 256, 0, 256, 0, 128, 0, 128, 0, 128, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 128, 0, 128, 0, 128, 0, 256, 0, 256, 0, 256, 0, 384, 0, 384, 0, 512, 0, 512, 0, 640, 0, 640, 0, 768, 0, 768, 0, 896, 0, 1024, 0, 1024, 0, 1152, 0, 1280, 0, 1408, 0, 1408, 0, 1536, 0,
		1664, 0, 1792, 0, 1920, 0, 2048, 0, 2176, 0, 2304, 0, 2432, 0, 2560, 0, 2688, 0, 2944, 0, 3072, 0, 3200, 0, 3328, 0, 3584, 0, 3712, 0, 3840, 0, 4096, 0, 4224, 0, 4480, 0, 4608, 0, 4864, 0, 4992, 0, 5248, 0, 5376, 0, 5632, 0, 5888, 0, 6016, 0, 6272, 0, 6528, 0, 6784, 0, 6912, 0, 7168, 0, 7424, 0, 7680, 0, 7936, 0
	], ["i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16",
		0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0, "i16", 0
	], k);
	h([69, 114, 114, 111, 114, 32, 105, 110, 105, 116, 105, 97, 108, 105, 122, 105, 110, 103, 32, 80, 97, 99, 107, 101, 116, 32, 73, 116, 101, 114, 97, 116, 111, 114, 10, 0], "i8", k);
	Pe = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 83, 79, 80, 32, 109, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Re = h([69, 114, 114, 111, 114, 32, 58, 32, 101, 120, 112, 101, 99, 116, 101, 100, 32, 69, 80, 72, 32, 109, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	Qe = h([69, 120, 112, 101, 99, 116, 101, 100, 32, 69, 80, 72, 32, 109, 97, 114, 107, 101, 114, 10, 0], "i8", k);
	h([105, 109, 97, 103, 101, 32, 123, 10, 0], "i8", k);
	h([32, 32, 116, 119, 61, 37, 100, 44, 32, 116, 104, 61, 37, 100, 32, 120, 48, 61, 37, 100, 32, 120, 49, 61, 37, 100, 32, 121, 48, 61, 37, 100, 32, 121, 49, 61, 37, 100, 10, 0], "i8", k);
	h([32, 32, 116, 105, 108, 101, 32, 123, 10, 0], "i8", k);
	h([32, 32, 32, 32, 120, 48, 61, 37, 100, 44, 32, 121, 48, 61, 37, 100, 44, 32, 120,
		49, 61, 37, 100, 44, 32, 121, 49, 61, 37, 100, 44, 32, 110, 117, 109, 99, 111, 109, 112, 115, 61, 37, 100, 10, 0
	], "i8", k);
	h([32, 32, 32, 32, 116, 105, 108, 101, 99, 32, 123, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 120, 48, 61, 37, 100, 44, 32, 121, 48, 61, 37, 100, 44, 32, 120, 49, 61, 37, 100, 44, 32, 121, 49, 61, 37, 100, 44, 32, 110, 117, 109, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 115, 61, 37, 100, 10, 0], "i8", k);
	h([10, 32, 32, 32, 114, 101, 115, 32, 123, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 120, 48, 61, 37, 100, 44, 32, 121, 48, 61, 37, 100, 44, 32, 120, 49, 61, 37, 100, 44, 32, 121, 49,
		61, 37, 100, 44, 32, 112, 119, 61, 37, 100, 44, 32, 112, 104, 61, 37, 100, 44, 32, 110, 117, 109, 98, 97, 110, 100, 115, 61, 37, 100, 10, 0
	], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 98, 97, 110, 100, 32, 123, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 120, 48, 61, 37, 100, 44, 32, 121, 48, 61, 37, 100, 44, 32, 120, 49, 61, 37, 100, 44, 32, 121, 49, 61, 37, 100, 44, 32, 115, 116, 101, 112, 115, 105, 122, 101, 61, 37, 102, 44, 32, 110, 117, 109, 98, 112, 115, 61, 37, 100, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 101, 99, 32, 123, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
		32, 32, 120, 48, 61, 37, 100, 44, 32, 121, 48, 61, 37, 100, 44, 32, 120, 49, 61, 37, 100, 44, 32, 121, 49, 61, 37, 100, 44, 32, 99, 119, 61, 37, 100, 44, 32, 99, 104, 61, 37, 100, 10, 0
	], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 0], "i8", k);
	h([32, 32, 32, 32, 32, 32, 125, 10, 0], "i8", k);
	h([32, 32, 32, 32, 125, 10, 0], "i8", k);
	h([32, 32, 125, 10, 0], "i8", k);
	h([125, 10, 0], "i8", k);
	h([45, 32, 116, 105, 108, 101, 32, 101, 110, 99, 111, 100, 101, 100, 32, 105, 110, 32, 37, 102, 32, 115, 10, 0], "i8", k);
	Se = h([116, 105, 108, 101, 32, 37, 100, 32, 111,
		102, 32, 37, 100, 10, 0
	], "i8", k);
	Te = h([116, 99, 100, 95, 100, 101, 99, 111, 100, 101, 58, 32, 105, 110, 99, 111, 109, 112, 108, 101, 116, 101, 32, 98, 105, 115, 116, 114, 101, 97, 109, 10, 0], "i8", k);
	Ue = h([45, 32, 116, 105, 101, 114, 115, 45, 49, 32, 116, 111, 111, 107, 32, 37, 102, 32, 115, 10, 0], "i8", k);
	Ye = h([69, 114, 114, 111, 114, 32, 100, 101, 99, 111, 100, 105, 110, 103, 32, 116, 105, 108, 101, 46, 32, 84, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 115, 32, 116, 111, 32, 114, 101, 109, 111, 118, 101, 32, 91, 37, 100, 43, 49, 93, 32, 105, 115,
		32, 104, 105, 103, 104, 101, 114, 32, 116, 104, 97, 110, 32, 116, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 32, 111, 102, 32, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 115, 32, 105, 110, 32, 116, 104, 101, 32, 111, 114, 105, 103, 105, 110, 97, 108, 32, 99, 111, 100, 101, 115, 116, 114, 101, 97, 109, 32, 91, 37, 100, 93, 10, 77, 111, 100, 105, 102, 121, 32, 116, 104, 101, 32, 99, 112, 95, 114, 101, 100, 117, 99, 101, 32, 112, 97, 114, 97, 109, 101, 116, 101, 114, 46, 10, 0
	], "i8", k);
	Ve = h([45, 32, 100, 119, 116, 32, 116, 111, 111, 107, 32, 37, 102, 32, 115, 10, 0], "i8", k);
	Xe = h([45, 32, 116, 105, 108, 101, 32, 100,
		101, 99, 111, 100, 101, 100, 32, 105, 110, 32, 37, 102, 32, 115, 10, 0
	], "i8", k);
	$e = h([72, 69, 76, 80, 32, 102, 111, 114, 32, 106, 50, 107, 95, 116, 111, 95, 105, 109, 97, 103, 101, 10, 45, 45, 45, 45, 10, 10, 0], "i8", k);
	af = h([45, 32, 116, 104, 101, 32, 45, 104, 32, 111, 112, 116, 105, 111, 110, 32, 100, 105, 115, 112, 108, 97, 121, 115, 32, 116, 104, 105, 115, 32, 104, 101, 108, 112, 32, 105, 110, 102, 111, 114, 109, 97, 116, 105, 111, 110, 32, 111, 110, 32, 115, 99, 114, 101, 101, 110, 10, 10, 0], "i8", k);
	bf = h([76, 105, 115, 116, 32, 111, 102, 32, 112, 97, 114, 97, 109, 101, 116, 101, 114, 115, 32, 102, 111, 114, 32,
		116, 104, 101, 32, 74, 80, 69, 71, 32, 50, 48, 48, 48, 32, 100, 101, 99, 111, 100, 101, 114, 58, 10, 0
	], "i8", k);
	Ua = h([10, 0], "i8", k);
	cf = h([32, 32, 45, 73, 109, 103, 68, 105, 114, 32, 10, 0], "i8", k);
	df = h([9, 73, 109, 97, 103, 101, 32, 102, 105, 108, 101, 32, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 112, 97, 116, 104, 32, 10, 0], "i8", k);
	ef = h([32, 32, 45, 79, 117, 116, 70, 111, 114, 32, 10, 0], "i8", k);
	ff = h([32, 32, 32, 32, 82, 69, 81, 85, 73, 82, 69, 68, 32, 111, 110, 108, 121, 32, 105, 102, 32, 45, 73, 109, 103, 68, 105, 114, 32, 105, 115, 32, 117, 115, 101, 100, 10, 0], "i8", k);
	gf = h([9, 32, 32, 78, 101, 101,
		100, 32, 116, 111, 32, 115, 112, 101, 99, 105, 102, 121, 32, 111, 110, 108, 121, 32, 102, 111, 114, 109, 97, 116, 32, 119, 105, 116, 104, 111, 117, 116, 32, 102, 105, 108, 101, 110, 97, 109, 101, 32, 60, 66, 77, 80, 62, 32, 32, 10, 0
	], "i8", k);
	hf = h([32, 32, 32, 32, 67, 117, 114, 114, 101, 110, 116, 108, 121, 32, 97, 99, 99, 101, 112, 116, 115, 32, 80, 71, 77, 44, 32, 80, 80, 77, 44, 32, 80, 78, 77, 44, 32, 80, 71, 88, 44, 32, 80, 78, 71, 44, 32, 66, 77, 80, 44, 32, 84, 73, 70, 44, 32, 82, 65, 87, 32, 97, 110, 100, 32, 84, 71, 65, 32, 102, 111, 114, 109, 97, 116, 115, 10, 0], "i8", k);
	jf = h([32, 32, 45, 105, 32, 60, 99, 111, 109, 112,
		114, 101, 115, 115, 101, 100, 32, 102, 105, 108, 101, 62, 10, 0
	], "i8", k);
	kf = h([32, 32, 32, 32, 82, 69, 81, 85, 73, 82, 69, 68, 32, 111, 110, 108, 121, 32, 105, 102, 32, 97, 110, 32, 73, 110, 112, 117, 116, 32, 105, 109, 97, 103, 101, 32, 100, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32, 115, 112, 101, 99, 105, 102, 105, 101, 100, 10, 0], "i8", k);
	lf = h([32, 32, 32, 32, 67, 117, 114, 114, 101, 110, 116, 108, 121, 32, 97, 99, 99, 101, 112, 116, 115, 32, 74, 50, 75, 45, 102, 105, 108, 101, 115, 44, 32, 74, 80, 50, 45, 102, 105, 108, 101, 115, 32, 97, 110, 100, 32, 74, 80, 84, 45, 102, 105, 108, 101, 115, 46, 32, 84,
		104, 101, 32, 102, 105, 108, 101, 32, 116, 121, 112, 101, 10, 0
	], "i8", k);
	mf = h([32, 32, 32, 32, 105, 115, 32, 105, 100, 101, 110, 116, 105, 102, 105, 101, 100, 32, 98, 97, 115, 101, 100, 32, 111, 110, 32, 105, 116, 115, 32, 115, 117, 102, 102, 105, 120, 46, 10, 0], "i8", k);
	nf = h([32, 32, 45, 111, 32, 60, 100, 101, 99, 111, 109, 112, 114, 101, 115, 115, 101, 100, 32, 102, 105, 108, 101, 62, 10, 0], "i8", k); of = h([32, 32, 32, 32, 82, 69, 81, 85, 73, 82, 69, 68, 10, 0], "i8", k);
	pf = h([32, 32, 32, 32, 67, 117, 114, 114, 101, 110, 116, 108, 121, 32, 97, 99, 99, 101, 112, 116, 115, 32, 80, 71, 77, 44, 32, 80, 80, 77, 44, 32, 80,
		78, 77, 44, 32, 80, 71, 88, 44, 32, 80, 78, 71, 44, 32, 66, 77, 80, 44, 32, 84, 73, 70, 44, 32, 82, 65, 87, 32, 97, 110, 100, 32, 84, 71, 65, 32, 102, 105, 108, 101, 115, 10, 0
	], "i8", k);
	qf = h([32, 32, 32, 32, 66, 105, 110, 97, 114, 121, 32, 100, 97, 116, 97, 32, 105, 115, 32, 119, 114, 105, 116, 116, 101, 110, 32, 116, 111, 32, 116, 104, 101, 32, 102, 105, 108, 101, 32, 40, 110, 111, 116, 32, 97, 115, 99, 105, 105, 41, 46, 32, 73, 102, 32, 97, 32, 80, 71, 88, 10, 0], "i8", k);
	rf = h([32, 32, 32, 32, 102, 105, 108, 101, 110, 97, 109, 101, 32, 105, 115, 32, 103, 105, 118, 101, 110, 44, 32, 116, 104, 101, 114, 101, 32, 119, 105, 108, 108,
		32, 98, 101, 32, 97, 115, 32, 109, 97, 110, 121, 32, 111, 117, 116, 112, 117, 116, 32, 102, 105, 108, 101, 115, 32, 97, 115, 32, 116, 104, 101, 114, 101, 32, 97, 114, 101, 10, 0
	], "i8", k);
	sf = h([32, 32, 32, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 58, 32, 97, 110, 32, 105, 110, 100, 105, 99, 101, 32, 115, 116, 97, 114, 116, 105, 110, 103, 32, 102, 114, 111, 109, 32, 48, 32, 119, 105, 108, 108, 32, 116, 104, 101, 110, 32, 98, 101, 32, 97, 112, 112, 101, 110, 100, 101, 100, 32, 116, 111, 32, 116, 104, 101, 10, 0], "i8", k);
	tf = h([32, 32, 32, 32, 111, 117, 116, 112, 117, 116, 32, 102, 105, 108, 101, 110, 97, 109, 101,
		44, 32, 106, 117, 115, 116, 32, 98, 101, 102, 111, 114, 101, 32, 116, 104, 101, 32, 34, 112, 103, 120, 34, 32, 101, 120, 116, 101, 110, 115, 105, 111, 110, 46, 32, 73, 102, 32, 97, 32, 80, 71, 77, 32, 102, 105, 108, 101, 110, 97, 109, 101, 10, 0
	], "i8", k);
	uf = h([32, 32, 32, 32, 105, 115, 32, 103, 105, 118, 101, 110, 32, 97, 110, 100, 32, 116, 104, 101, 114, 101, 32, 97, 114, 101, 32, 109, 111, 114, 101, 32, 116, 104, 97, 110, 32, 111, 110, 101, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 44, 32, 111, 110, 108, 121, 32, 116, 104, 101, 32, 102, 105, 114, 115, 116, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 10, 0], "i8",
		k);
	vf = h([32, 32, 32, 32, 119, 105, 108, 108, 32, 98, 101, 32, 119, 114, 105, 116, 116, 101, 110, 32, 116, 111, 32, 116, 104, 101, 32, 102, 105, 108, 101, 46, 10, 0], "i8", k);
	wf = h([32, 32, 45, 114, 32, 60, 114, 101, 100, 117, 99, 101, 32, 102, 97, 99, 116, 111, 114, 62, 10, 0], "i8", k);
	xf = h([32, 32, 32, 32, 83, 101, 116, 32, 116, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 104, 105, 103, 104, 101, 115, 116, 32, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 32, 108, 101, 118, 101, 108, 115, 32, 116, 111, 32, 98, 101, 32, 100, 105, 115, 99, 97, 114, 100, 101, 100, 46, 32, 84, 104, 101, 10, 0], "i8", k);
	yf = h([32, 32, 32, 32, 105, 109, 97, 103, 101, 32, 114, 101, 115, 111, 108, 117, 116, 105, 111, 110, 32, 105, 115, 32, 101, 102, 102, 101, 99, 116, 105, 118, 101, 108, 121, 32, 100, 105, 118, 105, 100, 101, 100, 32, 98, 121, 32, 50, 32, 116, 111, 32, 116, 104, 101, 32, 112, 111, 119, 101, 114, 32, 111, 102, 32, 116, 104, 101, 10, 0], "i8", k);
	zf = h([32, 32, 32, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 100, 105, 115, 99, 97, 114, 100, 101, 100, 32, 108, 101, 118, 101, 108, 115, 46, 32, 84, 104, 101, 32, 114, 101, 100, 117, 99, 101, 32, 102, 97, 99, 116, 111, 114, 32, 105, 115, 32, 108, 105, 109, 105, 116, 101, 100, 32,
		98, 121, 32, 116, 104, 101, 10, 0
	], "i8", k);
	Af = h([32, 32, 32, 32, 115, 109, 97, 108, 108, 101, 115, 116, 32, 116, 111, 116, 97, 108, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 100, 101, 99, 111, 109, 112, 111, 115, 105, 116, 105, 111, 110, 32, 108, 101, 118, 101, 108, 115, 32, 97, 109, 111, 110, 103, 32, 116, 105, 108, 101, 115, 46, 10, 0], "i8", k);
	Bf = h([32, 32, 45, 108, 32, 60, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 113, 117, 97, 108, 105, 116, 121, 32, 108, 97, 121, 101, 114, 115, 32, 116, 111, 32, 100, 101, 99, 111, 100, 101, 62, 10, 0], "i8", k);
	Cf = h([32, 32, 32, 32, 83, 101, 116, 32, 116, 104, 101, 32,
		109, 97, 120, 105, 109, 117, 109, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 113, 117, 97, 108, 105, 116, 121, 32, 108, 97, 121, 101, 114, 115, 32, 116, 111, 32, 100, 101, 99, 111, 100, 101, 46, 32, 73, 102, 32, 116, 104, 101, 114, 101, 32, 97, 114, 101, 10, 0
	], "i8", k);
	Df = h([32, 32, 32, 32, 108, 101, 115, 115, 32, 113, 117, 97, 108, 105, 116, 121, 32, 108, 97, 121, 101, 114, 115, 32, 116, 104, 97, 110, 32, 116, 104, 101, 32, 115, 112, 101, 99, 105, 102, 105, 101, 100, 32, 110, 117, 109, 98, 101, 114, 44, 32, 97, 108, 108, 32, 116, 104, 101, 32, 113, 117, 97, 108, 105, 116, 121, 32, 108, 97, 121, 101, 114, 115, 10, 0],
		"i8", k);
	Ef = h([32, 32, 32, 32, 97, 114, 101, 32, 100, 101, 99, 111, 100, 101, 100, 46, 10, 0], "i8", k);
	Ff = h([32, 32, 45, 120, 32, 32, 10, 0], "i8", k);
	Gf = h([32, 32, 32, 32, 67, 114, 101, 97, 116, 101, 32, 97, 110, 32, 105, 110, 100, 101, 120, 32, 102, 105, 108, 101, 32, 42, 46, 73, 100, 120, 32, 40, 45, 120, 32, 105, 110, 100, 101, 120, 95, 110, 97, 109, 101, 46, 73, 100, 120, 41, 32, 10, 0], "i8", k);
	qc = h([67, 111, 117, 108, 100, 32, 110, 111, 116, 32, 111, 112, 101, 110, 32, 70, 111, 108, 100, 101, 114, 32, 37, 115, 10, 0], "i8", k);
	qb = h([46, 0], "i8", k);
	pc = h([46, 46, 0], "i8", k);
	Jf = h([70, 111, 108, 100, 101, 114,
		32, 111, 112, 101, 110, 101, 100, 32, 115, 117, 99, 99, 101, 115, 115, 102, 117, 108, 108, 121, 10, 0
	], "i8", k);
	ca = h(56, "i8*", k);
	sc = h([112, 103, 120, 0], "i8", k);
	Qh = h([112, 110, 109, 0], "i8", k);
	Rh = h([112, 103, 109, 0], "i8", k);
	tc = h([112, 112, 109, 0], "i8", k);
	uc = h([98, 109, 112, 0], "i8", k);
	vc = h([116, 105, 102, 0], "i8", k);
	Hb = h([114, 97, 119, 0], "i8", k);
	Sh = h([116, 103, 97, 0], "i8", k);
	wc = h([112, 110, 103, 0], "i8", k);
	Th = h([106, 50, 107, 0], "i8", k);
	Uh = h([106, 112, 50, 0], "i8", k);
	Vh = h([106, 112, 116, 0], "i8", k);
	Wh = h([106, 50, 99, 0], "i8", k);
	Xh = h([106, 112, 99, 0], "i8",
		k);
	Kf = h([11, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 12, 0, 0, 0, 14, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0], k);
	Mf = h([70, 105, 108, 101, 32, 78, 117, 109, 98, 101, 114, 32, 37, 100, 32, 34, 37, 115, 34, 10, 0], "i8", k);
	Nf = h([37, 115, 47, 37, 115, 0], "i8", k);
	rc = h([46, 37, 115, 0], "i8", k);
	Pf = h([37, 115, 47, 37, 115, 46, 37, 115, 0], "i8", k);
	Yh = h([73,
		109, 103, 68, 105, 114, 0
	], "i8", k);
	Zh = h([79, 117, 116, 70, 111, 114, 0], "i8", k);
	Gb = h([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0], ["i8*", 0, 0, 0, "i32", 0, 0, 0, "i32*", 0, 0, 0, "i32", 0, 0, 0, "i8*", 0, 0, 0, "i32", 0, 0, 0, "i32*", 0, 0, 0, "i32", 0, 0, 0], k);
	Sf = h([105, 58, 111, 58, 114, 58, 108, 58, 120, 58, 104, 0], "i8", k);
	ag = h([33, 33, 32, 85, 110, 114, 101, 99, 111, 103, 110, 105, 122, 101, 100, 32, 102, 111, 114, 109, 97, 116, 32, 102, 111, 114, 32, 105, 110, 102, 105, 108, 101, 32, 58, 32, 37, 115, 32, 91, 97, 99, 99, 101, 112, 116, 32, 111, 110, 108, 121, 32, 42, 46,
		106, 50, 107, 44, 32, 42, 46, 106, 112, 50, 44, 32, 42, 46, 106, 112, 99, 32, 111, 114, 32, 42, 46, 106, 112, 116, 93, 32, 33, 33, 10, 10, 0
	], "i8", k);
	yc = h([85, 110, 107, 110, 111, 119, 110, 32, 111, 117, 116, 112, 117, 116, 32, 102, 111, 114, 109, 97, 116, 32, 105, 109, 97, 103, 101, 32, 37, 115, 32, 91, 111, 110, 108, 121, 32, 42, 46, 112, 110, 109, 44, 32, 42, 46, 112, 103, 109, 44, 32, 42, 46, 112, 112, 109, 44, 32, 42, 46, 112, 103, 120, 44, 32, 42, 46, 98, 109, 112, 44, 32, 42, 46, 116, 105, 102, 44, 32, 42, 46, 114, 97, 119, 32, 111, 114, 32, 42, 46, 116, 103, 97, 93, 33, 33, 32, 10, 0], "i8", k);
	xc = h([37, 100, 0], "i8", k);
	Tf = h([87, 65, 82, 78, 73, 78, 71, 32, 45, 62, 32, 116, 104, 105, 115, 32, 111, 112, 116, 105, 111, 110, 32, 105, 115, 32, 110, 111, 116, 32, 118, 97, 108, 105, 100, 32, 34, 45, 37, 99, 32, 37, 115, 34, 10, 0], "i8", k);
	Yf = h([69, 114, 114, 111, 114, 58, 32, 111, 112, 116, 105, 111, 110, 115, 32, 45, 73, 109, 103, 68, 105, 114, 32, 97, 110, 100, 32, 45, 105, 32, 99, 97, 110, 110, 111, 116, 32, 98, 101, 32, 117, 115, 101, 100, 32, 116, 111, 103, 101, 116, 104, 101, 114, 32, 33, 33, 10, 0], "i8", k);
	Vf = h([69, 114, 114, 111, 114, 58, 32, 87, 104, 101, 110, 32, 45, 73, 109, 103, 68, 105, 114, 32, 105, 115, 32, 117, 115, 101, 100, 44,
		32, 45, 79, 117, 116, 70, 111, 114, 32, 60, 70, 79, 82, 77, 65, 84, 62, 32, 109, 117, 115, 116, 32, 98, 101, 32, 117, 115, 101, 100, 32, 33, 33, 10, 0
	], "i8", k);
	Wf = h([79, 110, 108, 121, 32, 111, 110, 101, 32, 102, 111, 114, 109, 97, 116, 32, 97, 108, 108, 111, 119, 101, 100, 33, 32, 86, 97, 108, 105, 100, 32, 102, 111, 114, 109, 97, 116, 32, 80, 71, 77, 44, 32, 80, 80, 77, 44, 32, 80, 78, 77, 44, 32, 80, 71, 88, 44, 32, 66, 77, 80, 44, 32, 84, 73, 70, 44, 32, 82, 65, 87, 32, 97, 110, 100, 32, 84, 71, 65, 33, 33, 10, 0], "i8", k);
	Xf = h([69, 114, 114, 111, 114, 58, 32, 111, 112, 116, 105, 111, 110, 115, 32, 45, 73, 109, 103, 68, 105, 114,
		32, 97, 110, 100, 32, 45, 111, 32, 99, 97, 110, 110, 111, 116, 32, 98, 101, 32, 117, 115, 101, 100, 32, 116, 111, 103, 101, 116, 104, 101, 114, 32, 33, 33, 10, 0
	], "i8", k);
	Zf = h([69, 120, 97, 109, 112, 108, 101, 58, 32, 37, 115, 32, 45, 105, 32, 105, 109, 97, 103, 101, 46, 106, 50, 107, 32, 45, 111, 32, 105, 109, 97, 103, 101, 46, 112, 103, 109, 10, 0], "i8", k);
	$f = h([32, 32, 32, 32, 84, 114, 121, 58, 32, 37, 115, 32, 45, 104, 10, 0], "i8", k);
	$h = h([91, 69, 82, 82, 79, 82, 93, 32, 37, 115, 0], "i8", k);
	ai = h([91, 87, 65, 82, 78, 73, 78, 71, 93, 32, 37, 115, 0], "i8", k);
	bi = h([91, 73, 78, 70, 79, 93, 32, 37, 115, 0], "i8", k);
	bg = h([70, 111, 108, 100, 101, 114, 32, 105, 115, 32, 101, 109, 112, 116, 121, 10, 0], "i8", k);
	cg = h([115, 107, 105, 112, 112, 105, 110, 103, 32, 102, 105, 108, 101, 46, 46, 46, 10, 0], "i8", k);
	dg = h([114, 98, 0], "i8", k);
	rg = h([69, 82, 82, 79, 82, 32, 45, 62, 32, 102, 97, 105, 108, 101, 100, 32, 116, 111, 32, 111, 112, 101, 110, 32, 37, 115, 32, 102, 111, 114, 32, 114, 101, 97, 100, 105, 110, 103, 10, 0], "i8", k);
	Mb = h([69, 82, 82, 79, 82, 32, 45, 62, 32, 106, 50, 107, 95, 116, 111, 95, 105, 109, 97, 103, 101, 58, 32, 102, 97, 105, 108, 101, 100, 32, 116, 111, 32, 100, 101, 99, 111, 100, 101, 32, 105, 109, 97, 103, 101,
		33, 10, 0
	], "i8", k);
	Jb = h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 111, 117, 116, 112, 117, 116, 32, 105, 110, 100, 101, 120, 32, 102, 105, 108, 101, 10, 0], "i8", k);
	gg = h([115, 107, 105, 112, 112, 105, 110, 103, 32, 102, 105, 108, 101, 46, 46, 10, 0], "i8", k);
	sb = h([79, 117, 116, 102, 105, 108, 101, 32, 37, 115, 32, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 100, 10, 0], "i8", k);
	Kb = h([71, 101, 110, 101, 114, 97, 116, 101, 100, 32, 79, 117, 116, 102, 105, 108, 101, 32, 37, 115, 10, 0], "i8", k);
	Ac = h(1, "i32", k);
	Bc = h(1, "i32", k);
	mg = h([69, 114, 114, 111, 114, 32, 103, 101, 110, 101, 114, 97,
		116, 105, 110, 103, 32, 114, 97, 119, 32, 102, 105, 108, 101, 46, 32, 79, 117, 116, 102, 105, 108, 101, 32, 37, 115, 32, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 100, 10, 0
	], "i8", k);
	Lb = h([83, 117, 99, 99, 101, 115, 115, 102, 117, 108, 108, 121, 32, 103, 101, 110, 101, 114, 97, 116, 101, 100, 32, 79, 117, 116, 102, 105, 108, 101, 32, 37, 115, 10, 0], "i8", k);
	og = h([69, 114, 114, 111, 114, 32, 103, 101, 110, 101, 114, 97, 116, 105, 110, 103, 32, 116, 103, 97, 32, 102, 105, 108, 101, 46, 32, 79, 117, 116, 102, 105, 108, 101, 32, 37, 115, 32, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 100, 10,
		0
	], "i8", k);
	qg = h([69, 114, 114, 111, 114, 32, 103, 101, 110, 101, 114, 97, 116, 105, 110, 103, 32, 112, 110, 103, 32, 102, 105, 108, 101, 46, 32, 79, 117, 116, 102, 105, 108, 101, 32, 37, 115, 32, 110, 111, 116, 32, 103, 101, 110, 101, 114, 97, 116, 101, 100, 10, 0], "i8", k);
	h([83, 111, 114, 114, 121, 44, 32, 99, 111, 109, 112, 114, 101, 115, 115, 101, 100, 32, 116, 103, 97, 32, 102, 105, 108, 101, 115, 32, 97, 114, 101, 32, 110, 111, 116, 32, 99, 117, 114, 114, 101, 110, 116, 108, 121, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 46, 10, 0], "i8", k);
	h([70, 105, 108, 101, 32, 99, 111, 110, 116, 97, 105, 110, 115, 32,
		97, 32, 112, 97, 108, 101, 116, 116, 101, 32, 45, 32, 110, 111, 116, 32, 121, 101, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 46, 0
	], "i8", k);
	h([114, 98, 0], "i8", k);
	h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 111, 112, 101, 110, 32, 37, 115, 32, 102, 111, 114, 32, 114, 101, 97, 100, 105, 110, 103, 32, 33, 33, 10, 0], "i8", k);
	h([67, 117, 114, 114, 101, 110, 116, 108, 121, 32, 117, 110, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 105, 116, 32, 100, 101, 112, 116, 104, 32, 58, 32, 37, 115, 10, 0], "i8", k);
	ua = h([119, 98, 0], "i8", k);
	Xa = h([69, 82, 82, 79, 82, 32, 45, 62, 32, 102, 97, 105, 108, 101,
		100, 32, 116, 111, 32, 111, 112, 101, 110, 32, 37, 115, 32, 102, 111, 114, 32, 119, 114, 105, 116, 105, 110, 103, 10, 0
	], "i8", k);
	tg = h([85, 110, 97, 98, 108, 101, 32, 116, 111, 32, 99, 114, 101, 97, 116, 101, 32, 97, 32, 116, 103, 97, 32, 102, 105, 108, 101, 32, 119, 105, 116, 104, 32, 115, 117, 99, 104, 32, 74, 50, 75, 32, 105, 109, 97, 103, 101, 32, 99, 104, 97, 114, 97, 116, 101, 114, 105, 115, 116, 105, 99, 115, 46, 0], "i8", k);
	h([69, 114, 114, 111, 114, 44, 32, 110, 111, 116, 32, 97, 32, 66, 77, 80, 32, 102, 105, 108, 101, 33, 10, 0], "i8", k);
	h([78, 111, 32, 68, 101, 108, 116, 97, 32, 115, 117, 112, 112, 111, 114, 116,
		101, 100, 10, 0
	], "i8", k);
	h([79, 116, 104, 101, 114, 32, 115, 121, 115, 116, 101, 109, 32, 116, 104, 97, 110, 32, 50, 52, 32, 98, 105, 116, 115, 47, 112, 105, 120, 101, 108, 115, 32, 111, 114, 32, 56, 32, 98, 105, 116, 115, 32, 40, 110, 111, 32, 82, 76, 69, 32, 99, 111, 100, 105, 110, 103, 41, 32, 105, 115, 32, 110, 111, 116, 32, 121, 101, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101, 100, 32, 91, 37, 100, 93, 10, 0], "i8", k);
	Cc = h([66, 77, 0], "i8", k);
	M = h([37, 99, 37, 99, 37, 99, 37, 99, 0], "i8", k);
	tb = h([37, 99, 37, 99, 0], "i8", k);
	Dc = h([66, 77, 80, 32, 67, 79, 78, 86, 69, 82, 83, 73, 79, 78, 58, 32, 84, 114,
		117, 110, 99, 97, 116, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 48, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0
	], "i8", k);
	ug = h([66, 77, 80, 32, 67, 79, 78, 86, 69, 82, 83, 73, 79, 78, 58, 32, 84, 114, 117, 110, 99, 97, 116, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 49, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0], "i8", k);
	vg = h([66, 77, 80, 32, 67, 79, 78, 86, 69, 82, 83, 73, 79, 78, 58, 32, 84, 114, 117, 110, 99, 97, 116, 105, 110, 103, 32, 99, 111,
		109, 112, 111, 110, 101, 110, 116, 32, 50, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0
	], "i8", k);
	Ec = h([37, 99, 37, 99, 37, 99, 0], "i8", k);
	ub = h([37, 99, 0], "i8", k);
	h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 111, 112, 101, 110, 32, 37, 115, 32, 102, 111, 114, 32, 114, 101, 97, 100, 105, 110, 103, 32, 33, 10, 0], "i8", k);
	h([80, 71, 37, 91, 32, 9, 93, 37, 99, 37, 99, 37, 91, 32, 9, 43, 45, 93, 37, 100, 37, 91, 32, 9, 93, 37, 100, 37, 91, 32, 9, 93, 37, 100, 0], "i8", k);
	h([66, 97, 100, 32, 112, 103, 120, 32, 104, 101, 97, 100, 101, 114, 44, 32, 112, 108,
		101, 97, 115, 101, 32, 99, 104, 101, 99, 107, 32, 105, 110, 112, 117, 116, 32, 102, 105, 108, 101, 10, 0
	], "i8", k);
	zg = h([69, 82, 82, 79, 82, 32, 45, 62, 32, 73, 109, 112, 111, 115, 115, 105, 98, 108, 101, 32, 104, 97, 112, 112, 101, 110, 46, 0], "i8", k);
	wg = h([45, 37, 100, 46, 112, 103, 120, 0], "i8", k);
	xg = h([46, 112, 103, 120, 0], "i8", k);
	yg = h([80, 71, 32, 77, 76, 32, 37, 99, 32, 37, 100, 32, 37, 100, 32, 37, 100, 10, 0], "i8", k);
	h([37, 100, 32, 37, 100, 10, 50, 53, 53, 0], "i8", k);
	h([37, 117, 0], "i8", k);
	Ag = h([80, 54, 10, 37, 100, 32, 37, 100, 10, 37, 100, 10, 0], "i8", k);
	Bg = h([80, 78, 77, 32, 67, 79, 78, 86,
		69, 82, 83, 73, 79, 78, 58, 32, 84, 114, 117, 110, 99, 97, 116, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 48, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0
	], "i8", k);
	Cg = h([80, 78, 77, 32, 67, 79, 78, 86, 69, 82, 83, 73, 79, 78, 58, 32, 84, 114, 117, 110, 99, 97, 116, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 49, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0], "i8", k);
	Dg = h([80, 78, 77, 32, 67, 79, 78, 86, 69, 82, 83, 73, 79, 78, 58, 32, 84, 114, 117, 110,
		99, 97, 116, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 50, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0
	], "i8", k);
	Eg = h([87, 65, 82, 78, 73, 78, 71, 32, 45, 62, 32, 91, 80, 71, 77, 32, 102, 105, 108, 101, 115, 93, 32, 79, 110, 108, 121, 32, 116, 104, 101, 32, 102, 105, 114, 115, 116, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 10, 0], "i8", k);
	Fg = h([32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 105, 115, 32, 119, 114, 105, 116, 116, 101, 110, 32, 116, 111, 32, 116, 104, 101, 32, 102, 105, 108, 101, 10, 0], "i8", k);
	Gg = h([37, 100, 46, 37,
		115, 0
	], "i8", k);
	Hg = h([37, 115, 0], "i8", k);
	Ig = h([80, 53, 10, 37, 100, 32, 37, 100, 10, 37, 100, 10, 0], "i8", k);
	Jg = h([80, 78, 77, 32, 67, 79, 78, 86, 69, 82, 83, 73, 79, 78, 58, 32, 84, 114, 117, 110, 99, 97, 116, 105, 110, 103, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 37, 100, 32, 102, 114, 111, 109, 32, 37, 100, 32, 98, 105, 116, 115, 32, 116, 111, 32, 56, 32, 98, 105, 116, 115, 10, 0], "i8", k);
	Kg = h([10, 69, 114, 114, 111, 114, 58, 32, 105, 110, 118, 97, 108, 105, 100, 32, 114, 97, 119, 32, 105, 109, 97, 103, 101, 32, 112, 97, 114, 97, 109, 101, 116, 101, 114, 115, 10, 0], "i8", k);
	h([80, 108, 101, 97, 115,
		101, 32, 117, 115, 101, 32, 116, 104, 101, 32, 70, 111, 114, 109, 97, 116, 32, 111, 112, 116, 105, 111, 110, 32, 45, 70, 58, 10, 0
	], "i8", k);
	h([45, 70, 32, 114, 97, 119, 87, 105, 100, 116, 104, 44, 114, 97, 119, 72, 101, 105, 103, 104, 116, 44, 114, 97, 119, 67, 111, 109, 112, 44, 114, 97, 119, 66, 105, 116, 68, 101, 112, 116, 104, 44, 115, 47, 117, 32, 40, 83, 105, 103, 110, 101, 100, 47, 85, 110, 115, 105, 103, 110, 101, 100, 41, 10, 0], "i8", k);
	h([69, 120, 97, 109, 112, 108, 101, 58, 32, 45, 105, 32, 108, 101, 110, 97, 46, 114, 97, 119, 32, 45, 111, 32, 108, 101, 110, 97, 46, 106, 50, 107, 32, 45, 70, 32, 53, 49, 50, 44, 53,
		49, 50, 44, 51, 44, 56, 44, 117, 10, 0
	], "i8", k);
	h([65, 98, 111, 114, 116, 105, 110, 103, 10, 0], "i8", k);
	h([69, 114, 114, 111, 114, 32, 114, 101, 97, 100, 105, 110, 103, 32, 114, 97, 119, 32, 102, 105, 108, 101, 46, 32, 69, 110, 100, 32, 111, 102, 32, 102, 105, 108, 101, 32, 112, 114, 111, 98, 97, 98, 108, 121, 32, 114, 101, 97, 99, 104, 101, 100, 46, 10, 0], "i8", k);
	h([79, 112, 101, 110, 74, 80, 69, 71, 32, 99, 97, 110, 110, 111, 116, 32, 101, 110, 99, 111, 100, 101, 32, 114, 97, 119, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 32, 119, 105, 116, 104, 32, 98, 105, 116, 32, 100, 101, 112, 116, 104, 32, 104, 105, 103,
		104, 101, 114, 32, 116, 104, 97, 110, 32, 49, 54, 32, 98, 105, 116, 115, 46, 10, 0
	], "i8", k);
	h([87, 97, 114, 110, 105, 110, 103, 46, 32, 69, 110, 100, 32, 111, 102, 32, 114, 97, 119, 32, 102, 105, 108, 101, 32, 110, 111, 116, 32, 114, 101, 97, 99, 104, 101, 100, 46, 46, 46, 32, 112, 114, 111, 99, 101, 115, 115, 105, 110, 103, 32, 97, 110, 121, 119, 97, 121, 10, 0], "i8", k);
	Rg = h([70, 97, 105, 108, 101, 100, 32, 116, 111, 32, 111, 112, 101, 110, 32, 37, 115, 32, 102, 111, 114, 32, 119, 114, 105, 116, 105, 110, 103, 32, 33, 33, 10, 0], "i8", k);
	Lg = h([82, 97, 119, 32, 105, 109, 97, 103, 101, 32, 99, 104, 97, 114, 97, 99, 116, 101,
		114, 105, 115, 116, 105, 99, 115, 58, 32, 37, 100, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 115, 10, 0
	], "i8", k);
	Mg = h([67, 111, 109, 112, 111, 110, 101, 110, 116, 32, 37, 100, 32, 99, 104, 97, 114, 97, 99, 116, 101, 114, 105, 115, 116, 105, 99, 115, 58, 32, 37, 100, 120, 37, 100, 120, 37, 100, 32, 37, 115, 10, 0], "i8", k);
	Ng = h([115, 105, 103, 110, 101, 100, 0], "i8", k);
	Og = h([117, 110, 115, 105, 103, 110, 101, 100, 0], "i8", k);
	Pg = h([77, 111, 114, 101, 32, 116, 104, 97, 110, 32, 49, 54, 32, 98, 105, 116, 115, 32, 112, 101, 114, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 110, 111, 32, 104, 97, 110, 100,
		108, 101, 100, 32, 121, 101, 116, 10, 0
	], "i8", k);
	Qg = h([69, 114, 114, 111, 114, 58, 32, 105, 110, 118, 97, 108, 105, 100, 32, 112, 114, 101, 99, 105, 115, 105, 111, 110, 58, 32, 37, 100, 10, 0], "i8", k);
	h([112, 110, 103, 116, 111, 105, 109, 97, 103, 101, 58, 32, 99, 97, 110, 32, 110, 111, 116, 32, 111, 112, 101, 110, 32, 37, 115, 10, 0], "i8", k);
	h([137, 80, 78, 71, 13, 10, 26, 10, 0], "i8", k);
	h([112, 110, 103, 116, 111, 105, 109, 97, 103, 101, 58, 32, 37, 115, 32, 105, 115, 32, 110, 111, 32, 118, 97, 108, 105, 100, 32, 80, 78, 71, 32, 102, 105, 108, 101, 10, 0], "i8", k);
	Tg = h([49, 46, 50, 46, 52, 54, 0], "i8", k);
	Sg =
		h([105, 109, 97, 103, 101, 116, 111, 112, 110, 103, 58, 32, 99, 97, 110, 32, 110, 111, 116, 32, 99, 114, 101, 97, 116, 101, 32, 37, 115, 10, 9, 119, 114, 111, 110, 103, 32, 98, 105, 116, 95, 100, 101, 112, 116, 104, 32, 37, 100, 10, 0], "i8", k);
	Yg = h([105, 109, 97, 103, 101, 116, 111, 112, 110, 103, 58, 32, 99, 97, 110, 32, 110, 111, 116, 32, 99, 114, 101, 97, 116, 101, 32, 37, 115, 10, 0], "i8", k);
	Zg = h([119, 0], "i8", k);
	yh = h([102, 97, 105, 108, 101, 100, 32, 116, 111, 32, 111, 112, 101, 110, 32, 105, 110, 100, 101, 120, 32, 102, 105, 108, 101, 32, 91, 37, 115, 93, 32, 102, 111, 114, 32, 119, 114, 105, 116, 105, 110, 103,
		10, 0
	], "i8", k);
	Nb = h([37, 100, 32, 37, 100, 10, 0], "i8", k);
	va = h([37, 100, 10, 0], "i8", k);
	$g = h([91, 37, 100, 44, 37, 100, 93, 32, 0], "i8", k);
	ea = h([10, 0], "i8", k);
	ah = h([10, 73, 78, 70, 79, 32, 79, 78, 32, 84, 73, 76, 69, 83, 10, 0], "i8", k);
	bh = h([116, 105, 108, 101, 110, 111, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 32, 101, 110, 100, 95, 104, 100, 32, 32, 101, 110, 100, 95, 116, 105, 108, 101, 32, 32, 32, 110, 98, 112, 97, 114, 116, 115, 0], "i8", k);
	ch = h([32, 32, 32, 32, 32, 32, 32, 32, 32, 100, 105, 115, 116, 111, 0], "i8", k);
	dh = h([32, 32, 32, 32, 32, 110, 98, 112, 105, 120, 0], "i8", k);
	eh = h([32,
		32, 100, 105, 115, 116, 111, 47, 110, 98, 112, 105, 120, 0
	], "i8", k);
	fh = h([37, 52, 100, 32, 37, 57, 100, 32, 37, 57, 100, 32, 37, 57, 100, 32, 37, 57, 100, 0], "i8", k);
	Gc = h([32, 37, 57, 101, 0], "i8", k);
	gh = h([32, 37, 57, 100, 0], "i8", k);
	hh = h([10, 84, 73, 76, 69, 32, 37, 100, 32, 68, 69, 84, 65, 73, 76, 83, 10, 0], "i8", k);
	ih = h([112, 97, 114, 116, 95, 110, 98, 32, 116, 105, 108, 101, 110, 111, 32, 32, 115, 116, 97, 114, 116, 95, 112, 97, 99, 107, 32, 110, 117, 109, 95, 112, 97, 99, 107, 115, 32, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 101, 110, 100, 95, 116, 112, 104, 95, 112, 111, 115, 32, 32, 32, 101, 110,
		100, 95, 112, 111, 115, 10, 0
	], "i8", k);
	jh = h([37, 52, 100, 32, 37, 57, 100, 32, 32, 32, 37, 57, 100, 32, 37, 57, 100, 32, 32, 37, 57, 100, 32, 37, 49, 49, 100, 32, 37, 57, 100, 10, 0], "i8", k);
	kh = h([76, 82, 67, 80, 10, 112, 97, 99, 107, 95, 110, 98, 32, 116, 105, 108, 101, 110, 111, 32, 108, 97, 121, 110, 111, 32, 114, 101, 115, 110, 111, 32, 99, 111, 109, 112, 110, 111, 32, 112, 114, 101, 99, 110, 111, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 104, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 111, 115, 0], "i8", k);
	Ya = h([32, 100, 105, 115, 116, 111, 0], "i8", k);
	lh = h([37, 52, 100, 32, 37,
		54, 100, 32, 37, 55, 100, 32, 37, 53, 100, 32, 37, 54, 100, 32, 32, 37, 54, 100, 32, 32, 32, 32, 37, 54, 100, 32, 32, 32, 32, 32, 37, 54, 100, 32, 37, 55, 100, 0
	], "i8", k);
	Za = h([32, 37, 56, 101, 0], "i8", k);
	mh = h([82, 76, 67, 80, 10, 112, 97, 99, 107, 95, 110, 98, 32, 116, 105, 108, 101, 110, 111, 32, 114, 101, 115, 110, 111, 32, 108, 97, 121, 110, 111, 32, 99, 111, 109, 112, 110, 111, 32, 112, 114, 101, 99, 110, 111, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 104, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 111, 115, 10, 0], "i8", k);
	nh = h([37, 52, 100, 32, 37, 54, 100, 32, 37, 53, 100, 32, 37,
		55, 100, 32, 37, 54, 100, 32, 37, 54, 100, 32, 37, 57, 100, 32, 32, 32, 37, 57, 100, 32, 37, 55, 100, 0
	], "i8", k);
	oh = h([82, 80, 67, 76, 10, 112, 97, 99, 107, 95, 110, 98, 32, 116, 105, 108, 101, 110, 111, 32, 114, 101, 115, 110, 111, 32, 112, 114, 101, 99, 110, 111, 32, 99, 111, 109, 112, 110, 111, 32, 108, 97, 121, 110, 111, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 104, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 111, 115, 0], "i8", k);
	ph = h([37, 52, 100, 32, 37, 54, 100, 32, 37, 53, 100, 32, 37, 54, 100, 32, 37, 54, 100, 32, 37, 55, 100, 32, 37, 57, 100, 32, 32, 32, 37, 57, 100, 32, 37, 55, 100,
		0
	], "i8", k);
	qh = h([80, 67, 82, 76, 10, 112, 97, 99, 107, 95, 110, 98, 32, 116, 105, 108, 101, 110, 111, 32, 112, 114, 101, 99, 110, 111, 32, 99, 111, 109, 112, 110, 111, 32, 114, 101, 115, 110, 111, 32, 108, 97, 121, 110, 111, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 104, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 111, 115, 0], "i8", k);
	Hc = h([37, 52, 100, 32, 37, 54, 100, 32, 37, 54, 100, 32, 37, 54, 100, 32, 37, 53, 100, 32, 37, 55, 100, 32, 37, 57, 100, 32, 32, 32, 37, 57, 100, 32, 37, 55, 100, 0], "i8", k);
	rh = h([67, 80, 82, 76, 10, 112, 97, 99, 107, 95, 110, 98, 32, 116, 105, 108, 101, 110,
		111, 32, 99, 111, 109, 112, 110, 111, 32, 112, 114, 101, 99, 110, 111, 32, 114, 101, 115, 110, 111, 32, 108, 97, 121, 110, 111, 32, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 104, 95, 112, 111, 115, 32, 101, 110, 100, 95, 112, 111, 115, 0
	], "i8", k);
	sh = h([37, 56, 101, 10, 0], "i8", k);
	th = h([37, 46, 56, 101, 10, 0], "i8", k);
	uh = h([10, 77, 65, 82, 75, 69, 82, 32, 76, 73, 83, 84, 10, 0], "i8", k);
	vh = h([116, 121, 112, 101, 9, 115, 116, 97, 114, 116, 95, 112, 111, 115, 32, 32, 32, 32, 108, 101, 110, 103, 116, 104, 10, 0], "i8", k);
	wh = h([37, 88, 9, 37, 57, 100, 32, 37, 57, 100, 10, 0], "i8", k);
	xh =
		h([71, 101, 110, 101, 114, 97, 116, 101, 100, 32, 105, 110, 100, 101, 120, 32, 102, 105, 108, 101, 32, 37, 115, 10, 0], "i8", k);
	Ch = h([37, 115, 58, 37, 100, 58, 99, 111, 108, 111, 114, 95, 115, 121, 99, 99, 95, 116, 111, 95, 114, 103, 98, 10, 9, 67, 65, 78, 32, 78, 79, 84, 32, 67, 79, 78, 86, 69, 82, 84, 10, 0], "i8", k);
	Dh = h([47, 104, 111, 109, 101, 47, 97, 108, 111, 110, 47, 68, 101, 118, 47, 106, 50, 107, 46, 106, 115, 47, 99, 111, 109, 109, 111, 110, 47, 99, 111, 108, 111, 114, 46, 99, 0], "i8", k);
	wb = h([1], ["i32", 0, 0, 0, 0], k);
	J = h([1], ["i32", 0, 0, 0, 0], k);
	ci = h(1, "i8*", k);
	di = h(1, "i8", k);
	h(1, "i32", k);
	vb =
		h(1, "i32", k);
	h([37, 115, 58, 32, 105, 108, 108, 101, 103, 97, 108, 32, 111, 112, 116, 105, 111, 110, 32, 45, 45, 32, 37, 99, 10, 0], "i8", k);
	aa = h(1, "i8*", k);
	h([37, 115, 58, 32, 111, 112, 116, 105, 111, 110, 32, 114, 101, 113, 117, 105, 114, 101, 115, 32, 97, 110, 32, 97, 114, 103, 117, 109, 101, 110, 116, 32, 45, 45, 32, 37, 99, 10, 0], "i8", k);
	Ic = h(1, "i32", k);
	$a = h(1, "i32", k);
	Fh = h([37, 115, 58, 32, 111, 112, 116, 105, 111, 110, 32, 100, 111, 101, 115, 32, 110, 111, 116, 32, 114, 101, 113, 117, 105, 114, 101, 32, 97, 110, 32, 97, 114, 103, 117, 109, 101, 110, 116, 46, 32, 73, 103, 110, 111, 114, 105, 110, 103,
		32, 37, 115, 10, 0
	], "i8", k);
	Ob = h([37, 115, 58, 32, 111, 112, 116, 105, 111, 110, 32, 114, 101, 113, 117, 105, 114, 101, 115, 32, 97, 110, 32, 97, 114, 103, 117, 109, 101, 110, 116, 10, 0], "i8", k);
	Gh = h([37, 115, 58, 32, 111, 112, 116, 105, 111, 110, 32, 114, 101, 113, 117, 105, 114, 101, 115, 32, 97, 110, 32, 97, 114, 103, 117, 109, 101, 110, 116, 32, 10, 0], "i8", k);
	Jc = h([73, 110, 118, 97, 108, 105, 100, 32, 111, 112, 116, 105, 111, 110, 32, 37, 115, 10, 0], "i8", k);
	Eh = h([73, 110, 118, 97, 108, 105, 100, 32, 111, 112, 116, 105, 111, 110, 10, 0], "i8", k);
	a[i + 8 >> 2] = i + 32;
	a[i + 12 >> 2] = i + 48;
	a[i + 24 >> 2] = i + 48;
	a[i + 28 >> 2] = i + 32;
	a[i + 40 >> 2] = i + 64;
	a[i + 44 >> 2] = i + 192;
	a[i + 56 >> 2] = i + 80;
	a[i + 60 >> 2] = i + 208;
	a[i + 72 >> 2] = i + 96;
	a[i + 76 >> 2] = i + 288;
	a[i + 88 >> 2] = i + 112;
	a[i + 92 >> 2] = i + 304;
	a[i + 104 >> 2] = i + 128;
	a[i + 108 >> 2] = i + 384;
	a[i + 120 >> 2] = i + 144;
	a[i + 124 >> 2] = i + 400;
	a[i + 136 >> 2] = i + 160;
	a[i + 140 >> 2] = i + 928;
	a[i + 152 >> 2] = i + 176;
	a[i + 156 >> 2] = i + 944;
	a[i + 168 >> 2] = i + 1216;
	a[i + 172 >> 2] = i + 1056;
	a[i + 184 >> 2] = i + 1232;
	a[i + 188 >> 2] = i + 1072;
	a[i + 200 >> 2] = i + 224;
	a[i + 204 >> 2] = i + 208;
	a[i + 216 >> 2] = i + 240;
	a[i + 220 >> 2] = i + 192;
	a[i + 232 >> 2] = i + 256;
	a[i + 236 >> 2] = i + 448;
	a[i + 248 >> 2] = i + 272;
	a[i + 252 >>
		2] = i + 464;
	a[i + 264 >> 2] = i + 288;
	a[i + 268 >> 2] = i + 448;
	a[i + 280 >> 2] = i + 304;
	a[i + 284 >> 2] = i + 464;
	a[i + 296 >> 2] = i + 320;
	a[i + 300 >> 2] = i + 448;
	a[i + 312 >> 2] = i + 336;
	a[i + 316 >> 2] = i + 464;
	a[i + 328 >> 2] = i + 352;
	a[i + 332 >> 2] = i + 544;
	a[i + 344 >> 2] = i + 368;
	a[i + 348 >> 2] = i + 560;
	a[i + 360 >> 2] = i + 384;
	a[i + 364 >> 2] = i + 576;
	a[i + 376 >> 2] = i + 400;
	a[i + 380 >> 2] = i + 592;
	a[i + 392 >> 2] = i + 416;
	a[i + 396 >> 2] = i + 640;
	a[i + 408 >> 2] = i + 432;
	a[i + 412 >> 2] = i + 656;
	a[i + 424 >> 2] = i + 928;
	a[i + 428 >> 2] = i + 672;
	a[i + 440 >> 2] = i + 944;
	a[i + 444 >> 2] = i + 688;
	a[i + 456 >> 2] = i + 480;
	a[i + 460 >> 2] = i + 464;
	a[i + 472 >> 2] = i + 496;
	a[i + 476 >>
		2] = i + 448;
	a[i + 488 >> 2] = i + 512;
	a[i + 492 >> 2] = i + 448;
	a[i + 504 >> 2] = i + 528;
	a[i + 508 >> 2] = i + 464;
	a[i + 520 >> 2] = i + 544;
	a[i + 524 >> 2] = i + 480;
	a[i + 536 >> 2] = i + 560;
	a[i + 540 >> 2] = i + 496;
	a[i + 552 >> 2] = i + 576;
	a[i + 556 >> 2] = i + 512;
	a[i + 568 >> 2] = i + 592;
	a[i + 572 >> 2] = i + 528;
	a[i + 584 >> 2] = i + 608;
	a[i + 588 >> 2] = i + 544;
	a[i + 600 >> 2] = i + 624;
	a[i + 604 >> 2] = i + 560;
	a[i + 616 >> 2] = i + 640;
	a[i + 620 >> 2] = i + 576;
	a[i + 632 >> 2] = i + 656;
	a[i + 636 >> 2] = i + 592;
	a[i + 648 >> 2] = i + 672;
	a[i + 652 >> 2] = i + 608;
	a[i + 664 >> 2] = i + 688;
	a[i + 668 >> 2] = i + 624;
	a[i + 680 >> 2] = i + 704;
	a[i + 684 >> 2] = i + 608;
	a[i + 696 >> 2] = i + 720;
	a[i + 700 >>
		2] = i + 624;
	a[i + 712 >> 2] = i + 736;
	a[i + 716 >> 2] = i + 640;
	a[i + 728 >> 2] = i + 752;
	a[i + 732 >> 2] = i + 656;
	a[i + 744 >> 2] = i + 768;
	a[i + 748 >> 2] = i + 672;
	a[i + 760 >> 2] = i + 784;
	a[i + 764 >> 2] = i + 688;
	a[i + 776 >> 2] = i + 800;
	a[i + 780 >> 2] = i + 704;
	a[i + 792 >> 2] = i + 816;
	a[i + 796 >> 2] = i + 720;
	a[i + 808 >> 2] = i + 832;
	a[i + 812 >> 2] = i + 736;
	a[i + 824 >> 2] = i + 848;
	a[i + 828 >> 2] = i + 752;
	a[i + 840 >> 2] = i + 864;
	a[i + 844 >> 2] = i + 768;
	a[i + 856 >> 2] = i + 880;
	a[i + 860 >> 2] = i + 784;
	a[i + 872 >> 2] = i + 896;
	a[i + 876 >> 2] = i + 800;
	a[i + 888 >> 2] = i + 912;
	a[i + 892 >> 2] = i + 816;
	a[i + 904 >> 2] = i + 928;
	a[i + 908 >> 2] = i + 832;
	a[i + 920 >> 2] = i + 944;
	a[i + 924 >>
		2] = i + 848;
	a[i + 936 >> 2] = i + 960;
	a[i + 940 >> 2] = i + 864;
	a[i + 952 >> 2] = i + 976;
	a[i + 956 >> 2] = i + 880;
	a[i + 968 >> 2] = i + 992;
	a[i + 972 >> 2] = i + 896;
	a[i + 984 >> 2] = i + 1008;
	a[i + 988 >> 2] = i + 912;
	a[i + 1E3 >> 2] = i + 1024;
	a[i + 1004 >> 2] = i + 928;
	a[i + 1016 >> 2] = i + 1040;
	a[i + 1020 >> 2] = i + 944;
	a[i + 1032 >> 2] = i + 1056;
	a[i + 1036 >> 2] = i + 960;
	a[i + 1048 >> 2] = i + 1072;
	a[i + 1052 >> 2] = i + 976;
	a[i + 1064 >> 2] = i + 1088;
	a[i + 1068 >> 2] = i + 992;
	a[i + 1080 >> 2] = i + 1104;
	a[i + 1084 >> 2] = i + 1008;
	a[i + 1096 >> 2] = i + 1120;
	a[i + 1100 >> 2] = i + 1024;
	a[i + 1112 >> 2] = i + 1136;
	a[i + 1116 >> 2] = i + 1040;
	a[i + 1128 >> 2] = i + 1152;
	a[i + 1132 >> 2] =
		i + 1056;
	a[i + 1144 >> 2] = i + 1168;
	a[i + 1148 >> 2] = i + 1072;
	a[i + 1160 >> 2] = i + 1184;
	a[i + 1164 >> 2] = i + 1088;
	a[i + 1176 >> 2] = i + 1200;
	a[i + 1180 >> 2] = i + 1104;
	a[i + 1192 >> 2] = i + 1216;
	a[i + 1196 >> 2] = i + 1120;
	a[i + 1208 >> 2] = i + 1232;
	a[i + 1212 >> 2] = i + 1136;
	a[i + 1224 >> 2] = i + 1248;
	a[i + 1228 >> 2] = i + 1152;
	a[i + 1240 >> 2] = i + 1264;
	a[i + 1244 >> 2] = i + 1168;
	a[i + 1256 >> 2] = i + 1280;
	a[i + 1260 >> 2] = i + 1184;
	a[i + 1272 >> 2] = i + 1296;
	a[i + 1276 >> 2] = i + 1200;
	a[i + 1288 >> 2] = i + 1312;
	a[i + 1292 >> 2] = i + 1216;
	a[i + 1304 >> 2] = i + 1328;
	a[i + 1308 >> 2] = i + 1232;
	a[i + 1320 >> 2] = i + 1344;
	a[i + 1324 >> 2] = i + 1248;
	a[i + 1336 >> 2] = i +
		1360;
	a[i + 1340 >> 2] = i + 1264;
	a[i + 1352 >> 2] = i + 1376;
	a[i + 1356 >> 2] = i + 1280;
	a[i + 1368 >> 2] = i + 1392;
	a[i + 1372 >> 2] = i + 1296;
	a[i + 1384 >> 2] = i + 1408;
	a[i + 1388 >> 2] = i + 1312;
	a[i + 1400 >> 2] = i + 1424;
	a[i + 1404 >> 2] = i + 1328;
	a[i + 1416 >> 2] = i + 1440;
	a[i + 1420 >> 2] = i + 1344;
	a[i + 1432 >> 2] = i + 1456;
	a[i + 1436 >> 2] = i + 1360;
	a[i + 1448 >> 2] = i + 1440;
	a[i + 1452 >> 2] = i + 1376;
	a[i + 1464 >> 2] = i + 1456;
	a[i + 1468 >> 2] = i + 1392;
	a[i + 1480 >> 2] = i + 1472;
	a[i + 1484 >> 2] = i + 1472;
	a[i + 1496 >> 2] = i + 1488;
	a[i + 1500 >> 2] = i + 1488;
	a[ca >> 2] = sc;
	a[ca + 4 >> 2] = Qh;
	a[ca + 8 >> 2] = Rh;
	a[ca + 12 >> 2] = tc;
	a[ca + 16 >> 2] = uc;
	a[ca + 20 >>
		2] = vc;
	a[ca + 24 >> 2] = Hb;
	a[ca + 28 >> 2] = Sh;
	a[ca + 32 >> 2] = wc;
	a[ca + 36 >> 2] = Th;
	a[ca + 40 >> 2] = Uh;
	a[ca + 44 >> 2] = Vh;
	a[ca + 48 >> 2] = Wh;
	a[ca + 52 >> 2] = Xh;
	a[Gb >> 2] = Yh;
	a[Gb + 16 >> 2] = Zh;
	a[ci >> 2] = di;
	za = [0, 0, function (c) {
		fd(a[c >> 2], a[c + 4 >> 2], a[c + 8 >> 2], a[c + 12 >> 2])
	}, 0, function (a, d) {
		o(d, $h, h([a, 0, 0, 0], ["i8*", 0, 0, 0], n))
	}, 0, function (a, d) {
		o(d, ai, h([a, 0, 0, 0], ["i8*", 0, 0, 0], n))
	}, 0, function (c) {
		o(a[a[x >> 2] + 8 >> 2], bi, h([c, 0, 0, 0], ["i8*", 0, 0, 0], n))
	}, 0, function (c) {
		a[c + 4 >> 2] = 2;
		if (((a[c + 68 >> 2] | 0) != 0 ? 1 : 2) == 1) a[a[c + 68 >> 2] + 76 >> 2] = R(a[c + 72 >> 2]) - 2, a[a[c +
			68 >> 2] + 84 >> 2] = Ha(a[c + 72 >> 2]) + 2 - a[a[c + 68 >> 2] + 76 >> 2]
	}, 0, gd, 0, hd, 0, kb, 0, md, 0, od, 0, pd, 0, qd, 0, function (c) {
		var d, e, b, f, g;
		f = a[c + 72 >> 2];
		g = a[c + 60 >> 2];
		d = r(f, 2);
		b = R(f);
		e = 0;
		a: for (;;) {
			if (!((e | 0) < (a[g + 16 >> 2] | 0))) break a;
			ya(f, b);
			ic(c, e, d - 2);
			e += 1
		}
	}, 0, function (c) {
		var d, e, b;
		e = a[a[c + 60 >> 2] + 16 >> 2];
		b = a[c + 72 >> 2];
		d = r(b, 2);
		b = r(b, (e | 0) <= 256 ? 1 : 2);
		ic(c, b, d - 2 - ((e | 0) <= 256 ? 1 : 2))
	}, 0, rd, 0, sd, 0, td, 0, function (c) {
		var d, c = a[c + 72 >> 2];
		d = r(c, 2);
		r(c, 1);
		d -= 3;
		a: for (;;) {
			if (!((d | 0) > 0)) break a;
			r(c, 1);
			d -= 1
		}
	}, 0, ud, 0, vd, 0, function (c) {
		var d, e;
		d =
			a[c + 72 >> 2];
		e = a[a[c + 60 >> 2] + 16 >> 2];
		r(d, 2);
		c = 0;
		a: for (;;) {
			if (!((c | 0) < (e | 0))) break a;
			r(d, 2);
			r(d, 2);
			c += 1
		}
	}, 0, function (c) {
		var c = a[c + 72 >> 2],
			d = r(c, 2);
		ra(c, d - 2)
	}, 0, function (c) {
		F(a[c >> 2], 2, Ph, h(1, "i32", n))
	}, 0];
	G.FUNCTION_TABLE = za;
	G.run = Lc;
	try {
		s.V = Y
	} catch (zi) {}
	G.noInitialRun = I;
	if (!G.noInitialRun) var xi = Lc();
	D(xb == "jp2" || xb == "j2k", "You must specify the suffix as a second parameter. Is this a .j2k or a .jp2 file?");
	s.o();
	s.root.write = I;
	s.N("/", "image." + xb, ei, I, Y);
	Lc(["-i", "image." + xb, "-o", "image.raw"]);
	return xi = {
		width: Xb(Ac, "i32"),
		height: Xb(Bc, "i32"),
		data: s.root.b["image.raw"].b
	}
};