function visit(path) {
    path = !!path ? path : '/#';
    browser.get('http://localhost:4000' + path);
}
exports.visit = visit;
