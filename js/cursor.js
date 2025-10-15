var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) {}
  return '';
};

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.wordIndex = 0;
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }

    var el = document.getElementsByTagName('*');
    for (let i = 0; i < el.length; i++)
      if (getStyle(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML);

    document.body.appendChild((this.scr = document.createElement("style")));
    // 这里改变鼠标的样式
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='rgba(66, 129, 247, 1)'/></svg>") 4 4, auto}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
    document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
    document.onmousemove = e => {
      if (this.pos.curr == null) this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 };
      this.cursor.classList.remove("hidden");
    };
    document.onmouseenter = e => this.cursor.classList.remove("hidden");
    document.onmouseleave = e => this.cursor.classList.add("hidden");
    document.onmousedown = e => this.cursor.classList.add("active");
    document.onmouseup = e => this.cursor.classList.remove("active");

    // 添加点击事件监听器来触发文字动画
    document.onclick = e => this.createClickText(e.clientX, e.clientY);
  }

  render() {
    if (this.pos.prev) {
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }

  // 新增方法：创建点击文字效果
  createClickText(x, y) {
    const text = document.createElement('div');
    text.className = 'click-text';
    text.textContent = ''; // 可以自定义文字内容
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;

    // 定义词组数组
  const wordGroups = [
    '富强',
    '民主',
    '文明',
    '和谐',
    '自由',
    '平等',
    '公正',
    '法治',
    '爱国',
    '敬业',
    '诚信',
    '友善'
  ];


  // 随机选择一个词组
  // const randomWord = wordGroups[Math.floor(Math.random() * wordGroups.length)];
  // text.className = 'click-text';
  // text.textContent = randomWord; // 使用随机词组
  // text.style.left = `${x}px`;
  // text.style.top = `${y}px`;

// 按顺序选择词组
    const currentWord = wordGroups[this.wordIndex];
    this.wordIndex = (this.wordIndex + 1) % wordGroups.length; // 循环递增索引
    
    text.className = 'click-text';
    text.textContent = currentWord;
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;





    // 添加样式
    Object.assign(text.style, {
      position: 'fixed',
      color: '#4281f7', // 与鼠标颜色一致
      fontSize: '20px',
      fontWeight: 'bold',
      pointerEvents: 'none',
      zIndex: '10087',
      transform: 'translate(-50%, -50%)',
      animation: 'clickTextAnimation 1s forwards'
    });

    document.body.appendChild(text);

    // 动画结束后移除元素
    setTimeout(() => {
      if (text.parentNode) {
        text.parentNode.removeChild(text);
      }
    }, 1000);
  }
}

(() => {
  CURSOR = new Cursor();
})();