// DOM 元素
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const formatBtn = document.getElementById('formatBtn');
const compressBtn = document.getElementById('compressBtn');
const escapeBtn = document.getElementById('escapeBtn');
const unescapeBtn = document.getElementById('unescapeBtn');
const clearBtn = document.getElementById('clearBtn');
const exampleBtn = document.getElementById('exampleBtn');
const validateBtn = document.getElementById('validateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyInputBtn = document.getElementById('copyInputBtn');
const errorMessage = document.getElementById('errorMessage');
const charCount = document.getElementById('charCount');
const lineCount = document.getElementById('lineCount');
const status = document.getElementById('status');
const indentSize = document.getElementById('indentSize');
const fontSize = document.getElementById('fontSize');
const showLineNumbers = document.getElementById('showLineNumbers');
const lineNumbers = document.getElementById('lineNumbers');
const outputLineNumbers = document.getElementById('outputLineNumbers');
const treeViewBtn = document.getElementById('treeViewBtn');
const treeView = document.getElementById('treeView');
const langConvert = document.getElementById('langConvert');
const unicodeBtn = document.getElementById('unicodeBtn');
const unicodeBackBtn = document.getElementById('unicodeBackBtn');
const getParamBtn = document.getElementById('getParamBtn');
const dictJsonBtn = document.getElementById('dictJsonBtn');
const themeToggle = document.getElementById('themeToggle');
const storageDuration = document.getElementById('storageDuration');
const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const langToggle = document.getElementById('langToggle');
const langToggleText = document.getElementById('langToggleText');

// 状态变量
let isTreeViewMode = false;
let currentIndent = 2;
let currentFontSize = 14;
let currentLang = 'zh'; // 'zh' 或 'en'

// 语言包
const translations = {
    zh: {
        title: 'JSON 在线解析工具',
        subtitle: '快速解析、格式化、验证和转换 JSON 数据 - 支持JSON转XML、JSON转YAML、树形编辑、编程语言转换等功能',
        'btn.format': '格式化',
        'btn.compress': '压缩',
        'btn.validate': '验证',
        'btn.escape': '转义',
        'btn.unescape': '反转义',
        'btn.unicode': '中文→Unicode',
        'btn.unicodeBack': 'Unicode→中文',
        'btn.getParam': '转Get参数',
        'btn.dictJson': 'Dict↔Json',
        'btn.example': 'Demo',
        'btn.history': '历史',
        'btn.clear': '清空',
        'btn.copy': '复制',
        'btn.treeView': '树形编辑',
        'btn.treeEdit': '文本编辑',
        'output.title': '输出结果',
        'langConvert.placeholder': '编程语言转换',
        'label.lineNumbers': '行号',
        'label.indent': '空格：',
        'label.fontSize': '字体：',
        'placeholder.input': '在此输入或粘贴 JSON 数据...',
        'info.charCount': '字符数：',
        'info.lineCount': '行数：',
        'info.status': '状态：',
        'status.ready': '就绪',
        'status.valid': '有效 JSON',
        'status.error': '错误',
        'status.success': '成功',
        'storage.none': '不记录',
        'storage.24h': '24小时',
        'storage.7d': '7天',
        'storage.30d': '30天',
        'storage.forever': '永久',
        'error.noInput': '请输入 JSON 数据',
        'error.noOutput': '没有可复制的内容',
        'error.invalidJSON': 'JSON 解析错误',
        'success.formatted': '格式化成功',
        'success.compressed': '压缩成功',
        'success.escaped': '转义成功',
        'success.unescaped': '反转义成功',
        'success.converted': '转换成功',
        'success.copied': '已复制到剪贴板',
        'success.treeView': '树形视图已显示',
        'confirm.clear': '确定要清空所有内容吗？',
        'history.title': '浏览历史',
        'history.empty': '暂无历史记录',
        'features.title': 'JSON在线解析工具 - 功能特性',
        'features.subtitle': '核心功能',
        'features.format.name': 'JSON格式化',
        'features.format.desc': '自动美化JSON数据，提高可读性，支持1-4空格缩进',
        'features.compress.name': 'JSON压缩',
        'features.compress.desc': '去除所有空格和换行，生成最紧凑的JSON格式',
        'features.validate.name': 'JSON验证',
        'features.validate.desc': '实时验证JSON语法，显示详细错误信息和位置',
        'features.escape.name': 'JSON转义/反转义',
        'features.escape.desc': '处理JSON字符串中的特殊字符转义',
        'features.tree.name': '树形编辑',
        'features.tree.desc': '可视化JSON树形结构，支持折叠和展开节点',
        'features.langConvert.name': '编程语言转换',
        'features.langConvert.desc': '支持将JSON转换为Java、Python、TypeScript、Go、Rust、Swift、C++、C#、Kotlin、PHP等代码',
        'features.formatConvert.name': '格式转换',
        'features.formatConvert.desc': '支持JSON转XML、JSON转YAML、JSON转CSV等多种格式',
        'features.unicode.name': 'Unicode转换',
        'features.unicode.desc': '中文与Unicode编码互转',
        'features.getParam.name': 'Get参数转换',
        'features.getParam.desc': 'JSON与URL Get参数格式互转',
        'features.stats.name': '实时统计',
        'features.stats.desc': '显示字符数、行数和验证状态',
        'features.history.name': '历史记录',
        'features.history.desc': '自动保存操作历史，支持7天/30天/永久存储',
        'features.theme.name': '深色主题',
        'features.theme.desc': '支持浅色和深色主题切换'
    },
    en: {
        title: 'JSON Online Parser',
        subtitle: 'Quickly parse, format, validate and convert JSON data - Supports JSON to XML, JSON to YAML, tree editing, programming language conversion and more',
        'btn.format': 'Format',
        'btn.compress': 'Compress',
        'btn.validate': 'Validate',
        'btn.escape': 'Escape',
        'btn.unescape': 'Unescape',
        'btn.unicode': 'Chinese→Unicode',
        'btn.unicodeBack': 'Unicode→Chinese',
        'btn.getParam': 'To Get Param',
        'btn.dictJson': 'Dict↔Json',
        'btn.example': 'Demo',
        'btn.history': 'History',
        'btn.clear': 'Clear',
        'btn.copy': 'Copy',
        'btn.treeView': 'Tree View',
        'btn.treeEdit': 'Text Edit',
        'output.title': 'Output',
        'langConvert.placeholder': 'Language Convert',
        'label.lineNumbers': 'Line Numbers',
        'label.indent': 'Indent:',
        'label.fontSize': 'Font:',
        'placeholder.input': 'Enter or paste JSON data here...',
        'info.charCount': 'Characters:',
        'info.lineCount': 'Lines:',
        'info.status': 'Status:',
        'status.ready': 'Ready',
        'status.valid': 'Valid JSON',
        'status.error': 'Error',
        'status.success': 'Success',
        'storage.none': 'None',
        'storage.24h': '24 Hours',
        'storage.7d': '7 Days',
        'storage.30d': '30 Days',
        'storage.forever': 'Forever',
        'error.noInput': 'Please enter JSON data',
        'error.noOutput': 'No content to copy',
        'error.invalidJSON': 'JSON parsing error',
        'success.formatted': 'Formatted successfully',
        'success.compressed': 'Compressed successfully',
        'success.escaped': 'Escaped successfully',
        'success.unescaped': 'Unescaped successfully',
        'success.converted': 'Converted successfully',
        'success.copied': 'Copied to clipboard',
        'success.treeView': 'Tree view displayed',
        'confirm.clear': 'Are you sure you want to clear all content?',
        'history.title': 'History',
        'history.empty': 'No history yet',
        'features.title': 'JSON Online Parser - Features',
        'features.subtitle': 'Core Features',
        'features.format.name': 'JSON Formatting',
        'features.format.desc': 'Automatically beautify JSON data for better readability, supports 1-4 space indentation',
        'features.compress.name': 'JSON Compression',
        'features.compress.desc': 'Remove all spaces and line breaks to generate the most compact JSON format',
        'features.validate.name': 'JSON Validation',
        'features.validate.desc': 'Real-time JSON syntax validation with detailed error information and location',
        'features.escape.name': 'JSON Escape/Unescape',
        'features.escape.desc': 'Handle special character escaping in JSON strings',
        'features.tree.name': 'Tree Editing',
        'features.tree.desc': 'Visualize JSON tree structure with collapsible and expandable nodes',
        'features.langConvert.name': 'Programming Language Conversion',
        'features.langConvert.desc': 'Convert JSON to Java, Python, TypeScript, Go, Rust, Swift, C++, C#, Kotlin, PHP code and more',
        'features.formatConvert.name': 'Format Conversion',
        'features.formatConvert.desc': 'Support JSON to XML, JSON to YAML, JSON to CSV and other formats',
        'features.unicode.name': 'Unicode Conversion',
        'features.unicode.desc': 'Chinese and Unicode encoding conversion',
        'features.getParam.name': 'Get Parameter Conversion',
        'features.getParam.desc': 'Convert between JSON and URL Get parameter format',
        'features.stats.name': 'Real-time Statistics',
        'features.stats.desc': 'Display character count, line count and validation status',
        'features.history.name': 'History',
        'features.history.desc': 'Automatically save operation history, supports 7 days/30 days/permanent storage',
        'features.theme.name': 'Dark Theme',
        'features.theme.desc': 'Support light and dark theme switching'
    }
};

// 翻译函数
function t(key) {
    return translations[currentLang][key] || key;
}

// 应用语言
function applyLanguage() {
    // 更新所有带有 data-lang-key 的元素
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        const translation = t(key);
        
        if (element.tagName === 'INPUT') {
            if (element.type === 'text' || element.type === 'search') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (element.tagName === 'OPTION') {
            element.textContent = translation;
        } else if (element.tagName === 'STRONG' || element.tagName === 'SPAN') {
            // Strong 和 Span 直接更新文本
            element.textContent = translation;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'P') {
            element.textContent = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // 更新语言切换按钮文本
    if (langToggleText) {
        langToggleText.textContent = currentLang === 'zh' ? 'EN' : '中文';
    }
    
    // 更新文档语言
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    
    // 更新title标签
    if (currentLang === 'zh') {
        document.title = 'JSON 在线解析工具 - 免费JSON格式化、验证、转换工具 | JSON在线解析';
    } else {
        document.title = 'JSON Online Parser - Free JSON Format, Validate & Convert Tool';
    }
    
    // 保存语言选择
    localStorage.setItem('jsonToolLanguage', currentLang);
}

// 初始化语言
function initLanguage() {
    const savedLang = localStorage.getItem('jsonToolLanguage') || 'zh';
    currentLang = savedLang;
    applyLanguage();
}

// 切换语言
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage();
    
    // 更新状态文本（如果当前有状态）
    if (status.hasAttribute('data-lang-key')) {
        const key = status.getAttribute('data-lang-key');
        status.textContent = t(key);
    }
    
    // 更新树形视图按钮（如果可见）
    if (treeViewBtn) {
        updateTreeViewButton();
    }
    
    // 如果历史面板打开，重新加载以更新时间格式
    if (historyPanel.style.display !== 'none') {
        loadHistory();
    }
}

// 示例 JSON 数据
const exampleJson = {
    name: "JSON 在线解析工具 2025",
    version: "2.0.0",
    features: [
        "JSON 格式化",
        "JSON 压缩",
        "JSON 验证",
        "JSON 转义/反转义",
        "树形编辑",
        "编程语言转换"
    ],
    author: {
        name: "开发者",
        email: "dev@example.com"
    },
    metadata: {
        created: "2025-01-01",
        license: "MIT",
        tags: ["json", "parser", "formatter", "validator"]
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initStorage();
    loadFromStorage();
    updateStats();
    updateLineNumbers();
    applyFontSize();
    
    // 输入框事件监听
    jsonInput.addEventListener('input', () => {
        updateStats();
        updateLineNumbers();
        clearError();
        saveToStorage();
    });

    jsonInput.addEventListener('scroll', () => {
        syncLineNumbersScroll();
    });
    
    // 粘贴事件处理
    jsonInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            updateStats();
            updateLineNumbers();
            autoValidate();
            saveToStorage();
        }, 10);
    });

    // URL 参数处理
    handleURLParams();
});

// 主题切换
function initTheme() {
    const savedTheme = localStorage.getItem('jsonToolTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 语言切换
langToggle.addEventListener('click', () => {
    toggleLanguage();
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jsonToolTheme', newTheme);
});

// 存储管理
function initStorage() {
    const duration = storageDuration.value;
    storageDuration.value = localStorage.getItem('storageDuration') || '7d';
}

storageDuration.addEventListener('change', (e) => {
    localStorage.setItem('storageDuration', e.target.value);
    saveToStorage();
});

function saveToStorage() {
    const duration = storageDuration.value;
    if (duration === 'none') {
        localStorage.removeItem('jsonToolData');
        return;
    }

    const data = {
        content: jsonInput.value,
        timestamp: Date.now(),
        duration: duration
    };

    localStorage.setItem('jsonToolData', JSON.stringify(data));
}

function loadFromStorage() {
    const saved = localStorage.getItem('jsonToolData');
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        const duration = data.duration || '7d';
        const age = Date.now() - (data.timestamp || 0);

        let shouldLoad = false;
        switch (duration) {
            case '24h':
                shouldLoad = age < 24 * 60 * 60 * 1000;
                break;
            case '7d':
                shouldLoad = age < 7 * 24 * 60 * 60 * 1000;
                break;
            case '30d':
                shouldLoad = age < 30 * 24 * 60 * 60 * 1000;
                break;
            case 'forever':
                shouldLoad = true;
                break;
        }

        if (shouldLoad && data.content) {
            jsonInput.value = data.content;
            updateStats();
            updateLineNumbers();
        }
    } catch (e) {
        console.error('加载存储数据失败:', e);
    }
}

// 历史记录
function addToHistory(content) {
    if (!content || content.trim().length === 0) return;

    let history = JSON.parse(localStorage.getItem('jsonToolHistory') || '[]');
    history.unshift({
        content: content,
        timestamp: Date.now()
    });

    // 只保留最近 50 条
    history = history.slice(0, 50);
    localStorage.setItem('jsonToolHistory', JSON.stringify(history));
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('jsonToolHistory') || '[]');
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = `<div style="text-align: center; padding: 20px; color: #999;">${t('history.empty')}</div>`;
        return;
    }

    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const locale = currentLang === 'zh' ? 'zh-CN' : 'en-US';
        const time = new Date(item.timestamp).toLocaleString(locale);
        const preview = item.content.substring(0, 200);
        
        div.innerHTML = `
            <div class="history-time">${time}</div>
            <div class="history-content">${escapeHtml(preview)}</div>
        `;
        
        div.addEventListener('click', () => {
            jsonInput.value = item.content;
            updateStats();
            updateLineNumbers();
            historyPanel.style.display = 'none';
            formatJSON();
        });
        
        historyList.appendChild(div);
    });
}

historyBtn.addEventListener('click', () => {
    loadHistory();
    historyPanel.style.display = 'block';
});

closeHistoryBtn.addEventListener('click', () => {
    historyPanel.style.display = 'none';
});

// 行号功能
function updateLineNumbers() {
    if (!showLineNumbers.checked) {
        lineNumbers.classList.remove('show');
        outputLineNumbers.classList.remove('show');
        // 隐藏行号时恢复默认 padding
        jsonInput.style.paddingLeft = '15px';
        jsonOutput.style.paddingLeft = '15px';
        return;
    }

    const inputLines = jsonInput.value.split('\n').length;
    const outputLines = jsonOutput.value.split('\n').length;
    
    lineNumbers.textContent = Array.from({ length: inputLines }, (_, i) => i + 1).join('\n');
    outputLineNumbers.textContent = Array.from({ length: outputLines }, (_, i) => i + 1).join('\n');
    
    lineNumbers.classList.add('show');
    // 显示行号时调整 padding
    jsonInput.style.paddingLeft = '65px';
    
    if (outputLines > 0) {
        outputLineNumbers.classList.add('show');
        jsonOutput.style.paddingLeft = '65px';
    } else {
        jsonOutput.style.paddingLeft = '15px';
    }
}

function syncLineNumbersScroll() {
    if (showLineNumbers.checked) {
        // 同步输入框行号
        if (lineNumbers.classList.contains('show')) {
            lineNumbers.scrollTop = jsonInput.scrollTop;
        }
        // 同步输出框行号
        if (outputLineNumbers.classList.contains('show')) {
            outputLineNumbers.scrollTop = jsonOutput.scrollTop;
        }
    }
}

// 同步输出框的滚动
jsonOutput.addEventListener('scroll', () => {
    syncLineNumbersScroll();
});

showLineNumbers.addEventListener('change', () => {
    updateLineNumbers();
    // 如果当前是树形视图，更新树形视图的左边距
    if (isTreeViewMode) {
        if (showLineNumbers.checked && outputLineNumbers.classList.contains('show')) {
            treeView.style.left = '50px';
        } else {
            treeView.style.left = '0';
        }
    }
});

// 字体大小
fontSize.addEventListener('change', (e) => {
    currentFontSize = parseInt(e.target.value);
    applyFontSize();
});

function applyFontSize() {
    jsonInput.style.fontSize = currentFontSize + 'px';
    jsonOutput.style.fontSize = currentFontSize + 'px';
    lineNumbers.style.fontSize = currentFontSize + 'px';
    outputLineNumbers.style.fontSize = currentFontSize + 'px';
    treeView.style.fontSize = currentFontSize + 'px';
}

// 缩进大小
indentSize.addEventListener('change', (e) => {
    currentIndent = parseInt(e.target.value);
    // 如果输出框有内容，且是有效的JSON，重新格式化
    const outputText = jsonOutput.value.trim();
    if (outputText) {
        try {
            const obj = parseJSON(outputText);
            jsonOutput.value = JSON.stringify(obj, null, currentIndent);
            updateLineNumbers();
        } catch (error) {
            // 如果不是JSON，忽略
        }
    }
});

// 更新统计信息
function updateStats() {
    const text = jsonInput.value;
    charCount.textContent = text.length;
    lineCount.textContent = text.split('\n').length;
}

// 清除错误信息
function clearError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    status.textContent = t('status.ready');
    status.className = 'status-valid';
    status.setAttribute('data-lang-key', 'status.ready');
}

// 显示错误信息
function showError(message, useTranslation = false) {
    const errorMsg = useTranslation ? t(message) : message;
    errorMessage.textContent = errorMsg;
    errorMessage.classList.add('show');
    status.textContent = t('status.error');
    status.className = 'status-invalid';
    status.removeAttribute('data-lang-key');
}

// 显示成功状态
function showSuccess(message = 'status.success', useTranslation = true) {
    clearError();
    const successMsg = useTranslation ? t(message) : message;
    status.textContent = successMsg;
    status.className = 'status-valid';
    if (useTranslation) {
        status.setAttribute('data-lang-key', message);
    }
}

// 解析 JSON
function parseJSON(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        const errorPrefix = currentLang === 'zh' ? 'JSON 解析错误' : 'JSON parsing error';
        throw new Error(`${errorPrefix}: ${error.message}`);
    }
}

// 格式化 JSON
function formatJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        const obj = parseJSON(text);
        const formatted = JSON.stringify(obj, null, currentIndent);
        jsonOutput.value = formatted;
        updateLineNumbers();
        showSuccess('success.formatted');
        addToHistory(formatted);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

// 压缩 JSON
function compressJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        const obj = parseJSON(text);
        const compressed = JSON.stringify(obj);
        jsonOutput.value = compressed;
        updateLineNumbers();
        showSuccess('success.compressed');
        addToHistory(compressed);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

// 树形视图
function renderTreeView(obj, container, level = 0) {
    if (typeof obj !== 'object' || obj === null) {
        return;
    }

    const items = Object.keys(obj);
    items.forEach((key, index) => {
        const value = obj[key];
        const itemDiv = document.createElement('div');
        itemDiv.className = 'tree-item';
        itemDiv.style.paddingLeft = level * 20 + 'px';

        const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
        const isArray = Array.isArray(value);
        const isComplex = isObject || isArray;

        let toggleHtml = '';
        if (isComplex) {
            toggleHtml = `<span class="tree-toggle" data-expanded="false">▶</span>`;
        } else {
            toggleHtml = '<span class="tree-toggle"> </span>';
        }

        let valueHtml = '';
        if (isComplex) {
            const preview = isArray ? `Array(${value.length})` : `Object(${Object.keys(value).length})`;
            valueHtml = `<span class="tree-value">${preview}</span>`;
        } else {
            const type = typeof value;
            const displayValue = type === 'string' ? `"${value}"` : value;
            valueHtml = `<span class="tree-value ${type}">${displayValue}</span>`;
        }

        itemDiv.innerHTML = `
            ${toggleHtml}
            <span class="tree-key">"${key}":</span>
            ${valueHtml}
        `;

        if (isComplex) {
            const childrenDiv = document.createElement('div');
            childrenDiv.className = 'tree-children';
            renderTreeView(value, childrenDiv, level + 1);
            itemDiv.appendChild(childrenDiv);

            const toggle = itemDiv.querySelector('.tree-toggle');
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const expanded = toggle.dataset.expanded === 'true';
                toggle.dataset.expanded = !expanded;
                toggle.textContent = expanded ? '▶' : '▼';
                childrenDiv.classList.toggle('expanded', !expanded);
            });
        }

        container.appendChild(itemDiv);
    });
}

function showTreeView() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }

    try {
        const obj = parseJSON(text);
        treeView.innerHTML = '';
        renderTreeView(obj, treeView);
        jsonOutput.style.visibility = 'hidden';
        treeView.style.display = 'block';
        // 如果行号显示，调整树形视图的左边距
        if (showLineNumbers.checked && outputLineNumbers.classList.contains('show')) {
            treeView.style.left = '50px';
        } else {
            treeView.style.left = '0';
        }
        isTreeViewMode = true;
        showSuccess('success.treeView');
        updateTreeViewButton();
    } catch (error) {
        showError(error.message);
        treeView.style.display = 'none';
        jsonOutput.style.visibility = 'visible';
        isTreeViewMode = false;
        updateTreeViewButton();
    }
}

function updateTreeViewButton() {
    treeViewBtn.textContent = isTreeViewMode ? t('btn.treeEdit') : t('btn.treeView');
}

treeViewBtn.addEventListener('click', () => {
    if (isTreeViewMode) {
        // 切换回文本编辑
        treeView.style.display = 'none';
        jsonOutput.style.visibility = 'visible';
        isTreeViewMode = false;
        updateTreeViewButton();
        // 重新启用编程语言转换
        langConvert.disabled = false;
        langConvert.value = '';
    } else {
        // 切换到树形编辑
        showTreeView();
        // 禁用编程语言转换
        langConvert.disabled = true;
        langConvert.value = '';
    }
});

// 转义/反转义
function escapeJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        const obj = parseJSON(text);
        const jsonString = JSON.stringify(obj);
        const escaped = jsonString.replace(/\\/g, '\\\\')
                        .replace(/"/g, '\\"')
                        .replace(/\n/g, '\\n')
                        .replace(/\r/g, '\\r')
                        .replace(/\t/g, '\\t');
        jsonOutput.value = escaped;
        updateLineNumbers();
        showSuccess('success.escaped');
        addToHistory(escaped);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

function unescapeJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        let unescaped = text.replace(/\\n/g, '\n')
                           .replace(/\\r/g, '\r')
                           .replace(/\\t/g, '\t')
                           .replace(/\\"/g, '"')
                           .replace(/\\\\/g, '\\');
        
        const obj = parseJSON(unescaped);
        const formatted = JSON.stringify(obj, null, currentIndent);
        jsonOutput.value = formatted;
        updateLineNumbers();
        showSuccess('success.unescaped');
        addToHistory(formatted);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

// Unicode 转换
function toUnicode() {
    const text = jsonInput.value;
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[\u4e00-\u9fa5]/)) {
            result += '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
        } else {
            result += char;
        }
    }
    jsonOutput.value = result;
    updateLineNumbers();
    showSuccess('success.converted');
    addToHistory(result);
}

function fromUnicode() {
    const text = jsonInput.value;
    const result = text.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    });
    jsonOutput.value = result;
    updateLineNumbers();
    showSuccess('success.converted');
    addToHistory(result);
}

// Get 参数转换
function toGetParams() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        const obj = parseJSON(text);
        const params = new URLSearchParams();
        
        function flatten(obj, prefix = '') {
            for (const key in obj) {
                const value = obj[key];
                const newKey = prefix ? `${prefix}[${key}]` : key;
                
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    flatten(value, newKey);
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        params.append(`${newKey}[${index}]`, item);
                    });
                } else {
                    params.append(newKey, value);
                }
            }
        }
        
        flatten(obj);
        const result = params.toString();
        jsonOutput.value = result;
        updateLineNumbers();
        showSuccess('success.converted');
        addToHistory(result);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

// Dict/Json 转换
function dictJsonConvert() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        // 尝试解析为 JSON
        const obj = parseJSON(text);
        // 如果是 JSON，转换为 Python dict 格式
        const dictStr = JSON.stringify(obj, null, currentIndent)
            .replace(/"/g, "'")
            .replace(/true/g, 'True')
            .replace(/false/g, 'False')
            .replace(/null/g, 'None');
            jsonOutput.value = dictStr;
            updateLineNumbers();
            showSuccess('success.converted');
            addToHistory(dictStr);
        } catch (error) {
            // 尝试解析为 Python dict
            try {
                const dictStr = text.replace(/'/g, '"')
                               .replace(/True/g, 'true')
                               .replace(/False/g, 'false')
                               .replace(/None/g, 'null');
                const obj = parseJSON(dictStr);
                const jsonStr = JSON.stringify(obj, null, currentIndent);
                jsonOutput.value = jsonStr;
                updateLineNumbers();
                showSuccess('success.converted');
                addToHistory(jsonStr);
            } catch (e) {
                showError('error.invalidJSON', true);
                jsonOutput.value = '';
            }
        }
    }

// 编程语言转换
function convertToLanguage(lang) {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    
    try {
        const obj = parseJSON(text);
        let result = '';
        
        switch (lang) {
            case 'java':
                result = generateJavaClass(obj);
                break;
            case 'python':
                result = generatePythonClass(obj);
                break;
            case 'typescript':
                result = generateTypeScriptInterface(obj);
                break;
            case 'go':
                result = generateGoStruct(obj);
                break;
            case 'rust':
                result = generateRustStruct(obj);
                break;
            case 'swift':
                result = generateSwiftStruct(obj);
                break;
            case 'cpp':
                result = generateCppClass(obj);
                break;
            case 'csharp':
                result = generateCSharpClass(obj);
                break;
            case 'kotlin':
                result = generateKotlinClass(obj);
                break;
            case 'php':
                result = generatePHPClass(obj);
                break;
            default:
                showError('error.invalidJSON', true);
                return;
        }
        
        jsonOutput.value = result;
        updateLineNumbers();
        showSuccess('success.converted');
        addToHistory(result);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

// 语言转换生成器
function generateJavaClass(obj, className = 'Root') {
    let code = `public class ${className} {\n`;
    
    function processObject(obj, indent = '    ') {
        for (const key in obj) {
            const value = obj[key];
            const type = typeof value;
            let javaType = 'String';
            
            if (type === 'number') {
                javaType = Number.isInteger(value) ? 'Integer' : 'Double';
            } else if (type === 'boolean') {
                javaType = 'Boolean';
            } else if (type === 'object' && value !== null) {
                if (Array.isArray(value) && value.length > 0) {
                    const elemType = typeof value[0];
                    javaType = elemType === 'object' ? 'List<Object>' : `List<${getJavaType(elemType, value[0])}>`;
                } else {
                    javaType = 'Object';
                }
            }
            
            const fieldName = toCamelCase(key);
            code += `${indent}private ${javaType} ${fieldName};\n`;
            
            if (type === 'object' && value !== null && !Array.isArray(value)) {
                processObject(value, indent + '    ');
            }
        }
    }
    
    processObject(obj);
    code += '}';
    return code;
}

function generatePythonClass(obj, className = 'Root') {
    let code = `class ${className}:\n    def __init__(self):\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const pythonValue = typeof value === 'string' ? `"${value}"` : 
                           value === null ? 'None' : value;
        code += `        self.${key} = ${pythonValue}\n`;
    }
    
    return code;
}

function generateTypeScriptInterface(obj, name = 'Root') {
    let code = `interface ${name} {\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let tsType = 'string';
        
        if (type === 'number') {
            tsType = 'number';
        } else if (type === 'boolean') {
            tsType = 'boolean';
        } else if (type === 'object' && value !== null) {
            if (Array.isArray(value)) {
                tsType = 'any[]';
            } else {
                tsType = 'object';
            }
        }
        
        code += `    ${key}: ${tsType};\n`;
    }
    
    code += '}';
    return code;
}

function generateGoStruct(obj, name = 'Root') {
    let code = `type ${name} struct {\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let goType = 'string';
        
        if (type === 'number') {
            goType = Number.isInteger(value) ? 'int' : 'float64';
        } else if (type === 'boolean') {
            goType = 'bool';
        } else if (type === 'object' && value !== null) {
            goType = Array.isArray(value) ? '[]interface{}' : 'map[string]interface{}';
        }
        
        const fieldName = toPascalCase(key);
        code += `    ${fieldName} ${goType} \`json:"${key}"\`\n`;
    }
    
    code += '}';
    return code;
}

function generateRustStruct(obj, name = 'Root') {
    let code = `#[derive(Debug, Serialize, Deserialize)]\npub struct ${name} {\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let rustType = 'String';
        
        if (type === 'number') {
            rustType = Number.isInteger(value) ? 'i32' : 'f64';
        } else if (type === 'boolean') {
            rustType = 'bool';
        } else if (type === 'object' && value !== null) {
            rustType = Array.isArray(value) ? 'Vec<serde_json::Value>' : 'serde_json::Value';
        }
        
        code += `    pub ${toSnakeCase(key)}: ${rustType},\n`;
    }
    
    code += '}';
    return code;
}

function generateSwiftStruct(obj, name = 'Root') {
    let code = `struct ${name}: Codable {\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let swiftType = 'String';
        
        if (type === 'number') {
            swiftType = Number.isInteger(value) ? 'Int' : 'Double';
        } else if (type === 'boolean') {
            swiftType = 'Bool';
        } else if (type === 'object' && value !== null) {
            swiftType = Array.isArray(value) ? '[Any]' : '[String: Any]';
        }
        
        code += `    let ${toCamelCase(key)}: ${swiftType}\n`;
    }
    
    code += '}';
    return code;
}

function generateCppClass(obj, className = 'Root') {
    let code = `class ${className} {\npublic:\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let cppType = 'std::string';
        
        if (type === 'number') {
            cppType = Number.isInteger(value) ? 'int' : 'double';
        } else if (type === 'boolean') {
            cppType = 'bool';
        }
        
        code += `    ${cppType} ${key};\n`;
    }
    
    code += '};';
    return code;
}

function generateCSharpClass(obj, className = 'Root') {
    let code = `public class ${className}\n{\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let csType = 'string';
        
        if (type === 'number') {
            csType = Number.isInteger(value) ? 'int' : 'double';
        } else if (type === 'boolean') {
            csType = 'bool';
        } else if (type === 'object' && value !== null) {
            csType = Array.isArray(value) ? 'List<object>' : 'object';
        }
        
        const propName = toPascalCase(key);
        code += `    public ${csType} ${propName} { get; set; }\n`;
    }
    
    code += '}';
    return code;
}

function generateKotlinClass(obj, className = 'Root') {
    let code = `data class ${className}(\n`;
    
    const fields = [];
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let kotlinType = 'String';
        
        if (type === 'number') {
            kotlinType = Number.isInteger(value) ? 'Int' : 'Double';
        } else if (type === 'boolean') {
            kotlinType = 'Boolean';
        } else if (type === 'object' && value !== null) {
            kotlinType = Array.isArray(value) ? 'List<Any>' : 'Map<String, Any>';
        }
        
        fields.push(`    val ${toCamelCase(key)}: ${kotlinType}`);
    }
    
    code += fields.join(',\n') + '\n)';
    return code;
}

function generatePHPClass(obj, className = 'Root') {
    let code = `class ${className}\n{\n`;
    
    for (const key in obj) {
        const value = obj[key];
        const type = typeof value;
        let phpType = 'string';
        
        if (type === 'number') {
            phpType = Number.isInteger(value) ? 'int' : 'float';
        } else if (type === 'boolean') {
            phpType = 'bool';
        } else if (type === 'object' && value !== null) {
            phpType = 'array';
        }
        
        code += `    private $${key};\n`;
    }
    
    code += '}';
    return code;
}

// 工具函数
function toCamelCase(str) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function toPascalCase(str) {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function toSnakeCase(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function getJavaType(type, value) {
    if (type === 'number') {
        return Number.isInteger(value) ? 'Integer' : 'Double';
    } else if (type === 'boolean') {
        return 'Boolean';
    }
    return 'String';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 验证 JSON
function validateJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('error.noInput', true);
        return;
    }
    try {
        parseJSON(text);
        showSuccess('status.valid');
        return true;
    } catch (error) {
        showError(error.message);
        return false;
    }
}

// 自动验证
function autoValidate() {
    const text = jsonInput.value.trim();
    if (text) {
        validateJSON();
    } else {
        clearError();
    }
}

// 复制到剪贴板
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showSuccess('success.copied');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = currentLang === 'zh' ? '已复制!' : 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showSuccess('success.copied');
        } catch (err) {
            showError('error.noOutput', true);
        }
        document.body.removeChild(textarea);
    }
}

// URL 参数处理
function handleURLParams() {
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.substring(1));
    const data = params.get('data');
    const url = params.get('url');

    if (data) {
        try {
            const decoded = decodeURIComponent(data);
            jsonInput.value = decoded;
            updateStats();
            updateLineNumbers();
            formatJSON();
            // 清除 URL 参数
            window.location.hash = '';
        } catch (e) {
            console.error('URL 参数解析失败:', e);
        }
    } else if (url) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                jsonInput.value = JSON.stringify(data, null, currentIndent);
                updateStats();
                updateLineNumbers();
                formatJSON();
                window.location.hash = '';
            })
            .catch(e => {
                showError('URL 加载失败: ' + e.message);
            });
    }
}

// 事件绑定
formatBtn.addEventListener('click', formatJSON);
compressBtn.addEventListener('click', compressJSON);
escapeBtn.addEventListener('click', escapeJSON);
unescapeBtn.addEventListener('click', unescapeJSON);
clearBtn.addEventListener('click', () => {
    if (confirm(t('confirm.clear'))) {
        jsonInput.value = '';
        jsonOutput.value = '';
        treeView.innerHTML = '';
        clearError();
        updateStats();
        updateLineNumbers();
        saveToStorage();
    }
});
exampleBtn.addEventListener('click', () => {
    const example = JSON.stringify(exampleJson, null, currentIndent);
    jsonInput.value = example;
    jsonOutput.value = '';
    updateStats();
    updateLineNumbers();
    validateJSON();
    formatJSON();
    showSuccess('success.converted');
    saveToStorage();
});
validateBtn.addEventListener('click', validateJSON);
copyBtn.addEventListener('click', () => {
    const text = jsonOutput.value;
    if (!text) {
        showError('error.noOutput', true);
        return;
    }
    copyToClipboard(text);
});
copyInputBtn.addEventListener('click', () => {
    const text = jsonInput.value;
    if (!text) {
        showError('error.noOutput', true);
        return;
    }
    copyToClipboard(text);
});

langConvert.addEventListener('change', (e) => {
    if (e.target.value) {
        // 如果当前是树形视图，先切换回文本视图
        if (isTreeViewMode) {
            treeView.style.display = 'none';
            jsonOutput.style.visibility = 'visible';
            isTreeViewMode = false;
            updateTreeViewButton();
            langConvert.disabled = false;
        }
        // 执行语言转换
        convertToLanguage(e.target.value);
        e.target.value = '';
    }
});

unicodeBtn.addEventListener('click', toUnicode);
unicodeBackBtn.addEventListener('click', fromUnicode);
getParamBtn.addEventListener('click', toGetParams);
dictJsonBtn.addEventListener('click', dictJsonConvert);

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        formatJSON();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyBtn.click();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearBtn.click();
    }
});
