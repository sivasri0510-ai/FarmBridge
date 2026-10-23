/** Escape user input before embedding it in a RegExp (prevents regex injection / ReDoS). */
module.exports = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
