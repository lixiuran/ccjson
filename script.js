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

// 状态变量
let isTreeViewMode = false;
let currentIndent = 2;
let currentFontSize = 14;

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
        historyList.innerHTML = '<div style="text-align: center; padding: 20px; color: #999;">暂无历史记录</div>';
        return;
    }

    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const time = new Date(item.timestamp).toLocaleString('zh-CN');
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
    status.textContent = '就绪';
    status.className = 'status-valid';
}

// 显示错误信息
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    status.textContent = '错误';
    status.className = 'status-invalid';
}

// 显示成功状态
function showSuccess(message = '成功') {
    clearError();
    status.textContent = message;
    status.className = 'status-valid';
}

// 解析 JSON
function parseJSON(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        throw new Error(`JSON 解析错误: ${error.message}`);
    }
}

// 格式化 JSON
function formatJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('请输入 JSON 数据');
        return;
    }
    
    try {
        const obj = parseJSON(text);
        const formatted = JSON.stringify(obj, null, currentIndent);
        jsonOutput.value = formatted;
        updateLineNumbers();
        showSuccess('格式化成功');
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
        showError('请输入 JSON 数据');
        return;
    }
    
    try {
        const obj = parseJSON(text);
        const compressed = JSON.stringify(obj);
        jsonOutput.value = compressed;
        updateLineNumbers();
        showSuccess('压缩成功');
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
        showError('请输入 JSON 数据');
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
        showSuccess('树形视图已显示');
    } catch (error) {
        showError(error.message);
        treeView.style.display = 'none';
        jsonOutput.style.visibility = 'visible';
        isTreeViewMode = false;
    }
}

treeViewBtn.addEventListener('click', () => {
    if (isTreeViewMode) {
        // 切换回文本编辑
        treeView.style.display = 'none';
        jsonOutput.style.visibility = 'visible';
        isTreeViewMode = false;
        treeViewBtn.textContent = '树形编辑';
        // 重新启用编程语言转换
        langConvert.disabled = false;
        langConvert.value = '';
    } else {
        // 切换到树形编辑
        showTreeView();
        treeViewBtn.textContent = '文本编辑';
        // 禁用编程语言转换
        langConvert.disabled = true;
        langConvert.value = '';
    }
});

// 转义/反转义
function escapeJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('请输入 JSON 数据');
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
        showSuccess('转义成功');
        addToHistory(escaped);
    } catch (error) {
        showError(error.message);
        jsonOutput.value = '';
    }
}

function unescapeJSON() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('请输入需要反转义的文本');
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
        showSuccess('反转义成功');
        addToHistory(formatted);
    } catch (error) {
        showError('反转义失败: ' + error.message);
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
    showSuccess('转换成功');
    addToHistory(result);
}

function fromUnicode() {
    const text = jsonInput.value;
    const result = text.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    });
    jsonOutput.value = result;
    updateLineNumbers();
    showSuccess('转换成功');
    addToHistory(result);
}

// Get 参数转换
function toGetParams() {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('请输入 JSON 数据');
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
        showSuccess('转换成功');
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
        showError('请输入数据');
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
        showSuccess('转换成功');
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
            showSuccess('转换成功');
            addToHistory(jsonStr);
        } catch (e) {
            showError('无法识别格式');
            jsonOutput.value = '';
        }
    }
}

// 编程语言转换
function convertToLanguage(lang) {
    const text = jsonInput.value.trim();
    if (!text) {
        showError('请输入 JSON 数据');
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
                showError('不支持的编程语言');
                return;
        }
        
        jsonOutput.value = result;
        updateLineNumbers();
        showSuccess('转换成功');
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
        showError('请输入 JSON 数据');
        return;
    }
    try {
        parseJSON(text);
        showSuccess('有效 JSON');
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
        showSuccess('已复制到剪贴板');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制!';
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
            showSuccess('已复制到剪贴板');
        } catch (err) {
            showError('复制失败，请手动复制');
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
    if (confirm('确定要清空所有内容吗？')) {
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
    showSuccess('已加载示例数据');
    saveToStorage();
});
validateBtn.addEventListener('click', validateJSON);
copyBtn.addEventListener('click', () => {
    const text = jsonOutput.value;
    if (!text) {
        showError('没有可复制的内容');
        return;
    }
    copyToClipboard(text);
});
copyInputBtn.addEventListener('click', () => {
    const text = jsonInput.value;
    if (!text) {
        showError('没有可复制的内容');
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
            treeViewBtn.textContent = '树形编辑';
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
