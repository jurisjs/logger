'use strict';
const createLogger = () => {
	const s = [];
	const f = (m, c, cat) => {
		const msg = `${cat ? `[${cat}] ` : ''}${m}${c ? ` ${JSON.stringify(c)}` : ''}`;
		setTimeout(() => s.forEach(sub => sub(msg, cat)), 0);
		return msg;
	};
	return {
		log: { l: f, w: f, e: f, i: f, d: f },
		sub: cb => s.push(cb),
		unsub: cb => s.splice(s.indexOf(cb), 1)
	};
};

if (typeof window !== 'undefined') {
	const { log, sub, unsub } = createLogger();
	window.log = log;
	window.logSub = sub;
	window.logUnsub = unsub;
} else if (typeof global !== 'undefined') {
	const { log, sub, unsub } = createLogger();
	global.log = log;
	global.logSub = sub;
	global.logUnsub = unsub;
} else {
	const { log, sub, unsub } = createLogger();
	module.exports = { log, sub, unsub };
}