const vscode = require('vscode');

/**
 * Основная функция активации расширения, регистрирует все команды.
 * Вызывается при активации расширения в VS Code.
 * 
 * Параметры:
 * context (vscode.ExtensionContext): контекст расширения, используется для управления подписками
 * 
 * Пример вызова:
 * activate(context) - регистрирует команды snippet.if, snippet.for, snippet.while
 */
function activate(context) {
    /**
     * Регистрирует команду 'snippet.if' для вставки шаблона условного оператора
     * При вызове вставляет: if (condition) {\n\t\n}
     */
    const ifCommand = vscode.commands.registerCommand('snippet.if', () => {
        insertSnippet("if (condition) {\n\t\n}");
    });

    /**
     * Регистрирует команду 'snippet.for' для вставки шаблона цикла for
     * При вызове вставляет: for (let i = 0; i < n; i++) {\n\t\n}
     */
    const forCommand = vscode.commands.registerCommand('snippet.for', () => {
        insertSnippet("for (let i = 0; i < n; i++) {\n\t\n}"); 
    });

    /**
     * Регистрирует команду 'snippet.while' для вставки шаблона цикла while
     * При вызове вставляет: while (condition) {\n\t\n}
     */
    const whileCommand = vscode.commands.registerCommand('snippet.while', () => {
        insertSnippet("while (condition) {\n\t\n}");
    });

    /**
     * Добавляет все зарегистрированные команды в подписки контекста
     * для правильного управления жизненным циклом расширения
     */
    context.subscriptions.push(ifCommand, forCommand, whileCommand);
}

/**
 * Вставляет текстовый шаблон в активный текстовый редактор в позицию курсора.
 * 
 * Параметры:
 * text (string): текст шаблона для вставки
 * 
 * Возвращаемое значение:
 * void
 * 
 * Пример вызова:
 * insertSnippet("if (condition) {\n\t\n}") - вставляет шаблон if в текущую позицию
 * 
 * Ошибки:
 * Показывает сообщение об ошибке, если нет активного текстового редактора
 */
function insertSnippet(text) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('Нет активного редактора');
        return;
    }

    editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.start, text);
    });
}

/**
 * Функция деактивации расширения.
 * Вызывается при деактивации расширения в VS Code.
 * В текущей реализации не выполняет действий, но требуется для API расширений.
 * 
 * Возвращаемое значение:
 * void
 */
function deactivate() {}

module.exports = {
    activate,
    deactivate
};