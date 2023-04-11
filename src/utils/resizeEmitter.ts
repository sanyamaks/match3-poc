import EventEmitter from "eventemitter3";

// Создайте новый EventEmitter
const resizeEmitter = new EventEmitter();

// Определите функцию обратного вызова для изменения размера окна
function onResize() {
    // Получите новые размеры окна
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Уведомите все элементы о том, что размеры изменились
    resizeEmitter.emit("resize", width, height);
}

// Добавьте слушатель события изменения размера окна
window.addEventListener("resize", onResize);

// Экспортируйте EventEmitter, чтобы его можно было использовать в других модулях
export default resizeEmitter;
