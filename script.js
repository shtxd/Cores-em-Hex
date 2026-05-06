// Guarda a cor atual do site em HSL (Matiz, Saturação e Luminosidade)
let state = { h: 204, s: 70, l: 53 };

// Mapeia os elementos HTML para podermos usá-los no JavaScript
const els = {
    preview: document.getElementById('colorPreview'),
    btnRandom: document.getElementById('btnRandom'),
    btnFavorite: document.getElementById('btnFavorite'),
    favoritesGrid: document.getElementById('favoritesGrid'),
    btnClearFavorites: document.getElementById('btnClearFavorites'),
    btnExportFavorites: document.getElementById('btnExportFavorites'),
    emptyFavoritesMsg: document.getElementById('emptyFavoritesMsg'),
    daltonismSelect: document.getElementById('daltonismSelect'),
    themeToggle: document.getElementById('themeToggle'),
    nativePicker: document.getElementById('nativePicker'),
    hueSlider: document.getElementById('hueSlider'),
    satSlider: document.getElementById('satSlider'),
    litSlider: document.getElementById('litSlider'),
    hueVal: document.getElementById('hueVal'),
    satVal: document.getElementById('satVal'),
    litVal: document.getElementById('litVal'),
    hexInput: document.getElementById('hexInput'),
    rgbInput: document.getElementById('rgbInput'),
    hslInput: document.getElementById('hslInput'),
    oklchInput: document.getElementById('oklchInput'),
    nameInput: document.getElementById('nameInput'),
    palettes: {
        comp: document.getElementById('paletteComp'),
        analog: document.getElementById('paletteAnalog'),
        triad: document.getElementById('paletteTriad')
    },
    toast: document.getElementById('toastMsg'),
    colorChart: document.getElementById('colorChart')
};

// Dicionário Oficial de Cores HTML (140 cores padrão traduzidas para PT-BR)
const htmlColors = {
    "azul alice":"#F0F8FF","branco antigo":"#FAEBD7","água":"#00FFFF","água-marinha":"#7FFFD4","azul celeste":"#F0FFFF",
    "bege":"#F5F5DC","bisque":"#FFE4C4","preto":"#000000","amêndoa branqueada":"#FFEBCD","azul":"#0000FF",
    "azul violeta":"#8A2BE2","marrom":"#A52A2A","madeira sólida":"#DEB887","azul cadete":"#5F9EA0","chartreuse":"#7FFF00",
    "chocolate":"#D2691E","coral":"#FF7F50","azul centáurea":"#6495ED","seda de milho":"#FFF8DC","carmesim":"#DC143C",
    "ciano":"#00FFFF","azul escuro":"#00008B","ciano escuro":"#008B8B","vara de ouro escura":"#B8860B","cinza escuro":"#A9A9A9",
    "verde escuro":"#006400","cáqui escuro":"#BDB76B","magenta escuro":"#8B008B","verde oliva escuro":"#556B2F","laranja escuro":"#FF8C00",
    "orquídea escura":"#9932CC","vermelho escuro":"#8B0000","salmão escuro":"#E9967A","verde mar escuro":"#8FBC8F","azul ardósia escuro":"#483D8B",
    "cinza ardósia escuro":"#2F4F4F","turquesa escura":"#00CED1","violeta escuro":"#9400D3","rosa profundo":"#FF1493","azul céu profundo":"#00BFFF",
    "cinza fosco":"#696969","azul dodger":"#1E90FF","tijolo de fogo":"#B22222","branco floral":"#FFFAF0","verde floresta":"#228B22",
    "fúcsia":"#FF00FF","gainsboro":"#DCDCDC","branco fantasma":"#F8F8FF","ouro":"#FFD700","vara de ouro":"#DAA520",
    "cinza":"#808080","verde":"#008000","verde amarelado":"#ADFF2F","melão":"#F0FFF0","rosa choque":"#FF69B4",
    "vermelho indiano":"#CD5C5C","índigo":"#4B0082","marfim":"#FFFFF0","cáqui":"#F0E68C","lavanda":"#E6E6FA",
    "blush de lavanda":"#FFF0F5","verde grama":"#7CFC00","chiffon de limão":"#FFFACD","azul claro":"#ADD8E6","coral claro":"#F08080",
    "ciano claro":"#E0FFFF","amarelo vara de ouro claro":"#FAFAD2","cinza claro":"#D3D3D3","verde claro":"#90EE90","rosa claro":"#FFB6C1",
    "salmão claro":"#FFA07A","verde mar claro":"#20B2AA","azul céu claro":"#87CEFA","cinza ardósia claro":"#778899","azul aço claro":"#B0C4DE",
    "amarelo claro":"#FFFFE0","lima":"#00FF00","verde limão":"#32CD32","linho":"#FAF0E6","magenta":"#FF00FF",
    "bordô":"#800000","água-marinha médio":"#66CDAA","azul médio":"#0000CD","orquídea média":"#BA55D3","roxo médio":"#9370DB",
    "verde mar médio":"#3CB371","azul ardósia médio":"#7B68EE","verde primavera médio":"#00FA9A","turquesa média":"#48D1CC",
    "vermelho violeta médio":"#C71585","azul meia-noite":"#191970","creme de menta":"#F5FFFA","rosa névoa":"#FFE4E1","mocassim":"#FFE4B5",
    "branco navajo":"#FFDEAD","marinho":"#000080","renda antiga":"#FDF5E6","oliva":"#808000","verde oliva pardo":"#6B8E23",
    "laranja":"#FFA500","vermelho alaranjado":"#FF4500","orquídea":"#DA70D6","vara de ouro pálida":"#EEE8AA","verde pálido":"#98FB98",
    "turquesa pálida":"#AFEEEE","vermelho violeta pálido":"#DB7093","creme de mamão":"#FFEFD5","puff de pêssego":"#FFDAB9","peru":"#CD853F",
    "rosa":"#FFC0CB","ameixa":"#DDA0DD","azul pólvora":"#B0E0E6","roxo":"#800080","roxo rebecca":"#663399",
    "vermelho":"#FF0000","marrom rosado":"#BC8F8F","azul royal":"#4169E1","marrom sela":"#8B4513","salmão":"#FA8072",
    "marrom areia":"#F4A460","verde mar":"#2E8B57","concha":"#FFF5EE","siena":"#A0522D","prata":"#C0C0C0",
    "azul céu":"#87CEEB","azul ardósia":"#6A5ACD","cinza ardósia":"#708090","neve":"#FFFAFA","verde primavera":"#00FF7F",
    "azul aço":"#4682B4","bronzeado":"#D2B48C","verde-azulado":"#008080","cardo":"#D8BFD8","tomate":"#FF6347",
    "turquesa":"#40E0D0","violeta":"#EE82EE","trigo":"#F5DEB3","branco":"#FFFFFF","fumaça branca":"#F5F5F5",
    "amarelo":"#FFFF00","amarelo esverdeado":"#9ACD32"
};

// --- Classes de POO ---

// 1. Classe com métodos estáticos atuando como serviço conversor matemático
class ColorConverter {
    static hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
    }

    static rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    static hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        const num = parseInt(hex, 16);
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }

    static rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Acromático
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    static srgbToLinear(val) {
        let v = val / 255;
        return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }

    static linearToSrgb(val) {
        let v = Math.abs(val);
        let res = v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v;
        return val < 0 ? -res : res;
    }

    static rgbToOklch(r, g, b) {
        let rL = this.srgbToLinear(r), gL = this.srgbToLinear(g), bL = this.srgbToLinear(b);
        let lms0 = 0.4122214708 * rL + 0.5363325363 * gL + 0.0514459929 * bL;
        let lms1 = 0.2119034982 * rL + 0.6806995451 * gL + 0.1073969566 * bL;
        let lms2 = 0.0883024619 * rL + 0.2817188376 * gL + 0.6299787005 * bL;
        let l_ = Math.cbrt(lms0), m_ = Math.cbrt(lms1), s_ = Math.cbrt(lms2);
        let l = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
        let a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
        let b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
        let c = Math.sqrt(a * a + b_ * b_);
        let h = Math.atan2(b_, a) * (180 / Math.PI);
        if (h < 0) h += 360;
        return { l: Number(l.toFixed(3)), c: Number(c.toFixed(3)), h: Number(h.toFixed(1)) };
    }

    static oklchToRgb(l, c, h) {
        let hRad = h * (Math.PI / 180);
        let a = c * Math.cos(hRad);
        let b_ = c * Math.sin(hRad);
        let l_ = l + 0.3963377774 * a + 0.2158037573 * b_;
        let m_ = l - 0.1055613458 * a - 0.0638541728 * b_;
        let s_ = l - 0.0894841775 * a - 1.2914855480 * b_;
        let lms0 = l_ * l_ * l_, lms1 = m_ * m_ * m_, lms2 = s_ * s_ * s_;
        let rL = +4.0767416621 * lms0 - 3.3077115913 * lms1 + 0.2309699292 * lms2;
        let gL = -1.2684380046 * lms0 + 2.6097574011 * lms1 - 0.3413193965 * lms2;
        let bL = -0.0041960863 * lms0 - 0.7034186147 * lms1 + 1.7076147010 * lms2;
        let r = Math.round(Math.max(0, Math.min(255, this.linearToSrgb(rL) * 255)));
        let g = Math.round(Math.max(0, Math.min(255, this.linearToSrgb(gL) * 255)));
        let b = Math.round(Math.max(0, Math.min(255, this.linearToSrgb(bL) * 255)));
        return { r, g, b };
    }
}

// 2. Classe para gerenciar a persistência de estado dos Favoritos
class FavoritesManager {
    constructor(storageKey = 'favoriteColors') {
        this.storageKey = storageKey;
        this.colors = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    toggle(hex) {
        if (this.has(hex)) {
            this.colors = this.colors.filter(c => c !== hex);
        } else {
            this.colors.push(hex);
        }
        this.save();
    }

    clear() {
        this.colors = [];
        this.save();
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.colors));
    }

    has(hex) { return this.colors.includes(hex); }
    get all() { return this.colors; }
    get isEmpty() { return this.colors.length === 0; }
}

// 3. Classe Principal da Aplicação (App Controller)
class ColorApp {
    constructor() {
        this.state = { h: 204, s: 70, l: 53 };
        this.favorites = new FavoritesManager();
        this.toastTimeout = null;

        // Expõe a função de cópia globalmente para os botões do HTML que usam `onclick`
        window.copyToClipboard = (inputId) => this.copyToClipboard(inputId);

        this.initTheme();
        this.buildColorChart();
        this.bindEvents();
        
        this.renderFavorites();
        this.updateUI();
    }

    // --- Geração de Paletas ---
    generatePalettes() {
        const { h, s, l } = this.state;
        const normHue = (hue) => (hue + 360) % 360;

        this.renderSwatch(els.palettes.comp, [h, normHue(h + 180)]);
        this.renderSwatch(els.palettes.analog, [normHue(h - 30), h, normHue(h + 30)]);
        this.renderSwatch(els.palettes.triad, [h, normHue(h + 120), normHue(h + 240)]);
    }

    renderSwatch(container, hues) {
        container.innerHTML = '';
        hues.forEach(hue => {
            const rgb = ColorConverter.hslToRgb(hue, this.state.s, this.state.l);
            const hex = ColorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);
            
            const div = document.createElement('div');
            div.className = 'swatch';
            div.style.backgroundColor = hex;
            div.innerText = hex;
            div.title = "Clique para aplicar esta cor";
            
            div.onclick = () => this.updateFromHsl(hue, this.state.s, this.state.l);
            container.appendChild(div);
        });
    }

    // --- Atualização da Interface ---
    updateUI(source = null) {
        const rgb = ColorConverter.hslToRgb(this.state.h, this.state.s, this.state.l);
        const hex = ColorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);

        els.preview.style.backgroundColor = hex;
        els.nativePicker.value = hex;
        
        if (source !== 'sliders') {
            els.hueSlider.value = this.state.h;
            els.satSlider.value = this.state.s;
            els.litSlider.value = this.state.l;
        }
        els.hueVal.innerText = `${this.state.h}°`;
        els.satVal.innerText = `${this.state.s}%`;
        els.litVal.innerText = `${this.state.l}%`;

        if (source !== 'hex') els.hexInput.value = hex;
        if (source !== 'rgb') els.rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        if (source !== 'hsl') els.hslInput.value = `${this.state.h}, ${this.state.s}%, ${this.state.l}%`;

        const oklch = ColorConverter.rgbToOklch(rgb.r, rgb.g, rgb.b);
        if (source !== 'oklch') els.oklchInput.value = `${oklch.l}, ${oklch.c}, ${oklch.h}`;

        const exactName = Object.keys(htmlColors).find(key => htmlColors[key] === hex);
        if (source !== 'name') els.nameInput.value = exactName ? exactName : 'Sem nome exato';

        ['hexInput', 'rgbInput', 'hslInput', 'oklchInput', 'nameInput'].forEach(id => els[id].classList.remove('error'));

        const isFav = this.favorites.has(hex);
        els.btnFavorite.classList.toggle('active', isFav);
        els.btnFavorite.innerText = isFav ? '⭐ Favoritada' : '⭐ Favoritar';

        this.generatePalettes();
    }

    updateFromHsl(h, s, l, source = null) {
        this.state = { h, s, l };
        this.updateUI(source);
    }

    updateFromRgb(r, g, b, source = null) {
        this.state = ColorConverter.rgbToHsl(r, g, b);
        this.updateUI(source);
    }

    updateFromHex(hexStr, source = null) {
        const rgb = ColorConverter.hexToRgb(hexStr);
        if (rgb) this.updateFromRgb(rgb.r, rgb.g, rgb.b, source);
    }

    // --- Sistema de Favoritos ---
    renderFavorites() {
        els.favoritesGrid.innerHTML = '';
        
        const isEmpty = this.favorites.isEmpty;
        els.emptyFavoritesMsg.style.display = isEmpty ? 'block' : 'none';
        els.btnClearFavorites.style.display = isEmpty ? 'none' : 'block';
        els.btnExportFavorites.style.display = isEmpty ? 'none' : 'block';
        
        if (!isEmpty) {
            this.favorites.all.forEach(hex => {
                const div = document.createElement('div');
                div.className = 'chart-swatch';
                div.style.backgroundColor = hex;
                div.innerText = hex;
                div.title = `Aplicar ${hex} (Botão direito para remover)`;
                
                div.onclick = () => this.updateFromHex(hex);
                div.oncontextmenu = (e) => {
                    e.preventDefault();
                    this.toggleFavorite(hex);
                };
                
                els.favoritesGrid.appendChild(div);
            });
        }
    }

    toggleFavorite(hexStr) {
        this.favorites.toggle(hexStr);
        this.renderFavorites();
        this.updateUI();
    }

    exportFavoritesImage() {
        if (this.favorites.isEmpty) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const cols = 5; 
        const tileSize = 120;
        const padding = 20;
        const headerHeight = 60;
        const rows = Math.ceil(this.favorites.all.length / cols);

        canvas.width = cols * tileSize + (padding * 2);
        canvas.height = rows * tileSize + headerHeight + (padding * 2);

        const isDark = document.body.classList.contains('dark-mode');

        ctx.fillStyle = isDark ? '#1a202c' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = isDark ? '#f7fafc' : '#2d3748';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Minhas Cores Favoritas', padding, padding + 30);

        this.favorites.all.forEach((hex, i) => {
            const x = padding + (i % cols) * tileSize;
            const y = headerHeight + padding + Math.floor(i / cols) * tileSize;

            ctx.fillStyle = hex;
            if (ctx.roundRect) {
                ctx.beginPath();
                ctx.roundRect(x + 10, y + 10, tileSize - 20, tileSize - 40, 8);
                ctx.fill();
            } else {
                ctx.fillRect(x + 10, y + 10, tileSize - 20, tileSize - 40);
            }

            ctx.fillStyle = isDark ? '#a0aec0' : '#718096';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(hex, x + tileSize / 2, y + tileSize - 10);
        });

        const link = document.createElement('a');
        link.download = 'minhas-cores-favoritas.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // --- Toast / ClipBoard API ---
    copyToClipboard(inputId) {
        const inputEl = document.getElementById(inputId);
        const text = inputEl.value;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => this.showToast(`Copiado: ${text}`));
        } else {
            inputEl.select();
            document.execCommand('copy');
            this.showToast(`Copiado: ${text}`);
        }
    }

    showToast(msg) {
        els.toast.innerText = msg;
        els.toast.classList.add('show');
        
        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            els.toast.classList.remove('show');
        }, 2500);
    }

    // --- Inicialização de Interface ---
    initTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            els.themeToggle.innerText = '☀️ Light Mode';
        }
    }

    buildColorChart() {
        Object.keys(htmlColors).forEach(name => {
            const hex = htmlColors[name];
            const div = document.createElement('div');
            div.className = 'chart-swatch';
            div.style.backgroundColor = hex;
            div.innerText = name;
            div.title = `Aplicar ${name} (${hex})`;
            div.onclick = () => this.updateFromHex(hex);
            
            els.colorChart.appendChild(div);
        });
    }

    // --- Método auxiliar para enxugar a repetição dos Inputs ---
    bindInput(element, validatorFn) {
        element.addEventListener('input', (e) => {
            if (!validatorFn(e.target.value)) {
                e.target.classList.add('error');
            }
        });
    }

    // --- Escuta de Eventos do Usuário ---
    bindEvents() {
        els.btnRandom.addEventListener('click', () => {
            const randomH = Math.floor(Math.random() * 360);
            const randomS = Math.floor(Math.random() * 61) + 20; 
            const randomL = Math.floor(Math.random() * 61) + 20; 
            this.updateFromHsl(randomH, randomS, randomL);
        });

        els.btnFavorite.addEventListener('click', () => {
            const rgb = ColorConverter.hslToRgb(this.state.h, this.state.s, this.state.l);
            const hex = ColorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);
            this.toggleFavorite(hex);
        });

        els.btnClearFavorites.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja remover todas as cores favoritas?')) {
                this.favorites.clear();
                this.renderFavorites();
                this.updateUI();
            }
        });

        els.btnExportFavorites.addEventListener('click', () => this.exportFavoritesImage());

        [els.hueSlider, els.satSlider, els.litSlider].forEach(slider => {
            slider.addEventListener('input', () => {
                this.updateFromHsl(
                    parseInt(els.hueSlider.value),
                    parseInt(els.satSlider.value),
                    parseInt(els.litSlider.value),
                    'sliders'
                );
            });
        });

        els.nativePicker.addEventListener('input', (e) => this.updateFromHex(e.target.value));

        const parseNums = (val, regex = /\d+/g) => (val.match(regex) || []).map(Number);
        const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

        this.bindInput(els.hexInput, (val) => {
            if (!/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(val)) return false;
            this.updateFromHex(val, 'hex');
            return true;
        });

        this.bindInput(els.rgbInput, (val) => {
            const n = parseNums(val);
            if (n.length < 3) return false;
            this.updateFromRgb(clamp(n[0], 0, 255), clamp(n[1], 0, 255), clamp(n[2], 0, 255), 'rgb');
            return true;
        });

        this.bindInput(els.hslInput, (val) => {
            const n = parseNums(val);
            if (n.length < 3) return false;
            this.updateFromHsl(clamp(n[0], 0, 360), clamp(n[1], 0, 100), clamp(n[2], 0, 100), 'hsl');
            return true;
        });

        this.bindInput(els.oklchInput, (val) => {
            const n = parseNums(val, /[\d.]+/g);
            if (n.length < 3) return false;
            const rgb = ColorConverter.oklchToRgb(n[0], n[1], n[2]);
            this.updateFromRgb(rgb.r, rgb.g, rgb.b, 'oklch');
            return true;
        });

        this.bindInput(els.nameInput, (val) => {
            const name = val.toLowerCase().trim();
            if (!htmlColors[name]) return false;
            this.updateFromHex(htmlColors[name], 'name');
            return true;
        });

        els.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            els.themeToggle.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        els.daltonismSelect.addEventListener('change', (e) => {
            document.body.classList.remove('daltonism-protanopia', 'daltonism-deuteranopia', 'daltonism-tritanopia', 'daltonism-achromatopsia');
            if (e.target.value !== 'none') {
                document.body.classList.add(`daltonism-${e.target.value}`);
            }
        });
    }
}

// Inicializa a aplicação
const app = new ColorApp();